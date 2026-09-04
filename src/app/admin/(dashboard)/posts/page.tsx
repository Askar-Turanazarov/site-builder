import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function PostsListPage() {
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
    include: { category: true },
  });

  return (
    <div className="mx-auto max-w-4xl px-8 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Новости и статьи</h1>
          <p className="mt-1 text-sm text-muted">Публикации, распределённые по рубрикам.</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-surface hover:bg-accent-strong"
        >
          + Новая статья
        </Link>
      </div>

      <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-surface">
        {posts.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-muted">Пока нет ни одной статьи.</p>
        )}
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/admin/posts/${post.id}`}
            className="flex items-center justify-between px-5 py-4 hover:bg-paper"
          >
            <div>
              <span className="font-medium text-ink">{post.titleRu || "(без названия)"}</span>
              <div className="mt-0.5 text-xs text-muted">
                {post.category.nameRu} · /{post.slug}
              </div>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                post.status === "published"
                  ? "bg-accent-tint text-accent-strong"
                  : "bg-warning-tint text-warning"
              }`}
            >
              {post.status === "published" ? "Опубликовано" : "Черновик"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
