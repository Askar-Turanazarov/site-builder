"use client";

import dynamic from "next/dynamic";

/**
 * Ленивая обёртка над трёхмерной сценой.
 *
 * Нужна по двум причинам. Во-первых, `ssr: false` разрешён только в клиентском
 * компоненте, а главная страница портала серверная. Во-вторых, three.js — самая
 * тяжёлая зависимость проекта, и грузить её стоит лишь на той единственной
 * странице, где сцена действительно есть; на остальных страницах и в админке
 * её в сборке не будет вовсе.
 *
 * До загрузки на месте сцены ничего не мигает: контейнер прозрачный, текст
 * шапки читается сразу.
 */
const Scene = dynamic(() => import("./HeroScene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => null,
});

export function HeroSceneLazy({ className }: { className?: string }) {
  return <Scene className={className} />;
}
