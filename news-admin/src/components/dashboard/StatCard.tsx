import {
  FileText,
  CheckCircle2,
  FilePen,
  Eye,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { StatCard } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  FileText,
  CheckCircle2,
  FilePen,
  Eye,
};

const variantStyles: Record<StatCard["variant"], { icon: string; iconBg: string; change: string }> = {
  primary: {
    icon: "text-[#0B57D0]",
    iconBg: "bg-[#E8F0FE]",
    change: "text-[#2E7D32]",
  },
  success: {
    icon: "text-[#2E7D32]",
    iconBg: "bg-[#E8F5E9]",
    change: "text-[#2E7D32]",
  },
  warning: {
    icon: "text-[#E65100]",
    iconBg: "bg-[#FFF3E0]",
    change: "text-[#E65100]",
  },
  accent: {
    icon: "text-[#D32F2F]",
    iconBg: "bg-[#FFEBEE]",
    change: "text-[#2E7D32]",
  },
};

interface StatCardProps {
  card: StatCard;
}

export function StatCardComponent({ card }: StatCardProps) {
  const styles = variantStyles[card.variant];
  const Icon = iconMap[card.icon];
  const isPositive = card.change >= 0;

  return (
    <div className="stat-card group hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", styles.iconBg)}>
          {Icon && <Icon className={cn("w-5 h-5", styles.icon)} />}
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
          isPositive
            ? "bg-[#E8F5E9] text-[#2E7D32]"
            : "bg-[#FFEBEE] text-[#D32F2F]"
        )}>
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {Math.abs(card.change)}%
        </div>
      </div>

      <div>
        <p className="text-2xl font-bold text-[#222222] leading-none mb-1.5">
          {card.value}
        </p>
        <p className="text-sm font-medium text-[#555555]">{card.label}</p>
        <p className="text-xs text-[#9E9E9E] mt-1">{card.changeLabel}</p>
      </div>
    </div>
  );
}
