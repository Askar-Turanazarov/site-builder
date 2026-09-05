import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { resolveMedia } from "../context";
import { resolveHref } from "../links";
import { CX, cx } from "../classes";

export function LogosStripBlock({
  data,
  ctx,
}: {
  data: BlockDataOf<"logosStrip">;
  ctx: RenderContext;
}) {
  const logos = data.logos.map((logo) => ({ logo, media: resolveMedia(ctx, logo.imageMediaId) }));
  if (logos.length === 0) return null;

  return (
    <section className={cx(CX.section, "py-12 md:py-16")}>
      <div className={CX.container}>
        {data.heading && (
          <p className={cx(CX.eyebrow, "mb-8 text-center")}>{data.heading}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70 grayscale">
          {logos.map(({ logo, media }, i) =>
            media ? (
              logo.link ? (
                <a key={i} href={resolveHref(logo.link, ctx.locale, ctx.linkBase)} className="h-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={media.url} alt={media.alt} className="h-8 w-auto object-contain" />
                </a>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={media.url} alt={media.alt} className="h-8 w-auto object-contain" />
              )
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}
