import type { BlockDataOf } from "../types";
import { CX } from "../classes";
import { toEmbedUrl } from "../video";

export function VideoEmbedBlock({ data }: { data: BlockDataOf<"videoEmbed"> }) {
  const embedUrl = data.url ? toEmbedUrl(data.url) : null;
  if (!embedUrl) return null;

  return (
    <section className={CX.section}>
      <div className={CX.container}>
        <div className="aspect-video overflow-hidden rounded-[var(--tpl-radius)]">
          <iframe
            src={embedUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {data.caption && (
          <p className="mt-3 text-sm text-[var(--tpl-ink-soft)]">{data.caption}</p>
        )}
      </div>
    </section>
  );
}
