import type { CountryPage } from "@/data/countries";
import { marketTreatments } from "@/data/patients/catalog";
import { proseFor } from "@/data/patients/load";
import type { LocalCost, PatientCountry, SourceCity } from "@/data/patients/schema";

export type Assessment = {
  gaps: string[];
  complete: boolean;
  fresh: boolean;
  words: number;
  faqs: number;
};

const DAY = 24 * 60 * 60 * 1000;

export function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function withinDays(iso: string | null, days: number) {
  if (!iso) return false;
  const then = Date.parse(`${iso}T00:00:00Z`);
  if (Number.isNaN(then)) return false;
  const age = (Date.now() - then) / DAY;
  return age >= 0 && age <= days;
}

export function routeFilled(route: { direct: boolean | null; typicalDuration: string | null }) {
  return route.direct !== null && Boolean(route.typicalDuration);
}

export function fxFilled(fx: PatientCountry["fxRateToUSD"]) {
  return fx.value !== null && Boolean(fx.asOf) && Boolean(fx.source);
}

export function costFilled(cost: LocalCost) {
  return (
    cost.minUSD !== null &&
    cost.maxUSD !== null &&
    cost.maxUSD >= cost.minUSD &&
    cost.setting !== null &&
    Boolean(cost.source) &&
    Boolean(cost.asOf)
  );
}

export function narrativeText(record: PatientCountry, prose: CountryPage) {
  return [prose.answer, prose.flights, prose.visa, prose.language, prose.money, prose.treatments, prose.culture, record.uniqueContent]
    .filter((item): item is string => Boolean(item))
    .join("\n");
}

export function assessCountry(record: PatientCountry): Assessment {
  const prose = proseFor(record.slug);
  const words = wordCount(narrativeText(record, prose));
  const faqs = prose.faqs.length + record.faqs.length;
  const gaps: string[] = [];
  if (words < 300) gaps.push(`uniqueContent: ${words} words in the country narrative, need 300`);
  if (faqs < 8) gaps.push(`faqs: ${faqs} of 8, each answer must be true only for ${record.name}`);
  if (record.visa.eMedicalEligible === null) gaps.push("visa.eMedicalEligible");
  if (record.visa.attendantVisa === null) gaps.push("visa.attendantVisa");
  if (!record.visa.processingNotes) gaps.push("visa.processingNotes");
  if (!record.visa.applyVia) gaps.push("visa.applyVia");
  if (!record.visa.lastChecked) gaps.push("visa.lastChecked (within 180 days)");
  if (!record.travel.airports.length) gaps.push("travel.airports");
  const openRoutes = record.travel.routesToIndia.filter((route) => !routeFilled(route));
  if (!record.travel.routesToIndia.length) gaps.push("travel.routesToIndia");
  else if (openRoutes.length) {
    gaps.push(
      `travel.routesToIndia: ${openRoutes.map((route) => `${route.from}-${route.to} needs direct yes/no and typical duration`).join("; ")}`,
    );
  }
  if (!record.travel.lastChecked) gaps.push("travel.lastChecked (within 180 days)");
  if (!record.money.paymentMethods.length) gaps.push("money.paymentMethods");
  if (!record.money.notes) gaps.push("money.notes");
  if (!record.localCareContext.commonReasonsPatientsTravel.length) gaps.push("localCareContext.commonReasonsPatientsTravel");
  if (!record.localCareContext.followUpAtHome) gaps.push("localCareContext.followUpAtHome");
  if (!record.cultural.foodNotes) gaps.push("cultural.foodNotes");
  if (!record.cultural.prayerFacilities) gaps.push("cultural.prayerFacilities");
  if (!fxFilled(record.fxRateToUSD)) gaps.push("fxRateToUSD (local units per 1 USD, asOf, source)");
  if (!Object.values(record.localCosts).some(costFilled)) {
    gaps.push("localCosts: sourced private minUSD, maxUSD, setting, source and asOf for at least one treatment");
  }
  if (!record.reviewed.by) gaps.push("reviewed.by");
  if (!record.reviewed.date) gaps.push("reviewed.date");

  const costs = Object.values(record.localCosts).filter(costFilled);
  const fresh =
    withinDays(record.visa.lastChecked, 180) &&
    withinDays(record.travel.lastChecked, 180) &&
    withinDays(record.fxRateToUSD.asOf, 365) &&
    costs.length > 0 &&
    costs.every((cost) => withinDays(cost.asOf, 365));

  return { gaps, complete: gaps.length === 0, fresh, words, faqs };
}

export function assessTreatment(record: PatientCountry, slug: string): Assessment {
  const country = assessCountry(record);
  const cost = record.localCosts[slug];
  const gaps: string[] = [];
  if (!country.complete) gaps.push("country record incomplete");
  if (!cost) gaps.push(`localCosts.${slug} (minUSD, maxUSD, setting, source, asOf, flyHomeNote, followUpNote, 6-8 FAQs)`);
  else {
    if (!costFilled(cost)) gaps.push(`localCosts.${slug} minUSD, maxUSD, setting, source, asOf`);
    if (!cost.flyHomeNote) gaps.push(`localCosts.${slug}.flyHomeNote`);
    if (!cost.followUpNote) gaps.push(`localCosts.${slug}.followUpNote`);
    if (cost.faqs.length < 6 || cost.faqs.length > 8) gaps.push(`localCosts.${slug}.faqs: ${cost.faqs.length}, need 6-8`);
  }
  if (!record.visa.processingDays) gaps.push("visa.processingDays");
  const known = marketTreatments.some((item) => item.slug === slug);
  if (!known) gaps.push("treatment is outside the corridor list");
  const fresh = country.fresh && Boolean(cost && withinDays(cost.asOf, 365));
  return { gaps, complete: gaps.length === 0, fresh, words: 0, faqs: cost?.faqs.length ?? 0 };
}

export function assessCity(city: SourceCity): Assessment {
  const words = wordCount(city.uniqueContent ?? "");
  const gaps: string[] = [];
  const openRoutes = city.routesToIndia.filter((route) => !routeFilled(route));
  if (!city.routesToIndia.length) gaps.push("routesToIndia with duration and direct yes/no");
  else if (openRoutes.length) {
    gaps.push(`routesToIndia: ${openRoutes.map((route) => `${route.from}-${route.to}`).join(", ")} need duration and direct yes/no`);
  }
  if (!city.visaCentre) gaps.push("visaCentre (name and city)");
  if (!city.localSupport) gaps.push("localSupport (available true/false and a detail that differs from the country page)");
  if (words < 200) gaps.push(`uniqueContent: ${words} words, need 200 that are not on the ${city.country} page`);
  if (!city.lastChecked) gaps.push("lastChecked (within 180 days)");
  return {
    gaps,
    complete: gaps.length === 0,
    fresh: withinDays(city.lastChecked, 180) && city.routesToIndia.length > 0,
    words,
    faqs: 0,
  };
}
