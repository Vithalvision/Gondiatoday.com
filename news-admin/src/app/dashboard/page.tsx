"use client";
import { StatCardComponent } from "@/components/dashboard/StatCard";
import { RecentArticles } from "@/components/dashboard/RecentArticles";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AIQueueWidget } from "@/components/dashboard/AIQueueWidget";
import { statCards } from "@/lib/mock-data";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="p-5 lg:p-7 space-y-6 max-w-screen-xl mx-auto">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#222222]">
            {loading ? "Dashboard" : `Welcome, ${user?.name}`}
          </h1>

          <p className="text-sm text-[#9E9E9E] mt-0.5">{today}</p>

          {!loading && (
            <p className="text-sm text-blue-600 mt-1">
              Role: <strong>{user?.role}</strong>
            </p>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs text-[#757575] bg-white border border-[#E0E0E0] rounded-lg px-3 py-1.5 font-medium shadow-card">
            Last updated: just now
          </span>
        </div>
      </div>

      {/* Stat cards */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <StatCardComponent key={card.id} card={card} />
          ))}
        </div>
      </section>

      {/* Main grid */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Left: Recent articles (spans 2 cols on xl) */}
        <div className="xl:col-span-2 space-y-5">
          <RecentArticles />
        </div>

        {/* Right: Sidebar widgets */}
        <div className="space-y-5">
          <AIQueueWidget />
          <QuickActions />
          <ActivityFeed />
        </div>
      </section>
    </div>
  );
}
