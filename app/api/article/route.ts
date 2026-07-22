import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://localhost:3007/api/articles", {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch articles" },
        { status: res.status }
      );
    }

    const articles = await res.json();

    return NextResponse.json(articles);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to connect to News Admin" },
      { status: 500 }
    );
  }
}