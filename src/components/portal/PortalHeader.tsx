"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/blocks/context";
import { LOCALES } from "@/blocks/context";
import { PORTAL_LOCALE_LABELS } from "@/lib/portal-i18n";
import { setPortalLocaleAction } from "@/lib/actions/portal-locale";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { ThemeMode } from "@/lib/theme";

export interface PortalNavItem {
  href: string;
  label: string;
  /** Внешняя по отношению к порталу ссылка — собранный сайт или админка. */
  emphasis?: boolean;
}

/**
 * Шапка портала.
 *
 * Полупрозрачная с размытием — приём HeroUI: содержимое под шапкой видно, но
 * не мешает читать навигацию. В v3 готового Navbar нет, поэтому собран руками.
 * Рамка и тень появляются только после прокрутки: у самого верха страницы
 * линия под шапкой выглядит лишней чертой поперёк макета.
 *
 * `viewTransitionName` закрепляет шапку при переходах между страницами —
 * едет содержимое, а точка опоры остаётся на месте.
 */
export function PortalHeader({
  items,
  locale,
  menuLabel,
  theme,
  themeLabels,
}: {
  items: PortalNavItem[];
  locale: Locale;
  menuLabel: string;
  theme: ThemeMode;
  themeLabels: Record<ThemeMode, string>;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={`sticky top-0 z-40 bg-background/72 backdrop-blur-xl transition-[box-shadow,border-color] duration-300 ${
        scrolled ? "border-b border-separator shadow-surface" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="focus-visible:focus-ring rounded-2xl" aria-label="SiteGo">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item) =>
            item.emphasis ? (
              <Link
                key={item.href}
                href={item.href}
                className="button button--primary ml-2 bg-accent text-accent-foreground hover:bg-accent-hover"
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="focus-visible:focus-ring rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors duration-150 hover:bg-default hover:text-ink"
              >
                {item.label}
              </Link>
            ),
          )}
          <span className="mx-2 h-5 w-px bg-separator" />
          <LocaleSwitcher locale={locale} pathname={pathname} />
          <ThemeToggle mode={theme} labels={themeLabels} className="ml-1.5" />
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={menuLabel}
          aria-expanded={open}
          className="focus-visible:focus-ring rounded-full p-2 text-ink transition-colors hover:bg-default md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="animate-in fade-in-0 slide-in-from-top-2 border-t border-separator bg-background/95 px-5 py-4 duration-200 md:hidden">
          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={
                  item.emphasis
                    ? "mt-2 rounded-full bg-accent px-4 py-2.5 text-center text-sm font-semibold text-accent-foreground"
                    : "rounded-3xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-default hover:text-ink"
                }
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-separator pt-3">
              <LocaleSwitcher locale={locale} pathname={pathname} />
              <ThemeToggle mode={theme} labels={themeLabels} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function LocaleSwitcher({ locale, pathname }: { locale: Locale; pathname: string }) {
  return (
    <form
      action={setPortalLocaleAction}
      className="inline-flex rounded-full border border-border bg-surface p-0.5"
    >
      <input type="hidden" name="back" value={pathname} />
      {LOCALES.map((code) => (
        <button
          key={code}
          type="submit"
          name="locale"
          value={code}
          className={`focus-visible:focus-ring rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors duration-150 ${
            code === locale
              ? "bg-accent text-accent-foreground"
              : "text-muted hover:bg-default hover:text-ink"
          }`}
        >
          {PORTAL_LOCALE_LABELS[code]}
        </button>
      ))}
    </form>
  );
}
