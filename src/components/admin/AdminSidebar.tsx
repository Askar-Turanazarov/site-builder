"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/actions/session";
import {
  IconDashboard,
  IconPages,
  IconPosts,
  IconCategories,
  IconMedia,
  IconMenu,
  IconDictionary,
  IconSettings,
  IconExport,
  IconLogout,
} from "./icons";

const NAV_ITEMS = [
  { href: "/admin", label: "Дашборд", icon: IconDashboard, exact: true },
  { href: "/admin/pages", label: "Страницы", icon: IconPages },
  { href: "/admin/posts", label: "Новости", icon: IconPosts },
  { href: "/admin/categories", label: "Рубрики", icon: IconCategories },
  { href: "/admin/media", label: "Медиа", icon: IconMedia },
  { href: "/admin/menu", label: "Меню сайта", icon: IconMenu },
  { href: "/admin/dictionary", label: "Словарь", icon: IconDictionary },
  { href: "/admin/settings", label: "Настройки", icon: IconSettings },
  { href: "/admin/export", label: "Экспорт", icon: IconExport },
];

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent font-display text-sm font-bold text-surface">
          S
        </div>
        <span className="font-display text-[15px] font-semibold text-ink">Site Builder</span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3">
        {NAV_ITEMS.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const ItemIcon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition ${
                active
                  ? "bg-accent-tint font-medium text-accent-strong"
                  : "text-ink-soft hover:bg-paper hover:text-ink"
              }`}
            >
              <ItemIcon className="h-[18px] w-[18px] shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-3 py-3">
        <div className="mb-2 truncate px-3 text-xs text-muted">{email}</div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-ink-soft transition hover:bg-paper hover:text-ink"
          >
            <IconLogout className="h-[18px] w-[18px] shrink-0" />
            Выйти
          </button>
        </form>
      </div>
    </aside>
  );
}
