"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { THEME_COOKIE, isThemeMode, type ThemeMode } from "@/lib/theme";

const YEAR_SECONDS = 60 * 60 * 24 * 365;

/**
 * Запоминает выбранную тему интерфейса.
 *
 * В отличие от переключателя языка здесь нет redirect: тема не меняет адрес,
 * и уводить посетителя со страницы незачем. Достаточно пересобрать разметку,
 * чтобы серверный `data-theme` совпал с тем, что уже применил клиент.
 */
export async function setThemeAction(value: string): Promise<ThemeMode> {
  const mode: ThemeMode = isThemeMode(value) ? value : "system";

  const store = await cookies();
  store.set(THEME_COOKIE, mode, {
    path: "/",
    maxAge: YEAR_SECONDS,
    sameSite: "lax",
  });

  revalidatePath("/", "layout");
  return mode;
}
