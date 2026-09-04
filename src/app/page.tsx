import { redirect } from "next/navigation";
import { getSiteSettings } from "@/lib/site-settings";

export default async function RootPage() {
  const settings = await getSiteSettings();
  redirect(`/${settings.defaultLocale}`);
}
