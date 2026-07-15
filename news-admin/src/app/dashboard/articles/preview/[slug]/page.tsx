"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ArticleContent from "@/components/article/ArticleContent";
import Image from "next/image";

// ====================== TYPES ======================

type Article = {
  id: string;
  title: string;
  content: string;
  status?: string;
  createdAt?: string;

  author?: string | null;
  category?: string | null;

  featuredImg?: string | null;

  tags?: string[];
};

// ====================== HELPERS ======================

function formatDate(date?: string | null) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ====================== SKELETON ======================

function ArticleSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-pulse">
      <div className="h-80 rounded-xl bg-gray-200" />

      <div className="mt-8 h-10 bg-gray-200 rounded w-3/4" />

      <div className="mt-5 flex gap-4">
        <div className="h-6 w-28 rounded-full bg-gray-200" />
        <div className="h-6 w-40 rounded bg-gray-200" />
      </div>

      <div className="mt-8 space-y-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}

// ====================== CATEGORY ======================

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
      {category}
    </span>
  );
}

// ====================== TAGS ======================

function TagsSection({ tags }: { tags: string[] }) {
  if (!tags.length) return null;

  return (
    <div className="mt-12 border-t pt-8">
      <h3 className="text-lg font-semibold mb-4">Tags</h3>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-4 py-2 text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ====================== PAGE ======================

export default function PreviewArticlePage() {
  const params = useParams();
  const router = useRouter();

  // const slug = params?.id as string;
  const slug = params.slug as string;
  console.log("slug:", slug);

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/articles/${slug}`);

        if (!res.ok) {
          throw new Error("Failed to fetch article");
        }

        const data = await res.json();

        setArticle(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <ArticleSkeleton />
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Article Not Found</h2>

          <p className="mt-3 text-gray-500">
            {error || "This article doesn't exist."}
          </p>

          <button
            onClick={() => router.back()}
            className="mt-6 rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  const image = article.featuredImg || "/placeholder.jpg";
  const imageAlt = article.title;
  const publishDate = article.createdAt || "";

  return (
    <main className="bg-white min-h-screen">
      <article className="max-w-4xl mx-auto px-4 pb-24">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="mt-6 text-gray-600 hover:text-black flex items-center gap-2"
        >
          ← Back
        </button>

        {/* Image */}
        <div className="mt-6 overflow-hidden rounded-2xl">
          <Image
            src={image}
            alt={imageAlt}
            width={1200}
            height={675}
            className="w-full max-h-[550px] object-cover"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="mt-8 text-4xl font-extrabold leading-tight text-gray-900">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <CategoryBadge category={article.category || "General"} />

          {publishDate && (
            <time className="text-gray-500">{formatDate(publishDate)}</time>
          )}
        </div>

        {/* Author */}
        {article.author && (
          <div className="mt-8 flex items-center gap-3 border-t pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-bold">
              {(article.author || "A").charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="font-semibold">{article.author || "Admin"}</p>
              <p className="text-sm text-gray-500">Author</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mt-10">
          <ArticleContent content={article.content} />
        </div>

        {/* Tags */}
        <TagsSection tags={article.tags ?? []} />
      </article>
    </main>
  );
}