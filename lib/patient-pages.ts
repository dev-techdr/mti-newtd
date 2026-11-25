import { getCost, money, moneyRange } from "@/data/costs";
import { marketTreatments } from "@/data/patients/catalog";
import { getPatientCountry, getSourceCity } from "@/data/patients/load";
import type { PatientCountry } from "@/data/patients/schema";
import { getProcedure } from "@/data/procedures";
import type { PageModel } from "@/lib/page-model";

export function limitWords(text: string, min = 40, max = 60) {
  const words = text.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const next = words.slice(0, max);
  if (next.length < min) throw new Error(`Quick answer is ${next.length} words`);
  const sentence = next.join(" ");
  return /[.!?]$/.test(sentence) ? sentence : `${sentence}.`;
}

function localAmount(usd: number, record: PatientCountry) {
  const rate = record.fxRateToUSD.value;
  if (!rate) return "";
  return ` (${record.currency.symbol}${Math.round(usd * rate).toLocaleString("en-US")})`;
}

export function treatmentCorridorModel(countrySlug: string, treatmentSlug: string): PageModel {
  const record = getPatientCountry(countrySlug);
  const procedure = getProcedure(treatmentSlug);
  const cost = record?.localCosts[treatmentSlug];
  if (!record || !procedure || !cost || cost.minUSD === null || cost.maxUSD === null || !cost.setting || !cost.asOf || !cost.flyHomeNote || !cost.followUpNote) {
    throw new Error(`Incomplete corridor ${countrySlug}/${treatmentSlug}`);
  }
  const india = getCost(procedure.costId).india;
  const label = marketTreatments.find((item) => item.slug === treatmentSlug)?.label ?? procedure.name;
  const local = `${money(cost.minUSD)}–${money(cost.maxUSD)}`;
  const indiaLabel = moneyRange(india);
  const gap = cost.minUSD - india[1];
  const saving =
    gap > 0
      ? `The lowest sourced figure sits ${money(gap)} above the top of the India planning range.`
      : `${record.name} and the India planning range overlap, so this page states no saving.`;
  const quickAnswer = limitWords(
    `${label} in India for someone travelling from ${record.name} is planned from the reports, not from a message. The sourced private range is ${local}, checked ${cost.asOf}. The India planning range is ${indiaLabel}. Ask for a written quote before anyone pays for flights. Neither figure is a personal quote or a promised outcome.`,
  );
  const days = record.visa.processingDays;
  const sections: PageModel["sections"] = [];
  if (days && record.visa.lastChecked) {
    sections.push({
      id: "timeline",
      heading: `How long should a ${record.demonym} patient allow before ${label.toLowerCase()}?`,
      paragraphs: [
        `After the hospital letter, allow ${days.min}–${days.max} days for the visa window checked on ${record.visa.lastChecked}. Do not buy a non-refundable ticket first.`,
        `Hospital time and total time in India are published on the ${procedure.name} page as ${procedure.hospitalStay} and ${procedure.totalStay}. Add the flight on top of that stay.`,
      ],
    });
  }
  sections.push({
    id: "follow-up",
    heading: `What follow-up happens back in ${record.name}?`,
    paragraphs: [cost.followUpNote],
  });
  return {
    kind: "country",
    h1: `${label} in India for patients from ${record.name}`,
    quickAnswer,
    updated: cost.asOf,
    showPrice: true,
    showQuote: true,
    quoteHref: "/get-a-free-quote",
    price: { value: indiaLabel, unit: "India planning range", note: "Indicative range for a typical case. Not a personal quote or an outcome." },
    alsoKnownAs: [],
    facts: [
      { label: "India planning range", value: indiaLabel },
      { label: `${record.name} private`, value: `${local}${localAmount(cost.minUSD, record)} to ${money(cost.maxUSD)}${localAmount(cost.maxUSD, record)}, ${cost.setting} setting, source checked ${cost.asOf}` },
      { label: "Saving", value: saving },
      { label: "Hospital stay", value: procedure.hospitalStay },
      { label: "Time in India", value: procedure.totalStay },
      { label: "Flying home", value: cost.flyHomeNote },
    ],
    sections,
    faqs: cost.faqs,
    followups: [],
    todos: [],
    ...(record.reviewed.by
      ? { reviewNote: `Reviewed by ${record.reviewed.by}${record.reviewed.date ? ` on ${record.reviewed.date}` : ""}. Prices are indicative.` }
      : {}),
    sources: [
      ...(cost.source?.startsWith("https://")
        ? [{ href: cost.source, label: `${record.name} cost source`, supports: `Checked ${cost.asOf}.` }]
        : []),
      { href: record.visa.officialUrl, label: "Indian e-Visa application", supports: "Official application and current fee." },
    ],
    related: [
      { href: `/treatments/${procedure.specialty}/${procedure.slug}`, label: `${procedure.name} treatment guide` },
      { href: `/cost/${procedure.costId}-cost-in-india`, label: `${procedure.name} cost in India` },
      { href: `/patients-from/${record.slug}`, label: `Patients from ${record.name}` },
    ],
  };
}

export function cityCorridorModel(countrySlug: string, citySlug: string): PageModel {
  const city = getSourceCity(countrySlug, citySlug);
  const record = getPatientCountry(countrySlug);
  if (!city?.uniqueContent || !city.lastChecked || !record) throw new Error(`Incomplete city ${countrySlug}/${citySlug}`);
  const words = city.uniqueContent.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const quickAnswer = limitWords(words.slice(0, 55).join(" "));
  const rest = words.slice(55).join(" ");
  const routeLines = city.routesToIndia
    .filter((route) => route.direct !== null && route.typicalDuration)
    .map(
      (route) =>
        `${route.from} to ${route.to} is filed as ${route.direct ? "nonstop" : "a connection"}, ${route.typicalDuration}. Checked ${city.lastChecked}.`,
    );
  return {
    kind: "country",
    h1: `Treatment in India from ${city.name}`,
    quickAnswer,
    updated: city.lastChecked,
    showPrice: false,
    showQuote: true,
    quoteHref: "/get-a-free-quote",
    alsoKnownAs: [],
    facts: [
      ...routeLines.map((line, index) => ({ label: `Route ${index + 1}`, value: line })),
      ...(city.visaCentre ? [{ label: "Visa centre", value: `${city.visaCentre.name}, ${city.visaCentre.city}` }] : []),
      ...(city.localSupport ? [{ label: "Local support", value: city.localSupport.detail }] : []),
    ].slice(0, 8),
    sections: rest
      ? [{ id: "city", heading: `What is different about leaving from ${city.name}?`, paragraphs: [rest] }]
      : [],
    faqs: [],
    followups: [],
    todos: [],
    reviewNote: undefined,
    sources: [{ href: record.visa.officialUrl, label: "Indian e-Visa application", supports: "Official application and current fee." }],
    related: [{ href: `/patients-from/${record.slug}`, label: `Patients from ${record.name}` }],
  };
}
