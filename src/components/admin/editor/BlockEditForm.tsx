"use client";

import { useState } from "react";
import type { Block } from "@/blocks/types";
import { FIELD_SPECS } from "@/blocks/types";
import { blockLabel, fieldLabel } from "@/blocks/labels";
import { useAdminT } from "@/components/admin/AdminI18nProvider";
import type { BlockStyle } from "@/blocks/style";
import type { SiteDesign } from "@/blocks/palette";
import type { Locale } from "@/blocks/context";
import type { PathSegment } from "./object-path";
import { FieldRenderer } from "./FieldRenderer";
import { StyleEditForm } from "./StyleEditForm";
import { LocaleTabs } from "./LocaleTabs";

type Tab = "content" | "style";

export function BlockEditForm({
  block,
  activeLocale,
  design,
  onLocaleChange,
  onLeafChange,
  onStyleChange,
  onClose,
}: {
  block: Block;
  activeLocale: Locale;
  design: SiteDesign;
  onLocaleChange: (locale: Locale) => void;
  onLeafChange: (path: PathSegment[], value: unknown, localized: boolean) => void;
  onStyleChange: (patch: Partial<BlockStyle>) => void;
  onClose: () => void;
}) {
  const t = useAdminT();
  const [tab, setTab] = useState<Tab>("content");
  const fields = FIELD_SPECS[block.type];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <div className="text-xs font-medium text-muted">{t("editor.editingBlock")}</div>
          <div className="font-display text-sm font-semibold text-ink">{blockLabel(t, block.type)}</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1.5 text-muted hover:bg-paper hover:text-ink"
          aria-label={t("common.close")}
        >
          ✕
        </button>
      </div>

      <div className="flex border-b border-border px-4 pt-3">
        <TabButton active={tab === "content"} onClick={() => setTab("content")}>
          {t("editor.tabContent")}
        </TabButton>
        <TabButton active={tab === "style"} onClick={() => setTab("style")}>
          {t("editor.tabStyle")}
        </TabButton>
      </div>

      {tab === "content" ? (
        <>
          <div className="border-b border-border px-4 py-3">
            <div className="mb-1.5 text-xs text-muted">{t("editor.contentLanguage")}</div>
            <LocaleTabs value={activeLocale} onChange={onLocaleChange} />
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {fields.length === 0 ? (
              <p className="text-sm text-muted">{t("editor.noFields")}</p>
            ) : (
              fields.map((spec) => (
                <div key={spec.name}>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink-soft">
                    {fieldLabel(t, block.type, spec)}
                    {spec.localized && (
                      <span className="rounded bg-accent-tint px-1.5 py-0.5 text-[10px] font-semibold text-accent-strong">
                        {activeLocale.toUpperCase()}
                      </span>
                    )}
                  </label>
                  <FieldRenderer
                    spec={spec}
                    blockType={block.type}
                    value={(block.data as Record<string, unknown>)[spec.name]}
                    path={[spec.name]}
                    onLeafChange={onLeafChange}
                  />
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <p className="mb-4 text-xs text-muted">
            {t("editor.styleHint")}
          </p>
          <StyleEditForm style={block.style} design={design} onChange={onStyleChange} />
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition ${
        active
          ? "border-accent text-accent-strong"
          : "border-transparent text-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
