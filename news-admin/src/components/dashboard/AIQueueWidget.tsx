import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { aiQueueState } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function AIQueueWidget() {
  const { status, pending, processing, completed } = aiQueueState;

  return (
    <div className="bg-[#E8F0FE] border border-[#C5D8FB] rounded-xl p-5 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#0B57D0] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0B57D0]">AI Content Queue</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={cn(
                "w-1.5 h-1.5 rounded-full",
                status === "processing" ? "bg-[#0B57D0] animate-pulse" : "bg-[#2E7D32]"
              )} />
              <span className="text-[10px] text-[#555555] font-medium capitalize">{status}</span>
            </div>
          </div>
        </div>
        <Link href="/dashboard/ai-queue" className="flex items-center gap-1 text-xs font-medium text-[#0B57D0] hover:underline">
          Manage <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Pending", value: pending, color: "text-[#E65100]" },
          { label: "Processing", value: processing, color: "text-[#0B57D0]" },
          { label: "Done today", value: completed, color: "text-[#2E7D32]" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white/60 rounded-lg px-3 py-2.5 text-center">
            <p className={cn("text-lg font-bold leading-none", color)}>{value}</p>
            <p className="text-[10px] text-[#757575] mt-1 leading-none">{label}</p>
          </div>
        ))}
      </div>

      {status === "processing" && (
        <div className="mt-3 flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2">
          <Loader2 className="w-3.5 h-3.5 text-[#0B57D0] animate-spin shrink-0" />
          <p className="text-xs text-[#555555]">Generating articles on <span className="font-medium">Finance, Tech</span></p>
        </div>
      )}
    </div>
  );
}
