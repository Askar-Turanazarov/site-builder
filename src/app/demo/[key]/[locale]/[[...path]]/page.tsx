import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/blocks/context";
import { BlockList } from "@/blocks/registry";
import { CX, cx } from "@/blocks/classes";
import { ArticleHeader } from "@/blocks/components/ArticleHeader";
import { PostCard } from "@/components/site/PostCard";
import { TemplateDemo } from "@/components/templates/TemplateDemo";
import { getSession } from "@/lib/auth";
import { getPortalT } from "@/lib/portal-i18n/server";
import { getSiteTemplate, materializeBlocks, templatePostCover } from "@/lib/site-templates";
import { templateArtMediaMap } from "@/lib/site-templates/art";
import { buildDemoContext, demoBase, demoHref, resolveDemoTarget } from "@/lib/site-templates/demo";
import type { SiteTemplate, SiteTemplatePost } from "@/lib/site-templates";

/**
 * Публичная демонстрация шаблона: /demo/<ключ>/<язык>/<путь>.
 *
 * Один маршрут обслуживает все страницы шаблона, ленту новостей, рубрику и
 * статью — разбор адреса живёт в resolveDemoTarget, поэтому здесь остаётся
 * только выбор разметки. В базу ничего не пишется: шаблон рендерится прямо
 * из своих данных, картинки берутся из набора графики шаблона.
 */

interface Params {
  key: string;
  locale: string;
  path?: string[];
}

async function load(params: Promise<Params>) {
  const { key, locale: rawLocale, path } = await params;
  const template = getSiteTemplate(key);
  if (!template || !LOCALES.includes(rawLocale as Locale)) notFound();
  return { template, locale: rawLocale as Locale, path: path ?? [] };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { key, locale } = await params;
  const template = getSiteTemplate(key);
  if (!template || !LOCALES.includes(locale as Locale)) return {};
  const l = locale as Locale;
  return {
    title: `${template.settings.siteName[l]} — ${template.label[l]}`,
    description: template.description[l],
  };
}

export default async function TemplateDemoPage({ params }: { params: Promise<Params> }) {
  const { template, locale, path } = await load(params);
  const target = resolveDemoTarget(template, path);
  const pageSlug = target.kind === "page" ? target.slug : target.kind === "post" ? target.slug : null;

  const [t, session, ctx] = await Promise.all([
    getPortalT(),
    getSession(),
    buildDemoContext(template, locale, pageSlug),
  ]);

  const applyTarget = `/admin/templates?apply=${template.key}`;
  const applyHref = session
    ? applyTarget
    : `/admin/login?next=${encodeURIComponent(applyTarget)}`;

  return (
    <TemplateDemo
      template={template}
      locale={locale}
      path={path.join("/")}
      t={t}
      applyHref={applyHref}
    >
      {target.kind === "page" && (
        <BlockList
          blocks={materializeBlocks(
            template.pages.find((p) => p.slug === target.slug)!.blocks,
            locale,
            template.key,
          )}
          ctx={ctx}
        />
      )}

      {(target.kind === "news" || target.kind === "category") && (
        <PostList
          template={template}
          locale={locale}
          categorySlug={target.kind === "category" ? target.slug : null}
          newsLabel={ctx.t("nav.news")}
        />
      )}

      {target.kind === "post" && <PostView template={template} locale={locale} slug={target.slug} ctx={ctx} />}

      {target.kind === "missing" && (
        <section className={CX.section}>
          <div className={CX.containerNarrow}>
            <h1 className={CX.h1}>{t("demo.notFound")}</h1>
            <Link href={demoHref(template.key, locale)} className={cx(CX.button, CX.buttonSolid, "mt-6")}>
              {template.pages.find((p) => p.isHomepage)?.title[locale] ?? t("nav.home")}
            </Link>
          </div>
        </section>
      )}
    </TemplateDemo>
  );
}

function PostList({
  template,
  locale,
  categorySlug,
  newsLabel,
}: {
  template: SiteTemplate;
  locale: Locale;
  categorySlug: string | null;
  newsLabel: string;
}) {
  const category = categorySlug ? template.categories.find((c) => c.slug === categorySlug) : null;
  const posts = template.posts
    .map((post, index) => ({ post, index }))
    .filter(({ post }) => !categorySlug || post.categorySlug === categorySlug);

  return (
    <div className={CX.section}>
      <div className={CX.container}>
        <h1 className={CX.h1}>{category ? category.name[locale] : newsLabel}</h1>
        {category && <p className={cx(CX.lead, "mt-4 max-w-2xl")}>{category.description[locale]}</p>}

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(({ post, index }) => (
            <PostCard
              key={post.slug}
              locale={locale}
              base={demoBase(template.key)}
              post={{
                slug: post.slug,
                title: post.title[locale],
                excerpt: post.excerpt[locale],
                categoryName:
                  template.categories.find((c) => c.slug === post.categorySlug)?.name[locale] ?? "",
                categorySlug: post.categorySlug,
                coverUrl: coverUrl(template.key, index, locale),
                publishedAt: null,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PostView({
  template,
  locale,
  slug,
  ctx,
}: {
  template: SiteTemplate;
  locale: Locale;
  slug: string;
  ctx: Awaited<ReturnType<typeof buildDemoContext>>;
}) {
  const index = template.posts.findIndex((p) => p.slug === slug);
  const post = template.posts[index] as SiteTemplatePost;
  const category = template.categories.find((c) => c.slug === post.categorySlug);
  const cover = coverUrl(template.key, index, locale);

  return (
    <article>
      <ArticleHeader
        title={post.title[locale]}
        categoryName={category?.name[locale] ?? ""}
        categoryLink={demoHref(template.key, locale, `news/${post.categorySlug}`)}
        publishedAt={null}
        cover={cover ? { url: cover, alt: post.title[locale], width: 1200, height: 900 } : null}
      />
      <BlockList blocks={materializeBlocks(post.blocks, locale, template.key)} ctx={ctx} />
    </article>
  );
}

/** Обложки статей берутся из того же набора графики, что и остальные картинки. */
function coverUrl(templateKey: string, index: number, locale: Locale): string | null {
  const id = templatePostCover(templateKey, index);
  return templateArtMediaMap(templateKey, "", locale)[id]?.url ?? null;
}
