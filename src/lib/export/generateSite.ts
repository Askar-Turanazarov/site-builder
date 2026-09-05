import path from "node:path";
import { readFile } from "node:fs/promises";
import { prisma } from "@/lib/prisma";
import { LOCALES, type Locale, type RenderContext, type MediaRef } from "@/blocks/context";
import { parseBlocks } from "@/blocks/types";
import { blockListToHtml } from "@/blocks/registry";
import { articleHeaderToHtml } from "@/blocks/static/articleHeader";
import { localeField } from "@/lib/locale-field";
import { resolveMenuItems } from "@/lib/menu";
import { siteDesignFromSettings } from "@/lib/site-design";
import { renderDocument, type ShellData } from "./shell";
import { SITE_JS } from "./site.js.template";
import { CX } from "@/blocks/classes";

export interface ExportFile {
  path: string; // site-root-relative, e.g. "ru/index.html" or "assets/styles.css"
  content: string | Buffer;
}

export interface ExportResult {
  files: ExportFile[];
  summary: { pages: number; posts: number; locales: number; assets: number };
}

export async function generateSite(): Promise<ExportResult> {
  const [settings, pages, posts, categories, menuItems, dictionary, media] = await Promise.all([
    prisma.siteSettings.upsert({ where: { id: "singleton" }, update: {}, create: { id: "singleton", siteNameRu: "Сайт", siteNameUz: "Sayt", siteNameEn: "Site" } }),
    prisma.page.findMany({ where: { status: "published" } }),
    prisma.post.findMany({ where: { status: "published" }, include: { category: true } }),
    prisma.category.findMany(),
    prisma.menuItem.findMany({
      include: { page: { select: { slug: true, isHomepage: true } }, category: { select: { slug: true } } },
    }),
    prisma.dictionaryEntry.findMany(),
    prisma.media.findMany(),
  ]);

  const design = siteDesignFromSettings(settings);
  const files: ExportFile[] = [];
  const usedMediaIds = new Set<string>();

  function mediaMapFor(locale: Locale): Record<string, MediaRef> {
    const map: Record<string, MediaRef> = {};
    for (const m of media) {
      const alt = (locale === "ru" ? m.altRu : locale === "uz" ? m.altUz : m.altEn) || m.altRu || m.filename;
      map[m.id] = { url: `/assets/uploads/${m.path}`, alt, width: m.width, height: m.height };
    }
    return map;
  }

  function dictFor(locale: Locale) {
    const rows = new Map(dictionary.map((e) => [e.key, e]));
    return (key: string) => {
      const entry = rows.get(key);
      if (!entry) return key;
      const value = locale === "ru" ? entry.valueRu : locale === "uz" ? entry.valueUz : entry.valueEn;
      return value || entry.valueRu || key;
    };
  }

  function trackMedia(blocksJson: string) {
    for (const block of parseBlocks(blocksJson)) {
      const data = block.data as Record<string, unknown>;
      collectMediaIds(data, usedMediaIds);
    }
  }

  for (const p of pages) {
    trackMedia(p.blocksRu);
    trackMedia(p.blocksUz);
    trackMedia(p.blocksEn);
  }
  for (const p of posts) {
    trackMedia(p.blocksRu);
    trackMedia(p.blocksUz);
    trackMedia(p.blocksEn);
    if (p.coverMediaId) usedMediaIds.add(p.coverMediaId);
  }
  if (settings.logoMediaId) usedMediaIds.add(settings.logoMediaId);

  for (const locale of LOCALES) {
    const mediaMap = mediaMapFor(locale);
    const t = dictFor(locale);
    const siteName = localeField(settings, "siteName", locale);

    const shell: ShellData = {
      siteName,
      tagline: localeField(settings, "tagline", locale) || null,
      footerNote: localeField(settings, "footerNote", locale) || null,
      logoUrl: settings.logoMediaId ? mediaMap[settings.logoMediaId]?.url ?? null : null,
      homeHref: `/${locale}/`,
      headerItems: resolveMenuItems(menuItems.filter((i) => i.location === "header"), locale),
      footerItems: resolveMenuItems(menuItems.filter((i) => i.location === "footer"), locale),
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone,
      contactAddress: localeField(settings, "contactAddress", locale) || null,
      locale,
    };

    function ctxFor(pageSlug: string): RenderContext {
      return {
        locale,
        media: mediaMap,
        t,
        pageSlug,
        contactFormAction: settings.contactFormAction,
        contactEmail: settings.contactEmail,
      };
    }

    // Pages (homepage + regular)
    for (const page of pages) {
      const blocks = parseBlocks(localeField(page, "blocks", locale));
      const bodyHtml = blockListToHtml(blocks, ctxFor(page.slug));
      const title = localeField(page, "title", locale);
      const description = localeField(page, "metaDesc", locale) || null;

      if (page.isHomepage) {
        files.push({
          path: `${locale}/index.html`,
          content: renderDocument({ shell, design, title, description, pathAfterLocale: "", bodyHtml }),
        });
      } else {
        files.push({
          path: `${locale}/${page.slug}/index.html`,
          content: renderDocument({ shell, design, title, description, pathAfterLocale: `${page.slug}/`, bodyHtml }),
        });
      }
    }

    // News index
    const postCards = posts
      .slice()
      .sort((a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0))
      .map((post) => postCardHtml(post, locale, mediaMap))
      .join("\n");
    files.push({
      path: `${locale}/news/index.html`,
      content: renderDocument({
        shell,
        design,
        title: t("nav.news"),
        description: null,
        pathAfterLocale: "news/",
        bodyHtml: `<div class="${CX.section}"><div class="${CX.container}"><h1 class="${CX.h1}">${t("nav.news")}</h1><div class="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">${postCards}</div></div></div>`,
      }),
    });

    // Category indexes
    for (const category of categories) {
      const categoryPosts = posts
        .filter((p) => p.categoryId === category.id)
        .sort((a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0))
        .map((post) => postCardHtml(post, locale, mediaMap))
        .join("\n");
      const name = localeField(category, "name", locale);
      const desc = localeField(category, "desc", locale);
      files.push({
        path: `${locale}/news/${category.slug}/index.html`,
        content: renderDocument({
          shell,
          design,
          title: name,
          description: desc || null,
          pathAfterLocale: `news/${category.slug}/`,
          bodyHtml: `<div class="${CX.section}"><div class="${CX.container}"><h1 class="${CX.h1}">${name}</h1>${desc ? `<p class="${CX.lead} mt-3 max-w-2xl">${desc}</p>` : ""}<div class="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">${categoryPosts}</div></div></div>`,
        }),
      });
    }

    // Articles
    for (const post of posts) {
      const blocks = parseBlocks(localeField(post, "blocks", locale));
      const bodyHtml = blockListToHtml(blocks, ctxFor(post.slug));
      const cover = post.coverMediaId ? mediaMap[post.coverMediaId] : null;
      const headerHtml = articleHeaderToHtml({
        title: localeField(post, "title", locale),
        categoryName: localeField(post.category, "name", locale),
        categoryLink: `/${locale}/news/${post.category.slug}/`,
        publishedAt: post.publishedAt?.toISOString() ?? null,
        cover: cover ? { url: cover.url, alt: cover.alt } : null,
        locale,
      });
      files.push({
        path: `${locale}/news/${post.category.slug}/${post.slug}/index.html`,
        content: renderDocument({
          shell,
          design,
          title: localeField(post, "title", locale),
          description: localeField(post, "metaDesc", locale) || localeField(post, "excerpt", locale) || null,
          pathAfterLocale: `news/${post.category.slug}/${post.slug}/`,
          bodyHtml: `<article>${headerHtml}${bodyHtml}</article>`,
        }),
      });
    }
  }

  // Assets: compiled CSS + JS
  const cssPath = path.join(process.cwd(), "src/lib/export/assets/tailwind.generated.css");
  let css = "";
  try {
    css = await readFile(cssPath, "utf-8");
  } catch {
    css = "/* Run `npm run build:export-css` to generate this stylesheet. */";
  }
  files.push({ path: "assets/styles.css", content: css });
  files.push({ path: "assets/site.js", content: SITE_JS });

  // Referenced media
  let assetCount = 0;
  for (const id of usedMediaIds) {
    const m = media.find((x) => x.id === id);
    if (!m) continue;
    try {
      const buf = await readFile(path.join(process.cwd(), "public", "uploads", m.path));
      files.push({ path: `assets/uploads/${m.path}`, content: buf });
      assetCount++;
    } catch {
      // file missing on disk — skip rather than fail the whole export
    }
  }

  // Root redirect
  const defaultLocale = LOCALES.includes(settings.defaultLocale as Locale) ? settings.defaultLocale : "ru";
  files.push({
    path: "index.html",
    content: `<!doctype html><html><head><meta charset="utf-8" /><meta http-equiv="refresh" content="0; url=/${defaultLocale}/" /><title>${localeField(settings, "siteName", defaultLocale as Locale)}</title></head><body></body></html>`,
  });

  return {
    files,
    summary: { pages: pages.length, posts: posts.length, locales: LOCALES.length, assets: assetCount },
  };
}

