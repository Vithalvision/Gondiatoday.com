import AdSlot from "@/components/ads/AdSlot";
import ShareButton from "@/components/common/ShareButton";
import { PlacesSection } from "@/components/home/placessection";
import { PincodeSection } from "@/components/home/pincodesection";
import { TopStoriesSidebar } from "@/components/home/TopStoriesSidebar";
import { demoArticles } from "@/lib/data/demoarticles";

async function getArticles() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      "http://localhost:3007";

    const res = await fetch(`${baseUrl}/api/article`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch articles");
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to load articles:", error);
    return [];
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const articles = await getArticles();
  const matchedArticle = articles.find((a: any) => a.id === params.id);
  const article = matchedArticle || articles[0] || demoArticles[0];

  const topStories =
    articles.length > 0 ? articles.slice(0, 5) : demoArticles.slice(0, 5);

  const places: Array<{ id: number; name: string; slug: string }> = [];
  const pincodes: Array<{ area: string; pin: string }> = [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT SIDEBAR */}
        <aside className="lg:col-span-2 notranslate" translate="no">
          <div className="sticky top-24 space-y-6">
            <AdSlot type="sidebar" />

            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <PlacesSection places={places} />
            </div>

            <AdSlot type="sidebar" />

            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <PincodeSection pincodes={pincodes} />
            </div>
          </div>
        </aside>

        {/* ARTICLE */}
        <main className="lg:col-span-7">

          {!matchedArticle && articles.length > 0 && (
            <div
              className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800 notranslate"
              translate="no"
            >
              Showing the latest available article while the requested one is unavailable.
            </div>
          )}

          {/* Article Header */}
          <div className="mb-6 border-b border-gray-200 pb-6">

            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">

              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">

                {article.category && (
                  <span className="rounded-full bg-red-100 px-3 py-1 font-medium text-red-700">
                    {article.category}
                  </span>
                )}

                {article.createdAt && (
                  <span>
                    {new Date(article.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}

              </div>

              <ShareButton title={article.title} url={typeof window !== "undefined" ? window.location.href : ""} />

            </div>

            <h1
              translate="yes"
              className="text-4xl font-bold leading-tight"
            >
              {article.title}
            </h1>

          </div>

          {/* Featured Image */}
          {article.featuredImg && (
            <img
              src={article.featuredImg}
              alt={article.title}
              className="mb-8 w-full rounded-lg object-cover"
            />
          )}

          {/* Article Content */}
          <article
            translate="yes"
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html:
                article.content ||
                article.excerpt ||
                "Content coming soon.",
            }}
          />
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="lg:col-span-3 notranslate" translate="no">
          <div className="sticky top-24 space-y-6">
            <AdSlot type="sidebar" />
            <TopStoriesSidebar stories={topStories} />
          </div>
        </aside>

      </div>
    </div>
  );
}