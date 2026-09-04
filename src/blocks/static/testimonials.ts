import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { resolveMedia } from "../context";
import { CX, cx } from "../classes";
import { escapeHtml, escapeAttr } from "./escape";

export function testimonialsToHtml(data: BlockDataOf<"testimonials">, ctx: RenderContext): string {
  if (data.items.length === 0) return "";

  const heading = data.heading ? `<h2 class="${cx(CX.h2, "mb-10")}">${escapeHtml(data.heading)}</h2>` : "";

  const cards = data.items
    .map((testimonial) => {
      const avatar = resolveMedia(ctx, testimonial.avatarMediaId);
      const avatarHtml = avatar
        ? `<img src="${escapeAttr(avatar.url)}" alt="${escapeAttr(avatar.alt)}" class="h-10 w-10 rounded-full object-cover" />`
        : "";
      return `
      <figure class="${CX.card}">
        <span class="mb-3 block text-4xl leading-none [font-family:var(--tpl-font-display)]" style="color:var(--tpl-accent)" aria-hidden="true">&ldquo;</span>
        ${testimonial.quote ? `<blockquote class="text-[15px] leading-relaxed text-[var(--tpl-ink-soft)]">${escapeHtml(testimonial.quote)}</blockquote>` : ""}
        <figcaption class="mt-5 flex items-center gap-3">
          ${avatarHtml}
          <div>
            ${testimonial.authorName ? `<div class="text-sm font-semibold text-[var(--tpl-ink)]">${escapeHtml(testimonial.authorName)}</div>` : ""}
            ${testimonial.authorRole ? `<div class="text-xs text-[var(--tpl-ink-soft)]">${escapeHtml(testimonial.authorRole)}</div>` : ""}
          </div>
        </figcaption>
      </figure>`;
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
