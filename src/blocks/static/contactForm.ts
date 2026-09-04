import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { CX, cx } from "../classes";
import { escapeHtml, escapeAttr } from "./escape";

/**
 * The exported static site has no backend. If SiteSettings.contactFormAction
 * (an external form endpoint, e.g. Formspree) is set we POST there; otherwise
 * we fall back to the `mailto:` + text/plain enctype trick, which opens the
 * visitor's email client pre-filled — a known limitation, surfaced to the
 * admin in the export screen rather than silently producing a dead form.
 */
export function contactFormToHtml(data: BlockDataOf<"contactForm">, ctx: RenderContext): string {
  if (data.fields.length === 0) return "";

  const heading = data.heading ? `<h2 class="${cx(CX.h2, "mb-8")}">${escapeHtml(data.heading)}</h2>` : "";

  const actionAttrs = ctx.contactFormAction
    ? `action="${escapeAttr(ctx.contactFormAction)}" method="post"`
    : ctx.contactEmail
      ? `action="mailto:${escapeAttr(ctx.contactEmail)}" method="post" enctype="text/plain"`
      : `action="#" method="post"`;

  const fields = data.fields
    .map((field, i) => {
      const control =
        field.type === "textarea"
          ? `<textarea name="field_${i}" rows="4" ${field.required ? "required" : ""} class="w-full rounded-[var(--tpl-radius)] border border-[var(--tpl-ink)]/15 bg-[var(--tpl-surface)] px-4 py-2.5 text-sm text-[var(--tpl-ink)] outline-none focus:border-[var(--tpl-accent)]"></textarea>`
          : `<input type="${field.type}" name="field_${i}" ${field.required ? "required" : ""} class="w-full rounded-[var(--tpl-radius)] border border-[var(--tpl-ink)]/15 bg-[var(--tpl-surface)] px-4 py-2.5 text-sm text-[var(--tpl-ink)] outline-none focus:border-[var(--tpl-accent)]" />`;
      return `
      <div>
        <label class="mb-1.5 block text-sm font-medium text-[var(--tpl-ink)]">${escapeHtml(field.label)}${field.required ? ` <span style="color:var(--tpl-accent)">*</span>` : ""}</label>
        ${control}
      </div>`;
    })
    .join("\n");

  return `
<section class="${CX.section}">
  <div class="${CX.containerNarrow}">
    ${heading}
    <form ${actionAttrs} class="space-y-4">
      ${fields}
      <button type="submit" class="${cx(CX.button, CX.buttonSolid)}">${escapeHtml(data.submitLabel || "Отправить")}</button>
    </form>
  </div>
</section>`;
}
