/**
 * Draft clusters. A record is added here only after its fields are real.
 * Route files for these lists are in recycle/worldwide-routes until a list has at least one record.
 * Cache Components rejects a generateStaticParams that returns nothing.
 */

export type WorldwideDraft = {
  slug: string;
  title: string;
  cluster:
    | "test"
    | "technology"
    | "comparison"
    | "best-country"
    | "glossary"
    | "package"
    | "answer"
    | "destination-specialty"
    | "destination-city"
    | "destination-cost";
  destination?: string;
  specialty?: string;
  procedure?: string;
};

export const tests: WorldwideDraft[] = [];
export const technologies: WorldwideDraft[] = [];
export const comparisons: WorldwideDraft[] = [];
export const bestCountryGuides: WorldwideDraft[] = [];
export const glossaryTerms: WorldwideDraft[] = [];
export const packages: WorldwideDraft[] = [];
export const answers: WorldwideDraft[] = [];
export const destinationSpecialties: WorldwideDraft[] = [];
export const destinationCities: WorldwideDraft[] = [];
export const destinationCosts: WorldwideDraft[] = [];

export const toolDrafts = [
  "cost-estimator",
  "trip-planner",
  "fly-home-calculator",
  "bmi-bariatric",
  "ivf-cost-planner",
  "currency-converter",
  "visa-checklist",
  "recovery-timeline",
] as const;
