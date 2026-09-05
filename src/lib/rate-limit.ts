import { headers } from "next/headers";

/**
 * Простое ограничение частоты: скользящее окно в памяти процесса.
 *
 * Защищает две открытые точки — форму входа (перебор пароля) и публичную
 * форму обратной связи (заливка базы ботом). Хранилище намеренно в памяти:
 * у проекта один процесс и SQLite-файл, поэтому отдельный Redis был бы
 * лишней зависимостью. При запуске нескольких экземпляров счётчик у каждого
 * будет свой — это ограничение стоит помнить.
 */

const buckets = new Map<string, number[]>();

export interface RateLimitRule {
  /** Сколько попыток разрешено в окне. */
  limit: number;
  /** Длина окна в миллисекундах. */
  windowMs: number;
}

export const LOGIN_RULE: RateLimitRule = { limit: 10, windowMs: 10 * 60 * 1000 };
export const CONTACT_RULE: RateLimitRule = { limit: 5, windowMs: 60 * 60 * 1000 };

/** Адрес клиента за прокси; без него все попытки лягут в общее ведро. */
export async function clientKey(): Promise<string> {
  const store = await headers();
  const forwarded = store.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || store.get("x-real-ip") || "local";
  return ip;
}

/**
 * Регистрирует попытку. Возвращает `false`, если лимит исчерпан — вызывающий
 * решает, какую ошибку показать.
 */
export function hit(action: string, key: string, rule: RateLimitRule): boolean {
  const now = Date.now();
  const id = `${action}:${key}`;
  const fresh = (buckets.get(id) ?? []).filter((time) => now - time < rule.windowMs);

  if (fresh.length >= rule.limit) {
    buckets.set(id, fresh);
    return false;
  }

  fresh.push(now);
  buckets.set(id, fresh);

  // Ведро памяти не должно расти бесконечно на долгоживущем процессе.
  if (buckets.size > 5000) {
    for (const [bucketId, times] of buckets) {
      if (times.every((time) => now - time >= rule.windowMs)) buckets.delete(bucketId);
    }
  }

  return true;
}

/** Сбрасывает счётчик — вызывается после успешного входа. */
export function reset(action: string, key: string): void {
  buckets.delete(`${action}:${key}`);
}
