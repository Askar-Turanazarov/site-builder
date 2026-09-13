"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Трёхмерная сцена в шапке главной страницы.
 *
 * ЗАМЫСЕЛ. Панели — это блоки страницы: шапка, обложка, три карточки, подвал.
 * При загрузке они прилетают вразнобой и складываются в ровную стопку.
 * Смысл буквальный: SiteGo собирает страницу из блоков. Украшением ради
 * украшения сцена быть не должна — она показывает, что делает продукт.
 *
 * ЦВЕТА берутся из CSS-переменных темы, а не зашиты числами, поэтому сцена
 * одинаково уместна в светлой и тёмной теме и перекрашивается вместе с ней
 * (следим за атрибутом data-theme).
 *
 * БЕРЕЖНОСТЬ К РЕСУРСАМ:
 *  - кадры считаются только когда сцена в поле зрения (IntersectionObserver);
 *  - при `prefers-reduced-motion: reduce` рисуется один статичный кадр;
 *  - при отсутствии WebGL компонент тихо исчезает, оставляя фон страницы;
 *  - всё, что создано, освобождается при размонтировании.
 */

/** Блоки страницы: размеры и место в готовой стопке. */
const PANELS: { w: number; h: number; x: number; y: number; z: number; weight: number }[] = [
  { w: 4.6, h: 0.34, x: 0, y: 2.05, z: 0, weight: 0.45 },
  { w: 4.6, h: 1.5, x: 0, y: 1.02, z: 0.12, weight: 1 },
  { w: 1.42, h: 1.05, x: -1.59, y: -0.35, z: 0.24, weight: 0.7 },
  { w: 1.42, h: 1.05, x: 0, y: -0.35, z: 0.24, weight: 0.7 },
  { w: 1.42, h: 1.05, x: 1.59, y: -0.35, z: 0.24, weight: 0.7 },
  { w: 4.6, h: 0.78, x: 0, y: -1.55, z: 0.12, weight: 0.5 },
];

/** Прямоугольник со скруглёнными углами — крупный радиус в духе HeroUI. */
function roundedPlane(w: number, h: number, r: number): THREE.ShapeGeometry {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  const rad = Math.min(r, w / 2, h / 2);
  shape.moveTo(x + rad, y);
  shape.lineTo(x + w - rad, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + rad);
  shape.lineTo(x + w, y + h - rad);
  shape.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
  shape.lineTo(x + rad, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - rad);
  shape.lineTo(x, y + rad);
  shape.quadraticCurveTo(x, y, x + rad, y);
  return new THREE.ShapeGeometry(shape, 12);
}

function cssColor(el: HTMLElement, name: string, fallback: string): THREE.Color {
  const raw = getComputedStyle(el).getPropertyValue(name).trim();
  try {
    return new THREE.Color(raw || fallback);
  } catch {
    return new THREE.Color(fallback);
  }
}

