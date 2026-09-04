import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { resolveMedia } from "../context";
import { CX, cx } from "../classes";

export function TeamBlock({ data, ctx }: { data: BlockDataOf<"team">; ctx: RenderContext }) {
  if (data.members.length === 0) return null;

  return (
    <section className={CX.section}>
      <div className={CX.container}>
        {data.heading && <h2 className={cx(CX.h2, "mb-10")}>{data.heading}</h2>}
        <div className={CX.gridCols[4]}>
          {data.members.map((member, i) => {
            const photo = resolveMedia(ctx, member.photoMediaId);
            return (
              <div key={i}>
                <div className="aspect-square overflow-hidden rounded-[var(--tpl-radius)] bg-[var(--tpl-surface)]">
                  {photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                {member.name && (
                  <div className="mt-3 text-sm font-semibold text-[var(--tpl-ink)]">
                    {member.name}
                  </div>
                )}
                {member.role && (
                  <div className="text-xs text-[var(--tpl-ink-soft)]">{member.role}</div>
                )}
                {member.bio && (
                  <p className="mt-2 text-sm text-[var(--tpl-ink-soft)]">{member.bio}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
