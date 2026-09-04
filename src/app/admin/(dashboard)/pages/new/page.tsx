import { PageEditor, type PageEditorInitial } from "@/components/admin/editor/PageEditor";
import { TemplatePicker } from "@/components/admin/TemplatePicker";
import { getSiteSettings } from "@/lib/site-settings";
import { isThemeKey } from "@/blocks/palette";
import { HOMEPAGE_TEMPLATES, INNER_PAGE_TEMPLATES, findTemplate } from "@/lib/templates";

function blankInitial(): PageEditorInitial {
  return {
    slug: "",
    isHomepage: false,
    titleRu: "",
    titleUz: "",
    titleEn: "",
    metaDescRu: "",
    metaDescUz: "",
    metaDescEn: "",
    blocksRu: [],
    blocksUz: [],
    blocksEn: [],
    status: "draft",
  };
}

export default async function NewPagePage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string; blank?: string }>;
}) {
  const { template: templateKey, blank } = await searchParams;
  const settings = await getSiteSettings();
  const themeKey = isThemeKey(settings.themeKey) ? settings.themeKey : "business";

  if (!templateKey && !blank) {
    return (
      <TemplatePicker
        title="Выберите шаблон страницы"
        subtitle="Начните с готовой структуры блоков и замените текст на свой — либо начните с пустой страницы."
        blankHref="/admin/pages/new?blank=1"
        groups={[
          { heading: "Шаблоны главной страницы", templates: HOMEPAGE_TEMPLATES },
          { heading: "Внутренние страницы", templates: INNER_PAGE_TEMPLATES },
        ]}
        buildHref={(key) => `/admin/pages/new?template=${key}`}
      />
    );
  }

  const initial = blankInitial();
  if (templateKey) {
    const tpl = findTemplate(templateKey);
    if (tpl) {
      initial.titleRu = tpl.titleRu;
      initial.titleUz = tpl.titleUz;
      initial.titleEn = tpl.titleEn;
      initial.blocksRu = tpl.blocksRu;
      initial.blocksUz = tpl.blocksUz;
      initial.blocksEn = tpl.blocksEn;
    }
  }

  return <PageEditor initial={initial} themeKey={themeKey} />;
}
