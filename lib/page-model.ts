import { decisionGuides } from "@/data/decision-guides";
import { getCost, money, moneyRange } from "@/data/costs";
import type { CountryPage } from "@/data/countries";
import { costFilled, countryQuickAnswer, fxFilled, routeFilled } from "@/data/patients/assess";
import { marketTreatments } from "@/data/patients/catalog";
import { getPatientCountry } from "@/data/patients/load";
import { costPath, getProcedure, procedurePath, type Procedure } from "@/data/procedures";
import type { Faq } from "@/data/procedures/types";
import { site } from "@/lib/site";

export type Section = { id: string; heading: string; paragraphs: string[]; items?: string[] };

export type PageModel = {
  kind: "condition" | "procedure" | "emergency" | "cost" | "country";
  h1: string;
  quickAnswer: string;
  updated: string;
  showPrice: boolean;
  showQuote: boolean;
  quoteHref?: string;
  price?: { value: string; unit: string; note: string };
  alsoKnownAs: string[];
  facts: { label: string; value: string }[];
  comparison?: { caption: string; headers: string[]; rows: string[][] };
  sections: Section[];
  faqs: Faq[];
  followups: { question: string; href: string; answer: string }[];
  todos: string[];
  sources: { href: string; label: string; supports: string }[];
  sampleQuote?: { lines: { item: string; amount: string }[]; note: string };
  dataNote?: string;
  journeys?: { name: string; country: string; summary: string }[];
  related: { href: string; label: string }[];
  reviewNote?: string;
};

function faqTopic(question: string) {
  const q = question.toLowerCase();
  if (q.includes("visa")) return "visa";
  if (q.includes("companion")) return "companion";
  if (q.includes("pay")) return "pay";
  if (q.includes("not included") || q.includes("flight")) return "excluded";
  if (q.includes("home") || q.includes("follow")) return "home";
  if (q.includes("refus") || q.includes("against")) return "refuse";
  if (q.includes("accredit")) return "accredit";
  if (q.includes("report") || q.includes("record") || q.includes("note")) return "records";
  return q;
}

const sourceNotes = [
  {
    href: "https://portal.nabh.co/Hospitals.aspx",
    label: "NABH Hospital Accreditation Programme",
    supports: "what NABH hospital accreditation is for when a quote names an accredited partner",
  },
  {
    href: "https://portal.nabh.co/images/Standards/NABH%20Hospital%20Accreditation%20Standard%206th%20Edition%20January%202025.pdf",
    label: "NABH Hospital Accreditation Standards, 6th edition, effective 1 January 2025",
    supports: "the hospital standard itself, including its patient-safety chapters",
  },
  {
    href: "https://indianvisaonline.gov.in/evisa/tvoa.html",
    label: "Indian e-Visa application",
    supports: "where you apply for an e-Medical Visa and see the current fee",
  },
  {
    href: "https://indianvisaonline.gov.in/evisa/",
    label: "Official e-Visa categories",
    supports: "that e-Medical Visa and e-Medical Attendant Visa are government categories",
  },
];

export function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function sentencesOf(text: string) {
  return text
    .split(/\n+/)
    .flatMap((line) => line.split(/(?<=[.!?])\s+/))
    .map((item) => item.trim())
    .filter(Boolean);
}

function sentenceName(name: string) {
  return name
    .split(" ")
    .map((word) => (/^[A-Z0-9]{2,6}$/.test(word) ? word : word.charAt(0).toLowerCase() + word.slice(1)))
    .join(" ");
}

function whoHeading(name: string) {
  const short = name.replace(/\s+(surgery|treatment|procedure)$/i, "");
  if (/^[A-Z0-9]{2,6}\b/.test(short)) return `Who needs ${short}?`;
  const spoken = sentenceName(short);
  const article = /^[aeiou]/i.test(spoken) ? "an" : "a";
  return `Who needs ${article} ${spoken}?`;
}

function claim(name: string, line: string) {
  const text = line.trim();
  if (!text) return "";
  if (text.toLowerCase().includes(name.toLowerCase())) return /[.!?]$/.test(text) ? text : `${text}.`;
  const body = text.replace(/[.!?]+$/, "");
  return `${body.charAt(0).toUpperCase()}${body.slice(1)} for ${sentenceName(name)}.`;
}

