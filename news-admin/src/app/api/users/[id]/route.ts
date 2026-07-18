import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/* =========================
   GET SINGLE USER
========================= */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { password, ...safeUser } = user;

    return NextResponse.json(safeUser);
  } catch (error) {
    console.error("GET_USER_ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

/* =========================
   UPDATE USER
========================= */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        email: body.email,
        role: body.role,
        category: body.category,
      },
    });

    const { password, ...safeUser } = updatedUser;

    return NextResponse.json({
      message: "User updated successfully",
      user: safeUser,
    });
  } catch (error) {
    console.error("UPDATE_USER_ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE USER
========================= */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    await prisma.user.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("DELETE_USER_ERROR:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}