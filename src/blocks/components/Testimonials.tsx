import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { resolveMedia } from "../context";
import { CX, cx } from "../classes";

export function TestimonialsBlock({
  data,
  ctx,
}: {
  data: BlockDataOf<"testimonials">;
  ctx: RenderContext;
}) {
  if (data.items.length === 0) return null;

  return (
    <section className={CX.section}>
      <div className={CX.container}>
        {data.heading && <h2 className={cx(CX.h2, "mb-10")}>{data.heading}</h2>}
        <div className={CX.gridCols[3]}>
          {data.items.map((testimonial, i) => {
            const avatar = resolveMedia(ctx, testimonial.avatarMediaId);
            return (
              <figure key={i} className={CX.card}>
                <span
                  className="mb-3 block text-4xl leading-none [font-family:var(--tpl-font-display)]"
                  style={{ color: "var(--tpl-accent)" }}
                  aria-hidden
                >
                  “
                </span>
                {testimonial.quote && (
                  <blockquote className="text-[15px] leading-relaxed text-[var(--tpl-ink-soft)]">
                    {testimonial.quote}
                  </blockquote>
                )}
                <figcaption className="mt-5 flex items-center gap-3">
                  {avatar && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatar.url}
                      alt={avatar.alt}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    {testimonial.authorName && (
                      <div className="text-sm font-semibold text-[var(--tpl-ink)]">
                        {testimonial.authorName}
                      </div>
                    )}
                    {testimonial.authorRole && (
                      <div className="text-xs text-[var(--tpl-ink-soft)]">
                        {testimonial.authorRole}
                      </div>
                    )}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
