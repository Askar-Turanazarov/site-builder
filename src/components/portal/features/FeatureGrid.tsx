"use client";

import { useEffect, useRef } from "react";

/**
 * Сетка карточек «Возможностей»: запуск миниатюр.
 *
 * Отмечает карточку `data-inview`, пока она на экране. CSS запускает анимацию
 * миниатюры только под этим атрибутом, поэтому вне экрана ничего не крутится,
 * а без JavaScript миниатюры стоят законченной картинкой.
 *
 * Пятно света за курсором здесь больше не считается — его ведёт общий
 * SpotlightTracker для всех карточек с `data-spotlight`.
 */
export function FeatureGrid({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-bento]"));

    const inView = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const card = entry.target as HTMLElement;
          if (entry.isIntersecting) card.dataset.inview = "";
          else delete card.dataset.inview;
        }
      },
      { threshold: 0.25 },
    );
    cards.forEach((card) => inView.observe(card));
    return () => inView.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
