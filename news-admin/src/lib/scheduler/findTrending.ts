import { AnthropicBedrock } from "@anthropic-ai/bedrock-sdk";

const anthropic = new AnthropicBedrock({
  awsRegion: process.env.AWS_REGION,
});

export async function findTrendingContent(topic: string, category: string) {
  const response = await anthropic.messages.create({
    model: "us.anthropic.claude-sonnet-4-5-20250929-v1:0",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Write a short news-style summary about "${topic}" in the "${category}" category, as if reporting a recent development. Keep it factual-sounding and under 150 words.`,
      },
    ],
  });

  const block = response.content.find((b: any) => b.type === "text") as any;
  const text = block?.text || "";
  return { summary: text };
}