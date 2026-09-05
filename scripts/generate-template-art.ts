/**
 * Генератор графики для шаблонов сайтов.
 *
 * Шаблон без картинок не выглядит законченным: hero без обложки, пустые
 * галереи, карточки команды без портретов. Фотостоки сюда не годятся —
 * это чужие файлы с лицензиями и внешними ссылками, а выгруженная статика
 * обязана оставаться автономной. Поэтому изображения рисуются кодом:
 * из палитры темы шаблона и его характера (см. src/styles/skins.css).
 *
 * Запуск: npm run art:generate
 * Результат: public/templates/<ключ>/<имя>.svg — файлы коммитятся,
 * генератор детерминирован (один и тот же вход даёт тот же файл).
 */

import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { THEME_PRESETS, type ThemeKey } from "../src/blocks/palette";
import { SITE_TEMPLATES } from "../src/lib/site-templates";
import { TEMPLATE_ART_SHEET, templateArtPublicPath } from "../src/lib/site-templates/art";

// ---------------------------------------------------------------------------
// Детерминированный генератор случайных чисел: одинаковый ключ — одинаковая
// картинка, поэтому перегенерация не создаёт шума в истории изменений.
// ---------------------------------------------------------------------------

function seedFrom(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rngFrom(text: string): () => number {
  let a = seedFrom(text);
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Мотивы. Каждый шаблон рисуется своим языком форм — тем же, каким говорит
// его скин: у стройки диагонали и прямые углы, у салона мягкие пятна,
// у туризма слоистый ландшафт.
// ---------------------------------------------------------------------------

type Motif = "grid" | "poster" | "retail" | "rings" | "quiet" | "blobs" | "diagonal" | "frames" | "layers";

const MOTIF_BY_TEMPLATE: Record<string, Motif> = {
  corporate: "grid",
  agency: "poster",
  shop: "retail",
  cafe: "rings",
  blog: "quiet",
  clinic: "blobs",
  education: "grid",
  construction: "diagonal",
  law: "frames",
  beauty: "blobs",
  fitness: "diagonal",
  travel: "layers",
};

interface Palette {
  paper: string;
  surface: string;
  ink: string;
  accent: string;
}

interface Canvas {
  w: number;
  h: number;
}

function alpha(hex: string, value: number): string {
  const a = Math.round(Math.min(1, Math.max(0, value)) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
}

function round(n: number): number {
  return Math.round(n * 10) / 10;
}

// ---------------------------------------------------------------------------
// Рисовалки мотивов. Каждая возвращает содержимое <svg> без обёртки.
// ---------------------------------------------------------------------------

type Draw = (c: Canvas, p: Palette, rnd: () => number) => string;

const DRAW: Record<Motif, Draw> = {
  // Сетка прямоугольников с волосяными линейками — деловой, «реестровый» язык.
  grid(c, p, rnd) {
    const cols = 6;
    const rows = 4;
    const cw = c.w / cols;
    const ch = c.h / rows;
    const parts: string[] = [];
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const r = rnd();
        if (r < 0.55) continue;
        const fill = r > 0.88 ? alpha(p.accent, 0.9) : alpha(p.ink, 0.08 + rnd() * 0.16);
        parts.push(
          `<rect x="${round(x * cw)}" y="${round(y * ch)}" width="${round(cw)}" height="${round(ch)}" fill="${fill}"/>`,
        );
      }
    }
    for (let x = 1; x < cols; x++) {
      parts.push(
        `<line x1="${round(x * cw)}" y1="0" x2="${round(x * cw)}" y2="${c.h}" stroke="${alpha(p.ink, 0.14)}" stroke-width="2"/>`,
      );
    }
    return parts.join("");
  },

  // Крупные смещённые плоскости и жирная диагональ — плакат.
  poster(c, p, rnd) {
    const bw = c.w * (0.42 + rnd() * 0.2);
    const bh = c.h * (0.5 + rnd() * 0.3);
    return [
      `<rect x="${round(c.w * 0.05)}" y="${round(c.h - bh - c.h * 0.05)}" width="${round(bw)}" height="${round(bh)}" fill="${alpha(p.accent, 0.95)}"/>`,
      `<rect x="${round(c.w * 0.42)}" y="${round(c.h * 0.08)}" width="${round(c.w * 0.5)}" height="${round(c.h * 0.42)}" fill="${alpha(p.ink, 0.85)}"/>`,
      `<path d="M0 ${round(c.h)} L ${round(c.w)} 0" stroke="${alpha(p.accent, 0.5)}" stroke-width="${round(c.h * 0.03)}" fill="none"/>`,
    ].join("");
  },

  // Ряды скруглённых плиток — витрина товара.
  retail(c, p, rnd) {
    const parts: string[] = [];
    const cols = 3;
    const rows = 2;
    const pad = c.w * 0.05;
    const cw = (c.w - pad * (cols + 1)) / cols;
    const ch = (c.h - pad * (rows + 1)) / rows;
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const r = rnd();
        const fill = r > 0.75 ? alpha(p.accent, 0.9) : alpha(p.ink, 0.1 + r * 0.14);
        parts.push(
          `<rect x="${round(pad + x * (cw + pad))}" y="${round(pad + y * (ch + pad))}" width="${round(cw)}" height="${round(ch)}" rx="${round(cw * 0.08)}" fill="${fill}"/>`,
        );
      }
    }
    return parts.join("");
  },

  // Концентрические кольца — тёплый, «кофейный» ритм.
  rings(c, p, rnd) {
    const parts: string[] = [];
    const cx = c.w * (0.35 + rnd() * 0.3);
    const cy = c.h * (0.4 + rnd() * 0.25);
    const max = Math.min(c.w, c.h) * 0.55;
    for (let i = 7; i >= 1; i--) {
      const r = (max / 7) * i;
      const fill = i % 2 === 0 ? alpha(p.accent, 0.16 + i * 0.04) : alpha(p.ink, 0.06 + i * 0.02);
      parts.push(`<circle cx="${round(cx)}" cy="${round(cy)}" r="${round(r)}" fill="${fill}"/>`);
    }
    parts.push(
      `<circle cx="${round(cx)}" cy="${round(cy)}" r="${round(max * 0.14)}" fill="${alpha(p.accent, 0.95)}"/>`,
    );
    return parts.join("");
  },

  // Одна крупная форма и тонкие линии — сдержанный «читательский» язык.
  quiet(c, p, rnd) {
    const parts: string[] = [];
    const r = Math.min(c.w, c.h) * (0.28 + rnd() * 0.1);
    parts.push(
      `<circle cx="${round(c.w * 0.68)}" cy="${round(c.h * 0.38)}" r="${round(r)}" fill="${alpha(p.accent, 0.85)}"/>`,
    );
    for (let i = 1; i <= 9; i++) {
      const y = (c.h / 12) * i + c.h * 0.28;
      const w = c.w * (0.2 + rnd() * 0.45);
      parts.push(
        `<rect x="${round(c.w * 0.08)}" y="${round(y)}" width="${round(w)}" height="3" fill="${alpha(p.ink, 0.22)}"/>`,
      );
    }
    return parts.join("");
  },

  // Мягкие перекрывающиеся пятна — уход, спокойствие.
  blobs(c, p, rnd) {
    const parts: string[] = [];
    for (let i = 0; i < 5; i++) {
      const rx = c.w * (0.18 + rnd() * 0.26);
      const ry = rx * (0.65 + rnd() * 0.5);
      const cx = c.w * (0.15 + rnd() * 0.7);
      const cy = c.h * (0.2 + rnd() * 0.6);
      const fill = i % 2 === 0 ? alpha(p.accent, 0.2 + rnd() * 0.3) : alpha(p.ink, 0.07 + rnd() * 0.1);
      parts.push(
        `<ellipse cx="${round(cx)}" cy="${round(cy)}" rx="${round(rx)}" ry="${round(ry)}" fill="${fill}"/>`,
      );
    }
    return parts.join("");
  },

  // Диагональные полосы и шевроны — стройка и спортзал.
  diagonal(c, p, rnd) {
    const parts: string[] = [];
    const step = c.w / 14;
    const width = step * (0.45 + rnd() * 0.25);
    for (let i = -6; i < 20; i++) {
      const x = i * step;
      const strong = i % 4 === 0;
      parts.push(
        `<path d="M${round(x)} ${c.h} L${round(x + c.h)} 0 L${round(x + c.h + width)} 0 L${round(x + width)} ${c.h} Z" fill="${
          strong ? alpha(p.accent, 0.9) : alpha(p.ink, 0.1)
        }"/>`,
      );
    }
    parts.push(
      `<rect x="0" y="${round(c.h * 0.62)}" width="${c.w}" height="${round(c.h * 0.1)}" fill="${alpha(p.ink, 0.55)}"/>`,
    );
    return parts.join("");
  },

  // Вложенные тонкие рамки — строгая, «документальная» графика.
  frames(c, p, rnd) {
    const parts: string[] = [];
    const steps = 6;
    for (let i = 0; i < steps; i++) {
      const inset = (Math.min(c.w, c.h) / (steps * 2.2)) * i + c.h * 0.04;
      parts.push(
        `<rect x="${round(inset)}" y="${round(inset)}" width="${round(c.w - inset * 2)}" height="${round(c.h - inset * 2)}" fill="none" stroke="${
          i === steps - 1 ? alpha(p.accent, 0.9) : alpha(p.ink, 0.18)
        }" stroke-width="${i === steps - 1 ? 6 : 2}"/>`,
      );
    }
    parts.push(
      `<rect x="${round(c.w * 0.5 - 4)}" y="${round(c.h * 0.12)}" width="8" height="${round(c.h * 0.76)}" fill="${alpha(p.ink, 0.12)}"/>`,
    );
    if (rnd() > 0.5) {
      parts.push(
        `<rect x="${round(c.w * 0.12)}" y="${round(c.h * 0.5 - 4)}" width="${round(c.w * 0.76)}" height="8" fill="${alpha(p.ink, 0.12)}"/>`,
      );
    }
    return parts.join("");
  },

  // Слоистый ландшафт — дорога, горы, маршрут.
  layers(c, p, rnd) {
    const parts: string[] = [];
    const bands = 5;
    for (let i = bands; i >= 1; i--) {
      const base = c.h * (0.25 + (i / bands) * 0.6);
      const lift = c.h * (0.06 + rnd() * 0.12);
      const mid = c.w * (0.2 + rnd() * 0.6);
      const fill = i % 2 === 0 ? alpha(p.accent, 0.18 + i * 0.06) : alpha(p.ink, 0.08 + i * 0.05);
      parts.push(
        `<path d="M0 ${round(base)} Q ${round(mid)} ${round(base - lift)} ${c.w} ${round(base + lift * 0.3)} L${c.w} ${c.h} L0 ${c.h} Z" fill="${fill}"/>`,
      );
    }
    parts.push(
      `<circle cx="${round(c.w * 0.78)}" cy="${round(c.h * 0.22)}" r="${round(c.h * 0.09)}" fill="${alpha(p.accent, 0.9)}"/>`,
    );
    return parts.join("");
  },
};

