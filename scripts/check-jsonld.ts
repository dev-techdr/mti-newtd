import { countries, getCountry } from "../data/countries";
import { procedures } from "../data/procedures";
import { treatmentModel, countryModel } from "../lib/page-model";
import { guideGraph, siteGraph } from "../lib/schema";

const banned = new Set(["HowTo", "HowToStep", "Review", "AggregateRating", "SpeakableSpecification"]);

function walk(value: unknown, path: string) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${path}[${index}]`));
    return;
  }
  const record = value as Record<string, unknown>;
  if ("speakable" in record) throw new Error(`speakable at ${path}`);
  const type = record["@type"];
  const types = Array.isArray(type) ? type : type ? [type] : [];
  for (const item of types) {
    if (typeof item === "string" && banned.has(item)) throw new Error(`${item} at ${path}`);
  }
  for (const [key, child] of Object.entries(record)) walk(child, `${path}.${key}`);
}

function check(label: string, data: unknown) {
  const parsed = JSON.parse(JSON.stringify(data));
  walk(parsed, label);
}

check("site", siteGraph("en"));
const sample = procedures.find((item) => item.kind === "procedure") ?? procedures[0];
const emergency = procedures.find((item) => item.kind === "emergency");
const condition = procedures.find((item) => item.kind === "condition");
for (const procedure of [sample, emergency, condition].filter((item) => item !== undefined)) {
  const model = treatmentModel(procedure);
  check(procedure.slug, guideGraph({
    url: `https://medicaltourism.techdr.in/treatments/${procedure.specialty}/${procedure.slug}`,
    name: model.h1,
    updated: model.updated,
    kind: model.kind === "cost" || model.kind === "country" ? "procedure" : model.kind,
    description: procedure.description,
    faqs: model.faqs,
    howPerformed: model.kind === "procedure" ? procedure.howPerformed : undefined,
    procedureType: procedure.procedureType,
  }));
}

const nigeria = getCountry("nigeria");
if (!nigeria) throw new Error("Missing Nigeria");
const country = countryModel(nigeria);
check("nigeria", guideGraph({
  url: "https://medicaltourism.techdr.in/patients-from/nigeria",
  name: country.h1,
  updated: country.updated,
  kind: "country",
  description: nigeria.description,
  faqs: country.faqs,
  reviewed: false,
  audience: "Nigeria",
}));
if (countries.length < 10) throw new Error("Wave 1 country narratives are incomplete");

console.log("JSON-LD check passed.");
