import type { Metadata } from "next";
import { getPortalLocale, getPortalT } from "@/lib/portal-i18n/server";
import { getSession } from "@/lib/auth";
import { SITE_TEMPLATES } from "@/lib/site-templates";
import { demoHref } from "@/lib/site-templates/demo";
import { TemplateCard } from "@/components/templates/TemplateCard";

export const metadata: Metadata = {
  title: "Шаблоны сайтов — Site Builder",
};

export default async function PortalTemplatesPage() {
  const [t, locale, session] = await Promise.all([getPortalT(), getPortalLocale(), getSession()]);

  const labels = {
    demo: t("templates.demo"),
    apply: t("templates.apply"),
    pages: t("templates.pages"),
    posts: t("templates.posts"),
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="font-display text-3xl font-semibold text-ink">{t("templates.title")}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">{t("templates.lead")}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SITE_TEMPLATES.map((template) => (
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
  );
}
