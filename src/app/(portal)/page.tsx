import Link from "next/link";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/site-settings";
import { localeField } from "@/lib/locale-field";
import { getPortalLocale, getPortalT } from "@/lib/portal-i18n/server";
import { getSession } from "@/lib/auth";
import { SITE_TEMPLATES } from "@/lib/site-templates";
import { demoHref } from "@/lib/site-templates/demo";
import { TemplateCard } from "@/components/templates/TemplateCard";
import type { PortalDict } from "@/lib/portal-i18n";

export const metadata: Metadata = {
  title: "Site Builder — конструктор многоязычных сайтов",
};

const FEATURES: { title: keyof PortalDict; body: keyof PortalDict }[] = [
  { title: "features.editorTitle", body: "features.editorBody" },
  { title: "features.localesTitle", body: "features.localesBody" },
  { title: "features.designTitle", body: "features.designBody" },
  { title: "features.newsTitle", body: "features.newsBody" },
  { title: "features.mediaTitle", body: "features.mediaBody" },
  { title: "features.exportTitle", body: "features.exportBody" },
];

export default async function PortalHomePage() {
  const [t, locale, settings, session] = await Promise.all([
    getPortalT(),
    getPortalLocale(),
    getSiteSettings(),
    getSession(),
  ]);

  const siteHref = `/${settings.defaultLocale}`;
  const siteName = localeField(settings, "siteName", locale);
  const featured = SITE_TEMPLATES.slice(0, 6);
  const labels = {
    demo: t("templates.demo"),
    apply: t("templates.apply"),
    pages: t("templates.pages"),
    posts: t("templates.posts"),
  };

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:pt-24">
        <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
          {t("hero.eyebrow")}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] font-extrabold tracking-tight text-ink sm:text-5xl">
          {t("hero.title")}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{t("hero.lead")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/templates"
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-surface hover:bg-accent-strong"
          >
            {t("hero.ctaTemplates")}
          </Link>
          <Link
            href={siteHref}
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-ink hover:bg-surface"
          >
            {t("hero.ctaSite")}
          </Link>
          <Link
            href={session ? "/admin" : "/admin/login"}
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-ink hover:bg-surface"
          >
            {t("hero.ctaAdmin")}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-semibold text-ink">{t("templates.title")}</h2>
            <p className="mt-2 text-sm text-muted">{t("templates.lead")}</p>
          </div>
          <Link href="/templates" className="text-sm font-medium text-accent hover:text-accent-strong">
            {t("templates.all")} →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((template) => (
            <TemplateCard
              key={template.key}
              template={template}
              locale={locale}
              labels={labels}
              demoHref={demoHref(template.key, locale)}
              applyHref={
                session
                  ? `/admin/templates?apply=${template.key}`
                  : `/admin/login?next=${encodeURIComponent(`/admin/templates?apply=${template.key}`)}`
              }
            />
          ))}
        </div>
      </section>

      <section id="features" className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="font-display text-2xl font-semibold text-ink">{t("features.title")}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div key={feature.title}>
                <h3 className="font-display text-base font-semibold text-ink">{t(feature.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(feature.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="rounded-xl border border-border bg-surface p-8">
          <h2 className="font-display text-2xl font-semibold text-ink">{t("mysite.title")}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">{t("mysite.lead")}</p>
          <p className="mt-5 font-display text-lg font-semibold text-ink">{siteName}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={siteHref}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-surface hover:bg-accent-strong"
            >
              {t("mysite.open")}
            </Link>
            <Link
              href={session ? "/admin/pages" : "/admin/login"}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-ink hover:bg-paper"
            >
              {t("mysite.edit")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
