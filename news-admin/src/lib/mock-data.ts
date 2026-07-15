import type {
  StatCard,
  Article,
  Author,
  ActivityItem,
  AIQueueState,
  Notification,
  User,
  NavItem,
} from "@/types";

// ─── Current User ──────────────────────────────────────────────────────────────
export const currentUser = {
  id: "u-001",
  name: "Priyal chouhan",
  email: "priya@newsroom.com",
  phone: "+91 9876543210",
  role: "Admin" as "Admin" | "Editor" | "Reporter",
  image: "",
};

// ─── Navigation ───────────────────────────────────────────────────────────────

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard", section: "Main" },
  { label: "Articles", href: "/dashboard/articles", icon: "FileText", badge: 4, badgeVariant: "accent", section: "Content" },
  { label: "Categories", href: "/dashboard/categories", icon: "FolderOpen", section: "Content" },
  { label: "Tags", href: "/dashboard/tags", icon: "Tag", section: "Content" },
  { label: "Authors", href: "/dashboard/authors", icon: "Users", section: "Content" },
  { label: "Media Library", href: "/dashboard/media", icon: "Image", section: "Content" },
  { label: "AI News Generator", href: "/dashboard/ai-generator", icon: "Sparkles", section: "AI Tools" },
  { label: "AI Content Queue", href: "/dashboard/ai-queue", icon: "ListOrdered", badge: 12, badgeVariant: "primary", section: "AI Tools" },
  { label: "SEO Manager", href: "/dashboard/seo", icon: "TrendingUp", section: "AI Tools" },
  { label: "Users", href: "/dashboard/users", icon: "UserCog", section: "Admin" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "BarChart3", section: "Admin" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings", section: "Admin" },
  { label: "Places", href: "/dashboard/places", icon: "FolderOpen", section: "Content" },
  { label: "Pincodes", href: "/dashboard/pincodes", icon: "FolderOpen", section: "Content" },
];

// ─── Stats ────────────────────────────────────────────────────────────────────

export const statCards: StatCard[] = [
  {
    id: "total-articles",
    label: "Total Articles",
    value: "3,842",
    change: 12.5,
    changeLabel: "vs last month",
    icon: "FileText",
    variant: "primary",
  },
  {
    id: "published",
    label: "Published",
    value: "2,617",
    change: 8.2,
    changeLabel: "vs last month",
    icon: "CheckCircle2",
    variant: "success",
  },
  {
    id: "drafts",
    label: "Drafts",
    value: "284",
    change: -3.1,
    changeLabel: "vs last month",
    icon: "FilePen",
    variant: "warning",
  },
  {
    id: "total-views",
    label: "Total Views",
    value: "1.2M",
    change: 24.8,
    changeLabel: "vs last month",
    icon: "Eye",
    variant: "accent",
  },
];

// ─── Authors ──────────────────────────────────────────────────────────────────

export const authors: Author[] = [
  { id: "a-001", name: "Rahul Verma", email: "rahul@newsroom.com", role: "editor", articlesCount: 142 },
  { id: "a-002", name: "Ananya Singh", email: "ananya@newsroom.com", role: "writer", articlesCount: 87 },
  { id: "a-003", name: "Karthik Iyer", email: "karthik@newsroom.com", role: "writer", articlesCount: 63 },
  { id: "a-004", name: "Meera Pillai", email: "meera@newsroom.com", role: "admin", articlesCount: 201 },
];

// ─── Recent Articles ──────────────────────────────────────────────────────────

