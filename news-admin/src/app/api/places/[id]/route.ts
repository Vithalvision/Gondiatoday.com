import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

// ===================== GET SINGLE PLACE =====================
export async function GET(
  req: Request,
  { params }: Params
) {
  try {
    const place = await prisma.place.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    if (!place) {
      return NextResponse.json(
        { error: "Place not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(place);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch place." },
      { status: 500 }
    );
  }
}

// ===================== UPDATE PLACE =====================
export async function PUT(
  req: Request,
  { params }: Params
) {
  try {
    const body = await req.json();

    const place = await prisma.place.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name: body.name,
        slug:
          body.slug ||
          body.name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
        description: body.description,
        image: body.image,
        location: body.location,
      },
    });

    return NextResponse.json(place);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update place." },
      { status: 500 }
    );
  }
}

// ===================== DELETE PLACE =====================
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.place.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete place" },
      { status: 500 }
    );
  }
}