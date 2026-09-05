/**
 * Named theme presets for the public site. A site picks exactly one
 * (SiteSettings.themeKey) so every page/post shares one consistent visual
 * identity, regardless of which page/article template originally seeded
 * its content. Поверх пресета администратор может задать свои шрифты,
 * акцентный цвет, фон, цвет текста и скругления — экран «Дизайн сайта».
 */

export const THEME_KEYS = [
  "business",
  "agency",
  "restaurant",
  "shop",
  "blog",
  "clinic",
  "education",
  "construction",
  "law",
  "beauty",
  "fitness",
  "travel",
] as const;
export type ThemeKey = (typeof THEME_KEYS)[number];

interface ThemeVars {
  ink: string;
  inkSoft: string;
  paper: string;
  surface: string;
  accent: string;
  onAccent: string;
  radius: string;
  shadow: string;
}

export const THEME_PRESETS: Record<ThemeKey, ThemeVars> = {
  business: {
    ink: "#1b2430",
    inkSoft: "#4d5866",
    paper: "#f4f5f3",
    surface: "#ffffff",
    accent: "#b5792a",
    onAccent: "#17130b",
    radius: "10px",
    shadow: "0 1px 2px rgba(20,20,20,.06), 0 12px 28px rgba(20,20,20,.06)",
  },
  // Тёмная тема: скин «poster» строит на ней плакат, поэтому фон — почти
  // чёрный, а ink/paper поменяны местами относительно светлых тем.
  agency: {
    ink: "#f4f1ea",
    inkSoft: "#9d9a92",
    paper: "#101012",
    surface: "#191a1d",
    accent: "#ff5a36",
    onAccent: "#1a0800",
    radius: "0px",
    shadow: "none",
  },
  restaurant: {
    ink: "#2a1a14",
    inkSoft: "#6a5346",
    paper: "#f4ecdf",
    surface: "#fbf5ec",
    accent: "#7a2e3a",
    onAccent: "#fff8f3",
    radius: "16px",
    shadow: "0 10px 30px rgba(80,30,30,.10)",
  },
  shop: {
    ink: "#15181c",
    inkSoft: "#565c64",
    paper: "#ffffff",
    surface: "#f7f7f8",
    accent: "#e0245e",
    onAccent: "#ffffff",
    radius: "8px",
    shadow: "0 1px 3px rgba(0,0,0,.08), 0 8px 20px rgba(0,0,0,.05)",
  },
  blog: {
    ink: "#22201d",
    inkSoft: "#5c584f",
    paper: "#fbfaf7",
    surface: "#ffffff",
    accent: "#1f6f43",
    onAccent: "#ffffff",
    radius: "999px",
    shadow: "none",
  },
  clinic: {
    ink: "#10243a",
    inkSoft: "#4a5d73",
    paper: "#f3f7fa",
    surface: "#ffffff",
    accent: "#1f8a8c",
    onAccent: "#ffffff",
    radius: "12px",
    shadow: "0 1px 2px rgba(16,36,58,.06), 0 10px 24px rgba(16,36,58,.07)",
  },
  education: {
    ink: "#1e2340",
    inkSoft: "#4f5573",
    paper: "#f2f3f8",
    surface: "#ffffff",
    accent: "#3f5bd9",
    onAccent: "#ffffff",
    radius: "8px",
    shadow: "0 8px 22px rgba(30,35,64,.08)",
  },
  construction: {
    ink: "#1c1f24",
    inkSoft: "#4e545c",
    paper: "#eceeec",
    surface: "#ffffff",
    accent: "#e2761b",
    onAccent: "#14100b",
    radius: "4px",
    shadow: "0 2px 0 rgba(28,31,36,.12)",
  },
  law: {
    ink: "#1a2028",
    inkSoft: "#4a5563",
    paper: "#f6f4ec",
    surface: "#fffdf8",
    accent: "#8a6b34",
    onAccent: "#14100b",
    radius: "2px",
    shadow: "none",
  },
  beauty: {
    ink: "#2b1c24",
    inkSoft: "#6a5560",
    paper: "#fbf4f5",
    surface: "#ffffff",
    accent: "#c05a78",
    onAccent: "#fff8fa",
    radius: "20px",
    shadow: "0 12px 32px rgba(120,60,80,.10)",
  },
  // Вторая тёмная тема — под скин «arena»: зал, а не спортзальный лендинг
  // на белом. Акцент осветлён, иначе оливковый лайм тонет на чёрном.
  fitness: {
    ink: "#f4f6f7",
    inkSoft: "#a0a7ae",
    paper: "#0e1013",
    surface: "#171a1f",
    accent: "#b6ff2e",
    onAccent: "#101305",
    radius: "2px",
    shadow: "none",
  },
  travel: {
    ink: "#10303a",
    inkSoft: "#4a6b74",
    paper: "#eaf3f2",
    surface: "#ffffff",
    accent: "#1c9ac4",
    onAccent: "#ffffff",
    radius: "14px",
    shadow: "0 10px 26px rgba(16,48,58,.09)",
  },
};

