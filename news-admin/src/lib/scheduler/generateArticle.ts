import { AnthropicBedrock } from "@anthropic-ai/bedrock-sdk";

const anthropic = new AnthropicBedrock({
  awsRegion: process.env.AWS_REGION,
});
export async function generateArticleFromSummary(summary: string, topic: string, category: string) {
  const response = await anthropic.messages.create({
    model: "us.anthropic.claude-sonnet-4-5-20250929-v1:0",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Rewrite this into an original news article for a Gondia-region news website. Topic: ${topic}, Category: ${category}. Source info: ${summary}. Return only JSON in this exact format: {"title": "...", "body": "..."}`,
      },
    ],
  });

  const block = response.content.find((b: any) => b.type === "text") as any;
  const text = block?.text || "{}";
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}