import Link from "next/link";
import { formatDate } from "@/blocks/components/ArticleHeader";
import type { Locale } from "@/blocks/context";

export interface PostCardData {
  slug: string;
  title: string;
  excerpt: string;
  categoryName: string;
  categorySlug: string;
  coverUrl: string | null;
  publishedAt: string | null;
}

export function PostCard({
  post,
  locale,
  base = "",
}: {
  post: PostCardData;
  locale: Locale;
  /** Префикс адресов: пусто на сайте, `/demo/<ключ>` в демонстрации шаблона. */
  base?: string;
}) {
  return (
    <article className="group">
      <Link href={`${base}/${locale}/news/${post.categorySlug}/${post.slug}`} className="block">
        <div className="sb-post-cover aspect-[4/3] overflow-hidden rounded-[var(--tpl-radius)] bg-[var(--tpl-surface)]">
          {post.coverUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverUrl}
              alt={post.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-[var(--tpl-ink-soft)]">
          <span className="font-semibold text-[var(--tpl-accent)]">{post.categoryName}</span>
          {post.publishedAt && <span>· {formatDate(post.publishedAt, locale)}</span>}
        </div>
        <h3 className="mt-1.5 [font-family:var(--tpl-font-display)] text-lg font-semibold text-[var(--tpl-ink)]">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-1.5 line-clamp-2 text-sm text-[var(--tpl-ink-soft)]">{post.excerpt}</p>
        )}
      </Link>
    </article>
  );
}
