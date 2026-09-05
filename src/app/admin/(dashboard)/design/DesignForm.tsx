"use client";

import { useState, useTransition } from "react";
import {
  BODY_FONTS,
  DISPLAY_FONTS,
  SKIN_KEYS,
  THEME_KEYS,
  THEME_PRESETS,
  googleFontsHref,
  themeStyleVars,
  type SiteDesign,
  type ThemeKey,
} from "@/blocks/palette";
import { updateSiteDesignAction } from "@/lib/actions/design";
import { useAdminT } from "@/components/admin/AdminI18nProvider";
import type { AdminDict } from "@/lib/admin-i18n";

const RADIUS_OPTIONS = [
  { value: "", key: "style.asTheme" },
  { value: "none", key: "style.radiusNone" },
  { value: "sm", key: "style.radiusSm" },
  { value: "md", key: "style.radiusMd" },
  { value: "lg", key: "style.radiusLg" },
  { value: "full", key: "style.radiusFull" },
] as const;

export function DesignForm({ initial }: { initial: SiteDesign }) {
  const t = useAdminT();
  const [themeKey, setThemeKey] = useState<ThemeKey>(
    (THEME_KEYS as readonly string[]).includes(initial.themeKey)
      ? (initial.themeKey as ThemeKey)
      : "business",
  );
  const [fontDisplay, setFontDisplay] = useState(initial.fontDisplay ?? "");
  const [fontBody, setFontBody] = useState(initial.fontBody ?? "");
  const [accentColor, setAccentColor] = useState(initial.accentColor ?? "");
  const [paperColor, setPaperColor] = useState(initial.paperColor ?? "");
  const [inkColor, setInkColor] = useState(initial.inkColor ?? "");
  const [radiusScale, setRadiusScale] = useState(initial.radiusScale ?? "");
  const [skinKey, setSkinKey] = useState(initial.skinKey ?? "");
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  const design: SiteDesign = {
    themeKey,
    skinKey: skinKey || null,
    fontDisplay: fontDisplay || null,
    fontBody: fontBody || null,
    accentColor: accentColor || null,
    paperColor: paperColor || null,
    inkColor: inkColor || null,
    radiusScale: radiusScale || null,
  };

  const fontsHref = googleFontsHref(design);

  function handleSave() {
    startTransition(async () => {
      await updateSiteDesignAction({
        themeKey,
        skinKey: skinKey || null,
        fontDisplay: fontDisplay || null,
        fontBody: fontBody || null,
        accentColor: accentColor || null,
        paperColor: paperColor || null,
        inkColor: inkColor || null,
        radiusScale: radiusScale || null,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  function handleReset() {
    setSkinKey("");
    setFontDisplay("");
    setFontBody("");
    setAccentColor("");
    setPaperColor("");
    setInkColor("");
    setRadiusScale("");
  }

  return (
    <div className="space-y-6">
      {fontsHref && <link rel="stylesheet" href={fontsHref} />}

      <Section title={t("design.theme")} hint={t("design.themeHint")}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {THEME_KEYS.map((key) => {
            const preset = THEME_PRESETS[key];
            const active = key === themeKey;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setThemeKey(key)}
                className={`rounded-lg border-2 p-3 text-left transition ${
                  active ? "border-accent bg-accent-tint" : "border-border bg-surface hover:border-accent/50"
                }`}
              >
                <div className="flex gap-1">
                  {[preset.paper, preset.ink, preset.accent].map((color) => (
                    <span
                      key={color}
                      className="h-5 w-5 rounded border border-border"
                      style={{ background: color }}
                    />
                  ))}
                </div>
                <div className="mt-2 text-xs font-medium text-ink">{t(`theme.${key}`)}</div>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title={t("design.skin")} hint={t("design.skinHint")}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {["", ...SKIN_KEYS].map((key) => {
            const active = key === skinKey;
            return (
              <button
                key={key || "none"}
                type="button"
                onClick={() => setSkinKey(key)}
                className={`rounded-lg border-2 p-2 text-left transition ${
                  active ? "border-accent bg-accent-tint" : "border-border bg-surface hover:border-accent/50"
                }`}
              >
                {/* Образец собран из тех же хуков, что и настоящие блоки, и
                    лежит под data-skin — поэтому показывает реальные различия
                    скруглений, рамок, теней и регистра, а не картинку. */}
                <div
                  style={themeStyleVars(design)}
                  data-skin={key || undefined}
                  className="overflow-hidden rounded bg-[var(--tpl-paper)] p-3"
                >
                  <div className="sb-h3 [font-family:var(--tpl-font-display)] text-[var(--tpl-ink)]">
                    Aa
                  </div>
                  <div
                    className="sb-card mt-2 text-[10px] leading-tight text-[var(--tpl-ink-soft)]"
                    style={{ padding: "0.4rem 0.5rem" }}
                  >
                    ————
                  </div>
                  <span className="sb-btn mt-2 inline-flex bg-[var(--tpl-accent)] px-3 py-1 text-[10px] text-[var(--tpl-on-accent)]">
                    Ok
                  </span>
                </div>
                <div className="mt-2 line-clamp-2 text-xs font-medium text-ink">
                  {t((key ? `skin.${key}` : "skin.none") as keyof AdminDict)}
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title={t("design.fonts")} hint={t("design.fontsHint")}>
        <div className="grid gap-4 sm:grid-cols-2">
          <FontSelect
            label={t("design.fontDisplay")}
            value={fontDisplay}
            options={DISPLAY_FONTS}
            onChange={setFontDisplay}
          />
          <FontSelect label={t("design.fontBody")} value={fontBody} options={BODY_FONTS} onChange={setFontBody} />
        </div>
      </Section>

      <Section title={t("design.colors")} hint={t("design.colorsHint")}>
        <div className="grid gap-4 sm:grid-cols-3">
          <ColorField label={t("design.accent")} value={accentColor} onChange={setAccentColor} />
          <ColorField label={t("design.paper")} value={paperColor} onChange={setPaperColor} />
          <ColorField label={t("design.ink")} value={inkColor} onChange={setInkColor} />
        </div>
        <div className="mt-4 max-w-xs">
          <label className="mb-1.5 block text-xs font-semibold text-muted">{t("design.radius")}</label>
          <select
            value={radiusScale}
            onChange={(e) => setRadiusScale(e.target.value)}
            className="w-full rounded-md border border-border bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent"
          >
            {RADIUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.key)}
              </option>
            ))}
          </select>
        </div>
      </Section>

      <Section title={t("design.previewTitle")} hint={t("design.previewHint")}>
        <div
          style={themeStyleVars(design)}
          data-skin={skinKey || undefined}
          className="rounded-lg border border-border bg-[var(--tpl-paper)] p-8"
        >
          <p className="text-sm font-semibold tracking-wide text-[var(--tpl-accent)] uppercase">
            {t("design.sampleEyebrow")}
          </p>
          <h3 className="mt-2 text-3xl font-bold [font-family:var(--tpl-font-display)] text-[var(--tpl-ink)]">
            {t("design.sampleHeading")}
          </h3>
          <p className="mt-2 max-w-lg [font-family:var(--tpl-font-body)] text-[var(--tpl-ink-soft)]">
            {t("design.sampleBody")}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-[var(--tpl-radius)] bg-[var(--tpl-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--tpl-on-accent)]">
              {t("design.samplePrimary")}
            </span>
            <span className="inline-flex rounded-[var(--tpl-radius)] border border-[var(--tpl-ink)]/20 px-5 py-2.5 text-sm font-semibold text-[var(--tpl-ink)]">
              {t("design.sampleSecondary")}
            </span>
            <span className="rounded-[var(--tpl-radius)] border border-[var(--tpl-ink)]/10 bg-[var(--tpl-surface)] px-4 py-2.5 text-sm text-[var(--tpl-ink-soft)] shadow-[var(--tpl-shadow)]">
              {t("design.sampleCard")}
            </span>
          </div>
        </div>
      </Section>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={pending}
          onClick={handleSave}
          className="rounded-md bg-accent px-5 py-2 text-sm font-medium text-surface hover:bg-accent-strong disabled:opacity-60"
        >
          {pending ? t("common.saving") : t("design.save")}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-md border border-border px-4 py-2 text-sm text-ink-soft hover:border-accent hover:text-ink"
        >
          {t("design.reset")}
        </button>
        {saved && <span className="text-sm text-accent-strong">{t("common.saved")} ✓</span>}
      </div>
    </div>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <h2 className="font-display text-base font-semibold text-ink">{title}</h2>
      {hint && <p className="mt-1 mb-4 text-xs text-muted">{hint}</p>}
      {children}
    </div>
  );
}

function FontSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  const t = useAdminT();

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-muted">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-border bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent"
      >
        <option value="">{t("design.asTheme")}</option>
        {options.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const t = useAdminT();

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-muted">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={/^#[0-9a-f]{6}$/i.test(value) ? value : "#2f6f5e"}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-11 cursor-pointer rounded border border-border bg-surface"
          aria-label={label}
        />
        <input
          type="text"
          value={value}
          placeholder={t("design.asTheme")}
          onChange={(e) => onChange(e.target.value.trim())}
          className="w-full rounded-md border border-border bg-paper px-2.5 py-2 font-mono text-xs text-ink outline-none focus:border-accent"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            title={t("design.reset")}
            className="text-xs text-muted hover:text-danger"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
