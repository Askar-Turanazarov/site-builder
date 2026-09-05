"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { serializeBlocks } from "@/blocks/types";
import { getSiteTemplate, materializeBlocks, type SiteTemplate } from "@/lib/site-templates";

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
          blocksRu: serializeBlocks(materializeBlocks(page.blocks, "ru")),
          blocksUz: serializeBlocks(materializeBlocks(page.blocks, "uz")),
          blocksEn: serializeBlocks(materializeBlocks(page.blocks, "en")),
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
          blocksRu: serializeBlocks(materializeBlocks(post.blocks, "ru")),
          blocksUz: serializeBlocks(materializeBlocks(post.blocks, "uz")),
          blocksEn: serializeBlocks(materializeBlocks(post.blocks, "en")),
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
