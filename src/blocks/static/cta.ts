import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { resolveHref } from "../links";
import { CX, cx } from "../classes";
import { escapeHtml, escapeAttr } from "./escape";

export function ctaToHtml(data: BlockDataOf<"cta">, ctx: RenderContext): string {
  if (!data.heading && !data.body) return "";
  const solid = data.style === "solid";

  const heading = data.heading
    ? `<h2 class="${cx(CX.h2, solid && "text-[var(--tpl-on-accent)]")}">${escapeHtml(data.heading)}</h2>`
    : "";
  const body = data.body
    ? `<p class="${cx("mt-2 max-w-xl text-base", solid ? "text-[var(--tpl-on-accent)]/85" : "text-[var(--tpl-ink-soft)]")}">${escapeHtml(data.body)}</p>`
    : "";
  const button = data.buttonLabel
    ? `<a href="${escapeAttr(resolveHref(data.buttonLink, ctx.locale, ctx.linkBase))}" class="${cx(CX.button, "shrink-0", solid ? "bg-[var(--tpl-surface)] text-[var(--tpl-ink)] hover:opacity-90" : CX.buttonSolid)}">${escapeHtml(data.buttonLabel)}</a>`
    : "";

  return `
<section class="${CX.section}">
  <div class="${CX.container}">
    <div class="${cx("sb-cta flex flex-col items-start gap-6 rounded-[var(--tpl-radius)] px-8 py-12 sm:flex-row sm:items-center sm:justify-between", solid ? "bg-[var(--tpl-accent)]" : "border border-[var(--tpl-ink)]/15")}">
      <div>
        ${heading}
        ${body}
      </div>
      ${button}
    </div>
  </div>
</section>`;
}
