import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ===================== GET ALL PLACES =====================
export async function GET() {
  try {
    const places = await prisma.place.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(places);
  } catch (error) {
    console.error("GET PLACES ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch places" },
      { status: 500 }
    );
  }
}

// ===================== CREATE PLACE =====================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name?.trim()) {
      return NextResponse.json(
        { error: "Place name is required." },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const existing = await prisma.place.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A place with this name already exists." },
        { status: 400 }
      );
    }

    const place = await prisma.place.create({
      data: {
        name: body.name,
        slug,
        description: body.description || "",
        image: body.image || "",
        location: body.location || "",
      },
    });

    return NextResponse.json(place, { status: 201 });
  } catch (error) {
    console.error("CREATE PLACE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create place." },
      { status: 500 }
    );
  }
}