import type { Locale } from "@/blocks/context";

const LABELS: Record<Locale, string> = { ru: "RU", uz: "UZ", en: "EN" };

export function LocaleTabs({
  value,
  onChange,
}: {
  value: Locale;
  onChange: (locale: Locale) => void;
}) {
  return (
    <div className="inline-flex rounded-md border border-border bg-paper p-0.5">
      {(Object.keys(LABELS) as Locale[]).map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => onChange(locale)}
          className={`rounded px-3 py-1 text-xs font-semibold transition ${
            value === locale ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink"
          }`}
        >
          {LABELS[locale]}
        </button>
      ))}
    </div>
  );
}
