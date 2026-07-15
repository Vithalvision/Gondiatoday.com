import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function LocalSpotlight({
  spotlight,
}: {
  spotlight: { title: string; image: string; href: string };
}) {
  return (
    <div>
      <h2 className="font-display font-bold text-lg text-ink mb-4">Local Spotlight</h2>
      <Link
        href={spotlight.href}
        className="relative block h-32 rounded-card overflow-hidden group"
      >
        <Image
          src={spotlight.image}
          alt={spotlight.title}
          fill
          sizes="320px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <span className="font-display font-bold text-white text-lg">{spotlight.title}</span>
          <span className="flex items-center gap-1 text-white/90 text-xs">
            अधिक जानकारी <ArrowRight size={12} />
          </span>
        </div>
      </Link>
    </div>
  );
}
