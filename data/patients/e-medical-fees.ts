/**
 * Read from the Government of India country-wise e-Visa fee PDF on 2026-11-25.
 * Document date printed on the PDF: 15 April 2026.
 * A positive number is the published USD fee. "zero" means the cell prints 00.
 * The PDF note only mentions a 3% bank charge. It does not define 00.
 * "absent" means the nationality is not a row in that table.
 */

export const eMedicalFeeSource = "https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf";
export const eVisaApplyUrl = "https://indianvisaonline.gov.in/evisa/tvoa.html";
export const eMedicalFeeDocumentDate = "2026-04-15";
export const eMedicalFeeChecked = "2026-11-25";

export type FeeCell = number | "zero" | "absent";

const absent = [
  "afghanistan",
  "algeria",
  "central-african-republic",
  "chad",
  "dr-congo",
  "egypt",
  "ethiopia",
  "iraq",
  "maldives",
  "nepal",
  "nigeria",
  "somalia",
  "sudan",
  "turkmenistan",
  "yemen",
] as const;

const zero = ["bangladesh", "fiji", "kazakhstan", "mauritius", "mongolia", "myanmar", "seychelles", "south-africa"] as const;

const fee80 = [
  "angola",
  "azerbaijan",
  "bahrain",
  "belgium",
  "botswana",
  "bulgaria",
  "cameroon",
  "czechia",
  "denmark",
  "finland",
  "france",
  "germany",
  "ghana",
  "greece",
  "hungary",
  "ireland",
  "italy",
  "ivory-coast",
  "kenya",
  "kuwait",
  "kyrgyzstan",
  "madagascar",
  "malawi",
  "mozambique",
  "namibia",
  "netherlands",
  "oman",
  "poland",
  "portugal",
  "qatar",
  "romania",
  "rwanda",
  "saudi-arabia",
  "senegal",
  "spain",
  "sweden",
  "switzerland",
  "tajikistan",
  "tanzania",
  "uae",
  "uganda",
  "uzbekistan",
  "zambia",
  "zimbabwe",
  "austria",
  "norway",
] as const;

const special: Record<string, number> = {
  "sri-lanka": 25,
  uk: 129,
};

const cells = new Map<string, FeeCell>();
for (const slug of absent) cells.set(slug, "absent");
for (const slug of zero) cells.set(slug, "zero");
for (const slug of fee80) cells.set(slug, 80);
for (const [slug, fee] of Object.entries(special)) cells.set(slug, fee);

export function eMedicalFee(slug: string): FeeCell | null {
  return cells.get(slug) ?? null;
}

export function visaFromFee(slug: string) {
  const cell = eMedicalFee(slug);
  if (cell === null) return null;
  const source = eMedicalFeeSource;
  const lastChecked = eMedicalFeeChecked;
  if (cell === "absent") {
    return {
      eMedicalEligible: false as boolean | null,
      attendantVisa: false as boolean | null,
      processingNotes: `This nationality is not a row on the country-wise e-Visa fee table dated ${eMedicalFeeDocumentDate}. That table is the list that prices e-Medical and e-Medical Attendant visas. Absence is not a refusal and not permission to travel on another category. Confirm the live form and the Indian mission before anyone books flights.`,
      applyVia: `Check ${eVisaApplyUrl} and the Indian mission. Do not treat a missing row as an approval.`,
      officialUrl: eVisaApplyUrl,
      source,
      lastChecked,
      processingDays: null,
    };
  }
  if (cell === "zero") {
    return {
      eMedicalEligible: null,
      attendantVisa: null,
      processingNotes: `The ${eMedicalFeeDocumentDate} fee table prints 00 for the e-Medical Visa and the e-Medical Attendant Visa. The only note on that PDF is a 3% bank charge. It does not say whether 00 means free or not offered.`,
      applyVia: `Open ${eVisaApplyUrl} and see whether the form offers e-Medical for this passport. Do not copy a fee from a chat.`,
      officialUrl: eVisaApplyUrl,
      source,
      lastChecked,
      processingDays: null,
    };
  }
  return {
    eMedicalEligible: true as boolean | null,
    attendantVisa: true as boolean | null,
    processingNotes: `The country-wise e-Visa fee table dated ${eMedicalFeeDocumentDate} lists an e-Medical Visa fee of USD ${cell} and an e-Medical Attendant fee of USD ${cell}. The application page says to upload a photo and the passport page, pay online, and receive an ETA by email. It does not publish how many days a decision takes.`,
    applyVia: `Apply at ${eVisaApplyUrl} after the hospital invitation letter is ready. Print the ETA for the airline.`,
    officialUrl: eVisaApplyUrl,
    source,
    lastChecked,
    processingDays: null,
  };
}
