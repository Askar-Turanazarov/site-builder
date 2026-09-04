import { prisma } from "@/lib/prisma";
import { MediaLibrary } from "./MediaLibrary";

export default async function MediaPage() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });
  return <MediaLibrary initialMedia={media} />;
}
