import Link from "next/link";
import type { Locale } from "@/blocks/context";
import { LOCALES } from "@/blocks/context";
import { googleFontsHref, themeStyleVars, type SiteDesign } from "@/blocks/palette";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { demoHref, demoMenuItems } from "@/lib/site-templates/demo";
import type { SiteTemplate } from "@/lib/site-templates";
import type { PortalT } from "@/lib/portal-i18n";

/**
 * Каркас демонстрации шаблона: сверху — тонкая полоса с выходом обратно на
 * витрину и переключателем языка, ниже — шаблон целиком, с настоящими шапкой
 * и подвалом. Меню шаблона кликабельно и водит по демонстрации, поэтому по
 * ней ходят как по обычному сайту.
 */
export function TemplateDemo({
  template,
  locale,
  path,
  t,
  applyHref,
  children,
}: {
  template: SiteTemplate;
  locale: Locale;
  /** Текущий путь внутри демо — нужен переключателю языка. */
  path: string;
  t: PortalT;
  applyHref: string;
  children: React.ReactNode;
}) {
  const design: SiteDesign = {
    themeKey: template.themeKey,
    skinKey: template.design?.skin ?? null,
    fontDisplay: template.design?.fontDisplay ?? null,
    fontBody: template.design?.fontBody ?? null,
  };
  const fontsHref = googleFontsHref(design);
  const home = template.pages.find((p) => p.isHomepage) ?? template.pages[0];

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <div className="sticky top-0 z-50 border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-2.5">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/templates" className="text-sm font-medium text-accent hover:text-accent-strong">
              {t("demo.back")}
            </Link>
            <span className="text-sm font-semibold text-ink">{template.label[locale]}</span>
            <span className="rounded-full bg-paper px-2 py-0.5 text-[11px] text-muted">
              {t("demo.badge")}
            </span>
            <span className="hidden text-xs text-muted lg:inline">{t("demo.note")}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm">
              {LOCALES.map((code) => (
                <Link
                  key={code}
                  href={demoHref(template.key, code, path)}
                  className={`rounded px-2 py-1 font-medium ${
                    code === locale ? "bg-accent-tint text-accent-strong" : "text-muted hover:text-ink"
                  }`}
                >
                  {code.toUpperCase()}
                </Link>
              ))}
            </div>
            <Link
              href={applyHref}
              className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-surface hover:bg-accent-strong"
            >
              {t("demo.apply")}
            </Link>
          </div>
        </div>
      </div>

      <div
        style={themeStyleVars(design)}
        data-skin={design.skinKey || undefined}
        className="flex flex-1 flex-col bg-[var(--tpl-paper)]"
      >
        {fontsHref && <link rel="stylesheet" href={fontsHref} />}
        <Header
          siteName={template.settings.siteName[locale]}
          logoUrl={null}
          homeHref={demoHref(template.key, locale, home?.isHomepage ? "" : (home?.slug ?? ""))}
          navItems={demoMenuItems(template, locale, "header")}
          locale={locale}
        />
        <main className="flex-1">{children}</main>
        <Footer
          siteName={template.settings.siteName[locale]}
          tagline={template.settings.tagline[locale]}
          footerNote={template.settings.footerNote[locale]}
          navItems={demoMenuItems(template, locale, "footer")}
          contactEmail={template.settings.contactEmail}
          contactPhone={template.settings.contactPhone}
          contactAddress={template.settings.contactAddress[locale]}
        />
      </div>
    </div>
  );
}
