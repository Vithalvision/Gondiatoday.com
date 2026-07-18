import { Article } from "@/lib/types";
import { ArticleCard } from "@/components/news/ArticleCard";
import { TopStoriesSidebar } from "./TopStoriesSidebar";
import { PlacesSection } from "./placessection";
import { PincodeSection } from "./pincodesection";
import AdSlot from "../ads/AdSlot";

interface Place {
  id: number;
  name: string;
  slug: string;
}

interface Pincode {
  area: string;
  pin: string;
  slug?: string;
}

interface HeroSectionProps {
  hero: Article | null;
  topStories: Article[];
  latestNews: Article[];
  places: Place[];
  pincodes: Pincode[];
}

export function HeroSection({
  hero,
  topStories,
  latestNews,
  places,
  pincodes,
}: HeroSectionProps) {
  return (
    <section className="max-w-full mx-auto px-4 mt-6">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* LEFT SIDEBAR */}
        <aside className="xl:col-span-2">
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

        {/* HERO */}
      <main className="xl:col-span-7 space-y-6">

        {/* Hero */}
        {hero && (
          <ArticleCard
            article={hero}
            variant="hero"
          />
        )}

        {/* Scrollable News List */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">

          <div className="px-4 py-3 border-b">
            <h2 className="text-lg font-bold">
              Latest News
            </h2>
          </div>

          <div className="h-[420px] overflow-y-auto">
            {latestNews.slice(1).map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                variant="list"
              />
            ))}
          </div>

        </div>

      </main>

        {/* RIGHT SIDEBAR */}
        <aside className="xl:col-span-3">
                <AdSlot type="sidebar" />
          <TopStoriesSidebar
            stories={topStories}
          />
        </aside>

      </div>
    </section>
  );
}