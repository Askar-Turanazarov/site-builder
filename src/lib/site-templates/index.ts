import type { SiteTemplate } from "./types";
import { cafeTemplate } from "./cafe";
import { corporateTemplate } from "./corporate";
import { agencyTemplate } from "./agency";
import { shopTemplate } from "./shop";
import { blogTemplate } from "./blog";
import { clinicTemplate } from "./clinic";
import { educationTemplate } from "./education";
import { constructionTemplate } from "./construction";
import { lawTemplate } from "./law";
import { beautyTemplate } from "./beauty";
import { fitnessTemplate } from "./fitness";
import { travelTemplate } from "./travel";

/**
 * Реестр готовых сайтов целиком. Порядок — тот, в котором карточки идут в
 * галерее `/admin/templates`: сначала самые универсальные профили, дальше
 * узкие. Каждый шаблон использует собственную тему (`themeKey`) и свою пару
 * шрифтов (`design`), поэтому два шаблона не выглядят одинаково даже при
 * похожем наборе блоков.
 */
export const SITE_TEMPLATES: SiteTemplate[] = [
  corporateTemplate,
  agencyTemplate,
  shopTemplate,
  cafeTemplate,
  blogTemplate,
  clinicTemplate,
  educationTemplate,
  constructionTemplate,
  lawTemplate,
  beautyTemplate,
  fitnessTemplate,
  travelTemplate,
];

export function getSiteTemplate(key: string): SiteTemplate | undefined {
  return SITE_TEMPLATES.find((template) => template.key === key);
}

export * from "./types";
