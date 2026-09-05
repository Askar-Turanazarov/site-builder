"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Block } from "@/blocks/types";
import type { Locale } from "@/blocks/context";
import type { SiteDesign } from "@/blocks/palette";
import { useBlockEditor, type LocaleBlocks } from "./useBlockEditor";
import { BlockEditorBody } from "./BlockEditorBody";
import { LocalizedTextInput } from "./TitleFields";
import { createPageAction, updatePageAction, deletePageAction, type PageInput } from "@/lib/actions/pages";
import { useAdminT } from "@/components/admin/AdminI18nProvider";
import { adminErrorText } from "@/lib/admin-i18n/errors";

export interface PageEditorInitial {
  id?: string;
  slug: string;
  isHomepage: boolean;
  titleRu: string;
  titleUz: string;
  titleEn: string;
  metaDescRu: string;
  metaDescUz: string;
  metaDescEn: string;
  blocksRu: Block[];
  blocksUz: Block[];
  blocksEn: Block[];
  status: "draft" | "published";
}

export function PageEditor({ initial, design }: { initial: PageEditorInitial; design: SiteDesign }) {
  const t = useAdminT();
  const router = useRouter();
  const isNew = !initial.id;

  const [slug, setSlug] = useState(initial.slug);
  const [isHomepage, setIsHomepage] = useState(initial.isHomepage);
  const [status, setStatus] = useState<"draft" | "published">(initial.status);
  const [title, setTitle] = useState<Record<Locale, string>>({
    ru: initial.titleRu,
    uz: initial.titleUz,
    en: initial.titleEn,
  });
  const [metaDesc, setMetaDesc] = useState<Record<Locale, string>>({
    ru: initial.metaDescRu,
    uz: initial.metaDescUz,
    en: initial.metaDescEn,
  });
  const [showSeo, setShowSeo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const initialBlocks: LocaleBlocks = { ru: initial.blocksRu, uz: initial.blocksUz, en: initial.blocksEn };
  const editor = useBlockEditor(initialBlocks);

  function buildInput(nextStatus: "draft" | "published"): PageInput {
    return {
      slug,
      isHomepage,
      titleRu: title.ru,
      titleUz: title.uz,
      titleEn: title.en,
      metaDescRu: metaDesc.ru,
      metaDescUz: metaDesc.uz,
      metaDescEn: metaDesc.en,
      blocksRu: editor.blocks.ru,
      blocksUz: editor.blocks.uz,
      blocksEn: editor.blocks.en,
      status: nextStatus,
    };
  }

  function handleSave(nextStatus: "draft" | "published") {
    setError(null);
    if (!slug.trim()) {
      setError(t("pageEditor.errSlug"));
      return;
    }
    startTransition(async () => {
      try {
        const input = buildInput(nextStatus);
        if (isNew) {
          await createPageAction(input);
        } else {
          await updatePageAction(initial.id!, input);
          setStatus(nextStatus);
          router.refresh();
        }
      } catch (e) {
        setError(adminErrorText(t, e, "pageEditor.errSave"));
      }
    });
  }

  function handleDelete() {
    if (!initial.id) return;
    if (!window.confirm(t("pageEditor.confirmDelete"))) return;
    startTransition(async () => {
      await deletePageAction(initial.id!);
    });
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="border-b border-border bg-surface px-6 py-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-muted">{t("common.slug")}</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.trim().toLowerCase().replace(/\s+/g, "-"))}
                className="w-48 rounded-md border border-border bg-paper px-3 py-1.5 text-sm text-ink outline-none focus:border-accent"
                placeholder="about"
              />
            </div>
            <label className="flex items-center gap-2 pb-2 text-sm text-ink-soft">
              <input type="checkbox" checked={isHomepage} onChange={(e) => setIsHomepage(e.target.checked)} />
              {t("pageEditor.isHomepage")}
            </label>
            <div>
              <label className="mb-1 block text-xs font-semibold text-muted">{t("common.status")}</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                className="rounded-md border border-border bg-paper px-3 py-1.5 text-sm text-ink outline-none focus:border-accent"
              >
                <option value="draft">{t("common.draft")}</option>
                <option value="published">{t("common.published")}</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isNew && (
              <>
                <a
                  href={`/admin/preview/page/${initial.id}?locale=${editor.activeLocale}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-border px-3 py-1.5 text-sm text-ink-soft hover:border-accent hover:text-ink"
                >
                  {t("common.preview")} ↗
                </a>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={pending}
                  className="rounded-md border border-border px-3 py-1.5 text-sm text-danger hover:border-danger"
                >
                  {t("common.delete")}
                </button>
              </>
            )}
            <button
              type="button"
              disabled={pending}
              onClick={() => handleSave(status)}
              className="rounded-md border border-border bg-paper px-4 py-1.5 text-sm font-medium text-ink hover:border-accent disabled:opacity-60"
            >
              {t("common.save")}
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => handleSave("published")}
              className="rounded-md bg-accent px-4 py-1.5 text-sm font-medium text-surface hover:bg-accent-strong disabled:opacity-60"
            >
              {pending ? t("common.saving") : t("common.publish")}
            </button>
          </div>
        </div>

        {error && <p className="mt-3 rounded-md bg-danger-tint px-3 py-2 text-sm text-danger">{error}</p>}

        <div className="mt-4">
          <LocalizedTextInput label={t("pageEditor.pageTitle")} values={title} onChange={(l, v) => setTitle((t) => ({ ...t, [l]: v }))} />
        </div>

        <button
          type="button"
          onClick={() => setShowSeo((v) => !v)}
          className="mt-3 text-xs font-medium text-muted hover:text-ink"
        >
          {showSeo ? t("pageEditor.seoHide") : t("pageEditor.seoShow")}
        </button>
        {showSeo && (
          <div className="mt-2">
            <LocalizedTextInput
              label={t("pageEditor.metaDesc")}
              values={metaDesc}
              onChange={(l, v) => setMetaDesc((m) => ({ ...m, [l]: v }))}
              multiline
            />
          </div>
        )}
      </div>

      <BlockEditorBody editor={editor} design={design} />
    </div>
  );
}
