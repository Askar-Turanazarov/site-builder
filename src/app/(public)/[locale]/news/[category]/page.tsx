import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { LOCALES, type Locale } from "@/blocks/context";
import { CX } from "@/blocks/classes";
import { localeField } from "@/lib/locale-field";
import { PostCard } from "@/components/site/PostCard";

async function getCategory(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, category: categorySlug } = await params;
  if (!LOCALES.includes(rawLocale as Locale)) return {};
  const category = await getCategory(categorySlug);
  if (!category) return {};
  return { title: localeField(category, "name", rawLocale as Locale) };
}

export default async function CategoryNewsPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale: rawLocale, category: categorySlug } = await params;
  if (!LOCALES.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;

  const category = await getCategory(categorySlug);
  if (!category) notFound();

  const posts = await prisma.post.findMany({
    where: { status: "published", categoryId: category.id },
    orderBy: { publishedAt: "desc" },
  });
  const covers = await prisma.media.findMany({
    where: { id: { in: posts.map((p) => p.coverMediaId).filter((x): x is string => !!x) } },
  });
  const coverMap = new Map(covers.map((c) => [c.id, `/uploads/${c.path}`]));

  return (
    <div className={CX.section}>
      <div className={CX.container}>
        <h1 className={CX.h1}>{localeField(category, "name", locale)}</h1>
        {localeField(category, "desc", locale) && (
          <p className={`${CX.lead} mt-3 max-w-2xl`}>{localeField(category, "desc", locale)}</p>
        )}
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              locale={locale}
              post={{
                slug: post.slug,
                title: localeField(post, "title", locale),
                excerpt: localeField(post, "excerpt", locale),
                categoryName: localeField(category, "name", locale),
                categorySlug: category.slug,
                coverUrl: post.coverMediaId ? (coverMap.get(post.coverMediaId) ?? null) : null,
                publishedAt: post.publishedAt?.toISOString() ?? null,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
