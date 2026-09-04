import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { resolveMedia } from "../context";
import { CX } from "../classes";

export function GalleryBlock({
  data,
  ctx,
}: {
  data: BlockDataOf<"gallery">;
  ctx: RenderContext;
}) {
  const items = data.items.map((item) => ({ item, media: resolveMedia(ctx, item.imageMediaId) }));
  if (items.length === 0) return null;

  return (
    <section className={CX.section}>
      <div className={CX.container}>
        <div className={CX.gridCols[data.columns]}>
          {items.map(({ item, media }, i) =>
            media ? (
              <figure key={i} className="group overflow-hidden rounded-[var(--tpl-radius)]">
                <div className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={media.url}
                    alt={media.alt || item.caption}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                {item.caption && (
                  <figcaption className="mt-2 text-sm text-[var(--tpl-ink-soft)]">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}
