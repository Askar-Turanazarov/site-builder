import type { BlockDataOf } from "../types";
import { CX } from "../classes";

export function richTextToHtml(data: BlockDataOf<"richText">): string {
  if (!data.html) return "";
  return `
<section class="${CX.section}">
  <div class="${CX.containerNarrow}">
    <div class="prose-content" style="color:var(--tpl-ink-soft)">${data.html}</div>
  </div>
</section>`;
}
