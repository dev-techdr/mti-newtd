import type { CostId } from "@/data/costs";

export type Faq = { question: string; answer: string };

export type PageKind = "condition" | "procedure" | "emergency";

export type TranslatedFlags = { ar: boolean; fr: boolean; ru: boolean; bn: boolean };

export type QuoteLine = { item: string; amount: string };

export type PatientJourney = {
  name: string;
  country: string;
  consentOnFile: boolean;
  summary: string;
};

export type Procedure = {
  slug: string;
  costId: CostId;
  specialty: string;
  name: string;
  card: string;
  kind?: PageKind;
  translated?: TranslatedFlags;
  alsoKnownAs?: string[];
  sampleQuote?: { lines: QuoteLine[]; note: string };
  dataBox?: { cases: string; medianQuote: string; medianStay: string; period: string };
  journeys?: PatientJourney[];
  description: string;
  answer: string;
  hospitalStay: string;
  totalStay: string;
  success: string;
  recovery: string;
  anaesthesia: string;
  whatIs: string;
  whoNeeds: string[];
  types: { title: string; text: string }[];
  included: string[];
  excluded: string[];
  factors: string[];
  preparation: string[];
  extraDocuments: string[];
  risks: string[];
  timeline: { when: string; text: string }[];
  whyIndia: string[];
  faqs: Faq[];
  related: string[];
  articles: string[];
  howPerformed: string;
  followup: string;
  procedureType: "SurgicalProcedure" | "PercutaneousProcedure" | "NoninvasiveProcedure";
  updated: string;
};

export const sharedExcluded = [
  "International flights and the visa fee",
  "Treatment of an unrelated illness found during the stay",
  "A premium implant, lens, stent or drug unless the written quote names it",
  "Extra hotel nights if discharge is delayed",
];

export function journeySteps(procedure: Procedure) {
  const name = procedure.name;
  return [
    {
      name: "Share your reports",
      text: `Send recent notes, imaging and a medicine list for ${name} before a specialist sees the file.`,
    },
    {
      name: "Receive opinions and a quote",
      text: `A written plan for ${name} is an itemised estimate you can question before you book flights.`,
    },
    {
      name: "Get the visa invitation letter",
      text: `The invitation letter for ${name} supports a medical-visa application. The official portal still decides the visa.`,
    },
    {
      name: "Arrive and be admitted",
      text: `Airport pickup for ${name} is booked after you accept a plan. Time under care is usually ${procedure.hospitalStay}.`,
    },
    {
      name: "Recover and follow up online",
      text: `Most accepted trips for ${name} keep people in India for ${procedure.totalStay}. Video reviews continue after the flight home.`,
    },
  ];
}
