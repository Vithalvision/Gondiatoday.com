export type CategorySlug =
  | 'gondia'
  | 'maharashtra'
  | 'india'
  | 'politics'
  | 'education'
  | 'business'
  | 'health'
  | 'sports'
  | 'general';

export interface Category {
  slug: CategorySlug;
  label: string;
  colorClass: string; // tailwind text color class
}

export interface Author {
  name: string;
  avatar?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: Category;
  author: Author;
  publishedAt: string; // ISO date
  readTime: string; // e.g. "10 min read"
  featured?: boolean;
}

export interface VideoStory {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}
