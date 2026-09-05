"use client";

import { createContext, useContext, useMemo } from "react";
import { adminT, type AdminDict, type AdminLocale, type AdminT } from "@/lib/admin-i18n";

interface AdminI18nValue {
  locale: AdminLocale;
  t: AdminT;
}

const AdminI18nContext = createContext<AdminI18nValue | null>(null);

/**
 * Провайдер переводов интерфейса для клиентских компонентов админки.
 * Словарь приходит пропом из серверного layout — на клиент уезжает только
 * активный язык, а не все три.
 */
export function AdminI18nProvider({
  locale,
  dict,
  children,
}: {
  locale: AdminLocale;
  dict: AdminDict;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ locale, t: adminT(dict) }), [locale, dict]);
  return <AdminI18nContext.Provider value={value}>{children}</AdminI18nContext.Provider>;
}

export function useAdminI18n(): AdminI18nValue {
  const value = useContext(AdminI18nContext);
  if (!value) {
    throw new Error("useAdminI18n должен вызываться внутри AdminI18nProvider");
  }
  return value;
}

export function useAdminT(): AdminT {
  return useAdminI18n().t;
}
