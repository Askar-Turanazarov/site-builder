import { getAdminLocale, getAdminT } from "@/lib/admin-i18n/server";
import { THEME_PRESETS } from "@/blocks/palette";
import { SITE_TEMPLATES } from "@/lib/site-templates";
import { TemplateGallery, type TemplateCard } from "./TemplateGallery";

/**
 * Галерея готовых сайтов целиком. Тексты шаблонов хранятся сразу на трёх
 * языках, поэтому карточки показываются на языке интерфейса админки.
 */
export default async function SiteTemplatesPage() {
  const [t, locale] = await Promise.all([getAdminT(), getAdminLocale()]);

  const cards: TemplateCard[] = SITE_TEMPLATES.map((template) => {
    const theme = THEME_PRESETS[template.themeKey];
    const fonts = [template.design?.fontDisplay, template.design?.fontBody]
      .filter(Boolean)
      .join(" · ");

    return {
      key: template.key,
      label: template.label[locale],
      profile: template.profile[locale],
      description: template.description[locale],
      pages: template.pages.length,
      posts: template.posts.length,
      swatch: {
        paper: theme.paper,
        surface: theme.surface,
        accent: theme.accent,
        ink: theme.ink,
      },
      fonts,
    };
  });

  return (
    <div className="mx-auto max-w-6xl px-8 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">{t("templates.title")}</h1>
      <p className="mt-1 max-w-3xl text-sm text-muted">{t("templates.subtitle")}</p>

      <div className="mt-8">
        <TemplateGallery templates={cards} />
      </div>
    </div>
  );
}
