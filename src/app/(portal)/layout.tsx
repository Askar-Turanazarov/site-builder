import { getSiteSettings } from "@/lib/site-settings";
import { getPortalLocale, getPortalT } from "@/lib/portal-i18n/server";
import { getSession } from "@/lib/auth";
import { PortalHeader, type PortalNavItem } from "@/components/portal/PortalHeader";
import { PortalFooter } from "@/components/portal/PortalFooter";

/**
 * Каркас портала — публичного лица конструктора. Живёт отдельно от собранного
 * сайта: у сайта своя тема и свои скины, у портала — оформление продукта.
 */
export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const [t, locale, settings, session] = await Promise.all([
    getPortalT(),
    getPortalLocale(),
    getSiteSettings(),
    getSession(),
  ]);

  const siteHref = `/${settings.defaultLocale}`;
  const items: PortalNavItem[] = [
    { href: "/templates", label: t("nav.templates") },
    { href: "/#features", label: t("nav.features") },
    { href: siteHref, label: t("nav.mysite") },
    session
      ? { href: "/admin", label: t("nav.admin"), emphasis: true }
      : { href: "/admin/login", label: t("nav.login"), emphasis: true },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <PortalHeader items={items} locale={locale} menuLabel={t("nav.menu")} />
      <main className="flex-1">{children}</main>
      <PortalFooter t={t} siteHref={siteHref} />
    </div>
  );
}
