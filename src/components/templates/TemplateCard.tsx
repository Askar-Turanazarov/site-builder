import Link from "next/link";
import type { Locale } from "@/blocks/context";
import { templateMorphName } from "@/lib/site-templates/demo";
import { Transition, NAV_FORWARD } from "@/components/ui/Transition";
import type { SiteTemplate } from "@/lib/site-templates";
import { TemplatePreview } from "./TemplatePreview";

/**
 * Карточка шаблона для витрины.
 *
 * Превью — настоящий уменьшенный макет шаблона (см. TemplatePreview). Поэтому
 * его можно развернуть в сам сайт: тот же `name` стоит на странице
 * демонстрации, и браузер анимирует переход между ними.
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
  return (
    <article className="group/card flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-surface transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-overlay motion-reduce:transform-none">
      <Link
        href={demoHref}
        transitionTypes={[NAV_FORWARD]}
        className="group relative block aspect-[16/10] overflow-hidden"
      >
        <Transition name={templateMorphName(template.key)} share="sg-morph" default="none">
          <div className="absolute inset-0">
            <TemplatePreview template={template} locale={locale} />
          </div>
        </Transition>
        <span className="absolute inset-0 transition-colors duration-200 group-hover:bg-foreground/[0.06]" />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-semibold text-ink">{template.label[locale]}</h3>
          <span className="shrink-0 rounded-full bg-default px-2 py-0.5 text-[11px] text-muted">
            {template.pages.length} {labels.pages} · {template.posts.length} {labels.posts}
          </span>
        </div>

        <p className="text-xs font-medium text-accent">{template.profile[locale]}</p>
        <p className="text-sm text-muted">{template.description[locale]}</p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          <Link
            href={demoHref}
            transitionTypes={[NAV_FORWARD]}
            className="button button--sm border border-border text-ink hover:bg-default"
          >
            {labels.demo}
          </Link>
          {applySlot ??
            (applyHref && (
              <Link
                href={applyHref}
                className="button button--sm bg-accent text-accent-foreground hover:bg-accent-hover"
              >
                {labels.apply}
              </Link>
            ))}
        </div>
      </div>
    </article>
  );
}
