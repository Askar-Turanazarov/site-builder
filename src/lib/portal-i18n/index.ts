import { LOCALES, type Locale } from "@/blocks/context";
import { ru, type PortalDict } from "./ru";
import { uz } from "./uz";
import { en } from "./en";

/**
 * Общая часть словаря портала. Модуль подключают и серверные компоненты, и
 * клиентские (шапка с мобильным меню), поэтому здесь нет `next/headers` —
 * чтение куки живёт в ./server.ts.
 */

export const PORTAL_LOCALE_COOKIE = "sb_portal_locale";

export const PORTAL_DICTS: Record<Locale, PortalDict> = { ru, uz, en };

export const PORTAL_LOCALE_LABELS: Record<Locale, string> = {
  ru: "RU",
  uz: "UZ",
  en: "EN",
};

export type PortalT = (key: keyof PortalDict) => string;

export function portalT(dict: PortalDict): PortalT {
  return (key) => dict[key] ?? String(key);
}

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export type { PortalDict };
