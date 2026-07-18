import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
     console.log("API HIT");
      console.log("slug:", params.slug);
    const article = await prisma.article.findUnique({
      where: {
        id: params.slug,
      },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json(
      {
      error: "Failed to fetch article",
      details: error instanceof Error ? error.message : error,
    },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await req.json();

    const article = await prisma.article.update({
      where: {
        id: params.slug,
      },
      data: {
        title: body.title,
        content: body.content,
        author: body.author,
        sourceLink: body.sourceLink,
        category: body.category,
        tags: body.tags,
        status: body.status,
        featuredImg: body.featuredImg,
        socialVideoUrls: body.socialVideoUrls,
        socialPostUrls: body.socialPostUrls,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error("UPDATE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to update article",
      },
      {
        status: 500,
      }
    );
  }
}