"use client";

import { useEffect } from "react";

/**
 * Пятно света за курсором на карточках.
 *
 * Один слушатель на всё приложение вместо обёртки вокруг каждой сетки: на
 * движение мыши находит элемент с `data-spotlight` под курсором и ставит ему
 * `--mx/--my`. Остальное делает CSS-класс `.sg-spot` (src/styles/portal.css).
 * Поэтому пятно работает везде, где стоит атрибут, — на бенто, карточках
 * шаблонов на главной, на витрине и в админке.
 *
 * Обновление не чаще кадра и только одного элемента. Для сенсорных экранов
 * ничего не делаем: там нет курсора, за которым идти.
 */
export function SpotlightTracker() {
  useEffect(() => {
    let raf = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      raf = 0;
      if (!last || !(last.target instanceof Element)) return;
      const card = last.target.closest<HTMLElement>("[data-spotlight]");
      if (!card) return;
      const box = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${last.clientX - box.left}px`);
      card.style.setProperty("--my", `${last.clientY - box.top}px`);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      last = event;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
