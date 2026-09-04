import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { resolveMedia } from "../context";
import { resolveHref } from "../links";
import { CX, cx } from "../classes";
import { escapeHtml, escapeAttr } from "./escape";

export function heroToHtml(data: BlockDataOf<"hero">, ctx: RenderContext): string {
  const media = resolveMedia(ctx, data.imageMediaId);
  const isFullBleed = data.variant === "fullBleed";
  const isCentered = data.variant === "centered";
  const isSplit = data.variant === "split";

  const heading = data.heading
    ? `<h1 class="${cx(CX.h1, isFullBleed && "text-white")}">${escapeHtml(data.heading)}</h1>`
    : "";
  const subheading = data.subheading
    ? `<p class="${cx(CX.lead, "mt-5", isFullBleed && "text-white/85", isCentered && "mx-auto")}">${escapeHtml(data.subheading)}</p>`
    : "";
  const cta = data.ctaLabel
    ? `<div class="${cx("mt-8", isCentered && "flex justify-center")}"><a href="${escapeAttr(resolveHref(data.ctaLink, ctx.locale))}" class="${cx(CX.button, CX.buttonSolid)}">${escapeHtml(data.ctaLabel)}</a></div>`
    : "";

  const media_ = isSplit && media
    ? `<div class="overflow-hidden rounded-[var(--tpl-radius)]"><img src="${escapeAttr(media.url)}" alt="${escapeAttr(media.alt)}" class="h-full w-full object-cover" /></div>`
    : "";

  const background = isFullBleed && media
    ? `<img src="${escapeAttr(media.url)}" alt="${escapeAttr(media.alt)}" class="absolute inset-0 h-full w-full object-cover" /><div class="absolute inset-0 bg-[var(--tpl-ink)]" style="opacity:${data.overlayOpacity}"></div>`
    : "";

  return `
<section class="${cx("relative overflow-hidden bg-[var(--tpl-paper)]", isFullBleed ? "flex min-h-[520px] items-end" : CX.section)}">
  ${background}
  <div class="${cx(CX.container, "relative", isFullBleed && "pt-40 pb-16")}">
    <div class="${cx(isCentered && "mx-auto max-w-3xl text-center", isSplit && "grid items-center gap-12 lg:grid-cols-2")}">
      <div>
        ${heading}
        ${subheading}
        ${cta}
      </div>
      ${media_}
    </div>
  </div>
</section>`;
}
