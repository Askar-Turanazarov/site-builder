import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { resolveMedia } from "../context";
import { resolveHref } from "../links";
import { CX, cx } from "../classes";

export function ImageTextBlock({
  data,
  ctx,
}: {
  data: BlockDataOf<"imageText">;
  ctx: RenderContext;
}) {
  const media = resolveMedia(ctx, data.imageMediaId);
  const imageFirst = data.imageSide === "left";

  return (
    <section className={CX.section}>
      <div className={CX.container}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className={cx(imageFirst ? "lg:order-1" : "lg:order-2")}>
            {media && (
              <div className="aspect-[4/3] overflow-hidden rounded-[var(--tpl-radius)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={media.url} alt={media.alt} className="h-full w-full object-cover" />
              </div>
            )}
          </div>
          <div className={cx(imageFirst ? "lg:order-2" : "lg:order-1")}>
            {data.heading && <h2 className={CX.h2}>{data.heading}</h2>}
            {data.body && <p className={cx(CX.body, "mt-4 whitespace-pre-line")}>{data.body}</p>}
            {data.ctaLabel && (
              <a href={resolveHref(data.ctaLink, ctx.locale)} className={cx(CX.button, CX.buttonOutline, "mt-6")}>
                {data.ctaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
