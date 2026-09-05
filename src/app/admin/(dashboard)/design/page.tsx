import { getSiteSettings } from "@/lib/site-settings";
import { siteDesignFromSettings } from "@/lib/site-design";
import { DesignForm } from "./DesignForm";
import { getAdminT } from "@/lib/admin-i18n/server";

export default async function DesignPage() {
  const t = await getAdminT();
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-8 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">{t("design.title")}</h1>
      <p className="mt-1 text-sm text-muted">{t("design.subtitle")}</p>
      <div className="mt-6">
        <DesignForm initial={siteDesignFromSettings(settings)} />
      </div>
    </div>
  );
}
