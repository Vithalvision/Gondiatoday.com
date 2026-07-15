import { prisma } from "@/lib/prisma";

export default async function PlacesPage() {
  const places = await prisma.place.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Places</h1>

      {places.length === 0 ? (
        <p>No places found.</p>
      ) : (
        places.map((place) => (
          <div
            key={place.id}
            className="border rounded-lg p-4 mb-4"
          >
            <h2 className="text-xl font-semibold">
              {place.name}
            </h2>

            <p>{place.location}</p>

            <p>{place.slug}</p>
          </div>
        ))
      )}
    </main>
  );
}