import type { BlockDataOf } from "../types";
import { CX, cx } from "../classes";
import { FEATURE_ICONS } from "../icons";

export function FeaturesGridBlock({ data }: { data: BlockDataOf<"featuresGrid"> }) {
  if (data.items.length === 0) return null;

  return (
    <section className={CX.section}>
      <div className={CX.container}>
        {data.heading && (
          <h2 className={cx(CX.h2, "mb-10 max-w-2xl")}>{data.heading}</h2>
        )}
        <div className={CX.gridCols[data.columns]}>
          {data.items.map((feature, i) => (
            <div key={i}>
              <span
                className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[var(--tpl-radius)]"
                style={{ background: "var(--tpl-accent)", color: "var(--tpl-on-accent)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[22px] w-[22px]"
                  dangerouslySetInnerHTML={{ __html: FEATURE_ICONS[feature.icon] ?? FEATURE_ICONS.spark }}
                />
              </span>
              {feature.title && <h3 className={CX.h3}>{feature.title}</h3>}
              {feature.body && <p className={cx(CX.body, "mt-2")}>{feature.body}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
