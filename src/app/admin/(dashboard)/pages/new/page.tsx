import { PageEditor, type PageEditorInitial } from "@/components/admin/editor/PageEditor";
import { TemplatePicker } from "@/components/admin/TemplatePicker";
import { getSiteSettings } from "@/lib/site-settings";
import { siteDesignFromSettings } from "@/lib/site-design";
import { HOMEPAGE_TEMPLATES, INNER_PAGE_TEMPLATES, findTemplate } from "@/lib/templates";
import { getAdminT } from "@/lib/admin-i18n/server";

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
  const t = await getAdminT();
  const settings = await getSiteSettings();
  const design = siteDesignFromSettings(settings);

  if (!templateKey && !blank) {
    return (
      <TemplatePicker
        title={t("picker.pageTitle")}
        subtitle={t("picker.pageSubtitle")}
        blankHref="/admin/pages/new?blank=1"
        groups={[
          { heading: t("picker.groupHomepage"), templates: HOMEPAGE_TEMPLATES },
          { heading: t("picker.groupInner"), templates: INNER_PAGE_TEMPLATES },
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

  return <PageEditor initial={initial} design={design} />;
}