function absorb(seen: Set<string>, text: string) {
  const kept: string[] = [];
  for (const part of sentencesOf(text)) {
    const words = part.split(/\s+/).filter(Boolean);
    const key = part.toLowerCase();
    if (words.length >= 8 && seen.has(key)) continue;
    if (words.length >= 8) seen.add(key);
    kept.push(part);
  }
  return kept.join(" ");
}

function boundQuickAnswer(name: string, text: string) {
  const parts = sentencesOf(text);
  const chosen = [...parts];
  const count = () => wordCount(chosen.join(" "));
  while (count() > 60 && chosen.length > 1) chosen.pop();
  if (count() > 60) {
    const words = chosen.join(" ").split(/\s+/).filter(Boolean).slice(0, 58);
    chosen.splice(0, chosen.length, `${words.join(" ")}.`);
  }
  if (count() < 40) {
    const pad = `Ask whether ${name} is the right trip before you pay for flights.`;
    if (count() + wordCount(pad) <= 60) chosen.push(pad);
  }
  return chosen.join(" ");
}

function remember(seen: Set<string>, text: string) {
  for (const part of sentencesOf(text)) {
    if (part.split(/\s+/).filter(Boolean).length >= 8) seen.add(part.toLowerCase());
  }
}

function addSection(seen: Set<string>, sections: Section[], name: string, section: Section) {
  const paragraphs = section.paragraphs.map((item) => absorb(seen, item)).filter(Boolean);
  const items = (section.items ?? []).map((item) => absorb(seen, claim(name, item))).filter(Boolean);
  if (!paragraphs.length && !items.length) return;
  sections.push({ ...section, paragraphs, items: items.length ? items : undefined });
}

