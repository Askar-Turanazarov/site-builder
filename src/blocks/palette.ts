/**
 * Named theme presets for the public site. A site picks exactly one
 * (SiteSettings.themeKey) so every page/post shares one consistent visual
 * identity, regardless of which page/article template originally seeded
 * its content. Each preset only varies color, radius and shadow — type
 * stays on the shared Manrope/IBM Plex Sans pairing used everywhere —
 * which is enough to make the 5 site types feel genuinely distinct
 * without multiplying font-loading and layout complexity.
 */

export const THEME_KEYS = ["business", "agency", "restaurant", "shop", "blog"] as const;
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
  agency: {
    ink: "#16171a",
    inkSoft: "#54524b",
    paper: "#efede8",
    surface: "#ffffff",
    accent: "#ff5a36",
    onAccent: "#1a0800",
    radius: "3px",
    shadow: "none",
  },
  restaurant: {
    ink: "#241417",
    inkSoft: "#5c4a46",
    paper: "#f2ede4",
    surface: "#fffaf3",
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
    accent: "#5b6ef5",
    onAccent: "#ffffff",
    radius: "999px",
    shadow: "none",
  },
};

export const THEME_LABELS: Record<ThemeKey, string> = {
  business: "Бизнес / Корпоративный",
  agency: "Агентство / Портфолио",
  restaurant: "Кафе / Ресторан",
  shop: "Интернет-магазин",
  blog: "Личный блог / Крейтор",
};

export function isThemeKey(value: string): value is ThemeKey {
  return (THEME_KEYS as readonly string[]).includes(value);
}

/** Inline style object setting every `--tpl-*` CSS variable for a theme. */
export function themeStyleVars(themeKey: string): React.CSSProperties {
  const theme = THEME_PRESETS[isThemeKey(themeKey) ? themeKey : "business"];
  return {
    "--tpl-ink": theme.ink,
    "--tpl-ink-soft": theme.inkSoft,
    "--tpl-paper": theme.paper,
    "--tpl-surface": theme.surface,
    "--tpl-accent": theme.accent,
    "--tpl-on-accent": theme.onAccent,
    "--tpl-radius": theme.radius,
    "--tpl-shadow": theme.shadow,
    "--tpl-font-display": "var(--font-display)",
    "--tpl-font-body": "var(--font-body)",
  } as React.CSSProperties;
}

/** Same variables as a CSS string, for the static-export page shell. */
export function themeStyleCss(themeKey: string): string {
  const theme = THEME_PRESETS[isThemeKey(themeKey) ? themeKey : "business"];
  return [
    `--tpl-ink:${theme.ink}`,
    `--tpl-ink-soft:${theme.inkSoft}`,
    `--tpl-paper:${theme.paper}`,
    `--tpl-surface:${theme.surface}`,
    `--tpl-accent:${theme.accent}`,
    `--tpl-on-accent:${theme.onAccent}`,
    `--tpl-radius:${theme.radius}`,
    `--tpl-shadow:${theme.shadow}`,
    `--tpl-font-display:"Manrope",sans-serif`,
    `--tpl-font-body:"IBM Plex Sans",sans-serif`,
  ].join(";");
}
