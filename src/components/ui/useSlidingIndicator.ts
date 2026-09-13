"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Скользящий индикатор выбранного пункта — приём HeroUI-вкладок: подсветка
 * переезжает от прежнего пункта к новому, а не вспыхивает на месте.
 *
 * Использование:
 *   const { containerRef, indicatorRef, itemRef } = useSlidingIndicator(active);
 *   <div ref={containerRef} className="relative ...">
 *     <span ref={indicatorRef} className="sg-indicator absolute top-0 left-0 opacity-0 ..." />
 *     <button ref={itemRef("ru")} className="relative z-10 ...">RU</button>
 *   </div>
 *
 * Контейнер обязан быть `relative`: положение считается по `offsetLeft/Top`
 * пункта относительно него. Высота и ширина тоже берутся у пункта, поэтому
 * хук одинаково годится для горизонтальных переключателей и для вертикального
 * меню сайдбара.
 *
 * Поведение, которое делает переезд заметным:
 *  - когда активного пункта нет, индикатор гаснет, но остаётся на последнем
 *    месте; появившись снова, он едет оттуда, а не возникает из ниоткуда;
 *  - самое первое появление — без анимации, иначе индикатор выезжал бы из
 *    левого верхнего угла;
 *  - при смене размеров (догрузился шрифт, открылось меню) индикатор встаёт
 *    на место мгновенно, не прерывая начатый переезд лишним скачком.
 *
 * Длительность и кривая — у класса `.sg-indicator` в src/styles/motion.css.
 */
export function useSlidingIndicator<C extends HTMLElement = HTMLDivElement>(active: string | null) {
  const containerRef = useRef<C>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const items = useRef(new Map<string, HTMLElement>());
  const placed = useRef(false);

  const itemRef = (key: string) => (el: HTMLElement | null) => {
    if (el) items.current.set(key, el);
    else items.current.delete(key);
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    const place = (animate: boolean) => {
      const el = active ? items.current.get(active) : undefined;
      if (!el) {
        indicator.style.opacity = "0";
        return;
      }
      const instant = !animate || !placed.current;
      if (instant) indicator.style.transition = "none";
      indicator.style.width = `${el.offsetWidth}px`;
      indicator.style.height = `${el.offsetHeight}px`;
      indicator.style.transform = `translate3d(${el.offsetLeft}px, ${el.offsetTop}px, 0)`;
      indicator.style.opacity = "1";
      if (instant) {
        void indicator.offsetWidth;
        indicator.style.transition = "";
      }
      placed.current = true;
    };

    place(true);

    // Первый вызов наблюдатель делает сразу после подписки — его пропускаем,
    // иначе он оборвал бы только что начатый переезд.
    let initial = true;
    const resize = new ResizeObserver(() => {
      if (initial) {
        initial = false;
        return;
      }
      place(false);
    });
    resize.observe(container);
    items.current.forEach((el) => resize.observe(el));
    return () => resize.disconnect();
  }, [active]);

  return { containerRef, indicatorRef, itemRef };
}
