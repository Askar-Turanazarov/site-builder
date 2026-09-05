import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { resolveHref } from "../links";
import { CX, cx } from "../classes";

export function CtaBlock({ data, ctx }: { data: BlockDataOf<"cta">; ctx: RenderContext }) {
  if (!data.heading && !data.body) return null;
  const solid = data.style === "solid";

  return (
    <section className={CX.section}>
      <div className={CX.container}>
        <div
          className={cx(
            "sb-cta flex flex-col items-start gap-6 rounded-[var(--tpl-radius)] px-8 py-12 sm:flex-row sm:items-center sm:justify-between",
            solid ? "bg-[var(--tpl-accent)]" : "border border-[var(--tpl-ink)]/15",
          )}
        >
          <div>
            {data.heading && (
              <h2
                className={cx(CX.h2, solid && "text-[var(--tpl-on-accent)]")}
              >
                {data.heading}
              </h2>
            )}
            {data.body && (
              <p
                className={cx(
                  "mt-2 max-w-xl text-base",
                  solid ? "text-[var(--tpl-on-accent)]/85" : "text-[var(--tpl-ink-soft)]",
                )}
              >
                {data.body}
              </p>
            )}
          </div>
          {data.buttonLabel && (
            <a
              href={resolveHref(data.buttonLink, ctx.locale, ctx.linkBase)}
              className={cx(
                CX.button,
                "shrink-0",
                solid
                  ? "bg-[var(--tpl-surface)] text-[var(--tpl-ink)] hover:opacity-90"
                  : cx(CX.buttonSolid),
              )}
            >
              {data.buttonLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
