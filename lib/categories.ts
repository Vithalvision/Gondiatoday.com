import { Category, CategorySlug } from "./types";

export const CATEGORIES: Record<CategorySlug, Category> = {
  gondia: {
    slug: "gondia",
    label: "Gondia",
    colorClass: "text-brand",
  },
  maharashtra: {
    slug: "maharashtra",
    label: "Maharashtra",
    colorClass: "text-orange-600",
  },
  india: {
    slug: "india",
    label: "India",
    colorClass: "text-indigo-600",
  },
  politics: {
    slug: "politics",
    label: "Politics",
    colorClass: "text-purple-600",
  },
  education: {
    slug: "education",
    label: "Education",
    colorClass: "text-blue-600",
  },
  business: {
    slug: "business",
    label: "Business",
    colorClass: "text-amber-700",
  },
  health: {
    slug: "health",
    label: "Health",
    colorClass: "text-emerald-600",
  },
  sports: {
    slug: "sports",
    label: "Sports",
    colorClass: "text-cyan-600",
  },

  // More Categories
  entertainment: {
    slug: "entertainment",
    label: "Entertainment",
    colorClass: "text-pink-600",
  },
  technology: {
    slug: "technology",
    label: "Technology",
    colorClass: "text-sky-600",
  },
  opinion: {
    slug: "opinion",
    label: "Opinion",
    colorClass: "text-gray-600",
  },
  obituary: {
    slug: "obituary",
    label: "Obituary",
    colorClass: "text-stone-600",
  },
};

export const NAV_ITEMS = [
  { label: "होम", href: "/" },
  { label: "गोंदिया", href: "/gondia" },
  { label: "महाराष्ट्र", href: "/maharashtra" },
  { label: "भारत", href: "/india" },
  { label: "राजनीति", href: "/politics" },
  { label: "शिक्षा", href: "/education" },
  { label: "व्यापार", href: "/business" },
  { label: "स्वास्थ्य", href: "/health" },
  { label: "खेल", href: "/sports" },
];

export const MORE_ITEMS = [
  { label: "Entertainment", href: "/entertainment" },
  { label: "Technology", href: "/technology" },
  { label: "Opinion", href: "/opinion" },
  { label: "Obituary", href: "/obituary" },
];