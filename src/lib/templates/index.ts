import type { PageTemplate } from "./types";
import { businessHomepage } from "./homepage/business";
import { agencyHomepage } from "./homepage/agency";
import { restaurantHomepage } from "./homepage/restaurant";
import { shopHomepage } from "./homepage/shop";
import { blogHomepage } from "./homepage/blog";
import { aboutTemplate } from "./inner/about";
import { servicesTemplate } from "./inner/services";
import { contactTemplate } from "./inner/contact";
import { pricingTemplate } from "./inner/pricing";
import { teamTemplate } from "./inner/team";
import { standardArticleTemplate } from "./article/standard";
import { galleryArticleTemplate } from "./article/gallery";
import { longformArticleTemplate } from "./article/longform";

export const HOMEPAGE_TEMPLATES: PageTemplate[] = [
  businessHomepage,
  agencyHomepage,
  restaurantHomepage,
  shopHomepage,
  blogHomepage,
];

export const INNER_PAGE_TEMPLATES: PageTemplate[] = [
  aboutTemplate,
  servicesTemplate,
  contactTemplate,
  pricingTemplate,
  teamTemplate,
];

export const ARTICLE_TEMPLATES: PageTemplate[] = [
  standardArticleTemplate,
  galleryArticleTemplate,
  longformArticleTemplate,
];

export const ALL_PAGE_TEMPLATES: PageTemplate[] = [...HOMEPAGE_TEMPLATES, ...INNER_PAGE_TEMPLATES];

export function findTemplate(key: string): PageTemplate | undefined {
  return [...ALL_PAGE_TEMPLATES, ...ARTICLE_TEMPLATES].find((t) => t.key === key);
}

export type { PageTemplate };
