// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
  badgeVariant?: "primary" | "accent" | "success" | "warning";
  section?: string;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export interface StatCard {
  id: string;
  label: string;
  value: string | number;
  change: number; // percentage
  changeLabel: string;
  icon: string;
  variant: "primary" | "accent" | "success" | "warning";
}

// ─── Articles ─────────────────────────────────────────────────────────────────

export type ArticleStatus = "published" | "draft" | "review" | "scheduled";
export type ArticleSource = "manual" | "ai-generated";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: ArticleStatus;
  source: ArticleSource;
  author: Author;
  category: string;
  tags: string[];
  views: number;
  publishedAt?: string;
  updatedAt: string;
  imageUrl?: string;
}

// ─── Authors ──────────────────────────────────────────────────────────────────
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;

  role: "Admin" | "Editor" | "Reporter";

  category?: string; // Sports, Politics, Education etc.

  status: "Active" | "Inactive";

  lastLogin: string;
}

// ─── Activity ─────────────────────────────────────────────────────────────────

export type ActivityType =
  | "article_published"
  | "article_drafted"
  | "ai_generated"
  | "comment_received"
  | "user_joined"
  | "seo_updated";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  message: string;
  actor: string;
  timestamp: string;
  meta?: string;
}

// ─── AI Queue ─────────────────────────────────────────────────────────────────

export type AIQueueStatus = "idle" | "processing" | "error";

export interface AIQueueState {
  status: AIQueueStatus;
  pending: number;
  processing: number;
  completed: number;
}

// ─── Notification ─────────────────────────────────────────────────────────────

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  type: "info" | "warning" | "success" | "error";
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: "Admin" | "Editor" | "Reporter";
  status: "Active" | "Inactive";
  lastLogin: string;
}