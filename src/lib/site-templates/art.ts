import type { Locale, MediaRef } from "@/blocks/context";

/**
 * Графика шаблонов.
 *
 * Файлы рисует scripts/generate-template-art.ts и кладёт в
 * public/templates/<ключ>/<имя>.svg. В блоках шаблона картинка обозначается
 * идентификатором `tpl:<ключ>/<имя>` — он занимает то же поле, что и обычный
 * `Media.id`, поэтому блоки не знают, чем именно им показали изображение:
 * демонстрация подмешивает такие записи в карту `RenderContext.media`, а при
 * применении шаблона файлы копируются в медиатеку и получают настоящие id.
 */

/** Размеры холстов; имена файлов — единый источник правды для генератора. */
export const TEMPLATE_ART_SHEET = [
  { name: "hero", width: 1600, height: 700 },
  { name: "frame-1", width: 1200, height: 900 },
  { name: "frame-2", width: 1200, height: 900 },
  { name: "frame-3", width: 1200, height: 900 },
  { name: "tile-1", width: 1200, height: 900 },
  { name: "tile-2", width: 1200, height: 900 },
  { name: "tile-3", width: 1200, height: 900 },
  { name: "tile-4", width: 1200, height: 900 },
  { name: "tile-5", width: 1200, height: 900 },
  { name: "tile-6", width: 1200, height: 900 },
  { name: "tile-7", width: 1200, height: 900 },
  { name: "tile-8", width: 1200, height: 900 },
  { name: "cover-1", width: 1200, height: 900 },
  { name: "cover-2", width: 1200, height: 900 },
  { name: "cover-3", width: 1200, height: 900 },
  { name: "cover-4", width: 1200, height: 900 },
  { name: "portrait-1", width: 800, height: 800 },
  { name: "portrait-2", width: 800, height: 800 },
  { name: "portrait-3", width: 800, height: 800 },
  { name: "portrait-4", width: 800, height: 800 },
  { name: "portrait-5", width: 800, height: 800 },
  { name: "portrait-6", width: 800, height: 800 },
] as const;

export type TemplateArtName = (typeof TEMPLATE_ART_SHEET)[number]["name"];

const ART_PREFIX = "tpl:";

export function templateArtId(templateKey: string, name: TemplateArtName): string {
  return `${ART_PREFIX}${templateKey}/${name}`;
}

export function isTemplateArtId(value: string | null | undefined): value is string {
  return typeof value === "string" && value.startsWith(ART_PREFIX);
}

/** `tpl:cafe/hero` → { templateKey: "cafe", name: "hero" } */
export function parseTemplateArtId(id: string): { templateKey: string; name: string } | null {
  if (!isTemplateArtId(id)) return null;
  const [templateKey, name] = id.slice(ART_PREFIX.length).split("/");
  if (!templateKey || !name) return null;
  return { templateKey, name };
}

/** Путь внутри public/ — им пользуются и демонстрация, и копирование в медиатеку. */
export function templateArtPublicPath(templateKey: string, name: string): string {
  return `templates/${templateKey}/${name}.svg`;
}

const ALT: Record<Locale, (label: string) => string> = {
  ru: (label) => `${label} — оформление шаблона`,
  uz: (label) => `${label} — shablon bezagi`,
  en: (label) => `${label} — template artwork`,
};

/**
 * Карта «идентификатор → картинка» для демонстрации шаблона. Демонстрация
 * ничего не пишет в базу, поэтому подмешивает эти записи к обычной медиатеке.
 */
export function templateArtMediaMap(
  templateKey: string,
  label: string,
  locale: Locale,
): Record<string, MediaRef> {
  const map: Record<string, MediaRef> = {};
  for (const item of TEMPLATE_ART_SHEET) {
    map[templateArtId(templateKey, item.name)] = {
      url: `/${templateArtPublicPath(templateKey, item.name)}`,
      alt: ALT[locale](label),
      width: item.width,
      height: item.height,
    };
  }
  return map;
}

export function templateArtAlt(label: string, locale: Locale): string {
  return ALT[locale](label);
}

/**
 * Собирает идентификаторы графики, встречающиеся в готовых блоках, и
 * подменяет их на настоящие `Media.id`.
 *
 * Обход общий и не знает про типы блоков: медиа-поля в них называются
 * одинаково (`imageMediaId`, `photoMediaId`, `avatarMediaId`), а искать
 * значения по форме строки надёжнее, чем перечислять 14 схем.
 */
const MEDIA_FIELDS = ["imageMediaId", "photoMediaId", "avatarMediaId", "coverMediaId"];

export function collectArtIds(value: unknown, into: Set<string> = new Set()): Set<string> {
  if (Array.isArray(value)) {
    for (const item of value) collectArtIds(item, into);
    return into;
  }
  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (MEDIA_FIELDS.includes(key) && isTemplateArtId(item as string)) {
        into.add(item as string);
      } else {
        collectArtIds(item, into);
      }
    }
  }
  return into;
}

export function remapArtIds<T>(value: T, map: Map<string, string>): T {
  if (Array.isArray(value)) {
    return value.map((item) => remapArtIds(item, map)) as unknown as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      out[key] =
        MEDIA_FIELDS.includes(key) && typeof item === "string" && map.has(item)
          ? map.get(item)
          : remapArtIds(item, map);
    }
    return out as T;
  }
  return value;
}
