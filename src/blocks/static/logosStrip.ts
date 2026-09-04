import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { resolveMedia } from "../context";
import { resolveHref } from "../links";
import { CX, cx } from "../classes";
import { escapeHtml, escapeAttr } from "./escape";

export function logosStripToHtml(data: BlockDataOf<"logosStrip">, ctx: RenderContext): string {
  const logos = data.logos
    .map((logo) => ({ logo, media: resolveMedia(ctx, logo.imageMediaId) }))
    .filter((x) => x.media);
  if (logos.length === 0) return "";

  const heading = data.heading
    ? `<p class="${cx(CX.eyebrow, "mb-8 text-center")}">${escapeHtml(data.heading)}</p>`
    : "";

  const items = logos
    .map(({ logo, media }) => {
      const img = `<img src="${escapeAttr(media!.url)}" alt="${escapeAttr(media!.alt)}" class="h-8 w-auto object-contain" />`;
      return logo.link ? `<a href="${escapeAttr(resolveHref(logo.link, ctx.locale))}" class="h-8">${img}</a>` : img;
    })
    .join("\n");

  return `
<section class="${cx(CX.section, "py-12 md:py-16")}">
  <div class="${CX.container}">
    ${heading}
    <div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70 grayscale">
      ${items}
    </div>
  </div>
</section>`;
}
