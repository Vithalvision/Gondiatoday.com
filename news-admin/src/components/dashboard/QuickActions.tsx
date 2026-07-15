import Link from "next/link";
import {
  Plus,
  Sparkles,
  BarChart3,
  TrendingUp,
  Image,
  Users,
} from "lucide-react";

const quickActions = [
  {
    label: "New Article",
    description: "Write and publish",
    href: "/dashboard/articles/new",
    icon: Plus,
    color: "bg-[#0B57D0] hover:bg-[#0842A0] text-white",
    primary: true,
  },
  {
    label: "AI Generate",
    description: "Auto-write content",
    href: "/dashboard/ai-generator",
    icon: Sparkles,
    color: "bg-[#E8F0FE] hover:bg-[#D2E3FC] text-[#0B57D0]",
    primary: false,
  },
  {
    label: "View Analytics",
    description: "Traffic & performance",
    href: "/dashboard/analytics",
    icon: BarChart3,
    color: "bg-[#E8F5E9] hover:bg-[#D0EDD4] text-[#2E7D32]",
    primary: false,
  },
  {
    label: "SEO Manager",
    description: "Optimise articles",
    href: "/dashboard/seo",
    icon: TrendingUp,
    color: "bg-[#FFF3E0] hover:bg-[#FFE0B2] text-[#E65100]",
    primary: false,
  },
  {
    label: "Media Library",
    description: "Upload & manage",
    href: "/dashboard/media",
    icon: Image,
    color: "bg-[#F5F5F5] hover:bg-[#EEEEEE] text-[#555555]",
    primary: false,
  },
  {
    label: "Manage Authors",
    description: "Team & permissions",
    href: "/dashboard/authors",
    icon: Users,
    color: "bg-[#FFEBEE] hover:bg-[#FFCDD2] text-[#D32F2F]",
    primary: false,
  },
];

export function QuickActions() {
  return (
    <div className="bg-white border border-[#E0E0E0] rounded-xl shadow-card">
      <div className="px-5 py-4 border-b border-[#E0E0E0]">
        <h2 className="font-semibold text-sm text-[#222222]">Quick Actions</h2>
      </div>
      <div className="p-4 grid grid-cols-2 gap-2.5">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 ${action.color} ${action.primary ? "col-span-2" : ""}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${action.primary ? "bg-white/20" : "bg-black/5"}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold leading-none">{action.label}</p>
                <p className="text-[10px] mt-0.5 opacity-70 leading-none">{action.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
