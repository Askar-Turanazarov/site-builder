import type { Locale } from "@/blocks/context";
import type { PortalT } from "@/lib/portal-i18n";
import {
  IconPages,
  IconPosts,
  IconMedia,
  IconExport,
  IconDesign,
  IconDictionary,
} from "@/components/admin/icons";
import { PORTAL_CONTAINER } from "../container";
import { FeatureGrid } from "./FeatureGrid";
import {
  EditorVisual,
  ExportVisual,
  LocalesVisual,
  MediaVisual,
  NewsVisual,
  StylesVisual,
} from "./visuals";

/**
 * Одна карточка бенто: сверху миниатюра функции, снизу подпись.
 * `tall` растягивает миниатюру на всю высоту — у карточки редактора, которая
 * занимает два ряда сетки.
 */
function BentoCard({
  className = "",
  tall = false,
  icon: Icon,
  title,
  body,
  children,
}: {
  className?: string;
  tall?: boolean;
  icon: typeof IconPages;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <article data-bento className={`sg-bento-card flex flex-col ${className}`}>
      <div className={`sg-bento-visual relative overflow-hidden ${tall ? "flex-1" : ""}`}>
        <div aria-hidden="true" className="sg-bento-dots pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="sg-bento-stage relative h-full">
          {children}
        </div>
      </div>
      <div className="relative z-[2] border-t border-separator p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <Icon className="h-[18px] w-[18px]" />
          </span>
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{title}</h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </article>
  );
}

/**
 * Раздел «Возможности» на главной — бенто-сетка из шести карточек разного
 * размера. Прежний вариант (шесть строк «иконка + текст») рассказывал о
 * функциях; этот их показывает.
 *
 * `scroll-mt-20` оставляет место под липкой шапкой, когда к разделу ведёт
 * пункт меню.
 */
export function FeaturesSection({ t, locale }: { t: PortalT; locale: Locale }) {
  return (
    <section id="features" className="relative scroll-mt-20 border-t border-separator">
      <div className={`${PORTAL_CONTAINER} py-20 lg:py-28`}>
        <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-accent shadow-surface">
              {t("features.eyebrow")}
            </span>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] font-extrabold tracking-[-0.03em] text-balance text-ink sm:text-5xl">
              {t("features.title")}
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-muted lg:justify-self-end">
            {t("features.lead")}
          </p>
        </div>

        <FeatureGrid className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          <BentoCard
            className="md:col-span-2 lg:col-span-4 lg:row-span-2"
            tall
            icon={IconPages}
            title={t("features.editorTitle")}
            body={t("features.editorBody")}
          >
            <EditorVisual t={t} />
          </BentoCard>

          <BentoCard
            className="lg:col-span-2"
            icon={IconDictionary}
            title={t("features.localesTitle")}
            body={t("features.localesBody")}
          >
            <LocalesVisual />
          </BentoCard>

          <BentoCard
            className="lg:col-span-2"
            icon={IconDesign}
            title={t("features.designTitle")}
            body={t("features.designBody")}
          >
            <StylesVisual locale={locale} />
          </BentoCard>

          <BentoCard
            className="lg:col-span-2"
            icon={IconPosts}
            title={t("features.newsTitle")}
            body={t("features.newsBody")}
          >
            <NewsVisual locale={locale} />
          </BentoCard>

          <BentoCard
            className="lg:col-span-2"
            icon={IconMedia}
            title={t("features.mediaTitle")}
            body={t("features.mediaBody")}
          >
            <MediaVisual />
          </BentoCard>

          <BentoCard
            className="md:col-span-2 lg:col-span-2"
            icon={IconExport}
            title={t("features.exportTitle")}
            body={t("features.exportBody")}
          >
            <ExportVisual t={t} />
          </BentoCard>
        </FeatureGrid>
      </div>
    </section>
  );
}
