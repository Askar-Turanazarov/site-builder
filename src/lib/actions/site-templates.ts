"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { serializeBlocks, type Block } from "@/blocks/types";
import { LOCALES } from "@/blocks/context";
import {
  getSiteTemplate,
  materializeBlocks,
  templatePostCover,
  type SiteTemplate,
} from "@/lib/site-templates";
import { collectArtIds, remapArtIds } from "@/lib/site-templates/art";
import { importTemplateArt } from "@/lib/site-templates/import-art";

export type ApplyTemplateMode = "replace" | "append";

/**
 * Применяет шаблон сайта целиком: страницы, рубрики, статьи, меню, тему,
 * шрифты и настройки.
 *
 * Режим «replace» чистит текущее содержимое (страницы, статьи, рубрики, меню)
 * и переносит настройки шаблона в SiteSettings; «append» добавляет содержимое
 * рядом с существующим и настройки не трогает — иначе добавление одного
 * шаблона незаметно переписало бы название и контакты работающего сайта.
 *
 * Медиатека не затрагивается ни в одном режиме: картинки загружал
 * администратор, шаблон на них не ссылается (все mediaId в шаблонах — null).
 *
 * Всё выполняется в одной транзакции: при ошибке на середине сайт остаётся
 * в прежнем состоянии, а не с половиной шаблона.
 */
export async function applySiteTemplateAction(key: string, mode: ApplyTemplateMode) {
  await requireAdmin();

  const template = getSiteTemplate(key);
  if (!template) throw new Error("templateNotFound");

  // Слаги шаблона не должны конфликтовать с уже существующими: в режиме
  // «append» одинаковый слаг сломал бы транзакцию на уникальном индексе.
  const suffix = mode === "append" ? await buildSuffix(template) : "";
  const now = new Date();

  // Графика шаблона переезжает в медиатеку: после применения это обычные
  // картинки сайта — их видно в библиотеке, можно заменить своими, и
  // статический экспорт забирает их вместе с остальными загрузками.
  const artMap = await importTemplateArt(prisma, templateArtIds(template), template.label);

  await prisma.$transaction(async (tx) => {
    if (mode === "replace") {
      // Порядок важен: пункты меню ссылаются на страницы и рубрики,
      // статьи — на рубрики.
      await tx.menuItem.deleteMany({});
      await tx.post.deleteMany({});
      await tx.category.deleteMany({});
      await tx.page.deleteMany({});
    }

    const pageIdBySlug = new Map<string, string>();
    for (const page of template.pages) {
      const slug = withSuffix(page.slug, suffix);
      const isHomepage = mode === "replace" && !!page.isHomepage;
      const created = await tx.page.create({
        data: {
          slug,
          isHomepage,
          templateKey: `site:${template.key}`,
          titleRu: page.title.ru,
          titleUz: page.title.uz,
          titleEn: page.title.en,
          metaDescRu: page.metaDesc.ru,
          metaDescUz: page.metaDesc.uz,
          metaDescEn: page.metaDesc.en,
          blocksRu: blocksFor(template, page.blocks, "ru", artMap),
          blocksUz: blocksFor(template, page.blocks, "uz", artMap),
          blocksEn: blocksFor(template, page.blocks, "en", artMap),
          status: "published",
          publishedAt: now,
        },
      });
      pageIdBySlug.set(page.slug, created.id);
    }

    const categoryIdBySlug = new Map<string, string>();
    for (const category of template.categories) {
      const created = await tx.category.create({
        data: {
          slug: withSuffix(category.slug, suffix),
          nameRu: category.name.ru,
          nameUz: category.name.uz,
          nameEn: category.name.en,
          descRu: category.description.ru,
          descUz: category.description.uz,
          descEn: category.description.en,
          order: category.order,
        },
      });
      categoryIdBySlug.set(category.slug, created.id);
    }

    for (const [index, post] of template.posts.entries()) {
      const categoryId = categoryIdBySlug.get(post.categorySlug);
      if (!categoryId) continue;
      await tx.post.create({
        data: {
          slug: withSuffix(post.slug, suffix),
          categoryId,
          titleRu: post.title.ru,
          titleUz: post.title.uz,
          titleEn: post.title.en,
          excerptRu: post.excerpt.ru,
          excerptUz: post.excerpt.uz,
          excerptEn: post.excerpt.en,
          blocksRu: blocksFor(template, post.blocks, "ru", artMap),
          blocksUz: blocksFor(template, post.blocks, "uz", artMap),
          blocksEn: blocksFor(template, post.blocks, "en", artMap),
          coverMediaId: artMap.get(templatePostCover(template.key, index)) ?? null,
          status: "published",
          // Разносим даты публикации, чтобы лента новостей не выглядела
          // созданной одной секундой.
          publishedAt: new Date(now.getTime() - index * 86_400_000),
        },
      });
    }

    for (const item of template.menu) {
      const pageId = item.linkType === "page" ? pageIdBySlug.get(item.target) : null;
      const categoryId = item.linkType === "category" ? categoryIdBySlug.get(item.target) : null;
      if (item.linkType !== "custom" && !pageId && !categoryId) continue;

      await tx.menuItem.create({
        data: {
          labelRu: item.label.ru,
          labelUz: item.label.uz,
          labelEn: item.label.en,
          linkType: item.linkType,
          pageId: pageId ?? null,
          categoryId: categoryId ?? null,
          customUrl: item.linkType === "custom" ? item.target : null,
          order: item.order,
          location: item.location,
        },
      });
    }

    if (mode === "replace") {
      const s = template.settings;
      const settingsData = {
        siteNameRu: s.siteName.ru,
        siteNameUz: s.siteName.uz,
        siteNameEn: s.siteName.en,
        taglineRu: s.tagline.ru,
        taglineUz: s.tagline.uz,
        taglineEn: s.tagline.en,
        themeKey: template.themeKey,
        // Скин — половина визуального языка шаблона: без него сайт получит
        // палитру, но не ритм и не трактовку карточек.
        skinKey: template.design?.skin ?? null,
        fontDisplay: template.design?.fontDisplay ?? null,
        fontBody: template.design?.fontBody ?? null,
        radiusScale: template.design?.radiusScale ?? null,
        // Цветовые переопределения снимаем: палитру задаёт тема шаблона.
        accentColor: null,
        paperColor: null,
        inkColor: null,
        contactEmail: s.contactEmail,
        contactPhone: s.contactPhone,
        contactAddressRu: s.contactAddress.ru,
        contactAddressUz: s.contactAddress.uz,
        contactAddressEn: s.contactAddress.en,
        footerNoteRu: s.footerNote.ru,
        footerNoteUz: s.footerNote.uz,
        footerNoteEn: s.footerNote.en,
      };

      await tx.siteSettings.upsert({
        where: { id: "singleton" },
        update: settingsData,
        create: { id: "singleton", defaultLocale: "ru", ...settingsData },
      });
    }
  });

  // Шаблон меняет публичный сайт целиком и списки во всей админке.
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
}

