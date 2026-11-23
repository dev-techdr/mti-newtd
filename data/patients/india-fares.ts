/** Economy starting fares to India, primarily Mumbai or New Delhi. Figures are the ones supplied from Skyscanner. */

export type IndiaFare = {
  slug: string;
  name: string;
  oneWayFromINR: number | null;
  oneWayToINR?: number | null;
  /** True when the source wrote a plus after the one-way figure. */
  oneWayPlus?: boolean;
  returnFromINR: number | null;
  returnToINR?: number | null;
  returnPlus?: boolean;
  /** Used when the source gave one lowest fare and did not say one-way or return. */
  lowestAroundINR: number | null;
  airlines: string | null;
  arrivals?: string;
  source?: string;
};

export const indiaFareSource =
  "Recent economy benchmarks to India, primarily Mumbai or New Delhi, sourced from Skyscanner. A listed fare is a starting benchmark, not a ticket TechDr sells.";

const gccSource =
  "Typical economy fares to Mumbai, New Delhi, Hyderabad, Kochi, and Bengaluru. A listed fare is a starting benchmark, not a ticket TechDr sells.";
const centralAsiaSource =
  "Benchmark economy fares sourced from Skyscanner for New Delhi, Mumbai, and Hyderabad. A listed fare is a starting benchmark, not a ticket TechDr sells.";
const europeSource =
  "Benchmark economy fares sourced from Skyscanner and KAYAK for New Delhi, Mumbai, Bengaluru, and Hyderabad. A listed fare is a starting benchmark, not a ticket TechDr sells.";
const europeArrivals = "New Delhi, Mumbai, Bengaluru, and Hyderabad";

function europeFare(slug: string, name: string, region: string, airlines: string, oneMin: number, oneMax: number, returnMin: number, returnMax: number): IndiaFare {
  return {
    slug,
    name,
    oneWayFromINR: oneMin,
    oneWayToINR: oneMax,
    returnFromINR: returnMin,
    returnToINR: returnMax,
    lowestAroundINR: null,
    airlines: `${region} benchmark. ${airlines}`,
    arrivals: europeArrivals,
    source: europeSource,
  };
}

const westernNote = "Nonstop options via Air India, Lufthansa, British Airways, Air France, and KLM; budget 1-stops via IndiGo, Etihad, and Azerbaijan Airlines";
const southernNote = "Nonstop from Rome and Milan on Air India and ITA Airways, and from Athens on IndiGo; 1 stop via Pegasus and Gulf carriers";
const easternNote = "Nonstop from Warsaw on LOT Polish Airlines; 1 stop via Wizz Air, Pegasus, Turkish Airlines, and Gulf carriers";
const northernNote = "Nonstop from Helsinki on Finnair and from Copenhagen on SAS and Air India; 1 stop via Pegasus, Emirates, and Qatar Airways";

