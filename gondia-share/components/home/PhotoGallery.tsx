import Image from 'next/image';
import Link from 'next/link';
import { GalleryImage } from '@/lib/types';

export function PhotoGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-lg text-ink">Photo Gallery</h2>
        <Link href="/gallery" className="text-xs font-semibold text-brand hover:underline">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((img) => (
          <div key={img.id} className="relative aspect-square rounded-card overflow-hidden group">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="150px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
