"use client";

import { useState } from "react";
import type { BlockType } from "@/blocks/types";
import type { SiteDesign } from "@/blocks/palette";
import type { useBlockEditor } from "./useBlockEditor";
import { BlockListSidebar } from "./BlockListSidebar";
import { BlockEditForm } from "./BlockEditForm";
import { AddBlockMenu } from "./AddBlockMenu";
import { EditorCanvas } from "./EditorCanvas";
import { useAdminT } from "@/components/admin/AdminI18nProvider";

/**
 * Рабочая область редактора: структура документа слева, интерактивный холст
 * по центру (перетаскивание блоков, вставка между блоками, выбор кликом) и
 * панель полей/стилей справа. Общая для редакторов страниц и статей — они
 * различаются только верхней панелью с полями самой страницы/статьи.
 */
export function BlockEditorBody({
  editor,
  design,
}: {
  editor: ReturnType<typeof useBlockEditor>;
  design: SiteDesign;
}) {
  const t = useAdminT();
  // null — меню закрыто; число — индекс, куда вставить выбранный блок.
  const [insertIndex, setInsertIndex] = useState<number | null>(null);
  const [outlineOpen, setOutlineOpen] = useState(true);

  const blocks = editor.blocks[editor.activeLocale];
  const selectedBlock = blocks.find((b) => b.id === editor.selectedId) ?? null;

  return (
    <>
      <div
        className={`grid min-h-0 flex-1 ${
          outlineOpen ? "grid-cols-[240px_1fr_340px]" : "grid-cols-[44px_1fr_340px]"
        }`}
      >
        <div className="min-h-0 border-r border-border bg-surface">
          {outlineOpen ? (
            <BlockListSidebar
              blocks={blocks}
              selectedId={editor.selectedId}
              onSelect={editor.setSelectedId}
              onReorder={editor.reorderBlocks}
              onDuplicate={editor.duplicateBlock}
              onRemove={editor.removeBlock}
              onAddClick={() => setInsertIndex(blocks.length)}
              onCollapse={() => setOutlineOpen(false)}
            />
          ) : (
            <button
              type="button"
              onClick={() => setOutlineOpen(true)}
              title={t("editor.expand")}
              className="h-full w-full text-muted hover:bg-paper hover:text-ink"
            >
              ☰
            </button>
          )}
        </div>

        <div className="min-h-0">
          <EditorCanvas
            blocks={blocks}
            locale={editor.activeLocale}
            design={design}
            selectedId={editor.selectedId}
            onSelect={editor.setSelectedId}
            onReorder={editor.reorderBlocks}
            onDuplicate={editor.duplicateBlock}
            onRemove={editor.removeBlock}
            onInsertAt={(index) => setInsertIndex(index)}
          />
        </div>

        <div className="min-h-0 border-l border-border bg-surface">
          {selectedBlock ? (
            <BlockEditForm
              block={selectedBlock}
              activeLocale={editor.activeLocale}
              design={design}
              onLocaleChange={editor.setActiveLocale}
              onLeafChange={(path, value, localized) =>
                editor.updateBlockField(selectedBlock.id, path, value, localized)
              }
              onStyleChange={(patch) => editor.updateBlockStyle(selectedBlock.id, patch)}
              onClose={() => editor.setSelectedId(null)}
            />
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted">
              {t("editor.selectBlockHint")}
            </div>
          )}
        </div>
      </div>

      {insertIndex !== null && (
        <AddBlockMenu
          onPick={(type: BlockType) => {
            editor.addBlock(type, insertIndex);
            setInsertIndex(null);
          }}
          onClose={() => setInsertIndex(null)}
        />
      )}
    </>
  );
}
