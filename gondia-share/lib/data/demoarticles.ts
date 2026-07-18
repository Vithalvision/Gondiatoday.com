import { Article } from "@/lib/types";

export const demoArticles: Article[] = [
  {
    id: "demo-1",
    title: "Heavy Rain Alert Issued Across Gondia District",
    slug: "heavy-rain-alert-gondia",
    image: "/images/news-placeholder.jpg",
    excerpt:
      "The weather department has predicted moderate to heavy rainfall across Gondia over the next 48 hours.",
    category: {
      name: "Weather",
      slug: "weather",
    },
    author: "Gondia Today",
    readTime: "2 min read",
    publishedAt: new Date().toISOString(),
    featured: false,
  },
  {
    id: "demo-2",
    title: "Road Repair Work Begins Near Gondia Railway Station",
    slug: "road-repair-gondia",
    image: "/images/news-placeholder.jpg",
    excerpt:
      "Municipal authorities have started repairing damaged roads to improve traffic movement before monsoon.",
    category: {
      name: "City",
      slug: "city",
    },
    author: "Gondia Today",
    readTime: "3 min read",
    publishedAt: new Date().toISOString(),
    featured: false,
  },
  {
    id: "demo-3",
    title: "Local Market Sees Rise in Vegetable Prices",
    slug: "vegetable-prices-gondia",
    image: "/images/news-placeholder.jpg",
    excerpt:
      "Vegetable prices increased this week due to continuous rainfall affecting transportation.",
    category: {
      name: "Business",
      slug: "business",
    },
    author: "Gondia Today",
    readTime: "2 min read",
    publishedAt: new Date().toISOString(),
    featured: false,
  },
  {
    id: "demo-4",
    title: "Schools Prepare for New Academic Session",
    slug: "schools-new-session",
    image: "/images/news-placeholder.jpg",
    excerpt:
      "Government and private schools across Gondia have begun preparations for the upcoming academic year.",
    category: {
      name: "Education",
      slug: "education",
    },
    author: "Gondia Today",
    readTime: "2 min read",
    publishedAt: new Date().toISOString(),
    featured: false,
  },
  {
    id: "demo-5",
    title: "Traffic Police Launch Road Safety Awareness Campaign",
    slug: "road-safety-campaign",
    image: "/images/news-placeholder.jpg",
    excerpt:
      "The campaign focuses on helmet use, speed limits, and safe driving practices across the city.",
    category: {
      name: "Traffic",
      slug: "traffic",
    },
    author: "Gondia Today",
    readTime: "2 min read",
    publishedAt: new Date().toISOString(),
    featured: false,
  },
];