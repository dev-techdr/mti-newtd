export type DestinationCity = { slug: string; name: string };

export type Destination = {
  slug: string;
  name: string;
  /** True only where TechDr has signed partners. India is the coordinated destination today. */
  active: boolean;
  partnerSpecialties: string[];
  cities: DestinationCity[];
  currency: string;
  languages: string[];
  accreditationLandscape: string | null;
  regulation: {
    ivf: string | null;
    surrogacy: string | null;
    organTransplantForeigners: string | null;
    stemCell: string | null;
  };
  visa: { notes: string | null; officialUrl: string | null; lastChecked: string | null };
  climateBestMonths: string | null;
  /** Sourced narrative. Empty stays off the sitemap. */
  uniqueContent: string | null;
  sources: { href: string; label: string }[];
  reviewed: { by: string | null; date: string | null };
};

const emptyRegulation = {
  ivf: null,
  surrogacy: null,
  organTransplantForeigners: null,
  stemCell: null,
};

function destination(input: {
  slug: string;
  name: string;
  active?: boolean;
  currency: string;
  languages: string[];
  cities: DestinationCity[];
}): Destination {
  return {
    ...input,
    active: input.active ?? false,
    partnerSpecialties: [],
    accreditationLandscape: null,
    regulation: emptyRegulation,
    visa: { notes: null, officialUrl: null, lastChecked: null },
    climateBestMonths: null,
    uniqueContent: null,
    sources: [],
    reviewed: { by: null, date: null },
  };
}

/** Iran is omitted. Sanctions and payment risk stay closed unless legal advice says otherwise. */
export const destinations: Destination[] = [
  destination({
    slug: "india",
    name: "India",
    active: true,
    currency: "INR",
    languages: ["English", "Hindi"],
    cities: [
      { slug: "delhi", name: "Delhi" },
      { slug: "mumbai", name: "Mumbai" },
      { slug: "chennai", name: "Chennai" },
      { slug: "hyderabad", name: "Hyderabad" },
      { slug: "bengaluru", name: "Bengaluru" },
      { slug: "kolkata", name: "Kolkata" },
    ],
  }),
  destination({
    slug: "turkey",
    name: "Turkey",
    currency: "TRY",
    languages: ["Turkish"],
    cities: [
      { slug: "istanbul", name: "Istanbul" },
      { slug: "ankara", name: "Ankara" },
      { slug: "antalya", name: "Antalya" },
      { slug: "izmir", name: "Izmir" },
    ],
  }),
  destination({
    slug: "thailand",
    name: "Thailand",
    currency: "THB",
    languages: ["Thai"],
    cities: [
      { slug: "bangkok", name: "Bangkok" },
      { slug: "phuket", name: "Phuket" },
      { slug: "chiang-mai", name: "Chiang Mai" },
    ],
  }),
  destination({
    slug: "uae",
    name: "United Arab Emirates",
    currency: "AED",
    languages: ["Arabic", "English"],
    cities: [
      { slug: "dubai", name: "Dubai" },
      { slug: "abu-dhabi", name: "Abu Dhabi" },
    ],
  }),
  destination({
    slug: "malaysia",
    name: "Malaysia",
    currency: "MYR",
    languages: ["Malay", "English"],
    cities: [
      { slug: "kuala-lumpur", name: "Kuala Lumpur" },
      { slug: "penang", name: "Penang" },
    ],
  }),
  destination({
    slug: "singapore",
    name: "Singapore",
    currency: "SGD",
    languages: ["English", "Malay", "Mandarin", "Tamil"],
    cities: [{ slug: "singapore", name: "Singapore" }],
  }),
  destination({
    slug: "south-korea",
    name: "South Korea",
    currency: "KRW",
    languages: ["Korean"],
    cities: [
      { slug: "seoul", name: "Seoul" },
      { slug: "busan", name: "Busan" },
    ],
  }),
  destination({
    slug: "germany",
    name: "Germany",
    currency: "EUR",
    languages: ["German"],
    cities: [
      { slug: "berlin", name: "Berlin" },
      { slug: "munich", name: "Munich" },
      { slug: "hamburg", name: "Hamburg" },
    ],
  }),
  destination({
    slug: "spain",
    name: "Spain",
    currency: "EUR",
    languages: ["Spanish"],
    cities: [
      { slug: "madrid", name: "Madrid" },
      { slug: "barcelona", name: "Barcelona" },
    ],
  }),
  destination({
    slug: "mexico",
    name: "Mexico",
    currency: "MXN",
    languages: ["Spanish"],
    cities: [
      { slug: "mexico-city", name: "Mexico City" },
      { slug: "guadalajara", name: "Guadalajara" },
      { slug: "cancun", name: "Cancún" },
    ],
  }),
  destination({
    slug: "costa-rica",
    name: "Costa Rica",
    currency: "CRC",
    languages: ["Spanish"],
    cities: [{ slug: "san-jose", name: "San José" }],
  }),
  destination({
    slug: "colombia",
    name: "Colombia",
    currency: "COP",
    languages: ["Spanish"],
    cities: [
      { slug: "bogota", name: "Bogotá" },
      { slug: "medellin", name: "Medellín" },
    ],
  }),
  destination({
    slug: "poland",
    name: "Poland",
    currency: "PLN",
    languages: ["Polish"],
    cities: [
      { slug: "warsaw", name: "Warsaw" },
      { slug: "krakow", name: "Kraków" },
    ],
  }),
  destination({
    slug: "hungary",
    name: "Hungary",
    currency: "HUF",
    languages: ["Hungarian"],
    cities: [{ slug: "budapest", name: "Budapest" }],
  }),
  destination({
    slug: "czech-republic",
    name: "Czech Republic",
    currency: "CZK",
    languages: ["Czech"],
    cities: [{ slug: "prague", name: "Prague" }],
  }),
  destination({
    slug: "greece",
    name: "Greece",
    currency: "EUR",
    languages: ["Greek"],
    cities: [{ slug: "athens", name: "Athens" }],
  }),
  destination({
    slug: "israel",
    name: "Israel",
    currency: "ILS",
    languages: ["Hebrew", "Arabic"],
    cities: [{ slug: "tel-aviv", name: "Tel Aviv" }],
  }),
  destination({
    slug: "japan",
    name: "Japan",
    currency: "JPY",
    languages: ["Japanese"],
    cities: [
      { slug: "tokyo", name: "Tokyo" },
      { slug: "osaka", name: "Osaka" },
    ],
  }),
  destination({
    slug: "taiwan",
    name: "Taiwan",
    currency: "TWD",
    languages: ["Mandarin"],
    cities: [{ slug: "taipei", name: "Taipei" }],
  }),
  destination({
    slug: "egypt",
    name: "Egypt",
    currency: "EGP",
    languages: ["Arabic"],
    cities: [
      { slug: "cairo", name: "Cairo" },
      { slug: "alexandria", name: "Alexandria" },
    ],
  }),
];

