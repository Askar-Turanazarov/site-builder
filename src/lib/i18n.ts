import { prisma } from "@/lib/prisma";
import type { Locale } from "@/blocks/context";

/**
 * Loads every DictionaryEntry and returns a `t(key)` closure bound to one
 * locale, with graceful fallback to RU then to the raw key — so a missing
 * translation never breaks the page, just shows a slightly wrong string
 * an admin can go fill in.
 */
export async function loadDictionary(locale: Locale): Promise<(key: string) => string> {
  const entries = await prisma.dictionaryEntry.findMany();
  const map = new Map(entries.map((e) => [e.key, e]));

  return (key: string) => {
    const entry = map.get(key);
    if (!entry) return key;
    const value = locale === "ru" ? entry.valueRu : locale === "uz" ? entry.valueUz : entry.valueEn;
    return value || entry.valueRu || key;
  };
}
