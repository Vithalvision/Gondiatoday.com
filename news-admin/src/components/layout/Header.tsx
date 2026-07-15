"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  LogOut,
  User,
  Settings,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { currentUser, notifications, aiQueueState } from "@/lib/mock-data";
import type { Notification } from "@/types";

interface HeaderProps {
  onMenuClick: () => void;
}

const notifIconMap: Record<Notification["type"], React.ElementType> = {
  warning: AlertCircle,
  success: CheckCircle2,
  error: AlertCircle,
  info: TrendingUp,
};

const aiStatusConfig = {
  idle: {
    label: "AI Idle",
    color: "bg-[#E8F5E9] text-[#2E7D32]",
    dot: "bg-[#2E7D32]",
    icon: null,
  },
  processing: {
    label: "AI Processing",
    color: "bg-[#E8F0FE] text-[#0B57D0]",
    dot: "bg-[#0B57D0] animate-pulse",
    icon: Loader2,
  },
  error: {
    label: "AI Error",
    color: "bg-[#FFEBEE] text-[#D32F2F]",
    dot: "bg-[#D32F2F]",
    icon: AlertCircle,
  },
};

export function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const aiStatus = aiStatusConfig[aiQueueState.status];

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");

    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  return (
    <header className="h-14 bg-white border-b border-[#E0E0E0] flex items-center px-4 gap-3 shrink-0 relative z-30">

      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-[#F5F5F5] text-[#555555]"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
          <input
            type="text"
            placeholder="Search articles, authors…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-[#F5F5F5] rounded-lg focus:outline-none focus:border-[#0B57D0]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">

        {/* AI Status */}
        <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#E8F0FE] text-[#0B57D0]">
          <Sparkles className="w-3.5 h-3.5" />
          {aiStatus.label}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="relative p-2 rounded-lg hover:bg-[#F5F5F5]"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#D32F2F] text-white text-[9px] rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-[#F5F5F5]"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#E0E0E0]">
              <img
                src={
                  profileImage ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    currentUser.name
                  )}`
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg py-1">

              <div className="px-4 py-3 border-b">
                <p className="text-xs font-semibold">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-gray-500">
                  {currentUser.email}
                </p>
              </div>

              <Link href="/profile">
                <button
                  onClick={() => setShowProfile(false)}
                  className="flex items-center gap-3 px-4 py-2 w-full text-sm hover:bg-gray-100"
                >
                  <User className="w-4 h-4" />
                  My Profile
                </button>
              </Link>

              <button className="flex items-center gap-3 px-4 py-2 w-full text-sm hover:bg-gray-100">
                <Settings className="w-4 h-4" />
                Settings
              </button>

              <div className="border-t mt-1">
                <button className="flex items-center gap-3 px-4 py-2 w-full text-sm text-red-600 hover:bg-red-50">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}