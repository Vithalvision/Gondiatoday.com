async function getHoroscope(sign: string) {
  const res = await fetch(
    `http://localhost:3000/api/horoscope?sign=${sign}`,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function Page({
  params,
}: {
  params: { sign: string };
}) {
  const data = await getHoroscope(params.sign);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold capitalize mb-4">
        {params.sign} Horoscope
      </h1>

      <p className="text-lg leading-8">
        {data.horoscope}
      </p>
    </main>
  );
}