import Link from "next/link";

export interface Pincode {
  area: string;
  pin: string;
  slug?: string;
}

interface PincodeSectionProps {
  pincodes: Pincode[];
}

export function PincodeSection({ pincodes }: PincodeSectionProps) {
  return (
    <div>
      <div className="border-b-2 border-red-600 pb-2 mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          📮 Gondia Pincode
        </h3>
      </div>

      <div className="space-y-3">
        {pincodes.map((item) => (
          <Link
            key={item.pin}
            href={`/pincode/${item.slug ?? item.pin}`}
            className="block"
          >
            <div className="flex justify-between border-b border-gray-100 pb-2 text-sm cursor-pointer hover:bg-gray-50">
              <span className="font-semibold text-gray-700">
                {item.pin}
              </span>
              <span className="text-gray-600">
                {item.area}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}