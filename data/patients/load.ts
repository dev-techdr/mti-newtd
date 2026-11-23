import { countries } from "@/data/countries";
import { waveCountries } from "@/data/patients/catalog";
import afghanistan from "@/data/patients/countries/afghanistan.json";
import bangladesh from "@/data/patients/countries/bangladesh.json";
import ethiopia from "@/data/patients/countries/ethiopia.json";
import iraq from "@/data/patients/countries/iraq.json";
import kenya from "@/data/patients/countries/kenya.json";
import nigeria from "@/data/patients/countries/nigeria.json";
import oman from "@/data/patients/countries/oman.json";
import tanzania from "@/data/patients/countries/tanzania.json";
import uzbekistan from "@/data/patients/countries/uzbekistan.json";
import yemen from "@/data/patients/countries/yemen.json";
import cities from "@/data/patients/cities.json";
import { patientCountrySchema, sourceCitySchema, type PatientCountry, type SourceCity } from "@/data/patients/schema";

const rawCountries = [nigeria, kenya, ethiopia, tanzania, bangladesh, iraq, oman, yemen, uzbekistan, afghanistan];

export const patientCountries: PatientCountry[] = rawCountries.map((item) => patientCountrySchema.parse(item));
export const sourceCities: SourceCity[] = sourceCitySchema.array().parse(cities);

const countryBySlug = new Map(patientCountries.map((item) => [item.slug, item]));
const proseBySlug = new Map(countries.map((item) => [item.slug, item]));

for (const record of patientCountries) {
  const prose = proseBySlug.get(record.slug);
  if (!prose) throw new Error(`Patient record ${record.slug} has no narrative in data/countries.ts`);
  if (prose.name !== record.name || prose.adjective !== record.demonym) {
    throw new Error(`Name mismatch for ${record.slug}`);
  }
}
for (const prose of countries) {
  if (!countryBySlug.has(prose.slug)) throw new Error(`Missing data/patients/countries/${prose.slug}.json`);
}

const wave1 = waveCountries.filter((item) => item.wave === 1).map((item) => item.slug);
if (wave1.length !== patientCountries.length || wave1.some((slug) => !countryBySlug.has(slug))) {
  throw new Error("Wave 1 catalog and country records diverged");
}

for (const city of sourceCities) {
  if (!countryBySlug.has(city.country)) throw new Error(`City ${city.slug} points at an unknown country`);
}

export function getPatientCountry(slug: string) {
  return countryBySlug.get(slug);
}

export function getSourceCity(country: string, slug: string) {
  return sourceCities.find((city) => city.country === country && city.slug === slug);
}

export function proseFor(slug: string) {
  const prose = proseBySlug.get(slug);
  if (!prose) throw new Error(`Missing country narrative: ${slug}`);
  return prose;
}
