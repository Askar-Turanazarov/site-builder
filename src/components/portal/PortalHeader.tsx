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
import { useSlidingIndicator } from "@/components/ui/useSlidingIndicator";
import type { ThemeMode } from "@/lib/theme";
import { PORTAL_CONTAINER } from "./container";

export interface PortalNavItem {
  href: string;
  label: string;
  /** Внешняя по отношению к порталу ссылка — собранный сайт или админка. */
  emphasis?: boolean;
}

/** `/#features` → `features`; для обычного адреса — null. */
function sectionId(href: string): string | null {
  return href.startsWith("/#") ? href.slice(2) : null;
}

/**
 * Какой пункт меню сейчас активен.
 *
 * Страница («Шаблоны») активна по адресу. Раздел на главной («Возможности»)
 * адресом не определить: главная одна, а посетитель прокручивает её. Поэтому
 * раздел активен, пока он в зоне видимости, — это решает наблюдатель ниже.
 */
function resolveActive(items: PortalNavItem[], pathname: string, section: string | null) {
  for (const item of items) {
    if (sectionId(item.href)) {
      if (pathname === "/" && section === item.href) return item.href;
      continue;
    }
    if (item.href === "/") continue;
    if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return item.href;
  }
  return null;
}

/**
 * Шапка портала.
 *
 * Полупрозрачная с размытием — приём HeroUI. Рамка и тень появляются только
 * после прокрутки. Подсветка активного пункта меню и выбранного языка
 * переезжает от прежнего пункта к новому (useSlidingIndicator) — как у
 * вкладок HeroUI.
 *
 * Отметка клика. Подсветка едет в момент нажатия, не дожидаясь загрузки
 * страницы или конца прокрутки. Отметка помнит, от какого состояния сделана:
 * как только настоящее состояние сменится, в силу снова вступает оно — без
 * эффектов и без рассинхронизации при переходе кнопкой «назад».
 *
 * `viewTransitionName` закрепляет шапку при переходах между страницами.
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
  const [section, setSection] = useState<string | null>(null);
  const [pendingNav, setPendingNav] = useState<{ from: string | null; to: string } | null>(null);

  const navItems = items.filter((item) => !item.emphasis);
  const cta = items.find((item) => item.emphasis);
  const resolved = resolveActive(navItems, pathname, section);
  const active = pendingNav && pendingNav.from === resolved ? pendingNav.to : resolved;
  const {
    containerRef: navContainerRef,
    indicatorRef: navIndicatorRef,
    itemRef: navItemRef,
  } = useSlidingIndicator(active);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Наблюдение за разделами главной. Полоса срабатывания — середина экрана:
  // раздел считается текущим, когда он действительно перед глазами, а не когда
  // из-под нижнего края выглянул его заголовок.
  useEffect(() => {
    if (pathname !== "/") return;
    const targets = items
      .map((item) => sectionId(item.href))
      .filter((id): id is string => Boolean(id))
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const href = `/#${entry.target.id}`;
          setSection((prev) => (entry.isIntersecting ? href : prev === href ? null : prev));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname, items]);

  /**
   * Клик по пункту меню: подсветка сразу едет к нему. Для раздела на той же
   * странице — плавная прокрутка с поправкой на липкую шапку (её даёт
   * `scroll-margin-top` у раздела).
   */
  const onNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    setPendingNav({ from: resolved, to: href });
    const id = sectionId(href);
    if (!id || pathname !== "/") return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", href);
    setSection(href);
  };

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={`sticky top-0 z-40 bg-background/72 backdrop-blur-xl transition-[box-shadow,border-color] duration-300 ${
        scrolled ? "border-b border-separator shadow-surface" : "border-b border-transparent"
      }`}
    >
      <div className={`${PORTAL_CONTAINER} flex items-center justify-between gap-4 py-3`}>
        <Link href="/" className="focus-visible:focus-ring rounded-2xl" aria-label="SiteGo">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          <div ref={navContainerRef} className="relative flex items-center">
            <span
              ref={navIndicatorRef}
              aria-hidden="true"
              className="sg-indicator pointer-events-none absolute top-0 left-0 rounded-full bg-accent-soft opacity-0"
            />
            {navItems.map((item) => {
              const isCurrent = item.href === resolved;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={navItemRef(item.href)}
                  onClick={(event) => onNavClick(event, item.href)}
                  aria-current={isCurrent ? (sectionId(item.href) ? "location" : "page") : undefined}
                  className={`focus-visible:focus-ring relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    item.href === active ? "text-accent" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {cta && (
            <Link
              href={cta.href}
              className="button button--primary ml-1 bg-accent text-accent-foreground hover:bg-accent-hover"
            >
              {cta.label}
            </Link>
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
          className="focus-visible:focus-ring rounded-full p-2 text-ink transition-colors hover:bg-default lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="animate-in fade-in-0 slide-in-from-top-2 border-t border-separator bg-background/95 py-4 duration-200 lg:hidden">
          <div className={`${PORTAL_CONTAINER} flex flex-col gap-1`}>
            {navItems.map((item) => {
              const isActive = item.href === active;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => onNavClick(event, item.href)}
                  aria-current={
                    item.href === resolved ? (sectionId(item.href) ? "location" : "page") : undefined
                  }
                  className={`flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "bg-accent-soft text-accent" : "text-ink-soft hover:bg-default hover:text-ink"
                  }`}
                >
                  {item.label}
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                </Link>
              );
            })}
            {cta && (
              <Link
                href={cta.href}
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-accent px-4 py-2.5 text-center text-sm font-semibold text-accent-foreground"
              >
                {cta.label}
              </Link>
            )}
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

/**
 * Переключатель языка портала. Форма работает и без JavaScript; с ним
 * подсветка переезжает к нажатому языку ещё до ответа сервера.
 */
function LocaleSwitcher({ locale, pathname }: { locale: Locale; pathname: string }) {
  const [pending, setPending] = useState<{ from: Locale; to: Locale } | null>(null);
  const current = pending && pending.from === locale ? pending.to : locale;
  const { containerRef, indicatorRef, itemRef } = useSlidingIndicator<HTMLFormElement>(current);

  return (
    <form
      ref={containerRef}
      action={setPortalLocaleAction}
      className="relative inline-flex rounded-full border border-border bg-surface p-0.5"
    >
      <input type="hidden" name="back" value={pathname} />
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className="sg-indicator pointer-events-none absolute top-0 left-0 rounded-full bg-accent opacity-0"
      />
      {LOCALES.map((code) => (
        <button
          key={code}
          ref={itemRef(code)}
          type="submit"
          name="locale"
          value={code}
          onClick={() => setPending({ from: locale, to: code })}
          aria-pressed={code === locale}
          className={`focus-visible:focus-ring relative z-10 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors duration-200 ${
            code === current ? "text-accent-foreground" : "text-muted hover:text-ink"
          }`}
        >
          {PORTAL_LOCALE_LABELS[code]}
        </button>
      ))}
    </form>
  );
}
