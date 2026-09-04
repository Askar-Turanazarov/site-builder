import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { resolveMedia } from "../context";
import { CX } from "../classes";
import { escapeHtml, escapeAttr } from "./escape";

export function galleryToHtml(data: BlockDataOf<"gallery">, ctx: RenderContext): string {
  const items = data.items
    .map((item) => ({ item, media: resolveMedia(ctx, item.imageMediaId) }))
    .filter((x) => x.media);
  if (items.length === 0) return "";

  const cards = items
    .map(
      ({ item, media }) => `
      <figure class="group overflow-hidden rounded-[var(--tpl-radius)]">
        <div class="aspect-[4/3] overflow-hidden">
          <img src="${escapeAttr(media!.url)}" alt="${escapeAttr(media!.alt || item.caption)}" class="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        </div>
        ${item.caption ? `<figcaption class="mt-2 text-sm text-[var(--tpl-ink-soft)]">${escapeHtml(item.caption)}</figcaption>` : ""}
      </figure>`,
    )
    .join("\n");

  return `
<section class="${CX.section}">
  <div class="${CX.container}">
    <div class="${CX.gridCols[data.columns]}">
      ${cards}
    </div>
  </div>
</section>`;
}
