import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DeletePlacePage({
  params,
}: {
  params: { id: string };
}) {
  await prisma.place.delete({
    where: {
      id: Number(params.id),
    },
  });

  redirect("/dashboard/places");
}