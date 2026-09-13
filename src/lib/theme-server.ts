import { cookies } from "next/headers";
import { DEFAULT_THEME, THEME_COOKIE, isThemeMode, type ThemeMode } from "./theme";

/** Читает выбранную тему из cookie. Отдельный файл: next/headers — только для сервера. */
export async function getThemeMode(): Promise<ThemeMode> {
  const store = await cookies();
  const raw = store.get(THEME_COOKIE)?.value;
  return isThemeMode(raw) ? raw : DEFAULT_THEME;
}
