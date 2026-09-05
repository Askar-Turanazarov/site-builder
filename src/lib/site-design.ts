import type { SiteDesign } from "@/blocks/palette";

interface SettingsLike {
  themeKey: string;
  skinKey?: string | null;
  fontDisplay?: string | null;
  fontBody?: string | null;
  accentColor?: string | null;
  paperColor?: string | null;
  inkColor?: string | null;
  radiusScale?: string | null;
}

/** Собирает объект оформления сайта из строки SiteSettings. */
export function siteDesignFromSettings(settings: SettingsLike): SiteDesign {
  return {
    themeKey: settings.themeKey,
    skinKey: settings.skinKey ?? null,
    fontDisplay: settings.fontDisplay,
    fontBody: settings.fontBody,
    accentColor: settings.accentColor,
    paperColor: settings.paperColor,
    inkColor: settings.inkColor,
    radiusScale: settings.radiusScale,
  };
}
