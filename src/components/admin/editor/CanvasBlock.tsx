"use client";

import type { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Block } from "@/blocks/types";
import { blockLabel } from "@/blocks/labels";
import { useAdminT } from "@/components/admin/AdminI18nProvider";

/**
 * Обёртка одного блока на холсте редактора: рамка при наведении, панель
 * действий и перетаскивание. Само содержимое блока рендерится в контейнере
 * с `pointer-events-none` — так внутри превью не срабатывают ссылки, кнопки
 * и формы, а клик достаётся обёртке и выбирает блок.
 */
export function CanvasBlock({
  block,
  selected,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onRemove,
  children,
}: {
  block: Block;
  selected: boolean;
  onSelect: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
  children: ReactNode;
}) {
  const t = useAdminT();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      onClick={onSelect}
      className={`group relative cursor-pointer outline-offset-[-2px] ${
        selected ? "outline outline-2 outline-accent" : "hover:outline hover:outline-2 hover:outline-accent/40"
      } ${isDragging ? "z-10 opacity-60" : ""}`}
    >
      {(selected || block.style?.hidden) && (
        <span className="pointer-events-none absolute top-2 left-2 z-20 rounded bg-accent px-2 py-0.5 text-[11px] font-medium text-surface">
          {blockLabel(t, block.type)}
          {block.style?.hidden ? ` · ${t("editor.hiddenBadge")}` : ""}
        </span>
      )}

      <div
        className="pointer-events-auto absolute top-2 right-2 z-20 flex items-center gap-0.5 rounded-md border border-border bg-surface p-0.5 opacity-0 shadow-sm transition group-hover:opacity-100 focus-within:opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          {...attributes}
          {...listeners}
          title={t("editor.drag")}
          className="cursor-grab px-1.5 py-1 text-xs text-muted hover:text-ink active:cursor-grabbing"
        >
          ⠿
        </button>
        <ToolbarButton title={t("editor.moveUp")} onClick={onMoveUp} disabled={!onMoveUp}>
          ↑
        </ToolbarButton>
        <ToolbarButton title={t("editor.moveDown")} onClick={onMoveDown} disabled={!onMoveDown}>
          ↓
        </ToolbarButton>
        <ToolbarButton title={t("editor.duplicate")} onClick={onDuplicate}>
          ⧉
        </ToolbarButton>
        <ToolbarButton title={t("editor.remove")} onClick={onRemove} danger>
          ✕
        </ToolbarButton>
      </div>

      <div className={`pointer-events-none ${block.style?.hidden ? "opacity-40" : ""}`}>
        {children}
      </div>
    </div>
  );
}

function ToolbarButton({
  title,
  onClick,
  children,
  danger,
  disabled,
}: {
  title: string;
  onClick?: () => void;
  children: ReactNode;
  danger?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`rounded px-1.5 py-1 text-xs transition disabled:opacity-30 ${
        danger ? "text-muted hover:bg-danger-tint hover:text-danger" : "text-muted hover:bg-paper hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
