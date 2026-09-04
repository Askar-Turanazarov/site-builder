import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { LOCALES, type Locale } from "@/blocks/context";
import { parseBlocks } from "@/blocks/types";
import { BlockList } from "@/blocks/registry";
import { ArticleHeader } from "@/blocks/components/ArticleHeader";
import { buildRenderContext } from "@/lib/render-context";
import { localeField } from "@/lib/locale-field";

async function getPost(slug: string) {
  return prisma.post.findFirst({
    where: { slug, status: "published" },
    include: { category: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!LOCALES.includes(rawLocale as Locale)) return {};
  const locale = rawLocale as Locale;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: localeField(post, "title", locale),
    description: localeField(post, "metaDesc", locale) || localeField(post, "excerpt", locale) || undefined,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale: rawLocale, category: categorySlug, slug } = await params;
  if (!LOCALES.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;

  const post = await getPost(slug);
  if (!post || post.category.slug !== categorySlug) notFound();

  const cover = post.coverMediaId ? await prisma.media.findUnique({ where: { id: post.coverMediaId } }) : null;
  const blocks = parseBlocks(localeField(post, "blocks", locale));
  const ctx = await buildRenderContext(locale, post.slug);

  return (
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
      <BlockList blocks={blocks} ctx={ctx} />
    </article>
  );
}
