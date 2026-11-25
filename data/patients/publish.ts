import approvedFile from "@/data/patients/indexable.json";
import { assessCity, assessCountry, assessTreatment, soughtSlugs } from "@/data/patients/assess";
import { marketTreatments } from "@/data/patients/catalog";
import { getPatientCountry, patientCountries, sourceCities } from "@/data/patients/load";
import type { PatientCountry, SourceCity } from "@/data/patients/schema";

const approved = approvedFile as {
  countries: string[];
  treatments: string[];
  cities: string[];
  answers: string[];
};

const approvedTreatments = new Set(approved.treatments);
const approvedCities = new Set(approved.cities);
const approvedAnswers = new Set(approved.answers);
const overlap = approved.treatments.filter((key) => approvedCities.has(key));
if (overlap.length) throw new Error(`Patient slug collision: ${overlap.join(", ")}`);

export function isCountryIndexable(slug: string) {
  const record = getPatientCountry(slug);
  if (!record || record.status !== "verified") return false;
  const assessment = assessCountry(record);
  return assessment.complete && assessment.fresh && approved.countries.includes(slug);
}

export function listIndexableCountries() {
  return patientCountries.filter((record) => isCountryIndexable(record.slug));
}

export function isTreatmentIndexable(country: string, slug: string) {
  const record = getPatientCountry(country);
  if (!record || !isCountryIndexable(country) || !soughtSlugs(record).includes(slug)) return false;
  const assessment = assessTreatment(record, slug);
  return assessment.complete && assessment.fresh && approvedTreatments.has(`${country}/${slug}`);
}

export function hubsForProcedure(slug: string) {
  return patientCountries.flatMap((record) => {
    if (!record.soughtTreatments.some((item) => item.slug === slug)) return [];
    if (isTreatmentIndexable(record.slug, slug)) return [];
    return [{ href: `/patients-from/${record.slug}`, label: `Patients from ${record.name}` }];
  });
}

export function isCityIndexable(city: SourceCity) {
  const assessment = assessCity(city);
  if (!assessment.complete || !assessment.fresh || !approvedCities.has(`${city.country}/${city.slug}`)) return false;
  return marketTreatments.some((item) => isTreatmentIndexable(city.country, item.slug));
}

export function isAnswerIndexable(slug: string) {
  return approvedAnswers.has(slug);
}

export function countryLastModified(record: PatientCountry) {
  const dates = [
    record.reviewed.date,
    record.visa.lastChecked,
    record.travel.lastChecked,
    record.fxRateToUSD.asOf,
    ...Object.values(record.localCosts).map((cost) => cost.asOf),
  ].filter((item): item is string => Boolean(item));
  return dates.sort().at(-1) ?? record.reviewed.date ?? "2026-11-13";
}

export function builtCountryChildPaths() {
  const treatments = approved.treatments.flatMap((key) => {
    const [country, slug] = key.split("/");
    if (!country || !slug || !isTreatmentIndexable(country, slug)) return [];
    return [{ country, slug, kind: "treatment" as const }];
  });
  const cities = sourceCities.flatMap((city) => {
    if (!isCityIndexable(city)) return [];
    return [{ country: city.country, slug: city.slug, kind: "city" as const }];
  });
  return [...treatments, ...cities];
}

export function corridorsForProcedure(slug: string) {
  return patientCountries.flatMap((record) => {
    if (!isTreatmentIndexable(record.slug, slug)) return [];
    const label = marketTreatments.find((item) => item.slug === slug)?.label ?? slug;
    return [{ href: `/patients-from/${record.slug}/${slug}`, label: `${label} from ${record.name}` }];
  });
}

export function childLinksForCountry(country: string) {
  const record = getPatientCountry(country);
  if (!record) return [];
  const treatments = marketTreatments.flatMap((item) =>
    isTreatmentIndexable(country, item.slug)
      ? [{ href: `/patients-from/${country}/${item.slug}`, label: `${item.label} from ${record.name}` }]
      : [],
  );
  const cities = sourceCities.flatMap((city) =>
    city.country === country && isCityIndexable(city)
      ? [{ href: `/patients-from/${country}/${city.slug}`, label: `From ${city.name}` }]
      : [],
  );
  return [...treatments, ...cities];
}

export function indexableCityRecords() {
  return sourceCities.filter((city) => isCityIndexable(city));
}

export function hasCountryTreatmentPages() {
  return builtCountryChildPaths().some((item) => item.kind === "treatment");
}

export function hasSourceCityPages() {
  return builtCountryChildPaths().some((item) => item.kind === "city");
}

export function hasAnswerPages() {
  return approved.answers.length > 0;
}

export function treatmentSitemapItems() {
  return builtCountryChildPaths().flatMap((item) => {
    if (item.kind !== "treatment") return [];
    const record = getPatientCountry(item.country);
    if (!record) return [];
    return [{ path: `/patients-from/${item.country}/${item.slug}`, lastModified: record.localCosts[item.slug]?.asOf ?? countryLastModified(record) }];
  });
}

export function sourceCitySitemapItems() {
  return sourceCities.flatMap((city) => {
    if (!isCityIndexable(city) || !city.lastChecked) return [];
    return [{ path: `/patients-from/${city.country}/${city.slug}`, lastModified: city.lastChecked }];
  });
}

export function getApprovedAnswerSlugs() {
  return [...approved.answers];
}
