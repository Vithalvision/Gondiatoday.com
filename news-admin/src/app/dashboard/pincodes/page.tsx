import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function PincodesPage() {
  const pincodes = await prisma.pincode.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pin Codes</h1>
          <p className="text-gray-500">
            Manage pin codes and areas.
          </p>
        </div>

        <Link
          href="/dashboard/pincodes/create"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + Create Pin Code
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Area Name</th>
              <th className="px-4 py-3 text-left">Pin Code</th>
              <th className="px-4 py-3 text-left">City</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pincodes.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No pin codes found.
                </td>
              </tr>
            ) : (
              pincodes.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3">{item.areaName}</td>
                  <td className="px-4 py-3">{item.pincode}</td>
                  <td className="px-4 py-3">{item.city}</td>
                  <td className="px-4 py-3">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/dashboard/pincodes/edit/${item.id}`}
                      className="mr-3 text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>

                    <Link
                      href={`/dashboard/pincodes/preview/${item.id}`}
                      className="mr-3 text-green-600 hover:underline"
                    >
                      Preview
                    </Link>

                    <Link
                      href={`/dashboard/pincodes/delete/${item.id}`}
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