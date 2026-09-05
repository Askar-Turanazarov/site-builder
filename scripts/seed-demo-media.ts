/**
 * Разложить графику по уже существующему демо-сайту.
 *
 * Тот же шаг, что делает `npm run db:seed` в конце, но без пересоздания
 * контента — для баз, которые были заполнены до появления картинок.
 */
import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import { seedDemoMedia } from "../src/lib/seed-data/demo-media";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const images = await seedDemoMedia(prisma);
  console.log(images > 0 ? `Готово: ${images} изображений в медиатеке.` : "Картинки уже расставлены.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
