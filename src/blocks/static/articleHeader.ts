import { CX, cx } from "../classes";
import { escapeHtml, escapeAttr } from "./escape";
import { formatDate } from "../components/ArticleHeader";
import type { Locale } from "../context";

export interface ArticleHeaderHtmlProps {
  title: string;
  categoryName: string;
  categoryLink: string;
  publishedAt: string | null;
  cover: { url: string; alt: string } | null;
  locale: Locale;
}

export function articleHeaderToHtml({
  title,
  categoryName,
  categoryLink,
  publishedAt,
  cover,
  locale,
}: ArticleHeaderHtmlProps): string {
  const coverHtml = cover
    ? `<div class="aspect-[21/9] w-full overflow-hidden"><img src="${escapeAttr(cover.url)}" alt="${escapeAttr(cover.alt)}" class="h-full w-full object-cover" /></div>`
    : "";
  const badge = categoryName
    ? `<a href="${escapeAttr(categoryLink)}" class="rounded-full px-3 py-1 font-semibold" style="background:var(--tpl-accent);color:var(--tpl-on-accent)">${escapeHtml(categoryName)}</a>`
    : "";
  const date = publishedAt
    ? `<time datetime="${escapeAttr(publishedAt)}">${escapeHtml(formatDate(publishedAt, locale))}</time>`
    : "";

  return `
<header>
  ${coverHtml}
  <div class="${cx(CX.containerNarrow, "pt-10 pb-2")}">
    <div class="flex items-center gap-3 text-sm text-[var(--tpl-ink-soft)]">
      ${badge}
      ${date}
    </div>
    ${title ? `<h1 class="${cx(CX.h1, "mt-4")}">${escapeHtml(title)}</h1>` : ""}
  </div>
</header>`;
}
