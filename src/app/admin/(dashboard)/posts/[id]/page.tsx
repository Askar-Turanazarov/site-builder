import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseBlocks } from "@/blocks/types";
import { PostEditor, type PostEditorInitial } from "@/components/admin/editor/PostEditor";
import { getSiteSettings } from "@/lib/site-settings";
import { siteDesignFromSettings } from "@/lib/site-design";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, settings, categories] = await Promise.all([
    prisma.post.findUnique({ where: { id } }),
    getSiteSettings(),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);
  if (!post) notFound();

  const initial: PostEditorInitial = {
    id: post.id,
    slug: post.slug,
    categoryId: post.categoryId,
    coverMediaId: post.coverMediaId,
    titleRu: post.titleRu,
    titleUz: post.titleUz,
    titleEn: post.titleEn,
    excerptRu: post.excerptRu ?? "",
    excerptUz: post.excerptUz ?? "",
    excerptEn: post.excerptEn ?? "",
    metaDescRu: post.metaDescRu ?? "",
    metaDescUz: post.metaDescUz ?? "",
    metaDescEn: post.metaDescEn ?? "",
    blocksRu: parseBlocks(post.blocksRu),
    blocksUz: parseBlocks(post.blocksUz),
    blocksEn: parseBlocks(post.blocksEn),
    status: post.status === "published" ? "published" : "draft",
  };

  const design = siteDesignFromSettings(settings);

  return (
    <PostEditor
      key={post.id}
      initial={initial}
      design={design}
      categories={categories.map((c) => ({ id: c.id, nameRu: c.nameRu }))}
    />
  );
}
