import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const { topic, category, author } = await req.json();

    // =========================================================
    // VALIDATE INPUT
    // =========================================================

    if (!topic || typeof topic !== "string") {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    // =========================================================
    // 1. GENERATE ARTICLE USING OPENAI
    // =========================================================

    console.log("Generating article with OpenAI...");

    const textRes = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-5.6-luna",

          input: `You are a professional news writer for "Gondia Today".

Write a local news article about:

"${topic}"

${category ? `Category: ${category}` : ""}

The article must be professional and suitable for a local Indian news website.

Write at least 250 words.

Do not invent exact statistics, quotes, names, government statements, dates, or other facts that were not provided.

Return:
1. A short professional headline
2. Article content using HTML <p> tags
3. 3 to 5 relevant tags
4. A realistic editorial image prompt for the article

The image prompt should describe a realistic news photograph suitable for a local Indian news website.`,

          text: {
            format: {
              type: "json_schema",
              name: "news_article",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },

                  content: {
                    type: "string",
                  },

                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },

                  imagePrompt: {
                    type: "string",
                  },
                },

                required: [
                  "title",
                  "content",
                  "tags",
                  "imagePrompt",
                ],

                additionalProperties: false,
              },
            },
          },
        }),
      }
    );

    // =========================================================
    // CHECK OPENAI RESPONSE
    // =========================================================

    if (!textRes.ok) {
      const errorText = await textRes.text();

      console.error(
        "OpenAI article generation error:",
        errorText
      );

      return NextResponse.json(
        {
          error: `Article API error: ${errorText}`,
        },
        { status: 502 }
      );
    }

    const textData = await textRes.json();

    console.log("OpenAI response received");

    // =========================================================
    // GET GENERATED TEXT
    // =========================================================

    const rawText =
      textData.output_text ||
      textData.output
        ?.flatMap((item: any) => item.content || [])
        ?.find(
          (item: any) => item.type === "output_text"
        )
        ?.text ||
      "";

    console.log(
      "AI response length:",
      rawText.length
    );

    if (!rawText) {
      console.error(
        "Empty OpenAI response:",
        textData
      );

      return NextResponse.json(
        {
          error: "AI returned an empty response",
        },
        { status: 502 }
      );
    }

    // =========================================================
    // PARSE JSON
    // =========================================================

    let parsed: {
      title: string;
      content: string;
      tags: string[];
      imagePrompt: string;
    };

    try {
      parsed = JSON.parse(rawText);
    } catch (error) {
      console.error(
        "JSON parse error:",
        error
      );

      console.error(
        "Raw AI response:",
        rawText
      );

      return NextResponse.json(
        {
          error: "Could not parse AI response",
        },
        { status: 502 }
      );
    }

    console.log(
      "Article generated:",
      parsed.title
    );

    // =========================================================
    // 2. GENERATE IMAGE USING POLLINATIONS
    // =========================================================

    const pollinationsKey =
      process.env.POLLINATIONS_API_KEY;

    if (!pollinationsKey) {
      console.error(
        "POLLINATIONS_API_KEY is missing"
      );

      return NextResponse.json(
        {
          error:
            "POLLINATIONS_API_KEY is missing in .env",
        },
        { status: 500 }
      );
    }

    const imagePrompt =
      parsed.imagePrompt ||
      `Realistic editorial news photograph about ${parsed.title}, Gondia, Maharashtra, India`;

    console.log(
      "Generating image with Pollinations..."
    );

    // Encode prompt safely for URL
    const encodedPrompt =
      encodeURIComponent(imagePrompt);

    const pollinationsUrl =
      `https://gen.pollinations.ai/image/${encodedPrompt}` +
      `?model=flux&width=1024&height=1024`;

    const imageRes = await fetch(
      pollinationsUrl,
      {
        method: "GET",
        headers: {
          Authorization:
            `Bearer ${pollinationsKey}`,
        },
      }
    );

    // =========================================================
    // CHECK POLLINATIONS RESPONSE
    // =========================================================

    if (!imageRes.ok) {
      const errorText =
        await imageRes.text();

      console.error(
        "Pollinations image error:",
        errorText
      );

      return NextResponse.json(
        {
          error:
            `Pollinations image error: ${errorText}`,
        },
        { status: 502 }
      );
    }

    // =========================================================
    // GET IMAGE BUFFER
    // =========================================================

    const imageArrayBuffer =
      await imageRes.arrayBuffer();

    const imageBuffer =
      Buffer.from(imageArrayBuffer);

    if (!imageBuffer.length) {
      console.error(
        "Pollinations returned empty image"
      );

      return NextResponse.json(
        {
          error:
            "Pollinations returned an empty image",
        },
        { status: 502 }
      );
    }

    console.log(
      "Pollinations image generated successfully"
    );

    // =========================================================
    // 3. UPLOAD IMAGE TO CLOUDINARY
    // =========================================================

    const base64Image =
      imageBuffer.toString("base64");

    console.log(
      "Uploading image to Cloudinary..."
    );

    const uploadResult =
      await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${base64Image}`,
        {
          folder:
            "ai-generated-articles",
        }
      );

    console.log(
      "Cloudinary upload successful:",
      uploadResult.secure_url
    );

    // =========================================================
    // 4. SAVE ARTICLE TO DATABASE
    // =========================================================

    console.log(
      "Saving article to database..."
    );

        const article =
  await prisma.article.create({
    data: {
      title: parsed.title,

      content: parsed.content,

      status: "draft",

      category:
        category || null,

      author:
        author || null,

      tags:
        parsed.tags || [],

      featuredImg:
        uploadResult.secure_url,
    },
  });

    console.log(
      "Article saved successfully:",
      article.id
    );

    // =========================================================
    // 5. RETURN RESULT
    // =========================================================

    return NextResponse.json({
      success: true,

      article,
    });
  } catch (err) {
    console.error(
      "AI generate error:",
      err
    );

    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Something went wrong",
      },
      { status: 500 }
    );
  }
}