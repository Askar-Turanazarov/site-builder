import Link from "next/link";
import { PostEditor, type PostEditorInitial } from "@/components/admin/editor/PostEditor";
import { TemplatePicker } from "@/components/admin/TemplatePicker";
import { getSiteSettings } from "@/lib/site-settings";
import { siteDesignFromSettings } from "@/lib/site-design";
import { ARTICLE_TEMPLATES, findTemplate } from "@/lib/templates";
import { prisma } from "@/lib/prisma";
import { getAdminT } from "@/lib/admin-i18n/server";

function blankInitial(): PostEditorInitial {
  return {
    slug: "",
    categoryId: "",
    coverMediaId: null,
    titleRu: "",
    titleUz: "",
    titleEn: "",
    excerptRu: "",
    excerptUz: "",
    excerptEn: "",
    metaDescRu: "",
    metaDescUz: "",
    metaDescEn: "",
    blocksRu: [],
    blocksUz: [],
    blocksEn: [],
    status: "draft",
  };
}

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string; blank?: string }>;
}) {
  const { template: templateKey, blank } = await searchParams;
  const t = await getAdminT();
  const [settings, categories] = await Promise.all([
    getSiteSettings(),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (categories.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-8 py-16 text-center">
        <h1 className="font-display text-xl font-semibold text-ink">{t("postEditor.needCategoryTitle")}</h1>
        <p className="mt-2 text-sm text-muted">{t("postEditor.needCategoryBody")}</p>
        <Link
          href="/admin/categories/new"
          className="mt-5 inline-block rounded-md bg-accent px-4 py-2 text-sm font-medium text-surface hover:bg-accent-strong"
        >
          {t("postEditor.createCategory")}
        </Link>
      </div>
    );
  }

  const design = siteDesignFromSettings(settings);

  if (!templateKey && !blank) {
    return (
      <TemplatePicker
        title={t("picker.postTitle")}
        subtitle={t("picker.postSubtitle")}
        blankHref="/admin/posts/new?blank=1"
        groups={[{ heading: t("picker.groupArticle"), templates: ARTICLE_TEMPLATES }]}
        buildHref={(key) => `/admin/posts/new?template=${key}`}
      />
    );
  }

  const initial = blankInitial();
  if (templateKey) {
    const tpl = findTemplate(templateKey);
    if (tpl) {
      initial.blocksRu = tpl.blocksRu;
      initial.blocksUz = tpl.blocksUz;
      initial.blocksEn = tpl.blocksEn;
    }
  }

  return (
    <PostEditor
      initial={initial}
      design={design}
      categories={categories.map((c) => ({ id: c.id, nameRu: c.nameRu }))}
    />
  );
}
