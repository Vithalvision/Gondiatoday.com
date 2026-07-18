import { PlacesSection } from "@/components/home/placessection";
import { PincodeSection } from "@/components/home/pincodesection";

export default function HomeSections({
  places,
  pincodes,
}: any) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left */}
        <div className="bg-white border p-6">
          <PlacesSection places={places} />
        </div>

        {/* Middle */}
        <div>
          {/* Your category description/articles go here */}
        </div>

        {/* Right */}
        <div className="bg-white border p-6">
          <PincodeSection pincodes={pincodes} />
        </div>

      </div>

    </section>
  );
}