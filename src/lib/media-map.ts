import { prisma } from "@/lib/prisma";
import type { MediaRef, Locale } from "@/blocks/context";

/**
 * Resolves every Media row into the {url, alt} shape blocks expect, keyed
 * by id. Fetching the whole (small, admin-curated) library in one query is
 * simpler and cheap enough for this project's scale than walking every
 * block tree to collect only the ids actually referenced.
 */
export async function buildMediaMap(locale: Locale): Promise<Record<string, MediaRef>> {
  const all = await prisma.media.findMany();
  const map: Record<string, MediaRef> = {};
  for (const m of all) {
    const alt =
      (locale === "ru" ? m.altRu : locale === "uz" ? m.altUz : m.altEn) || m.altRu || m.filename;
    map[m.id] = { url: `/uploads/${m.path}`, alt, width: m.width, height: m.height };
  }
  return map;
}
