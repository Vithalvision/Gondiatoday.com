import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET ALL CATEGORIES
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("GET /api/categories error:", error);

    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// CREATE CATEGORY
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, slug, parent, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
        parent: parent || "None",
        description: description || "",
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("POST /api/categories error:", error);

    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}