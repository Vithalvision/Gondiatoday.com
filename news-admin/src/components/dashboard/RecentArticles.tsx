import { ExternalLink, Bot, Pencil } from "lucide-react";
import { cn, formatNumber, formatRelativeTime } from "@/lib/utils";
import { recentArticles } from "@/lib/mock-data";
import type { ArticleStatus } from "@/types";

const statusStyles: Record<ArticleStatus, string> = {
  published: "bg-[#E8F5E9] text-[#2E7D32]",
  draft: "bg-[#F5F5F5] text-[#757575]",
  review: "bg-[#FFF3E0] text-[#E65100]",
  scheduled: "bg-[#E8F0FE] text-[#0B57D0]",
};

const statusLabel: Record<ArticleStatus, string> = {
  published: "Published",
  draft: "Draft",
  review: "In Review",
  scheduled: "Scheduled",
};

export function RecentArticles() {
  return (
    <div className="bg-white border border-[#E0E0E0] rounded-xl overflow-hidden shadow-card">
      <div className="px-5 py-4 border-b border-[#E0E0E0] flex items-center justify-between">
        <h2 className="font-semibold text-sm text-[#222222]">Recent Articles</h2>
        <button className="text-xs font-medium text-[#0B57D0] hover:underline flex items-center gap-1">
          View all <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F5F5F5]">
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#9E9E9E]">Title</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#9E9E9E]">Author</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#9E9E9E]">Status</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#9E9E9E]">Views</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#9E9E9E]">Updated</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F5F5]">
            {recentArticles.map((article) => (
              <tr key={article.id} className="hover:bg-[#FAFAFA] transition-colors group">
                <td className="px-5 py-3.5">
                  <div className="flex items-start gap-2 max-w-xs">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#222222] leading-snug line-clamp-2">
                        {article.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] text-[#9E9E9E] bg-[#F5F5F5] px-1.5 py-0.5 rounded">
                          {article.category}
                        </span>
                        {article.source === "ai-generated" && (
                          <span className="flex items-center gap-0.5 text-[10px] text-[#0B57D0] bg-[#E8F0FE] px-1.5 py-0.5 rounded font-medium">
                            <Bot className="w-2.5 h-2.5" />
                            AI
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#0B57D0] flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                      {article.author.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <span className="text-xs text-[#555555] truncate max-w-[100px]">{article.author.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className={cn("badge text-[10px] font-semibold", statusStyles[article.status])}>
                    {statusLabel[article.status]}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-sm text-[#555555]">
                  {article.views > 0 ? formatNumber(article.views) : "—"}
                </td>
                <td className="px-4 py-3.5 text-xs text-[#9E9E9E] whitespace-nowrap">
                  {formatRelativeTime(article.updatedAt)}
                </td>
                <td className="px-4 py-3.5">
                  <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-[#E8F0FE] text-[#0B57D0] transition-all">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <ul className="md:hidden divide-y divide-[#F5F5F5]">
        {recentArticles.map((article) => (
          <li key={article.id} className="px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#222222] leading-snug line-clamp-2">
                  {article.title}
                </p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className={cn("badge text-[10px]", statusStyles[article.status])}>
                    {statusLabel[article.status]}
                  </span>
                  <span className="text-[10px] text-[#9E9E9E]">{article.author.name}</span>
                  <span className="text-[10px] text-[#9E9E9E]">·</span>
                  <span className="text-[10px] text-[#9E9E9E]">{formatRelativeTime(article.updatedAt)}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
