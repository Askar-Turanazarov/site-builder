import type { BlockDataOf } from "../types";
import { CX, cx } from "../classes";

export function FaqBlock({ data }: { data: BlockDataOf<"faq"> }) {
  if (data.items.length === 0) return null;

  return (
    <section className={CX.section}>
      <div className={CX.containerNarrow}>
        {data.heading && <h2 className={cx(CX.h2, "mb-8")}>{data.heading}</h2>}
        <div className="divide-y divide-[var(--tpl-ink)]/10 border-t border-b border-[var(--tpl-ink)]/10">
          {data.items.map((faq, i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--tpl-ink)]">
                {faq.question}
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4 shrink-0 transition-transform group-open:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                </svg>
              </summary>
              {faq.answer && (
                <div
                  className="prose-content mt-3 text-sm"
                  style={{ color: "var(--tpl-ink-soft)" }}
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
