import { getAdminLocale, getAdminT } from "@/lib/admin-i18n/server";
import { getSiteSettings } from "@/lib/site-settings";
import { SITE_TEMPLATES } from "@/lib/site-templates";
import { demoHref } from "@/lib/site-templates/demo";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { ApplyTemplateButton } from "./ApplyTemplateButton";

/**
 * Витрина шаблонов в админке. Карточка и демонстрация — те же, что на
 * портале: администратор и посетитель видят один и тот же шаблон, разница
 * только в том, что здесь рядом с «Смотреть демо» стоит кнопка применения.
 *
 * `?apply=<ключ>` открывает диалог сразу — с этим адресом сюда приходят
 * с портала после входа.
 */
export default async function SiteTemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ apply?: string }>;
}) {
  const [t, locale, settings, { apply }] = await Promise.all([
    getAdminT(),
    getAdminLocale(),
    getSiteSettings(),
    searchParams,
  ]);

  const labels = {
    demo: t("templates.view"),
    apply: t("templates.apply"),
    pages: t("templates.pagesCount"),
    posts: t("templates.postsCount"),
  };
  const siteHref = `/${settings.defaultLocale}`;

  return (
    <div className="mx-auto max-w-6xl px-8 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">{t("templates.title")}</h1>
      <p className="mt-1 max-w-3xl text-sm text-muted">{t("templates.subtitle")}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {SITE_TEMPLATES.map((template) => (
          <TemplateCard
            key={template.key}
            template={template}
            locale={locale}
            labels={labels}
            demoHref={demoHref(template.key, locale)}
            applySlot={
              <ApplyTemplateButton
                templateKey={template.key}
                label={template.label[locale]}
                siteHref={siteHref}
                autoOpen={apply === template.key}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}
