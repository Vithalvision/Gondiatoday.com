import { prisma } from "@/lib/prisma";

type AdSlotProps = {
  type: "header" | "sidebar" | "infeed" | "footer";
  id?: string;
};

const adSizes = {
  header: {
    width: "max-w-[970px]",
    height: "h-[90px]",
    label: "970 × 90 Header Banner",
  },
  sidebar: {
    width: "max-w-[300px]",
    height: "h-[600px]",
    label: "300 × 600 Sidebar",
  },
  infeed: {
    width: "max-w-[728px]",
    height: "h-[90px]",
    label: "728 × 90 In-feed Banner",
  },
  footer: {
    width: "max-w-[970px]",
    height: "h-[90px]",
    label: "970 × 90 Footer Banner",
  },
};

export default async function AdSlot({ type, id }: AdSlotProps) {
  const config = adSizes[type];

  let ad = null;
  try {
    ad = await prisma.advertisement.findFirst({
      where: {
        slotType: type,
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (err) {
    console.error("Failed to load ad slot:", err);
  }

  return (
    <div
      className="w-full flex justify-center my-6 notranslate"
      translate="no"
    >
      {ad ? (
        <a href={ad.targetUrl} target="_blank" rel="noreferrer" className="block w-full text-center">
          <img 
            src={ad.imageUrl} 
            alt={`Advertisement ${type}`} 
            className={`w-full ${config.width} ${config.height} object-cover rounded-lg mx-auto`} 
          />
        </a>
      ) : (
        <div
          id={id || `ad-${type}`}
          className={`w-full ${config.width} ${config.height} border-2 border-dashed border-yellow-400 bg-yellow-50 rounded-lg flex flex-col items-center justify-center`}
        >
          <span className="text-xs uppercase tracking-wider text-gray-500">
            Advertisement
          </span>

          <span className="mt-1 text-base font-semibold text-gray-700">
            {config.label}
          </span>

          <span className="mt-1 text-xs text-gray-400 text-center px-4">
            Reserved for promotional ads. For advertisement contact news@gondiatoday.com
          </span>
        </div>
      )}
    </div>
  );
}