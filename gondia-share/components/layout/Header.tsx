import Link from "next/link";
import { SearchBar } from "@/components/widgets/SearchBar";
import { WeatherWidget } from "@/components/widgets/WeatherWidget";
import { GoldRateWidget } from "@/components/widgets/GoldRateWidget";
import { SilverRateWidget } from "@/components/widgets/SilverRateWidget";
import { HoroscopeWidget } from "@/components/widgets/HoroscopeWidget";
import Image from "next/image";
import AdSlot from "@/components/ads/AdSlot";

import {
  CalendarDays,
  User,
  Tv,
} from "lucide-react";

export function Header() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
   <header
      className="border-b border-gray-200 bg-white notranslate"
      translate="no"
    >
      {/* Main Header */}
      <div className="max-w-wrap mx-auto px-4 py-5">

        <div className="grid grid-cols-12 gap-4 items-center">

          {/* Logo */}
          <div className="col-span-12 lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.svg"
                alt="Gondia Today Logo"
                width={250}
                height={80}
                priority
                className="h-auto w-auto"
              />
            </Link>
          </div>

          {/* Search */}
          <div className="col-span-12 lg:col-span-5">
            <SearchBar />
          </div>

          {/* Right Side Widgets */}
          <div className="col-span-12 lg:col-span-5">
            <div className="grid grid-cols-4 gap-2">
              <WeatherWidget />
              <GoldRateWidget />
              <SilverRateWidget />
              <HoroscopeWidget />
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}