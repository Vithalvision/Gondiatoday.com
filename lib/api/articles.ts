import {
  HERO_ARTICLE,
  TOP_STORIES,
  LATEST_NEWS,
  EDITORS_PICK,
  TRENDING,
  IN_SHORT_ITEMS,
  VIDEO_STORIES,
  PHOTO_GALLERY,
  LOCAL_SPOTLIGHT,
} from './mockData';

import { demoArticles } from "@/lib/data/demoarticles";

// ---------------------------------------------------------------------------
// This module is the single boundary between UI components and the data
// source. Every function below currently resolves mock data synchronously
// wrapped in a Promise, matching the async shape Prisma queries will have.
//
// To wire up PostgreSQL via Prisma, replace each function body, e.g.:
//
//   export async function getTopStories() {
//     return prisma.article.findMany({
//       orderBy: { publishedAt: 'desc' },
//       take: 4,
//       include: { category: true, author: true },
//     });
//   }
//
// Components never need to change.
// ---------------------------------------------------------------------------
// export async function getHeroArticle() {
  // return HERO_ARTICLE;
// }

// export async function getHeroArticle(slug: string) {
//   try {
//     const baseUrl =
//       process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3007";

//     const res = await fetch(`${baseUrl}/api/articles/${slug}`, {
//       cache: "no-store",
//       headers: {
//         Accept: "application/json",
//       },
//     });

//     if (!res.ok) {
//       throw new Error("Article not found");
//     }

//     const article = await res.json();

//     return {
//       id: article.id,
//       title: article.title,
//       slug: article.slug || article.id,

//       image:
//         article.featuredImg?.length > 0
//           ? article.featuredImg
//           : "/images/news-placeholder.jpg",

//       // Short summary
//       excerpt: article.content
//         ? article.content.replace(/<[^>]*>/g, "").substring(0, 180)
//         : "",

//       // Full HTML content
//       content: article.content || "",

//       category: {
//         slug: (article.category || "general").toLowerCase().replace(/\s+/g, "-"),
//         label: article.category || "General",
//         colorClass: "bg-red-600 text-white",
//       },

//       author: article.author || "Gondia Today",

//       readTime: "2 min read",

//       publishedAt: article.createdAt,
//     };
//   } catch (error) {
//     console.error("getHeroArticle failed:", error);
//     return HERO_ARTICLE;
//   }
// }


export async function getHeroArticle(slug?: string) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3007";

    const res = await fetch(`${baseUrl}/api/articles`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) return null;

    const articles = await res.json();

    if (!Array.isArray(articles) || articles.length === 0) {
      return null;
    }

    // Find the requested article
    const article = articles.find(
      (item: any) =>
        item.id === slug ||
        item.slug === slug
    );

    if (!article) return null;

    const categoryName = article.category || "General";
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, "-") as
      | "gondia"
      | "maharashtra"
      | "india"
      | "politics"
      | "education"
      | "business"
      | "health"
      | "sports"
      | "general";

    return {
      id: article.id,
      title: article.title,
      slug: article.slug || article.id,

      image: article.featuredImg || "/images/news-placeholder.jpg",

      excerpt: article.content
        ? article.content.replace(/<[^>]*>/g, "").substring(0, 180)
        : "",

      content: article.content || "",

      category: {
        slug: categorySlug,
        label: categoryName,
        colorClass: "bg-red-600 text-white",
      },

      author: {
        name: article.author || "Gondia Today",
      },
      readTime: "2 min read",
      publishedAt: article.createdAt,
    };
  } catch {
    return null;
  }
}
export async function getTopStories() {
  return TOP_STORIES;
}

export async function getLatestNews() {
  try {
    const res = await fetch("http://localhost:3007/api/articles", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    return data.map((article: any) => ({
      id: article.id,
      slug: article.slug || article.id,

      title: article.title,

      excerpt: article.content
        ? article.content.replace(/<[^>]*>/g, "").substring(0, 120)
        : "",

      content: article.content || "",

      image:
        article.featuredImg || "/images/news-placeholder.jpg",

      category: {
        slug: (article.category || "india")
          .toLowerCase()
          .replace(/\s+/g, "-"),
        label: article.category || "India",
        colorClass: "bg-red-600 text-white",
      },

      author: {
        name: article.author || "Gondia Today",
      },

      publishedAt: article.createdAt,
      readTime: "2 min read",
      featured: false,
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}
export async function getEditorsPicks() {
  return EDITORS_PICK;
}

export async function getTrending() {
  return TRENDING;
}

export async function getInShortItems() {
  return IN_SHORT_ITEMS;
}

export async function getVideoStories() {
  return VIDEO_STORIES;
}

export async function getPhotoGallery() {
  return PHOTO_GALLERY;
}

export async function getLocalSpotlight() {
  return LOCAL_SPOTLIGHT;
}


export async function getArticlesByCategory(category: string) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3007";

    const res = await fetch(`${baseUrl}/api/articles`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return data
      .filter(
        (article: any) =>
          article.category &&
          article.category.toLowerCase() === category.toLowerCase()
      )
      .map((article: any) => ({
        id: article.id,
        title: article.title,
        slug: article.slug || article.id,
        image:
          article.featuredImg?.length > 0
            ? article.featuredImg
            : "/images/news-placeholder.jpg",

        excerpt: article.content
          ? article.content.replace(/<[^>]*>/g, "").substring(0, 120)
          : "",

        category: {
          slug: article.category.toLowerCase().replace(/\s+/g, "-"),
          label: article.category,
          colorClass: "bg-red-600 text-white",
        },

        author: article.author || "Gondia Today",
        readTime: "2 min read",
        publishedAt: article.createdAt,
        featured: false,
      }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
