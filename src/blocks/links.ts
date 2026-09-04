import type { Locale } from "./context";

/**
 * Internal link fields on blocks (ctaLink, buttonLink, …) are stored
 * locale-independent — an admin writes "/about" once and it works under
 * every locale — because /about alone isn't a real route (routes are
 * always /{locale}/...). This prefixes internal-looking paths with the
 * current locale at render time; external URLs, anchors, mailto/tel are
 * passed through untouched.
 */
export function resolveHref(href: string, locale: Locale): string {
  if (!href) return "#";
  if (/^(https?:)?\/\//.test(href) || /^(mailto|tel):/.test(href) || href.startsWith("#")) {
    return href;
  }
  if (href.startsWith("/")) {
    return `/${locale}${href}`;
  }
  return href;
}
