import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAdminT } from "@/lib/admin-i18n/server";

export default async function PagesListPage() {
  const [t, pages] = await Promise.all([
    getAdminT(),
    prisma.page.findMany({ orderBy: { updatedAt: "desc" } }),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-8 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">{t("pages.title")}</h1>
          <p className="mt-1 text-sm text-muted">{t("pages.subtitle")}</p>
        </div>
        <Link
          href="/admin/pages/new"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-surface hover:bg-accent-strong"
        >
          {t("pages.new")}
        </Link>
      </div>

      <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-surface">
        {pages.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-muted">{t("pages.empty")}</p>
        )}
        {pages.map((page) => (
          <Link
            key={page.id}
            href={`/admin/pages/${page.id}`}
            className="flex items-center justify-between px-5 py-4 hover:bg-paper"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-ink">{page.titleRu || t("common.untitled")}</span>
                {page.isHomepage && (
                  <span className="rounded-full bg-accent-tint px-2 py-0.5 text-[11px] font-semibold text-accent-strong">
                    {t("pages.homepageBadge")}
                  </span>
                )}
              </div>
              <div className="mt-0.5 text-xs text-muted">/{page.slug}</div>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                page.status === "published"
                  ? "bg-accent-tint text-accent-strong"
                  : "bg-warning-tint text-warning"
              }`}
            >
              {page.status === "published" ? t("common.published") : t("common.draft")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
