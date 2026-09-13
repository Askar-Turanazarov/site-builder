"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Фон портала на всю страницу: подкраска, точечная сетка и размытые пятна
 * акцента с параллаксом.
 *
 * Раньше пятна и сетка были только в шапке главной, ниже по странице фон
 * оставался пустым — в светлой теме это читалось как голый белый лист.
 *
 * ГЛУБИНА. Слой зафиксирован на экране, а его части сдвигаются вверх медленнее
 * содержимого: сетка — на четверть скорости прокрутки, пятна — каждое со своей
 * скоростью (ближние быстрее дальних). Глаз читает разницу скоростей как
 * расстояние: фон «лежит ниже» карточек.
 *
 * СТОИМОСТЬ. Одна подписка на прокрутку, не чаще кадра, пишет две переменные
 * на корень слоя. Все сдвиги — `transform`, их считает видеокарта; перерисовки
 * фона при прокрутке нет. Сетке хватает сдвига в пределах одной клетки (24 px)
 * по модулю — узор повторяется, поэтому слою не нужна высота всей страницы.
 *
 * При `prefers-reduced-motion: reduce` фон неподвижен.
 */

/** Пятна: место на «длинной» странице, скорость и цвет. Скорость = глубина. */
const ORBS: { style: CSSProperties; speed: number; color: string; delay: string }[] = [
  {
    style: { top: "-10vh", left: "-12vw" },
    speed: 0.12,
    color: "color-mix(in oklab, var(--accent) 70%, transparent)",
    delay: "0s",
  },
  {
    style: { top: "82vh", right: "-14vw" },
    speed: 0.2,
    color: "color-mix(in oklab, var(--accent) 45%, #22d3ee)",
    delay: "-7s",
  },
  {
    style: { top: "146vh", left: "-10vw" },
    speed: 0.3,
    color: "color-mix(in oklab, var(--accent) 60%, transparent)",
    delay: "-13s",
  },
  {
    style: { top: "242vh", right: "-8vw" },
    speed: 0.4,
    color: "color-mix(in oklab, #22d3ee 55%, var(--accent))",
    delay: "-19s",
  },
];

const DOTS_CELL = 24;
const DOTS_SPEED = 0.25;

export function PortalBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    const update = () => {
      raf = 0;
      const scroll = reduce.matches ? 0 : window.scrollY;
      root.style.setProperty("--sg-scroll", String(Math.round(scroll)));
      root.style.setProperty("--sg-dots-y", `${-((scroll * DOTS_SPEED) % DOTS_CELL)}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    reduce.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      reduce.removeEventListener("change", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="sg-backdrop-wash absolute inset-0" />
      <div className="sg-backdrop-dots" />
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="sg-orb"
          style={{ ...orb.style, "--sg-speed": orb.speed } as CSSProperties}
        >
          <div className="sg-orb-drift" style={{ background: orb.color, animationDelay: orb.delay }} />
        </div>
      ))}
    </div>
  );
}
