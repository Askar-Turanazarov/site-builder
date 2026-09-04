"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { blockListSchema, serializeBlocks } from "@/blocks/types";
import type { Block } from "@/blocks/types";

export interface PostInput {
  slug: string;
  categoryId: string;
  coverMediaId: string | null;
  titleRu: string;
  titleUz: string;
  titleEn: string;
  excerptRu: string;
  excerptUz: string;
  excerptEn: string;
  metaDescRu: string;
  metaDescUz: string;
  metaDescEn: string;
  blocksRu: Block[];
  blocksUz: Block[];
  blocksEn: Block[];
  status: "draft" | "published";
}

function validateBlocks(blocks: Block[]) {
  const result = blockListSchema.safeParse(blocks);
  if (!result.success) throw new Error("Некорректные данные блоков");
  return result.data as Block[];
}

async function ensureUniqueSlug(slug: string, excludeId?: string) {
  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing && existing.id !== excludeId) {
    throw new Error(`Статья со слагом "${slug}" уже существует`);
  }
}

export async function createPostAction(input: PostInput) {
  await requireAdmin();
  await ensureUniqueSlug(input.slug);

  const post = await prisma.post.create({
    data: {
      slug: input.slug,
      categoryId: input.categoryId,
      coverMediaId: input.coverMediaId,
      titleRu: input.titleRu,
      titleUz: input.titleUz,
      titleEn: input.titleEn,
      excerptRu: input.excerptRu,
      excerptUz: input.excerptUz,
      excerptEn: input.excerptEn,
      metaDescRu: input.metaDescRu,
      metaDescUz: input.metaDescUz,
      metaDescEn: input.metaDescEn,
      blocksRu: serializeBlocks(validateBlocks(input.blocksRu)),
      blocksUz: serializeBlocks(validateBlocks(input.blocksUz)),
      blocksEn: serializeBlocks(validateBlocks(input.blocksEn)),
      status: input.status,
      publishedAt: input.status === "published" ? new Date() : null,
    },
  });

  revalidatePath("/admin/posts");
  redirect(`/admin/posts/${post.id}`);
}

export async function updatePostAction(id: string, input: PostInput) {
  await requireAdmin();
  await ensureUniqueSlug(input.slug, id);

  const existing = await prisma.post.findUniqueOrThrow({ where: { id } });
  const becamePublished = input.status === "published" && existing.status !== "published";

  await prisma.post.update({
    where: { id },
    data: {
      slug: input.slug,
      categoryId: input.categoryId,
      coverMediaId: input.coverMediaId,
      titleRu: input.titleRu,
      titleUz: input.titleUz,
      titleEn: input.titleEn,
      excerptRu: input.excerptRu,
      excerptUz: input.excerptUz,
      excerptEn: input.excerptEn,
      metaDescRu: input.metaDescRu,
      metaDescUz: input.metaDescUz,
      metaDescEn: input.metaDescEn,
      blocksRu: serializeBlocks(validateBlocks(input.blocksRu)),
      blocksUz: serializeBlocks(validateBlocks(input.blocksUz)),
      blocksEn: serializeBlocks(validateBlocks(input.blocksEn)),
      status: input.status,
      publishedAt: becamePublished ? new Date() : existing.publishedAt,
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${id}`);
}

export async function deletePostAction(id: string) {
  await requireAdmin();
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}
