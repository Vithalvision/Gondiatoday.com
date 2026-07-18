import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ===================== GET ALL PINCODES =====================
export async function GET() {
  try {
    const pincodes = await prisma.pincode.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(pincodes);
  } catch (error) {
    console.error("GET PINCODES ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch pincodes." },
      { status: 500 }
    );
  }
}

// ===================== CREATE PINCODE =====================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.areaName?.trim()) {
      return NextResponse.json(
        { error: "Area name is required." },
        { status: 400 }
      );
    }

    if (!body.pincode?.trim()) {
      return NextResponse.json(
        { error: "Pin code is required." },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.areaName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const existing = await prisma.pincode.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "This area already exists." },
        { status: 400 }
      );
    }

    const pincode = await prisma.pincode.create({
      data: {
        areaName: body.areaName,
        pincode: body.pincode,
        city: body.city || "",
        description: body.description || "",
        image: body.image || "",
        slug,
      },
    });

    return NextResponse.json(pincode, { status: 201 });
  } catch (error) {
    console.error("CREATE PINCODE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create pincode." },
      { status: 500 }
    );
  }
}