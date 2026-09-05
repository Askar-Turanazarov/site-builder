import Link from "next/link";
import type { PageTemplate } from "@/lib/templates";
import { getAdminT } from "@/lib/admin-i18n/server";

export async function TemplatePicker({
  title,
  subtitle,
  blankHref,
  groups,
  buildHref,
}: {
  title: string;
  subtitle: string;
  blankHref: string;
  groups: { heading: string; templates: PageTemplate[] }[];
  buildHref: (templateKey: string) => string;
}) {
  const t = await getAdminT();

  return (
    <div className="mx-auto max-w-4xl px-8 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">{title}</h1>
      <p className="mt-1 text-sm text-muted">{subtitle}</p>

      <Link
        href={blankHref}
        className="mt-6 flex items-center gap-3 rounded-lg border border-dashed border-border bg-surface p-4 hover:border-accent"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-paper text-lg text-muted">
          +
        </span>
        <div>
          <div className="text-sm font-medium text-ink">{t("picker.blank")}</div>
          <div className="text-xs text-muted">{t("picker.blankHint")}</div>
        </div>
      </Link>

      {groups.map((group) => (
        <div key={group.heading} className="mt-8">
          <h2 className="mb-3 text-sm font-semibold text-ink-soft">{group.heading}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {group.templates.map((tpl) => (
              <Link
                key={tpl.key}
                href={buildHref(tpl.key)}
                className="rounded-lg border border-border bg-surface p-4 hover:border-accent hover:bg-accent-tint"
              >
                <div className="text-sm font-medium text-ink">{tpl.labelRu}</div>
                <div className="mt-1 text-xs text-muted">{tpl.blocksRu.length} {t("picker.blocks")}</div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
