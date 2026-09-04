import type { Locale } from "@/blocks/context";

const SUFFIX: Record<Locale, string> = { ru: "Ru", uz: "Uz", en: "En" };

/**
 * Picks `${prefix}Ru` / `${prefix}Uz` / `${prefix}En` off a Prisma row for
 * the given locale — e.g. `localeField(page, "title", "uz")` reads
 * `page.titleUz`. Centralizes the flat-per-locale-column convention used
 * throughout Page/Post/Category so call sites don't repeat the ternary.
 */
export function localeField(obj: Record<string, unknown>, prefix: string, locale: Locale): string {
  const value = obj[`${prefix}${SUFFIX[locale]}`];
  return typeof value === "string" ? value : "";
}
