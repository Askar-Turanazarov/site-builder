"use client";

import type { Locale } from "@/blocks/context";
import { useSlidingIndicator } from "@/components/ui/useSlidingIndicator";

const LABELS: Record<Locale, string> = { ru: "RU", uz: "UZ", en: "EN" };

/**
 * Вкладки языка контента в редакторе. Подложка выбранной вкладки переезжает
 * к нажатой — как у вкладок HeroUI.
 */
export function LocaleTabs({
  value,
  onChange,
}: {
  value: Locale;
  onChange: (locale: Locale) => void;
}) {
  const { containerRef, indicatorRef, itemRef } = useSlidingIndicator(value);

  return (
    <div ref={containerRef} className="relative inline-flex rounded-xl border border-border bg-paper p-0.5">
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className="sg-indicator pointer-events-none absolute top-0 left-0 rounded-[10px] bg-surface opacity-0 shadow-surface"
      />
      {(Object.keys(LABELS) as Locale[]).map((locale) => (
        <button
          key={locale}
          ref={itemRef(locale)}
          type="button"
          onClick={() => onChange(locale)}
          aria-pressed={value === locale}
          className={`relative z-10 rounded-[10px] px-3 py-1 text-xs font-semibold transition-colors duration-200 ${
            value === locale ? "text-ink" : "text-muted hover:text-ink"
          }`}
        >
          {LABELS[locale]}
        </button>
      ))}
    </div>
  );
}