export const indiaFares: IndiaFare[] = [
  { slug: "rwanda", name: "Rwanda", oneWayFromINR: 16758, returnFromINR: 42575, lowestAroundINR: null, airlines: null },
  { slug: "tanzania", name: "Tanzania", oneWayFromINR: 18721, returnFromINR: 34151, lowestAroundINR: null, airlines: "Nonstop options on IndiGo and Air Tanzania" },
  { slug: "egypt", name: "Egypt", oneWayFromINR: 20649, returnFromINR: null, lowestAroundINR: null, airlines: "Nonstop options on EgyptAir and Air India" },
  { slug: "seychelles", name: "Seychelles", oneWayFromINR: 21192, returnFromINR: 39409, lowestAroundINR: null, airlines: "Nonstop to Mumbai on IndiGo" },
  { slug: "ethiopia", name: "Ethiopia", oneWayFromINR: 21913, returnFromINR: null, lowestAroundINR: null, airlines: "Nonstop options on Ethiopian Airlines and Air India" },
  { slug: "kenya", name: "Kenya", oneWayFromINR: 23030, returnFromINR: 41136, lowestAroundINR: null, airlines: "Nonstop options on IndiGo, Kenya Airways, and Air India" },
  { slug: "algeria", name: "Algeria", oneWayFromINR: 25480, returnFromINR: 52185, lowestAroundINR: null, airlines: null },
  { slug: "south-africa", name: "South Africa", oneWayFromINR: 28410, returnFromINR: 49693, lowestAroundINR: null, airlines: null },
  { slug: "uganda", name: "Uganda", oneWayFromINR: 28813, returnFromINR: 48040, lowestAroundINR: null, airlines: null },
  { slug: "zimbabwe", name: "Zimbabwe", oneWayFromINR: 29600, returnFromINR: 43052, lowestAroundINR: null, airlines: null },
  { slug: "sudan", name: "Sudan", oneWayFromINR: 32537, returnFromINR: 65681, lowestAroundINR: null, airlines: null },
  { slug: "zambia", name: "Zambia", oneWayFromINR: 34255, returnFromINR: 49950, lowestAroundINR: null, airlines: null },
  { slug: "nigeria", name: "Nigeria", oneWayFromINR: 38432, returnFromINR: 59503, lowestAroundINR: null, airlines: null },
  { slug: "namibia", name: "Namibia", oneWayFromINR: 40518, returnFromINR: 88464, lowestAroundINR: null, airlines: null },
  { slug: "dr-congo", name: "DR Congo", oneWayFromINR: 40714, returnFromINR: 62338, lowestAroundINR: null, airlines: null },
  { slug: "ghana", name: "Ghana", oneWayFromINR: 43849, returnFromINR: 69881, lowestAroundINR: null, airlines: null },
  { slug: "madagascar", name: "Madagascar", oneWayFromINR: 44024, returnFromINR: 59959, lowestAroundINR: null, airlines: null },
  { slug: "mozambique", name: "Mozambique", oneWayFromINR: 47336, returnFromINR: 78340, lowestAroundINR: null, airlines: null },
  { slug: "angola", name: "Angola", oneWayFromINR: 48671, returnFromINR: 83265, lowestAroundINR: null, airlines: null },
  { slug: "cameroon", name: "Cameroon", oneWayFromINR: 55896, returnFromINR: 91407, lowestAroundINR: null, airlines: null },
  { slug: "senegal", name: "Senegal", oneWayFromINR: null, returnFromINR: null, lowestAroundINR: 71766, airlines: null },
  { slug: "botswana", name: "Botswana", oneWayFromINR: null, returnFromINR: null, lowestAroundINR: 76662, airlines: null },
  { slug: "ivory-coast", name: "Ivory Coast", oneWayFromINR: 77939, returnFromINR: null, lowestAroundINR: null, airlines: null },
  { slug: "chad", name: "Chad", oneWayFromINR: null, returnFromINR: null, lowestAroundINR: 95339, airlines: null },
  { slug: "central-african-republic", name: "Central African Republic", oneWayFromINR: null, returnFromINR: null, lowestAroundINR: 106313, airlines: null },
  { slug: "uae", name: "United Arab Emirates", oneWayFromINR: 3369, oneWayToINR: 11005, returnFromINR: 20611, returnToINR: 24808, lowestAroundINR: null, airlines: "Nonstop from Dubai, Sharjah, and Abu Dhabi (about 3.5 hours) on Air India Express, IndiGo, Air Arabia, and Emirates", arrivals: "Mumbai, New Delhi, Hyderabad, Kochi, and Bengaluru", source: gccSource },
  { slug: "saudi-arabia", name: "Saudi Arabia", oneWayFromINR: 8761, oneWayToINR: 20875, returnFromINR: 20963, returnToINR: 26164, lowestAroundINR: null, airlines: "Nonstop from Riyadh, Jeddah, and Dammam (about 4.5 hours) on Saudia, Air India Express, and IndiGo", arrivals: "Mumbai, New Delhi, Hyderabad, Kochi, and Bengaluru", source: gccSource },
  { slug: "kuwait", name: "Kuwait", oneWayFromINR: 10590, oneWayToINR: 12821, returnFromINR: 16800, returnPlus: true, lowestAroundINR: null, airlines: "Nonstop on Jazeera Airways, Kuwait Airways, and Air India Express", arrivals: "Mumbai, New Delhi, Hyderabad, Kochi, and Bengaluru", source: gccSource },
  { slug: "oman", name: "Oman", oneWayFromINR: 7500, oneWayToINR: 11500, returnFromINR: 17500, returnToINR: 23000, lowestAroundINR: null, airlines: "Nonstop from Muscat on SalamAir, Oman Air, and IndiGo", arrivals: "Mumbai, New Delhi, Hyderabad, Kochi, and Bengaluru", source: gccSource },
  { slug: "bahrain", name: "Bahrain", oneWayFromINR: 9000, oneWayToINR: 13000, returnFromINR: 19000, returnToINR: 25000, lowestAroundINR: null, airlines: "Nonstop from Manama on Gulf Air and Air India Express", arrivals: "Mumbai, New Delhi, Hyderabad, Kochi, and Bengaluru", source: gccSource },
  { slug: "qatar", name: "Qatar", oneWayFromINR: 11000, oneWayToINR: 15000, returnFromINR: 22000, returnToINR: 29000, lowestAroundINR: null, airlines: "Nonstop from Doha on Qatar Airways, IndiGo, and Air India", arrivals: "Mumbai, New Delhi, Hyderabad, Kochi, and Bengaluru", source: gccSource },
  { slug: "yemen", name: "Yemen", oneWayFromINR: 35000, oneWayToINR: 55000, oneWayPlus: true, returnFromINR: 65000, returnToINR: 95000, returnPlus: true, lowestAroundINR: null, airlines: "Limited commercial schedules; usually requires 1–2 stops", arrivals: "Mumbai, New Delhi, Hyderabad, Kochi, and Bengaluru", source: gccSource },
  { slug: "uzbekistan", name: "Uzbekistan", oneWayFromINR: 8952, oneWayToINR: 11462, returnFromINR: 20675, returnToINR: 25808, lowestAroundINR: null, airlines: "Tashkent (TAS). Nonstop to Delhi and Hyderabad on Uzbekistan Airways, Centrum Air, and IndiGo", arrivals: "New Delhi, Mumbai, and Hyderabad", source: centralAsiaSource },
  { slug: "kazakhstan", name: "Kazakhstan", oneWayFromINR: 13377, oneWayToINR: 19495, returnFromINR: 36293, returnToINR: 44326, lowestAroundINR: null, airlines: "Almaty (ALA) and Astana (NQZ). Nonstop from Almaty on Air Astana, IndiGo, and Air India", arrivals: "New Delhi, Mumbai, and Hyderabad", source: centralAsiaSource },
  { slug: "kyrgyzstan", name: "Kyrgyzstan", oneWayFromINR: 13979, oneWayPlus: true, returnFromINR: 34414, returnPlus: true, lowestAroundINR: null, airlines: "Bishkek (FRU) and Osh (OSS). Nonstop to Delhi on Aero Nomad; 1 stop via Uzbekistan Airways", arrivals: "New Delhi, Mumbai, and Hyderabad", source: centralAsiaSource },
  { slug: "tajikistan", name: "Tajikistan", oneWayFromINR: 19829, oneWayPlus: true, returnFromINR: 43955, returnPlus: true, lowestAroundINR: null, airlines: "Dushanbe (DYU). Nonstop to Delhi on Somon Air; 1 stop via Air Astana or flydubai", arrivals: "New Delhi, Mumbai, and Hyderabad", source: centralAsiaSource },
  { slug: "turkmenistan", name: "Turkmenistan", oneWayFromINR: 36564, oneWayPlus: true, returnFromINR: 65900, returnPlus: true, lowestAroundINR: null, airlines: "Ashgabat (ASB). Nonstop to Delhi on Turkmenistan Airlines; 1 stop via flydubai", arrivals: "New Delhi, Mumbai, and Hyderabad", source: centralAsiaSource },
  europeFare("uk", "United Kingdom", "Western Europe", westernNote, 20100, 26100, 35500, 45500),
  europeFare("germany", "Germany", "Western Europe", westernNote, 20100, 26100, 35500, 45500),
  europeFare("france", "France", "Western Europe", westernNote, 20100, 26100, 35500, 45500),
  europeFare("netherlands", "Netherlands", "Western Europe", westernNote, 20100, 26100, 35500, 45500),
  europeFare("belgium", "Belgium", "Western Europe", westernNote, 20100, 26100, 35500, 45500),
  europeFare("switzerland", "Switzerland", "Western Europe", westernNote, 20100, 26100, 35500, 45500),
  europeFare("austria", "Austria", "Western Europe", westernNote, 20100, 26100, 35500, 45500),
  europeFare("italy", "Italy", "Southern Europe", southernNote, 21000, 27800, 41500, 50700),
  europeFare("spain", "Spain", "Southern Europe", southernNote, 21000, 27800, 41500, 50700),
  europeFare("greece", "Greece", "Southern Europe", southernNote, 21000, 27800, 41500, 50700),
  europeFare("portugal", "Portugal", "Southern Europe", southernNote, 21000, 27800, 41500, 50700),
  europeFare("poland", "Poland", "Central and Eastern Europe", easternNote, 21000, 24500, 41500, 46000),
  europeFare("romania", "Romania", "Central and Eastern Europe", easternNote, 21000, 24500, 41500, 46000),
  europeFare("hungary", "Hungary", "Central and Eastern Europe", easternNote, 21000, 24500, 41500, 46000),
  europeFare("czechia", "Czechia", "Central and Eastern Europe", easternNote, 21000, 24500, 41500, 46000),
  europeFare("bulgaria", "Bulgaria", "Central and Eastern Europe", easternNote, 21000, 24500, 41500, 46000),
  europeFare("sweden", "Sweden", "Northern Europe", northernNote, 23500, 26600, 38500, 45600),
  europeFare("norway", "Norway", "Northern Europe", northernNote, 23500, 26600, 38500, 45600),
  europeFare("denmark", "Denmark", "Northern Europe", northernNote, 23500, 26600, 38500, 45600),
  europeFare("finland", "Finland", "Northern Europe", northernNote, 23500, 26600, 38500, 45600),
  europeFare("ireland", "Ireland", "Northern Europe", northernNote, 23500, 26600, 38500, 45600),
];

const bySlug = new Map(indiaFares.map((item) => [item.slug, item]));

export function indiaFareFor(slug: string) {
  return bySlug.get(slug);
}

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

export function fareSource(fare: IndiaFare) {
  return fare.source ?? indiaFareSource;
}

export function inrBand(min: number, max?: number | null, plus?: boolean) {
  const end = plus ? "+" : "";
  if (max == null) return `${formatInr(min)}${end}`;
  return `${formatInr(min)} – ${formatInr(max)}${end}`;
}

export function oneWayLabel(fare: IndiaFare) {
  if (fare.oneWayFromINR == null) return fare.lowestAroundINR ? `Lowest around ${formatInr(fare.lowestAroundINR)}` : "—";
  return inrBand(fare.oneWayFromINR, fare.oneWayToINR, fare.oneWayPlus);
}

export function returnLabel(fare: IndiaFare) {
  if (fare.returnFromINR == null) return "—";
  return inrBand(fare.returnFromINR, fare.returnToINR, fare.returnPlus);
}
