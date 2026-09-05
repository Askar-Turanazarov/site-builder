export const LOCALES = ["ru", "uz", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export interface MediaRef {
  url: string;
  alt: string;
  width: number | null;
  height: number | null;
}

/**
 * Shared render context passed to every block's live component and static
 * HTML generator. `media` is a pre-resolved map from Media.id to a usable
 * <img> src + alt, built once per page render (a single query) so neither
 * renderer needs to touch Prisma itself — this keeps `blocks/static/*`
 * pure functions, safely reusable by the export pipeline outside a request.
 * `t` resolves DictionaryEntry UI strings a block needs but that aren't
 * part of the editable block data (e.g. a gallery's lightbox "close" label).
 */
export interface RenderContext {
  locale: Locale;
  media: Record<string, MediaRef>;
  t: (key: string) => string;
  /** Slug of the page/post currently rendering, for attributing form submissions etc. */
  pageSlug?: string | null;
  /**
   * Префикс для внутренних ссылок. Пусто на настоящем сайте (`/ru/about`) и
   * равно `/demo/<ключ>` в демонстрации шаблона, чтобы меню и кнопки внутри
   * демо водили по самому демо, а не по страницам собранного сайта.
   */
  linkBase?: string;
  /**
   * Only meaningful to the static-export ContactForm generator: an external
   * form endpoint (e.g. a Formspree-style URL) to submit to, since the
   * exported site has no backend of its own. The live site ignores this
   * and posts to a Server Action instead.
   */
  contactFormAction?: string | null;
  /** Fallback for the static-export ContactForm generator when no external contactFormAction is configured. */
  contactEmail?: string | null;
}

export function resolveMedia(ctx: RenderContext, mediaId: string | null): MediaRef | null {
  if (!mediaId) return null;
  return ctx.media[mediaId] ?? null;
}
