import { getSiteSettings } from "@/lib/site-settings";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-8 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">Настройки сайта</h1>
      <p className="mt-1 text-sm text-muted">Общие параметры, контакты и внешний вид публичного сайта.</p>
      <div className="mt-6">
        <SettingsForm
          initial={{
            siteNameRu: settings.siteNameRu,
            siteNameUz: settings.siteNameUz,
            siteNameEn: settings.siteNameEn,
            taglineRu: settings.taglineRu ?? "",
            taglineUz: settings.taglineUz ?? "",
            taglineEn: settings.taglineEn ?? "",
            defaultLocale: settings.defaultLocale,
            themeKey: settings.themeKey,
            logoMediaId: settings.logoMediaId,
            faviconMediaId: settings.faviconMediaId,
            contactEmail: settings.contactEmail ?? "",
            contactPhone: settings.contactPhone ?? "",
            contactAddressRu: settings.contactAddressRu ?? "",
            contactAddressUz: settings.contactAddressUz ?? "",
            contactAddressEn: settings.contactAddressEn ?? "",
            contactFormAction: settings.contactFormAction ?? "",
            footerNoteRu: settings.footerNoteRu ?? "",
            footerNoteUz: settings.footerNoteUz ?? "",
            footerNoteEn: settings.footerNoteEn ?? "",
          }}
        />
      </div>
    </div>
  );
}
