import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [pageCount, publishedPageCount, postCount, categoryCount, mediaCount] =
    await Promise.all([
      prisma.page.count(),
      prisma.page.count({ where: { status: "published" } }),
      prisma.post.count(),
      prisma.category.count(),
      prisma.media.count(),
    ]);

  const stats = [
    { label: "Страницы", value: pageCount, sub: `${publishedPageCount} опубликовано`, href: "/admin/pages" },
    { label: "Статьи", value: postCount, href: "/admin/posts" },
    { label: "Рубрики", value: categoryCount, href: "/admin/categories" },
    { label: "Медиафайлы", value: mediaCount, href: "/admin/media" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">Дашборд</h1>
      <p className="mt-1 text-sm text-muted">Обзор содержимого вашего сайта.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-border bg-surface p-5 transition hover:border-accent"
          >
            <div className="font-display text-3xl font-bold tabular-nums text-ink">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-ink-soft">{stat.label}</div>
            {stat.sub && <div className="mt-0.5 text-xs text-muted">{stat.sub}</div>}
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-border bg-surface p-6">
        <h2 className="font-display text-base font-semibold text-ink">Быстрые действия</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/pages/new"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-surface transition hover:bg-accent-strong"
          >
            Создать страницу
          </Link>
          <Link
            href="/admin/posts/new"
            className="rounded-md border border-border bg-paper px-4 py-2 text-sm font-medium text-ink transition hover:border-accent"
          >
            Написать статью
          </Link>
          <Link
            href="/admin/export"
            className="rounded-md border border-border bg-paper px-4 py-2 text-sm font-medium text-ink transition hover:border-accent"
          >
            Экспортировать сайт
          </Link>
        </div>
      </div>
    </div>
  );
}
