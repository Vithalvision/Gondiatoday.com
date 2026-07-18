import { CATEGORIES } from '@/lib/categories';
import { CategorySlug, Article } from '@/lib/types';
// import { getLatestNews } from '@/lib/api/articles';
import { ArticleCard } from '@/components/news/ArticleCard';
import { notFound } from 'next/navigation';
import { getArticlesByCategory } from "@/lib/api/articles";

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = CATEGORIES[params.category as CategorySlug];
  if (!category) return notFound();

  // In production, this would be getArticlesByCategory(category.slug)
  const articles: Article[] = await getArticlesByCategory(params.category);

  return (
    <main className="max-w-wrap mx-auto px-4 py-8">
      <h1 className="font-display font-bold text-2xl text-ink mb-6">{category.label}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="bg-surface rounded-card border border-border p-4">
            <ArticleCard article={article} variant="pick" />
          </div>
        ))}
      </div>
    </main>
  );
}
