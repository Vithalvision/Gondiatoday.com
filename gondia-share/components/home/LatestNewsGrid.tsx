import Link from "next/link";
import { Article } from "@/lib/types";
import { ArticleCard } from "@/components/news/ArticleCard";

export function LatestNewsGrid({
  articles,
}: {
  articles: Article[];
}) {
  if (!articles.length) {
    return (
      <section className="py-10 text-center text-gray-500">
        No articles available.
      </section>
    );
  }

  const hero = articles[0];
  const sideNews = articles.slice(1, 5);
  const gridNews = articles.slice(5);

  return (
    <section className="space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h2 className="text-3xl font-bold text-gray-900">
          Latest News
        </h2>

        <Link
          href="/latest"
          className="text-sm font-semibold text-red-600 hover:text-red-700 transition"
        >
          View All →
        </Link>
      </div>

      {/* Hero + Side Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">
          <ArticleCard
            article={hero}
            variant="hero"
          />
        </div>

        <div className="space-y-5">

          {sideNews.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant="compact"
            />
          ))}

        </div>

      </div>

      {/* Grid */}
      {gridNews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

          {gridNews.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant="pick"
            />
          ))}

        </div>
      )}

    </section>
  );
}