function postCardHtml(
  post: { slug: string; category: { slug: string }; coverMediaId: string | null; publishedAt: Date | null } & Record<string, unknown>,
  locale: Locale,
  mediaMap: Record<string, MediaRef>,
): string {
  const title = localeField(post, "title", locale);
  const excerpt = localeField(post, "excerpt", locale);
  const categoryName = localeField(post.category as unknown as Record<string, unknown>, "name", locale);
  const cover = post.coverMediaId ? mediaMap[post.coverMediaId] : null;
  const date = post.publishedAt
    ? new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : locale === "uz" ? "uz-UZ" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(post.publishedAt)
    : "";

  return `
<article class="group">
  <a href="/${locale}/news/${post.category.slug}/${post.slug}/" class="block">
    <div class="sb-post-cover aspect-[4/3] overflow-hidden rounded-[var(--tpl-radius)] bg-[var(--tpl-surface)]">
      ${cover ? `<img src="${cover.url}" alt="${title}" class="h-full w-full object-cover transition duration-300 group-hover:scale-105" />` : ""}
    </div>
    <div class="mt-4 flex items-center gap-2 text-xs text-[var(--tpl-ink-soft)]">
      <span class="font-semibold text-[var(--tpl-accent)]">${categoryName}</span>
      ${date ? `<span>· ${date}</span>` : ""}
    </div>
    <h3 class="mt-1.5 [font-family:var(--tpl-font-display)] text-lg font-semibold text-[var(--tpl-ink)]">${title}</h3>
    ${excerpt ? `<p class="mt-1.5 line-clamp-2 text-sm text-[var(--tpl-ink-soft)]">${excerpt}</p>` : ""}
  </a>
</article>`;
}

function collectMediaIds(value: unknown, out: Set<string>) {
  if (value == null) return;
  if (typeof value === "string") return;
  if (Array.isArray(value)) {
    for (const item of value) collectMediaIds(item, out);
    return;
  }
  if (typeof value === "object") {
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      if (key.toLowerCase().includes("mediaid") && typeof val === "string") {
        out.add(val);
      } else {
        collectMediaIds(val, out);
      }
    }
  }
}