/**
 * Портрет — отдельный архетип: обобщённый силуэт в палитре шаблона.
 * Абстракция честнее случайного лица со стока, но она обязана читаться как
 * оформление, а не как незагрузившаяся картинка: поэтому силуэт занимает
 * почти весь кадр, плечи и голова сливаются в одну фигуру, а за ней стоит
 * акцентный круг.
 */
function drawPortrait(c: Canvas, p: Palette, rnd: () => number, motif: Motif): string {
  const hard = motif === "diagonal" || motif === "frames" || motif === "grid" || motif === "poster";
  const cx = c.w * (0.5 + (rnd() - 0.5) * 0.06);
  const headR = c.h * (0.15 + rnd() * 0.015);
  const headY = c.h * 0.42;
  const shoulderTop = headY + headR * 1.25;
  const silhouette = alpha(p.ink, 0.72);

  const parts = [
    `<rect width="${c.w}" height="${c.h}" fill="${alpha(p.accent, 0.14)}"/>`,
    // Задний план: у «мягких» мотивов круг, у «жёстких» — плита.
    hard
      ? `<rect x="${round(c.w * 0.12)}" y="${round(c.h * 0.16)}" width="${round(c.w * 0.76)}" height="${round(c.h * 0.84)}" fill="${alpha(p.accent, 0.26)}"/>`
      : `<circle cx="${round(cx)}" cy="${round(c.h * 0.62)}" r="${round(c.h * 0.42)}" fill="${alpha(p.accent, 0.26)}"/>`,
    // Плечи и голова — одна фигура: рисуем плечи, затем голову внахлёст.
    `<path d="M${round(cx - c.w * 0.36)} ${c.h} Q ${round(cx)} ${round(shoulderTop)} ${round(cx + c.w * 0.36)} ${c.h} Z" fill="${silhouette}"/>`,
    `<circle cx="${round(cx)}" cy="${round(headY)}" r="${round(headR)}" fill="${silhouette}"/>`,
  ];

  return parts.join("");
}

