"use client";

import { useState } from "react";
import Link from "next/link";
import { useSlidingIndicator } from "./useSlidingIndicator";

export interface SegmentLink {
  key: string;
  href: string;
  label: string;
}

/**
 * Ряд ссылок-переключателей со скользящим индикатором — для мест, где выбор
 * меняет адрес страницы: язык в полосе демонстрации и в предпросмотре админки.
 *
 * Индикатор едет в момент клика, не дожидаясь, пока загрузится новая страница.
 * Отметка клика хранит, от какого значения она сделана: как только адрес
 * действительно сменится (или посетитель уйдёт назад кнопкой браузера), в силу
 * снова вступает `active` из пропсов — без эффектов и без рассинхронизации.
 */
export function SegmentedLinks({
  items,
  active,
  className = "",
}: {
  items: SegmentLink[];
  active: string;
  className?: string;
}) {
  const [pending, setPending] = useState<{ from: string; to: string } | null>(null);
  const current = pending && pending.from === active ? pending.to : active;
  const { containerRef, indicatorRef, itemRef } = useSlidingIndicator(current);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center rounded-full border border-border bg-surface p-0.5 ${className}`}
    >
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className="sg-indicator pointer-events-none absolute top-0 left-0 rounded-full bg-accent opacity-0"
      />
      {items.map((item) => {
        const isActive = item.key === current;
        return (
          <Link
            key={item.key}
            href={item.href}
            ref={itemRef(item.key)}
            onClick={() => setPending({ from: active, to: item.key })}
            aria-current={item.key === active ? "page" : undefined}
            className={`focus-visible:focus-ring relative z-10 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors duration-200 ${
              isActive ? "text-accent-foreground" : "text-muted hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
