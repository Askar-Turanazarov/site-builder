/**
 * Загрузка фотографий для шаблонов сайтов.
 *
 * Рисованная графика шаблону не годится: сайт кафе должен показывать кафе, а не
 * абстрактные пятна. Снимки берём с Викисклада (Wikimedia Commons) — открытого
 * хранилища с понятными лицензиями и без ключей API.
 *
 * Лицензии. Сначала берём то, что не требует указания авторства (CC0, public
 * domain), а если на тему таких снимков нет — CC BY и CC BY-SA. Для каждого
 * файла сохраняем автора, лицензию и ссылку на источник: они попадают в
 * манифест и в PHOTO-CREDITS.md, откуда их видно и разработчику, и владельцу
 * сайта. Перед запуском настоящего сайта такие фото либо оставляют с
 * указанием авторства, либо заменяют своими через медиатеку.
 *
 * Файлы кладутся в public/templates и уезжают в репозиторий: выгруженная
 * статика обязана работать без обращения к чужим серверам.
 *
 * Запуск: npm run photos:fetch
 */

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const API = "https://commons.wikimedia.org/w/api.php";
const UA = "site-builder/1.0 (educational course project; bundles CC media into site templates)";

interface TemplateQueries {
  hero: string[];
  frames: string[];
  tiles: string[];
}

const QUERIES: Record<string, TemplateQueries> = {
  corporate: {
    hero: ["modern office building glass", "office building facade"],
    frames: ["business meeting office", "office team working", "office desk laptop"],
    tiles: ["open space office", "conference room", "office interior workplace", "business handshake"],
  },
  agency: {
    hero: ["design studio workspace", "creative office interior"],
    frames: ["graphic designer working", "designer desk sketch", "photo studio equipment"],
    tiles: ["creative workspace desk", "photography studio", "printing design work", "office brainstorming"],
  },
  shop: {
    hero: ["cosmetics store interior shelves", "beauty shop display", "perfume shop interior"],
    frames: ["cosmetic cream jar", "handmade soap bars", "perfume bottle still life"],
    tiles: ["skincare bottles set", "makeup products flatlay", "cosmetics jars shelf", "gift wrapping box"],
  },
  cafe: {
    hero: ["coffee shop interior", "cafe interior wooden"],
    frames: ["fresh bread bakery", "baker bread oven", "croissant pastry"],
    tiles: ["cup of coffee", "coffee beans", "breakfast table food", "cake dessert plate"],
  },
  blog: {
    hero: ["old town street", "city street market"],
    frames: ["notebook and coffee", "writing in notebook", "reading book cafe"],
    tiles: ["street food stall", "fruit market", "old city architecture", "walking city street"],
  },
  clinic: {
    hero: ["medical clinic waiting room", "doctor consulting room", "dental clinic interior"],
    frames: ["stethoscope medical desk", "blood pressure measurement", "medical examination couch"],
    tiles: ["medical instruments tray", "pharmacy shelf medicine", "hospital ward bed", "microscope laboratory"],
  },
  education: {
    hero: ["computer classroom", "lecture hall seats", "school classroom desks"],
    frames: ["source code screen laptop", "student with laptop studying", "whiteboard teaching room"],
    tiles: ["computer lab room", "students at desks", "books stack study", "keyboard programming desk"],
  },
  construction: {
    hero: ["construction site building", "building under construction"],
    frames: ["apartment renovation", "painting wall room", "carpenter working tools"],
    tiles: ["construction tools", "bricks building material", "architecture blueprint", "interior renovation work"],
  },
  law: {
    hero: ["law library bookshelves", "courthouse facade architecture", "library reading room"],
    frames: ["legal documents desk", "fountain pen signing paper", "notary office desk"],
    tiles: ["law books shelf", "archive folders documents", "justice statue scales", "office desk paperwork"],
  },
  beauty: {
    hero: ["interior view of modern beauty salon", "hairdressing salon interior", "barber shop interior modern"],
    frames: ["hairdresser cutting customer hair", "hair styling salon work", "makeup application face"],
    tiles: ["nail technician manicure", "cosmetics makeup products", "spa massage treatment", "hair washing salon"],
  },
  fitness: {
    hero: ["fitness studio interior", "gym room equipment", "fitness club hall"],
    frames: ["dumbbell rack gym", "barbell weight plates", "punching bag gym"],
    tiles: ["exercise machine gym", "treadmill row gym", "yoga mat studio", "kettlebell weights"],
  },
  travel: {
    hero: ["Registan Samarkand", "Samarkand Uzbekistan architecture"],
    frames: ["Bukhara Uzbekistan", "Khiva Uzbekistan", "Uzbekistan mosque tiles"],
    tiles: ["Chimgan mountains Uzbekistan", "Uzbekistan landscape", "Tashkent city", "Silk road architecture"],
  },
};