const bySlug = new Map(destinations.map((item) => [item.slug, item]));

export function getDestination(slug: string) {
  return bySlug.get(slug);
}

export function activeDestinations() {
  return destinations.filter((item) => item.active);
}

/** India keeps its existing URLs. New /countries/india paths redirect there. */
export function destinationHref(item: Pick<Destination, "slug">) {
  if (item.slug === "india") return "/why-india";
  return `/countries/${item.slug}`;
}

export function destinationVisaHref(item: Pick<Destination, "slug">) {
  if (item.slug === "india") return "/medical-visa-india";
  return `/countries/${item.slug}/visa-and-travel`;
}

export function destinationGaps(item: Destination) {
  const gaps: string[] = [];
  if (!item.accreditationLandscape) gaps.push("accreditationLandscape");
  if (!item.visa.officialUrl) gaps.push("visa.officialUrl");
  if (!item.visa.lastChecked) gaps.push("visa.lastChecked");
  if (!item.visa.notes) gaps.push("visa.notes");
  if (!item.climateBestMonths) gaps.push("climateBestMonths");
  if (!item.uniqueContent || item.uniqueContent.trim().split(/\s+/).length < 300) gaps.push("uniqueContent (300 words)");
  if (!item.sources.length) gaps.push("sources");
  if (!item.reviewed.by) gaps.push("reviewed.by");
  if (!item.reviewed.date) gaps.push("reviewed.date");
  for (const [key, value] of Object.entries(item.regulation)) {
    if (!value) gaps.push(`regulation.${key}`);
  }
  return gaps;
}

/** Information pages can be indexed only when the sourced fields exist. Active only unlocks quote wording. */
export function destinationIndexable(item: Destination) {
  return destinationGaps(item).length === 0;
}

export const publishedDestinations = destinations.filter((item) => item.slug !== "india");
