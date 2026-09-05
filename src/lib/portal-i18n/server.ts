import { cookies } from "next/headers";
import type { Locale } from "@/blocks/context";
import {
  PORTAL_DICTS,
  PORTAL_LOCALE_COOKIE,
  isLocale,
  portalT,
  type PortalDict,
  type PortalT,
} from "./index";

/**
 * Серверная половина словаря портала. Язык хранится в куке, а не в адресе:
 * первый сегмент пути уже занят языком собранного сайта (`/ru`, `/uz`, `/en`),
 * и второй набор языковых префиксов сделал бы адреса неоднозначными.
 */

export async function getPortalLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(PORTAL_LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : "ru";
}

export async function getPortalDict(): Promise<PortalDict> {
  return PORTAL_DICTS[await getPortalLocale()];
}

export async function getPortalT(): Promise<PortalT> {
  return portalT(await getPortalDict());
}
