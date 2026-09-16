import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function toHours(value: number, unit: string): number {
  switch (unit) {
    case "hour":
      return value;
    case "day":
      return value * 24;
    case "week":
      return value * 24 * 7;
    case "month":
      return value * 24 * 30;
    default:
      return value;
  }
}

async function generateArticleForTopic(
  topic: string,
  category: string,
  author: string | null
) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/ai-generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, category, author }),
  });

  const data = await res.json();
  return { ok: res.ok, data };
}

export async function GET() {
  const results: any[] = [];

  try {
    const campaigns = await prisma.campaign.findMany();

    for (const campaign of campaigns) {
      const c = campaign as any;
      const durationHours = toHours(
        c.durationValue || 24,
        c.durationUnit || "hour"
      );

      for (const topic of campaign.topics) {
        const existingRun = await prisma.topicRun.findUnique({
          where: {
            campaignId_topic: {
              campaignId: campaign.id,
              topic,
            },
          },
        });

        const now = new Date();

        if (existingRun) {
          const hoursSinceLastRun =
            (now.getTime() - new Date(existingRun.lastRunAt).getTime()) /
            (1000 * 60 * 60);

          if (hoursSinceLastRun < durationHours) {
            results.push({
              campaign: campaign.name,
              topic,
              skipped: true,
              reason: `Already generated ${hoursSinceLastRun.toFixed(
                1
              )}h ago (due every ${c.durationValue} ${c.durationUnit})`,
            });
            continue;
          }
        }

        const category = campaign.categories[0] || "General";
        const author = c.author || null;

        const { ok, data } = await generateArticleForTopic(
          topic,
          category,
          author
        );

        if (ok) {
          await prisma.topicRun.upsert({
            where: {
              campaignId_topic: {
                campaignId: campaign.id,
                topic,
              },
            },
            update: { lastRunAt: now },
            create: {
              campaignId: campaign.id,
              topic,
              lastRunAt: now,
            },
          });

          results.push({
            campaign: campaign.name,
            topic,
            skipped: false,
            title: data.article?.title || "Unknown",
          });
        } else {
          results.push({
            campaign: campaign.name,
            topic,
            skipped: false,
            error: data.error || "Failed to generate",
          });
        }
      }
    }

    return NextResponse.json({ ok: true, results });
  } catch (err) {
    console.error("SCHEDULER ERROR:", err);
    return NextResponse.json(
      { ok: false, error: "Scheduler failed" },
      { status: 500 }
    );
  }
}