export function HeroScene({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return; // WebGL недоступен — страница просто остаётся без сцены
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8.4);

    const group = new THREE.Group();
    group.rotation.set(-0.16, -0.42, 0.05);
    scene.add(group);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    interface Item {
      mesh: THREE.Mesh;
      edge: THREE.LineSegments;
      target: THREE.Vector3;
      from: THREE.Vector3;
      phase: number;
      weight: number;
    }
    const items: Item[] = [];

    PANELS.forEach((p, i) => {
      const geo = roundedPlane(p.w, p.h, 0.14);
      const fill = new THREE.MeshBasicMaterial({ transparent: true, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geo, fill);

      const edgeGeo = new THREE.EdgesGeometry(geo);
      const edgeMat = new THREE.LineBasicMaterial({ transparent: true });
      const edge = new THREE.LineSegments(edgeGeo, edgeMat);
      mesh.add(edge);

      const target = new THREE.Vector3(p.x, p.y, p.z);
      // Разлёт «до сборки» задан формулой, а не случайными числами: иначе
      // композиция менялась бы при каждой загрузке страницы.
      const from = new THREE.Vector3(
        p.x + Math.sin(i * 2.1) * 3.4,
        p.y + Math.cos(i * 1.7) * 2.2,
        p.z - 3.5 - i * 0.8,
      );
      mesh.position.copy(from);
      group.add(mesh);

      geometries.push(geo, edgeGeo);
      materials.push(fill, edgeMat);
      items.push({ mesh, edge, target, from, phase: i * 0.9, weight: p.weight });
    });

    /** Перекрашивание под текущую тему. */
    const paint = () => {
      const accent = cssColor(host, "--accent", "#0485f7");
      const fg = cssColor(host, "--foreground", "#18181b");
      const bg = cssColor(host, "--background", "#fafafa");

      // На светлом фоне полупрозрачная светлая панель исчезает, на тёмном —
      // исчезает тёмная. Поэтому плотность контуров и заливки выбирается по
      // светлоте фона, а не задаётся один раз на обе темы.
      const lightTheme = bg.r * 0.299 + bg.g * 0.587 + bg.b * 0.114 > 0.5;

      items.forEach((it, i) => {
        const fill = it.mesh.material as THREE.MeshBasicMaterial;
        const line = it.edge.material as THREE.LineBasicMaterial;
        const isCover = i === 1;
        const isBar = i === 0 || i === 5;

        // Обложка и карточки тянут в акцент, служебные полосы — к цвету текста.
        const mix = isCover ? 1 : isBar ? 0.25 : 0.7;
        fill.color.copy(fg).lerp(accent, mix);
        line.color.copy(fg).lerp(accent, Math.min(1, mix + 0.3));

        // Панели читаются прежде всего контуром: сплошная заливка превратила
        // бы стопку в глухое пятно позади заголовка.
        if (lightTheme) {
          fill.color.lerp(accent, 0.55);
          line.color.copy(accent);
          fill.opacity = isCover ? 0.14 : 0.07;
          line.opacity = isCover ? 0.55 : 0.34;
        } else {
          fill.opacity = isCover ? 0.2 : 0.1 + 0.07 * it.weight;
          line.opacity = isCover ? 0.85 : 0.6;
        }
      });
    };
    paint();

    const themeWatch = new MutationObserver(paint);
    themeWatch.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // На узких экранах отодвигаем камеру, иначе стопка не помещается в кадр.
      camera.position.z = w < 640 ? 11.5 : w < 1024 ? 9.6 : 8.4;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // Параллакс за курсором — лёгкий, чтобы сцена не «плавала».
    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;
    let visible = true;

    const frame = () => {
      const t = clock.getElapsedTime();
      // Сборка: 0 → 1 за первые ~1,8 с, дальше только дыхание стопки.
      const assemble = Math.min(1, t / 1.8);
      const ease = 1 - Math.pow(1 - assemble, 4);

      items.forEach((it) => {
        const bob = Math.sin(t * 0.55 + it.phase) * 0.06 * it.weight;
        it.mesh.position.lerpVectors(it.from, it.target, ease);
        it.mesh.position.y += bob * ease;
        it.mesh.position.z += Math.cos(t * 0.4 + it.phase) * 0.05 * ease;
      });

      group.rotation.y = -0.42 + pointer.x * 0.12 + Math.sin(t * 0.22) * 0.03;
      group.rotation.x = -0.16 + pointer.y * 0.07;

      renderer.render(scene, camera);
      if (visible && !reduceMotion.matches) raf = requestAnimationFrame(frame);
    };

    const renderStill = () => {
      // Статичный кадр: стопка уже собрана, движения нет.
      items.forEach((it) => it.mesh.position.copy(it.target));
      renderer.render(scene, camera);
    };

    const start = () => {
      if (reduceMotion.matches) {
        renderStill();
        return;
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible) start();
        else cancelAnimationFrame(raf);
      },
      { threshold: 0.01 },
    );
    io.observe(host);

    const onMotionChange = () => start();
    reduceMotion.addEventListener("change", onMotionChange);
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      themeWatch.disconnect();
      reduceMotion.removeEventListener("change", onMotionChange);
      window.removeEventListener("pointermove", onPointer);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className={className} />;
}
