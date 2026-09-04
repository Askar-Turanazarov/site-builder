"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { blockListSchema, serializeBlocks } from "@/blocks/types";
import type { Block } from "@/blocks/types";

export interface PageInput {
  slug: string;
  isHomepage: boolean;
  titleRu: string;
  titleUz: string;
  titleEn: string;
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
  const existing = await prisma.page.findUnique({ where: { slug } });
  if (existing && existing.id !== excludeId) {
    throw new Error(`Страница со слагом "${slug}" уже существует`);
  }
}

export async function createPageAction(input: PageInput) {
  await requireAdmin();
  await ensureUniqueSlug(input.slug);

  const page = await prisma.$transaction(async (tx) => {
    if (input.isHomepage) {
      await tx.page.updateMany({ where: { isHomepage: true }, data: { isHomepage: false } });
    }
    return tx.page.create({
      data: {
        slug: input.slug,
        isHomepage: input.isHomepage,
        titleRu: input.titleRu,
        titleUz: input.titleUz,
        titleEn: input.titleEn,
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
  });

  revalidatePath("/admin/pages");
  redirect(`/admin/pages/${page.id}`);
}

export async function updatePageAction(id: string, input: PageInput) {
  await requireAdmin();
  await ensureUniqueSlug(input.slug, id);

  const existing = await prisma.page.findUniqueOrThrow({ where: { id } });
  const becamePublished = input.status === "published" && existing.status !== "published";

  await prisma.$transaction(async (tx) => {
    if (input.isHomepage) {
      await tx.page.updateMany({
        where: { isHomepage: true, id: { not: id } },
        data: { isHomepage: false },
      });
    }
    await tx.page.update({
      where: { id },
      data: {
        slug: input.slug,
        isHomepage: input.isHomepage,
        titleRu: input.titleRu,
        titleUz: input.titleUz,
        titleEn: input.titleEn,
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
  });

  revalidatePath("/admin/pages");
  revalidatePath(`/admin/pages/${id}`);
}

export async function deletePageAction(id: string) {
  await requireAdmin();
  await prisma.page.delete({ where: { id } });
  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}
