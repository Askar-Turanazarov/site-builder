"use client";

import { EMPTY_BLOCK_STYLE, isHexColor, type BlockStyle } from "@/blocks/style";
import type { AdminT } from "@/lib/admin-i18n";
import { themeStyleVars, type SiteDesign } from "@/blocks/palette";
import { useAdminT } from "@/components/admin/AdminI18nProvider";

/**
 * Панель «Стиль» — настройки внешнего вида блока для администратора без
 * знания CSS. Значения складываются в Block.style и применяются обёрткой
 * блока (см. src/blocks/style.ts).
 */

const BG_SWATCHES: { value: string; labelKey: LabelKey; preview: string }[] = [
  { value: "", labelKey: "style.asTheme", preview: "transparent" },
  { value: "paper", labelKey: "style.bgPaper", preview: "var(--tpl-paper)" },
  { value: "surface", labelKey: "style.bgSurface", preview: "var(--tpl-surface)" },
  { value: "accent", labelKey: "style.bgAccent", preview: "var(--tpl-accent)" },
  { value: "ink", labelKey: "style.bgInk", preview: "var(--tpl-ink)" },
];

const TEXT_SWATCHES: { value: string; labelKey: LabelKey; preview: string }[] = [
  { value: "", labelKey: "style.asTheme", preview: "transparent" },
  { value: "ink", labelKey: "style.textMain", preview: "var(--tpl-ink)" },
  { value: "inkSoft", labelKey: "style.textMuted", preview: "var(--tpl-ink-soft)" },
  { value: "onAccent", labelKey: "style.textOnAccent", preview: "var(--tpl-on-accent)" },
];

type LabelKey = Parameters<AdminT>[0];

const SIZE_OPTIONS: { value: string; labelKey: LabelKey }[] = [
  { value: "", labelKey: "style.default" },
  { value: "sm", labelKey: "style.sizeSm" },
  { value: "md", labelKey: "style.sizeMd" },
  { value: "lg", labelKey: "style.sizeLg" },
  { value: "xl", labelKey: "style.sizeXl" },
];

const PADDING_OPTIONS: { value: string; labelKey: LabelKey }[] = [
  { value: "", labelKey: "style.default" },
  { value: "none", labelKey: "style.padNone" },
  { value: "sm", labelKey: "style.padSm" },
  { value: "md", labelKey: "style.padMd" },
  { value: "lg", labelKey: "style.padLg" },
  { value: "xl", labelKey: "style.padXl" },
];

const WIDTH_OPTIONS: { value: string; labelKey: LabelKey }[] = [
  { value: "", labelKey: "style.default" },
  { value: "narrow", labelKey: "style.widthNarrow" },
  { value: "normal", labelKey: "style.widthNormal" },
  { value: "wide", labelKey: "style.widthWide" },
  { value: "full", labelKey: "style.widthFull" },
];

const RADIUS_OPTIONS: { value: string; labelKey: LabelKey }[] = [
  { value: "", labelKey: "style.asTheme" },
  { value: "none", labelKey: "style.radiusNone" },
  { value: "sm", labelKey: "style.radiusSm" },
  { value: "md", labelKey: "style.radiusMd" },
  { value: "lg", labelKey: "style.radiusLg" },
  { value: "full", labelKey: "style.radiusFull" },
];

const ALIGN_OPTIONS: { value: string; labelKey: LabelKey }[] = [
  { value: "", labelKey: "style.default" },
  { value: "left", labelKey: "style.alignLeft" },
  { value: "center", labelKey: "style.alignCenter" },
];

