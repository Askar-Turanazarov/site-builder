import type { BlockDataOf } from "../types";
import type { RenderContext } from "../context";
import { ContactFormClient } from "./ContactFormClient";

/**
 * Server-side wrapper: unpacks only plain serializable fields (locale,
 * pageSlug) from RenderContext before handing off to the "use client"
 * form — RenderContext itself carries a `t` function and can't cross the
 * server/client boundary as a prop.
 */
export function ContactFormBlock({
  data,
  ctx,
}: {
  data: BlockDataOf<"contactForm">;
  ctx: RenderContext;
}) {
  return <ContactFormClient data={data} locale={ctx.locale} pageSlug={ctx.pageSlug ?? null} />;
}
