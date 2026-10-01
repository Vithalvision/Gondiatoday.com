import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://gondiatoday.com';

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    }
  ];

  try {
    // Dynamic routes from DB
    const [articles, categories, places, pincodes] = await Promise.all([
      prisma.article.findMany({
        select: { id: true, createdAt: true, category: true },
        where: { status: 'PUBLISHED' },
        orderBy: { createdAt: 'desc' },
        take: 1000,
      }),
      prisma.category.findMany({
        select: { slug: true, updatedAt: true },
      }),
      prisma.place.findMany({
        select: { slug: true, updatedAt: true },
      }),
      prisma.pincode.findMany({
        select: { slug: true, createdAt: true },
      })
    ]);

    const articleEntries = articles.map((article) => {
      const categorySlug = (article.category || 'general').toLowerCase().replace(/\s+/g, '-');
      return {
        url: `${baseUrl}/${categorySlug}/${article.id}`,
        lastModified: article.createdAt,
        changeFrequency: 'daily' as const,
        priority: 0.8,
      };
    });

    const categoryEntries = categories.map((cat) => ({
      url: `${baseUrl}/${cat.slug}`,
      lastModified: cat.updatedAt,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }));

    const placeEntries = places.map((place) => ({
      url: `${baseUrl}/places/${place.slug}`,
      lastModified: place.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    const pincodeEntries = pincodes.map((pincode) => ({
      url: `${baseUrl}/pincode/${pincode.slug}`,
      lastModified: pincode.createdAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [
      ...staticRoutes,
      ...categoryEntries,
      ...articleEntries,
      ...placeEntries,
      ...pincodeEntries,
    ];
  } catch (error) {
    console.error('Failed to generate dynamic sitemap:', error);
    return staticRoutes;
  }
}
