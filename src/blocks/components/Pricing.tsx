import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { resolveHref } from "../links";
import { CX, cx } from "../classes";

export function PricingBlock({ data, ctx }: { data: BlockDataOf<"pricing">; ctx: RenderContext }) {
  if (data.plans.length === 0) return null;

  return (
    <section className={CX.section}>
      <div className={CX.container}>
        {data.heading && <h2 className={cx(CX.h2, "mb-10")}>{data.heading}</h2>}
        <div className={CX.gridCols[3]}>
          {data.plans.map((plan, i) => (
            <div
              key={i}
              className={cx(
                CX.card,
                "flex flex-col",
                plan.highlighted && "sb-card-featured border-2 border-[var(--tpl-accent)] shadow-lg",
              )}
            >
              {plan.highlighted && (
                <span
                  className="mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ background: "var(--tpl-accent)", color: "var(--tpl-on-accent)" }}
                >
                  {ctx.t("pricing.recommended")}
                </span>
              )}
              {plan.name && <h3 className={CX.h3}>{plan.name}</h3>}
              <div className="mt-3 flex items-baseline gap-1">
                {plan.price && (
                  <span className="text-3xl font-extrabold text-[var(--tpl-ink)]">
                    {plan.price}
                  </span>
                )}
                {plan.period && (
                  <span className="text-sm text-[var(--tpl-ink-soft)]">/ {plan.period}</span>
                )}
              </div>
              {plan.features.length > 0 && (
                <ul className="mt-5 flex-1 space-y-2.5 text-sm text-[var(--tpl-ink-soft)]">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <svg
                        viewBox="0 0 20 20"
                        className="mt-0.5 h-4 w-4 shrink-0"
                        fill="none"
                        stroke="var(--tpl-accent)"
                        strokeWidth={2}
                      >
                        <path d="m4 10 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              {plan.ctaLabel && (
                <a
                  href={resolveHref(plan.ctaLink, ctx.locale, ctx.linkBase)}
                  className={cx(
                    CX.button,
                    "mt-6 w-full",
                    plan.highlighted ? CX.buttonSolid : CX.buttonOutline,
                  )}
                >
                  {plan.ctaLabel}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