export function treatmentModel(procedure: Procedure): PageModel {
  const kind = procedure.kind ?? (procedure.slug === "cauda-equina-syndrome" ? "emergency" : "procedure");
  const name = procedure.name;
  const cost = getCost(procedure.costId);
  const range = moneyRange(cost.india);
  const seen = new Set<string>();
  const quickAnswer = boundQuickAnswer(name, procedure.answer);
  remember(seen, quickAnswer);
  const sections: Section[] = [];
  const guide = decisionGuides[procedure.slug];
  const emergency = kind === "emergency";

  if (emergency) {
    addSection(seen, sections, name, {
      id: "what",
      heading: `What is ${name}?`,
      paragraphs: [
        procedure.whatIs,
        `${name} is not a planned medical trip. A visa and a flight do not treat new bladder, bowel or groin symptoms.`,
      ],
    });
    addSection(seen, sections, name, {
      id: "rehab",
      heading: `What does rehabilitation after emergency surgery for ${name} involve?`,
      paragraphs: [
        `Physiotherapy, bladder care and bowel care after ${name} start in the hospital that did the emergency operation.`,
        `TechDr can ask about a later rehabilitation stay for ${name} only after that team says a transfer is safe.`,
      ],
    });
  } else {
    addSection(seen, sections, name, {
      id: "what",
      heading: `What is ${name}?`,
      paragraphs: [procedure.whatIs],
    });
    if (guide && kind === "condition") {
      addSection(seen, sections, name, {
        id: "decision",
        heading: guide.title,
        paragraphs: [guide.criteria[0]],
        items: guide.criteria.slice(1),
      });
    } else if (kind === "condition") {
      addSection(seen, sections, name, {
        id: "without-surgery",
        heading: `Can ${name} be treated without surgery?`,
        paragraphs: [
          `${name} is often managed without an operation when the reports and the symptoms allow watching, medicines or physiotherapy.`,
          `An operation for ${name} is a separate quote, offered only if a specialist says the non-surgical plan has failed or is unsafe.`,
        ],
      });
    } else if (guide) {
      addSection(seen, sections, name, {
        id: "decision",
        heading: guide.title,
        paragraphs: [guide.criteria[0]],
        items: guide.criteria.slice(1),
      });
    }
    addSection(seen, sections, name, {
      id: "who",
      heading: kind === "condition" ? `Why get ${sentenceName(name)} treated in India?` : whoHeading(name),
      paragraphs: [
        kind === "condition"
          ? `An operation for ${name} is considered only when a specialist ties the symptoms to the scan and the non-surgical options are not enough.`
          : `${name} is for people a specialist has already matched to this operation, not for a diagnosis written in a message.`,
      ],
      items: procedure.whoNeeds,
    });
    if (procedure.types.length) {
      addSection(seen, sections, name, {
        id: "types",
        heading: `Which options are discussed for ${name}?`,
        paragraphs: [`The options below are ones a specialist chooses between for ${name}. The written plan should name one.`],
        items: procedure.types.map((item) => `${item.title}: ${item.text}`),
      });
    }
    addSection(seen, sections, name, {
      id: "cost",
      heading: `How much does ${name} cost in India?`,
      paragraphs: [
        `Indicative pricing for ${name} is ${range} ${cost.unit} in ${site.year}. A written quote can sit outside that band.`,
      ],
      items: procedure.factors,
    });
    addSection(seen, sections, name, {
      id: "stay",
      heading: `How long should I stay in India for ${name}?`,
      paragraphs: [
        `Plan on ${procedure.hospitalStay} under clinical care and ${procedure.totalStay} in India for ${name} when the case is straightforward. A complication changes both.`,
      ],
    });
    addSection(seen, sections, name, {
      id: "fly",
      heading: `When can I fly home after ${name}?`,
      paragraphs: [
        `Flying home after ${name} waits for a fitness letter. Do not book the return on the morning of discharge.`,
        procedure.recovery,
      ],
    });
    addSection(seen, sections, name, {
      id: "risks",
      heading: `What are the risks of ${name}?`,
      paragraphs: [`Ask the team which of these risks apply to you before you travel for ${name}. None of them is a personal prediction.`],
      items: procedure.risks,
    });
    addSection(seen, sections, name, {
      id: "prepare",
      heading: `What should I send before a date is discussed for ${name}?`,
      paragraphs: [`The file for ${name} has to be readable before anyone talks about flights.`],
      items: procedure.preparation,
    });
    if (kind === "procedure") {
      addSection(seen, sections, name, {
        id: "included",
        heading: `What should a quote for ${name} list?`,
        paragraphs: [`A quote for ${name} is a list of lines. If a line is missing, it is not included.`],
        items: procedure.included,
      });
    }
  }

  const ownFaqs = procedure.faqs.filter((faq) => !sections.some((section) => section.heading.toLowerCase() === faq.question.toLowerCase()));
  const fillers: Faq[] = emergency
    ? []
    : [
        { question: `Do I need a medical visa for ${name}?`, answer: `Check the official e-Medical Visa page before you buy tickets for ${name}. An invitation letter can be requested after you accept a written plan. It is not the visa.` },
        { question: `Should a companion come with me for ${name}?`, answer: `Bring a companion for ${name} if an anaesthetic, a ward stay or help with walking is likely. Decide that before the flights are booked.` },
        { question: `How do I pay for ${name}?`, answer: `Pay for ${name} by the method on the quote, usually a card or a transfer your bank can document. Do not move the fee through an informal broker.` },
        { question: `What is not included for ${name}?`, answer: `Flights, the visa fee and care of an unrelated illness are outside the quote for ${name} unless a line names them.` },
        { question: `Who sees me after I fly home from ${name}?`, answer: `The doctor at home follows ${name}. Send them the discharge summary, the medicine list and the warning symptoms before you leave the city.` },
        { question: `What if the team refuses ${name}?`, answer: `Do not travel for ${name} if the specialist says it is the wrong next step. TechDr will not replace that refusal with a package.` },
        { question: `Are the hospitals accredited for ${name}?`, answer: `Partner hospitals for ${name} are independent and are described as JCI or NABH accredited. Accreditation is not a promise about your result.` },
        { question: `Can my doctor use the notes from ${name}?`, answer: `Yes. The discharge note for ${name} is written in English so the doctor at home can continue medicines and know what was done.` },
      ];
  const faqs: Faq[] = [];
  const topics = new Set<string>();
  for (const faq of [...ownFaqs, ...fillers]) {
    if (faqs.length >= 12) break;
    if (sections.some((section) => section.heading.toLowerCase() === faq.question.toLowerCase())) continue;
    const topic = faqTopic(faq.question);
    if (topics.has(topic)) continue;
    const answer = absorb(seen, faq.answer);
    if (!answer) continue;
    topics.add(topic);
    faqs.push({ question: faq.question, answer });
  }

  const followups = (emergency
    ? [
        { question: "What do I do tonight?", href: "#what", answer: `Go to the nearest emergency department for ${name}. Do not open a quote form instead.` },
        { question: "When is rehabilitation possible?", href: "#rehab", answer: `Rehabilitation for ${name} is discussed only after emergency surgery and a written clearance to travel.` },
      ]
    : [
        { question: `What does ${name} cost?`, href: costPath(procedure.costId), answer: `The cost page for ${name} shows the India, USA and UK bands and what a quote should list.` },
        { question: `How long is ${name}?`, href: "#stay", answer: `The stay section for ${name} gives the usual time under care and the usual time in India.` },
        { question: `Is ${name} safe to plan from abroad?`, href: "#risks", answer: `Safety for ${name} depends on the reports, the hospital accreditation and whether you are well enough to fly.` },
        { question: "Which visa applies?", href: "/medical-visa-india", answer: `The medical visa guide explains the invitation letter. You still confirm ${name} on the official e-Medical Visa page.` },
        { question: "Can a companion come?", href: "#faq", answer: `A companion for ${name} should be decided before tickets, especially if you will have an anaesthetic.` },
        { question: `What is recovery from ${name} like?`, href: "#fly", answer: `Recovery and the flight home for ${name} depend on a fitness letter, not on the hotel checkout.` },
        { question: "Who follows up at home?", href: "#faq", answer: `Your own doctor follows ${name} after landing, using the English discharge summary.` },
      ]
  ).flatMap((item) => {
    const answer = absorb(seen, item.answer);
    return answer ? [{ ...item, answer }] : [];
  });

  const updated = procedure.updated;

  return {
    kind,
    h1: emergency ? name : `${name} in India`,
    quickAnswer,
    updated,
    showPrice: !emergency,
    showQuote: !emergency,
    quoteHref: `/get-a-free-quote?procedure=${procedure.slug}`,
    price: emergency
      ? undefined
      : { value: range, unit: cost.unit, note: `Planning range for ${name} in ${site.year}. A written quote follows your reports.` },
    alsoKnownAs: procedure.alsoKnownAs ?? [],
    facts: emergency
      ? [
          { label: "What to do now", value: "Go to the nearest emergency department, immediately" },
          { label: "Travel", value: "Do not fly while bladder, bowel or groin symptoms are new" },
          { label: "Rehabilitation", value: "Only after local surgery, measured in days the unit writes down" },
        ]
      : [
          { label: "Indicative cost", value: `${range} ${cost.unit}` },
          { label: "Time under care", value: procedure.hospitalStay },
          { label: "Time in India", value: procedure.totalStay },
          { label: "Anaesthesia", value: procedure.anaesthesia },
        ],
    comparison: emergency
      ? undefined
      : {
          caption: `Indicative ${site.year} ranges in USD for ${cost.name}. These are planning bands, not an invoice.`,
          headers: ["Country", "Indicative range"],
          rows: [
            ["India", `${range} ${cost.unit}`],
            ["United States", moneyRange(cost.usa, cost.usaLabel)],
            ["United Kingdom", moneyRange(cost.uk, cost.ukLabel)],
          ],
        },
    sections,
    faqs,
    followups,
    todos: [],
    sources: sourceNotes.map((item) => ({
      ...item,
      supports: `This source supports ${item.supports} for ${sentenceName(name)}.`,
    })),
    sampleQuote: procedure.sampleQuote?.lines.length ? procedure.sampleQuote : undefined,
    dataNote: procedure.dataBox
      ? `Across ${procedure.dataBox.cases} cases TechDr coordinated in ${procedure.dataBox.period}, the median written quote for ${name} was ${procedure.dataBox.medianQuote} and the median stay in India was ${procedure.dataBox.medianStay}.`
      : undefined,
    journeys: (procedure.journeys ?? []).filter((item) => item.consentOnFile),
    related: procedure.related.flatMap((slug) => {
      const item = getProcedure(slug);
      return item ? [{ href: procedurePath(item), label: item.name }] : [];
    }),
  };
}

