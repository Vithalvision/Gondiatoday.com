import Link from 'next/link';
import { Article } from '@/lib/types';
import { ArticleCard } from '@/components/news/ArticleCard';

export function EditorsPick({ picks }: { picks: Article[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-lg text-ink">Editor&apos;s Pick</h2>
        <Link href="/editors-pick" className="text-xs font-semibold text-brand hover:underline">
          View All
        </Link>
      </div>
      <div className="space-y-6">
        {picks.map((pick) => (
          <ArticleCard key={pick.id} article={pick} variant="pick" />
        ))}
      </div>
    </div>
  );
}
