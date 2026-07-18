"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Tag,
  Users,
  Image,
  Sparkles,
  ListOrdered,
  TrendingUp,
  UserCog,
  BarChart3,
  Settings,
  Newspaper,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, currentUser } from "@/lib/mock-data";
import type { NavItem } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Tag,
  Users,
  Image,
  Sparkles,
  ListOrdered,
  TrendingUp,
  UserCog,
  BarChart3,
  Settings,
};

const badgeVariantStyles: Record<string, string> = {
  primary: "bg-[#E8F0FE] text-[#0B57D0]",
  accent: "bg-[#FFEBEE] text-[#D32F2F]",
  success: "bg-[#E8F5E9] text-[#2E7D32]",
  warning: "bg-[#FFF3E0] text-[#E65100]",
};

// Group nav items by section
function groupNavItems(items: NavItem[]) {
  const groups: Record<string, NavItem[]> = {};
  for (const item of items) {
    const section = item.section ?? "Other";
    if (!groups[section]) groups[section] = [];
    groups[section].push(item);
  }
  return groups;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const filteredItems = navItems.filter((item) => {
  // Reporter restrictions
  if (
    currentUser.role === "Reporter" &&
    ["Users", "Settings", "Analytics"].includes(item.label)
  ) {
    return false;
  }

  return true;
});

const groups = groupNavItems(filteredItems);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-[#FAFAFA] border-r border-[#E0E0E0] z-50 flex flex-col transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E0E0E0] shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2.5" onClick={onClose}>
            <div className="w-8 h-8 bg-[#D32F2F] rounded-lg flex items-center justify-center shrink-0">
              <Newspaper className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-[#222222] text-sm tracking-tight leading-none block">
                NewsRoom
              </span>
              <span className="text-[10px] text-[#757575] font-medium uppercase tracking-wider leading-none mt-0.5 block">
                { currentUser.role}
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-[#E0E0E0] text-[#757575] transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-5">
          {Object.entries(groups).map(([section, items]) => (
            <div key={section}>
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#9E9E9E]">
                {section}
              </p>
              <ul className="space-y-0.5">
                {items.map((item) => {
                  const Icon = iconMap[item.icon];
                  const isActive =
                    item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "nav-item",
                          isActive ? "nav-item-active" : "nav-item-default"
                        )}
                      >
                        {Icon && (
                          <Icon
                            className={cn(
                              "w-4 h-4 shrink-0",
                              isActive ? "text-[#0B57D0]" : "text-[#757575]"
                            )}
                          />
                        )}
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge !== undefined && (
                          <span
                            className={cn(
                              "badge text-[10px]",
                              badgeVariantStyles[item.badgeVariant ?? "primary"]
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-[#E0E0E0] shrink-0">
          <p className="text-[10px] text-[#BDBDBD] text-center">NewsRoom v2.4.1</p>
        </div>
      </aside>
    </>
  );
}
