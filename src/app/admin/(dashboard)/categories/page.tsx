import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CategoriesListPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { posts: true } } },
  });

  return (
    <div className="mx-auto max-w-3xl px-8 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Рубрики</h1>
          <p className="mt-1 text-sm text-muted">Категории для новостей и статей.</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-surface hover:bg-accent-strong"
        >
          + Новая рубрика
        </Link>
      </div>

      <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-surface">
        {categories.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-muted">Пока нет ни одной рубрики.</p>
        )}
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/admin/categories/${cat.id}`}
            className="flex items-center justify-between px-5 py-4 hover:bg-paper"
          >
            <div>
              <span className="font-medium text-ink">{cat.nameRu}</span>
              <span className="ml-2 text-xs text-muted">/{cat.slug}</span>
            </div>
            <span className="text-xs text-muted">{cat._count.posts} статей</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
