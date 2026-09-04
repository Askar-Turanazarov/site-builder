import type { Locale } from "@/blocks/context";
import type { ResolvedMenuItem } from "@/lib/menu";
import { themeStyleCss, type ThemeKey } from "@/blocks/palette";
import { escapeHtml, escapeAttr } from "@/blocks/static/escape";

/**
 * All hrefs in the export are site-root-absolute ("/ru/about.html",
 * "/assets/styles.css") — this is how every real static host serves a
 * deployed site (Netlify, GitHub Pages, S3, Nginx at a domain root), so
 * it's the right default. The one consequence: opening an exported page
 * directly via file:// won't resolve these paths — the export screen
 * tells the admin to preview with a local static server instead.
 */
export interface ShellData {
  siteName: string;
  tagline: string | null;
  footerNote: string | null;
  logoUrl: string | null;
  homeHref: string;
  headerItems: ResolvedMenuItem[];
  footerItems: ResolvedMenuItem[];
  contactEmail: string | null;
  contactPhone: string | null;
  contactAddress: string | null;
  locale: Locale;
}

function navLinksHtml(items: ResolvedMenuItem[], className: string): string {
  return items
    .map((item) => `<a href="${escapeAttr(item.href)}" class="${className}">${escapeHtml(item.label)}</a>`)
    .join("\n");
}

/** `pathAfterLocale` is the current page's path with the /{locale} segment stripped, e.g. "news/events/slug.html" or "" for the homepage. */
function localeSwitcherHtml(locale: Locale, pathAfterLocale: string): string {
  const labels: Record<Locale, string> = { ru: "RU", uz: "UZ", en: "EN" };
  const locales: Locale[] = ["ru", "uz", "en"];
  return `<div class="flex items-center gap-1 text-sm">${locales
    .map((l, i) => {
      const active = l === locale;
      const href = `/${l}/${pathAfterLocale}`;
      return `${i > 0 ? '<span class="text-[var(--tpl-ink)]/20">/</span>' : ""}<a href="${escapeAttr(href)}" class="${active ? "font-semibold text-[var(--tpl-ink)]" : "text-[var(--tpl-ink-soft)] hover:text-[var(--tpl-ink)]"}">${labels[l]}</a>`;
    })
    .join("")}</div>`;
}

function headerHtml(data: ShellData, pathAfterLocale: string): string {
  const logo = data.logoUrl
    ? `<img src="${escapeAttr(data.logoUrl)}" alt="${escapeAttr(data.siteName)}" class="h-8 w-auto" />`
    : `<span class="[font-family:var(--tpl-font-display)] text-lg font-bold text-[var(--tpl-ink)]">${escapeHtml(data.siteName)}</span>`;

  return `
<header class="border-b border-[var(--tpl-ink)]/10 bg-[var(--tpl-surface)]">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
    <a href="${escapeAttr(data.homeHref)}" class="flex items-center gap-2.5">${logo}</a>
    <nav class="hidden items-center gap-7 md:flex">
      ${navLinksHtml(data.headerItems, "text-sm font-medium text-[var(--tpl-ink-soft)] transition hover:text-[var(--tpl-ink)]")}
      ${localeSwitcherHtml(data.locale, pathAfterLocale)}
    </nav>
    <button type="button" data-nav-toggle class="rounded-md p-2 text-[var(--tpl-ink)] md:hidden" aria-label="Menu">
      <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></svg>
    </button>
  </div>
  <nav data-nav-menu hidden class="border-t border-[var(--tpl-ink)]/10 px-6 py-4 md:hidden">
    <div class="flex flex-col gap-3">
      ${navLinksHtml(data.headerItems, "text-sm font-medium text-[var(--tpl-ink-soft)]")}
      <div class="pt-2">${localeSwitcherHtml(data.locale, pathAfterLocale)}</div>
    </div>
  </nav>
</header>`;
}

function footerHtml(data: ShellData): string {
  const contact = [data.contactAddress, data.contactPhone, data.contactEmail].filter(Boolean);
  return `
<footer class="border-t border-[var(--tpl-ink)]/10 bg-[var(--tpl-surface)]">
  <div class="mx-auto max-w-6xl px-6 py-12">
    <div class="grid gap-8 sm:grid-cols-3">
      <div>
        <div class="[font-family:var(--tpl-font-display)] text-base font-bold text-[var(--tpl-ink)]">${escapeHtml(data.siteName)}</div>
        ${data.tagline ? `<p class="mt-2 text-sm text-[var(--tpl-ink-soft)]">${escapeHtml(data.tagline)}</p>` : ""}
      </div>
      ${data.footerItems.length > 0 ? `<div class="flex flex-col gap-2">${navLinksHtml(data.footerItems, "text-sm text-[var(--tpl-ink-soft)] hover:text-[var(--tpl-ink)]")}</div>` : ""}
      ${contact.length > 0 ? `<div class="space-y-1.5 text-sm text-[var(--tpl-ink-soft)]">${contact.map((c) => `<p>${escapeHtml(c!)}</p>`).join("")}</div>` : ""}
    </div>
    ${data.footerNote ? `<p class="mt-10 border-t border-[var(--tpl-ink)]/10 pt-6 text-xs text-[var(--tpl-ink-soft)]">${escapeHtml(data.footerNote)}</p>` : ""}
  </div>
</footer>`;
}

export function renderDocument({
  shell,
  themeKey,
  title,
  description,
  pathAfterLocale,
  bodyHtml,
}: {
  shell: ShellData;
  themeKey: ThemeKey;
  title: string;
  description: string | null;
  pathAfterLocale: string;
  bodyHtml: string;
}): string {
  return `<!doctype html>
<html lang="${shell.locale}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}${title ? " — " : ""}${escapeHtml(shell.siteName)}</title>
${description ? `<meta name="description" content="${escapeAttr(description)}" />` : ""}
<link rel="stylesheet" href="/assets/styles.css" />
</head>
<body style="${themeStyleCss(themeKey)}">
<div class="flex min-h-screen flex-col bg-[var(--tpl-paper)]">
${headerHtml(shell, pathAfterLocale)}
<main class="flex-1">
${bodyHtml}
</main>
${footerHtml(shell)}
</div>
<script src="/assets/site.js"></script>
</body>
</html>`;
}
