"use client";

import type { Block } from "@/blocks/types";
import { FIELD_SPECS, BLOCK_LABELS } from "@/blocks/types";
import type { Locale } from "@/blocks/context";
import type { PathSegment } from "./object-path";
import { FieldRenderer } from "./FieldRenderer";
import { LocaleTabs } from "./LocaleTabs";

export function BlockEditForm({
  block,
  activeLocale,
  onLocaleChange,
  onLeafChange,
  onClose,
}: {
  block: Block;
  activeLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
  onLeafChange: (path: PathSegment[], value: unknown, localized: boolean) => void;
  onClose: () => void;
}) {
  const fields = FIELD_SPECS[block.type];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <div className="text-xs font-medium text-muted">Редактирование блока</div>
          <div className="font-display text-sm font-semibold text-ink">{BLOCK_LABELS[block.type]}</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1.5 text-muted hover:bg-paper hover:text-ink"
          aria-label="Закрыть"
        >
          ✕
        </button>
      </div>

      <div className="border-b border-border px-4 py-3">
        <div className="mb-1.5 text-xs text-muted">Язык редактируемого текста</div>
        <LocaleTabs value={activeLocale} onChange={onLocaleChange} />
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {fields.length === 0 ? (
          <p className="text-sm text-muted">У этого блока нет настраиваемых полей.</p>
        ) : (
          fields.map((spec) => (
            <div key={spec.name}>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink-soft">
                {spec.label}
                {spec.localized && (
                  <span className="rounded bg-accent-tint px-1.5 py-0.5 text-[10px] font-semibold text-accent-strong">
                    {activeLocale.toUpperCase()}
                  </span>
                )}
              </label>
              <FieldRenderer
                spec={spec}
                value={(block.data as Record<string, unknown>)[spec.name]}
                path={[spec.name]}
                onLeafChange={onLeafChange}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
