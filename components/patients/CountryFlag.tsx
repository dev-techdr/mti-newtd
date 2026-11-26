import { countryIso } from "@/data/country-iso";

export function CountryFlag({ slug }: { slug: string }) {
  const iso = countryIso[slug];
  if (!iso) return null;
  return (
    <img
      src={`/flags/${iso}.svg`}
      alt=""
      width={56}
      height={42}
      className="h-10 w-14 shrink-0 rounded-md object-contain ring-1 ring-border"
    />
  );
}
