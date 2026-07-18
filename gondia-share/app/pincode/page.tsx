import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function PincodePage() {
  const pincodes = await prisma.pincode.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Pincode Areas</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pincodes.map((item) => (
          <Link
            key={item.id}
            href={`/pincode/${item.pincode}`}
            className="border rounded-lg p-4 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{item.areaName}</h2>
            <p className="text-sm text-gray-600">{item.city}</p>
            <p className="text-sm font-medium">{item.pincode}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}