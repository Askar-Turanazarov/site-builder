import type { Locale } from "@/blocks/context";
import { LOCALES } from "@/blocks/context";
import { THEME_PRESETS } from "@/blocks/palette";
import { SITE_TEMPLATES, getSiteTemplate } from "@/lib/site-templates";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import type { PortalT } from "@/lib/portal-i18n";

/**
 * Шаблоны живой сцены — четыре самых непохожих: строгий светлый, тёплый,
 * тёмный неоновый и мягкий. Смена именно их за восемь секунд показывает, что
 * один конструктор даёт совсем разные сайты.
 */
export const HERO_STAGE_KEYS = ["corporate", "cafe", "fitness", "beauty"] as const;

/** Длительность одного шага, мс. */
export const HERO_STAGE_INTERVAL = 3600;

/**
 * Живая сцена на главной: окно браузера, в котором сменяются настоящие шаблоны,
 * и три «спутника» — блоки, стили и выгрузка.
 *
 * Разметка целиком серверная. Первый шаг активен уже в HTML (`data-step="0"`
 * ставит HeroStageMotion), поэтому без JavaScript сцена выглядит законченной
 * картинкой, а не пустым окном. Смену шагов, наклон и свет ведёт
 * HeroStageMotion, переходы описаны в src/styles/portal.css.
 *
 * Сцена декоративна для программ экранного доступа: всё, что она показывает,
 * сказано текстом слева.
 */
export function HeroStage({ locale, t }: { locale: Locale; t: PortalT }) {
  const start = Math.max(0, LOCALES.indexOf(locale));
  // Первый шаг — на языке посетителя, дальше язык меняется вместе с дизайном.
  const steps = HERO_STAGE_KEYS.map((key, i) => ({
    template: getSiteTemplate(key)!,
    locale: LOCALES[(start + i) % LOCALES.length],
  }));

  const chips = [
    t("stage.block.hero"),
    t("stage.block.gallery"),
    t("stage.block.pricing"),
    t("stage.block.reviews"),
  ];

  const dots = SITE_TEMPLATES.map((template) => ({
    key: template.key,
    accent: THEME_PRESETS[template.themeKey].accent,
    step: (HERO_STAGE_KEYS as readonly string[]).indexOf(template.key),
  }));

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[720px] lg:max-w-none lg:py-14 lg:pl-8">
      {/* ------------------------------------------------------------ окно */}
      <div data-sg-tilt className="sg-tilt">
        <div className="sg-window overflow-hidden rounded-[22px] border border-border bg-surface">
          <div className="flex items-center gap-3 border-b border-separator px-4 py-2.5">
            <span className="flex shrink-0 gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </span>

            <div className="mx-auto flex min-w-0 items-center gap-1.5 rounded-full bg-background px-3 py-1 font-mono text-[11px] text-muted">
              <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" />
                <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
              </svg>
              <span>
                sitego.uz/
                <span data-swap className="text-ink">
                  {steps.map((s, i) => (
                    <span key={i} data-for={i}>
                      {s.locale}
                    </span>
                  ))}
                </span>
                /
              </span>
            </div>

            <span data-swap className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold text-accent">
              {steps.map((s, i) => (
                <span key={i} data-for={i}>
                  {s.locale.toUpperCase()}
                </span>
              ))}
            </span>
          </div>

          <div className="relative aspect-[16/11] overflow-hidden bg-background">
            {steps.map((s, i) => (
              <div key={s.template.key} data-slide={i} className="sg-slide absolute inset-0">
                <TemplatePreview template={s.template} locale={s.locale} scale={0.5} rich eager={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------- спутник: блоки */}
      <div className="sg-float pointer-events-none absolute -top-1 -left-3 hidden w-56 lg:block xl:-left-6">
        <div className="rounded-2xl border border-border bg-surface/90 p-3 shadow-overlay backdrop-blur-md">
          <div className="mb-2.5 flex items-center justify-between px-0.5">
            <span className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">
              {t("stage.blocks")}
            </span>
            <span className="flex h-4 w-4 items-center justify-center rounded-md bg-default text-[11px] leading-none text-muted">
              +
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {chips.map((label, i) => (
              <span
                key={label}
                data-chip={i}
                className="sg-chip inline-flex items-center gap-1 rounded-full bg-default px-2.5 py-1 text-[11px] font-medium text-ink-soft"
              >
                <svg viewBox="0 0 12 12" className="sg-chip-check h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="m2.5 6.2 2.2 2.2 4.8-4.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------ спутник: стили */}
      <div className="sg-float-b pointer-events-none absolute -bottom-2 left-4 hidden lg:block xl:-left-2">
        <div className="flex items-center gap-3 rounded-full border border-border bg-surface/90 py-2 pr-4 pl-3 shadow-overlay backdrop-blur-md">
          <span className="flex items-center gap-1.5">
            {dots.map((dot) => (
              <span
                key={dot.key}
                data-dot-step={dot.step >= 0 ? dot.step : undefined}
                className="sg-dot h-3 w-3 rounded-full ring-1 ring-foreground/10"
                style={{ background: dot.accent }}
              />
            ))}
          </span>
          <span className="text-[11px] font-semibold whitespace-nowrap text-ink-soft">{t("stage.styles")}</span>
        </div>
      </div>

      {/* --------------------------------------------- спутник: выгрузка */}
      <div className="sg-float-c pointer-events-none absolute right-0 bottom-24 hidden w-60 lg:block xl:-right-5">
        <div className="rounded-2xl border border-border bg-surface/90 p-3 shadow-overlay backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-success/15 text-success">
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path d="m4.5 10.5 3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-ink">{t("stage.export")}</div>
              <div className="truncate font-mono text-[11px] text-muted">site.zip · {t("stage.exportMeta")}</div>
            </div>
          </div>
          <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-default">
            <div data-sg-restart className="sg-progress h-full rounded-full bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
