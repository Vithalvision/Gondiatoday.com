import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function PlacePreviewPage({
  params,
}: {
  params: { id: string };
}) {
  const place = await prisma.place.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!place) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/dashboard/places"
          className="text-sm text-gray-600 hover:text-black"
        >
          ← Back
        </Link>

        <Link
          href={`/dashboard/places/edit/${place.id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          Edit
        </Link>
      </div>

      {/* Image */}
      {place.image && (
        <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
          <Image
            src={place.image}
            alt={place.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">{place.name}</h1>

      {/* Location */}
      {place.location && (
        <p className="text-gray-500 mb-4">📍 {place.location}</p>
      )}

      {/* Description (FIXED) */}
      <div
        className="prose max-w-none text-gray-800"
        dangerouslySetInnerHTML={{
          __html: place.description || "",
        }}
      />

      {/* Fallback if empty */}
      {!place.description && (
        <p className="text-gray-400 mt-4">No description available.</p>
      )}
    </div>
  );
}