import type { CSSProperties } from "react";
import type { Locale } from "@/blocks/context";
import { LOCALES } from "@/blocks/context";
import { THEME_PRESETS } from "@/blocks/palette";
import { SITE_TEMPLATES, getSiteTemplate } from "@/lib/site-templates";
import { templateArtPublicPath } from "@/lib/site-templates/art";
import { templateHeroHeading } from "@/components/templates/TemplatePreview";
import type { PortalT } from "@/lib/portal-i18n";

/**
 * Миниатюры для карточек «Возможностей».
 *
 * Каждая показывает функцию, а не иконку о ней, и собрана из настоящих данных
 * проекта: заголовки и фотографии шаблонов, их палитры, их статьи. В покое
 * миниатюра — законченная картинка; движение добавляют классы из
 * src/styles/portal.css, и только пока карточка на экране (`data-inview`).
 */

function photo(templateKey: string, name: string): string | null {
  const path = templateArtPublicPath(templateKey, name);
  return path ? `/${path}` : null;
}

/** Порядковый номер для ступенчатых задержек в CSS. */
function order(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

function Grip() {
  return (
    <svg viewBox="0 0 8 12" className="h-3 w-2 shrink-0 opacity-50" fill="currentColor">
      {[2, 6, 10].map((y) => (
        <g key={y}>
          <circle cx="2" cy={y} r="1" />
          <circle cx="6" cy={y} r="1" />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------------ */
/* Редактор на холсте: блок «въезжает» в свободный слот за курсором.        */
/* ------------------------------------------------------------------------ */
export function EditorVisual({ t }: { t: PortalT }) {
  const rail = [
    t("stage.block.hero"),
    t("stage.block.gallery"),
    t("stage.block.pricing"),
    t("stage.block.reviews"),
  ];
  const tiles = [1, 2, 3, 4].map((n) => photo("cafe", `tile-${n}`));

  return (
    <div className="flex h-full min-h-[300px] gap-3 p-5 sm:p-6 lg:min-h-[380px]">
      <div className="hidden w-40 shrink-0 flex-col gap-1.5 rounded-2xl border border-border bg-surface p-2.5 shadow-surface sm:flex">
        <div className="px-1.5 pb-1 text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">
          {t("stage.blocks")}
        </div>
        {rail.map((label, i) => (
          <div
            key={label}
            className={`flex items-center gap-2 rounded-xl px-2 py-2 text-[11px] font-medium ${
              i === 1 ? "bg-accent-soft text-accent" : "text-ink-soft"
            }`}
          >
            <Grip />
            <span className="h-4 w-4 shrink-0 rounded-md bg-current opacity-20" />
            {label}
          </div>
        ))}
      </div>

      <div className="relative min-w-0 flex-1 overflow-hidden rounded-2xl border border-border bg-background p-3.5">
        {/* Выбранный блок: акцентная рамка и ярлык, как в настоящем редакторе. */}
        <div className="relative rounded-xl ring-2 ring-accent ring-offset-2 ring-offset-background">
          <div
            className="flex h-24 flex-col justify-end gap-1.5 rounded-xl p-3.5"
            style={{
              background:
                "linear-gradient(125deg, color-mix(in oklab, var(--accent) 78%, #0b1220), color-mix(in oklab, var(--accent) 40%, #22d3ee))",
            }}
          >
            <span className="h-2.5 w-3/5 rounded-full bg-white/85" />
            <span className="h-2 w-2/5 rounded-full bg-white/55" />
          </div>
          <span className="absolute -top-2.5 left-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
            {rail[0]}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-border bg-surface p-2.5">
              <span className="block h-2 w-3/4 rounded-full bg-foreground/15" />
              <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-foreground/10" />
            </div>
          ))}
        </div>

        <div className="relative mt-3 h-24">
          <div className="sg-slot absolute inset-0 flex items-center justify-center rounded-xl border-2 border-dashed border-accent/50 bg-accent-soft text-[11px] font-medium text-accent">
            {t("features.dragHint")}
          </div>
          <div className="sg-fly absolute inset-0 grid grid-cols-4 gap-1.5 rounded-xl border border-border bg-surface p-1.5 shadow-overlay">
            {tiles.map((src, i) =>
              src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt="" loading="lazy" className="h-full w-full rounded-lg object-cover" />
              ) : (
                <span key={i} className="rounded-lg bg-default" />
              ),
            )}
          </div>
          <svg
            viewBox="0 0 24 24"
            className="sg-fly-cursor absolute top-1/2 left-1/2 h-5 w-5 drop-shadow"
            fill="var(--foreground)"
            stroke="var(--background)"
            strokeWidth={1.5}
          >
            <path d="M5 3l14 7-6 1.8L10 18z" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="mt-3 space-y-1.5">
          <span className="block h-2 w-full rounded-full bg-foreground/10" />
          <span className="block h-2 w-5/6 rounded-full bg-foreground/10" />
          <span className="block h-2 w-2/3 rounded-full bg-foreground/[0.07]" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Три языка: вкладки и одна и та же фраза шаблона на трёх языках.          */
/* ------------------------------------------------------------------------ */
export function LocalesVisual() {
  const cafe = getSiteTemplate("cafe")!;

  return (
    <div className="flex h-48 flex-col items-center justify-center gap-5 px-6">
      <div className="relative grid w-44 grid-cols-3 rounded-full border border-border bg-surface p-1 text-[11px] font-bold shadow-surface">
        <span className="sg-loc-pill absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-accent" />
        {LOCALES.map((code, i) => (
          <span key={code} className={`sg-loc-label-${i} relative z-10 py-1 text-center`}>
            {code.toUpperCase()}
          </span>
        ))}
      </div>

      <div className="grid w-full max-w-xs text-center">
        {LOCALES.map((code, i) => (
          <div key={code} className={`sg-loc-${i} [grid-area:1/1]`}>
            <p className="font-display text-lg leading-snug font-bold text-balance text-ink">
              {templateHeroHeading(cafe, code)}
            </p>
            <p className="mt-1.5 text-xs text-muted">{cafe.settings.siteName[code]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Темы и стили: двенадцать мини-плиток настоящих палитр.                   */
/* ------------------------------------------------------------------------ */
export function StylesVisual({ locale }: { locale: Locale }) {
  return (
    <div className="grid h-48 grid-cols-6 content-center gap-2 px-5">
      {SITE_TEMPLATES.map((template, i) => {
        const preset = THEME_PRESETS[template.themeKey];
        return (
          <div
            key={template.key}
            title={template.label[locale]}
            className="sg-pop sg-tile aspect-[4/5] overflow-hidden border border-foreground/10 p-1.5"
            style={{
              ...order(i),
              background: preset.paper,
              borderRadius: `min(${preset.radius}, 10px)`,
            }}
          >
            <span className="block h-1.5 w-3/5 rounded-full" style={{ background: preset.accent }} />
            <span
              className="mt-1.5 block h-1 w-full rounded-full"
              style={{ background: `color-mix(in oklab, ${preset.ink} 28%, transparent)` }}
            />
            <span
              className="mt-1 block h-1 w-2/3 rounded-full"
              style={{ background: `color-mix(in oklab, ${preset.ink} 16%, transparent)` }}
            />
            <span
              className="mt-2 block h-3 w-full"
              style={{ background: preset.surface, borderRadius: `min(${preset.radius}, 4px)` }}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Новости: веер карточек статей; при наведении раскрывается.               */
/* ------------------------------------------------------------------------ */
export function NewsVisual({ locale }: { locale: Locale }) {
  const blog = getSiteTemplate("blog")!;
  const posts = blog.posts.slice(0, 3);

  return (
    <div className="relative flex h-48 items-center justify-center overflow-hidden">
      {posts.map((post, i) => {
        const cover = photo("blog", `cover-${(i % 4) + 1}`);
        const category = blog.categories.find((c) => c.slug === post.categorySlug);
        return (
          <div
            key={post.slug}
            className={`sg-fan sg-fan-${i} absolute w-36 overflow-hidden rounded-2xl border border-border bg-surface shadow-overlay`}
          >
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover} alt="" loading="lazy" className="h-16 w-full object-cover" />
            ) : (
              <span className="block h-16 bg-default" />
            )}
            <div className="p-2.5">
              <span className="text-[9px] font-semibold tracking-wide text-accent uppercase">
                {category?.name[locale]}
              </span>
              <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug font-semibold text-ink">
                {post.title[locale]}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Медиатека: мозаика из фотографий шаблонов и отметка про alt.             */
/* ------------------------------------------------------------------------ */
export function MediaVisual() {
  const shots = [1, 2, 3].map((n) => photo("travel", `tile-${n}`));

  return (
    <div className="relative grid h-48 grid-cols-3 grid-rows-2 gap-2 p-5">
      {shots.map((src, i) => (
        <div
          key={i}
          style={order(i)}
          className={`sg-pop relative overflow-hidden rounded-xl bg-default ${
            i === 0 ? "col-span-2 row-span-2" : ""
          } ${i === 1 ? "ring-2 ring-accent ring-offset-2 ring-offset-surface" : ""}`}
        >
          {src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          )}
          {i === 1 && (
            <span className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="m2.5 6.2 2.2 2.2 4.8-4.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </div>
      ))}
      <span className="absolute bottom-7 left-7 rounded-full bg-background/85 px-2.5 py-1 font-mono text-[10px] font-semibold text-ink backdrop-blur">
        alt · RU UZ EN
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Экспорт: дерево архива и полоса упаковки.                                */
/* ------------------------------------------------------------------------ */
export function ExportVisual({ t }: { t: PortalT }) {
  const rows = [
    { name: "site.zip", depth: 0, zip: true },
    { name: "ru/index.html", depth: 1 },
    { name: "uz/index.html", depth: 1 },
    { name: "en/index.html", depth: 1 },
    { name: "assets/styles.css", depth: 1 },
  ];

  return (
    <div className="flex h-48 flex-col justify-center gap-3 px-5">
      <div className="rounded-2xl border border-border bg-surface px-3 py-2.5 font-mono text-[11px] shadow-surface">
        {rows.map((row, i) => (
          <div
            key={row.name}
            style={{ ...order(i), paddingLeft: row.depth * 14 }}
            className={`sg-pop flex items-center gap-2 py-[3px] ${row.zip ? "font-semibold text-ink" : "text-muted"}`}
          >
            {row.zip ? (
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <rect x="3" y="1.5" width="10" height="13" rx="2" />
                <path d="M8 1.5v2M8 5v1.5M8 8v1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <span className="text-foreground/25">└</span>
            )}
            {row.name}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-default">
          <div className="sg-pack h-full w-full origin-left rounded-full bg-accent" />
        </div>
        <span className="text-[11px] font-semibold whitespace-nowrap text-success">✓ {t("stage.exportMeta")}</span>
      </div>
    </div>
  );
}
