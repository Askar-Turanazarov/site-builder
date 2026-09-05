"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export interface CategoryInput {
  slug: string;
  nameRu: string;
  nameUz: string;
  nameEn: string;
  descRu: string;
  descUz: string;
  descEn: string;
  order: number;
}

async function ensureUniqueSlug(slug: string, excludeId?: string) {
  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing && existing.id !== excludeId) {
    throw new Error("slugTaken");
  }
}

export async function createCategoryAction(input: CategoryInput) {
  await requireAdmin();
  await ensureUniqueSlug(input.slug);
  await prisma.category.create({ data: input });
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategoryAction(id: string, input: CategoryInput) {
  await requireAdmin();
  await ensureUniqueSlug(input.slug, id);
  await prisma.category.update({ where: { id }, data: input });
  revalidatePath("/admin/categories");
}

export async function deleteCategoryAction(id: string) {
  await requireAdmin();
  const postCount = await prisma.post.count({ where: { categoryId: id } });
  if (postCount > 0) {
    throw new Error("categoryNotEmpty");
  }
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}
