import Image from 'next/image';
import { VideoStory } from '@/lib/types';
import { Play } from 'lucide-react';

export function VideoCard({ video }: { video: VideoStory }) {
  return (
    <button className="relative block w-full aspect-video rounded-card overflow-hidden group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
      <Image
        src={video.thumbnail}
        alt={video.title}
        fill
        sizes="(max-width: 768px) 33vw, 220px"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors flex items-center justify-center">
        <span className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
          <Play size={16} className="text-brand fill-brand ml-0.5" />
        </span>
      </div>
      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[11px] px-1.5 py-0.5 rounded">
        {video.duration}
      </span>
    </button>
  );
}
