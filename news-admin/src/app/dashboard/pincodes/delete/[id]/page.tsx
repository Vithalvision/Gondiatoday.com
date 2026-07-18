import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function DeletePincodePage({
  params,
}: {
  params: { id: string };
}) {
  const pincode = await prisma.pincode.findUnique({
    where: { id: params.id },
  });

  if (!pincode) {
    notFound();
  }

  async function deletePincode() {
    "use server";

    await prisma.pincode.delete({
      where: { id: params.id },
    });

    redirect("/dashboard/pincodes");
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Delete Pincode</h1>

      <p className="mb-6">
        Are you sure you want to delete <strong>{pincode.areaName}</strong>?
      </p>

      <form action={deletePincode}>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Yes, Delete
        </button>
      </form>
    </div>
  );
}