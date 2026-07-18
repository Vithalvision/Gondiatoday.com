import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

/* =========================
   GET ALL USERS
========================= */
export async function GET() {
  try {
    const users = await prisma.user.findMany({
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error: any) {
    console.error("GET_USERS_ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch users",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}

/* =========================
   CREATE USER
========================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      password,
      role,
      category,
    } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Name, Email, Password and Role are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
     data: {
      name: name.trim(),
      email: normalizedEmail,
      phone: phone?.trim() || null,
      password: hashedPassword,
      role: role.trim(),
      category: category?.trim() || null,
      status: "Active",
     },
    });

    const { password: _, ...safeUser } = user;

    return NextResponse.json(
      {
        message: "User created successfully",
        user: safeUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("CREATE_USER_ERROR:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}