-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "siteNameRu" TEXT NOT NULL,
    "siteNameUz" TEXT NOT NULL,
    "siteNameEn" TEXT NOT NULL,
    "taglineRu" TEXT,
    "taglineUz" TEXT,
    "taglineEn" TEXT,
    "defaultLocale" TEXT NOT NULL DEFAULT 'ru',
    "themeKey" TEXT NOT NULL DEFAULT 'business',
    "logoMediaId" TEXT,
    "faviconMediaId" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "contactAddressRu" TEXT,
    "contactAddressUz" TEXT,
    "contactAddressEn" TEXT,
    "socialLinks" TEXT,
    "contactFormAction" TEXT,
    "footerNoteRu" TEXT,
    "footerNoteUz" TEXT,
    "footerNoteEn" TEXT,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_SiteSettings" ("contactAddressEn", "contactAddressRu", "contactAddressUz", "contactEmail", "contactFormAction", "contactPhone", "defaultLocale", "faviconMediaId", "footerNoteEn", "footerNoteRu", "footerNoteUz", "id", "logoMediaId", "siteNameEn", "siteNameRu", "siteNameUz", "socialLinks", "taglineEn", "taglineRu", "taglineUz", "updatedAt") SELECT "contactAddressEn", "contactAddressRu", "contactAddressUz", "contactEmail", "contactFormAction", "contactPhone", "defaultLocale", "faviconMediaId", "footerNoteEn", "footerNoteRu", "footerNoteUz", "id", "logoMediaId", "siteNameEn", "siteNameRu", "siteNameUz", "socialLinks", "taglineEn", "taglineRu", "taglineUz", "updatedAt" FROM "SiteSettings";
DROP TABLE "SiteSettings";
ALTER TABLE "new_SiteSettings" RENAME TO "SiteSettings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
