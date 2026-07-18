'use client';

import { Zap } from 'lucide-react';

export function InShortTicker({ items }: { items: string[] }) {
  // Duplicate items so the marquee loops seamlessly (animate -50% with doubled content).
  const looped = [...items, ...items];

  return (
    <section className="bg-surface-muted border-y border-border">
      <div className="max-w-wrap mx-auto px-4 py-3 flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-brand font-display font-bold text-sm flex-shrink-0">
          <Zap size={16} className="fill-brand" />
          In Short
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex gap-10 whitespace-nowrap animate-ticker motion-reduce:animate-none">
            {looped.map((item, i) => (
              <span key={i} className="text-sm text-ink flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
