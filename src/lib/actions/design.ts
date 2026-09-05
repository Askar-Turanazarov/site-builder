"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export interface SiteDesignInput {
  themeKey: string;
  skinKey: string | null;
  fontDisplay: string | null;
  fontBody: string | null;
  accentColor: string | null;
  paperColor: string | null;
  inkColor: string | null;
  radiusScale: string | null;
}

export async function updateSiteDesignAction(input: SiteDesignInput) {
  await requireAdmin();

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: input,
    create: {
      id: "singleton",
      siteNameRu: "Мой сайт",
      siteNameUz: "Mening saytim",
      siteNameEn: "My Site",
      ...input,
    },
  });

  // Оформление влияет на весь публичный сайт и на редактор.
  revalidatePath("/", "layout");
}
