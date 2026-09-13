import type { Locale } from "@/blocks/context";
import { CX, cx } from "@/blocks/classes";
import { googleFontsHref, themeStyleVars, type SiteDesign } from "@/blocks/palette";
import { templateArtPublicPath } from "@/lib/site-templates/art";
import type { SiteTemplate } from "@/lib/site-templates";

/** Оформление шаблона в виде, который понимают `themeStyleVars` и `googleFontsHref`. */
export function templateDesign(template: SiteTemplate): SiteDesign {
  return {
    themeKey: template.themeKey,
    skinKey: template.design?.skin ?? null,
    fontDisplay: template.design?.fontDisplay ?? null,
    fontBody: template.design?.fontBody ?? null,
  };
}

/** Заголовок обложки главной страницы шаблона на нужном языке. */
export function templateHeroHeading(template: SiteTemplate, locale: Locale): string {
  const hero = template.pages.find((p) => p.isHomepage)?.blocks.find((b) => b.type === "hero");
  return (
    (hero?.data.heading as Record<Locale, string> | undefined)?.[locale] ?? template.label[locale]
  );
}

/**
 * Уменьшенный макет главной страницы шаблона.
 *
 * Не картинка и не свотч палитры, а настоящая разметка: те же хуки `sb-*`, та же
 * тема и тот же скин, что у самого шаблона. Поэтому превью не может «врать» об
 * оформлении — поменяется скин, поменяется и превью.
 *
 * Макет рисуется крупным и сжимается `scale`. Ширина и высота заданы в
 * процентах, обратных масштабу: при любом размере родителя превью заполняет
 * его целиком. Раньше ширина была зашита в 1120 px, и в широкой карточке
 * справа оставалась пустая полоса.
 *
 * Родитель обязан быть `relative overflow-hidden` с заданной высотой.
 * Используется карточкой витрины и живой сценой на главной.
 */
export function TemplatePreview({
  template,
  locale,
  scale = 0.335,
  rich = false,
  eager = true,
}: {
  template: SiteTemplate;
  locale: Locale;
  /** Во сколько раз сжат макет. Меньше — больше «сайта» помещается в окно. */
  scale?: number;
  /** Длинная версия: плитки галереи и подвал — для окна, которое выше карточки. */
  rich?: boolean;
  /** false — фотографии грузятся лениво (невидимые кадры живой сцены). */
  eager?: boolean;
}) {
  const design = templateDesign(template);
  const fontsHref = googleFontsHref(design);
  const heading = templateHeroHeading(template, locale);
  const heroPhoto = templateArtPublicPath(template.key, "hero");
  const tiles = rich
    ? [1, 2, 3, 4]
        .map((n) => templateArtPublicPath(template.key, `tile-${n}`))
        .filter((path): path is string => Boolean(path))
    : [];
  const size = `${100 / scale}%`;
  const loading = eager ? undefined : ("lazy" as const);

  return (
    <div
      style={{ ...themeStyleVars(design), width: size, height: size, transform: `scale(${scale})` }}
      data-skin={design.skinKey || undefined}
      className="absolute top-0 left-0 origin-top-left overflow-hidden bg-[var(--tpl-paper)]"
    >
      {fontsHref && <link rel="stylesheet" href={fontsHref} />}

      <div className="sb-header flex items-center justify-between border-b border-[var(--tpl-ink)]/10 bg-[var(--tpl-surface)] px-8 py-5">
        <span className="[font-family:var(--tpl-font-display)] text-xl font-bold text-[var(--tpl-ink)]">
          {template.settings.siteName[locale]}
        </span>
        <span className="flex gap-6 text-sm text-[var(--tpl-ink-soft)]">
          {template.menu
            .filter((item) => item.location === "header")
            .slice(0, 4)
            .map((item, i) => (
              <span key={i}>{item.label[locale]}</span>
            ))}
        </span>
      </div>

      <div className="relative">
        {heroPhoto && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/${heroPhoto}`}
            alt=""
            loading={loading}
            decoding="async"
            className={cx(
              "absolute inset-0 w-full object-cover opacity-70",
              rich ? "h-[360px]" : "h-[260px]",
            )}
          />
        )}
        <div className={cx("relative px-8", rich ? "pt-16 pb-14" : "pt-10 pb-6")}>
          <h3 className={cx(CX.h1, "max-w-[640px]")}>{heading}</h3>
          <span className={cx(CX.button, CX.buttonSolid, "mt-6")}>
            {template.pages[0]?.title[locale]}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 px-8 pt-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className="sb-card">
            <div className="sb-h3">{template.categories[i]?.name[locale] ?? "—"}</div>
            <div className="mt-2 h-2 w-4/5 rounded bg-[var(--tpl-ink)]/15" />
            <div className="mt-1.5 h-2 w-3/5 rounded bg-[var(--tpl-ink)]/10" />
          </div>
        ))}
      </div>

      {tiles.length > 0 && (
        <div className="grid grid-cols-4 gap-5 px-8 pt-8">
          {tiles.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={`/${src}`}
              alt=""
              loading={loading}
              decoding="async"
              className="h-[180px] w-full rounded-[var(--tpl-radius)] object-cover"
            />
          ))}
        </div>
      )}

      {rich && (
        <div className="sb-footer mt-8 flex items-center justify-between border-t border-[var(--tpl-ink)]/10 bg-[var(--tpl-surface)] px-8 py-6">
          <span className="[font-family:var(--tpl-font-display)] text-lg font-bold text-[var(--tpl-ink)]">
            {template.settings.siteName[locale]}
          </span>
          <span className="text-sm text-[var(--tpl-ink-soft)]">{template.settings.tagline[locale]}</span>
        </div>
      )}
    </div>
  );
}
