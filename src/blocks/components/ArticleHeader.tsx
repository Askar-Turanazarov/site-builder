import type { MediaRef } from "../context";
import { CX, cx } from "../classes";

export interface ArticleHeaderProps {
  title: string;
  categoryName: string;
  categoryLink: string;
  publishedAt: string | null;
  cover: MediaRef | null;
}

/**
 * Not a registered block type — always rendered directly by the post
 * template from the Post's own fields (see plan: block trees only need to
 * carry the article body). Kept in blocks/components alongside the other
 * renderers so its markup can share CX tokens and be mirrored 1:1 by
 * lib/export/renderPostHtml.ts.
 */
export function ArticleHeader({ title, categoryName, categoryLink, publishedAt, cover }: ArticleHeaderProps) {
  return (
    <header>
      {cover && (
        <div className="aspect-[21/9] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover.url} alt={cover.alt} className="h-full w-full object-cover" />
        </div>
      )}
      <div className={cx(CX.containerNarrow, "pt-10 pb-2")}>
        <div className="flex items-center gap-3 text-sm text-[var(--tpl-ink-soft)]">
          {categoryName && (
            <a
              href={categoryLink}
              className="rounded-full px-3 py-1 font-semibold"
              style={{ background: "var(--tpl-accent)", color: "var(--tpl-on-accent)" }}
            >
              {categoryName}
            </a>
          )}
          {publishedAt && <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>}
        </div>
        {title && <h1 className={cx(CX.h1, "mt-4")}>{title}</h1>}
      </div>
    </header>
  );
}

export function formatDate(iso: string, locale: "ru" | "uz" | "en" = "ru"): string {
  const localeTag = locale === "ru" ? "ru-RU" : locale === "uz" ? "uz-UZ" : "en-GB";
  try {
    return new Intl.DateTimeFormat(localeTag, { day: "numeric", month: "long", year: "numeric" }).format(
      new Date(iso),
    );
  } catch {
    return iso;
  }
}
