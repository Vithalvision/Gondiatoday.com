"use client";

import { useEffect, useState } from "react";

type GoldData = {
  gold24K: string;
  gold22K: string;
  silver: string;
  updated: string;
};

export function GoldRateWidget() {
  const [gold, setGold] = useState<GoldData | null>(null);

  useEffect(() => {
    const loadGold = () => {
      fetch("/api/gold-rate")
        .then((res) => res.json())
        .then(setGold)
        .catch(console.error);
    };

    loadGold();

    const interval = setInterval(loadGold, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  if (!gold) {
   return (
    <div
      className="h-24 rounded-lg border animate-pulse bg-gray-100 notranslate"
      translate="no"
    />
);
  }

  return (
   <div
      className="rounded-lg border p-2 hover:bg-gray-50 transition h-20 w-full overflow-hidden flex flex-col items-center justify-center gap-0.5 notranslate"
      translate="no"
    >
      <div className="text-xl">🪙</div>

      <div className="text-sm font-bold truncate w-full text-center">
        ₹{Number(gold.gold24K).toLocaleString()}
      </div>

      <div className="text-xs text-gray-500 truncate w-full text-center">
        Gold (24K)
      </div>
    </div>
  );
}