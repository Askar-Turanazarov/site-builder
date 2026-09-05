"use client";

import { useAdminT } from "@/components/admin/AdminI18nProvider";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createMenuItemAction, updateMenuItemAction, deleteMenuItemAction, type MenuItemInput } from "@/lib/actions/menu";

interface MenuItemRow {
  id: string;
  labelRu: string;
  labelUz: string;
  labelEn: string;
  linkType: string;
  pageId: string | null;
  categoryId: string | null;
  customUrl: string | null;
  order: number;
  location: string;
}

export function MenuEditor({
  items,
  pages,
  categories,
}: {
  items: MenuItemRow[];
  pages: { id: string; titleRu: string; slug: string }[];
  categories: { id: string; nameRu: string; slug: string }[];
}) {
  const t = useAdminT();
  const [location, setLocation] = useState<"header" | "footer">("header");
  const filtered = items.filter((i) => i.location === location).sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="mb-4 inline-flex rounded-md border border-border bg-surface p-0.5">
        {(["header", "footer"] as const).map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => setLocation(loc)}
            className={`rounded px-3 py-1.5 text-sm font-medium ${
              location === loc ? "bg-accent-tint text-accent-strong" : "text-muted hover:text-ink"
            }`}
          >
            {loc === "header" ? t("menu.header") : t("menu.footer")}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((item) => (
          <ItemRow key={item.id} item={item} pages={pages} categories={categories} />
        ))}
        {filtered.length === 0 && (
          <p className="rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted">
            {t("menu.empty")}
          </p>
        )}
      </div>

      <div className="mt-4">
        <NewItemForm location={location} pages={pages} categories={categories} nextOrder={filtered.length} />
      </div>
    </div>
  );
}

function targetOptions(
  linkType: string,
  pages: { id: string; titleRu: string; slug: string }[],
  categories: { id: string; nameRu: string; slug: string }[],
) {
  if (linkType === "page") return pages.map((p) => ({ value: p.id, label: p.titleRu || p.slug }));
  if (linkType === "category") return categories.map((c) => ({ value: c.id, label: c.nameRu || c.slug }));
  return [];
}

