import Link from "next/link";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/site-settings";
import { localeField } from "@/lib/locale-field";
import { getPortalLocale, getPortalT } from "@/lib/portal-i18n/server";
import { getSession } from "@/lib/auth";
import { SITE_TEMPLATES } from "@/lib/site-templates";
import { demoHref } from "@/lib/site-templates/demo";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { PORTAL_CONTAINER } from "@/components/portal/container";
import { HeroStage, HERO_STAGE_INTERVAL, HERO_STAGE_KEYS } from "@/components/portal/HeroStage";
import { HeroStageMotion } from "@/components/portal/HeroStageMotion";
import { FeaturesSection } from "@/components/portal/features/FeaturesSection";

export const metadata: Metadata = {
  title: "Конструктор многоязычных сайтов",
};

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="sg-arrow h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M3 8h9.5M8.5 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
          Шапка страницы. Слева — обещание, справа — оно же на глазах:
          настоящие шаблоны сменяются в окне вместе с языком.
          --------------------------------------------------------------- */}
      <HeroStageMotion
        steps={HERO_STAGE_KEYS.length}
        interval={HERO_STAGE_INTERVAL}
        className="relative isolate overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="sg-hero-dots absolute inset-0" />
          <div
            className="sg-aura top-[-18%] left-[-8%] h-[520px] w-[520px]"
            style={{ background: "color-mix(in oklab, var(--accent) 65%, transparent)" }}
          />
          <div
            className="sg-aura sg-aura-b top-[18%] right-[-6%] h-[480px] w-[480px]"
            style={{ background: "color-mix(in oklab, var(--accent) 45%, #22d3ee)" }}
          />
          <div className="sg-spotlight absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
        </div>

        <div
          className={`${PORTAL_CONTAINER} grid items-center gap-14 pt-12 pb-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:pt-16 lg:pb-24 xl:gap-20`}
        >
          <div>
            <span className="sg-enter sg-d1 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium text-ink-soft shadow-surface backdrop-blur">
              <span className="sg-pulse h-2 w-2 rounded-full bg-success" />
              {t("hero.badge")}
            </span>

            <h1 className="sg-enter sg-d2 mt-6 font-display text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.035em] text-ink sm:text-6xl xl:text-[4.25rem]">
              {t("hero.titleBefore")}
              <span className="sg-gradient-text">{t("hero.titleAccent")}</span>
              {t("hero.titleAfter")}
            </h1>

            <p className="sg-enter sg-d3 mt-6 max-w-xl text-lg leading-relaxed text-ink-soft xl:text-xl">
              {t("hero.lead")}
            </p>

            <div className="sg-enter sg-d4 mt-9 flex flex-wrap gap-3">
              <Link
                href="/templates"
                className="button button--lg button--primary bg-accent text-accent-foreground hover:bg-accent-hover"
              >
                {t("hero.ctaTemplates")}
                <Arrow />
              </Link>
              <Link
                href={session ? "/admin" : "/admin/login"}
                className="button button--lg border border-border bg-surface/80 text-ink backdrop-blur hover:bg-surface-hover"
              >
                {t("hero.ctaAdmin")}
              </Link>
            </div>

            <dl className="sg-enter sg-d5 mt-12 grid max-w-xl grid-cols-2 gap-y-6 border-t border-separator pt-8 sm:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={
                    i === 1 || i === 3
                      ? "border-l border-separator pl-5"
                      : i === 2
                        ? "sm:border-l sm:border-separator sm:pl-5"
                        : ""
                  }
                >
                  <dt className="font-display text-3xl font-bold tracking-tight tabular-nums text-ink">
                    {s.value}
                  </dt>
                  <dd className="mt-1 max-w-[9rem] text-xs leading-snug text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="sg-enter sg-d3">
            <HeroStage locale={locale} t={t} />
          </div>
        </div>
      </HeroStageMotion>

      {/* --------------------------------------------------------------- */}
      <section className="border-t border-separator">
        <div className={`${PORTAL_CONTAINER} py-20 lg:py-24`}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl leading-[1.05] font-extrabold tracking-[-0.03em] text-ink sm:text-5xl">
                {t("templates.title")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{t("templates.lead")}</p>
            </div>
            <Link href="/templates" className="button border border-border bg-surface text-ink hover:bg-default">
              {t("templates.all")}
              <Arrow />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      <FeaturesSection t={t} locale={locale} />

      {/* --------------------------------------------------------------- */}
      <section className="border-t border-separator">
        <div className={`${PORTAL_CONTAINER} py-20 lg:py-24`}>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-surface sm:p-12 lg:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full opacity-[0.16] blur-3xl"
              style={{ background: "var(--accent)" }}
            />
            <div aria-hidden="true" className="sg-hero-dots pointer-events-none absolute inset-0 opacity-60" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="font-display text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl">
                  {t("mysite.title")}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{t("mysite.lead")}</p>
              </div>

              <div className="flex flex-col gap-4 lg:items-end">
                <p className="font-display text-2xl font-bold text-ink">{siteName}</p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={siteHref}
                    className="button button--lg button--primary bg-accent text-accent-foreground hover:bg-accent-hover"
                  >
                    {t("mysite.open")}
                    <Arrow />
                  </Link>
                  <Link
                    href={session ? "/admin/pages" : "/admin/login"}
                    className="button button--lg border border-border bg-background text-ink hover:bg-default"
                  >
                    {t("mysite.edit")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
