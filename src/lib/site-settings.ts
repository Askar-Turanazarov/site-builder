import { prisma } from "@/lib/prisma";

/**
 * SiteSettings is a singleton row (id: "singleton"). Rather than requiring
 * the seed script to have run before the admin panel is usable, this
 * upserts sane defaults on first access.
 */
export async function getSiteSettings() {
  return prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      siteNameRu: "Мой сайт",
      siteNameUz: "Mening saytim",
      siteNameEn: "My Site",
      defaultLocale: "ru",
      themeKey: "business",
    },
  });
}
