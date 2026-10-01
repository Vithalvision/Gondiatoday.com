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
//       process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

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
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/articles`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.ok) {
      const articles = await res.json();
      if (Array.isArray(articles) && articles.length > 0) {
        const article = articles.find(
          (item: any) => item.id === slug || item.slug === slug
        );

        if (article) {
          const categoryName = article.category || "General";
          const categorySlug = categoryName.toLowerCase().replace(/\s+/g, "-");

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
        }
      }
    }
  } catch (error) {
    console.error("Error fetching article from API:", error);
  }

  // Fallback to mock data if API fails or article is not found
  const allMocks = [
    HERO_ARTICLE,
    ...TOP_STORIES,
    ...LATEST_NEWS,
    ...EDITORS_PICK,
    ...demoArticles,
  ];

  const mockArticle = allMocks.find((a: any) => a.id === slug || a.slug === slug);
  if (mockArticle) {
    return {
      id: mockArticle.id,
      title: mockArticle.title,
      slug: mockArticle.slug || mockArticle.id,
      image: mockArticle.image || "/images/news-placeholder.jpg",
      excerpt: mockArticle.excerpt || "",
      content: (mockArticle as any).content || `<p>${mockArticle.excerpt || mockArticle.title}</p>`,
      category: mockArticle.category || {
        slug: "general",
        label: "General",
        colorClass: "bg-red-600 text-white",
      },
      author: typeof mockArticle.author === "string" 
        ? { name: mockArticle.author } 
        : (mockArticle.author || { name: "Gondia Today" }),
      readTime: mockArticle.readTime || "2 min read",
      publishedAt: mockArticle.publishedAt || new Date().toISOString(),
    };
  }

  return null;
}
export async function getTopStories() {
  return TOP_STORIES;
}

export async function getLatestNews() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/articles`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

        const data = await res.json();
    const publishedData = data.filter((article: any) => article.status === "published");

    return publishedData.map((article: any) => ({
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
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