const PEOPLE_QUERIES = ["portrait woman face", "portrait man face", "smiling person portrait"];
const PEOPLE_KEY = "_people";
const COUNTS = { frames: 3, tiles: 6, portraits: 6 };

const MIN_BYTES = 30 * 1024;
const MAX_BYTES = 2_600 * 1024;
const MIN_WIDTH = 1200;

/**
 * Викисклад — архив энциклопедии, а не фотосток: рядом с современными снимками
 * лежат книжные развороты, гравюры и отчёты столетней давности. Отсекаем их по
 * названию и по году съёмки — иначе на сайте салона красоты оказывается
 * чёрно-белая фотография парикмахерской 1907 года.
 */
const REJECT_TITLE =
  /(map|diagram|chart|logo|coat of arms|scan|drawing|painting|poster|screenshot|icon|plan of|blueprint|graph|\((?:18|19)\d\d\)|journal|magazine|annual report|engraving|lithograph|catalog|advertisement|postcard|stamp)/i;

/**
 * Свободные лицензии на Викискладе — это прежде всего работы военных и
 * государственных ведомств: без этого отсева у юридического бюро в галерее
 * оказываются переговоры президентов, а у фитнес-клуба — учения моряков.
 */
const REJECT_SOURCE =
  /(u\.?s\.? ?navy|usaf|air force|army|marine|sailor|soldier|military|defen[cs]e|nato|trump|president|minister|parliament|congress|senator|police|firefighter|nasa|iss-|expedition \d|exercise \d|\d{6}-[a-z]-[a-z0-9]{5,})/i;

/** Год, начиная с которого снимок считаем современным. */
const MIN_YEAR = 2008;

const FREE_LICENSES = ["cc0", "public domain", "pdm", "no restrictions", "cc-zero"];
const ATTRIBUTION_LICENSES = ["cc by", "cc-by"];

interface CommonsImage {
  title: string;
  year: number;
  width: number;
  height: number;
  mime: string;
  thumburl: string;
  descriptionurl: string;
  license: string;
  artist: string;
}

export interface PhotoEntry {
  file: string;
  width: number;
  height: number;
  title: string;
  creator: string;
  license: string;
  source: string;
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Запрос с паузой и повторами: Викисклад ограничивает частоту анонимных клиентов. */
async function politeFetch(url: string, attempt = 0): Promise<Response | null> {
  await sleep(250);
  try {
    const response = await fetch(url, { headers: { "User-Agent": UA } });
    if (response.ok) return response;
    if ((response.status === 429 || response.status >= 500) && attempt < 3) {
      await sleep(2000 * (attempt + 1));
      return politeFetch(url, attempt + 1);
    }
    return null;
  } catch {
    if (attempt < 3) {
      await sleep(2000 * (attempt + 1));
      return politeFetch(url, attempt + 1);
    }
    return null;
  }
}

async function search(query: string): Promise<CommonsImage[]> {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrsearch: `${query} filetype:bitmap`,
    gsrnamespace: "6",
    gsrlimit: "40",
    prop: "imageinfo",
    iiprop: "url|size|mime|extmetadata",
    iiurlwidth: "1100",
  });

  const response = await politeFetch(`${API}?${params}`);
  if (!response) return [];

  const data = (await response.json()) as {
    query?: { pages?: Record<string, { title: string; imageinfo?: Record<string, unknown>[] }> };
  };

  const pages = Object.values(data.query?.pages ?? {});
  const out: CommonsImage[] = [];

  for (const page of pages) {
    const info = page.imageinfo?.[0] as
      | {
          width?: number;
          height?: number;
          mime?: string;
          thumburl?: string;
          descriptionurl?: string;
          extmetadata?: Record<string, { value?: string }>;
        }
      | undefined;
    if (!info?.thumburl || !info.mime) continue;
    if (!["image/jpeg", "image/png"].includes(info.mime)) continue;
    if ((info.width ?? 0) < MIN_WIDTH) continue;
    if (REJECT_TITLE.test(page.title) || REJECT_SOURCE.test(page.title)) continue;

    const dateRaw =
      info.extmetadata?.DateTimeOriginal?.value ?? info.extmetadata?.DateTime?.value ?? "";
    const yearMatch = stripHtml(dateRaw).match(/(19|20)\d\d/);
    const year = yearMatch ? Number(yearMatch[0]) : 0;
    if (year > 0 && year < MIN_YEAR) continue;

    out.push({
      title: stripHtml(page.title.replace(/^File:/, "").replace(/\.[a-z]+$/i, "")),
      year,
      width: info.width ?? 0,
      height: info.height ?? 0,
      mime: info.mime,
      thumburl: info.thumburl,
      descriptionurl: info.descriptionurl ?? "",
      license: stripHtml(info.extmetadata?.LicenseShortName?.value ?? "unknown"),
      artist: stripHtml(info.extmetadata?.Artist?.value ?? "—").slice(0, 80),
    });
  }

  return out;
}

