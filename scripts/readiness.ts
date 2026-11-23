import fs from "node:fs";
import path from "node:path";
import { assessCity, assessCountry, assessTreatment } from "../data/patients/assess";
import { marketTreatments, sourceCityCandidates, treatmentPool, unmappedTreatments, waveCountries } from "../data/patients/catalog";
import { getSourceCity, patientCountries } from "../data/patients/load";
import { answerGaps, loadAnswerFiles } from "../lib/answers";
import { computeApproved, uniquenessPercent } from "../lib/patient-readiness";
import { site } from "../lib/site";

type Row = {
  type: string;
  wave: string;
  url: string;
  built: boolean;
  indexable: boolean;
  isComplete: boolean;
  uniquenessPercent: string;
  fresh: boolean;
  words: string;
  missing: string;
};

function cell(value: string | number | boolean) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const approved = computeApproved();
const dataDir = path.join(process.cwd(), "data/patients");
fs.writeFileSync(path.join(dataDir, "indexable.json"), `${JSON.stringify(approved, null, 2)}\n`);

function installRoute(template: string, destination: string, enabled: boolean) {
  const abs = path.join(process.cwd(), destination);
  if (enabled) {
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.copyFileSync(path.join(process.cwd(), "lib/patient-route-templates", template), abs);
    return;
  }
  if (!fs.existsSync(abs)) return;
  const parked = path.join(process.cwd(), "recycle/patient-routes", destination);
  fs.mkdirSync(path.dirname(parked), { recursive: true });
  if (fs.existsSync(parked)) fs.renameSync(parked, `${parked}.previous`);
  fs.renameSync(abs, parked);
}

const childRoutes = approved.treatments.length + approved.cities.length > 0;
installRoute("country-child-page.tsx", "app/[locale]/(site)/patients-from/[country]/[slug]/page.tsx", childRoutes);
installRoute("answers-index-page.tsx", "app/[locale]/(site)/answers/page.tsx", approved.answers.length > 0);
installRoute("answer-page.tsx", "app/[locale]/(site)/answers/[question]/page.tsx", approved.answers.length > 0);

const rows: Row[] = [];

for (const record of patientCountries) {
  const assessment = assessCountry(record);
  const score = uniquenessPercent(`country:${record.slug}`);
  rows.push({
    type: "country",
    wave: String(record.wave),
    url: `/patients-from/${record.slug}`,
    built: true,
    indexable: approved.countries.includes(record.slug),
    isComplete: assessment.complete,
    uniquenessPercent: score === null ? "" : String(score),
    fresh: assessment.fresh,
    words: String(assessment.words),
    missing: assessment.gaps.join(" | "),
  });
  for (const treatment of marketTreatments) {
    const child = assessTreatment(record, treatment.slug);
    const key = `${record.slug}/${treatment.slug}`;
    const indexable = approved.treatments.includes(key);
    rows.push({
      type: "country-treatment",
      wave: String(record.wave),
      url: `/patients-from/${key}`,
      built: indexable,
      indexable,
      isComplete: child.complete,
      uniquenessPercent: "",
      fresh: child.fresh,
      words: "",
      missing: child.gaps.join(" | "),
    });
  }
}

for (const candidate of sourceCityCandidates) {
  const city = getSourceCity(candidate.country, candidate.slug);
  const key = `${candidate.country}/${candidate.slug}`;
  if (!city) {
    rows.push({
      type: "source-city",
      wave: String(candidate.wave),
      url: `/patients-from/${key}`,
      built: false,
      indexable: false,
      isComplete: false,
      uniquenessPercent: "",
      fresh: false,
      words: "0",
      missing: "no city record",
    });
    continue;
  }
  const assessment = assessCity(city);
  const indexable = approved.cities.includes(key);
  rows.push({
    type: "source-city",
    wave: String(candidate.wave),
    url: `/patients-from/${key}`,
    built: indexable,
    indexable,
    isComplete: assessment.complete,
    uniquenessPercent: "",
    fresh: assessment.fresh,
    words: String(assessment.words),
    missing: assessment.gaps.join(" | "),
  });
}

for (const country of waveCountries) {
  if (country.wave === 1) continue;
  rows.push({
    type: "country",
    wave: String(country.wave),
    url: `/patients-from/${country.slug}`,
    built: false,
    indexable: false,
    isComplete: false,
    uniquenessPercent: "",
    fresh: false,
    words: "",
    missing: "no country record. Open this wave only after 70% of the previous wave is indexed",
  });
}

