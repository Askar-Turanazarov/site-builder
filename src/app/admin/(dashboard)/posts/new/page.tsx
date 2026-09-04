import Link from "next/link";
import { PostEditor, type PostEditorInitial } from "@/components/admin/editor/PostEditor";
import { TemplatePicker } from "@/components/admin/TemplatePicker";
import { getSiteSettings } from "@/lib/site-settings";
import { isThemeKey } from "@/blocks/palette";
import { ARTICLE_TEMPLATES, findTemplate } from "@/lib/templates";
import { prisma } from "@/lib/prisma";

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
  const [settings, categories] = await Promise.all([
    getSiteSettings(),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (categories.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-8 py-16 text-center">
        <h1 className="font-display text-xl font-semibold text-ink">Сначала создайте рубрику</h1>
        <p className="mt-2 text-sm text-muted">
          Каждая статья должна принадлежать рубрике. Создайте хотя бы одну, прежде чем писать статью.
        </p>
        <Link
          href="/admin/categories/new"
          className="mt-5 inline-block rounded-md bg-accent px-4 py-2 text-sm font-medium text-surface hover:bg-accent-strong"
        >
          + Создать рубрику
        </Link>
      </div>
    );
  }

  const themeKey = isThemeKey(settings.themeKey) ? settings.themeKey : "business";

  if (!templateKey && !blank) {
    return (
      <TemplatePicker
        title="Выберите шаблон статьи"
        subtitle="Начните с готовой структуры блоков и замените текст на свой — либо начните с пустой статьи."
        blankHref="/admin/posts/new?blank=1"
        groups={[{ heading: "Шаблоны статей", templates: ARTICLE_TEMPLATES }]}
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
      themeKey={themeKey}
      categories={categories.map((c) => ({ id: c.id, nameRu: c.nameRu }))}
    />
  );
}
