"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export interface DictionaryEntryInput {
  key: string;
  valueRu: string;
  valueUz: string;
  valueEn: string;
  group: string;
}

export async function upsertDictionaryEntryAction(input: DictionaryEntryInput) {
  await requireAdmin();
  await prisma.dictionaryEntry.upsert({
    where: { key: input.key },
    update: { valueRu: input.valueRu, valueUz: input.valueUz, valueEn: input.valueEn, group: input.group },
    create: input,
  });
  revalidatePath("/admin/dictionary");
}

export async function deleteDictionaryEntryAction(key: string) {
  await requireAdmin();
  await prisma.dictionaryEntry.delete({ where: { key } });
  revalidatePath("/admin/dictionary");
}