/** Сначала снимки без обязательной атрибуции, затем CC BY, затем всё остальное. */
function licenseRank(license: string): number {
  const value = license.toLowerCase();
  if (FREE_LICENSES.some((l) => value.includes(l))) return 0;
  if (ATTRIBUTION_LICENSES.some((l) => value.includes(l)) && !value.includes("sa")) return 1;
  return 2;
}

async function collect(queries: string[], needed: number, square: boolean): Promise<CommonsImage[]> {
  const found: CommonsImage[] = [];
  const seen = new Set<string>();

  for (const query of queries) {
    for (const item of await search(query)) {
      if (seen.has(item.title)) continue;
      const ratio = item.width / Math.max(item.height, 1);
      if (square ? ratio < 0.7 || ratio > 1.5 : ratio < 1.1) continue;
      seen.add(item.title);
      found.push(item);
    }
    if (found.length >= needed * 4) break;
  }

  // Сначала снимки с известной свежей датой и свободной лицензией: они
  // выглядят как настоящая съёмка сегодняшнего бизнеса, а не как архив.
  return found.sort((a, b) => {
    const dated = (item: CommonsImage) => (item.year >= MIN_YEAR ? 0 : 1);
    return dated(a) - dated(b) || licenseRank(a.license) - licenseRank(b.license) || b.year - a.year;
  });
}

async function download(
  items: CommonsImage[],
  used: Set<string>,
  dir: string,
  name: string,
): Promise<PhotoEntry | null> {
  for (const item of items) {
    if (used.has(item.title)) continue;

    try {
      const response = await politeFetch(item.thumburl);
      if (!response) continue;
      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length < MIN_BYTES || buffer.length > MAX_BYTES) continue;

      const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8;
      const isPng = buffer[0] === 0x89 && buffer[1] === 0x50;
      if (!isJpeg && !isPng) continue;

      const file = `${name}${isJpeg ? ".jpg" : ".png"}`;
      await writeFile(path.join(dir, file), buffer);
      used.add(item.title);

      return {
        file,
        width: item.width,
        height: item.height,
        title: item.title,
        creator: item.artist,
        license: item.license,
        source: item.descriptionurl,
      };
    } catch {
      // Недоступный файл — берём следующий кандидат.
    }
  }
  return null;
}

