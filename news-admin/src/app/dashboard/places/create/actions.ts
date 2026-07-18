"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createPlace(formData: FormData) {
  await prisma.place.create({
    data: {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string || null,
      image: formData.get("image") as string || null,
      location: formData.get("location") as string || null,
    },
  });

  redirect("/dashboard/places");
}