export function StyleEditForm({
  style,
  design,
  onChange,
}: {
  style: BlockStyle | undefined;
  design: SiteDesign;
  onChange: (patch: Partial<BlockStyle>) => void;
}) {
  const t = useAdminT();
  const value = { ...EMPTY_BLOCK_STYLE, ...style };
  const hasCustomBg = isHexColor(value.bg);
  const hasCustomText = isHexColor(value.text);

  return (
    // Переменные темы объявляем здесь же: иначе образцы цветов в админке
    // (они ссылаются на --tpl-*) остались бы пустыми — эти переменные живут
    // только внутри превью сайта.
    <div className="space-y-5" style={themeStyleVars(design)}>
      <SwatchRow
        label={t("style.bg")}
        swatches={BG_SWATCHES}
        value={hasCustomBg ? "" : value.bg}
        onPick={(v) => onChange({ bg: v })}
        customValue={hasCustomBg ? value.bg : ""}
        onCustom={(hex) => onChange({ bg: hex })}
      />

      <SwatchRow
        label={t("style.text")}
        swatches={TEXT_SWATCHES}
        value={hasCustomText ? "" : value.text}
        onPick={(v) => onChange({ text: v })}
        customValue={hasCustomText ? value.text : ""}
        onCustom={(hex) => onChange({ text: hex })}
      />

      <div>
        <Label>{t("style.accent")}</Label>
        <p className="mb-2 text-xs text-muted">
          {t("style.accentHint")}
        </p>
        <ColorInput
          value={value.accent}
          onChange={(hex) => onChange({ accent: hex })}
          onClear={() => onChange({ accent: "" })}
        />
      </div>

      <Select
        label={t("style.heading")}
        value={value.heading}
        options={SIZE_OPTIONS}
        onChange={(v) => onChange({ heading: v as BlockStyle["heading"] })}
      />
      <Select
        label={t("style.padding")}
        value={value.paddingY}
        options={PADDING_OPTIONS}
        onChange={(v) => onChange({ paddingY: v as BlockStyle["paddingY"] })}
      />
      <Select
        label={t("style.width")}
        value={value.width}
        options={WIDTH_OPTIONS}
        onChange={(v) => onChange({ width: v as BlockStyle["width"] })}
      />
      <Select
        label={t("style.radius")}
        value={value.radius}
        options={RADIUS_OPTIONS}
        onChange={(v) => onChange({ radius: v as BlockStyle["radius"] })}
      />
      <Select
        label={t("style.align")}
        value={value.align}
        options={ALIGN_OPTIONS}
        onChange={(v) => onChange({ align: v as BlockStyle["align"] })}
      />

      <label className="flex items-center gap-2 border-t border-border pt-4 text-sm text-ink">
        <input
          type="checkbox"
          checked={value.hidden}
          onChange={(e) => onChange({ hidden: e.target.checked })}
        />
        {t("style.hide")}
      </label>

      <button
        type="button"
        onClick={() => onChange(EMPTY_BLOCK_STYLE)}
        className="w-full rounded-md border border-border px-3 py-2 text-xs font-medium text-ink-soft hover:border-accent hover:text-accent"
      >
        {t("style.reset")}
      </button>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="mb-1.5 text-sm font-medium text-ink-soft">{children}</div>;
}

function SwatchRow({
  label,
  swatches,
  value,
  onPick,
  customValue,
  onCustom,
}: {
  label: string;
  swatches: { value: string; labelKey: LabelKey; preview: string }[];
  value: string;
  onPick: (value: string) => void;
  customValue: string;
  onCustom: (hex: string) => void;
}) {
  const t = useAdminT();

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-1.5">
        {swatches.map((swatch) => (
          <button
            key={swatch.value}
            type="button"
            title={t(swatch.labelKey)}
            onClick={() => onPick(swatch.value)}
            className={`h-8 w-8 rounded-md border-2 ${
              value === swatch.value && !customValue ? "border-accent" : "border-border"
            }`}
            style={{
              background: swatch.preview,
              backgroundImage:
                swatch.value === ""
                  ? "linear-gradient(45deg, transparent 45%, var(--muted) 45%, var(--muted) 55%, transparent 55%)"
                  : undefined,
            }}
          />
        ))}
      </div>
      <div className="mt-2">
        <ColorInput value={customValue} onChange={onCustom} onClear={() => onPick("")} />
      </div>
    </div>
  );
}

function ColorInput({
  value,
  onChange,
  onClear,
}: {
  value: string;
  onChange: (hex: string) => void;
  onClear: () => void;
}) {
  const t = useAdminT();

  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={isHexColor(value) ? value : "#2f6f5e"}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-10 cursor-pointer rounded border border-border bg-surface"
        aria-label={t("style.pickColor")}
      />
      <input
        type="text"
        value={value}
        placeholder="#RRGGBB"
        // Принимаем любой ввод, чтобы можно было допечатать код цвета;
        // некорректное значение просто игнорируется при рендере блока.
        onChange={(e) => onChange(e.target.value.trim())}
        className="w-28 rounded-md border border-border bg-surface px-2.5 py-1.5 font-mono text-xs text-ink outline-none focus:border-accent"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-muted hover:text-danger"
          title={t("style.clearColor")}
        >
          ✕
        </button>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; labelKey: LabelKey }[];
  onChange: (value: string) => void;
}) {
  const t = useAdminT();

  return (
    <div>
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.labelKey)}
          </option>
        ))}
      </select>
    </div>
  );
}
