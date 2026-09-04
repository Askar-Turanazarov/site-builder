import type { BlockDataOf } from "../types";
import { CX, cx } from "../classes";
import { FEATURE_ICONS } from "../icons";
import { escapeHtml } from "./escape";

export function featuresGridToHtml(data: BlockDataOf<"featuresGrid">): string {
  if (data.items.length === 0) return "";

  const heading = data.heading
    ? `<h2 class="${cx(CX.h2, "mb-10 max-w-2xl")}">${escapeHtml(data.heading)}</h2>`
    : "";

  const cards = data.items
    .map((feature) => {
      const icon = FEATURE_ICONS[feature.icon] ?? FEATURE_ICONS.spark;
      return `
      <div>
        <span class="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[var(--tpl-radius)]" style="background:var(--tpl-accent);color:var(--tpl-on-accent)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-[22px] w-[22px]">${icon}</svg>
        </span>
        ${feature.title ? `<h3 class="${CX.h3}">${escapeHtml(feature.title)}</h3>` : ""}
        ${feature.body ? `<p class="${cx(CX.body, "mt-2")}">${escapeHtml(feature.body)}</p>` : ""}
      </div>`;
    })
    .join("\n");

  return `
<section class="${CX.section}">
  <div class="${CX.container}">
    ${heading}
    <div class="${CX.gridCols[data.columns]}">
      ${cards}
    </div>
  </div>
</section>`;
}
