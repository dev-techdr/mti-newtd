import type { CountryPage } from "@/data/countries";
import { marketTreatments } from "@/data/patients/catalog";
import { proseFor } from "@/data/patients/load";
import type { LocalCost, PatientCountry, SourceCity } from "@/data/patients/schema";
import { coordinatorLanguages } from "@/lib/site";

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

/** A sourced private range, or a sourced statement that care is unavailable or has a long wait. */
export function costDocumented(cost: LocalCost) {
  if (cost.availability === "unavailable" || cost.availability === "long-wait") {
    return Boolean(cost.statement && cost.source && cost.asOf);
  }
  return costFilled(cost);
}

export function citationFor(record: PatientCountry, field: string) {
  return record.citations.find((item) => item.field === field);
}

const coordinatorLanguageSet = new Set<string>(coordinatorLanguages);

export function soughtSlugs(record: PatientCountry) {
  const allowed = new Set<string>(marketTreatments.map((item) => item.slug));
  const slugs: string[] = [];
  for (const item of record.soughtTreatments) {
    if (!allowed.has(item.slug) || slugs.includes(item.slug)) continue;
    slugs.push(item.slug);
    if (slugs.length === 8) break;
  }
  return slugs;
}

export function countryQuickAnswer(record: PatientCountry) {
  const visa =
    record.visa.eMedicalEligible === true
      ? `A ${record.demonym} passport is listed on India's 15 April 2026 e-Medical fee table, including an attendant fee.`
      : record.visa.eMedicalEligible === false
        ? `A ${record.demonym} passport is not listed on India's 15 April 2026 e-Medical fee table. That is not a refusal.`
        : `e-Medical eligibility for a ${record.demonym} passport is not settled here. The fee table cell is 00 or missing a definition.`;
  const route = record.travel.routesToIndia.find((item) => routeFilled(item));
  const journey = route?.typicalDuration
    ? `A checked journey is filed as ${route.typicalDuration}.`
    : "No sourced journey time is on this page yet.";
  return `${visa} ${journey} Confirm the official e-Visa page before you pay for flights. Send your reports on WhatsApp to start.`;
}

export function narrativeText(record: PatientCountry, prose: CountryPage) {
  return [countryQuickAnswer(record), prose.flights, prose.visa, prose.language, prose.money, prose.treatments, prose.culture, record.uniqueContent]
    .filter((item): item is string => Boolean(item))
    .join("\n");
}

function cited(record: PatientCountry, field: string) {
  const hit = citationFor(record, field);
  return Boolean(hit && withinDays(hit.lastChecked, 365));
}

/** Country hub. Local treatment prices are not required. */
export function assessCountry(record: PatientCountry): Assessment {
  const prose = proseFor(record.slug);
  const words = wordCount(narrativeText(record, prose));
  const faqs = prose.faqs.length + record.faqs.length;
  const gaps: string[] = [];
  if (words < 300) gaps.push(`unique text: ${words} words, need 300 that are about ${record.name}`);
  if (faqs < 8) gaps.push(`faqs: ${faqs} of 8, each answer must be true only for ${record.name}`);
  if (record.visa.eMedicalEligible === null) gaps.push("visa.eMedicalEligible");
  if (record.visa.attendantVisa === null) gaps.push("visa.attendantVisa");
  if (!record.visa.processingNotes) gaps.push("visa.processingNotes (how to apply)");
  if (!record.visa.applyVia) gaps.push("visa.applyVia");
  if (!record.visa.officialUrl) gaps.push("visa.officialUrl");
  if (!record.visa.source) gaps.push("visa.source");
  if (!withinDays(record.visa.lastChecked, 180)) gaps.push("visa.lastChecked (within 180 days)");
  if (!record.travel.airports.length) gaps.push("travel.airports");
  const openRoutes = record.travel.routesToIndia.filter((route) => !routeFilled(route));
  if (!record.travel.routesToIndia.length) gaps.push("travel.routesToIndia (direct yes/no, duration, source)");
  else if (openRoutes.length) {
    gaps.push(
      `travel.routesToIndia: ${openRoutes.map((route) => `${route.from}-${route.to} needs direct yes/no and typical duration`).join("; ")}`,
    );
  }
  if (!withinDays(record.travel.lastChecked, 180)) gaps.push("travel.lastChecked (within 180 days)");
  if (!cited(record, "travel")) gaps.push("citation travel (airline or airport URL and lastChecked)");
  if (!record.languages.length) gaps.push("languages");
  if (!cited(record, "languages")) gaps.push("citation languages (source URL and lastChecked)");
  const unsupported = record.techdrLanguageSupport.filter((language) => !coordinatorLanguageSet.has(language));
  if (!record.techdrLanguageSupport.length) gaps.push("techdrLanguageSupport");
  if (unsupported.length) {
    gaps.push(`techdrLanguageSupport includes ${unsupported.join(", ")}, which is not a TechDr coordinator language`);
  }
  if (!cited(record, "techdrLanguages")) gaps.push("citation techdrLanguages (source URL and lastChecked)");
  if (!record.currency) gaps.push("currency");
  else if (!cited(record, "currency")) gaps.push("citation currency (source URL and lastChecked)");
  if (!record.money.paymentMethods.length) gaps.push("money.paymentMethods");
  if (!cited(record, "payment")) gaps.push("citation payment (source URL and lastChecked)");
  if (!record.localCareContext.commonReasonsPatientsTravel.length) gaps.push("localCareContext.commonReasonsPatientsTravel");
  if (!cited(record, "careReasons")) gaps.push("citation careReasons (WHO, ministry, or reputable news URL and lastChecked)");
  if (!record.embassy) gaps.push("embassy (name, official URL, lastChecked)");
  else if (!withinDays(record.embassy.lastChecked, 180)) gaps.push("embassy.lastChecked (within 180 days)");
  if (record.status !== "verified") gaps.push("status: needs-human-check (a person must confirm visa and route facts before indexing)");

  const fresh = withinDays(record.visa.lastChecked, 180) && withinDays(record.travel.lastChecked, 180);
  return { gaps, complete: gaps.length === 0, fresh, words, faqs };
}

export function assessTreatment(record: PatientCountry, slug: string): Assessment {
  const country = assessCountry(record);
  const cost = record.localCosts[slug];
  const gaps: string[] = [];
  const dataGaps = country.gaps.filter((item) => !item.startsWith("status:"));
  if (dataGaps.length) gaps.push("country hub is missing sourced facts");
  else if (record.status !== "verified") gaps.push("status: needs-human-check (a person must confirm visa and route facts before indexing)");
  const sought = record.soughtTreatments.find((item) => item.slug === slug);
  const published = soughtSlugs(record);
  if (!sought) gaps.push(`soughtTreatments.${slug} (enquiry data or a sourced report, with URL and date)`);
  else if (!published.includes(slug)) gaps.push("outside the 8 treatments published for this country");
  if (!cost) gaps.push(`localCosts.${slug} (sourced private range, or a sourced unavailable / long-wait statement, plus fly-home note, follow-up note, and pair FAQs)`);
  else {
    if (!costDocumented(cost)) gaps.push(`localCosts.${slug} source, asOf, and either a private USD range or an unavailable / long-wait statement`);
    if (!cost.flyHomeNote) gaps.push(`localCosts.${slug}.flyHomeNote`);
    if (!cost.followUpNote) gaps.push(`localCosts.${slug}.followUpNote`);
    if (cost.faqs.length < 4) gaps.push(`localCosts.${slug}.faqs: ${cost.faqs.length}, need at least 4 that are specific to this pair`);
  }
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
