"use client";

import { Fragment, useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { renderBlock } from "@/blocks/registry";
import type { Block } from "@/blocks/types";
import type { Locale, MediaRef } from "@/blocks/context";
import { googleFontsHref, themeStyleVars, type SiteDesign } from "@/blocks/palette";
import { listMediaAction } from "@/lib/actions/media";
import { CanvasBlock } from "./CanvasBlock";
import { useAdminT } from "@/components/admin/AdminI18nProvider";

// Подписи, которые блоки берут из словаря публичного сайта. В редакторе
// словарь не подгружаем — показываем фиксированные значения на трёх языках.
const PREVIEW_STRINGS: Record<Locale, Record<string, string>> = {
  ru: { "pricing.recommended": "Рекомендуем" },
  uz: { "pricing.recommended": "Tavsiya etamiz" },
  en: { "pricing.recommended": "Recommended" },
};

export function EditorCanvas({
  blocks,
  locale,
  design,
  selectedId,
  onSelect,
  onReorder,
  onDuplicate,
  onRemove,
  onInsertAt,
}: {
  blocks: Block[];
  locale: Locale;
  design: SiteDesign;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onDuplicate: (id: string) => void;
  onRemove: (id: string) => void;
  onInsertAt: (index: number) => void;
}) {
  const t = useAdminT();
  const [media, setMedia] = useState<Record<string, MediaRef>>({});
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  useEffect(() => {
    listMediaAction().then((rows) => {
      const map: Record<string, MediaRef> = {};
      for (const m of rows) {
        map[m.id] = { url: `/uploads/${m.path}`, alt: m.filename, width: m.width, height: m.height };
      }
      setMedia(map);
    });
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = blocks.findIndex((b) => b.id === active.id);
    const to = blocks.findIndex((b) => b.id === over.id);
    if (from === -1 || to === -1) return;
    onReorder(from, to);
  }

  // Превью должно показывать те же шрифты, что и сайт.
  const fontsHref = googleFontsHref(design);

  const ctx = {
    locale,
    media,
    t: (key: string) => PREVIEW_STRINGS[locale][key] ?? key,
    pageSlug: "preview",
  };

  return (
    <div className="h-full overflow-y-auto bg-paper">
      {fontsHref && <link rel="stylesheet" href={fontsHref} />}
      <div
        style={themeStyleVars(design)}
        data-skin={design.skinKey || undefined}
        className="min-h-full bg-[var(--tpl-paper)]"
      >
        {blocks.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-3 text-sm text-muted">
            {t("editor.emptyCanvas")}
            <button
              type="button"
              onClick={() => onInsertAt(0)}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-surface hover:bg-accent-strong"
            >
              {t("editor.addBlock")}
            </button>
          </div>
        ) : (
          // Явный id обязателен: без него dnd-kit нумерует служебные
          // aria-describedby по счётчику, и на странице с двумя DndContext
          // серверная и клиентская разметка расходятся (ошибка гидратации).
          <DndContext
            id="editor-canvas"
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
              {blocks.map((block, index) => (
                <Fragment key={block.id}>
                  <InsertZone label={t("editor.insertHere")} onClick={() => onInsertAt(index)} />
                  <CanvasBlock
                    block={block}
                    selected={block.id === selectedId}
                    onSelect={() => onSelect(block.id)}
                    onMoveUp={index > 0 ? () => onReorder(index, index - 1) : undefined}
                    onMoveDown={index < blocks.length - 1 ? () => onReorder(index, index + 1) : undefined}
                    onDuplicate={() => onDuplicate(block.id)}
                    onRemove={() => onRemove(block.id)}
                  >
                    {renderBlock({ ...block, style: { ...block.style, hidden: false } } as Block, ctx)}
                  </CanvasBlock>
                </Fragment>
              ))}
              <InsertZone label={t("editor.insertHere")} onClick={() => onInsertAt(blocks.length)} />
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}

/** Тонкая полоса между блоками: по наведению показывает кнопку вставки. */
function InsertZone({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <div className="group/insert relative h-0">
      <div className="absolute inset-x-0 -top-3 z-10 flex h-6 items-center justify-center">
        <button
          type="button"
          onClick={onClick}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-sm leading-none text-surface opacity-0 shadow transition group-hover/insert:opacity-100 focus:opacity-100"
          title={label}
        >
          +
        </button>
      </div>
    </div>
  );
}