export function costModel(procedure: Procedure): PageModel {
  const name = procedure.name;
  const cost = getCost(procedure.costId);
  const range = moneyRange(cost.india);
  const seen = new Set<string>();
  const quickAnswer = boundQuickAnswer(
    name,
    `The indicative ${site.year} range for ${name} is ${range} ${cost.unit}. A written quote after your reports can sit outside that band, and the table is not an invoice for ${name}.`,
  );
  remember(seen, quickAnswer);
  const sections: Section[] = [];
  addSection(seen, sections, name, {
    id: "range",
    heading: `What is the indicative range for ${name}?`,
    paragraphs: [`Use ${range} ${cost.unit} as the planning band for ${name} in ${site.year}. Your quote is a separate document.`],
  });
  addSection(seen, sections, name, {
    id: "included",
    heading: `What should I look for on a quote for ${name}?`,
    paragraphs: [
      `On a quote for ${name}, look for separate lines for the operation or consultation, any named device, the bed days, medicines in hospital and the tests.`,
      `If a line is missing from the quote for ${name}, do not assume it is included.`,
    ],
  });
  addSection(seen, sections, name, {
    id: "excluded",
    heading: `What usually sits outside the price of ${name}?`,
    paragraphs: [
      `Flights, the visa fee, a companion’s hotel and treatment of an unrelated illness sit outside the price of ${name} unless the quote lists them.`,
    ],
  });
  addSection(seen, sections, name, {
    id: "moves",
    heading: `What moves the price of ${name}?`,
    paragraphs: [`The price of ${name} moves with the reports, the device or drug that is named, extra days and a second procedure.`],
    items: procedure.factors,
  });
  const clinical = procedurePath(procedure);
  const faqs: Faq[] = [
    { question: `Is the India band for ${name} a final bill?`, answer: `No. The India band for ${name} is a planning range. The bill follows the written quote and what actually happens in hospital.` },
    { question: `Why could ${name} cost more than the band?`, answer: `${name} costs more when the stay is longer, the device is different, or a second problem is found after admission.` },
    { question: `Are home medicines inside the ${name} range?`, answer: `Medicines after you fly home are not inside the ${name} range unless a supply count is written down.` },
    { question: `Does the US column price ${name} for me?`, answer: `The US column is a published comparison band for ${name}, not a bill from an American hospital and not your Indian invoice.` },
    { question: `Is a companion’s hotel inside the ${name} range?`, answer: `No. Budget the companion’s room outside the ${name} range unless the quote has a hotel line.` },
    { question: `Will I pay a deposit for ${name}?`, answer: `A deposit for ${name}, if one is asked, should be on the quote with the refund rule. Do not pay an unnamed account.` },
    { question: `Which currency is used for ${name}?`, answer: `Ranges for ${name} on this page are in US dollars. The hospital quote should state its own currency.` },
    { question: `Where are the clinical risks of ${name}?`, answer: `The clinical risks, the stay and who ${name} is for are on the treatment guide, not repeated as a price claim here.` },
  ].map((faq) => ({ ...faq, answer: absorb(seen, faq.answer) })).filter((faq) => faq.answer);

  return {
    kind: "cost",
    h1: `${procedure.card} cost in India in ${site.year}`,
    quickAnswer,
    updated: procedure.updated,
    showPrice: true,
    showQuote: true,
    quoteHref: `/get-a-free-quote?procedure=${procedure.slug}`,
    price: { value: range, unit: cost.unit, note: `Planning range for ${name} in ${site.year}. The table is not an invoice.` },
    alsoKnownAs: [],
    facts: [
      { label: "India", value: `${range} ${cost.unit}` },
      { label: "United States", value: moneyRange(cost.usa, cost.usaLabel) },
      { label: "United Kingdom", value: moneyRange(cost.uk, cost.ukLabel) },
      { label: "Time under care", value: procedure.hospitalStay },
      { label: "Time in India", value: procedure.totalStay },
    ],
    comparison: {
      caption: `Indicative ${site.year} USD comparison for ${cost.name}.`,
      headers: ["Country", "Indicative range"],
      rows: [
        ["India", `${range} ${cost.unit}`],
        ["United States", moneyRange(cost.usa, cost.usaLabel)],
        ["United Kingdom", moneyRange(cost.uk, cost.ukLabel)],
      ],
    },
    sections,
    faqs,
    followups: [
      { question: `What is ${name} clinically?`, href: clinical, answer: `The treatment guide explains what ${name} is, the risks and the recovery.` },
      { question: "Which visa applies?", href: "/medical-visa-india", answer: `Visa rules for a trip built around ${name} are confirmed on the official e-Medical Visa page.` },
      { question: "What should I send?", href: clinical, answer: `Send the reports named on the treatment guide before asking for a final quote for ${name}.` },
    ],
    todos: [],
    sources: sourceNotes.slice(0, 2).map((item) => ({
      ...item,
      supports: `This source supports ${item.supports} for ${sentenceName(name)}.`,
    })),
    related: [{ href: procedurePath(procedure), label: `${name} treatment guide` }],
  };
}

