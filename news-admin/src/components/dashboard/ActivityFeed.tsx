import {
  CheckCircle2,
  FilePen,
  Sparkles,
  MessageSquare,
  UserPlus,
  TrendingUp,
} from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";
import { activityFeed } from "@/lib/mock-data";
import type { ActivityType } from "@/types";

const activityConfig: Record<
  ActivityType,
  { icon: React.ElementType; iconBg: string; iconColor: string }
> = {
  article_published: { icon: CheckCircle2, iconBg: "bg-[#E8F5E9]", iconColor: "text-[#2E7D32]" },
  article_drafted: { icon: FilePen, iconBg: "bg-[#F5F5F5]", iconColor: "text-[#757575]" },
  ai_generated: { icon: Sparkles, iconBg: "bg-[#E8F0FE]", iconColor: "text-[#0B57D0]" },
  comment_received: { icon: MessageSquare, iconBg: "bg-[#FFF3E0]", iconColor: "text-[#E65100]" },
  user_joined: { icon: UserPlus, iconBg: "bg-[#E8F5E9]", iconColor: "text-[#2E7D32]" },
  seo_updated: { icon: TrendingUp, iconBg: "bg-[#E8F0FE]", iconColor: "text-[#0B57D0]" },
};

export function ActivityFeed() {
  return (
    <div className="bg-white border border-[#E0E0E0] rounded-xl shadow-card">
      <div className="px-5 py-4 border-b border-[#E0E0E0]">
        <h2 className="font-semibold text-sm text-[#222222]">Recent Activity</h2>
      </div>
      <ul className="divide-y divide-[#F5F5F5]">
        {activityFeed.map((item, index) => {
          const config = activityConfig[item.type];
          const Icon = config.icon;
          return (
            <li key={item.id} className="px-5 py-3.5 flex items-start gap-3 hover:bg-[#FAFAFA] transition-colors">
              <div className={cn("w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5", config.iconBg)}>
                <Icon className={cn("w-3.5 h-3.5", config.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-xs font-semibold text-[#222222] truncate">{item.actor}</p>
                  <span className="text-[10px] text-[#9E9E9E] whitespace-nowrap shrink-0">
                    {formatRelativeTime(item.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-[#757575] mt-0.5">{item.message}</p>
                {item.meta && (
                  <p className="text-[10px] text-[#9E9E9E] mt-0.5 truncate italic">{item.meta}</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
