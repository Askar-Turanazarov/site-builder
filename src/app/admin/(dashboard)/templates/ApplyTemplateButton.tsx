"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useAdminT } from "@/components/admin/AdminI18nProvider";
import { applySiteTemplateAction, type ApplyTemplateMode } from "@/lib/actions/site-templates";

/**
 * Кнопка «Применить» с выбором режима и экраном результата.
 *
 * Режим спрашивается всегда: замена сайта необратима, одного клика мало.
 * После применения показываем не строчку «готово», а следующие шаги —
 * иначе администратор остаётся на витрине и не понимает, что изменилось.
 */
export function ApplyTemplateButton({
  templateKey,
  label,
  siteHref,
  autoOpen = false,
}: {
  templateKey: string;
  label: string;
  siteHref: string;
  autoOpen?: boolean;
}) {
  const t = useAdminT();
  const [asking, setAsking] = useState(autoOpen);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  function apply(mode: ApplyTemplateMode) {
    startTransition(async () => {
      await applySiteTemplateAction(templateKey, mode);
      setAsking(false);
      setDone(true);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAsking(true)}
        className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-surface hover:bg-accent-strong"
      >
        {t("templates.apply")}
      </button>

      {asking && (
        <Dialog title={t("templates.modeTitle")} subtitle={label} onClose={() => setAsking(false)}>
          <div className="space-y-3">
            <ModeButton
              disabled={pending}
              onClick={() => apply("replace")}
              title={t("templates.modeReplace")}
              hint={t("templates.modeReplaceHint")}
            />
            <ModeButton
              disabled={pending}
              onClick={() => apply("append")}
              title={t("templates.modeAppend")}
              hint={t("templates.modeAppendHint")}
            />
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
        </Dialog>
      )}

      {done && (
        <Dialog title={t("templates.applied")} subtitle={label} onClose={() => setDone(false)}>
          <p className="text-sm text-muted">{t("templates.resultHint")}</p>
          <div className="mt-5 flex flex-col gap-2">
            <Link
              href={siteHref}
              className="rounded-md bg-accent px-4 py-2 text-center text-sm font-medium text-surface hover:bg-accent-strong"
            >
              {t("templates.openSite")}
            </Link>
            <Link
              href="/admin/pages"
              className="rounded-md border border-border px-4 py-2 text-center text-sm font-medium text-ink hover:bg-paper"
            >
              {t("templates.editPages")}
            </Link>
            <button
              type="button"
              onClick={() => setDone(false)}
              className="px-4 py-2 text-sm text-muted hover:text-ink"
            >
              {t("templates.backToList")}
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
}

function Dialog({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <button type="button" aria-hidden className="absolute inset-0 cursor-default" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-lg border border-border bg-surface p-6">
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-1 mb-5 text-sm text-muted">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}

function ModeButton({
  title,
  hint,
  disabled,
  onClick,
}: {
  title: string;
  hint: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="w-full rounded-md border border-border p-4 text-left hover:border-accent disabled:opacity-60"
    >
      <span className="block text-sm font-medium text-ink">{title}</span>
      <span className="mt-1 block text-xs text-muted">{hint}</span>
    </button>
  );
}
