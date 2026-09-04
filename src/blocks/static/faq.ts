import type { BlockDataOf } from "../types";
import { CX, cx } from "../classes";
import { escapeHtml } from "./escape";

export function faqToHtml(data: BlockDataOf<"faq">): string {
  if (data.items.length === 0) return "";

  const heading = data.heading ? `<h2 class="${cx(CX.h2, "mb-8")}">${escapeHtml(data.heading)}</h2>` : "";

  const items = data.items
    .map(
      (faq) => `
      <details class="group py-5">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--tpl-ink)]">
          ${escapeHtml(faq.question)}
          <svg viewBox="0 0 20 20" class="h-4 w-4 shrink-0 transition-transform group-open:rotate-45" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 4v12M4 10h12" stroke-linecap="round"/></svg>
        </summary>
        ${faq.answer ? `<div class="prose-content mt-3 text-sm" style="color:var(--tpl-ink-soft)">${faq.answer}</div>` : ""}
      </details>`,
    )
    .join("\n");

  return `
<section class="${CX.section}">
  <div class="${CX.containerNarrow}">
    ${heading}
    <div class="divide-y divide-[var(--tpl-ink)]/10 border-t border-b border-[var(--tpl-ink)]/10">
      ${items}
    </div>
  </div>
</section>`;
}
