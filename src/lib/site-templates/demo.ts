import type { Locale, RenderContext } from "@/blocks/context";
import type { ResolvedMenuItem } from "@/lib/menu";
import { buildMediaMap } from "@/lib/media-map";
import { loadDictionary } from "@/lib/i18n";
import { templateArtMediaMap } from "./art";
import type { SiteTemplate } from "./types";

/**
 * Демонстрация шаблона: рендер прямо из данных шаблона, без записи в базу.
 *
 * Отличий от настоящего сайта два, и оба живут здесь:
 *   1) картинки берутся из набора графики шаблона (public/templates/…),
 *      а не из медиатеки;
 *   2) все внутренние ссылки получают префикс `/demo/<ключ>`, поэтому меню и
 *      кнопки водят по самой демонстрации — по ней можно ходить как по сайту.
 */

export function demoBase(templateKey: string): string {
  return `/demo/${templateKey}`;
}

export function demoHref(templateKey: string, locale: Locale, path = ""): string {
  const suffix = path ? `/${path.replace(/^\/+/, "")}` : "";
  return `${demoBase(templateKey)}/${locale}${suffix}`;
}

export async function buildDemoContext(
  template: SiteTemplate,
  locale: Locale,
  pageSlug: string | null,
): Promise<RenderContext> {
  const [media, t] = await Promise.all([buildMediaMap(locale), loadDictionary(locale)]);

  return {
    locale,
    // Медиатека сайта тоже подмешана: если администратор смотрит демо,
    // а в шаблоне вдруг окажется ссылка на настоящую картинку, она отрисуется.
    media: { ...media, ...templateArtMediaMap(template.key, template.label[locale], locale) },
    t,
    pageSlug,
    linkBase: demoBase(template.key),
    contactFormAction: null,
    contactEmail: template.settings.contactEmail,
  };
}

/** Пункты меню шаблона, разложенные на адреса демонстрации. */
export function demoMenuItems(
  template: SiteTemplate,
  locale: Locale,
  location: "header" | "footer",
): ResolvedMenuItem[] {
  return template.menu
    .filter((item) => item.location === location)
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((item, index) => {
      let href = demoHref(template.key, locale);
      if (item.linkType === "page") {
        const page = template.pages.find((p) => p.slug === item.target);
        if (page && !page.isHomepage) href = demoHref(template.key, locale, page.slug);
      } else if (item.linkType === "category") {
        href = demoHref(template.key, locale, `news/${item.target}`);
      }
      return { id: `${location}-${index}`, label: item.label[locale], href };
    });
}

/**
 * Что показать по адресу вида /demo/<ключ>/<язык>/<путь>. Возвращает описание,
 * а не разметку: так один разбор обслуживает и страницу, и метаданные.
 */
export type DemoTarget =
  | { kind: "page"; slug: string }
  | { kind: "news" }
  | { kind: "category"; slug: string }
  | { kind: "post"; categorySlug: string; slug: string }
  | { kind: "missing" };

export function resolveDemoTarget(template: SiteTemplate, path: string[]): DemoTarget {
  if (path.length === 0) {
    const home = template.pages.find((p) => p.isHomepage) ?? template.pages[0];
    return home ? { kind: "page", slug: home.slug } : { kind: "missing" };
  }

  if (path[0] === "news") {
    if (path.length === 1) return { kind: "news" };
    if (path.length === 2) {
      return template.categories.some((c) => c.slug === path[1])
        ? { kind: "category", slug: path[1] }
        : { kind: "missing" };
    }
    if (path.length === 3) {
      const post = template.posts.find((p) => p.slug === path[2]);
      return post ? { kind: "post", categorySlug: path[1], slug: post.slug } : { kind: "missing" };
    }
    return { kind: "missing" };
  }

  if (path.length === 1 && template.pages.some((p) => p.slug === path[0])) {
    return { kind: "page", slug: path[0] };
  }

  return { kind: "missing" };
}
