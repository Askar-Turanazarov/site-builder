import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import { DICTIONARY_SEED } from "../src/lib/seed-data/dictionary";
import { DEMO_CATEGORIES, DEMO_POSTS } from "../src/lib/seed-data/demo-content";
import { restaurantHomepage } from "../src/lib/templates/homepage/restaurant";
import { aboutTemplate } from "../src/lib/templates/inner/about";
import { contactTemplate } from "../src/lib/templates/inner/contact";
import { serializeBlocks } from "../src/blocks/types";
import { seedDemoMedia } from "../src/lib/seed-data/demo-media";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.log("  ADMIN_EMAIL/ADMIN_PASSWORD not set — skipping admin user (created on first login instead).");
    return;
  }
  const existing = await prisma.adminUser.findFirst();
  if (existing) return;
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.create({ data: { email, passwordHash } });
  console.log(`  Admin user ready: ${email}`);
}

async function seedSiteSettings() {
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      siteNameRu: "Кафе «Зерно»",
      siteNameUz: "«Zerno» kafesi",
      siteNameEn: "Zerno Café",
      taglineRu: "Свежий хлеб, кофе своей обжарки и домашняя кухня",
      taglineUz: "Yangi non, o'zi qovurgan qahva va uy taomlari",
      taglineEn: "Fresh bread, house-roasted coffee, home-style cooking",
      defaultLocale: "ru",
      themeKey: "restaurant",
      contactEmail: "hello@zerno.example",
      contactPhone: "+998 90 123 45 67",
      contactAddressRu: "ул. Центральная, 12",
      contactAddressUz: "Markaziy ko'chasi, 12",
      contactAddressEn: "12 Central Street",
      footerNoteRu: "© Кафе «Зерно». Все права защищены.",
      footerNoteUz: "© «Zerno» kafesi. Barcha huquqlar himoyalangan.",
      footerNoteEn: "© Zerno Café. All rights reserved.",
    },
  });
}

async function seedDictionary() {
  for (const entry of DICTIONARY_SEED) {
    await prisma.dictionaryEntry.upsert({
      where: { key: entry.key },
      update: { valueRu: entry.valueRu, valueUz: entry.valueUz, valueEn: entry.valueEn, group: entry.group },
      create: entry,
    });
  }
  console.log(`  ${DICTIONARY_SEED.length} dictionary entries ready.`);
}

async function seedPages() {
  const home = await prisma.page.upsert({
    where: { slug: "home" },
    update: {},
    create: {
      slug: "home",
      isHomepage: true,
      templateKey: restaurantHomepage.key,
      titleRu: restaurantHomepage.titleRu,
      titleUz: restaurantHomepage.titleUz,
      titleEn: restaurantHomepage.titleEn,
      blocksRu: serializeBlocks(restaurantHomepage.blocksRu),
      blocksUz: serializeBlocks(restaurantHomepage.blocksUz),
      blocksEn: serializeBlocks(restaurantHomepage.blocksEn),
      status: "published",
      publishedAt: new Date(),
    },
  });

  const about = await prisma.page.upsert({
    where: { slug: "about" },
    update: {},
    create: {
      slug: "about",
      templateKey: aboutTemplate.key,
      titleRu: aboutTemplate.titleRu,
      titleUz: aboutTemplate.titleUz,
      titleEn: aboutTemplate.titleEn,
      blocksRu: serializeBlocks(aboutTemplate.blocksRu),
      blocksUz: serializeBlocks(aboutTemplate.blocksUz),
      blocksEn: serializeBlocks(aboutTemplate.blocksEn),
      status: "published",
      publishedAt: new Date(),
    },
  });

  const contact = await prisma.page.upsert({
    where: { slug: "contact" },
    update: {},
    create: {
      slug: "contact",
      templateKey: contactTemplate.key,
      titleRu: contactTemplate.titleRu,
      titleUz: contactTemplate.titleUz,
      titleEn: contactTemplate.titleEn,
      blocksRu: serializeBlocks(contactTemplate.blocksRu),
      blocksUz: serializeBlocks(contactTemplate.blocksUz),
      blocksEn: serializeBlocks(contactTemplate.blocksEn),
      status: "published",
      publishedAt: new Date(),
    },
  });

  console.log("  Pages ready: home, about, contact.");
  return { home, about, contact };
}

async function seedCategories() {
  const bySlug = new Map<string, { id: string }>();
  for (const cat of DEMO_CATEGORIES) {
    const row = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        slug: cat.slug,
        nameRu: cat.nameRu,
        nameUz: cat.nameUz,
        nameEn: cat.nameEn,
        descRu: cat.descRu,
        descUz: cat.descUz,
        descEn: cat.descEn,
        order: cat.order,
      },
    });
    bySlug.set(cat.slug, row);
  }
  console.log(`  ${DEMO_CATEGORIES.length} categories ready.`);
  return bySlug;
}

async function seedPosts(categoriesBySlug: Map<string, { id: string }>) {
  for (const post of DEMO_POSTS) {
    const category = categoriesBySlug.get(post.categorySlug);
    if (!category) continue;
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        categoryId: category.id,
        titleRu: post.titleRu,
        titleUz: post.titleUz,
        titleEn: post.titleEn,
        excerptRu: post.excerptRu,
        excerptUz: post.excerptUz,
        excerptEn: post.excerptEn,
        blocksRu: serializeBlocks(post.blocksRu),
        blocksUz: serializeBlocks(post.blocksUz),
        blocksEn: serializeBlocks(post.blocksEn),
        status: "published",
        publishedAt: new Date(post.publishedAt),
      },
    });
  }
  console.log(`  ${DEMO_POSTS.length} demo posts ready.`);
}

async function seedMenu(pages: { home: { id: string }; about: { id: string }; contact: { id: string } }) {
  const existing = await prisma.menuItem.count();
  if (existing > 0) {
    console.log("  Menu already has items — skipping.");
    return;
  }

  await prisma.menuItem.createMany({
    data: [
      { labelRu: "Главная", labelUz: "Bosh sahifa", labelEn: "Home", linkType: "page", pageId: pages.home.id, order: 0, location: "header" },
      { labelRu: "О нас", labelUz: "Biz haqimizda", labelEn: "About", linkType: "page", pageId: pages.about.id, order: 1, location: "header" },
      { labelRu: "Новости", labelUz: "Yangiliklar", labelEn: "News", linkType: "custom", customUrl: "/news", order: 2, location: "header" },
      { labelRu: "Контакты", labelUz: "Aloqa", labelEn: "Contact", linkType: "page", pageId: pages.contact.id, order: 3, location: "header" },
      { labelRu: "О нас", labelUz: "Biz haqimizda", labelEn: "About", linkType: "page", pageId: pages.about.id, order: 0, location: "footer" },
      { labelRu: "Контакты", labelUz: "Aloqa", labelEn: "Contact", linkType: "page", pageId: pages.contact.id, order: 1, location: "footer" },
    ],
  });
  console.log("  Header/footer menu ready.");
}

async function main() {
  console.log("Seeding…");
  await seedAdminUser();
  await seedSiteSettings();
  await seedDictionary();
  const pages = await seedPages();
  const categories = await seedCategories();
  await seedPosts(categories);
  await seedMenu(pages);
  const images = await seedDemoMedia(prisma);
  console.log(`  Demo media ready: ${images} images.`);
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
