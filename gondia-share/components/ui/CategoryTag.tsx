import { Category } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function CategoryTag({
  category,
  size = 'sm',
  onDark = false,
}: {
  category: Category;
  size?: 'sm' | 'xs';
  onDark?: boolean;
}) {
  if (onDark) {
    return (
      <Link
        href={`/${category.slug}`}
        className="inline-block font-display font-bold uppercase tracking-wider text-[11px] bg-white/95 text-ink px-2 py-1 rounded-sm hover:bg-white transition-colors"
      >
        {category.label}
      </Link>
    );
  }

  return (
    <Link
      href={`/${category.slug}`}
      className={cn(
        'inline-block font-display font-bold uppercase tracking-wider hover:underline underline-offset-2 decoration-2',
        size === 'sm' ? 'text-xs' : 'text-[11px]',
        category.colorClass
      )}
    >
      {category.label}
    </Link>
  );
}