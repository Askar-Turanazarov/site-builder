import { requireAdmin } from "@/lib/auth";
import { generateSite } from "@/lib/export/generateSite";
import { zipFiles } from "@/lib/export/zip";

export async function GET() {
  await requireAdmin();

  const { files } = await generateSite();
  const zip = await zipFiles(files);

  return new Response(new Uint8Array(zip), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="site-export.zip"`,
      "Content-Length": String(zip.length),
    },
  });
}