function ItemRow({
  item,
  pages,
  categories,
}: {
  item: MenuItemRow;
  pages: { id: string; titleRu: string; slug: string }[];
  categories: { id: string; nameRu: string; slug: string }[];
}) {
  const router = useRouter();
  const t = useAdminT();
  const [labelRu, setLabelRu] = useState(item.labelRu);
  const [linkType, setLinkType] = useState(item.linkType as "page" | "category" | "custom");
  const [target, setTarget] = useState(item.pageId ?? item.categoryId ?? "");
  const [customUrl, setCustomUrl] = useState(item.customUrl ?? "");
  const [order, setOrder] = useState(item.order);
  const [pending, startTransition] = useTransition();

  function save() {
    const input: MenuItemInput = {
      labelRu,
      labelUz: item.labelUz,
      labelEn: item.labelEn,
      linkType,
      pageId: linkType === "page" ? target : null,
      categoryId: linkType === "category" ? target : null,
      customUrl: linkType === "custom" ? customUrl : null,
      order,
      location: item.location as "header" | "footer",
    };
    startTransition(async () => {
      await updateMenuItemAction(item.id, input);
      router.refresh();
    });
  }

  function remove() {
    if (!window.confirm(t("menu.confirmDelete"))) return;
    startTransition(async () => {
      await deleteMenuItemAction(item.id);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-surface p-2.5">
      <input
        type="number"
        value={order}
        onChange={(e) => setOrder(Number(e.target.value))}
        className="w-14 rounded-md border border-border bg-paper px-2 py-1.5 text-sm outline-none focus:border-accent"
      />
      <input
        value={labelRu}
        onChange={(e) => setLabelRu(e.target.value)}
        placeholder={t("menu.labelRu")}
        className="w-40 rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm outline-none focus:border-accent"
      />
      <select
        value={linkType}
        onChange={(e) => {
          setLinkType(e.target.value as "page" | "category" | "custom");
          setTarget("");
        }}
        className="rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm outline-none focus:border-accent"
      >
        <option value="page">{t("menu.linkPage")}</option>
        <option value="category">{t("menu.linkCategory")}</option>
        <option value="custom">{t("menu.linkCustom")}</option>
      </select>
      {linkType === "custom" ? (
        <input
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
          placeholder="/about или https://…"
          className="w-48 rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm outline-none focus:border-accent"
        />
      ) : (
        <select
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-48 rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm outline-none focus:border-accent"
        >
          <option value="">{t("menu.choose")}</option>
          {targetOptions(linkType, pages, categories).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
      <button
        type="button"
        onClick={save}
        disabled={pending}
        className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-ink hover:border-accent"
      >
        {t("common.save")}
      </button>
      <button type="button" onClick={remove} className="rounded-md px-2 py-1.5 text-xs text-muted hover:text-danger">
        ✕
      </button>
    </div>
  );
}

function NewItemForm({
  location,
  pages,
  categories,
  nextOrder,
}: {
  location: "header" | "footer";
  pages: { id: string; titleRu: string; slug: string }[];
  categories: { id: string; nameRu: string; slug: string }[];
  nextOrder: number;
}) {
  const router = useRouter();
  const t = useAdminT();
  const [labelRu, setLabelRu] = useState("");
  const [labelUz, setLabelUz] = useState("");
  const [labelEn, setLabelEn] = useState("");
  const [linkType, setLinkType] = useState<"page" | "category" | "custom">("page");
  const [target, setTarget] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [pending, startTransition] = useTransition();

  function submit() {
    if (!labelRu.trim()) return;
    startTransition(async () => {
      await createMenuItemAction({
        labelRu,
        labelUz: labelUz || labelRu,
        labelEn: labelEn || labelRu,
        linkType,
        pageId: linkType === "page" ? target || null : null,
        categoryId: linkType === "category" ? target || null : null,
        customUrl: linkType === "custom" ? customUrl : null,
        order: nextOrder,
        location,
      });
      setLabelRu("");
      setLabelUz("");
      setLabelEn("");
      setTarget("");
      setCustomUrl("");
      router.refresh();
    });
  }

  return (
    <div className="rounded-lg border border-dashed border-border p-4">
      <h2 className="mb-3 text-sm font-semibold text-ink-soft">{t("menu.addItem")}</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <input value={labelRu} onChange={(e) => setLabelRu(e.target.value)} placeholder={t("menu.labelRu")} className="rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm outline-none focus:border-accent" />
        <input value={labelUz} onChange={(e) => setLabelUz(e.target.value)} placeholder={t("menu.labelUz")} className="rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm outline-none focus:border-accent" />
        <input value={labelEn} onChange={(e) => setLabelEn(e.target.value)} placeholder={t("menu.labelEn")} className="rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm outline-none focus:border-accent" />
        <select value={linkType} onChange={(e) => { setLinkType(e.target.value as "page" | "category" | "custom"); setTarget(""); }} className="rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm outline-none focus:border-accent">
          <option value="page">{t("menu.linkPage")}</option>
          <option value="category">{t("menu.linkCategory")}</option>
          <option value="custom">{t("menu.linkCustom")}</option>
        </select>
        {linkType === "custom" ? (
          <input value={customUrl} onChange={(e) => setCustomUrl(e.target.value)} placeholder="/about" className="rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm outline-none focus:border-accent" />
        ) : (
          <select value={target} onChange={(e) => setTarget(e.target.value)} className="rounded-md border border-border bg-paper px-2.5 py-1.5 text-sm outline-none focus:border-accent">
            <option value="">{t("menu.choose")}</option>
            {targetOptions(linkType, pages, categories).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      </div>
      <button
        type="button"
        onClick={submit}
        disabled={pending}
        className="mt-3 rounded-md bg-accent px-4 py-1.5 text-sm font-medium text-surface hover:bg-accent-strong disabled:opacity-60"
      >
        {t("common.add")}
      </button>
    </div>
  );
}
