import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site-settings";
import { getPortalT } from "@/lib/portal-i18n/server";
import type { Locale } from "@/blocks/context";
import { googleFontsHref, themeStyleVars } from "@/blocks/palette";
import { siteDesignFromSettings } from "@/lib/site-design";
import { localeField } from "@/lib/locale-field";
import { resolveMenuItems } from "@/lib/menu";
import { AdminBar } from "./AdminBar";
import { Header } from "./Header";
import { Footer } from "./Footer";

/**
 * Каркас публичного сайта: тема, шапка, подвал. Используется и обычными
 * страницами сайта, и админским предпросмотром, чтобы предпросмотр показывал
 * ровно то же окружение, что увидит посетитель.
 */
export async function SiteFrame({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const [t, settings, menuItems] = await Promise.all([
    getPortalT(),
    getSiteSettings(),
    prisma.menuItem.findMany({
      include: {
        page: { select: { slug: true, isHomepage: true } },
        category: { select: { slug: true } },
      },
    }),
  ]);

  const logo = settings.logoMediaId
    ? await prisma.media.findUnique({ where: { id: settings.logoMediaId } })
    : null;

  const design = siteDesignFromSettings(settings);
  // Шрифты, выбранные администратором, подключаются рантаймом: next/font
  // умеет только собирать шрифты на этапе сборки. React 19 сам переносит
  // такой <link> в <head>.
  const fontsHref = googleFontsHref(design);

  return (
    <div
      style={themeStyleVars(design)}
      data-skin={design.skinKey || undefined}
      className="flex min-h-screen flex-col bg-[var(--tpl-paper)]"
    >
      {fontsHref && <link rel="stylesheet" href={fontsHref} />}
      <AdminBar />
      <Header
        siteName={localeField(settings, "siteName", locale)}
        logoUrl={logo ? `/uploads/${logo.path}` : null}
        homeHref={`/${locale}`}
        navItems={resolveMenuItems(menuItems.filter((i) => i.location === "header"), locale)}
        locale={locale}
      />
      <main className="flex-1">{children}</main>
      <Footer
        siteName={localeField(settings, "siteName", locale)}
        tagline={localeField(settings, "tagline", locale) || null}
        footerNote={localeField(settings, "footerNote", locale) || null}
        navItems={resolveMenuItems(menuItems.filter((i) => i.location === "footer"), locale)}
        contactEmail={settings.contactEmail}
        contactPhone={settings.contactPhone}
        contactAddress={localeField(settings, "contactAddress", locale) || null}
        builderLabel={t("footer.made")}
      />
    </div>
  );
}
