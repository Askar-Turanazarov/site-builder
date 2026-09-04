"use client";

import { useActionState } from "react";
import type { BlockDataOf } from "../types";
import type { Locale } from "../context";
import { CX, cx } from "../classes";
import { submitContactAction, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { success: false };

/**
 * The interactive part of the contact-form block, split out from
 * ContactForm.tsx so only plain serializable props (never the RenderContext
 * object, which carries a `t` function) cross the server/client boundary —
 * Next.js rejects functions passed as props to a Client Component.
 */
export function ContactFormClient({
  data,
  locale,
  pageSlug,
}: {
  data: BlockDataOf<"contactForm">;
  locale: Locale;
  pageSlug: string | null;
}) {
  const [state, formAction, pending] = useActionState(submitContactAction, initialState);

  if (data.fields.length === 0) return null;
  const labels = data.fields.map((f) => f.label);

  return (
    <section className={CX.section}>
      <div className={CX.containerNarrow}>
        {data.heading && <h2 className={cx(CX.h2, "mb-8")}>{data.heading}</h2>}

        {state.success ? (
          <p
            className="rounded-[var(--tpl-radius)] px-5 py-4 text-sm"
            style={{ background: "var(--tpl-accent)", color: "var(--tpl-on-accent)" }}
          >
            {data.successMessage || "Спасибо! Мы скоро свяжемся с вами."}
          </p>
        ) : (
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="__locale" value={locale} />
            <input type="hidden" name="__pageSlug" value={pageSlug ?? ""} />
            <input type="hidden" name="__labels" value={JSON.stringify(labels)} />
            <input type="text" name="__hp" tabIndex={-1} autoComplete="off" className="hidden" />

            {data.fields.map((field, i) => (
              <div key={i}>
                <label className="mb-1.5 block text-sm font-medium text-[var(--tpl-ink)]">
                  {field.label}
                  {field.required && <span style={{ color: "var(--tpl-accent)" }}> *</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    name={`field_${i}`}
                    required={field.required}
                    rows={4}
                    className="w-full rounded-[var(--tpl-radius)] border border-[var(--tpl-ink)]/15 bg-[var(--tpl-surface)] px-4 py-2.5 text-sm text-[var(--tpl-ink)] outline-none focus:border-[var(--tpl-accent)]"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={`field_${i}`}
                    required={field.required}
                    className="w-full rounded-[var(--tpl-radius)] border border-[var(--tpl-ink)]/15 bg-[var(--tpl-surface)] px-4 py-2.5 text-sm text-[var(--tpl-ink)] outline-none focus:border-[var(--tpl-accent)]"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={pending}
              className={cx(CX.button, CX.buttonSolid, "disabled:opacity-60")}
            >
              {pending ? "…" : data.submitLabel || "Отправить"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
