"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useAdminT } from "@/components/admin/AdminI18nProvider";
import { applySiteTemplateAction, type ApplyTemplateMode } from "@/lib/actions/site-templates";

export interface TemplateCard {
  key: string;
  label: string;
  profile: string;
  description: string;
  pages: number;
  posts: number;
  /** Свотч палитры темы шаблона: фон, акцент, цвет текста. */
  swatch: { paper: string; surface: string; accent: string; ink: string };
  fonts: string;
}

/**
 * Галерея готовых сайтов. «Применить» открывает выбор режима: заменить сайт
 * целиком или добавить содержимое шаблона рядом с текущим — иначе один клик
 * мог бы стереть работающий сайт.
 */
export function TemplateGallery({ templates }: { templates: TemplateCard[] }) {
  const t = useAdminT();
  const [asking, setAsking] = useState<TemplateCard | null>(null);
  const [applied, setApplied] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function apply(key: string, mode: ApplyTemplateMode) {
    startTransition(async () => {
      await applySiteTemplateAction(key, mode);
      setAsking(null);
      setApplied(key);
    });
  }

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {templates.map((template) => (
          <article
            key={template.key}
            className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface"
          >
            {/* Мини-превью палитры: сразу видно, чем шаблоны отличаются
                визуально, ещё до открытия демо. */}
            <div
              className="flex h-28 flex-col justify-end gap-2 p-4"
              style={{ backgroundColor: template.swatch.paper }}
            >
              <div
                className="h-3 w-2/3 rounded-full"
                style={{ backgroundColor: template.swatch.ink, opacity: 0.85 }}
              />
              <div className="flex items-center gap-2">
                <span
                  className="h-6 w-20 rounded-full"
                  style={{ backgroundColor: template.swatch.accent }}
                />
                <span
                  className="h-6 flex-1 rounded-full border"
                  style={{
                    backgroundColor: template.swatch.surface,
                    borderColor: `${template.swatch.ink}22`,
                  }}
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2 p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-base font-semibold text-ink">{template.label}</h2>
                <span className="shrink-0 rounded-full bg-paper px-2 py-0.5 text-[11px] text-muted">
                  {template.pages} {t("templates.pagesCount")} · {template.posts}{" "}
                  {t("templates.postsCount")}
                </span>
              </div>

              <p className="text-xs font-medium text-accent-strong">{template.profile}</p>
              <p className="text-sm text-muted">{template.description}</p>
              <p className="mt-auto pt-3 text-[11px] text-muted">
                {template.fonts}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <Link
                  href={`/admin/templates/${template.key}/preview`}
                  className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-ink hover:bg-paper"
                >
                  {t("templates.view")}
                </Link>
                <button
                  type="button"
                  onClick={() => setAsking(template)}
                  className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-surface hover:bg-accent-strong"
                >
                  {t("templates.apply")}
                </button>
                {applied === template.key && (
                  <span className="text-xs font-medium text-accent-strong">
                    {t("templates.applied")}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {asking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-surface p-6">
            <h3 className="font-display text-lg font-semibold text-ink">
              {t("templates.modeTitle")}
            </h3>
            <p className="mt-1 text-sm text-muted">{asking.label}</p>

            <div className="mt-5 space-y-3">
              <button
                type="button"
                disabled={pending}
                onClick={() => apply(asking.key, "replace")}
                className="w-full rounded-md border border-border p-4 text-left hover:border-accent disabled:opacity-60"
              >
                <span className="block text-sm font-medium text-ink">
                  {t("templates.modeReplace")}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  {t("templates.modeReplaceHint")}
                </span>
              </button>

              <button
                type="button"
                disabled={pending}
                onClick={() => apply(asking.key, "append")}
                className="w-full rounded-md border border-border p-4 text-left hover:border-accent disabled:opacity-60"
              >
                <span className="block text-sm font-medium text-ink">
                  {t("templates.modeAppend")}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  {t("templates.modeAppendHint")}
                </span>
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-muted">{pending ? t("templates.applying") : ""}</span>
              <button
                type="button"
                disabled={pending}
                onClick={() => setAsking(null)}
                className="text-sm text-muted hover:text-ink disabled:opacity-60"
              >
                {t("common.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
