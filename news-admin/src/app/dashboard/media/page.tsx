import { prisma } from "@/lib/prisma";
import MediaLibraryClient from "./MediaLibraryClient";

export default async function MediaPage() {
  const media = await prisma.media.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <MediaLibraryClient media={media} />;
}