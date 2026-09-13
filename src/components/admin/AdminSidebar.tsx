"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { logoutAction } from "@/lib/actions/session";
import { setAdminLocaleAction } from "@/lib/actions/admin-locale";
import { ADMIN_LOCALES, type AdminDict, type AdminLocale } from "@/lib/admin-i18n";
import { useAdminI18n } from "./AdminI18nProvider";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useSlidingIndicator } from "@/components/ui/useSlidingIndicator";
import type { ThemeMode } from "@/lib/theme";
import {
  IconDashboard,
  IconPages,
  IconPosts,
  IconCategories,
  IconMedia,
  IconMenu,
  IconDictionary,
  IconMessages,
  IconSettings,
  IconDesign,
  IconTemplates,
  IconExport,
  IconLogout,
} from "./icons";

const NAV_ITEMS: { href: string; labelKey: keyof AdminDict; icon: typeof IconDashboard; exact?: boolean }[] = [
  { href: "/admin", labelKey: "nav.dashboard", icon: IconDashboard, exact: true },
  { href: "/admin/pages", labelKey: "nav.pages", icon: IconPages },
  { href: "/admin/posts", labelKey: "nav.posts", icon: IconPosts },
  { href: "/admin/categories", labelKey: "nav.categories", icon: IconCategories },
  { href: "/admin/media", labelKey: "nav.media", icon: IconMedia },
  { href: "/admin/menu", labelKey: "nav.menu", icon: IconMenu },
  { href: "/admin/dictionary", labelKey: "nav.dictionary", icon: IconDictionary },
  { href: "/admin/messages", labelKey: "nav.messages", icon: IconMessages },
  { href: "/admin/templates", labelKey: "nav.templates", icon: IconTemplates },
  { href: "/admin/design", labelKey: "nav.design", icon: IconDesign },
  { href: "/admin/settings", labelKey: "nav.settings", icon: IconSettings },
  { href: "/admin/export", labelKey: "nav.export", icon: IconExport },
];

const LOCALE_SHORT: Record<AdminLocale, string> = {
  ru: "RU",
  uz: "UZ",
  en: "EN",
};

/**
 * Сайдбар админки.
 *
 * Подсветка активного пункта меню и выбранного языка переезжает к новому
 * пункту (useSlidingIndicator) — в меню вертикально, в языках горизонтально.
 * Обе едут в момент клика: отметка клика помнит, от какого состояния сделана,
 * и уступает настоящему, как только загрузится новая страница или придёт
 * новый язык.
 */
export function AdminSidebar({ email, theme }: { email: string; theme: ThemeMode }) {
  const pathname = usePathname();
  const { t, locale } = useAdminI18n();
  const [, startTransition] = useTransition();
  // На узких экранах сайдбар выезжает поверх содержимого: постоянные 240px
  // не оставляли места ни спискам, ни редактору.
  const [open, setOpen] = useState(false);

  const resolvedHref =
    NAV_ITEMS.find((item) => (item.exact ? pathname === item.href : pathname.startsWith(item.href)))?.href ??
    null;
  const [pendingNav, setPendingNav] = useState<{ from: string | null; to: string } | null>(null);
  const activeHref = pendingNav && pendingNav.from === resolvedHref ? pendingNav.to : resolvedHref;
  const {
    containerRef: navContainerRef,
    indicatorRef: navIndicatorRef,
    itemRef: navItemRef,
  } = useSlidingIndicator<HTMLElement>(activeHref);

  const [pendingLocale, setPendingLocale] = useState<{ from: AdminLocale; to: AdminLocale } | null>(null);
  const currentLocale = pendingLocale && pendingLocale.from === locale ? pendingLocale.to : locale;
  const {
    containerRef: langContainerRef,
    indicatorRef: langIndicatorRef,
    itemRef: langItemRef,
  } = useSlidingIndicator(currentLocale);

  return (
    <>
      {/* Верхняя полоса с кнопкой меню — только на узких экранах */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-surface px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t("nav.dashboard")}
          className="rounded-xl p-2 text-ink hover:bg-default"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        </button>
        <Logo />
      </div>

      {open && (
        <button
          type="button"
          aria-label={t("common.close")}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-60 shrink-0 flex-col overflow-y-auto border-r border-border bg-surface transition-transform lg:static lg:z-auto lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2.5 px-5 py-5">
          <Logo />
        </div>

        <nav ref={navContainerRef} className="relative flex-1 space-y-0.5 px-3">
          <span
            ref={navIndicatorRef}
            aria-hidden="true"
            className="sg-indicator pointer-events-none absolute top-0 left-0 rounded-xl bg-accent-tint opacity-0"
          />
          {NAV_ITEMS.map((item) => {
            const active = item.href === activeHref;
            const ItemIcon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                ref={navItemRef(item.href)}
                onClick={() => {
                  setOpen(false);
                  setPendingNav({ from: resolvedHref, to: item.href });
                }}
                aria-current={item.href === resolvedHref ? "page" : undefined}
                className={`relative z-10 flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors duration-200 ${
                  active ? "font-medium text-accent-strong" : "text-ink-soft hover:bg-default hover:text-ink"
                }`}
              >
                <ItemIcon className="h-[18px] w-[18px] shrink-0" />
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border px-3 py-3">
          <div className="mb-3 px-3">
            <div className="mb-1.5 text-[11px] text-muted">{t("common.theme")}</div>
            <ThemeToggle
              mode={theme}
              labels={{ light: t("theme.light"), dark: t("theme.dark"), system: t("theme.system") }}
            />
          </div>

          <div className="mb-2 px-3">
            <div className="mb-1.5 text-[11px] text-muted">{t("common.language")}</div>
            <div
              ref={langContainerRef}
              className="relative inline-flex rounded-xl border border-border bg-paper p-0.5"
            >
              <span
                ref={langIndicatorRef}
                aria-hidden="true"
                className="sg-indicator pointer-events-none absolute top-0 left-0 rounded-[10px] bg-surface opacity-0 shadow-surface"
              />
              {ADMIN_LOCALES.map((code) => (
                <button
                  key={code}
                  ref={langItemRef(code)}
                  type="button"
                  aria-pressed={code === locale}
                  onClick={() => {
                    setPendingLocale({ from: locale, to: code });
                    startTransition(() => void setAdminLocaleAction(code));
                  }}
                  className={`relative z-10 rounded-[10px] px-2 py-0.5 text-[11px] font-semibold transition-colors duration-200 ${
                    code === currentLocale ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {LOCALE_SHORT[code]}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-2 truncate px-3 text-xs text-muted">{email}</div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-ink-soft transition hover:bg-default hover:text-ink"
            >
              <IconLogout className="h-[18px] w-[18px] shrink-0" />
              {t("nav.logout")}
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
