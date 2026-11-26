import { cities } from "@/data/cities";

export type RoutePlace = {
  slug: string;
  city: string;
  country: string;
  countrySlug: string;
  airport: string;
};

export type AssistanceRoute = {
  slug: string;
  direction: "to-india" | "from-india";
  confirmed: boolean;
  from: RoutePlace;
  to: RoutePlace;
  /** Extra paragraphs supplied for this city pair. Needed before the page can be indexed. */
  brief?: string;
  flightHours?: number;
  flightTimeSource?: string;
  aircraft?: string;
  fuelStops?: string;
  price?: { min: number; max: number; currency: "USD"; verified: true };
};

const origins: RoutePlace[] = [
  { slug: "dubai", city: "Dubai", country: "United Arab Emirates", countrySlug: "uae", airport: "Dubai International Airport (DXB)" },
  { slug: "abu-dhabi", city: "Abu Dhabi", country: "United Arab Emirates", countrySlug: "uae", airport: "Zayed International Airport (AUH)" },
  { slug: "muscat", city: "Muscat", country: "Oman", countrySlug: "oman", airport: "Muscat International Airport (MCT)" },
  { slug: "riyadh", city: "Riyadh", country: "Saudi Arabia", countrySlug: "saudi-arabia", airport: "King Khalid International Airport (RUH)" },
  { slug: "jeddah", city: "Jeddah", country: "Saudi Arabia", countrySlug: "saudi-arabia", airport: "King Abdulaziz International Airport (JED)" },
  { slug: "doha", city: "Doha", country: "Qatar", countrySlug: "qatar", airport: "Hamad International Airport (DOH)" },
  { slug: "kuwait", city: "Kuwait", country: "Kuwait", countrySlug: "kuwait", airport: "Kuwait International Airport (KWI)" },
  { slug: "dhaka", city: "Dhaka", country: "Bangladesh", countrySlug: "bangladesh", airport: "Hazrat Shahjalal International Airport (DAC)" },
  { slug: "kathmandu", city: "Kathmandu", country: "Nepal", countrySlug: "nepal", airport: "Tribhuvan International Airport (KTM)" },
  { slug: "colombo", city: "Colombo", country: "Sri Lanka", countrySlug: "sri-lanka", airport: "Bandaranaike International Airport (CMB)" },
  { slug: "male", city: "Malé", country: "Maldives", countrySlug: "maldives", airport: "Velana International Airport (MLE)" },
  { slug: "nairobi", city: "Nairobi", country: "Kenya", countrySlug: "kenya", airport: "Jomo Kenyatta International Airport (NBO)" },
  { slug: "dar-es-salaam", city: "Dar es Salaam", country: "Tanzania", countrySlug: "tanzania", airport: "Julius Nyerere International Airport (DAR)" },
  { slug: "addis-ababa", city: "Addis Ababa", country: "Ethiopia", countrySlug: "ethiopia", airport: "Addis Ababa Bole International Airport (ADD)" },
  { slug: "lagos", city: "Lagos", country: "Nigeria", countrySlug: "nigeria", airport: "Murtala Muhammed International Airport (LOS)" },
  { slug: "baghdad", city: "Baghdad", country: "Iraq", countrySlug: "iraq", airport: "Baghdad International Airport (BGW)" },
  { slug: "erbil", city: "Erbil", country: "Iraq", countrySlug: "iraq", airport: "Erbil International Airport (EBL)" },
  { slug: "tashkent", city: "Tashkent", country: "Uzbekistan", countrySlug: "uzbekistan", airport: "Islam Karimov Tashkent International Airport (TAS)" },
];

const indiaNames = ["Delhi", "Mumbai", "Chennai", "Hyderabad", "Bangalore"] as const;