const answerFiles = loadAnswerFiles();
if (!answerFiles.length) {
  rows.push({
    type: "question",
    wave: "",
    url: "/answers/{question}",
    built: false,
    indexable: false,
    isComplete: false,
    uniquenessPercent: "",
    fresh: false,
    words: "0",
    missing: "No files in content/answers. Collect 50 real questions from quote forms, WhatsApp and Search Console. Do not invent them.",
  });
} else {
  for (const file of answerFiles) {
    const gaps = file.record ? answerGaps(file.record) : [file.error ?? "unreadable"];
    const indexable = approved.answers.includes(file.slug);
    rows.push({
      type: "question",
      wave: "",
      url: `/answers/${file.slug}`,
      built: indexable,
      indexable,
      isComplete: gaps.length === 0,
      uniquenessPercent: "",
      fresh: Boolean(file.record),
      words: file.record ? String(file.record.words) : "0",
      missing: gaps.join(" | "),
    });
  }
}

rows.push({
  type: "translation",
  wave: "",
  url: "/{lang}/patients-from/...",
  built: false,
  indexable: false,
  isComplete: false,
  uniquenessPercent: "",
  fresh: false,
  words: "",
  missing:
    "No human-reviewed translation. Arabic, French, Russian and Bengali site locales stay noindex on these pages. Swahili, Amharic, Uzbek and Dari are not locales yet.",
});

rows.push({
  type: "pool",
  wave: "",
  url: "",
  built: false,
  indexable: false,
  isComplete: false,
  uniquenessPercent: "",
  fresh: false,
  words: "",
  missing: `${treatmentPool.map((item) => item.label).join(" and ")} stay out of the 15 until enquiry or Search Console data picks them. No treatment page, so no corridor: ${unmappedTreatments.join(", ")}.`,
});

const reports = path.join(process.cwd(), "reports");
fs.mkdirSync(reports, { recursive: true });
const header = ["type", "wave", "url", "built", "indexable", "isComplete", "uniquenessPercent", "fresh", "words", "missing"];
const csv = [header.join(","), ...rows.map((row) => header.map((key) => cell(row[key as keyof Row])).join(","))].join("\n");
fs.writeFileSync(path.join(reports, "readiness.csv"), `${csv}\n`);

const builtCountries = rows.filter((row) => row.type === "country" && row.built);
const gapSets = builtCountries.map((row) => new Set(row.missing.split(" | ").filter(Boolean)));
const shared = gapSets[0] ? [...gapSets[0]].filter((gap) => gapSets.every((set) => set.has(gap))) : [];
const lines = [
  `Patient-page readiness ${new Date().toISOString().slice(0, 10)}`,
  `Country hubs built: ${builtCountries.length}. Indexable: ${approved.countries.length}.`,
  `Country × treatment built: ${approved.treatments.length} of ${patientCountries.length * marketTreatments.length}.`,
  `Source cities built: ${approved.cities.length}. Question pages built: ${approved.answers.length}.`,
  "",
  "Shared gaps on every Wave 1 country hub:",
  ...shared.map((gap) => `- ${gap}`),
  "",
  "Per country:",
  ...builtCountries.map((row) => {
    const own = row.missing.split(" | ").filter((gap) => !shared.includes(gap));
    return `- ${row.url}: ${row.words} words, uniqueness ${row.uniquenessPercent || "n/a"}%. ${own.join("; ") || "no extra gaps"}`;
  }),
  "",
  "Afghanistan is in Wave 1 only as a draft. The visa route is not marked active or closed.",
  "Case counts and country WhatsApp numbers were left blank on purpose.",
  "fxRateToUSD.value means local currency units for 1 USD.",
  "IndexNow was not called. No newly indexable corridor URL exists.",
  "Search Console was not queried. Resubmit the sitemap index after deploy: the 10 country URLs left /sitemaps/countries/sitemap.xml.",
  "Do not open Wave 2 until at least 70% of Wave 1 pages are indexed. That share is 0% today.",
  "",
  "Type B and type C route files are copied into app/ only when at least one of those pages is indexable. An empty generateStaticParams list breaks this Next.js build.",
  "A source city also needs an indexable treatment corridor for the same country, so three internal links exist.",
];
fs.writeFileSync(path.join(reports, "readiness-summary.txt"), `${lines.join("\n")}\n`);

const measured = [
  ["url", "indexed", "impressions", "clicks", "leads_by_country", "ai_citations", "note"],
  [`${site.url}/patients-from`, "", "", "", "", "", "Directory is indexable. Metrics were not pulled from Search Console."],
  ...patientCountries.map(
    (record) =>
      [
        `${site.url}/patients-from/${record.slug}`,
        approved.countries.includes(record.slug) ? "" : "no",
        "",
        "",
        "",
        "",
        approved.countries.includes(record.slug) ? "Indexable. Metrics not pulled." : "noindex until the record is complete. Metrics not pulled.",
      ] as string[],
  ),
];
fs.writeFileSync(
  path.join(reports, "scaled-pages-2026-11.csv"),
  `${measured.map((row) => row.map((value) => cell(value)).join(",")).join("\n")}\n`,
);

console.log(lines.join("\n"));
console.log(`\nWrote reports/readiness.csv (${rows.length} rows) and data/patients/indexable.json.`);
