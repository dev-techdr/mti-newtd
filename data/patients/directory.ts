import { patientCountries } from "@/data/patients/load";
import type { PatientCountry } from "@/data/patients/schema";

export const directoryUpdated = "2026-11-23";

export const directoryQuickAnswer =
  "TechDr coordinates planned treatment in India for people who will fly from another country. Open the country you are leaving to see the airports and languages already on that page. Indian officials decide the visa. A written quote is the only price.";

export const directoryIntro = [
  "Pick one country. The line under the name is the desk language, the currency and any airport already stored for that corridor.",
  "Families use the country page to prepare reports, a companion and a payment method their own bank will honour. An emergency belongs in the nearest capable hospital.",
];

export function countryLine(record: PatientCountry) {
  const airports = record.travel.airports.map((item) => `${item.iata} ${item.city}`).join(", ");
  const languages = record.techdrLanguageSupport.join(", ");
  const currency = record.currency?.code ?? "currency not checked";
  return `${record.name} (${record.region}): ${languages || "coordinator language not checked"}. ${currency}${airports ? `. ${airports}` : ""}.`;
}

export function directoryText() {
  const lines = patientCountries.map(countryLine);
  return ["Medical treatment in India by country", directoryQuickAnswer, ...directoryIntro, ...lines].join("\n");
}
