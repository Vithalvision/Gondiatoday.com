import { Author } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

export function ArticleMeta({
  author,
  date,
  readTime,
  dark = false,
}: {
  author?: Author;
  date?: string;
  readTime?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-2 gap-y-1 text-xs mt-2.5',
        dark ? 'text-white/85' : 'text-body'
      )}
    >
      {author && (
        <>
          <span
            className={cn(
              'w-5 h-5 rounded-full flex-shrink-0',
              dark ? 'bg-white/30' : 'bg-border'
            )}
          />
          <span>
            By <span className="font-semibold">{author.name}</span>
          </span>
          <span aria-hidden className="opacity-50">·</span>
        </>
      )}
      {date && <span>{date}</span>}
      {readTime && (
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {readTime}
        </span>
      )}
    </div>
  );
}