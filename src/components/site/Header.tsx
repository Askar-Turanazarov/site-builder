"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/blocks/context";
import type { ResolvedMenuItem } from "@/lib/menu";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header({
  siteName,
  logoUrl,
  homeHref,
  navItems,
  locale,
}: {
  siteName: string;
  logoUrl: string | null;
  homeHref: string;
  navItems: ResolvedMenuItem[];
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-[var(--tpl-ink)]/10 bg-[var(--tpl-surface)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={homeHref} className="flex items-center gap-2.5">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={siteName} className="h-8 w-auto" />
          ) : (
            <span className="[font-family:var(--tpl-font-display)] text-lg font-bold text-[var(--tpl-ink)]">
              {siteName}
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm font-medium text-[var(--tpl-ink-soft)] transition hover:text-[var(--tpl-ink)]"
            >
              {item.label}
            </Link>
          ))}
          <LocaleSwitcher current={locale} />
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-[var(--tpl-ink)] md:hidden"
          aria-label="Menu"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.7}>
            {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-[var(--tpl-ink)]/10 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-[var(--tpl-ink-soft)]"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <LocaleSwitcher current={locale} />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
