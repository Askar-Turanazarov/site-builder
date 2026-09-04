import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseBlocks } from "@/blocks/types";
import { PageEditor, type PageEditorInitial } from "@/components/admin/editor/PageEditor";
import { getSiteSettings } from "@/lib/site-settings";
import { isThemeKey } from "@/blocks/palette";

export default async function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [page, settings] = await Promise.all([
    prisma.page.findUnique({ where: { id } }),
    getSiteSettings(),
  ]);
  if (!page) notFound();

  const initial: PageEditorInitial = {
    id: page.id,
    slug: page.slug,
    isHomepage: page.isHomepage,
    titleRu: page.titleRu,
    titleUz: page.titleUz,
    titleEn: page.titleEn,
    metaDescRu: page.metaDescRu ?? "",
    metaDescUz: page.metaDescUz ?? "",
    metaDescEn: page.metaDescEn ?? "",
    blocksRu: parseBlocks(page.blocksRu),
    blocksUz: parseBlocks(page.blocksUz),
    blocksEn: parseBlocks(page.blocksEn),
    status: page.status === "published" ? "published" : "draft",
  };

  const themeKey = isThemeKey(settings.themeKey) ? settings.themeKey : "business";

  return <PageEditor key={page.id} initial={initial} themeKey={themeKey} />;
}
