"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAdminT } from "@/components/admin/AdminI18nProvider";
import { adminErrorText } from "@/lib/admin-i18n/errors";
import type { Locale } from "@/blocks/context";
import { LocalizedTextInput } from "./editor/TitleFields";
import { createCategoryAction, updateCategoryAction, deleteCategoryAction, type CategoryInput } from "@/lib/actions/categories";

export interface CategoryFormInitial {
  id?: string;
  slug: string;
  nameRu: string;
  nameUz: string;
  nameEn: string;
  descRu: string;
  descUz: string;
  descEn: string;
  order: number;
}

export function CategoryForm({ initial }: { initial: CategoryFormInitial }) {
  const router = useRouter();
  const isNew = !initial.id;

  const t = useAdminT();
  const [slug, setSlug] = useState(initial.slug);
  const [order, setOrder] = useState(initial.order);
  const [name, setName] = useState<Record<Locale, string>>({ ru: initial.nameRu, uz: initial.nameUz, en: initial.nameEn });
  const [desc, setDesc] = useState<Record<Locale, string>>({ ru: initial.descRu, uz: initial.descUz, en: initial.descEn });
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function buildInput(): CategoryInput {
    return {
      slug,
      order,
      nameRu: name.ru,
      nameUz: name.uz,
      nameEn: name.en,
      descRu: desc.ru,
      descUz: desc.uz,
      descEn: desc.en,
    };
  }

  function handleSave() {
    setError(null);
    if (!slug.trim() || !name.ru.trim()) {
      setError(t("categoryForm.errRequired"));
      return;
    }
    startTransition(async () => {
      try {
        if (isNew) {
          await createCategoryAction(buildInput());
        } else {
          await updateCategoryAction(initial.id!, buildInput());
          router.push("/admin/categories");
        }
      } catch (e) {
        setError(adminErrorText(t, e, "categoryForm.errSave"));
      }
    });
  }

  function handleDelete() {
    if (!initial.id) return;
    if (!window.confirm(t("categoryForm.confirmDelete"))) return;
    startTransition(async () => {
      try {
        await deleteCategoryAction(initial.id!);
        router.push("/admin/categories");
      } catch (e) {
        setError(adminErrorText(t, e, "categoryForm.errDelete"));
      }
    });
  }

  return (
    <div className="mx-auto max-w-2xl px-8 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">
        {isNew ? t("categoryForm.newTitle") : t("categoryForm.editTitle")}
      </h1>

      {error && <p className="mt-4 rounded-md bg-danger-tint px-3 py-2 text-sm text-danger">{error}</p>}

      <div className="mt-6 space-y-5 rounded-lg border border-border bg-surface p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">{t("common.slug")}</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value.trim().toLowerCase().replace(/\s+/g, "-"))}
              className="w-full rounded-md border border-border bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent"
              placeholder="news"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">{t("categoryForm.order")}</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="w-full rounded-md border border-border bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
          </div>
        </div>

        <LocalizedTextInput label={t("categoryForm.name")} values={name} onChange={(l, v) => setName((n) => ({ ...n, [l]: v }))} />
        <LocalizedTextInput label={t("categoryForm.description")} values={desc} onChange={(l, v) => setDesc((d) => ({ ...d, [l]: v }))} multiline />
      </div>

      <div className="mt-5 flex items-center gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={handleSave}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-surface hover:bg-accent-strong disabled:opacity-60"
        >
          {pending ? t("common.saving") : t("common.save")}
        </button>
        {!isNew && (
          <button
            type="button"
            disabled={pending}
            onClick={handleDelete}
            className="rounded-md border border-border px-4 py-2 text-sm text-danger hover:border-danger"
          >
            {t("common.delete")}
          </button>
        )}
      </div>
    </div>
  );
}
