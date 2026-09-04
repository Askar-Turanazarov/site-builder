"use client";

import { useState, useTransition } from "react";
import type { Locale } from "@/blocks/context";
import { THEME_KEYS, THEME_LABELS, type ThemeKey } from "@/blocks/palette";
import { LocalizedTextInput } from "@/components/admin/editor/TitleFields";
import { MediaPickerField } from "@/components/admin/editor/MediaPickerField";
import { updateSiteSettingsAction, type SiteSettingsInput } from "@/lib/actions/settings";

export interface SettingsInitial {
  siteNameRu: string;
  siteNameUz: string;
  siteNameEn: string;
  taglineRu: string;
  taglineUz: string;
  taglineEn: string;
  defaultLocale: string;
  themeKey: string;
  logoMediaId: string | null;
  faviconMediaId: string | null;
  contactEmail: string;
  contactPhone: string;
  contactAddressRu: string;
  contactAddressUz: string;
  contactAddressEn: string;
  contactFormAction: string;
  footerNoteRu: string;
  footerNoteUz: string;
  footerNoteEn: string;
}

export function SettingsForm({ initial }: { initial: SettingsInitial }) {
  const [siteName, setSiteName] = useState<Record<Locale, string>>({ ru: initial.siteNameRu, uz: initial.siteNameUz, en: initial.siteNameEn });
  const [tagline, setTagline] = useState<Record<Locale, string>>({ ru: initial.taglineRu, uz: initial.taglineUz, en: initial.taglineEn });
  const [contactAddress, setContactAddress] = useState<Record<Locale, string>>({ ru: initial.contactAddressRu, uz: initial.contactAddressUz, en: initial.contactAddressEn });
  const [footerNote, setFooterNote] = useState<Record<Locale, string>>({ ru: initial.footerNoteRu, uz: initial.footerNoteUz, en: initial.footerNoteEn });
  const [defaultLocale, setDefaultLocale] = useState(initial.defaultLocale);
  const [themeKey, setThemeKey] = useState<ThemeKey>((initial.themeKey as ThemeKey) || "business");
  const [logoMediaId, setLogoMediaId] = useState<string | null>(initial.logoMediaId);
  const [faviconMediaId, setFaviconMediaId] = useState<string | null>(initial.faviconMediaId);
  const [contactEmail, setContactEmail] = useState(initial.contactEmail);
  const [contactPhone, setContactPhone] = useState(initial.contactPhone);
  const [contactFormAction, setContactFormAction] = useState(initial.contactFormAction);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSave() {
    const input: SiteSettingsInput = {
      siteNameRu: siteName.ru,
      siteNameUz: siteName.uz,
      siteNameEn: siteName.en,
      taglineRu: tagline.ru,
      taglineUz: tagline.uz,
      taglineEn: tagline.en,
      defaultLocale,
      themeKey,
      logoMediaId,
      faviconMediaId,
      contactEmail,
      contactPhone,
      contactAddressRu: contactAddress.ru,
      contactAddressUz: contactAddress.uz,
      contactAddressEn: contactAddress.en,
      contactFormAction,
      footerNoteRu: footerNote.ru,
      footerNoteUz: footerNote.uz,
      footerNoteEn: footerNote.en,
    };
    startTransition(async () => {
      await updateSiteSettingsAction(input);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="space-y-6">
      <Section title="Основное">
        <LocalizedTextInput label="Название сайта" values={siteName} onChange={(l, v) => setSiteName((s) => ({ ...s, [l]: v }))} />
        <LocalizedTextInput label="Слоган" values={tagline} onChange={(l, v) => setTagline((s) => ({ ...s, [l]: v }))} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">Язык по умолчанию</label>
            <select value={defaultLocale} onChange={(e) => setDefaultLocale(e.target.value)} className="w-full rounded-md border border-border bg-paper px-3 py-2 text-sm outline-none focus:border-accent">
              <option value="ru">Русский</option>
              <option value="uz">Oʻzbekcha</option>
              <option value="en">English</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">Визуальная тема сайта</label>
            <select value={themeKey} onChange={(e) => setThemeKey(e.target.value as ThemeKey)} className="w-full rounded-md border border-border bg-paper px-3 py-2 text-sm outline-none focus:border-accent">
              {THEME_KEYS.map((key) => (
                <option key={key} value={key}>
                  {THEME_LABELS[key]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Section>

      <Section title="Логотип и favicon">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">Логотип</label>
            <MediaPickerField value={logoMediaId} onChange={setLogoMediaId} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">Favicon</label>
            <MediaPickerField value={faviconMediaId} onChange={setFaviconMediaId} />
          </div>
        </div>
      </Section>

      <Section title="Контакты">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">Email</label>
            <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full rounded-md border border-border bg-paper px-3 py-2 text-sm outline-none focus:border-accent" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">Телефон</label>
            <input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="w-full rounded-md border border-border bg-paper px-3 py-2 text-sm outline-none focus:border-accent" />
          </div>
        </div>
        <LocalizedTextInput label="Адрес" values={contactAddress} onChange={(l, v) => setContactAddress((s) => ({ ...s, [l]: v }))} />
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-muted">
            Внешний адрес для формы обратной связи (используется только в выгруженной статике)
          </label>
          <input
            value={contactFormAction}
            onChange={(e) => setContactFormAction(e.target.value)}
            placeholder="https://formspree.io/f/xxxxxx"
            className="w-full rounded-md border border-border bg-paper px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
      </Section>

      <Section title="Подвал сайта">
        <LocalizedTextInput label="Текст в подвале (копирайт и т.п.)" values={footerNote} onChange={(l, v) => setFooterNote((s) => ({ ...s, [l]: v }))} multiline />
      </Section>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={pending}
          onClick={handleSave}
          className="rounded-md bg-accent px-5 py-2 text-sm font-medium text-surface hover:bg-accent-strong disabled:opacity-60"
        >
          {pending ? "Сохранение…" : "Сохранить настройки"}
        </button>
        {saved && <span className="text-sm text-accent-strong">Сохранено ✓</span>}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <h2 className="mb-4 font-display text-base font-semibold text-ink">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