const indiaCities: RoutePlace[] = indiaNames.map((name) => {
  const city = cities.find((item) => item.searchName === name);
  if (!city) throw new Error(`Missing Indian city ${name}`);
  return {
    slug: city.path,
    city: city.searchName,
    country: "India",
    countrySlug: "india",
    airport: city.airport,
  };
});

function pair(from: RoutePlace, to: RoutePlace, direction: AssistanceRoute["direction"]): AssistanceRoute {
  return {
    slug: `${from.slug}-to-${to.slug}`,
    direction,
    confirmed: false,
    from,
    to,
  };
}

export const assistanceRoutes: AssistanceRoute[] = [
  ...origins.flatMap((origin) => indiaCities.map((india) => pair(origin, india, "to-india"))),
  ...indiaCities.flatMap((india) => origins.map((origin) => pair(india, origin, "from-india"))),
];

const seen = new Set<string>();
for (const route of assistanceRoutes) {
  if (seen.has(route.slug)) throw new Error(`Duplicate assistance route ${route.slug}`);
  seen.add(route.slug);
}

export function confirmedRoutes() {
  return assistanceRoutes.filter((route) => route.confirmed);
}

export function getAssistanceRoute(slug: string) {
  return confirmedRoutes().find((route) => route.slug === slug);
}

export function routesForCountry(countrySlug: string) {
  return confirmedRoutes().filter(
    (route) => route.from.countrySlug === countrySlug || route.to.countrySlug === countrySlug,
  );
}

function sentences(text: string) {
  return text
    .toLowerCase()
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 40);
}

function normalize(route: AssistanceRoute, text: string) {
  const names = [route.from.city, route.to.city, route.from.country, route.to.country, route.from.airport, route.to.airport];
  let next = text.toLowerCase();
  for (const name of names) next = next.replaceAll(name.toLowerCase(), " ");
  return next;
}

export function routeBody(route: AssistanceRoute) {
  const direction =
    route.direction === "to-india"
      ? `This page is for a patient who needs a medical flight from ${route.from.city} to ${route.to.city} for treatment in India.`
      : `This page is for a patient returning from ${route.from.city} to ${route.to.city} after treatment, when a normal airline seat is not appropriate.`;
  const facts = [
    direction,
    `Departure airport: ${route.from.airport}. Arrival airport: ${route.to.airport}.`,
    route.flightHours && route.flightTimeSource
      ? `Approximate flight time is ${route.flightHours} hours (${route.flightTimeSource}). Winds, routing and a fuel stop can change it.`
      : "Flight time, aircraft type and any fuel stop are confirmed by the licensed operator in the written quote. They are not stated here until a sourced figure exists for this city pair.",
    route.aircraft ? `Typical aircraft for this request: ${route.aircraft}.` : "",
    route.fuelStops ? `Fuel stops: ${route.fuelStops}.` : "",
    `Permits for a medical flight leaving ${route.from.country} are the operator's responsibility. Families are usually asked for the passport, a current medical summary and a letter from the treating clinician. The operator confirms which papers ${route.from.country} requires for that departure.`,
    route.price?.verified
      ? `A verified planning range for this city pair is USD ${route.price.min}–${route.price.max}. It is not a booking until the operator confirms it in writing.`
      : "The flight is priced per case. It depends on distance, the aircraft, the medical team and the equipment.",
    route.brief ?? "",
  ];
  return facts.filter(Boolean).join(" ");
}

export function routeIsIndexable(route: AssistanceRoute) {
  if (!route.confirmed) return false;
  const mine = sentences(normalize(route, routeBody(route)));
  if (!mine.length) return false;
  const others = confirmedRoutes().filter((item) => item.slug !== route.slug);
  if (!others.length) return true;
  const shared = new Set(others.flatMap((item) => sentences(normalize(item, routeBody(item)))));
  const unique = mine.filter((item) => !shared.has(item)).length;
  return unique / mine.length >= 0.6;
}

export function indexableRoutes() {
  return confirmedRoutes().filter(routeIsIndexable);
}
