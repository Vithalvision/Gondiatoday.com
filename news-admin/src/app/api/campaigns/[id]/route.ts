import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: params.id },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ campaign });
  } catch (err) {
    console.error("CAMPAIGN GET BY ID ERROR:", err);

    return NextResponse.json(
      { error: "Failed to load campaign" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const body = await req.json();

          const { name, topics, categories, author, durationValue, durationUnit } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Campaign name is required" },
        { status: 400 }
      );
    }

         const campaign = await prisma.campaign.update({
      where: { id: params.id },
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
    console.error("CAMPAIGN UPDATE ERROR:", err);

    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    await prisma.campaign.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: "Campaign deleted successfully",
    });
  } catch (err) {
    console.error("CAMPAIGN DELETE ERROR:", err);

    return NextResponse.json(
      { error: "Failed to delete campaign" },
      { status: 500 }
    );
  }
}
