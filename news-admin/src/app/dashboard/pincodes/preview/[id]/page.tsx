import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PreviewPincodePage({
  params,
}: {
  params: { id: string };
}) {
  const pincode = await prisma.pincode.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!pincode) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {pincode.areaName}
          </h1>

          <p className="text-gray-500">
            Preview Pin Code
          </p>
        </div>

        <Link
          href="/dashboard/pincodes"
          className="rounded-lg border px-4 py-2 hover:bg-gray-100"
        >
          ← Back
        </Link>
      </div>

      {/* Image */}
      {pincode.image && (
        <img
          src={pincode.image}
          alt={pincode.areaName}
          className="w-full rounded-xl object-cover max-h-[450px]"
        />
      )}

      {/* Details */}
      <div className="rounded-xl border bg-white p-6 space-y-4">

        <div>
          <h2 className="font-semibold text-gray-700">
            Area Name
          </h2>

          <p>{pincode.areaName}</p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700">
            Pin Code
          </h2>

          <p>{pincode.pincode}</p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700">
            City
          </h2>

          <p>{pincode.city}</p>
        </div>

      </div>

      {/* Description */}
      <div className="rounded-xl border bg-white p-6">
        <h2 className="text-xl font-bold mb-4">
          Description
        </h2>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: pincode.description,
          }}
        />
      </div>
    </div>
  );
}