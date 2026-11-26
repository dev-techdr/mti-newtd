import fs from "node:fs";
import path from "node:path";
import { assessCountry } from "../data/patients/assess";
import { indiaFares } from "../data/patients/india-fares";
import { getPatientCountry } from "../data/patients/load";
import type { PatientCountry } from "../data/patients/schema";

const hubs = ["nigeria", "kenya", "ethiopia", "tanzania", "bangladesh", "iraq", "oman", "yemen", "uzbekistan", "afghanistan"];
const waveB = ["sudan", "somalia", "uganda", "rwanda", "ghana", "cameroon", "dr-congo", "zambia", "zimbabwe", "malawi", "mozambique", "nepal", "sri-lanka", "maldives", "myanmar"];
const waveC = ["kazakhstan", "tajikistan", "turkmenistan", "kyrgyzstan", "azerbaijan", "mongolia", "kuwait", "bahrain", "qatar", "saudi-arabia", "uae", "egypt", "mauritius", "seychelles", "fiji"];
const fareRest = indiaFares.map((fare) => fare.slug).filter((slug) => !hubs.includes(slug));
const waveOf = new Map<string, string>();
for (const slug of hubs) waveOf.set(slug, "A");
for (const slug of waveB) waveOf.set(slug, "B");
for (const slug of waveC) waveOf.set(slug, "C");
for (const slug of fareRest) if (!waveOf.has(slug)) waveOf.set(slug, "D");

const ordered = [...hubs, ...fareRest, ...[...waveOf.keys()].filter((slug) => !hubs.includes(slug) && !fareRest.includes(slug))];

function cell(value: string) {
  return /[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

function dataGaps(record: PatientCountry) {
  return assessCountry(record).gaps.filter((item) => !item.startsWith("status:"));
}

const rows = ["country,page_type,missing_fields"];
const byWave = new Map<string, string[]>([
  ["A", []],
  ["B", []],
  ["C", []],
  ["D", []],
]);

for (const slug of ordered) {
  const wave = waveOf.get(slug) ?? "D";
  const record = getPatientCountry(slug);
  const name = record?.name ?? slug;
  if (!record) {
    rows.push([slug, "hub", "no country record"].map(cell).join(","));
    rows.push([slug, "country-treatment", "no country record"].map(cell).join(","));
    byWave.get(wave)?.push(`## ${name}\n\nNo country record.\n`);
    continue;
  }
  const assessment = assessCountry(record);
  const missing = assessment.gaps.join(" | ");
  rows.push([slug, "hub", missing].map(cell).join(","));
  const sought = record.soughtTreatments;
  if (!sought.length) {
    rows.push([slug, "country-treatment", "soughtTreatments: none recorded, so no pair page can be indexed"].map(cell).join(","));
  } else {
    for (const item of sought) {
      rows.push([slug, "country-treatment", `${item.slug}: pair facts still required before indexing`].map(cell).join(","));
    }
  }
  const routes = record.travel.routesToIndia.length
    ? record.travel.routesToIndia
        .map((route) => `${route.from}-${route.to} direct=${route.direct ?? "unset"} duration=${route.typicalDuration ?? "unset"} via=${route.commonVia.join("/") || "none"}`)
        .join("; ")
    : "none recorded";
  const airports = record.travel.airports.length ? record.travel.airports.map((item) => `${item.iata} ${item.city}`).join(", ") : "none recorded";
  const block = [
    `## ${record.name}`,
    "",
    `- Status: \`${record.status}\`. Leave this as needs-human-check until a person opens the visa source and the route source.`,
    `- Data gate besides that status: ${dataGaps(record).length ? "blocked" : "would pass"}`,
    `- Words on the page: ${assessment.words}. FAQs: ${assessment.faqs}.`,
    "",
    "### Visa",
    "",
    `- e-Medical listed: ${record.visa.eMedicalEligible === null ? "unset" : record.visa.eMedicalEligible ? "yes" : "no"}`,
    `- Attendant listed: ${record.visa.attendantVisa === null ? "unset" : record.visa.attendantVisa ? "yes" : "no"}`,
    `- How to apply: ${record.visa.applyVia ?? "unset"}`,
    `- Notes: ${record.visa.processingNotes ?? "unset"}`,
    `- Apply page: ${record.visa.officialUrl}`,
    `- Source: ${record.visa.source ?? "unset"}`,
    `- Checked: ${record.visa.lastChecked ?? "unset"}`,
    "",
    "### Route",
    "",
    `- Airports: ${airports}`,
    `- Routes: ${routes}`,
    `- Route checked: ${record.travel.lastChecked ?? "unset"}`,
    `- Embassy: ${record.embassy ? `${record.embassy.name} ${record.embassy.url} (${record.embassy.lastChecked})` : "unset"}`,
    "",
    "### Still missing",
    "",
    dataGaps(record).map((item) => `- ${item}`).join("\n") || "- Nothing in the data gate except the human check.",
    "",
  ].join("\n");
  byWave.get(wave)?.push(block);
}

const reports = path.join(process.cwd(), "reports");
fs.mkdirSync(reports, { recursive: true });
fs.writeFileSync(path.join(reports, "country-gaps.csv"), `${rows.join("\n")}\n`);

for (const [wave, blocks] of byWave) {
  const slugs = ordered.filter((slug) => (waveOf.get(slug) ?? "D") === wave);
  let hubsPass = 0;
  let hubsBlocked = 0;
  for (const slug of slugs) {
    const record = getPatientCountry(slug);
    if (record && dataGaps(record).length === 0) hubsPass += 1;
    else hubsBlocked += 1;
  }
  const intro = [
    `# Wave ${wave}: check visa and route facts before indexing`,
    "",
    "Nothing in this wave is indexed. `status` stays `needs-human-check` until a person confirms the lines below. Local treatment prices are not required for a hub.",
    "",
    `- Hubs whose sourced facts are complete, apart from that human check: ${hubsPass}`,
    `- Hubs blocked on missing facts: ${hubsBlocked}`,
    "- Country × treatment pages indexable: 0",
    "- Country × treatment pages blocked: all of them. None has a sourced local price or a sourced list of treatments patients from that country seek.",
    "",
    "Open each source. If a line is wrong, correct the country JSON. Set `status` to `verified` only after that, then deploy.",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(reports, `country-check-${wave.toLowerCase()}.md`), `${intro}\n${blocks.join("\n")}`);
}

console.log(`wrote ${rows.length - 1} gap rows`);
