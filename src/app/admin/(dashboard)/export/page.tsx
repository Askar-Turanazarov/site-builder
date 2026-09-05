import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site-settings";
import { getAdminT } from "@/lib/admin-i18n/server";

export default async function ExportPage() {
  const t = await getAdminT();
  const [pageCount, postCount, settings] = await Promise.all([
    prisma.page.count({ where: { status: "published" } }),
    prisma.post.count({ where: { status: "published" } }),
    getSiteSettings(),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-8 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">{t("export.title")}</h1>
      <p className="mt-1 text-sm text-muted">{t("export.subtitle")}</p>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <Stat label={t("export.pages")} value={pageCount} />
        <Stat label={t("export.posts")} value={postCount} />
        <Stat label={t("export.locales")} value={3} />
      </div>

      <div className="mt-6 rounded-lg border border-border bg-surface p-6">
        <Link
          href="/admin/export/download"
          className="inline-block rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-surface hover:bg-accent-strong"
        >
          {t("export.download")}
        </Link>

        <div className="mt-6 space-y-3 text-sm text-ink-soft">
          <p>
            <strong className="text-ink">{t("export.hostingTitle")}</strong> {t("export.hostingBody")}
          </p>
          <p>
            <strong className="text-ink">{t("export.localTitle")}</strong> {t("export.localBody")}
          </p>
          <p>
            <strong className="text-ink">{t("export.formTitle")}</strong>{" "}
            {settings.contactFormAction ? (
              t("export.formConfigured")
            ) : (
              <>
                {t("export.formNotConfigured")}{" "}
                <Link href="/admin/settings" className="underline">
                  {t("export.settingsLink")}
                </Link>
                .
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="font-display text-2xl font-bold tabular-nums text-ink">{value}</div>
      <div className="mt-0.5 text-xs text-muted">{label}</div>
    </div>
  );
}
