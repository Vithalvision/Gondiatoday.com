import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const { public_id } = await req.json();

    if (!public_id) {
      return NextResponse.json(
        { error: "public_id is required" },
        { status: 400 }
      );
    }

    console.log("Deleting public_id:", public_id);

    const result = await cloudinary.uploader.destroy(public_id);

    console.log("Cloudinary result:", result);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Delete error:", error);

    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}