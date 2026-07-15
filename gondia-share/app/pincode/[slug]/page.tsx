import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function PincodePage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await prisma.pincode.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!data) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{data.areaName}</h1>

      <p className="text-gray-600 mb-2">
        City: {data.city}
      </p>

      <p className="text-gray-800 font-medium mb-6">
        Pincode: {data.pincode}
      </p>

      {data.image && (
        <Image
          src={data.image}
          alt={data.areaName}
          width={1200}
          height={700}
          className="w-full rounded-lg mb-6"
        />
      )}

      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
    </main>
  );
}