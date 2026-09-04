"use client";

import { useEffect, useState } from "react";
import { BlockList } from "@/blocks/registry";
import type { Block } from "@/blocks/types";
import type { Locale, MediaRef } from "@/blocks/context";
import { themeStyleVars, type ThemeKey } from "@/blocks/palette";
import { listMediaAction } from "@/lib/actions/media";

// Preview-only string lookups for the handful of block-internal UI strings
// (see RenderContext.t) — the real public site instead reads DictionaryEntry
// rows (see lib/i18n.ts, wired up once the translations screen exists).
const PREVIEW_STRINGS: Record<Locale, Record<string, string>> = {
  ru: { "pricing.recommended": "Рекомендуем" },
  uz: { "pricing.recommended": "Tavsiya etamiz" },
  en: { "pricing.recommended": "Recommended" },
};

export function LivePreview({
  blocks,
  locale,
  themeKey,
}: {
  blocks: Block[];
  locale: Locale;
  themeKey: ThemeKey;
}) {
  const [media, setMedia] = useState<Record<string, MediaRef>>({});

  useEffect(() => {
    listMediaAction().then((rows) => {
      const map: Record<string, MediaRef> = {};
      for (const m of rows) {
        map[m.id] = { url: `/uploads/${m.path}`, alt: m.filename, width: m.width, height: m.height };
      }
      setMedia(map);
    });
  }, []);

  return (
    <div className="h-full overflow-y-auto bg-paper">
      <div style={themeStyleVars(themeKey)} className="min-h-full bg-[var(--tpl-paper)]">
        {blocks.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-sm text-muted">
            Добавьте блоки, чтобы увидеть предпросмотр
          </div>
        ) : (
          <BlockList
            blocks={blocks}
            ctx={{
              locale,
              media,
              t: (key) => PREVIEW_STRINGS[locale][key] ?? key,
              pageSlug: "preview",
            }}
          />
        )}
      </div>
    </div>
  );
}
