"use client";

import type { FieldSpec } from "@/blocks/types";
import type { PathSegment } from "./object-path";
import { MediaPickerField } from "./MediaPickerField";
import { RichTextField } from "./RichTextField";

export function defaultValueForField(spec: FieldSpec): unknown {
  switch (spec.kind) {
    case "boolean":
      return false;
    case "image":
      return null;
    case "select":
      return spec.options[0]?.value ?? "";
    case "repeatable":
      return [];
    default:
      return "";
  }
}

function defaultItem(fields: FieldSpec[]): Record<string, unknown> {
  return Object.fromEntries(fields.map((f) => [f.name, defaultValueForField(f)]));
}

interface FieldRendererProps {
  spec: FieldSpec;
  value: unknown;
  path: PathSegment[];
  onLeafChange: (path: PathSegment[], value: unknown, localized: boolean) => void;
}

const inputClass =
  "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent";

export function FieldRenderer({ spec, value, path, onLeafChange }: FieldRendererProps) {
  if (spec.kind === "repeatable") {
    const items = Array.isArray(value) ? value : [];
    return (
      <div>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="rounded-md border border-border p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted">
                  {spec.itemLabel} {index + 1}
                </span>
                <div className="flex gap-1">
                  {index > 0 && (
                    <IconButton label="Вверх" onClick={() => onLeafChange(path, moveItem(items, index, index - 1), false)}>
                      ↑
                    </IconButton>
                  )}
                  {index < items.length - 1 && (
                    <IconButton label="Вниз" onClick={() => onLeafChange(path, moveItem(items, index, index + 1), false)}>
                      ↓
                    </IconButton>
                  )}
                  <IconButton label="Удалить" onClick={() => onLeafChange(path, removeItem(items, index), false)} danger>
                    ✕
                  </IconButton>
                </div>
              </div>
              <div className="space-y-3">
                {spec.fields.map((subSpec) => (
                  <Field key={subSpec.name}>
                    <FieldRenderer
                      spec={subSpec}
                      value={(item as Record<string, unknown>)[subSpec.name]}
                      path={[...path, index, subSpec.name]}
                      onLeafChange={onLeafChange}
                    />
                  </Field>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onLeafChange(path, [...items, defaultItem(spec.fields)], false)}
          className="mt-2 rounded-md border border-dashed border-border px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-accent hover:text-accent"
        >
          + Добавить: {spec.itemLabel}
        </button>
      </div>
    );
  }

  switch (spec.kind) {
    case "text":
      return (
        <input
          type="text"
          className={inputClass}
          value={typeof value === "string" ? value : ""}
          placeholder={spec.placeholder}
          onChange={(e) => onLeafChange(path, e.target.value, spec.localized)}
        />
      );
    case "url":
      return (
        <input
          type="text"
          className={inputClass}
          value={typeof value === "string" ? value : ""}
          placeholder={spec.placeholder ?? "https://…"}
          onChange={(e) => onLeafChange(path, e.target.value, spec.localized)}
        />
      );
    case "textarea": {
      // A couple of fields (e.g. pricing plan "features") store string[] but
      // are edited as one newline-per-item textarea for editor simplicity.
      const isListValue = Array.isArray(value);
      const text = isListValue ? (value as string[]).join("\n") : typeof value === "string" ? value : "";
      return (
        <textarea
          className={inputClass}
          rows={4}
          value={text}
          placeholder={spec.placeholder}
          onChange={(e) =>
            onLeafChange(
              path,
              isListValue ? e.target.value.split("\n") : e.target.value,
              spec.localized,
            )
          }
        />
      );
    }
    case "richtext":
      return (
        <RichTextField
          value={typeof value === "string" ? value : ""}
          onChange={(html) => onLeafChange(path, html, spec.localized)}
        />
      );
    case "image":
      return (
        <MediaPickerField
          value={typeof value === "string" ? value : null}
          onChange={(mediaId) => onLeafChange(path, mediaId, spec.localized)}
        />
      );
    case "boolean":
      return (
        <label className="inline-flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onLeafChange(path, e.target.checked, spec.localized)}
          />
        </label>
      );
    case "select":
      return (
        <select
          className={inputClass}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onLeafChange(path, e.target.value, spec.localized)}
        >
          {spec.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    default:
      return null;
  }
}

function Field({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function IconButton({
  children,
  onClick,
  label,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-6 w-6 items-center justify-center rounded text-xs ${
        danger ? "text-muted hover:bg-danger-tint hover:text-danger" : "text-muted hover:bg-paper hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function moveItem<T>(arr: T[], from: number, to: number): T[] {
  const next = [...arr];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

function removeItem<T>(arr: T[], index: number): T[] {
  const next = [...arr];
  next.splice(index, 1);
  return next;
}
