"use client";

import { useEffect, useRef } from "react";

/** Наибольший наклон окна сцены, в градусах. Больше — окно начинает «плавать». */
const MAX_TILT = 5;

function clamp(value: number) {
  return Math.max(-1, Math.min(1, value));
}

/**
 * Двигатель живой сцены на главной.
 *
 * Сам ничего не рисует — вся разметка серверная (HeroStage), а все переходы
 * описаны в CSS (src/styles/portal.css). Компонент делает три вещи:
 *
 *  1. Листает шаги: меняет `data-step` на корне раздела. CSS по этому атрибуту
 *     показывает нужный шаблон, язык в адресной строке, подсвеченный блок и
 *     цвет стиля. Состояния React нет — нечего перерисовывать.
 *  2. Наклоняет окно за курсором с плавным догоном. Когда курсор уходит из
 *     раздела или окно теряет фокус, цель сбрасывается в ноль и окно
 *     возвращается ровно. Прежняя 3D-сцена этого не делала и оставалась
 *     наклонённой — ровно на это жаловались.
 *  3. Ведёт пятно света за курсором по фону раздела.
 *
 * Листание встаёт на паузу, когда раздел вне экрана или вкладка скрыта, и не
 * запускается вовсе при `prefers-reduced-motion: reduce`.
 */
export function HeroStageMotion({
  steps,
  interval,
  className = "",
  children,
}: {
  steps: number;
  interval: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tilt = root.querySelector<HTMLElement>("[data-sg-tilt]");
    root.style.setProperty("--sg-interval", `${interval}ms`);

    // ---------------------------------------------------------------- шаги
    let step = 0;
    let timer = 0;
    let inView = true;

    /** Полосы прогресса начинают заново вместе с каждым шагом. */
    const restartProgress = () => {
      root.querySelectorAll<HTMLElement>("[data-sg-restart]").forEach((el) => {
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = "";
      });
    };

    const advance = () => {
      step = (step + 1) % steps;
      root.dataset.step = String(step);
      restartProgress();
    };

    const schedule = () => {
      window.clearInterval(timer);
      timer = 0;
      const running = !reduce.matches && inView && !document.hidden;
      root.dataset.motion = running ? "on" : "off";
      if (running) {
        restartProgress();
        timer = window.setInterval(advance, interval);
      }
    };

    const visibility = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        schedule();
      },
      { threshold: 0.1 },
    );
    visibility.observe(root);
    document.addEventListener("visibilitychange", schedule);
    reduce.addEventListener("change", schedule);

    // ------------------------------------------------------ наклон и свет
    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let raf = 0;

    const render = () => {
      current.x += (target.x - current.x) * 0.09;
      current.y += (target.y - current.y) * 0.09;
      const settled =
        Math.abs(target.x - current.x) < 0.005 && Math.abs(target.y - current.y) < 0.005;
      if (settled) {
        current.x = target.x;
        current.y = target.y;
      }
      tilt?.style.setProperty("--sg-ry", `${current.x.toFixed(3)}deg`);
      tilt?.style.setProperty("--sg-rx", `${current.y.toFixed(3)}deg`);
      raf = settled ? 0 : requestAnimationFrame(render);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      const box = root.getBoundingClientRect();
      root.style.setProperty("--sg-mx", `${event.clientX - box.left}px`);
      root.style.setProperty("--sg-my", `${event.clientY - box.top}px`);

      // Наклон — только для мыши: на сенсорном экране «курсор» остаётся там,
      // где был последний тап, и окно замерло бы наклонённым.
      if (!tilt || reduce.matches || event.pointerType !== "mouse") return;
      const rect = tilt.getBoundingClientRect();
      // Запас в 160 px расширяет зону: наклон растёт плавно ещё на подходе к окну.
      const nx = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2 + 160));
      const ny = clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2 + 160));
      target.x = nx * MAX_TILT;
      target.y = -ny * MAX_TILT * 0.8;
      kick();
    };
    const onEnter = () => {
      root.dataset.pointer = "in";
    };
    const onLeave = () => {
      root.dataset.pointer = "out";
      target.x = 0;
      target.y = 0;
      kick();
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    schedule();

    return () => {
      window.clearInterval(timer);
      cancelAnimationFrame(raf);
      visibility.disconnect();
      document.removeEventListener("visibilitychange", schedule);
      reduce.removeEventListener("change", schedule);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [steps, interval]);

  return (
    <section ref={ref} data-step="0" data-pointer="out" data-motion="off" className={className}>
      {children}
    </section>
  );
}
