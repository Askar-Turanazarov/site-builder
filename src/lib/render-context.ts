import type { RenderContext, Locale } from "@/blocks/context";
import { buildMediaMap } from "@/lib/media-map";
import { loadDictionary } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/site-settings";

export async function buildRenderContext(locale: Locale, pageSlug?: string | null): Promise<RenderContext> {
  const [media, t, settings] = await Promise.all([
    buildMediaMap(locale),
    loadDictionary(locale),
    getSiteSettings(),
  ]);

  return {
    locale,
    media,
    t,
    pageSlug: pageSlug ?? null,
    contactFormAction: settings.contactFormAction,
    contactEmail: settings.contactEmail,
  };
}
