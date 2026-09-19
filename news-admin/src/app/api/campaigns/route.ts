import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ campaigns });
  } catch (err) {
    console.error("CAMPAIGN GET ERROR:", err);

    return NextResponse.json(
      { error: "Failed to load campaigns" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

            const { name, topics, categories, author, durationValue, durationUnit } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Campaign name is required" },
        { status: 400 }
      );
    }

      const campaign = await prisma.campaign.create({
      data: {
        name: name.trim(),
        topics: Array.isArray(topics) ? topics : [],
        categories: Array.isArray(categories) ? categories : [],
        durationValue: durationValue || 24,
        durationUnit: durationUnit || "hour",
      },
    });

    return NextResponse.json({ campaign });
  } catch (err) {
    console.error("CAMPAIGN CREATE ERROR:", err);

    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    );
  }
}
