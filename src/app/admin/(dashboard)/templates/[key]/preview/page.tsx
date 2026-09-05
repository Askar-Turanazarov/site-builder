import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, type Locale } from "@/blocks/context";
import { BlockList } from "@/blocks/registry";
import { googleFontsHref, themeStyleVars, type SiteDesign } from "@/blocks/palette";
import { buildRenderContext } from "@/lib/render-context";
import { getAdminT } from "@/lib/admin-i18n/server";
import { getSiteTemplate, materializeBlocks } from "@/lib/site-templates";
import type { ResolvedMenuItem } from "@/lib/menu";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ApplyTemplateButton } from "./ApplyTemplateButton";

/**
 * Демонстрация шаблона: страницы рендерятся прямо из данных шаблона, в базу
 * ничего не пишется. Шапка, подвал, тема и шрифты берутся из самого шаблона,
 * поэтому демо показывает ровно то, что появится после применения.
 */
export default async function SiteTemplatePreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ locale?: string; page?: string }>;
}) {
  const { key } = await params;
  const { locale: rawLocale, page: rawPage } = await searchParams;

  const template = getSiteTemplate(key);
  if (!template) notFound();

  const locale = (LOCALES.includes(rawLocale as Locale) ? rawLocale : "ru") as Locale;
  const page =
    template.pages.find((p) => p.slug === rawPage) ??
    template.pages.find((p) => p.isHomepage) ??
    template.pages[0];

  const ctx = await buildRenderContext(locale, page.slug);
  const design: SiteDesign = {
    themeKey: template.themeKey,
    fontDisplay: template.design?.fontDisplay ?? null,
    fontBody: template.design?.fontBody ?? null,
    skinKey: template.design?.skin ?? null,
  };
  const fontsHref = googleFontsHref(design);

  const href = (slug: string) => `/admin/templates/${key}/preview?locale=${locale}&page=${slug}`;

  const navFor = (location: "header" | "footer"): ResolvedMenuItem[] =>
    template.menu
      .filter((item) => item.location === location)
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((item, index) => ({
        id: `${location}-${index}`,
        label: item.label[locale],
        // Внутри демо ведём только на страницы шаблона: рубрик и статей в базе
        // ещё нет, вести на них некуда.
        href: item.linkType === "page" ? href(item.target) : href(page.slug),
      }));

  const t = await getAdminT();

  return (
    <div className="min-h-full bg-paper">
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-5 py-2.5">
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/templates" className="text-sm font-medium text-accent hover:text-accent-strong">
            {t("templates.previewBack")}
          </Link>
          <span className="text-sm font-medium text-ink">{template.label[locale]}</span>
          <span className="text-xs text-muted">{t("templates.previewNote")}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={`/admin/templates/${key}/preview?locale=${l}&page=${page.slug}`}
                className={`rounded px-2 py-1 font-medium ${
                  l === locale ? "bg-accent-tint text-accent-strong" : "text-muted hover:text-ink"
                }`}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <ApplyTemplateButton templateKey={key} />
        </div>
      </div>

      {/* Страницы шаблона — отдельной полосой, чтобы демо можно было
          пролистать целиком, а не только главную. */}
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-surface px-5 py-2">
        {template.pages.map((p) => (
          <Link
            key={p.slug}
            href={href(p.slug)}
            className={`rounded px-2.5 py-1 text-xs font-medium ${
              p.slug === page.slug ? "bg-accent-tint text-accent-strong" : "text-muted hover:text-ink"
            }`}
          >
            {p.title[locale]}
          </Link>
        ))}
      </div>

      <div
        style={themeStyleVars(design)}
        data-skin={design.skinKey || undefined}
        className="flex min-h-full flex-col bg-[var(--tpl-paper)]"
      >
        {fontsHref && <link rel="stylesheet" href={fontsHref} />}
        <Header
          siteName={template.settings.siteName[locale]}
          logoUrl={null}
          homeHref={href(template.pages.find((p) => p.isHomepage)?.slug ?? page.slug)}
          navItems={navFor("header")}
          locale={locale}
        />
        {/* Клики внутри демо никуда не ведут: страниц шаблона в базе ещё нет,
            а переход по ссылке блока увёл бы на 404 публичного сайта. */}
        <main className="flex-1 pointer-events-none">
          <BlockList blocks={materializeBlocks(page.blocks, locale)} ctx={ctx} />
        </main>
        <Footer
          siteName={template.settings.siteName[locale]}
          tagline={template.settings.tagline[locale]}
          footerNote={template.settings.footerNote[locale]}
          navItems={navFor("footer")}
          contactEmail={template.settings.contactEmail}
          contactPhone={template.settings.contactPhone}
          contactAddress={template.settings.contactAddress[locale]}
        />
      </div>
    </div>
  );
}
