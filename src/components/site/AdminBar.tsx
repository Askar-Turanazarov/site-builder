import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getPortalT } from "@/lib/portal-i18n/server";

/**
 * Полоса администратора над собранным сайтом.
 *
 * Пока администратор ходит по своему сайту, ему негде свернуть обратно в
 * панель — приходится набирать адрес руками. Полоса решает именно это и
 * видна только тому, кто вошёл; посетитель её не получает. В статический
 * экспорт она тоже не попадает: там разметку собирает свой шелл
 * (src/lib/export/shell.ts), а не этот компонент.
 */
export async function AdminBar() {
  const session = await getSession();
  if (!session) return null;

  const t = await getPortalT();

  return (
    <div className="border-b border-border bg-ink text-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-2 text-xs">
        <span className="font-medium text-surface/70">{t("adminbar.badge")}</span>
        <Link href="/admin" className="text-surface hover:text-accent-tint">
          {t("adminbar.dashboard")}
        </Link>
        <Link href="/admin/pages" className="text-surface hover:text-accent-tint">
          {t("adminbar.editPage")}
        </Link>
        <Link href="/admin/templates" className="text-surface hover:text-accent-tint">
          {t("adminbar.templates")}
        </Link>
        <Link href="/" className="ml-auto text-surface hover:text-accent-tint">
          {t("adminbar.portal")} →
        </Link>
      </div>
    </div>
  );
}
