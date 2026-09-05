import type { Locale } from "./context";

/**
 * Internal link fields on blocks (ctaLink, buttonLink, …) are stored
 * locale-independent — an admin writes "/about" once and it works under
 * every locale — because /about alone isn't a real route (routes are
 * always /{locale}/...). This prefixes internal-looking paths with the
 * current locale at render time; external URLs, anchors, mailto/tel are
 * passed through untouched.
 *
 * `base` подставляется демонстрацией шаблона: там те же страницы живут не по
 * адресу `/ru/about`, а по `/demo/cafe/ru/about`, и без общего префикса меню
 * шаблона уводило бы посетителя на несуществующие страницы настоящего сайта.
 */
export function resolveHref(href: string, locale: Locale, base = ""): string {
  if (!href) return base ? `${base}/${locale}` : "#";
  if (/^(https?:)?\/\//.test(href) || /^(mailto|tel):/.test(href) || href.startsWith("#")) {
    return href;
  }
  if (href.startsWith("/")) {
    return `${base}/${locale}${href}`;
  }
  return href;
}
