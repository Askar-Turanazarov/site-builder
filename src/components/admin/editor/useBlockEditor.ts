"use client";

import { useCallback, useState } from "react";
import { nanoid } from "nanoid";
import { BLOCK_DATA_SCHEMAS, type Block, type BlockType } from "@/blocks/types";
import type { Locale } from "@/blocks/context";
import { setAtPath, type PathSegment } from "./object-path";

export interface LocaleBlocks {
  ru: Block[];
  uz: Block[];
  en: Block[];
}

const LOCALES: Locale[] = ["ru", "uz", "en"];

export function useBlockEditor(initial: LocaleBlocks) {
  const [blocks, setBlocks] = useState<LocaleBlocks>(initial);
  const [activeLocale, setActiveLocale] = useState<Locale>("ru");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addBlock = useCallback((type: BlockType, atIndex?: number) => {
    const id = nanoid(8);
    setBlocks((prev) => {
      const next: LocaleBlocks = { ru: [...prev.ru], uz: [...prev.uz], en: [...prev.en] };
      for (const loc of LOCALES) {
        const defaultData = BLOCK_DATA_SCHEMAS[type].parse({});
        const newBlock = { id, type, data: defaultData } as Block;
        const idx = atIndex ?? next[loc].length;
        next[loc].splice(idx, 0, newBlock);
      }
      return next;
    });
    setSelectedId(id);
  }, []);

  const removeBlock = useCallback((id: string) => {
    setBlocks((prev) => ({
      ru: prev.ru.filter((b) => b.id !== id),
      uz: prev.uz.filter((b) => b.id !== id),
      en: prev.en.filter((b) => b.id !== id),
    }));
    setSelectedId((sel) => (sel === id ? null : sel));
  }, []);

  const duplicateBlock = useCallback((id: string) => {
    const newId = nanoid(8);
    setBlocks((prev) => {
      const next: LocaleBlocks = { ru: [...prev.ru], uz: [...prev.uz], en: [...prev.en] };
      for (const loc of LOCALES) {
        const idx = next[loc].findIndex((b) => b.id === id);
        if (idx === -1) continue;
        const clone = { ...next[loc][idx], id: newId, data: JSON.parse(JSON.stringify(next[loc][idx].data)) };
        next[loc] = [...next[loc]];
        next[loc].splice(idx + 1, 0, clone);
      }
      return next;
    });
    setSelectedId(newId);
  }, []);

  const reorderBlocks = useCallback((fromIndex: number, toIndex: number) => {
    setBlocks((prev) => {
      const next: LocaleBlocks = { ru: [...prev.ru], uz: [...prev.uz], en: [...prev.en] };
      for (const loc of LOCALES) {
        const arr = [...next[loc]];
        const [moved] = arr.splice(fromIndex, 1);
        if (moved) arr.splice(toIndex, 0, moved);
        next[loc] = arr;
      }
      return next;
    });
  }, []);

  /** Applies a leaf field edit. `localized: true` writes only the active locale's tree; `false` mirrors the write to all three. */
  const updateBlockField = useCallback(
    (blockId: string, path: PathSegment[], value: unknown, localized: boolean) => {
      setBlocks((prev) => {
        const next: LocaleBlocks = { ...prev };
        const targets = localized ? [activeLocale] : LOCALES;
        for (const loc of targets) {
          next[loc] = prev[loc].map((b) =>
            b.id === blockId ? { ...b, data: setAtPath(b.data, path, value) } : b,
          );
        }
        return next;
      });
    },
    [activeLocale],
  );

  return {
    blocks,
    activeLocale,
    setActiveLocale,
    selectedId,
    setSelectedId,
    addBlock,
    removeBlock,
    duplicateBlock,
    reorderBlocks,
    updateBlockField,
  };
}