export const THEME_LABELS: Record<ThemeKey, string> = {
  business: "Бизнес / Корпоративный",
  agency: "Агентство / Портфолио",
  restaurant: "Кафе / Ресторан",
  shop: "Интернет-магазин",
  blog: "Личный блог / Крейтор",
  clinic: "Медцентр / Клиника",
  education: "Образование / Курсы",
  construction: "Строительство / Ремонт",
  law: "Юридические услуги",
  beauty: "Салон красоты",
  fitness: "Фитнес-клуб",
  travel: "Туризм / Турагентство",
};

/**
 * Стили оформления сайта. Тема отвечает за цвет и шрифт, скин — за ритм
 * секций, меру набора, типографическую шкалу и трактовку карточек, кнопок и
 * разделителей (см. src/styles/skins.css). Разделение сделано намеренно:
 * одну и ту же палитру можно подать «газетой» или «плакатом», и наоборот.
 */
export const SKIN_KEYS = [
  "ledger",
  "poster",
  "retail",
  "menu",
  "reading",
  "care",
  "campus",
  "industrial",
  "broadsheet",
  "salon",
  "arena",
  "guide",
] as const;
export type SkinKey = (typeof SKIN_KEYS)[number];

export function isSkinKey(value: string | null | undefined): value is SkinKey {
  return !!value && (SKIN_KEYS as readonly string[]).includes(value);
}

export function isThemeKey(value: string): value is ThemeKey {
  return (THEME_KEYS as readonly string[]).includes(value);
}

// ---------------------------------------------------------------------------
// Шрифты и переопределения поверх темы
// ---------------------------------------------------------------------------

/** Курируемый список шрифтов Google Fonts — все с поддержкой кириллицы. */
export const DISPLAY_FONTS = [
  "Manrope",
  "Montserrat",
  "Playfair Display",
  "Merriweather",
  "Oswald",
  "Rubik",
  "Cormorant Garamond",
  "PT Serif",
] as const;

export const BODY_FONTS = [
  "IBM Plex Sans",
  "Inter",
  "Roboto",
  "Open Sans",
  "Noto Sans",
  "PT Sans",
  "Lora",
  "Nunito",
] as const;

const SERIF_FONTS = new Set([
  "Playfair Display",
  "Merriweather",
  "Cormorant Garamond",
  "PT Serif",
  "Lora",
]);

export const RADIUS_SCALES: Record<string, string> = {
  none: "0px",
  sm: "4px",
  md: "10px",
  lg: "18px",
  full: "999px",
};

export interface SiteDesign {
  themeKey: string;
  /** Ключ стиля оформления; null — базовое оформление без скина. */
  skinKey?: string | null;
  fontDisplay?: string | null;
  fontBody?: string | null;
  accentColor?: string | null;
  paperColor?: string | null;
  inkColor?: string | null;
  radiusScale?: string | null;
}

function fontStack(font: string): string {
  return `"${font}", ${SERIF_FONTS.has(font) ? "serif" : "sans-serif"}`;
}

