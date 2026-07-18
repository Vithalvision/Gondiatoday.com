import Link from 'next/link';
import { VideoStory } from '@/lib/types';
import { VideoCard } from '@/components/news/VideoCard';

export function VideoStories({ videos }: { videos: VideoStory[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-lg text-ink">Video Stories</h2>
        <Link href="/videos" className="text-xs font-semibold text-brand hover:underline">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
