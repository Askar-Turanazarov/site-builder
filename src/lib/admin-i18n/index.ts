/**
 * Общая часть словарей админки. Модуль импортируют и серверные
 * компоненты, и клиентские, поэтому здесь не должно быть `next/headers` —
 * чтение куки живёт в ./server.ts.
 */
import { ru, type AdminDict } from "./ru";
import { uz } from "./uz";
import { en } from "./en";

export const ADMIN_LOCALES = ["ru", "uz", "en"] as const;
export type AdminLocale = (typeof ADMIN_LOCALES)[number];

export const ADMIN_LOCALE_COOKIE = "sb_admin_locale";

export const ADMIN_DICTS: Record<AdminLocale, AdminDict> = { ru, uz, en };

export const ADMIN_LOCALE_LABELS: Record<AdminLocale, string> = {
  ru: "Русский",
  uz: "Oʻzbekcha",
  en: "English",
};

export function isAdminLocale(value: string | undefined): value is AdminLocale {
  return !!value && (ADMIN_LOCALES as readonly string[]).includes(value);
}

export type AdminT = (key: keyof AdminDict) => string;

/** Функция перевода по готовому словарю. */
export function adminT(dict: AdminDict): AdminT {
  return (key) => dict[key] ?? String(key);
}

export type { AdminDict };
