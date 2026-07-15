import { getLatestNews } from '@/lib/api/articles';
import { ArticleCard } from '@/components/news/ArticleCard';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || '';
  // In production: searchArticles(query)
  const results = query ? await getLatestNews() : [];

  return (
    <main className="max-w-wrap mx-auto px-4 py-8">
      <h1 className="font-display font-bold text-2xl text-ink mb-2">Search Results</h1>
      <p className="text-body mb-6">
        {query ? `"${query}" के लिए परिणाम` : 'कृपया खोज शब्द दर्ज करें'}
      </p>
      {results.length === 0 ? (
        <p className="text-body">कोई परिणाम नहीं मिला।</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((article) => (
            <div key={article.id} className="bg-surface rounded-card border border-border p-4">
              <ArticleCard article={article} variant="pick" />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
