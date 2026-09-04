import { ZipArchive } from "archiver";
import type { ExportFile } from "./generateSite";

export function zipFiles(files: ExportFile[]): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const archive = new ZipArchive({ zlib: { level: 9 } });
    const chunks: Buffer[] = [];

    archive.on("data", (chunk: Buffer) => chunks.push(chunk));
    archive.on("error", reject);
    archive.on("end", () => resolve(Buffer.concat(chunks)));

    for (const file of files) {
      archive.append(file.content, { name: file.path });
    }

    archive.finalize();
  });
}