export const recentArticles: Article[] = [
  {
    id: "art-001",
    title: "India's EV Revolution: How Domestic Manufacturers Are Redefining the Market",
    slug: "india-ev-revolution-2025",
    excerpt: "A deep dive into the rapid acceleration of electric vehicle adoption across tier-1 and tier-2 cities.",
    status: "published",
    source: "manual",
    author: authors[0],
    category: "Technology",
    tags: ["EV", "India", "Automobile"],
    views: 18420,
    publishedAt: "2025-06-10T08:30:00Z",
    updatedAt: "2025-06-10T08:30:00Z",
  },
  {
    id: "art-002",
    title: "Budget 2025: Key Takeaways for the Middle-Class Taxpayer",
    slug: "budget-2025-middle-class",
    excerpt: "Finance Minister announces sweeping tax reforms. Here's what changes for you.",
    status: "published",
    source: "ai-generated",
    author: authors[1],
    category: "Finance",
    tags: ["Budget", "Tax", "Economy"],
    views: 42100,
    publishedAt: "2025-06-09T12:00:00Z",
    updatedAt: "2025-06-09T14:22:00Z",
  },
  {
    id: "art-003",
    title: "Monsoon Forecast 2025: IMD Predicts Above-Normal Rainfall",
    slug: "monsoon-forecast-2025",
    excerpt: "The India Meteorological Department releases its long-range forecast for the upcoming monsoon season.",
    status: "review",
    source: "ai-generated",
    author: authors[2],
    category: "Weather",
    tags: ["Monsoon", "IMD", "Weather"],
    views: 0,
    updatedAt: "2025-06-11T09:15:00Z",
  },
  {
    id: "art-004",
    title: "IPL 2025 Final: Mumbai Indians vs Chennai Super Kings Preview",
    slug: "ipl-2025-final-preview",
    excerpt: "The two most successful franchises in IPL history clash once again in a blockbuster final.",
    status: "draft",
    source: "manual",
    author: authors[3],
    category: "Sports",
    tags: ["IPL", "Cricket", "Sports"],
    views: 0,
    updatedAt: "2025-06-11T18:00:00Z",
  },
  {
    id: "art-005",
    title: "Chandrayaan-4 Mission: ISRO Confirms Launch Window",
    slug: "chandrayaan-4-launch-window",
    excerpt: "India's ambitious lunar sample return mission has a confirmed launch window later this year.",
    status: "scheduled",
    source: "manual",
    author: authors[0],
    category: "Science",
    tags: ["ISRO", "Space", "Chandrayaan"],
    views: 0,
    publishedAt: "2025-06-15T06:00:00Z",
    updatedAt: "2025-06-11T11:30:00Z",
  },
];

// ─── Activity Feed ─────────────────────────────────────────────────────────────

export const activityFeed: ActivityItem[] = [
  {
    id: "act-001",
    type: "article_published",
    message: "Published new article",
    actor: "Rahul Verma",
    timestamp: "2025-06-12T08:45:00Z",
    meta: "India's EV Revolution",
  },
  {
    id: "act-002",
    type: "ai_generated",
    message: "AI generated 3 new articles",
    actor: "AI Engine",
    timestamp: "2025-06-12T07:30:00Z",
    meta: "Finance, Weather, Tech",
  },
  {
    id: "act-003",
    type: "seo_updated",
    message: "SEO metadata updated",
    actor: "Meera Pillai",
    timestamp: "2025-06-12T06:15:00Z",
    meta: "12 articles optimised",
  },
  {
    id: "act-004",
    type: "user_joined",
    message: "New author joined",
    actor: "System",
    timestamp: "2025-06-11T22:00:00Z",
    meta: "Divya Menon — Writer",
  },
  {
    id: "act-005",
    type: "article_drafted",
    message: "Saved draft",
    actor: "Karthik Iyer",
    timestamp: "2025-06-11T18:10:00Z",
    meta: "IPL 2025 Final Preview",
  },
  {
    id: "act-006",
    type: "comment_received",
    message: "Article received 50+ comments",
    actor: "System",
    timestamp: "2025-06-11T15:30:00Z",
    meta: "Budget 2025 Takeaways",
  },
];

// ─── AI Queue ─────────────────────────────────────────────────────────────────

export const aiQueueState: AIQueueState = {
  status: "processing",
  pending: 8,
  processing: 4,
  completed: 127,
};

// ─── Notifications ────────────────────────────────────────────────────────────

export const notifications: Notification[] = [
  {
    id: "n-001",
    title: "AI Queue Alert",
    message: "4 articles are pending editorial review.",
    read: false,
    timestamp: "2025-06-12T08:50:00Z",
    type: "warning",
  },
  {
    id: "n-002",
    title: "Article Trending",
    message: "Budget 2025 article crossed 40K views.",
    read: false,
    timestamp: "2025-06-12T07:15:00Z",
    type: "success",
  },
  {
    id: "n-003",
    title: "SEO Score Drop",
    message: "3 articles dropped below score 60.",
    read: false,
    timestamp: "2025-06-11T20:00:00Z",
    type: "error",
  },
  {
    id: "n-004",
    title: "Scheduled Publish",
    message: "Chandrayaan-4 article scheduled for Jun 15.",
    read: true,
    timestamp: "2025-06-11T11:30:00Z",
    type: "info",
  },
];
