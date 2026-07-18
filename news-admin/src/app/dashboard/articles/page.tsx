"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  FileText,
  LayoutGrid,
  List,
  ChevronDown,
  ImageOff,
} from "lucide-react";

type Article = {
  id?: number | string;
  _id?: string;
  title: string;
  category?: string;
  status?: "published" | "draft" | "in_review";
  author?: string;
  authorInitials?: string;
  authorColor?: string;
  createdAt?: string;
  featuredImg?: string;
  views?: number;
};

const STATUS_CONFIG = {
  published: {
    label: "Published",
    class: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
  draft: {
    label: "Draft",
    class: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  in_review: {
    label: "In Review",
    class: "bg-blue-50 text-blue-700 border border-blue-200",
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  Technology: "bg-violet-50 text-violet-700 border border-violet-200",
  Finance: "bg-sky-50 text-sky-700 border border-sky-200",
  Weather: "bg-teal-50 text-teal-700 border border-teal-200",
  Sports: "bg-orange-50 text-orange-700 border border-orange-200",
  Politics: "bg-red-50 text-red-700 border border-red-200",
  default: "bg-gray-100 text-gray-600 border border-gray-200",
};

function SkeletonRow() {
  return (
    <tr className="border-t border-gray-100 animate-pulse">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-14 h-10 rounded-lg bg-gray-200 shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-3.5 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-1/4" />
          </div>
        </div>
      </td>
      <td className="px-4 py-3"><div className="h-5 w-20 bg-gray-200 rounded-full" /></td>
      <td className="px-4 py-3"><div className="h-5 w-20 bg-gray-200 rounded-full" /></td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-200" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
      </td>
      <td className="px-4 py-3"><div className="h-3 w-16 bg-gray-200 rounded" /></td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <div className="w-7 h-7 rounded-lg bg-gray-200" />
          <div className="w-7 h-7 rounded-lg bg-gray-200" />
          <div className="w-7 h-7 rounded-lg bg-gray-200" />
        </div>
      </td>
    </tr>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
        <FileText className="w-8 h-8 text-indigo-400" />
      </div>
      <p className="text-gray-800 font-semibold text-lg mb-1">
        {query ? "No articles match your search" : "No articles yet"}
      </p>
      <p className="text-gray-400 text-sm mb-6 max-w-xs">
        {query
          ? `Try a different keyword or clear the search.`
          : "Create your first article and it will appear here."}
      </p>
      {!query && (
        <Link
          href="/dashboard/articles/create"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> New Article
        </Link>
      )}
    </div>
  );
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setArticles(data);
      } catch {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filtered = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.author?.toLowerCase().includes(search.toLowerCase()) ||
      a.category?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: articles.length,
    published: articles.filter((a) => a.status === "published").length,
    draft: articles.filter((a) => a.status === "draft").length,
    in_review: articles.filter((a) => a.status === "in_review").length,
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Articles</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {loading ? "Loading…" : `${articles.length} total articles`}
          </p>
        </div>
        <Link
          href="/dashboard/articles/create"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm transition-all duration-150 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create Article
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles, authors, categories…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition placeholder:text-gray-400"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 transition text-gray-700 cursor-pointer"
            >
              <option value="all">All ({statusCounts.all})</option>
              <option value="published">Published ({statusCounts.published})</option>
              <option value="draft">Draft ({statusCounts.draft})</option>
              <option value="in_review">In Review ({statusCounts.in_review})</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 shrink-0">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-all ${viewMode === "table"
                  ? "bg-white shadow-sm text-indigo-600"
                  : "text-gray-400 hover:text-gray-600"
                }`}
              title="Table view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-all ${viewMode === "grid"
                  ? "bg-white shadow-sm text-indigo-600"
                  : "text-gray-400 hover:text-gray-600"
                }`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-1 px-3 pb-3 overflow-x-auto">
          {(["all", "published", "draft", "in_review"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${filterStatus === s
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-100"
                }`}
            >
              {s === "all" ? "All" : s === "in_review" ? "In Review" : s.charAt(0).toUpperCase() + s.slice(1)}
              <span className={`ml-1.5 text-[10px] font-semibold ${filterStatus === s ? "opacity-80" : "opacity-60"}`}>
                {statusCounts[s]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Article
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Author
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <EmptyState query={search} />
                    </td>
                  </tr>
                ) : (
                  filtered.map((article, index) => {
                    const articleId = article.id ?? article._id;
                    const status = article.status ?? "draft";
                    const statusCfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.draft;
                    const catColor =
                      CATEGORY_COLORS[article.category ?? ""] ?? CATEGORY_COLORS.default;

                    return (
                      <tr
                        key={articleId || index}
                        className="border-t border-gray-50 hover:bg-indigo-50/30 transition-colors group"
                      >
                        {/* Title + Thumbnail */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                              {article. featuredImg? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={article.featuredImg}
                                  alt={article.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <ImageOff className="w-4 h-4 text-gray-300" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate max-w-[260px] group-hover:text-indigo-700 transition-colors">
                                {article.title}
                              </p>
                              {article.views != null && (
                                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {article.views.toLocaleString()} views
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-3">
                          {article.category ? (
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${catColor}`}>
                              {article.category}
                            </span>
                          ) : (
                            <span className="text-gray-300 text-xs">—</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusCfg.class}`}>
                            {statusCfg.label}
                          </span>
                        </td>

                        {/* Author */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${article.authorColor ?? "bg-indigo-500"
                                }`}
                            >
                              {article.authorInitials ??
                                (article.author
                                  ? article.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()
                                  : "?")}
                            </div>
                            <span className="text-sm text-gray-700 truncate max-w-[120px]">
                              {article.author ?? "Unknown"}
                            </span>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                          {article.createdAt
                            ? new Date(article.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                            : "—"}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <Link
                              href={`/dashboard/articles/preview/${articleId}`}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                              title="Preview"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/dashboard/articles/edit/${articleId}`}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </Link>
                            {/* <button
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                              title="Delete"
                              onClick={() => {
                                if (confirm("Delete this article?")) {
                                  setArticles((prev) =>
                                    prev.filter((a) => (a.id ?? a._id) !== articleId)
                                  );
                                }
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button> */}
                            <button
                          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 py-1.5 rounded-lg transition-all"
                          onClick={async () => {
                            console.log("Delete clicked");
                            // if (!confirm("Delete this article?")) return;
                            const result = confirm("Delete this article?");
                            console.log("Confirm result:", result);

                            if (!result) return;

                            try {
                              const response = await fetch(`/api/articles/${articleId}`, {
                                method: "DELETE",
                              });

                              const data = await response.json();

                              if (!response.ok) {
                                throw new Error(data.error || "Failed to delete article");
                              }

                              setArticles((prev) =>
                                prev.filter((a) => (a.id ?? a._id) !== articleId)
                              );

                              alert("Article deleted successfully");
                            } catch (error) {
                              console.error(error);
                              alert("Failed to delete article");
                            }
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {!loading && filtered.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-400">
                Showing {filtered.length} of {articles.length} articles
              </p>
            </div>
          )}
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                  <div className="h-36 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                    <div className="flex gap-2">
                      <div className="h-5 w-16 bg-gray-200 rounded-full" />
                      <div className="h-5 w-16 bg-gray-200 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100">
              <EmptyState query={search} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((article, index) => {
                const articleId = article.id ?? article._id;
                const status = article.status ?? "draft";
                const statusCfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.draft;
                const catColor =
                  CATEGORY_COLORS[article.category ?? ""] ?? CATEGORY_COLORS.default;

                return (
                  <div
                    key={articleId || index}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    {/* Thumbnail */}
                    <div className="h-36 bg-gray-100 overflow-hidden flex items-center justify-center relative">
                      {article.featuredImg ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={article.featuredImg}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <ImageOff className="w-8 h-8 text-gray-300" />
                      )}
                      <div className="absolute top-2.5 right-2.5">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full backdrop-blur-sm ${statusCfg.class}`}>
                          {statusCfg.label}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      {/* Category */}
                      {article.category && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${catColor}`}>
                          {article.category}
                        </span>
                      )}

                      {/* Title */}
                      <Link href={`/dashboard/articles/preview/${articleId}`}>
                        <h3 className="mt-2 text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-700 transition-colors leading-snug">
                          {article.title}
                        </h3>
                      </Link>

                      {/* Meta */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${article.authorColor ?? "bg-indigo-500"
                              }`}
                          >
                            {article.authorInitials ??
                              (article.author
                                ? article.author.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
                                : "?")}
                          </div>
                          <span className="text-xs text-gray-500 truncate max-w-[100px]">
                            {article.author ?? "Unknown"}
                          </span>
                        </div>
                        {article.createdAt && (
                          <span className="text-xs text-gray-400">
                            {new Date(article.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-1">
                        <Link
                          href={`/dashboard/articles/preview/${articleId}`}
                          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 py-1.5 rounded-lg transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" /> Preview
                        </Link>
                        <Link
                          href={`/dashboard/articles/create?id=${articleId}`}
                          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 py-1.5 rounded-lg transition-all"
                        >
                          <Pencil className="w-3.5 h-3.5" /> Edit
                        </Link>
                        <button
                          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 py-1.5 rounded-lg transition-all"
                          onClick={async () => {
                            console.log("Delete clicked");
                            // if (!confirm("Delete this article?")) return;
                            const result = confirm("Delete this article?");
                            console.log("Confirm result:", result);

                            if (!result) return;

                            try {
                              const response = await fetch(`/api/articles/${articleId}`, {
                                method: "DELETE",
                              });

                              const data = await response.json();

                              if (!response.ok) {
                                throw new Error(data.error || "Failed to delete article");
                              }

                              setArticles((prev) =>
                                prev.filter((a) => (a.id ?? a._id) !== articleId)
                              );

                              alert("Article deleted successfully");
                            } catch (error) {
                              console.error(error);
                              alert("Failed to delete article");
                            }
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}