/** Значения всех переменных темы с учётом переопределений администратора. */
function resolveVars(design: SiteDesign): Record<string, string> {
  const theme = THEME_PRESETS[isThemeKey(design.themeKey) ? design.themeKey : "business"];

  const ink = design.inkColor || theme.ink;
  const paper = design.paperColor || theme.paper;
  const accent = design.accentColor || theme.accent;
  const radius =
    (design.radiusScale && RADIUS_SCALES[design.radiusScale]) || theme.radius;

  return {
    "--tpl-ink": ink,
    "--tpl-ink-soft": design.inkColor
      ? `color-mix(in srgb, ${ink} 72%, transparent)`
      : theme.inkSoft,
    "--tpl-paper": paper,
    "--tpl-surface": theme.surface,
    "--tpl-accent": accent,
    "--tpl-on-accent": design.accentColor ? contrastText(accent) : theme.onAccent,
    "--tpl-radius": radius,
    "--tpl-shadow": theme.shadow,
  };
}

/** Простая проверка контраста для произвольного акцентного цвета. */
function contrastText(hex: string): string {
  const raw = hex.replace("#", "");
  const full = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  if (full.length !== 6) return "#ffffff";
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return luminance > 0.45 ? "#14181c" : "#ffffff";
}

/**
 * Инлайн-переменные темы. Кроме рабочих `--tpl-*` объявляются их
 * неизменяемые копии `--tpl-*-base`: пер-блочные стили ссылаются именно на
 * них, иначе «тёмный фон блока» дал бы одновременно `--tpl-paper: var(--tpl-ink)`
 * и `--tpl-ink: var(--tpl-paper)` — циклическую ссылку, при которой обе
 * переменные становятся недействительными.
 */
export function themeStyleVars(design: SiteDesign | string): React.CSSProperties {
  const d: SiteDesign = typeof design === "string" ? { themeKey: design } : design;
  const vars = resolveVars(d);

  return {
    ...vars,
    "--tpl-ink-base": vars["--tpl-ink"],
    "--tpl-ink-soft-base": vars["--tpl-ink-soft"],
    "--tpl-paper-base": vars["--tpl-paper"],
    "--tpl-surface-base": vars["--tpl-surface"],
    "--tpl-accent-base": vars["--tpl-accent"],
    "--tpl-on-accent-base": vars["--tpl-on-accent"],
    "--tpl-font-display": d.fontDisplay ? fontStack(d.fontDisplay) : "var(--font-display)",
    "--tpl-font-body": d.fontBody ? fontStack(d.fontBody) : "var(--font-body)",
  } as React.CSSProperties;
}

/** Те же переменные строкой — для статического экспорта. */
export function themeStyleCss(design: SiteDesign | string): string {
  const d: SiteDesign = typeof design === "string" ? { themeKey: design } : design;
  const vars = resolveVars(d);

  return [
    ...Object.entries(vars).map(([key, value]) => `${key}:${value}`),
    `--tpl-ink-base:${vars["--tpl-ink"]}`,
    `--tpl-ink-soft-base:${vars["--tpl-ink-soft"]}`,
    `--tpl-paper-base:${vars["--tpl-paper"]}`,
    `--tpl-surface-base:${vars["--tpl-surface"]}`,
    `--tpl-accent-base:${vars["--tpl-accent"]}`,
    `--tpl-on-accent-base:${vars["--tpl-on-accent"]}`,
    `--tpl-font-display:${fontStack(d.fontDisplay || "Manrope")}`,
    `--tpl-font-body:${fontStack(d.fontBody || "IBM Plex Sans")}`,
  ].join(";");
}

/**
 * URL таблицы стилей Google Fonts для выбранных шрифтов, либо null, если
 * администратор оставил шрифты темы (их грузит next/font на этапе сборки).
 */
export function googleFontsHref(design: SiteDesign, options?: { always?: boolean }): string | null {
  const families: string[] = [];
  const display = design.fontDisplay || (options?.always ? "Manrope" : null);
  const body = design.fontBody || (options?.always ? "IBM Plex Sans" : null);

  if (display) families.push(`family=${display.replace(/ /g, "+")}:wght@500;600;700;800`);
  if (body && body !== display) families.push(`family=${body.replace(/ /g, "+")}:wght@400;500;600;700`);
  if (families.length === 0) return null;

  return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`;
}
