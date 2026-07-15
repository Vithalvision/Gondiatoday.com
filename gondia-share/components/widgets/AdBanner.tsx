"use client";

import { useEffect, useState } from "react";

export function AdBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-full my-6 flex justify-center notranslate"
        translate="no"
      >
        <div className="w-full max-w-5xl h-[90px] bg-gray-100 border border-dashed rounded-lg flex items-center justify-center text-gray-400 text-sm">
          Loading Ad...
        </div>
      </div>
    );
  }

  return (
   <div
      className="w-full my-6 flex justify-center notranslate"
      translate="no"
    >
      <div className="w-full max-w-5xl h-[90px] bg-gray-100 border border-dashed rounded-lg flex items-center justify-center text-gray-500 text-sm">
        Advertisement Space
      </div>
    </div>
  );
}