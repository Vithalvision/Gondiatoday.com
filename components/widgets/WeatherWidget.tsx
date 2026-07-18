"use client";

import { useEffect, useState } from "react";

type WeatherData = {
  current: {
    temp_c: number;
    condition: {
      icon: string;
      text: string;
    };
  };
};

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const loadWeather = () => {
      fetch("/api/weather")
        .then((res) => res.json())
        .then(setWeather)
        .catch(console.error);
    };

    loadWeather();

    const interval = setInterval(loadWeather, 600000); // 10 minutes

    return () => clearInterval(interval);
  }, []);

  if (!weather) {
    return (
      <div
        className="h-20 rounded-lg border animate-pulse bg-gray-100 notranslate"
        translate="no"
      />
    );
  }

  return (
    <div
      className="rounded-lg border p-2 hover:bg-gray-50 transition text-center h-20 flex flex-col justify-center notranslate"
      translate="no"
    >
      <img
        src={`https:${weather.current.condition.icon}`}
        alt={weather.current.condition.text}
        className="mx-auto h-6 w-6"
      />

      <div className="text-sm font-bold truncate w-full text-center">
        {weather.current.temp_c}°
      </div>

      <div className="text-[10px] text-gray-500">
        Gondia
      </div>
    </div>
  );
}