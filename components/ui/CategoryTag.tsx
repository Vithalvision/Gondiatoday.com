import { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

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
      <span className="inline-block font-display font-bold uppercase tracking-wider text-[11px] bg-white/95 text-ink px-2 py-1 rounded-sm">
        {category.label}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-block font-display font-bold uppercase tracking-wider',
        size === 'sm' ? 'text-xs' : 'text-[11px]',
        category.colorClass
      )}
    >
      {category.label}
    </span>
  );
}