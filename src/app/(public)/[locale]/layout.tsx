import { notFound } from "next/navigation";
import { LOCALES, type Locale } from "@/blocks/context";
import { SiteFrame } from "@/components/site/SiteFrame";

export default async function PublicLocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!LOCALES.includes(rawLocale as Locale)) notFound();

  return <SiteFrame locale={rawLocale as Locale}>{children}</SiteFrame>;
}
