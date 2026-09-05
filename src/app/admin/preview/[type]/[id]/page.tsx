import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { LOCALES, type Locale } from "@/blocks/context";
import { parseBlocks } from "@/blocks/types";
import { BlockList } from "@/blocks/registry";
import { ArticleHeader } from "@/blocks/components/ArticleHeader";
import { SiteFrame } from "@/components/site/SiteFrame";
import { buildRenderContext } from "@/lib/render-context";
import { localeField } from "@/lib/locale-field";
import { getAdminT } from "@/lib/admin-i18n/server";

/**
 * Предпросмотр страницы или статьи в окружении настоящего сайта — включая
 * черновики, которые на публичных маршрутах отдают 404. Открывается кнопкой
 * «Предпросмотр» из редактора в новой вкладке.
 */
export default async function AdminPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string; id: string }>;
  searchParams: Promise<{ locale?: string }>;
}) {
  await requireAdmin();

  const { type, id } = await params;
  const { locale: rawLocale } = await searchParams;
  if (type !== "page" && type !== "post") notFound();

  const locale = (LOCALES.includes(rawLocale as Locale) ? rawLocale : "ru") as Locale;

  if (type === "page") {
    const page = await prisma.page.findUnique({ where: { id } });
    if (!page) notFound();

    const ctx = await buildRenderContext(locale, page.slug);
    return (
      <PreviewShell
        locale={locale}
        type="page"
        id={id}
        title={localeField(page, "title", locale)}
        status={page.status}
        editHref={`/admin/pages/${page.id}`}
      >
        <BlockList blocks={parseBlocks(localeField(page, "blocks", locale))} ctx={ctx} />
      </PreviewShell>
    );
  }

  const post = await prisma.post.findUnique({ where: { id }, include: { category: true } });
  if (!post) notFound();

  const cover = post.coverMediaId
    ? await prisma.media.findUnique({ where: { id: post.coverMediaId } })
    : null;
  const ctx = await buildRenderContext(locale, post.slug);

  return (
    <PreviewShell
      locale={locale}
      type="post"
      id={id}
      title={localeField(post, "title", locale)}
      status={post.status}
      editHref={`/admin/posts/${post.id}`}
    >
      <article>
        <ArticleHeader
          title={localeField(post, "title", locale)}
          categoryName={localeField(post.category, "name", locale)}
          categoryLink={`/${locale}/news/${post.category.slug}`}
          publishedAt={post.publishedAt?.toISOString() ?? null}
          cover={
            cover
              ? {
                  url: `/uploads/${cover.path}`,
                  alt: localeField(cover, "alt", locale) || post.category.nameRu,
                  width: cover.width,
                  height: cover.height,
                }
              : null
          }
        />
        <BlockList blocks={parseBlocks(localeField(post, "blocks", locale))} ctx={ctx} />
      </article>
    </PreviewShell>
  );
}

async function PreviewShell({
  locale,
  type,
  id,
  title,
  status,
  editHref,
  children,
}: {
  locale: Locale;
  type: "page" | "post";
  id: string;
  title: string;
  status: string;
  editHref: string;
  children: React.ReactNode;
}) {
  const t = await getAdminT();

  return (
    <div className="min-h-screen bg-paper">
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-5 py-2.5">
        <div className="flex items-center gap-3">
          <Link href={editHref} className="text-sm font-medium text-accent hover:text-accent-strong">
            {t("preview.back")}
          </Link>
          <span className="truncate text-sm text-ink">{title || t("common.untitled")}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
              status === "published"
                ? "bg-accent-tint text-accent-strong"
                : "bg-warning-tint text-warning"
            }`}
          >
            {status === "published" ? t("common.published") : t("common.draft")}
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm">
          {LOCALES.map((l) => (
            <Link
              key={l}
              href={`/admin/preview/${type}/${id}?locale=${l}`}
              className={`rounded px-2 py-1 font-medium ${
                l === locale ? "bg-accent-tint text-accent-strong" : "text-muted hover:text-ink"
              }`}
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>

      <SiteFrame locale={locale}>{children}</SiteFrame>
    </div>
  );
}
