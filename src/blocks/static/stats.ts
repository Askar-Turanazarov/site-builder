import type { BlockDataOf } from "../types";
import { CX } from "../classes";
import { escapeHtml } from "./escape";

export function statsToHtml(data: BlockDataOf<"stats">): string {
  if (data.items.length === 0) return "";

  const items = data.items
    .map(
      (stat) => `
      <div class="text-center sm:text-left">
        ${stat.value ? `<div class="text-4xl font-extrabold tabular-nums text-[var(--tpl-accent)] [font-family:var(--tpl-font-display)] md:text-5xl">${escapeHtml(stat.value)}</div>` : ""}
        ${stat.label ? `<div class="mt-2 text-sm text-[var(--tpl-ink-soft)]">${escapeHtml(stat.label)}</div>` : ""}
      </div>`,
    )
    .join("\n");

  return `
<section class="${CX.section}">
  <div class="${CX.container}">
    <div class="grid grid-cols-2 gap-8 sm:grid-cols-4">
      ${items}
    </div>
  </div>
</section>`;
}
