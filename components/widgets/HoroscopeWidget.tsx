import Link from "next/link";
import { Stars } from "lucide-react";

export function HoroscopeWidget() {
  return (
    <Link
      href="/horoscope"
      className="rounded-lg border p-2 hover:bg-gray-50 transition h-20 w-full overflow-hidden flex flex-col items-center justify-center gap-0.5 text-center notranslate"
      translate="no"
    >
      <Stars className="text-purple-500" size={18} />

      <span className="text-xs font-semibold truncate w-full text-center block">
        Horoscope
      </span>

      <span className="text-[10px] text-gray-500 truncate w-full text-center block">
        Today&apos;s Prediction
      </span>
    </Link>
  );
}