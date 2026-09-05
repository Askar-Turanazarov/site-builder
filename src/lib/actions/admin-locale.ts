"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_LOCALE_COOKIE, isAdminLocale } from "@/lib/admin-i18n";

/** Переключает язык интерфейса админки (кука на год). */
export async function setAdminLocaleAction(locale: string) {
  if (!isAdminLocale(locale)) return;

  const store = await cookies();
  store.set(ADMIN_LOCALE_COOKIE, locale, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  revalidatePath("/admin", "layout");
}
