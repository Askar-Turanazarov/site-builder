"use client";

import { useEffect, useRef } from "react";

/**
 * Сетка карточек «Возможностей»: пятно света за курсором и запуск миниатюр.
 *
 * Разметка карточек серверная, этот компонент только:
 *  - ставит `--mx/--my` каждой карточке, чтобы подсветка шла за курсором.
 *    Подписка одна на всю сетку, обновление — не чаще кадра;
 *  - отмечает карточку `data-inview`, пока она на экране. CSS запускает
 *    анимацию миниатюры только под этим атрибутом, поэтому вне экрана ничего
 *    не крутится, а без JavaScript миниатюры просто стоят законченной картинкой.
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

    let raf = 0;
    let last: PointerEvent | null = null;
    const apply = () => {
      raf = 0;
      if (!last) return;
      for (const card of cards) {
        const box = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${last.clientX - box.left}px`);
        card.style.setProperty("--my", `${last.clientY - box.top}px`);
      }
    };
    const onMove = (event: PointerEvent) => {
      last = event;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    grid.addEventListener("pointermove", onMove);

    return () => {
      inView.disconnect();
      grid.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
