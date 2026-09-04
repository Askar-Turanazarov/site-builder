import { prisma } from "@/lib/prisma";
import { MenuEditor } from "./MenuEditor";

export default async function MenuPage() {
  const [items, pages, categories] = await Promise.all([
    prisma.menuItem.findMany(),
    prisma.page.findMany({ select: { id: true, titleRu: true, slug: true } }),
    prisma.category.findMany({ select: { id: true, nameRu: true, slug: true } }),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-8 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">Меню сайта</h1>
      <p className="mt-1 text-sm text-muted">Пункты навигации в шапке и подвале публичного сайта.</p>
      <div className="mt-6">
        <MenuEditor items={items} pages={pages} categories={categories} />
      </div>
    </div>
  );
}
