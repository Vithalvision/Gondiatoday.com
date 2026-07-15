import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Gold price (USD per troy ounce)
    const goldRes = await fetch("https://api.gold-api.com/price/XAU");

    // Silver price (USD per troy ounce)
    const silverRes = await fetch("https://api.gold-api.com/price/XAG");

    const gold = await goldRes.json();
    const silver = await silverRes.json();

    // USD → INR exchange rate
    const usdRes = await fetch("https://open.er-api.com/v6/latest/USD");
    const usd = await usdRes.json();

    const usdToInr = usd.rates.INR;

    // Convert ounce prices to INR
    const ounceGoldInr = gold.price * usdToInr;
    const ounceSilverInr = silver.price * usdToInr;

    // 1 Troy Ounce = 31.1035 grams
    const gram24K = ounceGoldInr / 31.1035;
    const gram22K = gram24K * 0.916;
    const gramSilver = ounceSilverInr / 31.1035;

    return NextResponse.json({
      gold24K: gram24K.toFixed(2),
      gold22K: gram22K.toFixed(2),
      silver: gramSilver.toFixed(2),
      updated: gold.updatedAtReadable,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Unable to fetch gold & silver rate" },
      { status: 500 }
    );
  }
}