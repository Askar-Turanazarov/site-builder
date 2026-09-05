import { parseBlocks, serializeBlocks, type Block } from "../../blocks/types";
import { collectArtIds, remapArtIds } from "../site-templates/art";
import { importTemplateArt, type MediaStore } from "../site-templates/import-art";
import { fillTemplateArt, templatePostCover } from "../site-templates/types";

/**
 * Картинки для демо-сайта.
 *
 * Демо-контент из сида написан текстом и без изображений: hero без обложки,
 * пустая галерея, статьи без обложек. Показывать такой сайт как пример работы
 * конструктора нечестно, поэтому берём тот же набор графики, что и у шаблона
 * кафе, и раскладываем его по уже созданным страницам.
 *
 * Функция идемпотентна: повторный запуск не создаёт вторых копий файлов и не
 * трогает блоки, где картинка уже стоит.
 */

const ART_KEY = "cafe";
const MEDIA_KEYS = ["imageMediaId", "photoMediaId", "avatarMediaId", "coverMediaId"];
const LABEL = { ru: "Кафе «Зерно»", uz: "«Zerno» kafesi", en: "Zerno Café" };

interface ContentStore extends MediaStore {
  media: MediaStore["media"] & {
    findMany(args?: unknown): Promise<{ id: string }[]>;
  };
  page: {
    findMany(args?: unknown): Promise<
      { id: string; blocksRu: string; blocksUz: string; blocksEn: string }[]
    >;
    update(args: { where: { id: string }; data: Record<string, unknown> }): Promise<unknown>;
  };
  post: {
    findMany(args?: unknown): Promise<
      {
        id: string;
        coverMediaId: string | null;
        blocksRu: string;
        blocksUz: string;
        blocksEn: string;
      }[]
    >;
    update(args: { where: { id: string }; data: Record<string, unknown> }): Promise<unknown>;
  };
}

type LocaleField = "blocksRu" | "blocksUz" | "blocksEn";
const FIELDS: LocaleField[] = ["blocksRu", "blocksUz", "blocksEn"];

export async function seedDemoMedia(db: ContentStore): Promise<number> {
  const [pages, posts, media] = await Promise.all([
    db.page.findMany(),
    db.post.findMany(),
    db.media.findMany(),
  ]);

  // Ссылки на удалённые картинки чистим: иначе блок считается заполненным и
  // новая фотография в него не встанет, а на сайте зияет пустое место.
  const alive = new Set(media.map((m) => m.id));
  const prune = (blocks: Block[]): Block[] =>
    JSON.parse(
      JSON.stringify(blocks, (key, value) =>
        MEDIA_KEYS.includes(key) && typeof value === "string" && !alive.has(value) ? null : value,
      ),
    ) as Block[];

  // Сначала выясняем, какие картинки понадобятся: три языковых дерева одной
  // страницы устроены одинаково, поэтому идентификаторы совпадут.
  const filled = new Map<string, Record<LocaleField, Block[]>>();
  const needed = new Set<string>();

  for (const row of [...pages, ...posts]) {
    const trees = {} as Record<LocaleField, Block[]>;
    for (const field of FIELDS) {
      trees[field] = fillTemplateArt(prune(parseBlocks(row[field])), ART_KEY);
      collectArtIds(trees[field], needed);
    }
    filled.set(row.id, trees);
  }

  posts.forEach((post, index) => {
    if (!post.coverMediaId || !alive.has(post.coverMediaId)) {
      needed.add(templatePostCover(ART_KEY, index));
    }
  });

  if (needed.size === 0) return 0;

  const artMap = await importTemplateArt(db, needed, LABEL);
  if (artMap.size === 0) return 0;

  for (const page of pages) {
    const trees = filled.get(page.id)!;
    await db.page.update({
      where: { id: page.id },
      data: {
        blocksRu: serializeBlocks(remapArtIds<Block[]>(trees.blocksRu, artMap)),
        blocksUz: serializeBlocks(remapArtIds<Block[]>(trees.blocksUz, artMap)),
        blocksEn: serializeBlocks(remapArtIds<Block[]>(trees.blocksEn, artMap)),
      },
    });
  }

  for (const [index, post] of posts.entries()) {
    const trees = filled.get(post.id)!;
    await db.post.update({
      where: { id: post.id },
      data: {
        blocksRu: serializeBlocks(remapArtIds<Block[]>(trees.blocksRu, artMap)),
        blocksUz: serializeBlocks(remapArtIds<Block[]>(trees.blocksUz, artMap)),
        blocksEn: serializeBlocks(remapArtIds<Block[]>(trees.blocksEn, artMap)),
        coverMediaId:
          post.coverMediaId && alive.has(post.coverMediaId)
            ? post.coverMediaId
            : (artMap.get(templatePostCover(ART_KEY, index)) ?? null),
      },
    });
  }

  return artMap.size;
}
