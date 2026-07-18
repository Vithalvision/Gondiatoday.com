import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ===================== GET ALL PUBLISHED ARTICLES =====================
export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: "published",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("GET ARTICLES ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

// ===================== CREATE ARTICLE =====================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const tags: string[] = body.tags || [];

    const article = await prisma.$transaction(async (tx) => {
      // ===================== HANDLE TAGS =====================
      for (const tagName of tags) {
        if (!tagName?.trim()) continue;

        const cleanName = tagName.trim();

        const existingTag = await tx.tag.findFirst({
          where: { name: cleanName },
        });

        if (!existingTag) {
          await tx.tag.create({
            data: {
              name: cleanName,
              slug: cleanName
                .toLowerCase()
                .replace(/\s+/g, "-")
                .concat("-", Date.now().toString()), // ensure unique slug
              description: "",
            },
          });
        }
      }

      // ===================== CREATE ARTICLE =====================
      return await tx.article.create({
        data: {
          title: body.title,
          content: body.content || "<p>No Content</p>",
          status: body.status || "draft",

          author: body.author || "",
          sourceLink: body.sourceLink || "",
          featuredImg: body.featuredImg || "",
          category: body.category || "",

          socialVideoUrls: Array.isArray(body.socialVideoUrls)
            ? body.socialVideoUrls
            : [],

          socialPostUrls: Array.isArray(body.socialPostUrls)
            ? body.socialPostUrls
            : [],

          tags,
        },
      });
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("CREATE ARTICLE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}