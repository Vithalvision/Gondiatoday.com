import Link from "next/link";
import { Article } from "@/lib/types";
import { ArticleCard } from "@/components/news/ArticleCard";

export function TopStoriesSidebar({
  stories,
}: {
  stories: Article[];
}) {
  return (
    <aside className="bg-white rounded-xl border border-gray-200 shadow-sm sticky top-24 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">
          🔥 Top Stories
        </h2>

        <Link
          href="/top-stories"
          className="text-sm font-semibold text-red-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Stories */}
      <div className="divide-y divide-gray-200">

        {stories.map((story, index) => (
          <div
            key={story.id}
            className="p-4 hover:bg-gray-50 transition"
          >

            <div className="flex gap-3">

              <span className="text-3xl font-bold text-red-600 w-8">
                {index + 1}
              </span>

              <div className="flex-1">
                <ArticleCard
                  article={story}
                  variant="list"
                />
              </div>

            </div>

          </div>
        ))}

      </div>

    </aside>
  );
}