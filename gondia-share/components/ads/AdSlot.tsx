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

export default function AdSlot({ type, id }: AdSlotProps) {
  const config = adSizes[type];

  return (
    <div
      className="w-full flex justify-center my-6 notranslate"
      translate="no"
    >
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

        <span className="mt-1 text-xs text-gray-400">
          Reserved for Google AdSense / Direct Ads
        </span>
      </div>
    </div>
  );
}