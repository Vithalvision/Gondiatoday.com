"use client";

import { useState, useEffect } from "react";
import { Play, Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";

type Campaign = {
  id: string;
  name: string;
  topics: string[];
  categories: string[];
  author?: string | null;
  durationValue?: number;
  durationUnit?: string;
};

type RunResult = {
  campaign: string;
  topic: string;
  skipped: boolean;
  title?: string;
  reason?: string;
  error?: string;
};

export default function SchedulerPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<RunResult[] | null>(null);

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {
    try {
      const res = await fetch("/api/campaigns");
      const data = await res.json();
      setCampaigns(data.campaigns || []);
    } catch {
      setCampaigns([]);
    }
  }

  function updateLocal(id: string, field: "durationValue" | "durationUnit", value: any) {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }

  async function saveDuration(campaign: Campaign) {
    setSavingId(campaign.id);
    try {
      const res = await fetch(`/api/campaigns/${campaign.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: campaign.name,
          topics: campaign.topics,
          categories: campaign.categories,
          author: campaign.author,
          durationValue: campaign.durationValue,
          durationUnit: campaign.durationUnit,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to save duration");
        return;
      }

      toast.success("Duration saved!");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSavingId(null);
    }
  }

  async function runSchedulerNow() {
    setRunning(true);
    setResults(null);

    try {
      const res = await fetch("/api/scheduler/run");
      const data = await res.json();

      if (!data.ok) {
        toast.error(data.error || "Scheduler failed");
        return;
      }

      setResults(data.results || []);
      toast.success("Scheduler run complete!");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="p-5 lg:p-7 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-[#222222]">Scheduler</h1>

        <button
          onClick={runSchedulerNow}
          disabled={running}
          className="flex items-center gap-2 bg-[#0B57D0] hover:bg-[#0842A0] text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
        >
          {running ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {running ? "Running..." : "Run Scheduler Now"}
        </button>
      </div>

      <p className="text-sm text-[#666] mb-6">
        Set how often each campaign should check for and generate a fresh
        article per topic. Click "Run Scheduler Now" to trigger a check
        immediately.
      </p>

      <div className="space-y-3">
        {campaigns.length === 0 ? (
          <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 text-center text-gray-400 text-sm">
            No campaigns created yet
          </div>
        ) : (
          campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white border border-[#E0E0E0] rounded-xl p-4"
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="font-semibold text-[#222222]">
                    {campaign.name}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {campaign.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs bg-blue-50 text-[#0B57D0] px-2 py-0.5 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#666]">Every</span>

                  <input
                    type="number"
                    min={1}
                    value={campaign.durationValue ?? 24}
                    onChange={(e) =>
                      updateLocal(
                        campaign.id,
                        "durationValue",
                        Number(e.target.value)
                      )
                    }
                    className="w-16 px-2 py-1.5 border border-[#E0E0E0] rounded-lg text-sm"
                  />

                  <select
                    value={campaign.durationUnit ?? "hour"}
                    onChange={(e) =>
                      updateLocal(campaign.id, "durationUnit", e.target.value)
                    }
                    className="px-2 py-1.5 border border-[#E0E0E0] rounded-lg text-sm bg-white"
                  >
                    <option value="hour">Hour(s)</option>
                    <option value="day">Day(s)</option>
                    <option value="week">Week(s)</option>
                    <option value="month">Month(s)</option>
                  </select>

                  <button
                    onClick={() => saveDuration(campaign)}
                    disabled={savingId === campaign.id}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E8F0FE] text-[#0B57D0] hover:bg-[#D2E3FC] disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {savingId === campaign.id ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {results && (
        <div className="mt-8">
          <h2 className="text-lg font-bold text-[#222222] mb-4">
            Last Run Results
          </h2>

          <div className="space-y-2">
            {results.map((r, i) => (
              <div
                key={i}
                className={`border rounded-lg p-3 text-sm ${
                  r.skipped
                    ? "bg-gray-50 border-gray-200 text-gray-500"
                    : r.error
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-green-50 border-green-200 text-green-700"
                }`}
              >
                <span className="font-semibold">{r.campaign}</span> —{" "}
                {r.topic}:{" "}
                {r.skipped
                  ? r.reason
                  : r.error
                  ? r.error
                  : `Generated "${r.title}"`}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}