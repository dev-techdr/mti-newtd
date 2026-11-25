import fs from "node:fs";
import path from "node:path";
import { waveCountries } from "../data/patients/catalog";
import { eMedicalFeeChecked, eMedicalFeeSource, visaFromFee } from "../data/patients/e-medical-fees";
import { indiaFares } from "../data/patients/india-fares";

const hubs = ["nigeria", "kenya", "ethiopia", "tanzania", "bangladesh", "iraq", "oman", "yemen", "uzbekistan", "afghanistan"];
const extra = ["somalia", "malawi", "nepal", "sri-lanka", "maldives", "myanmar", "mauritius", "mongolia", "fiji", "azerbaijan"];
const allowed = new Set(["English", "Arabic", "French", "Russian", "Bengali", "Hindi"]);
const faq = "https://medicaltourism.techdr.in/faq";
const dir = path.join(process.cwd(), "data/patients/countries");

const identity: Record<string, { demonym: string; region: string }> = {
  algeria: { demonym: "Algerian", region: "North Africa" },
  angola: { demonym: "Angolan", region: "Southern Africa" },
  austria: { demonym: "Austrian", region: "Europe" },
  azerbaijan: { demonym: "Azerbaijani", region: "Caucasus" },
  bahrain: { demonym: "Bahraini", region: "Gulf" },
  belgium: { demonym: "Belgian", region: "Europe" },
  botswana: { demonym: "Motswana", region: "Southern Africa" },
  bulgaria: { demonym: "Bulgarian", region: "Europe" },
  cameroon: { demonym: "Cameroonian", region: "Central Africa" },
  "central-african-republic": { demonym: "Central African", region: "Central Africa" },
  chad: { demonym: "Chadian", region: "Central Africa" },
  czechia: { demonym: "Czech", region: "Europe" },
  denmark: { demonym: "Danish", region: "Europe" },
  "dr-congo": { demonym: "Congolese", region: "Central Africa" },
  egypt: { demonym: "Egyptian", region: "North Africa" },
  fiji: { demonym: "Fijian", region: "Pacific" },
  finland: { demonym: "Finnish", region: "Europe" },
  france: { demonym: "French", region: "Europe" },
  germany: { demonym: "German", region: "Europe" },
  ghana: { demonym: "Ghanaian", region: "West Africa" },
  greece: { demonym: "Greek", region: "Europe" },
  hungary: { demonym: "Hungarian", region: "Europe" },
  ireland: { demonym: "Irish", region: "Europe" },
  italy: { demonym: "Italian", region: "Europe" },
  "ivory-coast": { demonym: "Ivorian", region: "West Africa" },
  kazakhstan: { demonym: "Kazakhstani", region: "Central Asia" },
  kuwait: { demonym: "Kuwaiti", region: "Gulf" },
  kyrgyzstan: { demonym: "Kyrgyz", region: "Central Asia" },
  madagascar: { demonym: "Malagasy", region: "East Africa" },
  malawi: { demonym: "Malawian", region: "Southern Africa" },
  maldives: { demonym: "Maldivian", region: "Indian Ocean" },
  mauritius: { demonym: "Mauritian", region: "Indian Ocean" },
  mongolia: { demonym: "Mongolian", region: "East Asia" },
  mozambique: { demonym: "Mozambican", region: "Southern Africa" },
  myanmar: { demonym: "Myanmar", region: "Southeast Asia" },
  namibia: { demonym: "Namibian", region: "Southern Africa" },
  nepal: { demonym: "Nepali", region: "South Asia" },
  netherlands: { demonym: "Dutch", region: "Europe" },
  norway: { demonym: "Norwegian", region: "Europe" },
  poland: { demonym: "Polish", region: "Europe" },
  portugal: { demonym: "Portuguese", region: "Europe" },
  qatar: { demonym: "Qatari", region: "Gulf" },
  romania: { demonym: "Romanian", region: "Europe" },
  rwanda: { demonym: "Rwandan", region: "East Africa" },
  "saudi-arabia": { demonym: "Saudi", region: "Gulf" },
  senegal: { demonym: "Senegalese", region: "West Africa" },
  seychelles: { demonym: "Seychellois", region: "Indian Ocean" },
  somalia: { demonym: "Somali", region: "East Africa" },
  "south-africa": { demonym: "South African", region: "Southern Africa" },
  spain: { demonym: "Spanish", region: "Europe" },
  "sri-lanka": { demonym: "Sri Lankan", region: "South Asia" },
  sudan: { demonym: "Sudanese", region: "North Africa" },
  sweden: { demonym: "Swedish", region: "Europe" },
  switzerland: { demonym: "Swiss", region: "Europe" },
  tajikistan: { demonym: "Tajik", region: "Central Asia" },
  turkmenistan: { demonym: "Turkmen", region: "Central Asia" },
  uae: { demonym: "Emirati", region: "Gulf" },
  uganda: { demonym: "Ugandan", region: "East Africa" },
  uk: { demonym: "British", region: "Europe" },
  zambia: { demonym: "Zambian", region: "Southern Africa" },
  zimbabwe: { demonym: "Zimbabwean", region: "Southern Africa" },
};

