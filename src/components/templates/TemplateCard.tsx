import Link from "next/link";
import type { Locale } from "@/blocks/context";
import { CX, cx } from "@/blocks/classes";
import { googleFontsHref, themeStyleVars, type SiteDesign } from "@/blocks/palette";
import { templateArtPublicPath } from "@/lib/site-templates/art";
import type { SiteTemplate } from "@/lib/site-templates";

/**
 * Карточка шаблона для витрины.
 *
 * Превью — не картинка и не свотч палитры, а настоящий уменьшенный макет:
 * те же хуки `sb-*`, та же тема и тот же скин, что у самого шаблона, только
 * отмасштабированные. Поэтому карточка не может «врать» об оформлении: если
 * скин изменится, изменится и превью.
 */
export function TemplateCard({
  template,
  locale,
  labels,
  demoHref,
  applyHref,
  applySlot,
}: {
  template: SiteTemplate;
  locale: Locale;
  labels: { demo: string; apply: string; pages: string; posts: string };
  demoHref: string;
  /** Ссылка «Применить». Если не задана, вместо неё рисуется `applySlot`. */
  applyHref?: string;
  /** Клиентская кнопка применения — её передаёт админка. */
  applySlot?: React.ReactNode;
}) {
  const design: SiteDesign = {
    themeKey: template.themeKey,
    skinKey: template.design?.skin ?? null,
    fontDisplay: template.design?.fontDisplay ?? null,
    fontBody: template.design?.fontBody ?? null,
  };
  const fontsHref = googleFontsHref(design);
  const hero = template.pages.find((p) => p.isHomepage)?.blocks.find((b) => b.type === "hero");
  const heading =
    (hero?.data.heading as { ru: string; uz: string; en: string } | undefined)?.[locale] ??
    template.label[locale];

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface">
      {fontsHref && <link rel="stylesheet" href={fontsHref} />}

      <Link href={demoHref} className="group relative block aspect-[16/10] overflow-hidden">
        <div
          style={themeStyleVars(design)}
          data-skin={design.skinKey || undefined}
          className="absolute top-0 left-0 h-[700px] w-[1120px] origin-top-left scale-[0.335] bg-[var(--tpl-paper)]"
        >
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/${templateArtPublicPath(template.key, "hero")}`}
              alt=""
              className="absolute inset-0 h-[260px] w-full object-cover opacity-70"
            />
            <div className="relative px-8 pt-10 pb-6">
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
        </div>
        <span className="absolute inset-0 transition group-hover:bg-ink/5" />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-semibold text-ink">{template.label[locale]}</h3>
          <span className="shrink-0 rounded-full bg-paper px-2 py-0.5 text-[11px] text-muted">
            {template.pages.length} {labels.pages} · {template.posts.length} {labels.posts}
          </span>
        </div>

        <p className="text-xs font-medium text-accent-strong">{template.profile[locale]}</p>
        <p className="text-sm text-muted">{template.description[locale]}</p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          <Link
            href={demoHref}
            className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-ink hover:bg-paper"
          >
            {labels.demo}
          </Link>
          {applySlot ??
            (applyHref && (
              <Link
                href={applyHref}
                className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-surface hover:bg-accent-strong"
              >
                {labels.apply}
              </Link>
            ))}
        </div>
      </div>
    </article>
  );
}
