import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { resolveMedia } from "../context";
import { CX, cx } from "../classes";
import { escapeHtml, escapeAttr } from "./escape";

export function teamToHtml(data: BlockDataOf<"team">, ctx: RenderContext): string {
  if (data.members.length === 0) return "";

  const heading = data.heading ? `<h2 class="${cx(CX.h2, "mb-10")}">${escapeHtml(data.heading)}</h2>` : "";

  const cards = data.members
    .map((member) => {
      const photo = resolveMedia(ctx, member.photoMediaId);
      const photoHtml = photo
        ? `<img src="${escapeAttr(photo.url)}" alt="${escapeAttr(photo.alt)}" class="h-full w-full object-cover" />`
        : "";
      return `
      <div>
        <div class="sb-team-photo aspect-square overflow-hidden rounded-[var(--tpl-radius)] bg-[var(--tpl-surface)]">${photoHtml}</div>
        ${member.name ? `<div class="mt-3 text-sm font-semibold text-[var(--tpl-ink)]">${escapeHtml(member.name)}</div>` : ""}
        ${member.role ? `<div class="text-xs text-[var(--tpl-ink-soft)]">${escapeHtml(member.role)}</div>` : ""}
        ${member.bio ? `<p class="mt-2 text-sm text-[var(--tpl-ink-soft)]">${escapeHtml(member.bio)}</p>` : ""}
      </div>`;
    })
    .join("\n");

  return `
<section class="${CX.section}">
  <div class="${CX.container}">
    ${heading}
    <div class="${CX.gridCols[4]}">
      ${cards}
    </div>
  </div>
</section>`;
}
