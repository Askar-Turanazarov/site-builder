import { z } from "zod";
import type { CSSProperties } from "react";

/**
 * Пер-блочные настройки внешнего вида, которые администратор задаёт в
 * редакторе без знания CSS.
 *
 * Механизм: обёртка блока (её ставит registry — одинаково для живого сайта и
 * для экспорта) получает
 *   1) инлайн-переопределения уже существующих переменных темы `--tpl-*` —
 *      всё содержимое блока читает именно их, поэтому смена акцента одним
 *      полем меняет кнопки, иконки и бейджи внутри блока;
 *   2) `data-blk-*` атрибуты — по ним отрабатывают правила из
 *      src/styles/blocks.css (отступы, ширина контейнера, размер заголовка,
 *      выравнивание). Правила там лежат вне `@layer`, поэтому перебивают
 *      утилиты Tailwind вроде `py-16 md:py-24` независимо от специфичности.
 *
 * Стиль не зависит от языка: редактор пишет его сразу во все три локали.
 */

export const blockStyleSchema = z.object({
  /** "" | paper | surface | ink | accent | #rrggbb */
  bg: z.string().default(""),
  /** "" | ink | inkSoft | onAccent | #rrggbb */
  text: z.string().default(""),
  /** "" | #rrggbb — переопределяет акцентный цвет внутри блока */
  accent: z.string().default(""),
  heading: z.enum(["", "sm", "md", "lg", "xl"]).default(""),
  paddingY: z.enum(["", "none", "sm", "md", "lg", "xl"]).default(""),
  width: z.enum(["", "narrow", "normal", "wide", "full"]).default(""),
  radius: z.enum(["", "none", "sm", "md", "lg", "full"]).default(""),
  align: z.enum(["", "left", "center"]).default(""),
  hidden: z.boolean().default(false),
});

export type BlockStyle = z.infer<typeof blockStyleSchema>;

export const EMPTY_BLOCK_STYLE: BlockStyle = blockStyleSchema.parse({});

// Ссылаемся на «базовые» копии переменных темы (--tpl-*-base): их никто не
// переопределяет, поэтому пер-блочные правила не могут образовать цикл вида
// --tpl-paper: var(--tpl-ink) + --tpl-ink: var(--tpl-paper).
const BG_TOKENS: Record<string, { css: string; dark: boolean }> = {
  paper: { css: "var(--tpl-paper-base)", dark: false },
  surface: { css: "var(--tpl-surface-base)", dark: false },
  ink: { css: "var(--tpl-ink-base)", dark: true },
  accent: { css: "var(--tpl-accent-base)", dark: true },
};

const TEXT_TOKENS: Record<string, string> = {
  ink: "var(--tpl-ink-base)",
  inkSoft: "var(--tpl-ink-soft-base)",
  onAccent: "var(--tpl-on-accent-base)",
};

const RADIUS_VALUES: Record<string, string> = {
  none: "0px",
  sm: "4px",
  md: "10px",
  lg: "18px",
  full: "999px",
};

export function isHexColor(value: string): boolean {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim());
}

function expandHex(hex: string): [number, number, number] {
  const raw = hex.trim().slice(1);
  const full = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

/** Относительная яркость 0..1 — по ней решаем, какой текст читается на этом фоне. */
export function hexLuminance(hex: string): number {
  const [r, g, b] = expandHex(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Контрастный цвет текста для произвольного фона. */
export function contrastOn(hex: string): string {
  return hexLuminance(hex) > 0.45 ? "#14181c" : "#ffffff";
}

function resolveBg(bg: string): { css: string; dark: boolean } | null {
  if (!bg) return null;
  if (BG_TOKENS[bg]) return BG_TOKENS[bg];
  if (isHexColor(bg)) return { css: bg, dark: hexLuminance(bg) <= 0.45 };
  return null;
}

function resolveText(text: string): string | null {
  if (!text) return null;
  if (TEXT_TOKENS[text]) return TEXT_TOKENS[text];
  if (isHexColor(text)) return text;
  return null;
}

/**
 * Переопределения переменных темы для одного блока. Возвращается как обычный
 * объект «свойство → значение», чтобы одинаково использоваться и в React
 * (inline style), и в генераторе статики.
 */
function styleDeclarations(style: BlockStyle | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!style) return out;

  const bg = resolveBg(style.bg);
  if (bg) {
    out["background"] = bg.css;
    // Часть блоков (например Hero) красит фон сама через bg-[var(--tpl-paper)]
    // и перекрыла бы фон обёртки — поэтому подменяем и саму переменную.
    out["--tpl-paper"] = bg.css;

    // На тёмном фоне текст темы стал бы нечитаемым — подставляем светлый,
    // если администратор не выбрал цвет текста вручную.
    if (bg.dark && !style.text) {
      if (style.bg === "accent") {
        out["--tpl-ink"] = "var(--tpl-on-accent-base)";
        out["--tpl-ink-soft"] = "color-mix(in srgb, var(--tpl-on-accent-base) 80%, transparent)";
        // Кнопки и иконки красятся акцентом — на акцентном фоне они бы
        // слились. Меняем местами акцент и цвет текста на нём, если
        // администратор не задал свой акцент для блока.
        if (!style.accent) {
          out["--tpl-accent"] = "var(--tpl-on-accent-base)";
          out["--tpl-on-accent"] = "var(--tpl-accent-base)";
        }
      } else if (style.bg === "ink") {
        out["--tpl-ink"] = "var(--tpl-paper-base)";
        out["--tpl-ink-soft"] = "color-mix(in srgb, var(--tpl-paper-base) 78%, transparent)";
      } else {
        out["--tpl-ink"] = "#ffffff";
        out["--tpl-ink-soft"] = "rgba(255,255,255,0.8)";
      }
      out["--tpl-surface"] = "color-mix(in srgb, #ffffff 10%, transparent)";
    }
  }

  const text = resolveText(style.text);
  if (text) {
    out["--tpl-ink"] = text;
    out["--tpl-ink-soft"] = `color-mix(in srgb, ${text} 78%, transparent)`;
  }

  if (style.accent && isHexColor(style.accent)) {
    out["--tpl-accent"] = style.accent;
    out["--tpl-on-accent"] = contrastOn(style.accent);
  }

  if (style.radius && RADIUS_VALUES[style.radius]) {
    out["--tpl-radius"] = RADIUS_VALUES[style.radius];
  }

  return out;
}

/** Инлайн-стиль обёртки блока для React-рендера. */
export function blockStyleVars(style: BlockStyle | undefined): CSSProperties | undefined {
  const decls = styleDeclarations(style);
  return Object.keys(decls).length > 0 ? (decls as CSSProperties) : undefined;
}

/** `data-blk-*` атрибуты обёртки для React-рендера. */
export function blockStyleDataAttrs(style: BlockStyle | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!style) return out;
  if (style.paddingY) out["data-blk-py"] = style.paddingY;
  if (style.width) out["data-blk-width"] = style.width;
  if (style.heading) out["data-blk-h"] = style.heading;
  if (style.align) out["data-blk-align"] = style.align;
  return out;
}

/** Те же атрибуты и стиль строкой — для генератора статики. */
export function blockStyleAttrsHtml(style: BlockStyle | undefined): string {
  const attrs = blockStyleDataAttrs(style);
  const decls = styleDeclarations(style);

  const attrPart = Object.entries(attrs)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join("");

  const stylePart = Object.entries(decls)
    .map(([prop, value]) => `${prop}:${value}`)
    .join(";");

  return `${attrPart}${stylePart ? ` style="${stylePart}"` : ""}`;
}
