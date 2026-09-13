import { requireAdmin } from "@/lib/auth";
import { getAdminDict, getAdminLocale } from "@/lib/admin-i18n/server";
import { AdminI18nProvider } from "@/components/admin/AdminI18nProvider";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SpotlightTracker } from "@/components/ui/SpotlightTracker";
import { getThemeMode } from "@/lib/theme-server";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, locale, dict, theme] = await Promise.all([
    requireAdmin(),
    getAdminLocale(),
    getAdminDict(),
    getThemeMode(),
  ]);

  return (
    <AdminI18nProvider locale={locale} dict={dict}>
      {/* Пятно света за курсором на карточках шаблонов в разделе «Шаблоны». */}
      <SpotlightTracker />
      {/* h-screen + overflow-hidden: прокручивается только область контента,
          сайдбар всегда на месте. С min-h-screen прокручивался весь документ,
          и на длинных экранах сайдбар уезжал вверх. */}
      <div className="flex h-screen overflow-hidden bg-paper">
        <AdminSidebar email={session.email} theme={theme} />
        <main className="min-w-0 flex-1 overflow-y-auto pt-14 lg:pt-0">{children}</main>
      </div>
    </AdminI18nProvider>
  );
}
