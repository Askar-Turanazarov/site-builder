"use client";

import type { Locale } from "@/blocks/context";

const LABELS: Record<Locale, string> = { ru: "Русский", uz: "Oʻzbekcha", en: "English" };

export function LocalizedTextInput({
  label,
  values,
  onChange,
  placeholder,
  multiline,
}: {
  label: string;
  values: Record<Locale, string>;
  onChange: (locale: Locale, value: string) => void;
  placeholder?: Partial<Record<Locale, string>>;
  multiline?: boolean;
}) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-semibold text-muted">{label}</div>
      <div className="grid gap-2 sm:grid-cols-3">
        {(["ru", "uz", "en"] as Locale[]).map((locale) => (
          <div key={locale}>
            <div className="mb-1 text-[11px] text-muted">{LABELS[locale]}</div>
            {multiline ? (
              <textarea
                rows={2}
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent"
                value={values[locale]}
                placeholder={placeholder?.[locale]}
                onChange={(e) => onChange(locale, e.target.value)}
              />
            ) : (
              <input
                type="text"
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent"
                value={values[locale]}
                placeholder={placeholder?.[locale]}
                onChange={(e) => onChange(locale, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
