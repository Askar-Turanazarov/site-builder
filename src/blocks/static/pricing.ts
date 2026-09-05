import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { resolveHref } from "../links";
import { CX, cx } from "../classes";
import { escapeHtml, escapeAttr } from "./escape";

export function pricingToHtml(data: BlockDataOf<"pricing">, ctx: RenderContext): string {
  if (data.plans.length === 0) return "";

  const heading = data.heading ? `<h2 class="${cx(CX.h2, "mb-10")}">${escapeHtml(data.heading)}</h2>` : "";

  const cards = data.plans
    .map((plan) => {
      const badge = plan.highlighted
        ? `<span class="mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold" style="background:var(--tpl-accent);color:var(--tpl-on-accent)">${escapeHtml(ctx.t("pricing.recommended"))}</span>`
        : "";
      const features = plan.features.length
        ? `<ul class="mt-5 flex-1 space-y-2.5 text-sm text-[var(--tpl-ink-soft)]">
            ${plan.features
              .map(
                (f) =>
                  `<li class="flex items-start gap-2"><svg viewBox="0 0 20 20" class="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="var(--tpl-accent)" stroke-width="2"><path d="m4 10 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/></svg>${escapeHtml(f)}</li>`,
              )
              .join("")}
          </ul>`
        : "";
      const cta = plan.ctaLabel
        ? `<a href="${escapeAttr(resolveHref(plan.ctaLink, ctx.locale))}" class="${cx(CX.button, "mt-6 w-full", plan.highlighted ? CX.buttonSolid : CX.buttonOutline)}">${escapeHtml(plan.ctaLabel)}</a>`
        : "";

      return `
      <div class="${cx(CX.card, "flex flex-col", plan.highlighted && "sb-card-featured border-2 border-[var(--tpl-accent)] shadow-lg")}">
        ${badge}
        ${plan.name ? `<h3 class="${CX.h3}">${escapeHtml(plan.name)}</h3>` : ""}
        <div class="mt-3 flex items-baseline gap-1">
          ${plan.price ? `<span class="text-3xl font-extrabold text-[var(--tpl-ink)]">${escapeHtml(plan.price)}</span>` : ""}
          ${plan.period ? `<span class="text-sm text-[var(--tpl-ink-soft)]">/ ${escapeHtml(plan.period)}</span>` : ""}
        </div>
        ${features}
        ${cta}
      </div>`;
    })
    .join("\n");

  return `
<section class="${CX.section}">
  <div class="${CX.container}">
    ${heading}
    <div class="${CX.gridCols[3]}">
      ${cards}
    </div>
  </div>
</section>`;
}
