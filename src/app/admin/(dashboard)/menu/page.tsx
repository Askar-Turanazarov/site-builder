import { prisma } from "@/lib/prisma";
import { MenuEditor } from "./MenuEditor";
import { getAdminT } from "@/lib/admin-i18n/server";

export default async function MenuPage() {
  const t = await getAdminT();
  const [items, pages, categories] = await Promise.all([
    prisma.menuItem.findMany(),
    prisma.page.findMany({ select: { id: true, titleRu: true, slug: true } }),
    prisma.category.findMany({ select: { id: true, nameRu: true, slug: true } }),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-8 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">{t("menu.title")}</h1>
      <p className="mt-1 text-sm text-muted">{t("menu.subtitle")}</p>
      <div className="mt-6">
        <MenuEditor items={items} pages={pages} categories={categories} />
      </div>
    </div>
  );
}
