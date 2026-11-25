import { z } from "zod";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const httpsUrl = z.string().refine((value) => value.startsWith("https://"), "https URL required");
const note = z
  .string()
  .min(1)
  .refine((value) => !/TODO/i.test(value), "unfinished copy blocks indexing")
  .nullable();
const iata = z.string().regex(/^[A-Z]{3}$/);

export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1).refine((value) => !/TODO/i.test(value)),
});

export const localCostSchema = z.object({
  minUSD: z.number().positive().nullable(),
  maxUSD: z.number().positive().nullable(),
  setting: z.enum(["private", "public"]).nullable(),
  source: note,
  asOf: isoDate.nullable(),
  flyHomeNote: note,
  followUpNote: note,
  /** priced = min/max are a sourced private range. unavailable / long-wait = statement explains that, and the numbers stay null. */
  availability: z.enum(["priced", "unavailable", "long-wait"]).nullable().default(null),
  statement: note.default(null),
  faqs: z.array(faqSchema).default([]),
});

export const routeSchema = z.object({
  from: iata,
  to: iata,
  direct: z.boolean().nullable(),
  typicalDuration: note,
  commonVia: z.array(iata).default([]),
});

export const patientCountrySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  demonym: z.string().min(1),
  region: z.string().min(1),
  wave: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  /** needs-human-check until a person confirms visa and route facts. Indexing waits for verified. */
  status: z.enum(["needs-human-check", "verified"]).default("needs-human-check"),
  languages: z.array(z.string().min(1)).default([]),
  techdrLanguageSupport: z.array(z.string().min(1)).default([]),
  currency: z
    .object({
      code: z.string().regex(/^[A-Z]{3}$/),
      symbol: z.string().min(1),
    })
    .nullable()
    .default(null),
  /** value = local currency units for 1 USD. */
  fxRateToUSD: z.object({
    value: z.number().positive().nullable(),
    asOf: isoDate.nullable(),
    source: note,
  }),
  visa: z.object({
    eMedicalEligible: z.boolean().nullable(),
    attendantVisa: z.boolean().nullable(),
    processingNotes: note,
    applyVia: note,
    officialUrl: httpsUrl,
    /** Specific page that supports the eligibility fact. The apply page can be officialUrl. */
    source: httpsUrl.nullable().default(null),
    lastChecked: isoDate.nullable(),
    processingDays: z
      .object({
        min: z.number().int().positive(),
        max: z.number().int().positive(),
      })
      .nullable(),
  }),
  travel: z.object({
    airports: z.array(z.object({ city: z.string().min(1), iata })).default([]),
    routesToIndia: z.array(routeSchema).default([]),
    lastChecked: isoDate.nullable(),
  }),
  money: z.object({
    paymentMethods: z.array(z.string().min(1)).default([]),
    notes: note,
  }),
  localCareContext: z.object({
    commonReasonsPatientsTravel: z.array(z.string().min(1)).default([]),
    followUpAtHome: note,
  }),
  cultural: z.object({
    foodNotes: note,
    prayerFacilities: note,
    otherNotes: note,
  }),
  techdrContact: z.object({
    whatsapp: note,
    localRepresentative: note,
    hours: note,
  }),
  localCosts: z.record(z.string(), localCostSchema).default({}),
  caseData: z.object({
    patientsGuided: z.number().int().nonnegative().nullable(),
    period: note,
  }),
  embassy: z
    .object({
      name: z.string().min(1),
      url: httpsUrl,
      lastChecked: isoDate,
    })
    .nullable()
    .default(null),
  citations: z
    .array(
      z.object({
        field: z.string().min(1),
        source: httpsUrl,
        lastChecked: isoDate,
      }),
    )
    .default([]),
  soughtTreatments: z
    .array(
      z.object({
        slug: z.string().min(1),
        source: httpsUrl,
        lastChecked: isoDate,
        note: z.string().min(1),
      }),
    )
    .default([]),
  uniqueContent: note,
  faqs: z.array(faqSchema).default([]),
  translatedTo: z.array(z.string()).default([]),
  reviewed: z.object({
    by: note,
    date: isoDate.nullable(),
  }),
});

export const sourceCitySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  country: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  airports: z.array(z.object({ city: z.string().min(1), iata })).min(1),
  routesToIndia: z.array(routeSchema).default([]),
  visaCentre: z
    .object({
      name: z.string().min(1),
      city: z.string().min(1),
      url: httpsUrl.nullable(),
    })
    .nullable(),
  localSupport: z
    .object({
      available: z.boolean(),
      detail: z.string().min(1),
    })
    .nullable(),
  populationNote: note,
  uniqueContent: note,
  lastChecked: isoDate.nullable(),
});

export const answerFrontmatterSchema = z.object({
  question: z.string().min(1),
  shortAnswer: z.string().min(1),
  countries: z.array(z.string()).default([]),
  treatments: z.array(z.string()).default([]),
  sources: z.array(z.object({ href: httpsUrl, label: z.string().min(1) })).default([]),
  reviewedBy: z.string().min(1),
  updatedDate: isoDate,
});

export type PatientCountry = z.infer<typeof patientCountrySchema>;
export type SourceCity = z.infer<typeof sourceCitySchema>;
export type LocalCost = z.infer<typeof localCostSchema>;
export type AnswerFrontmatter = z.infer<typeof answerFrontmatterSchema>;
