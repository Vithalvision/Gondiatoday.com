import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    const category =
      formData.get("category")?.toString() || "";

    const type =
      formData.get("type")?.toString() || "image";

    const isFeatured =
      formData.get("isFeatured") === "true";

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    const result: any = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "news_uploads",
              resource_type:
                type === "video"
                  ? "video"
                  : "image",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      }
    );

    const media = await prisma.media.create({
      data: {
        name: file.name,

        url: result.secure_url,
        publicId: result.public_id,

        type,
        category,

        articleId: null,
        articleTitle: null,

        altText: file.name,
        caption: "",

        fileSize: file.size,

        isFeatured,
      },
    });

    return NextResponse.json({
      success: true,
      media,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);

    return NextResponse.json(
      {
        error: "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}