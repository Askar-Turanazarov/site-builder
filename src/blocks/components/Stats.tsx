import type { BlockDataOf } from "../types";
import { CX } from "../classes";

export function StatsBlock({ data }: { data: BlockDataOf<"stats"> }) {
  if (data.items.length === 0) return null;

  return (
    <section className={CX.section}>
      <div className={CX.container}>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {data.items.map((stat, i) => (
            <div key={i} className="text-center sm:text-left">
              {stat.value && (
                <div className="text-4xl font-extrabold tabular-nums text-[var(--tpl-accent)] [font-family:var(--tpl-font-display)] md:text-5xl">
                  {stat.value}
                </div>
              )}
              {stat.label && (
                <div className="mt-2 text-sm text-[var(--tpl-ink-soft)]">{stat.label}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
