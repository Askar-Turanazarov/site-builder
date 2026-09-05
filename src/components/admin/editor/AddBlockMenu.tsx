"use client";

import { BLOCK_TYPES, type BlockType } from "@/blocks/types";
import { blockLabel, blockDescription } from "@/blocks/labels";
import { useAdminT } from "@/components/admin/AdminI18nProvider";

export function AddBlockMenu({
  onPick,
  onClose,
}: {
  onPick: (type: BlockType) => void;
  onClose: () => void;
}) {
  const t = useAdminT();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6" onClick={onClose}>
      <div
        className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-surface p-5 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">{t("editor.addBlockTitle")}</h2>
          <button type="button" onClick={onClose} className="rounded-md p-1.5 text-muted hover:bg-paper">
            ✕
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {BLOCK_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onPick(type)}
              className="rounded-md border border-border p-3 text-left transition hover:border-accent hover:bg-accent-tint"
            >
              <div className="text-sm font-medium text-ink">{blockLabel(t, type)}</div>
              <div className="mt-1 text-xs text-muted">{blockDescription(t, type)}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
