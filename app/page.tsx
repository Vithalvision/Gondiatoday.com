import {
  getHeroArticle,
  getTopStories,
  getLatestNews,
  getEditorsPicks,
  getTrending,
  getInShortItems,
  getVideoStories,
  getPhotoGallery,
  getLocalSpotlight,
} from "@/lib/api/articles";

import { HeroSection } from "@/components/home/HeroSection";
import { InShortTicker } from "@/components/home/InShortTicker";
import { LatestNewsGrid } from "@/components/home/LatestNewsGrid";
import { EditorsPick } from "@/components/home/EditorsPick";
import { TrendingList } from "@/components/home/TrendingList";
import { LocalSpotlight } from "@/components/home/LocalSpotlight";
import { HoroscopeWidget } from "@/components/widgets/HoroscopeWidget";
import { NewsletterSignup } from "@/components/widgets/NewsletterSignup";
import { PhotoGallery } from "@/components/home/PhotoGallery";
import { VideoStories } from "@/components/home/VideoStories";
import { PlacesSection } from "@/components/home/placessection";
import { PincodeSection } from "@/components/home/pincodesection";
import { places } from "@/lib/data/places";
// import { pincodes } from "@/lib/data/pincodes";
import { prisma } from "@/lib/prisma";
import AdSlot from "@/components/ads/AdSlot";

export const revalidate = 60;

export default async function HomePage() {
  const [
    hero,
    topStories,
    latestNews,
    editorsPicks,
    trending,
    inShortItems,
    videos,
    gallery,
    spotlight,
  ] = await Promise.all([
    getHeroArticle?.() ?? null,
    getTopStories?.() ?? [],
    getLatestNews?.() ?? [],
    getEditorsPicks?.() ?? [],
    getTrending?.() ?? [],
    getInShortItems?.() ?? [],
    getVideoStories?.() ?? [],
    getPhotoGallery?.() ?? [],
    getLocalSpotlight?.() ?? null,
  ]);

    const dbPincodes = await prisma.pincode.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const pincodes = dbPincodes.map((p) => ({
      area: p.areaName,
      pin: p.pincode,
      slug: p.slug,
    }));

  return (
    <main className="bg-surface-muted">

      {/* 🔵 TOP AD HERE */}
      <div className="w-full flex justify-center my-4">
        <AdSlot type="header" id="1234567890" />
      </div>

      <HeroSection
        hero={hero}
        topStories={topStories}
        latestNews={latestNews}
        places={places}
        pincodes={pincodes}
      />

      {/* 🔵 IN SHORT + AD */}
      <InShortTicker items={inShortItems} />

      <div className="w-full flex justify-center my-4">
        <AdSlot type="infeed"/>
      </div>

      {/* 🔵 MAIN GRID */}
      <section className="max-w-full mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="bg-surface rounded-card border border-border p-5">
          <LatestNewsGrid articles={latestNews} />

          <div className="mt-6">
            <AdSlot type="infeed"/>
          </div>
        </div>

        {/* MIDDLE */}
        <div className="bg-surface rounded-card border border-border p-5">
          <EditorsPick picks={editorsPicks} />
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <TrendingList items={trending} />

          <AdSlot type="sidebar"/>

          <div className="bg-surface rounded-card border border-border p-5">
            <LocalSpotlight spotlight={spotlight} />
          </div>

          <NewsletterSignup />
        </div>
      </section>

      {/* 🔵 MEDIA SECTION */}
      <section className="max-w-wrap mx-auto px-4 pb-10 grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-surface rounded-card border border-border p-5">
          <PhotoGallery images={gallery} />
        </div>

        <div className="flex justify-center">
         <AdSlot type="infeed"/>
        </div>

        <div className="bg-surface rounded-card border border-border p-5">
          <VideoStories videos={videos} />
        </div>

        <div className="flex justify-center">
         <AdSlot type="infeed" />
        </div>

      </section>

      {/* 🔵 FOOTER AD */}
      <div className="w-full flex justify-center my-6">
       <AdSlot type="footer" />
      </div>

    </main>
  );
}