import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function PlacesPage() {
  const places = await prisma.place.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Places</h1>
          <p className="text-gray-500">
            Manage tourist places in Gondia.
          </p>
        </div>

        <Link
          href="/dashboard/places/create"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + Create Place
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Slug</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {places.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No places found.
                </td>
              </tr>
            ) : (
              places.map((place) => (
                <tr key={place.id} className="border-t">
                  <td className="px-4 py-3">{place.name}</td>
                  <td className="px-4 py-3">{place.slug}</td>
                  <td className="px-4 py-3">
                    {new Date(place.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/dashboard/places/edit/${place.id}`}
                      className="mr-3 text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>

                    <Link
                      href={`/dashboard/places/preview/${place.id}`}
                      className="mr-3 text-green-600 hover:underline"
                    >
                      Preview
                    </Link>

                    {/* DELETE BUTTON FIXED BELOW */}
                    <Link
                      href={`/dashboard/places/delete/${place.id}`}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}