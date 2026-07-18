import Link from 'next/link';

export function TrendingList({ items }: { items: { id: string; title: string }[] }) {
  return (
    <div className="bg-surface rounded-card border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-lg text-ink">Trending</h2>
        <Link href="/trending" className="text-xs font-semibold text-brand hover:underline">
          View All
        </Link>
      </div>
      <ol className="space-y-3.5">
        {items.map((item, i) => (
          <li key={item.id}>
            <Link href="#" className="flex items-start gap-3 group">
              <span className="font-display font-bold text-brand text-base leading-tight flex-shrink-0 w-4">
                {i + 1}
              </span>
              <span className="text-sm text-ink leading-snug group-hover:text-brand transition-colors">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
