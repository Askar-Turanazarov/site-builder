import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { getPortalLocale } from "@/lib/portal-i18n/server";
import { getSiteTemplate } from "@/lib/site-templates";
import { demoHref } from "@/lib/site-templates/demo";

/** /demo/<ключ> — открываем демонстрацию на языке, выбранном на портале. */
export default async function TemplateDemoEntry({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!getSiteTemplate(key)) notFound();
  redirect(demoHref(key, await getPortalLocale()));
}
