import type { Locale } from "@/blocks/context";
import { resolveHref } from "@/blocks/links";

export interface ResolvedMenuItem {
  id: string;
  label: string;
  href: string;
}

interface RawMenuItem {
  id: string;
  labelRu: string;
  labelUz: string;
  labelEn: string;
  linkType: string;
  customUrl: string | null;
  page: { slug: string; isHomepage: boolean } | null;
  category: { slug: string } | null;
  order: number;
}

function labelFor(item: RawMenuItem, locale: Locale): string {
  return locale === "ru" ? item.labelRu : locale === "uz" ? item.labelUz : item.labelEn;
}

export function resolveMenuItems(items: RawMenuItem[], locale: Locale): ResolvedMenuItem[] {
  return items
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((item) => {
      let href = "#";
      if (item.linkType === "page" && item.page) {
        href = item.page.isHomepage ? `/${locale}` : `/${locale}/${item.page.slug}`;
      } else if (item.linkType === "category" && item.category) {
        href = `/${locale}/news/${item.category.slug}`;
      } else if (item.linkType === "custom" && item.customUrl) {
        href = resolveHref(item.customUrl, locale);
      }
      return { id: item.id, label: labelFor(item, locale), href };
    });
}
