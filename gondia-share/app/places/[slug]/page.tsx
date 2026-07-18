import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import AdSlot from "@/components/ads/AdSlot";

export default async function PlacePage({
  params,
}: {
  params: { slug: string };
}) {
  const place = await prisma.place.findUnique({
    where: { slug: params.slug },
  });

  if (!place) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">

      {/* 3 COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT SIDEBAR (Ads / Widgets) */}
        <aside className="lg:col-span-2 ">
          <div className="sticky top-24 space-y-6">
            <AdSlot type="sidebar" />
            <AdSlot type="sidebar" />
          </div>
        </aside>

        {/* CENTER CONTENT */}
        <article className="lg:col-span-8 space-y-6">

          {/* TOP AD (like your screenshot) */}
          <AdSlot type="header" />

          {/* TITLE */}
          <h1 className="text-3xl font-bold leading-snug">
            {place.name}
          </h1>

          {/* META */}
          <div className="text-sm text-gray-500">
            📍 {place.location || "Location not available"}
          </div>

          {/* IMAGE */}
          {place.image && (
            <div className="relative w-full h-[420px] rounded-lg overflow-hidden">
              <Image
                src={place.image}
                alt={place.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* MID AD (inside article like news sites) */}
          {/* <AdSlot type="infeed" /> */}

          {/* CONTENT */}
          <div
            className="prose max-w-none text-gray-800"
            dangerouslySetInnerHTML={{
              __html: place.description || "",
            }}
          />

          {/* BOTTOM AD */}
          <AdSlot type="footer" />

        </article>

        {/* RIGHT SIDEBAR */}
        <aside className="lg:col-span-2 space-y-4">
          <div className="sticky top-24 space-y-4">

            {/* Top Stories style ads */}
            <AdSlot type="sidebar" />

            <AdSlot type="sidebar" />

          </div>
        </aside>

      </div>
    </main>
  );
}