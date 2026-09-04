"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export interface MenuItemInput {
  labelRu: string;
  labelUz: string;
  labelEn: string;
  linkType: "page" | "category" | "custom";
  pageId: string | null;
  categoryId: string | null;
  customUrl: string | null;
  order: number;
  location: "header" | "footer";
}

export async function createMenuItemAction(input: MenuItemInput) {
  await requireAdmin();
  await prisma.menuItem.create({ data: input });
  revalidatePath("/admin/menu");
}

export async function updateMenuItemAction(id: string, input: MenuItemInput) {
  await requireAdmin();
  await prisma.menuItem.update({ where: { id }, data: input });
  revalidatePath("/admin/menu");
}

export async function deleteMenuItemAction(id: string) {
  await requireAdmin();
  await prisma.menuItem.delete({ where: { id } });
  revalidatePath("/admin/menu");
}
