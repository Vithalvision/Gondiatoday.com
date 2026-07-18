import Link from "next/link";

const signs = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

export default function HoroscopePage() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Today&apos;s Horoscope</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {signs.map((sign) => (
          <Link
            key={sign}
            href={`/horoscope/${sign}`}
            className="border rounded-lg p-4 text-center capitalize hover:bg-gray-100"
          >
            {sign}
          </Link>
        ))}
      </div>
    </main>
  );
}