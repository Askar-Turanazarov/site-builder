"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Block } from "@/blocks/types";
import { BLOCK_LABELS } from "@/blocks/types";

export function BlockListSidebar({
  blocks,
  selectedId,
  onSelect,
  onReorder,
  onDuplicate,
  onRemove,
  onAddClick,
}: {
  blocks: Block[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onDuplicate: (id: string) => void;
  onRemove: (id: string) => void;
  onAddClick: () => void;
}) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const fromIndex = blocks.findIndex((b) => b.id === active.id);
    const toIndex = blocks.findIndex((b) => b.id === over.id);
    if (fromIndex === -1 || toIndex === -1) return;
    onReorder(fromIndex, toIndex);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-4 py-3">
        <button
          type="button"
          onClick={onAddClick}
          className="w-full rounded-md bg-accent px-3 py-2 text-sm font-medium text-surface hover:bg-accent-strong"
        >
          + Добавить блок
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {blocks.length === 0 ? (
          <p className="px-2 py-6 text-center text-sm text-muted">
            Блоков пока нет. Добавьте первый блок, чтобы начать.
          </p>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-1">
                {blocks.map((block) => (
                  <SortableRow
                    key={block.id}
                    block={block}
                    selected={block.id === selectedId}
                    onSelect={() => onSelect(block.id)}
                    onDuplicate={() => onDuplicate(block.id)}
                    onRemove={() => onRemove(block.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}

function SortableRow({
  block,
  selected,
  onSelect,
  onDuplicate,
  onRemove,
}: {
  block: Block;
  selected: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`group flex items-center gap-1.5 rounded-md border px-2 py-2 ${
        selected ? "border-accent bg-accent-tint" : "border-transparent hover:bg-paper"
      } ${isDragging ? "opacity-50" : ""}`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none px-1 text-muted active:cursor-grabbing"
        aria-label="Перетащить"
      >
        ⠿
      </button>
      <button type="button" onClick={onSelect} className="min-w-0 flex-1 truncate text-left text-sm text-ink">
        {BLOCK_LABELS[block.type]}
      </button>
      <button
        type="button"
        onClick={onDuplicate}
        className="rounded px-1.5 py-0.5 text-xs text-muted opacity-0 hover:bg-surface hover:text-ink group-hover:opacity-100"
        title="Дублировать"
      >
        ⧉
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="rounded px-1.5 py-0.5 text-xs text-muted opacity-0 hover:bg-danger-tint hover:text-danger group-hover:opacity-100"
        title="Удалить"
      >
        ✕
      </button>
    </div>
  );
}
