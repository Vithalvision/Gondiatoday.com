import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Get media from DB
    const media = await prisma.media.findUnique({
      where: { id: params.id },
    });

    // 2. If not found
    if (!media) {
      return NextResponse.json(
        { error: "Media not found" },
        { status: 404 }
      );
    }

    // 3. Validate publicId
    if (!media.publicId) {
      return NextResponse.json(
        { error: "publicId missing in DB" },
        { status: 400 }
      );
    }

    console.log("Deleting publicId:", media.publicId);

    // 4. Delete from Cloudinary (ONLY ONCE)
    const result = await cloudinary.uploader.destroy(media.publicId);

    console.log("Cloudinary result:", result);

    // 5. Delete from DB
    await prisma.media.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Delete error:", error);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}