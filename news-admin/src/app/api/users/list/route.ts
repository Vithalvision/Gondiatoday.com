import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        category: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      users,
    }, { status: 200 });

  } catch (error: any) {
    console.error("GET_USERS_ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch users",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}