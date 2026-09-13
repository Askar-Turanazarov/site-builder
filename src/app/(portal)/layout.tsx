import { getSiteSettings } from "@/lib/site-settings";
import { getPortalLocale, getPortalT } from "@/lib/portal-i18n/server";
import { getSession } from "@/lib/auth";
import { getThemeMode } from "@/lib/theme-server";
import { PortalHeader, type PortalNavItem } from "@/components/portal/PortalHeader";
import { PortalFooter } from "@/components/portal/PortalFooter";
import { PortalBackdrop } from "@/components/portal/PortalBackdrop";
import { SpotlightTracker } from "@/components/ui/SpotlightTracker";

/**
 * Каркас портала — публичного лица конструктора. Живёт отдельно от собранного
 * сайта: у сайта своя тема и свои скины, у портала — оформление продукта.
 *
 * Своего фона у каркаса нет намеренно: за всем порталом лежит PortalBackdrop
 * (точки и пятна с параллаксом), и сплошная заливка здесь закрыла бы его.
 */
export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const [t, locale, settings, session, theme] = await Promise.all([
    getPortalT(),
    getPortalLocale(),
    getSiteSettings(),
    getSession(),
    getThemeMode(),
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
    <div className="relative flex min-h-screen flex-col">
      <PortalBackdrop />
      <SpotlightTracker />
      <PortalHeader
        items={items}
        locale={locale}
        menuLabel={t("nav.menu")}
        theme={theme}
        themeLabels={{ light: t("theme.light"), dark: t("theme.dark"), system: t("theme.system") }}
      />
      <main className="flex-1">{children}</main>
      <PortalFooter t={t} siteHref={siteHref} />
    </div>
  );
}
