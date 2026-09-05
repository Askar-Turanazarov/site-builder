import type { AdminDict, AdminT } from "./index";

/**
 * Server actions бросают короткие коды ошибок («slugTaken»), а не готовый
 * текст — иначе сообщение нельзя было бы перевести. Здесь код превращается
 * в подпись на языке интерфейса; неизвестная ошибка отдаёт запасной текст
 * конкретного экрана.
 */
const ERROR_KEYS: Record<string, keyof AdminDict> = {
  slugTaken: "err.slugTaken",
  categoryNotEmpty: "err.categoryNotEmpty",
  blocksInvalid: "err.blocksInvalid",
};

export function adminErrorText(t: AdminT, error: unknown, fallbackKey: keyof AdminDict): string {
  const code = error instanceof Error ? error.message : "";
  const key = ERROR_KEYS[code];
  return key ? t(key) : t(fallbackKey);
}
