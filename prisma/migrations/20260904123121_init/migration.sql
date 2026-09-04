-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "siteNameRu" TEXT NOT NULL,
    "siteNameUz" TEXT NOT NULL,
    "siteNameEn" TEXT NOT NULL,
    "taglineRu" TEXT,
    "taglineUz" TEXT,
    "taglineEn" TEXT,
    "defaultLocale" TEXT NOT NULL DEFAULT 'ru',
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

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "labelRu" TEXT NOT NULL,
    "labelUz" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "linkType" TEXT NOT NULL,
    "pageId" TEXT,
    "categoryId" TEXT,
    "customUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "location" TEXT NOT NULL DEFAULT 'header',
    "parentId" TEXT,
    CONSTRAINT "MenuItem_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MenuItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MenuItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "MenuItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "isHomepage" BOOLEAN NOT NULL DEFAULT false,
    "templateKey" TEXT,
    "titleRu" TEXT NOT NULL,
    "titleUz" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "metaDescRu" TEXT,
    "metaDescUz" TEXT,
    "metaDescEn" TEXT,
    "blocksRu" TEXT NOT NULL DEFAULT '[]',
    "blocksUz" TEXT NOT NULL DEFAULT '[]',
    "blocksEn" TEXT NOT NULL DEFAULT '[]',
    "status" TEXT NOT NULL DEFAULT 'draft',
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameUz" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "descRu" TEXT,
    "descUz" TEXT,
    "descEn" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "layoutKey" TEXT,
    "titleRu" TEXT NOT NULL,
    "titleUz" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "excerptRu" TEXT,
    "excerptUz" TEXT,
    "excerptEn" TEXT,
    "coverMediaId" TEXT,
    "blocksRu" TEXT NOT NULL DEFAULT '[]',
    "blocksUz" TEXT NOT NULL DEFAULT '[]',
    "blocksEn" TEXT NOT NULL DEFAULT '[]',
    "metaDescRu" TEXT,
    "metaDescUz" TEXT,
    "metaDescEn" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "size" INTEGER NOT NULL,
    "altRu" TEXT,
    "altUz" TEXT,
    "altEn" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "DictionaryEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "valueRu" TEXT NOT NULL,
    "valueUz" TEXT NOT NULL,
    "valueEn" TEXT NOT NULL,
    "group" TEXT NOT NULL DEFAULT 'general',
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "DictionaryEntry_key_key" ON "DictionaryEntry"("key");
