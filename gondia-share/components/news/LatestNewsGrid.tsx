import { Article } from '@/lib/types';
import { ArticleCard } from '@/components/news/ArticleCard';
import { SectionHeader } from '@/components/news/SectionHeader';

export function LatestNewsGrid({ articles }: { articles: Article[] }) {
  if (!articles.length) {
    return (
      <section aria-labelledby="latest-news-heading">
        <SectionHeader
          eyebrow="Live Coverage"
          title="Latest News"
          headingId="latest-news-heading"
        />
        <p className="text-sm text-body py-8 text-center">No articles available right now.</p>
      </section>
    );
  }

  const hero = articles[0];
  const rail = articles.slice(1, 4);
  const rest = articles.slice(4);

  return (
    <section aria-labelledby="latest-news-heading">
      <SectionHeader
        eyebrow="Live Coverage"
        title="Latest News"
        headingId="latest-news-heading"
        viewAllHref="/latest"
      />

      {/* Hero + rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
        <div className="lg:col-span-7">
          <ArticleCard article={hero} variant="hero" />
        </div>

        {rail.length > 0 && (
          <div className="lg:col-span-5">
            <p className="text-[11px] font-display font-bold uppercase tracking-[0.14em] text-body mb-3">
              Also In The News
            </p>
            <div className="flex flex-col divide-y divide-gray-200">
              {rail.map((article) => (
                <div key={article.id} className="py-3 first:pt-0 last:pb-0">
                  <ArticleCard article={article} variant="list" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Secondary grid */}
      {rest.length > 0 && (
        <div className="mt-10 pt-8 border-t-2 border-ink/90">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
            {rest.map((article) => (
              <ArticleCard key={article.id} article={article} variant="compact" />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}