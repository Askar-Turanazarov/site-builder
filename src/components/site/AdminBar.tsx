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
    <div className="border-b border-separator bg-background-inverse text-background">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-2 text-xs">
        <span className="font-medium text-background/70">{t("adminbar.badge")}</span>
        <Link href="/admin" className="focus-visible:focus-ring rounded text-background/90 transition-colors hover:text-background">
          {t("adminbar.dashboard")}
        </Link>
        <Link href="/admin/pages" className="focus-visible:focus-ring rounded text-background/90 transition-colors hover:text-background">
          {t("adminbar.editPage")}
        </Link>
        <Link href="/admin/templates" className="focus-visible:focus-ring rounded text-background/90 transition-colors hover:text-background">
          {t("adminbar.templates")}
        </Link>
        <Link href="/" className="focus-visible:focus-ring ml-auto rounded text-background/90 transition-colors hover:text-background">
          {t("adminbar.portal")} →
        </Link>
      </div>
    </div>
  );
}
