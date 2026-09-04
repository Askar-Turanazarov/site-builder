"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LOCALES, type Locale } from "@/blocks/context";

const LABELS: Record<Locale, string> = { ru: "RU", uz: "UZ", en: "EN" };

export function LocaleSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();

  function pathForLocale(locale: Locale): string {
    const segments = pathname.split("/");
    segments[1] = locale; // ["", locale, ...rest]
    return segments.join("/") || `/${locale}`;
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {LOCALES.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          {i > 0 && <span className="text-[var(--tpl-ink)]/20">/</span>}
          <Link
            href={pathForLocale(locale)}
            className={
              locale === current
                ? "font-semibold text-[var(--tpl-ink)]"
                : "text-[var(--tpl-ink-soft)] hover:text-[var(--tpl-ink)]"
            }
          >
            {LABELS[locale]}
          </Link>
        </span>
      ))}
    </div>
  );
}
