import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { LOCALES, type Locale } from "@/blocks/context";
import { CX } from "@/blocks/classes";
import { localeField } from "@/lib/locale-field";
import { loadDictionary } from "@/lib/i18n";
import { PostCard } from "@/components/site/PostCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!LOCALES.includes(rawLocale as Locale)) return {};
  const t = await loadDictionary(rawLocale as Locale);
  return { title: t("nav.news") };
}

export default async function NewsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!LOCALES.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;

  const [posts, t] = await Promise.all([
    prisma.post.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      include: { category: true },
    }),
    loadDictionary(locale),
  ]);

  const covers = await prisma.media.findMany({
    where: { id: { in: posts.map((p) => p.coverMediaId).filter((x): x is string => !!x) } },
  });
  const coverMap = new Map(covers.map((c) => [c.id, `/uploads/${c.path}`]));

  return (
    <div className={CX.section}>
      <div className={CX.container}>
        <h1 className={CX.h1}>{t("nav.news")}</h1>
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              locale={locale}
              post={{
                slug: post.slug,
                title: localeField(post, "title", locale),
                excerpt: localeField(post, "excerpt", locale),
                categoryName: localeField(post.category, "name", locale),
                categorySlug: post.category.slug,
                coverUrl: post.coverMediaId ? (coverMap.get(post.coverMediaId) ?? null) : null,
                publishedAt: post.publishedAt?.toISOString() ?? null,
              }}
            />
          ))}
        </div>
        {posts.length === 0 && <p className="mt-8 text-sm text-[var(--tpl-ink-soft)]">—</p>}
      </div>
    </div>
  );
}
