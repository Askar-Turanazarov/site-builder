"use client";

import type { BlockType } from "@/blocks/types";
import type { ThemeKey } from "@/blocks/palette";
import type { useBlockEditor } from "./useBlockEditor";
import { BlockListSidebar } from "./BlockListSidebar";
import { BlockEditForm } from "./BlockEditForm";
import { AddBlockMenu } from "./AddBlockMenu";
import { LivePreview } from "./LivePreview";

/**
 * The 3-column block-editing surface (block list / live preview / field
 * form) plus the "add block" modal — shared by PageEditor and PostEditor,
 * which differ only in their top bar (title/slug/category/etc. fields).
 */
export function BlockEditorBody({
  editor,
  themeKey,
  showAddMenu,
  onCloseAddMenu,
  onOpenAddMenu,
}: {
  editor: ReturnType<typeof useBlockEditor>;
  themeKey: ThemeKey;
  showAddMenu: boolean;
  onOpenAddMenu: () => void;
  onCloseAddMenu: () => void;
}) {
  const selectedBlock = editor.blocks[editor.activeLocale].find((b) => b.id === editor.selectedId) ?? null;

  return (
    <>
      <div className="grid min-h-0 flex-1 grid-cols-[260px_1fr_360px]">
        <div className="min-h-0 border-r border-border bg-surface">
          <BlockListSidebar
            blocks={editor.blocks[editor.activeLocale]}
            selectedId={editor.selectedId}
            onSelect={editor.setSelectedId}
            onReorder={editor.reorderBlocks}
            onDuplicate={editor.duplicateBlock}
            onRemove={editor.removeBlock}
            onAddClick={onOpenAddMenu}
          />
        </div>
        <div className="min-h-0">
          <LivePreview blocks={editor.blocks[editor.activeLocale]} locale={editor.activeLocale} themeKey={themeKey} />
        </div>
        <div className="min-h-0 border-l border-border bg-surface">
          {selectedBlock ? (
            <BlockEditForm
              block={selectedBlock}
              activeLocale={editor.activeLocale}
              onLocaleChange={editor.setActiveLocale}
              onLeafChange={(path, value, localized) =>
                editor.updateBlockField(selectedBlock.id, path, value, localized)
              }
              onClose={() => editor.setSelectedId(null)}
            />
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted">
              Выберите блок слева, чтобы отредактировать его содержимое
            </div>
          )}
        </div>
      </div>

      {showAddMenu && (
        <AddBlockMenu
          onPick={(type: BlockType) => {
            editor.addBlock(type);
            onCloseAddMenu();
          }}
          onClose={onCloseAddMenu}
        />
      )}
    </>
  );
}
