"use client";

import { useTransition } from "react";
import { setThemeAction } from "@/lib/actions/theme";
import { THEME_MODES, type ThemeMode } from "@/lib/theme";

/**
 * Переключатель темы интерфейса: светлая / тёмная / системная.
 *
 * Тема применяется сразу на клиенте, не дожидаясь ответа сервера: смена
 * оформления обязана быть мгновенной, иначе переключатель кажется сломанным.
 * Серверное действие следом запоминает выбор в cookie, чтобы он пережил
 * перезагрузку.
 *
 * Режим «Системная» снимает атрибут и вычисляет вариант через matchMedia —
 * без этого возврат к системной настройке оставлял бы светлую тему на
 * тёмной системе (сервер настройку ОС не знает и печатает пустоту).
 */
function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  if (mode === "system") {
    root.setAttribute(
      "data-theme",
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    );
  } else {
    root.setAttribute("data-theme", mode);
  }
}

const ICONS: Record<ThemeMode, React.ReactNode> = {
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  dark: <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />,
  system: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
};

export function ThemeToggle({
  mode,
  labels,
  className = "",
}: {
  mode: ThemeMode;
  /** Подписи приходят пропом: компонент живёт и в портале, и в админке — словари у них разные. */
  labels: Record<ThemeMode, string>;
  className?: string;
}) {
  const [, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={labels.system}
      className={`inline-flex items-center gap-0.5 rounded-full border border-border bg-surface p-0.5 ${className}`}
    >
      {THEME_MODES.map((value) => {
        const active = value === mode;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            title={labels[value]}
            onClick={() => {
              applyTheme(value);
              startTransition(() => void setThemeAction(value));
            }}
            className={`focus-visible:focus-ring inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-150 ${
              active
                ? "bg-accent text-accent-foreground"
                : "text-muted hover:bg-default hover:text-ink"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[15px] w-[15px]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {ICONS[value]}
            </svg>
            <span className="sr-only">{labels[value]}</span>
          </button>
        );
      })}
    </div>
  );
}
