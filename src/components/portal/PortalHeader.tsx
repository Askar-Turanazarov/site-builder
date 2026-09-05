"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/blocks/context";
import { LOCALES } from "@/blocks/context";
import { PORTAL_LOCALE_LABELS } from "@/lib/portal-i18n";
import { setPortalLocaleAction } from "@/lib/actions/portal-locale";

export interface PortalNavItem {
  href: string;
  label: string;
  /** Внешняя по отношению к порталу ссылка — собранный сайт или админка. */
  emphasis?: boolean;
}

/**
 * Шапка портала: логотип, разделы, переключатель языка. На узких экранах
 * пункты убираются под кнопку меню — иначе шесть ссылок не помещаются.
 */
export function PortalHeader({
  items,
  locale,
  menuLabel,
}: {
  items: PortalNavItem[];
  locale: Locale;
  menuLabel: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent font-display text-sm font-bold text-surface">
            S
          </span>
          <span className="font-display text-[15px] font-semibold text-ink">Site Builder</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                item.emphasis
                  ? "rounded-md bg-accent px-3.5 py-1.5 text-sm font-medium text-surface hover:bg-accent-strong"
                  : "text-sm text-ink-soft transition hover:text-ink"
              }
            >
              {item.label}
            </Link>
          ))}
          <LocaleSwitcher locale={locale} pathname={pathname} />
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={menuLabel}
          aria-expanded={open}
          className="rounded-md p-2 text-ink hover:bg-paper md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-border px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm text-ink-soft hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <LocaleSwitcher locale={locale} pathname={pathname} />
          </div>
        </div>
      )}
    </header>
  );
}

function LocaleSwitcher({ locale, pathname }: { locale: Locale; pathname: string }) {
  return (
    <form action={setPortalLocaleAction} className="inline-flex rounded-md border border-border bg-paper p-0.5">
      <input type="hidden" name="back" value={pathname} />
      {LOCALES.map((code) => (
        <button
          key={code}
          type="submit"
          name="locale"
          value={code}
          className={`rounded px-2 py-0.5 text-[11px] font-semibold transition ${
            code === locale ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink"
          }`}
        >
          {PORTAL_LOCALE_LABELS[code]}
        </button>
      ))}
    </form>
  );
}
