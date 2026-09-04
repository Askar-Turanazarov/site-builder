"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export interface SiteSettingsInput {
  siteNameRu: string;
  siteNameUz: string;
  siteNameEn: string;
  taglineRu: string;
  taglineUz: string;
  taglineEn: string;
  defaultLocale: string;
  themeKey: string;
  logoMediaId: string | null;
  faviconMediaId: string | null;
  contactEmail: string;
  contactPhone: string;
  contactAddressRu: string;
  contactAddressUz: string;
  contactAddressEn: string;
  contactFormAction: string;
  footerNoteRu: string;
  footerNoteUz: string;
  footerNoteEn: string;
}

export async function updateSiteSettingsAction(input: SiteSettingsInput) {
  await requireAdmin();
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: input,
    create: { id: "singleton", ...input },
  });
  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
}
