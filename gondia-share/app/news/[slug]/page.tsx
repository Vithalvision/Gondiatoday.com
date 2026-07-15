import AdSlot from "@/components/ads/AdSlot";

// dummy function (replace with your DB/API later)
async function getArticle(slug: string) {
  return {
    title: "Sample Article Title",
    content: [
      "Paragraph 1 content here...",
      "Paragraph 2 content here...",
      "Paragraph 3 content here...",
      "Paragraph 4 content here...",
    ],
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* 🟡 1. TOP AD (before article starts) */}
      <AdSlot type="header" />

      {/* ARTICLE TITLE */}
      <h1
        translate="yes"
        className="text-3xl font-bold mb-6"
      >
        {article.title}
      </h1>

      {/* ARTICLE CONTENT WITH MID AD */}
      <div
        translate="yes"
        className="space-y-4 text-lg leading-8"
      >
        <p>{article.content[0]}</p>

        <p>{article.content[1]}</p>

        {/* 🟡 2. MID ARTICLE AD */}
        <AdSlot type="infeed" />

        <p>{article.content[2]}</p>

        <p>{article.content[3]}</p>
      </div>

      {/* 🟡 3. END OF ARTICLE AD */}
      <div className="mt-10">
        <AdSlot type="footer" />
      </div>

      {/* 🟡 4. OPTIONAL: RELATED + SPONSORED AREA */}
      <div
        className="mt-10 notranslate"
        translate="no"
      >
        <h2 className="text-xl font-semibold mb-3">
          Related & Sponsored
        </h2>

        <AdSlot type="sidebar" />
      </div>
    </main>
  );
}