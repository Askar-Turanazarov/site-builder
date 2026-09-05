import { cookies } from "next/headers";
import {
  ADMIN_DICTS,
  ADMIN_LOCALE_COOKIE,
  adminT,
  isAdminLocale,
  type AdminDict,
  type AdminLocale,
  type AdminT,
} from "./index";

/**
 * Серверная половина i18n админки. Вынесена из ./index.ts, потому что
 * `next/headers` недоступен в клиентских компонентах, а словари и `adminT`
 * нужны и там (AdminI18nProvider, AdminSidebar).
 */

/** Язык интерфейса админки из куки (в Next 16 `cookies()` асинхронный). */
export async function getAdminLocale(): Promise<AdminLocale> {
  const store = await cookies();
  const value = store.get(ADMIN_LOCALE_COOKIE)?.value;
  return isAdminLocale(value) ? value : "ru";
}

export async function getAdminDict(): Promise<AdminDict> {
  return ADMIN_DICTS[await getAdminLocale()];
}

/** Готовая функция перевода для серверных компонентов. */
export async function getAdminT(): Promise<AdminT> {
  return adminT(await getAdminDict());
}
