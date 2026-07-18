import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL MEDIA
export async function GET() {
  try {
    const media = await prisma.media.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error("MEDIA FETCH ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch media",
      },
      {
        status: 500,
      }
    );
  }
}