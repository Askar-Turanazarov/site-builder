import Link from "next/link";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/site-settings";
import { localeField } from "@/lib/locale-field";
import { getPortalLocale, getPortalT } from "@/lib/portal-i18n/server";
import { getSession } from "@/lib/auth";
import { SITE_TEMPLATES } from "@/lib/site-templates";
import { demoHref } from "@/lib/site-templates/demo";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { HeroSceneLazy } from "@/components/portal/HeroSceneLazy";
import type { PortalDict } from "@/lib/portal-i18n";
import {
  IconPages,
  IconPosts,
  IconMedia,
  IconExport,
  IconDesign,
  IconDictionary,
} from "@/components/admin/icons";

export const metadata: Metadata = {
  title: "Конструктор многоязычных сайтов",
};

const FEATURES: {
  title: keyof PortalDict;
  body: keyof PortalDict;
  icon: typeof IconPages;
}[] = [
  { title: "features.editorTitle", body: "features.editorBody", icon: IconPages },
  { title: "features.localesTitle", body: "features.localesBody", icon: IconDictionary },
  { title: "features.designTitle", body: "features.designBody", icon: IconDesign },
  { title: "features.newsTitle", body: "features.newsBody", icon: IconPosts },
  { title: "features.mediaTitle", body: "features.mediaBody", icon: IconMedia },
  { title: "features.exportTitle", body: "features.exportBody", icon: IconExport },
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

  const applyHref = (key: string) =>
    session
      ? `/admin/templates?apply=${key}`
      : `/admin/login?next=${encodeURIComponent(`/admin/templates?apply=${key}`)}`;

  const stats = [
    { value: "12", label: t("stats.templates") },
    { value: "3", label: t("stats.locales") },
    { value: "16", label: t("stats.blocks") },
    { value: "ZIP", label: t("stats.export") },
  ];

  return (
    <>
      {/* ---------------------------------------------------------------
          Шапка страницы. Трёхмерная сцена лежит подложкой; на узких экранах
          она уходит под текст с меньшей непрозрачностью, иначе спорила бы
          с заголовком за внимание.
          --------------------------------------------------------------- */}
      <section className="relative overflow-hidden">
        <HeroSceneLazy className="pointer-events-none absolute inset-y-0 right-0 h-full w-full opacity-30 [mask-image:linear-gradient(to_right,transparent,black_45%)] md:w-[58%] md:opacity-100" />

        {/* Подсветка акцентом за текстом — чтобы столбец не висел в пустоте. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full opacity-[0.16] blur-3xl"
          style={{ background: "var(--accent)" }}
        />

        <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="max-w-2xl">
            <p className="sg-enter sg-d1 text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {t("hero.eyebrow")}
            </p>
            <h1 className="sg-enter sg-d2 mt-5 font-display text-4xl leading-[1.06] font-extrabold tracking-tight text-ink sm:text-[3.35rem]">
              {t("hero.title")}
            </h1>
            <p className="sg-enter sg-d3 mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              {t("hero.lead")}
            </p>

            <div className="sg-enter sg-d4 mt-9 flex flex-wrap gap-3">
              <Link
                href="/templates"
                className="button button--primary bg-accent text-accent-foreground hover:bg-accent-hover"
              >
                {t("hero.ctaTemplates")}
              </Link>
              <Link
                href={siteHref}
                className="button border border-border bg-surface text-ink hover:bg-surface-hover"
              >
                {t("hero.ctaSite")}
              </Link>
              <Link
                href={session ? "/admin" : "/admin/login"}
                className="button text-ink-soft hover:bg-default hover:text-ink"
              >
                {t("hero.ctaAdmin")}
              </Link>
            </div>

            <dl className="sg-enter sg-d5 mt-12 flex flex-wrap gap-x-10 gap-y-5">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl font-bold tabular-nums text-ink">
                    {s.value}
                  </dt>
                  <dd className="mt-0.5 max-w-[9rem] text-xs leading-snug text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
              {t("templates.title")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">{t("templates.lead")}</p>
          </div>
          <Link
            href="/templates"
            className="focus-visible:focus-ring rounded-full text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            {t("templates.all")} →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((template) => (
            <TemplateCard
              key={template.key}
              template={template}
              locale={locale}
              labels={labels}
              demoHref={demoHref(template.key, locale)}
              applyHref={applyHref(template.key)}
            />
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      <section id="features" className="border-y border-separator bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
            {t("features.title")}
          </h2>

          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <div key={feature.title}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                    <FeatureIcon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    {t(feature.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t(feature.body)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-surface p-8 shadow-surface sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-[0.14] blur-3xl"
            style={{ background: "var(--accent)" }}
          />
          <div className="relative">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
              {t("mysite.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{t("mysite.lead")}</p>
            <p className="mt-6 font-display text-xl font-bold text-ink">{siteName}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={siteHref}
                className="button button--primary bg-accent text-accent-foreground hover:bg-accent-hover"
              >
                {t("mysite.open")}
              </Link>
              <Link
                href={session ? "/admin/pages" : "/admin/login"}
                className="button border border-border bg-background text-ink hover:bg-default"
              >
                {t("mysite.edit")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
