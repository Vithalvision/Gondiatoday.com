import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sign = searchParams.get("sign");

  if (!sign) {
    return NextResponse.json(
      { error: "Sign is required" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://api.api-ninjas.com/v1/horoscope?zodiac=${sign}`,
    {
      headers: {
        "X-Api-Key": process.env.HOROSCOPE_API_KEY!,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}