async function exists(file: string): Promise<boolean> {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const root = path.join(process.cwd(), "public", "templates");
  await mkdir(root, { recursive: true });

  // Скачанное в прошлый раз переиспользуем: запуск добирает только пробелы.
  const cachePath = path.join(root, "manifest.json");
  const manifest: Record<string, PhotoEntry> = (await exists(cachePath))
    ? (JSON.parse(await readFile(cachePath, "utf8")) as Record<string, PhotoEntry>)
    : {};

  const peopleDir = path.join(root, PEOPLE_KEY);
  await mkdir(peopleDir, { recursive: true });
  const portraits: PhotoEntry[] = [];
  const havePortraits = Object.keys(manifest).filter((k) => k.endsWith("/portrait-1")).length > 0;
  if (havePortraits) {
    for (let i = 1; i <= COUNTS.portraits; i++) {
      const cached = Object.entries(manifest).find(([k]) => k.endsWith(`/portrait-${i}`))?.[1];
      if (cached) portraits.push(cached);
    }
  } else {
    const peopleItems = await collect(PEOPLE_QUERIES, COUNTS.portraits, true);
    const peopleUsed = new Set<string>();
    for (let i = 1; i <= COUNTS.portraits; i++) {
      const entry = await download(peopleItems, peopleUsed, peopleDir, `portrait-${i}`);
      if (entry) portraits.push({ ...entry, file: `${PEOPLE_KEY}/${entry.file}` });
    }
  }
  console.log(`${PEOPLE_KEY.padEnd(13)} портретов: ${portraits.length}`);

  for (const [key, queries] of Object.entries(QUERIES)) {
    const dir = path.join(root, key);
    await mkdir(dir, { recursive: true });
    const used = new Set<string>();
    let count = 0;

    // Шаблон уже укомплектован — пропускаем, чтобы не качать одно и то же.
    const slots = ["hero", ...Array.from({ length: COUNTS.frames }, (_, i) => `frame-${i + 1}`),
      ...Array.from({ length: COUNTS.tiles }, (_, i) => `tile-${i + 1}`)];
    const missing = slots.filter((slot) => !manifest[`${key}/${slot}`]);
    if (missing.length === 0) {
      for (const [i, portrait] of portraits.entries()) manifest[`${key}/portrait-${i + 1}`] = portrait;
      console.log(`${key.padEnd(13)} уже загружено`);
      continue;
    }

    const hero = manifest[`${key}/hero`]
      ? null
      : await download(await collect(queries.hero, 1, false), used, dir, "hero");
    if (hero) {
      manifest[`${key}/hero`] = { ...hero, file: `${key}/${hero.file}` };
      count++;
    }

    const frameItems = await collect(queries.frames, COUNTS.frames, false);
    for (let i = 1; i <= COUNTS.frames; i++) {
      if (manifest[`${key}/frame-${i}`]) continue;
      const entry = await download(frameItems, used, dir, `frame-${i}`);
      if (entry) {
        manifest[`${key}/frame-${i}`] = { ...entry, file: `${key}/${entry.file}` };
        count++;
      }
    }

    const tileItems = await collect(queries.tiles, COUNTS.tiles, false);
    for (let i = 1; i <= COUNTS.tiles; i++) {
      if (manifest[`${key}/tile-${i}`]) continue;
      const entry = await download(tileItems, used, dir, `tile-${i}`);
      if (entry) {
        manifest[`${key}/tile-${i}`] = { ...entry, file: `${key}/${entry.file}` };
        count++;
      }
    }

    // Обложки статей — те же снимки, что и плитки: отдельные кадры того же
    // сюжета ничего не добавляют, а вес репозитория удваивают.
    for (let i = 1; i <= 4; i++) {
      const source = manifest[`${key}/tile-${((i + 1) % COUNTS.tiles) + 1}`] ?? manifest[`${key}/tile-1`];
      if (source) manifest[`${key}/cover-${i}`] = source;
    }

    for (const [i, portrait] of portraits.entries()) {
      manifest[`${key}/portrait-${i + 1}`] = portrait;
    }

    console.log(`${key.padEnd(13)} загружено: ${count}`);
  }

  await writeFile(cachePath, JSON.stringify(manifest, null, 2), "utf8");
  await writeManifest(manifest);
  await writeCredits(manifest);
  console.log(`\nГотово: ${Object.keys(manifest).length} записей в манифесте.`);
}

async function writeManifest(manifest: Record<string, PhotoEntry>) {
  const body = `/**
 * Манифест фотографий шаблонов — создаётся scripts/fetch-template-photos.ts.
 * Руками не правится.
 *
 * Ключ — «<шаблон>/<имя>», как в идентификаторах \`tpl:<шаблон>/<имя>\`.
 * Файл лежит в public/templates/<file>. Автор, лицензия и ссылка на источник
 * продублированы в PHOTO-CREDITS.md.
 */
export interface TemplatePhoto {
  file: string;
  width: number;
  height: number;
  title: string;
  creator: string;
  license: string;
  source: string;
}

export const TEMPLATE_PHOTOS: Record<string, TemplatePhoto> = ${JSON.stringify(manifest, null, 2)};
`;
  await writeFile(path.join(process.cwd(), "src/lib/site-templates/photo-manifest.ts"), body, "utf8");
}

async function writeCredits(manifest: Record<string, PhotoEntry>) {
  const unique = new Map<string, PhotoEntry>();
  for (const entry of Object.values(manifest)) unique.set(entry.file, entry);

  const rows = [...unique.values()]
    .sort((a, b) => a.file.localeCompare(b.file))
    .map((e) => `| \`${e.file}\` | ${e.title} | ${e.creator} | ${e.license} | ${e.source} |`)
    .join("\n");

  const body = `# Photo credits · Fotolar uchun manba · Источники фотографий

Demo photos bundled with the site templates come from Wikimedia Commons. Files licensed CC0 or in the
public domain need no attribution; files under CC BY / CC BY-SA must keep the credit below when the
site goes live, or be replaced through the media library.

Shablonlar bilan birga keladigan fotolar Wikimedia Commons'dan olingan. CC0 va public domain fayllar
uchun muallifni ko'rsatish shart emas; CC BY / CC BY-SA fayllar uchun quyidagi ma'lumot saqlanishi
yoki fotolar mediateka orqali almashtirilishi kerak.

Демонстрационные фотографии шаблонов взяты с Викисклада. Файлы под CC0 и public domain не требуют
указания авторства; файлы под CC BY / CC BY-SA нужно либо сопроводить указанием ниже, либо заменить
своими через медиатеку.

| File | Title | Author | License | Source |
|---|---|---|---|---|
${rows}
`;
  await writeFile(path.join(process.cwd(), "PHOTO-CREDITS.md"), body, "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
