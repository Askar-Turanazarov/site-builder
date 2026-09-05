"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Locale } from "@/blocks/context";
import { PORTAL_LOCALE_COOKIE, isLocale } from "@/lib/portal-i18n";

const YEAR_SECONDS = 60 * 60 * 24 * 365;

/**
 * Переключение языка портала. Форма присылает выбранный язык и адрес, на
 * который надо вернуться, — так переключатель работает и без JavaScript, и
 * оставляет посетителя на той же странице.
 */
export async function setPortalLocaleAction(formData: FormData) {
  const raw = String(formData.get("locale") ?? "");
  const back = String(formData.get("back") ?? "/");
  const locale: Locale = isLocale(raw) ? raw : "ru";

  const store = await cookies();
  store.set(PORTAL_LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: YEAR_SECONDS,
    sameSite: "lax",
  });

  // Возвращаемся только на внутренние адреса: значение приходит из формы.
  redirect(back.startsWith("/") && !back.startsWith("//") ? back : "/");
}
