import { copyFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import {
  TEMPLATE_ART_SHEET,
  parseTemplateArtId,
  templateArtAlt,
  templateArtPublicPath,
  type TemplateArtName,
} from "./art";
import type { Tri } from "./types";

/** Минимум, который нужен импорту от Prisma — чтобы сид мог передать свой клиент. */
export interface MediaStore {
  media: {
    findFirst(args: { where: { path: string } }): Promise<{ id: string } | null>;
    create(args: { data: Record<string, unknown> }): Promise<{ id: string }>;
  };
}

/**
 * Перенос графики шаблона в медиатеку.
 *
 * До импорта картинка существует только как файл `public/templates/<ключ>/…`
 * и идентификатор `tpl:<ключ>/<имя>` — этого достаточно для демонстрации, но
 * не для настоящего сайта: медиатека, замена картинки своей и статический
 * экспорт работают через строки `Media`. Поэтому применение шаблона (и сид
 * демо-сайта) копируют нужные файлы в `public/uploads` и заводят записи.
 *
 * Повторный вызов не плодит копии: запись ищется по пути файла.
 */
export async function importTemplateArt(
  db: MediaStore,
  artIds: Iterable<string>,
  label: Tri,
): Promise<Map<string, string>> {
  const sizes = new Map(TEMPLATE_ART_SHEET.map((item) => [item.name as string, item]));
  const map = new Map<string, string>();

  for (const artId of artIds) {
    const parsed = parseTemplateArtId(artId);
    if (!parsed) continue;

    const relative = templateArtPublicPath(parsed.templateKey, parsed.name);
    const source = path.join(process.cwd(), "public", relative);
    const target = path.join(process.cwd(), "public", "uploads", relative);

    let size: number;
    try {
      size = (await stat(source)).size;
    } catch {
      // Набор графики не сгенерирован — блок просто останется без картинки.
      continue;
    }

    const existing = await db.media.findFirst({ where: { path: relative } });
    if (existing) {
      map.set(artId, existing.id);
      continue;
    }

    await mkdir(path.dirname(target), { recursive: true });
    await copyFile(source, target);

    const dimensions = sizes.get(parsed.name as TemplateArtName);
    const created = await db.media.create({
      data: {
        filename: `${parsed.templateKey}-${parsed.name}.svg`,
        path: relative,
        mimeType: "image/svg+xml",
        size,
        width: dimensions?.width ?? null,
        height: dimensions?.height ?? null,
        altRu: templateArtAlt(label.ru, "ru"),
        altUz: templateArtAlt(label.uz, "uz"),
        altEn: templateArtAlt(label.en, "en"),
      },
    });
    map.set(artId, created.id);
  }

  return map;
}
