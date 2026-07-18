"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditArticlePage() {
  const { slug } = useParams();
  const router = useRouter();

  useEffect(() => {
    router.replace(`/dashboard/articles/create?slug=${slug}`);
  }, [slug, router]);

  return (
    <div className="p-6">
      Loading editor...
    </div>
  );
}