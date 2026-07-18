import Link from "next/link";
import AdSlot from "../ads/AdSlot";

interface Place {
  id: number;
  name: string;
  slug: string;
}

export function PlacesSection({
  places,
}: {
  places: Place[];
}) {
  return (
    <>
    <div>
      <div className="border-b-2 border-red-600 pb-2 mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          📍 Places to Visit
        </h3>
      </div>

      <ol className="space-y-3 list-decimal list-inside">
        {places.map((place) => (
          <li
            key={place.id}
            className="text-sm leading-6 text-gray-700"
          >
            <Link
              href={`/places/${place.slug}`}
              className="hover:text-red-600 transition-colors"
            >
              {place.name}
            </Link>
          </li>
        ))}
      </ol>

      <Link
        href="/places"
        className="mt-5 inline-block text-sm font-semibold text-red-600 hover:underline"
      >
        View All →
      </Link>

    </div>
      </>
  );
}