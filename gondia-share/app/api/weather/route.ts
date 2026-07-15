import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.WEATHER_API_KEY;

  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Gondia&aqi=no`,
    {
      next: {
        revalidate: 600, // Refresh every 10 minutes
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Unable to fetch weather" },
      { status: 500 }
    );
  }

  const data = await res.json();

  return NextResponse.json(data);
}