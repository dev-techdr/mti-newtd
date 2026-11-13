import type { CostId } from "@/data/costs";

export type Faq = { question: string; answer: string };

export type Procedure = {
  slug: string;
  costId: CostId;
  specialty: string;
  name: string;
  card: string;
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
  return [
    {
      name: "Share your reports",
      text: `Send recent notes, imaging and a medicine list for ${procedure.name.toLowerCase()}. A case manager checks that the file is complete before a specialist sees it.`,
    },
    {
      name: "Receive opinions and a quote",
      text: "Within 48 hours you get a written plan and an itemised indicative estimate. You can ask for a second opinion before you book flights.",
    },
    {
      name: "Get the visa invitation letter",
      text: "When you accept a plan, the partner hospital issues an invitation letter for your Indian medical visa application. Visa rules still have to be checked on the official portal.",
    },
    {
      name: "Arrive and be admitted",
      text: `Airport pickup is arranged. Hospital stay for this plan is usually ${procedure.hospitalStay}. An interpreter joins you if you requested one.`,
    },
    {
      name: "Recover and follow up online",
      text: `Most travellers remain in India for ${procedure.totalStay}. After you fly home, scheduled video reviews continue with the treating team.`,
    },
  ];
}