const slugs = [...new Set([...hubs, ...indiaFares.map((fare) => fare.slug), ...extra])];

function blank(slug: string) {
  const catalog = waveCountries.find((item) => item.slug === slug);
  const named = identity[slug];
  if (!catalog || !named) throw new Error(`No identity for ${slug}`);
  const visa = visaFromFee(slug);
  if (!visa) throw new Error(`No fee row for ${slug}`);
  return {
    slug,
    name: catalog.name,
    demonym: named.demonym,
    region: named.region,
    wave: catalog.wave,
    status: "needs-human-check",
    languages: [],
    techdrLanguageSupport: ["English"],
    currency: null,
    fxRateToUSD: { value: null, asOf: null, source: null },
    visa,
    travel: { airports: [], routesToIndia: [], lastChecked: null },
    money: { paymentMethods: [], notes: null },
    localCareContext: { commonReasonsPatientsTravel: [], followUpAtHome: null },
    cultural: { foodNotes: null, prayerFacilities: null, otherNotes: null },
    techdrContact: { whatsapp: null, localRepresentative: null, hours: null },
    embassy: null,
    citations: [{ field: "techdrLanguages", source: faq, lastChecked: eMedicalFeeChecked }],
    soughtTreatments: [],
    localCosts: {},
    caseData: { patientsGuided: null, period: null },
    uniqueContent: null,
    faqs: [],
    translatedTo: [],
    reviewed: { by: null, date: null },
  };
}

function withLanguageCitation(citations: { field: string; source: string; lastChecked: string }[], support: string[]) {
  const rest = citations.filter((item) => item.field !== "techdrLanguages");
  if (!support.length) return rest;
  return [...rest, { field: "techdrLanguages", source: faq, lastChecked: eMedicalFeeChecked }];
}

for (const slug of slugs) {
  const file = path.join(dir, `${slug}.json`);
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, `${JSON.stringify(blank(slug), null, 2)}\n`);
    continue;
  }
  const existing = JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, unknown>;
  const support = Array.isArray(existing.techdrLanguageSupport)
    ? (existing.techdrLanguageSupport as string[]).filter((language) => allowed.has(language))
    : [];
  const visa = visaFromFee(slug);
  const currentVisa = (existing.visa ?? {}) as { source?: string | null };
  const replaceVisa = !currentVisa.source || currentVisa.source === eMedicalFeeSource;
  const citations = Array.isArray(existing.citations) ? (existing.citations as { field: string; source: string; lastChecked: string }[]) : [];
  const next = {
    ...existing,
    status: existing.status === "verified" ? "verified" : "needs-human-check",
    techdrLanguageSupport: support,
    visa: replaceVisa && visa ? { ...(existing.visa as object), ...visa } : existing.visa,
    citations: withLanguageCitation(citations, support),
    embassy: existing.embassy ?? null,
    soughtTreatments: existing.soughtTreatments ?? [],
  };
  fs.writeFileSync(file, `${JSON.stringify(next, null, 2)}\n`);
}

const imports = slugs.map((slug) => `import ${slug.replace(/-/g, "_")} from "./${slug}.json";`).join("\n");
const names = slugs.map((slug) => slug.replace(/-/g, "_")).join(", ");
const barrel = `${imports}\n\nexport const countryRecords = [${names}];\n`;
fs.writeFileSync(path.join(dir, "index.ts"), barrel);
console.log(`wrote ${slugs.length} country records`);
