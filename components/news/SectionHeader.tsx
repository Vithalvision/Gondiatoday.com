import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function SectionHeader({
  eyebrow,
  title,
  headingId,
  viewAllHref,
}: {
  eyebrow?: string;
  title: string;
  headingId: string;
  viewAllHref?: string;
}) {
  return (
    <div className="relative mb-6 sm:mb-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="text-[11px] font-display font-bold uppercase tracking-[0.14em] text-brand mb-1">
              {eyebrow}
            </p>
          )}
          <h2
            id={headingId}
            className="font-display text-[26px] sm:text-3xl font-extrabold text-ink tracking-tight leading-none"
          >
            {title}
          </h2>
        </div>

        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="group hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-brand transition-all hover:gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded"
          >
            View All
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* Editorial rule: thick black bar with a short red accent tick */}
      <div className="relative mt-3 h-[3px] bg-ink">
        <span className="absolute left-0 top-0 h-full w-10 bg-brand" />
      </div>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="sm:hidden mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand"
        >
          View All <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}