import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

// ===================== GET SINGLE PINCODE =====================
export async function GET(
  req: Request,
  { params }: Params
) {
  try {
    const pincode = await prisma.pincode.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!pincode) {
      return NextResponse.json(
        { error: "Pincode not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(pincode);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch pincode." },
      { status: 500 }
    );
  }
}

// ===================== UPDATE PINCODE =====================
export async function PUT(
  req: Request,
  { params }: Params
) {
  try {
    const body = await req.json();

    const pincode = await prisma.pincode.update({
      where: {
        id: params.id,
      },
      data: {
        areaName: body.areaName,
        slug:
          body.slug ||
          body.areaName
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
        pincode: body.pincode,
        city: body.city,
        description: body.description,
        image: body.image,
      },
    });

    return NextResponse.json(pincode);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update pincode." },
      { status: 500 }
    );
  }
}

// ===================== DELETE PINCODE =====================
export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    await prisma.pincode.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Failed to delete pincode." },
      { status: 500 }
    );
  }
}