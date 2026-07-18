import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updatePlace } from "./actions";

export default async function EditPlacePage({
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
    notFound();
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit Place</h1>
          <p className="text-gray-500">
            Update place details.
          </p>
        </div>

        <Link
          href="/dashboard/places"
          className="rounded-lg border px-4 py-2 hover:bg-gray-100"
        >
          Back
        </Link>
      </div>

      <form action={updatePlace} className="space-y-5 rounded-lg border bg-white p-6">
        <input type="hidden" name="id" value={place.id} />

        <div>
          <label className="mb-2 block font-medium">Name</label>
          <input
            name="name"
            defaultValue={place.name}
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Slug</label>
          <input
            name="slug"
            defaultValue={place.slug}
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Location</label>
          <input
            name="location"
            defaultValue={place.location ?? ""}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Image URL</label>
          <input
            name="image"
            defaultValue={place.image ?? ""}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Description</label>
          <textarea
            name="description"
            rows={6}
            defaultValue={place.description ?? ""}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Update Place
        </button>
      </form>
    </div>
  );
}