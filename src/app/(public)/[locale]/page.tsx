import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { LOCALES, type Locale } from "@/blocks/context";
import { parseBlocks } from "@/blocks/types";
import { BlockList } from "@/blocks/registry";
import { buildRenderContext } from "@/lib/render-context";
import { localeField } from "@/lib/locale-field";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!LOCALES.includes(rawLocale as Locale)) return {};
  const locale = rawLocale as Locale;
  const page = await prisma.page.findFirst({ where: { isHomepage: true, status: "published" } });
  if (!page) return {};
  return {
    title: localeField(page, "title", locale),
    description: localeField(page, "metaDesc", locale) || undefined,
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!LOCALES.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;

  const page = await prisma.page.findFirst({ where: { isHomepage: true, status: "published" } });
  if (!page) notFound();

  const blocks = parseBlocks(localeField(page, "blocks", locale));
  const ctx = await buildRenderContext(locale, page.slug);

  return <BlockList blocks={blocks} ctx={ctx} />;
}
