"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

/** Удаление отработанной заявки. Заявки только читают и удаляют — править нечего. */
export async function deleteContactMessageAction(id: string) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}

/** Очистка всего списка — когда заявок накопилось много и все отработаны. */
export async function clearContactMessagesAction() {
  await requireAdmin();
  await prisma.contactMessage.deleteMany({});
  revalidatePath("/admin/messages");
}
