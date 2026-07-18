import { redirect } from "next/navigation";

export default function EditPincodePage({
  params,
}: {
  params: { id: string };
}) {
  redirect(`/dashboard/pincodes/create?id=${params.id}`);
}