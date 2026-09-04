import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site-settings";
import { LOCALES, type Locale } from "@/blocks/context";
import { isThemeKey, themeStyleVars } from "@/blocks/palette";
import { resolveMenuItems } from "@/lib/menu";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default async function PublicLocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!LOCALES.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;

  const [settings, menuItems, homepage] = await Promise.all([
    getSiteSettings(),
    prisma.menuItem.findMany({
      include: {
        page: { select: { slug: true, isHomepage: true } },
        category: { select: { slug: true } },
      },
    }),
    prisma.page.findFirst({ where: { isHomepage: true }, select: { slug: true } }),
  ]);

  const headerItems = resolveMenuItems(menuItems.filter((i) => i.location === "header"), locale);
  const footerItems = resolveMenuItems(menuItems.filter((i) => i.location === "footer"), locale);

  const siteName = locale === "ru" ? settings.siteNameRu : locale === "uz" ? settings.siteNameUz : settings.siteNameEn;
  const tagline = locale === "ru" ? settings.taglineRu : locale === "uz" ? settings.taglineUz : settings.taglineEn;
  const footerNote = locale === "ru" ? settings.footerNoteRu : locale === "uz" ? settings.footerNoteUz : settings.footerNoteEn;
  const contactAddress =
    locale === "ru" ? settings.contactAddressRu : locale === "uz" ? settings.contactAddressUz : settings.contactAddressEn;

  const logo = settings.logoMediaId
    ? await prisma.media.findUnique({ where: { id: settings.logoMediaId } })
    : null;

  const themeKey = isThemeKey(settings.themeKey) ? settings.themeKey : "business";

  return (
    <div style={themeStyleVars(themeKey)} className="flex min-h-screen flex-col bg-[var(--tpl-paper)]">
      <Header
        siteName={siteName}
        logoUrl={logo ? `/uploads/${logo.path}` : null}
        homeHref={homepage ? `/${locale}` : `/${locale}`}
        navItems={headerItems}
        locale={locale}
      />
      <main className="flex-1">{children}</main>
      <Footer
        siteName={siteName}
        tagline={tagline}
        footerNote={footerNote}
        navItems={footerItems}
        contactEmail={settings.contactEmail}
        contactPhone={settings.contactPhone}
        contactAddress={contactAddress}
      />
    </div>
  );
}
