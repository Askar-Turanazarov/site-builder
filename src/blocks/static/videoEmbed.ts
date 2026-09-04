import type { BlockDataOf } from "../types";
import { CX } from "../classes";
import { toEmbedUrl } from "../video";
import { escapeHtml, escapeAttr } from "./escape";

export function videoEmbedToHtml(data: BlockDataOf<"videoEmbed">): string {
  const embedUrl = data.url ? toEmbedUrl(data.url) : null;
  if (!embedUrl) return "";

  return `
<section class="${CX.section}">
  <div class="${CX.container}">
    <div class="aspect-video overflow-hidden rounded-[var(--tpl-radius)]">
      <iframe src="${escapeAttr(embedUrl)}" class="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    ${data.caption ? `<p class="mt-3 text-sm text-[var(--tpl-ink-soft)]">${escapeHtml(data.caption)}</p>` : ""}
  </div>
</section>`;
}