/** Блоки одного языка: разворачиваем шаблон, подставляем картинки, сериализуем. */
function blocksFor(
  template: SiteTemplate,
  blocks: Parameters<typeof materializeBlocks>[0],
  locale: (typeof LOCALES)[number],
  artMap: Map<string, string>,
): string {
  const materialized = materializeBlocks(blocks, locale, template.key);
  return serializeBlocks(remapArtIds<Block[]>(materialized, artMap));
}

/** Идентификаторы графики, которые встречаются в развёрнутом шаблоне. */
function templateArtIds(template: SiteTemplate): Set<string> {
  // Достаточно одного языка: картинки от языка не зависят.
  const used = new Set<string>();
  for (const page of template.pages) {
    collectArtIds(materializeBlocks(page.blocks, "ru", template.key), used);
  }
  for (const [index, post] of template.posts.entries()) {
    collectArtIds(materializeBlocks(post.blocks, "ru", template.key), used);
    used.add(templatePostCover(template.key, index));
  }
  return used;
}

function withSuffix(slug: string, suffix: string): string {
  return suffix ? `${slug}-${suffix}` : slug;
}

/**
 * Ищет свободный суффикс для режима «добавить к текущему»: сначала ключ
 * шаблона, затем ключ с номером. Достаточно проверить страницы, рубрики и
 * статьи — только у них есть уникальный слаг.
 */
async function buildSuffix(template: SiteTemplate): Promise<string> {
  const slugs = [
    ...template.pages.map((p) => p.slug),
    ...template.categories.map((c) => c.slug),
    ...template.posts.map((p) => p.slug),
  ];

  for (let attempt = 0; attempt < 50; attempt++) {
    const suffix = attempt === 0 ? template.key : `${template.key}-${attempt + 1}`;
    const candidates = slugs.map((slug) => `${slug}-${suffix}`);
    const [pages, categories, posts] = await Promise.all([
      prisma.page.count({ where: { slug: { in: candidates } } }),
      prisma.category.count({ where: { slug: { in: candidates } } }),
      prisma.post.count({ where: { slug: { in: candidates } } }),
    ]);
    if (pages + categories + posts === 0) return suffix;
  }

  return `${template.key}-${Date.now()}`;
}
