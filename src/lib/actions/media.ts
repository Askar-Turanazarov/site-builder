"use server";

import { mkdir, writeFile, unlink } from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
}

export async function listMediaAction() {
  await requireAdmin();
  return prisma.media.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
}

export interface UploadMediaState {
  error?: string;
  mediaId?: string;
}

export async function uploadMediaAction(
  _prevState: UploadMediaState,
  formData: FormData,
): Promise<UploadMediaState> {
  await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Выберите файл" };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "Можно загружать только изображения" };
  }
  if (file.size > 8 * 1024 * 1024) {
    return { error: "Файл больше 8 МБ" };
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const filename = `${nanoid(10)}-${sanitizeFilename(file.name)}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  const media = await prisma.media.create({
    data: {
      filename: file.name,
      path: filename,
      mimeType: file.type,
      size: file.size,
      width: null,
      height: null,
    },
  });

  revalidatePath("/admin/media");
  return { mediaId: media.id };
}

export async function deleteMediaAction(id: string) {
  await requireAdmin();
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return;

  await prisma.media.delete({ where: { id } });
  try {
    await unlink(path.join(UPLOAD_DIR, media.path));
  } catch {
    // file already gone — ignore
  }
  revalidatePath("/admin/media");
}

export async function updateMediaAltAction(id: string, alt: { altRu?: string; altUz?: string; altEn?: string }) {
  await requireAdmin();
  await prisma.media.update({ where: { id }, data: alt });
  revalidatePath("/admin/media");
}
