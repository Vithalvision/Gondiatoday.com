// import Image from 'next/image';
import ArticleImage from "@/components/ui/ArticleImage";
import Link from "next/link";
import { Article } from "@/lib/types";
import { CategoryTag } from "@/components/ui/CategoryTag";
import { ArticleMeta } from "./ArticleMeta";
import { cn } from "@/lib/utils";
import { timeAgo, formatShort } from "@/lib/formatDate";

type Variant = "hero" | "compact" | "list" | "pick";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function ArticleCard({
  article,
  variant = "compact",
}: {
  article: Article | null;
  variant?: Variant;
}) {
  if (!article) return null;

  const href = `/${article.category?.slug ?? "general"}/${article.slug}`;

  if (variant === "hero") {
    return (
      <Link
        href={href}
        className={cn(
          "relative block rounded-card overflow-hidden h-[340px] sm:h-[440px] md:h-[500px] group shadow-sm",
          focusRing
        )}
      >
        <ArticleImage
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
        />

        <span className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/5 block" />

        <span className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 block">
          <CategoryTag category={article.category} onDark asSpan />

          <h1
            translate="yes"
            className="font-display text-[22px] sm:text-[34px] font-bold text-white mt-3 leading-[1.15] tracking-tight max-w-3xl"
          >
            {article.title}
          </h1>

          <p
            translate="yes"
            className="text-sm text-white/80 mt-2.5 line-clamp-2 max-w-xl"
          >
            {article.excerpt}
          </p>

          <ArticleMeta
            author={article.author}
            date={timeAgo(article.publishedAt)}
            readTime={article.readTime}
            dark
          />
        </span>
      </Link>
    );
  }

  if (variant === "list") {
    return (
      <Link
        href={href}
        className={cn(
          "flex gap-3.5 group rounded-card -m-2 p-2 transition-colors hover:bg-gray-50",
          focusRing
        )}
      >
        <span className="relative w-20 h-[72px] sm:w-24 sm:h-20 flex-shrink-0 rounded-card overflow-hidden bg-gray-100 block">
          <ArticleImage
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
          />
        </span>

        <span className="min-w-0 flex flex-col justify-center">
          <CategoryTag category={article.category} size="xs" asSpan />

          <h3
            translate="yes"
            className="font-display text-sm font-semibold text-ink leading-snug mt-1 line-clamp-2 group-hover:text-brand transition-colors"
          >
            {article.title}
          </h3>

          <p className="text-[11px] text-body mt-1">
            {timeAgo(article.publishedAt)}
          </p>
        </span>
      </Link>
    );
  }

  if (variant === "pick") {
    return (
      <Link href={href} className={cn("block group rounded-card", focusRing)}>
        <span
          className={cn(
            "relative rounded-card overflow-hidden bg-gray-100 shadow-sm block",
            article.featured ? "h-64" : "h-44"
          )}
        >
          <ArticleImage
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
          />

          {article.featured && (
            <span className="absolute top-3 left-3 bg-brand text-white text-[11px] font-display font-bold uppercase tracking-wide px-2.5 py-1 rounded-sm">
              Featured
            </span>
          )}
        </span>

        <h3
          translate="yes"
          className="font-display font-semibold text-ink mt-3 leading-snug group-hover:text-brand transition-colors"
        >
          {article.title}
        </h3>

        <p
          translate="yes"
          className="text-sm text-body mt-1 line-clamp-2"
        >
          {article.excerpt}
        </p>

        <ArticleMeta
          author={article.author}
          date={formatShort(article.publishedAt)}
          readTime={article.readTime}
        />
      </Link>
    );
  }

  // compact
  return (
    <Link
      href={href}
      className={cn(
        "flex gap-4 group rounded-card border-b border-gray-200 pb-5 transition-colors",
        focusRing
      )}
    >
      <span className="relative w-28 h-24 sm:w-32 sm:h-24 flex-shrink-0 rounded-card overflow-hidden bg-gray-100 block">
        <ArticleImage
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
        />
      </span>

      <span className="min-w-0 flex flex-col">
        <CategoryTag category={article.category} size="xs" asSpan />

        <h3
          translate="yes"
          className="font-display text-[15px] font-semibold text-ink leading-snug mt-1 line-clamp-2 group-hover:text-brand transition-colors"
        >
          {article.title}
        </h3>

        <p
          translate="yes"
          className="text-xs text-body mt-1.5 line-clamp-1"
        >
          {article.excerpt}
        </p>

        <p className="text-[11px] text-body/80 mt-auto pt-1.5">
          {timeAgo(article.publishedAt)}
        </p>
      </span>
    </Link>
  );
}