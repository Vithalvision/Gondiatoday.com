import { getHeroArticle } from "@/lib/api/articles";
import { CategoryTag } from "@/components/ui/CategoryTag";
import { ArticleMeta } from "@/components/news/ArticleMeta";
import { TopStoriesSidebar } from "@/components/home/TopStoriesSidebar";
import { PlacesSection } from "@/components/home/placessection";
import { PincodeSection } from "@/components/home/pincodesection";
import AdSlot from "@/components/ads/AdSlot";
import Image from "next/image";
import { demoArticles } from "@/lib/data/demoarticles";
import ShareButton from "@/components/common/ShareButton";


export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const article = await getHeroArticle(params.slug);

  if (!article) {
    return {
      title: "Article Not Found | Gondia Today",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${article.title} | Gondia Today`,
    description: article.title,

    alternates: {
      canonical: `https://gondiatoday.com/${params.category}/${params.slug}`,
    },

    openGraph: {
      title: article.title,
      description: article.title,
      url: `https://gondiatoday.com/${params.category}/${params.slug}`,
      siteName: "Gondia Today",
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.title,
      images: [article.image],
    },
  };
}


export default async function ArticlePage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const article = await getHeroArticle(params.slug);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold">Article Not Found</h1>
        <p className="text-gray-500 mt-2">
          The requested article could not be found.
        </p>
      </div>
    );
  }


  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    image: [article.image],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Gondia Today",
      logo: {
        "@type": "ImageObject",
        url: "https://gondiatoday.com/logo.png",
      },
    },
  };


  const topStories = demoArticles.slice(0, 5);
  const places: Array<{ id: number; name: string; slug: string }> = [];
  const pincodes: Array<{ area: string; pin: string; slug: string }> = [];


  return (
    <div className="px-4 py-6">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT SIDEBAR */}
        <aside className="lg:col-span-2 notranslate" translate="no">
          <div className="sticky top-24 space-y-6">

            <AdSlot type="sidebar" />

            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <PlacesSection places={places} />
            </div>

            <AdSlot type="sidebar" />

            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <PincodeSection pincodes={pincodes} />
            </div>

          </div>
        </aside>


        {/* ARTICLE */}
        <main className="lg:col-span-7">

          <CategoryTag category={article.category} />


          <div className="relative w-full h-[420px] rounded-xl overflow-hidden mt-6">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>


          <h1
            translate="yes"
            className="font-display font-bold text-3xl text-ink mt-6 leading-snug"
          >
            {article.title}
          </h1>


          <ArticleMeta
            author={article.author}
            date={new Date(article.publishedAt).toLocaleDateString("hi-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
            readTime={article.readTime}
          />


          <div className="mt-4">
            <ShareButton
              title={article.title}
              url={`https://gondiatoday.com/${article.category}/${article.slug}`}
            />
          </div>


          <article
            translate="yes"
            className="
              prose
              prose-lg
              max-w-none
              mt-8
              prose-headings:font-bold
              prose-headings:text-gray-900
              prose-p:text-gray-700
              prose-p:leading-8
              prose-p:mb-5
              prose-ul:list-disc
              prose-ol:list-decimal
              prose-img:rounded-xl
              prose-img:shadow-lg
              prose-a:text-red-600
            "
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
          />

        </main>


        {/* RIGHT SIDEBAR */}
        <aside className="lg:col-span-3 notranslate" translate="no">

          <div className="sticky top-24 space-y-6">

            <AdSlot type="sidebar" />

            <TopStoriesSidebar stories={topStories} />

          </div>

        </aside>


      </div>
    </div>
  );
}