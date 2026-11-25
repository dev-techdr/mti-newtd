import fs from "node:fs";
import path from "node:path";
import { cities } from "@/data/cities";
import { answerGaps, loadAnswerFiles } from "@/lib/answers";
import { assessCity, assessCountry, assessTreatment, soughtSlugs } from "@/data/patients/assess";
import { marketTreatments, treatmentPool } from "@/data/patients/catalog";
import { directoryText } from "@/data/patients/directory";
import { patientCountries, sourceCities } from "@/data/patients/load";
import { getProcedure, procedures } from "@/data/procedures";
import { cityCorridorModel, treatmentCorridorModel } from "@/lib/patient-pages";
import { costModel, countryModel, longSentences, pageText, treatmentModel } from "@/lib/page-model";
import { countries } from "@/data/countries";

function sentences(text: string) {
  return [...new Set(longSentences(text).map((item) => item.toLowerCase()))];
}

let cache: Map<string, string[]> | null = null;
let building = false;

function corpus() {
  if (cache) return cache;
  if (building) throw new Error("Sentence corpus re-entered");
  building = true;
  const map = new Map<string, string[]>();
  try {
    for (const country of countries) {
      map.set(`country:${country.slug}`, sentences(pageText(countryModel(country))));
    }
    for (const procedure of procedures) {
      const treatment = treatmentModel(procedure);
      map.set(`treatment:${procedure.slug}`, sentences(pageText(treatment)));
      if (procedure.kind !== "emergency") map.set(`cost:${procedure.costId}`, sentences(pageText(costModel(procedure))));
    }
    for (const city of cities) {
      const text = [city.answer, city.overview, city.stay, city.climate, ...city.practical, ...city.faqs.flatMap((item) => [item.question, item.answer])].join("\n");
      map.set(`india:${city.path}`, sentences(text));
    }
    map.set("directory:patients-from", sentences(directoryText()));
    const blogDir = path.join(process.cwd(), "content/blog");
    if (fs.existsSync(blogDir)) {
      for (const file of fs.readdirSync(blogDir)) {
        if (!file.endsWith(".mdx")) continue;
        const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
        map.set(`blog:${file}`, sentences(raw.replace(/^---[\s\S]*?---/, "")));
      }
    }
    for (const record of patientCountries) {
      for (const treatment of marketTreatments) {
        if (!assessTreatment(record, treatment.slug).complete) continue;
        map.set(`corridor:${record.slug}/${treatment.slug}`, sentences(pageText(treatmentCorridorModel(record.slug, treatment.slug))));
      }
    }
    for (const city of sourceCities) {
      if (!assessCity(city).complete) continue;
      map.set(`city:${city.country}/${city.slug}`, sentences(pageText(cityCorridorModel(city.country, city.slug))));
    }
    for (const file of loadAnswerFiles()) {
      if (!file.record || answerGaps(file.record).length) continue;
      map.set(`answer:${file.record.slug}`, sentences(`${file.record.question}\n${file.record.shortAnswer}\n${file.record.body}`));
    }
    cache = map;
    return map;
  } finally {
    building = false;
  }
}

export function uniquenessPercent(id: string) {
  const map = corpus();
  const own = map.get(id) ?? [];
  if (!own.length) return null;
  const others = new Set<string>();
  for (const [key, list] of map) {
    if (key === id) continue;
    for (const sentence of list) others.add(sentence);
  }
  const unique = own.filter((sentence) => !others.has(sentence)).length;
  return Math.floor((unique / own.length) * 100);
}

export function assertMarketProcedures() {
  for (const item of [...marketTreatments, ...treatmentPool]) {
    if (!getProcedure(item.slug)) throw new Error(`Missing treatment page for ${item.slug}`);
  }
  const procedureSlugs = new Set(procedures.map((item) => item.slug));
  for (const city of sourceCities) {
    if (procedureSlugs.has(city.slug)) throw new Error(`City slug collides with a treatment: ${city.slug}`);
  }
}

export function computeApproved() {
  assertMarketProcedures();
  const countriesApproved: string[] = [];
  const treatments: string[] = [];
  const citiesApproved: string[] = [];
  const answers: string[] = [];
  for (const record of patientCountries) {
    const assessment = assessCountry(record);
    if (record.status === "verified" && assessment.complete && assessment.fresh) countriesApproved.push(record.slug);
  }
  for (const record of patientCountries) {
    if (!countriesApproved.includes(record.slug)) continue;
    const allowed = new Set(soughtSlugs(record));
    for (const treatment of marketTreatments) {
      if (!allowed.has(treatment.slug)) continue;
      const assessment = assessTreatment(record, treatment.slug);
      const score = uniquenessPercent(`corridor:${record.slug}/${treatment.slug}`);
      if (assessment.complete && assessment.fresh && score !== null && score >= 60) {
        treatments.push(`${record.slug}/${treatment.slug}`);
      }
    }
  }
  for (const city of sourceCities) {
    const assessment = assessCity(city);
    if (!assessment.complete || !assessment.fresh) continue;
    if (!marketTreatments.some((item) => treatments.includes(`${city.country}/${item.slug}`))) continue;
    const score = uniquenessPercent(`city:${city.country}/${city.slug}`);
    if (score !== null && score >= 60) citiesApproved.push(`${city.country}/${city.slug}`);
  }
  for (const file of loadAnswerFiles()) {
    if (!file.record || answerGaps(file.record).length) continue;
    const score = uniquenessPercent(`answer:${file.record.slug}`);
    if (score !== null && score >= 60) answers.push(file.record.slug);
  }
  return { countries: countriesApproved, treatments, cities: citiesApproved, answers };
}