function localFromUsd(usd: number, rate: number, symbol: string) {
  return `${symbol}${Math.round(usd * rate).toLocaleString("en-US")}`;
}

export function countryModel(country: CountryPage): PageModel {
  const record = getPatientCountry(country.slug);
  if (!record) throw new Error(`No patient record for ${country.slug}`);
  const seen = new Set<string>();
  const quickAnswer = boundQuickAnswer(country.name, countryQuickAnswer(record));
  remember(seen, quickAnswer);
  const sections: Section[] = [];
  const blocks: [string, string, string][] = [
    ["flights", `Which flights do people from ${country.name} actually use?`, country.flights],
    ["visa", `What visa should a ${country.adjective} passport holder check?`, country.visa],
    ["language", `Which languages can the case team use for patients from ${country.name}?`, country.language],
    ["money", `Which currency and payment methods work from ${country.name}?`, country.money],
    ["treatments", `Which treatments do families from ${country.name} usually ask about?`, country.treatments],
    ["culture", `What practical arrangements matter for patients from ${country.name}?`, country.culture],
  ];
  for (const [id, heading, body] of blocks) {
    addSection(seen, sections, country.name, { id, heading, paragraphs: [body] });
  }
  if (record.uniqueContent) {
    addSection(seen, sections, country.name, {
      id: "country-notes",
      heading: `What else is specific to patients from ${country.name}?`,
      paragraphs: [record.uniqueContent],
    });
  }
  const readyRoutes = record.travel.routesToIndia.filter((route) => routeFilled(route));
  if (readyRoutes.length && record.travel.lastChecked) {
    addSection(seen, sections, country.name, {
      id: "routes",
      heading: `Which checked routes run from ${country.name} to India?`,
      paragraphs: readyRoutes.map(
        (route) =>
          `${route.from} to ${route.to} is ${route.direct ? "nonstop" : "a connection"} and is filed as ${route.typicalDuration}. Checked ${record.travel.lastChecked}.`,
      ),
    });
  }
  if (record.localCareContext.commonReasonsPatientsTravel.length && record.localCareContext.followUpAtHome) {
    addSection(seen, sections, country.name, {
      id: "why-travel",
      heading: `Why do patients from ${country.name} plan treatment away from home?`,
      paragraphs: [record.localCareContext.followUpAtHome],
      items: record.localCareContext.commonReasonsPatientsTravel,
    });
  }
  const readyCosts = Object.entries(record.localCosts).filter(([, cost]) => costFilled(cost));
  let comparison: PageModel["comparison"];
  const currency = record.currency;
  if (readyCosts.length && currency && fxFilled(record.fxRateToUSD) && record.fxRateToUSD.value && record.fxRateToUSD.asOf) {
    const rate = record.fxRateToUSD.value;
    const rows = readyCosts.flatMap(([slug, cost]) => {
      const procedure = getProcedure(slug);
      if (!procedure || cost.minUSD === null || cost.maxUSD === null) return [];
      const india = getCost(procedure.costId).india;
      const local = `${money(cost.minUSD)}–${money(cost.maxUSD)} (${localFromUsd(cost.minUSD, rate, currency.symbol)}–${localFromUsd(cost.maxUSD, rate, currency.symbol)})`;
      return [[marketTreatments.find((item) => item.slug === slug)?.label ?? procedure.name, moneyRange(india), local]];
    });
    if (rows.length) {
      comparison = {
        caption: `Sourced private ranges in ${country.name} against the India planning range. FX ${record.fxRateToUSD.asOf}. Not a quote.`,
        headers: ["Treatment", "India planning range", `${country.name} private`],
        rows,
      };
    }
  }
  const faqs: Faq[] = [];
  for (const faq of [...country.faqs, ...record.faqs]) {
    if (faqs.length >= 12) break;
    const answer = absorb(seen, faq.answer);
    if (!answer) continue;
    faqs.push({ question: faq.question, answer });
  }
  const facts = [
    { label: "Languages", value: record.techdrLanguageSupport.join(", ") },
    ...(record.currency ? [{ label: "Currency", value: `${record.currency.code} (${record.currency.symbol})` }] : []),
  ];
  if (record.visa.eMedicalEligible !== null) {
    facts.push({
      label: "Visa eligibility",
      value: `${record.visa.eMedicalEligible ? "e-Medical route listed" : "e-Medical route not listed"}${record.visa.lastChecked ? `, checked ${record.visa.lastChecked}` : ""}`,
    });
  }
  if (record.travel.airports.length) {
    facts.unshift({ label: "Airports", value: record.travel.airports.map((item) => `${item.iata} ${item.city}`).join(", ") });
  }
  if (record.money.paymentMethods.length) facts.push({ label: "Payment", value: record.money.paymentMethods.join(", ") });
  return {
    kind: "country",
    h1: `Medical Treatment in India for Patients from ${country.name}`,
    quickAnswer,
    updated: record.reviewed.date ?? "2026-11-13",
    showPrice: false,
    showQuote: false,
    alsoKnownAs: [],
    facts: facts.filter((item) => item.value.trim()),
    comparison,
    sections,
    faqs,
    followups: [],
    todos: [],
    ...(record.reviewed.by
      ? { reviewNote: `Reviewed by ${record.reviewed.by}${record.reviewed.date ? ` on ${record.reviewed.date}` : ""}.` }
      : {}),
    sources: [
      { href: record.visa.officialUrl, label: "Indian e-Visa application", supports: "How to apply and the current fee on the form." },
      ...(record.visa.source
        ? [{ href: record.visa.source, label: "e-Visa fee table", supports: `Eligibility checked ${record.visa.lastChecked ?? "on the file"}.` }]
        : []),
      ...(record.embassy ? [{ href: record.embassy.url, label: record.embassy.name, supports: `Mission page checked ${record.embassy.lastChecked}.` }] : []),
    ],
    related: [
      { href: "/patients-from", label: "All patient countries" },
      { href: "/medical-visa-india", label: "India medical visa guide" },
      { href: "/get-a-free-quote", label: "Request a written quote" },
    ],
  };
}

export function pageText(model: PageModel) {
  return [
    model.h1,
    model.quickAnswer,
    model.alsoKnownAs.length ? `Also known as ${model.alsoKnownAs.join(", ")}.` : "",
    model.price ? `${model.price.value} ${model.price.unit}. ${model.price.note}` : "",
    ...model.facts.map((fact) => `${fact.label}. ${fact.value}.`),
    model.comparison?.caption ?? "",
    ...(model.comparison?.rows.flat() ?? []),
    ...model.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.items ?? [])]),
    ...model.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ...model.followups.flatMap((item) => [item.question, item.answer]),
    ...model.todos,
    model.dataNote ?? "",
    model.sampleQuote?.note ?? "",
    ...(model.sampleQuote?.lines.map((line) => `${line.item}. ${line.amount}.`) ?? []),
    ...(model.journeys ?? []).map((item) => `${item.name} from ${item.country}. ${item.summary}`),
    ...model.sources.map((item) => item.supports),
  ]
    .filter(Boolean)
    .join("\n");
}

export function longSentences(text: string) {
  return sentencesOf(text).filter((item) => wordCount(item) >= 8);
}
