import type { BlockDataOf } from "../types";
import { CX } from "../classes";

export function RichTextBlock({ data }: { data: BlockDataOf<"richText"> }) {
  if (!data.html) return null;
  return (
    <section className={CX.section}>
      <div className={CX.containerNarrow}>
        <div
          className="prose-content"
          style={{ color: "var(--tpl-ink-soft)" }}
          dangerouslySetInnerHTML={{ __html: data.html }}
        />
      </div>
    </section>
  );
}
