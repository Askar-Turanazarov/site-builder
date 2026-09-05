"use client";

import { useState, useTransition } from "react";
import { useAdminT } from "@/components/admin/AdminI18nProvider";
import { applySiteTemplateAction, type ApplyTemplateMode } from "@/lib/actions/site-templates";

/**
 * Кнопка «Применить этот шаблон» на экране демонстрации. Режим спрашиваем так
 * же, как в галерее: замена сайта необратима, поэтому одного клика мало.
 */
export function ApplyTemplateButton({ templateKey }: { templateKey: string }) {
  const t = useAdminT();
  const [asking, setAsking] = useState(false);
  const [applied, setApplied] = useState(false);
  const [pending, startTransition] = useTransition();

  function apply(mode: ApplyTemplateMode) {
    startTransition(async () => {
      await applySiteTemplateAction(templateKey, mode);
      setAsking(false);
      setApplied(true);
    });
  }

  if (applied) {
    return <span className="text-sm font-medium text-accent-strong">{t("templates.applied")}</span>;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAsking(true)}
        className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-surface hover:bg-accent-strong"
      >
        {t("templates.applyFromPreview")}
      </button>

      {asking && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-surface p-6">
            <h3 className="font-display text-lg font-semibold text-ink">
              {t("templates.modeTitle")}
            </h3>

            <div className="mt-5 space-y-3">
              <button
                type="button"
                disabled={pending}
                onClick={() => apply("replace")}
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
                onClick={() => apply("append")}
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
                onClick={() => setAsking(false)}
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