function renderSvg(name: string, canvas: Canvas, palette: Palette, motif: Motif, seed: string): string {
  const rnd = rngFrom(seed);
  const inner = name.startsWith("portrait")
    ? drawPortrait(canvas, palette, rnd, motif)
    : `<rect width="${canvas.w}" height="${canvas.h}" fill="${palette.paper}"/>${DRAW[motif](canvas, palette, rnd)}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvas.w} ${canvas.h}" width="${canvas.w}" height="${canvas.h}" role="img"><rect width="${canvas.w}" height="${canvas.h}" fill="${palette.surface}"/>${inner}</svg>\n`;
}

async function main() {
  const root = path.join(process.cwd(), "public", "templates");
  await rm(root, { recursive: true, force: true });

  let count = 0;
  for (const template of SITE_TEMPLATES) {
    const theme = THEME_PRESETS[template.themeKey as ThemeKey];
    const palette: Palette = {
      paper: theme.paper,
      surface: theme.surface,
      ink: theme.ink,
      accent: theme.accent,
    };
    const motif = MOTIF_BY_TEMPLATE[template.key] ?? "grid";
    const dir = path.join(root, template.key);
    await mkdir(dir, { recursive: true });

    for (const item of TEMPLATE_ART_SHEET) {
      const canvas: Canvas = { w: item.width, h: item.height };
      const svg = renderSvg(item.name, canvas, palette, motif, `${template.key}/${item.name}`);
      await writeFile(
        path.join(process.cwd(), "public", templateArtPublicPath(template.key, item.name)),
        svg,
        "utf8",
      );
      count++;
    }
    console.log(`${template.key.padEnd(13)} ${motif.padEnd(9)} ${TEMPLATE_ART_SHEET.length} файлов`);
  }

  console.log(`\nГотово: ${count} изображений в public/templates`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
