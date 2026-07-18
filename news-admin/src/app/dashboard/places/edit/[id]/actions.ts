"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function updatePlace(formData: FormData) {
  const id = Number(formData.get("id"));

  await prisma.place.update({
    where: {
      id,
    },
    data: {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      location: (formData.get("location") as string) || null,
      image: (formData.get("image") as string) || null,
      description: (formData.get("description") as string) || null,
    },
  });

  redirect("/dashboard/places");
}