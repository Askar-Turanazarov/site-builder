import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { resolveMedia } from "../context";
import { resolveHref } from "../links";
import { CX, cx } from "../classes";
import { escapeHtml, escapeAttr } from "./escape";

export function imageTextToHtml(data: BlockDataOf<"imageText">, ctx: RenderContext): string {
  const media = resolveMedia(ctx, data.imageMediaId);
  const imageFirst = data.imageSide === "left";

  const imageHtml = media
    ? `<div class="aspect-[4/3] overflow-hidden rounded-[var(--tpl-radius)]"><img src="${escapeAttr(media.url)}" alt="${escapeAttr(media.alt)}" class="h-full w-full object-cover" /></div>`
    : "";

  const textHtml = `
    ${data.heading ? `<h2 class="${CX.h2}">${escapeHtml(data.heading)}</h2>` : ""}
    ${data.body ? `<p class="${cx(CX.body, "mt-4 whitespace-pre-line")}">${escapeHtml(data.body)}</p>` : ""}
    ${data.ctaLabel ? `<a href="${escapeAttr(resolveHref(data.ctaLink, ctx.locale, ctx.linkBase))}" class="${cx(CX.button, CX.buttonOutline, "mt-6")}">${escapeHtml(data.ctaLabel)}</a>` : ""}
  `;

  return `
<section class="${CX.section}">
  <div class="${CX.container}">
    <div class="grid items-center gap-12 lg:grid-cols-2">
      <div class="${imageFirst ? "lg:order-1" : "lg:order-2"}">${imageHtml}</div>
      <div class="${imageFirst ? "lg:order-2" : "lg:order-1"}">${textHtml}</div>
    </div>
  </div>
</section>`;
}
