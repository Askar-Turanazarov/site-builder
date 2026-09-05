"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Block } from "@/blocks/types";
import type { Locale } from "@/blocks/context";
import type { SiteDesign } from "@/blocks/palette";
import { useBlockEditor, type LocaleBlocks } from "./useBlockEditor";
import { BlockEditorBody } from "./BlockEditorBody";
import { LocalizedTextInput } from "./TitleFields";
import { MediaPickerField } from "./MediaPickerField";
import { createPostAction, updatePostAction, deletePostAction, type PostInput } from "@/lib/actions/posts";
import { useAdminT } from "@/components/admin/AdminI18nProvider";
import { adminErrorText } from "@/lib/admin-i18n/errors";

export interface PostEditorInitial {
  id?: string;
  slug: string;
  categoryId: string;
  coverMediaId: string | null;
  titleRu: string;
  titleUz: string;
  titleEn: string;
  excerptRu: string;
  excerptUz: string;
  excerptEn: string;
  metaDescRu: string;
  metaDescUz: string;
  metaDescEn: string;
  blocksRu: Block[];
  blocksUz: Block[];
  blocksEn: Block[];
  status: "draft" | "published";
}

export function PostEditor({
  initial,
  design,
  categories,
}: {
  initial: PostEditorInitial;
  design: SiteDesign;
  categories: { id: string; nameRu: string }[];
}) {
  const t = useAdminT();
  const router = useRouter();
  const isNew = !initial.id;

  const [slug, setSlug] = useState(initial.slug);
  const [categoryId, setCategoryId] = useState(initial.categoryId || categories[0]?.id || "");
  const [coverMediaId, setCoverMediaId] = useState<string | null>(initial.coverMediaId);
  const [status, setStatus] = useState<"draft" | "published">(initial.status);
  const [title, setTitle] = useState<Record<Locale, string>>({ ru: initial.titleRu, uz: initial.titleUz, en: initial.titleEn });
  const [excerpt, setExcerpt] = useState<Record<Locale, string>>({ ru: initial.excerptRu, uz: initial.excerptUz, en: initial.excerptEn });
  const [metaDesc, setMetaDesc] = useState<Record<Locale, string>>({ ru: initial.metaDescRu, uz: initial.metaDescUz, en: initial.metaDescEn });
  const [showSeo, setShowSeo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const initialBlocks: LocaleBlocks = { ru: initial.blocksRu, uz: initial.blocksUz, en: initial.blocksEn };
  const editor = useBlockEditor(initialBlocks);

  function buildInput(nextStatus: "draft" | "published"): PostInput {
    return {
      slug,
      categoryId,
      coverMediaId,
      titleRu: title.ru,
      titleUz: title.uz,
      titleEn: title.en,
      excerptRu: excerpt.ru,
      excerptUz: excerpt.uz,
      excerptEn: excerpt.en,
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
      setError(t("postEditor.errSlug"));
      return;
    }
    if (!categoryId) {
      setError(t("postEditor.errCategory"));
      return;
    }
    startTransition(async () => {
      try {
        const input = buildInput(nextStatus);
        if (isNew) {
          await createPostAction(input);
        } else {
          await updatePostAction(initial.id!, input);
          setStatus(nextStatus);
          router.refresh();
        }
      } catch (e) {
        setError(adminErrorText(t, e, "postEditor.errSave"));
      }
    });
  }

  function handleDelete() {
    if (!initial.id) return;
    if (!window.confirm(t("postEditor.confirmDelete"))) return;
    startTransition(async () => {
      await deletePostAction(initial.id!);
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
                placeholder="pervaya-statya"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-muted">{t("postEditor.category")}</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="rounded-md border border-border bg-paper px-3 py-1.5 text-sm text-ink outline-none focus:border-accent"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameRu}
                  </option>
                ))}
              </select>
            </div>
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
                  href={`/admin/preview/post/${initial.id}?locale=${editor.activeLocale}`}
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

        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
          <LocalizedTextInput label={t("postEditor.articleTitle")} values={title} onChange={(l, v) => setTitle((t) => ({ ...t, [l]: v }))} />
          <div>
            <div className="mb-1.5 text-xs font-semibold text-muted">{t("postEditor.cover")}</div>
            <MediaPickerField value={coverMediaId} onChange={setCoverMediaId} />
          </div>
        </div>

        <div className="mt-4">
          <LocalizedTextInput label={t("postEditor.excerpt")} values={excerpt} onChange={(l, v) => setExcerpt((x) => ({ ...x, [l]: v }))} multiline />
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
            <LocalizedTextInput label={t("pageEditor.metaDesc")} values={metaDesc} onChange={(l, v) => setMetaDesc((m) => ({ ...m, [l]: v }))} multiline />
          </div>
        )}
      </div>

      <BlockEditorBody editor={editor} design={design} />
    </div>
  );
}
