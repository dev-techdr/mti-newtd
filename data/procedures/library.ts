import type { CostRecord } from "@/data/costs";
import type { Procedure } from "./types";
import type { Band } from "./library-types";
import { libraryRows } from "./library-rows";
import { catalogProcedures } from "./catalog";
import { finalProcedures } from "./final";
import { heartProcedures } from "./heart";
import { moreProcedures } from "./more";
import { primaryProcedures } from "./orthopedic";
import { otherProcedures } from "./eyes";
import { transplantProcedures } from "./transplant";

const updated = "2026-11-13";

const published = [
  ...primaryProcedures,
  ...heartProcedures,
  ...transplantProcedures,
  ...otherProcedures,
  ...moreProcedures,
  ...finalProcedures,
  ...catalogProcedures,
];

const reservedSlugs = new Set(published.map((item) => item.slug));
const reservedCostIds = new Set(published.map((item) => item.costId));

type Profile = {
  india: readonly [number, number];
  usa: readonly [number, number];
  uk: readonly [number, number];
  usaLabel?: string;
  ukLabel?: string;
  unit: string;
  stayH: string;
  stayT: string;
  anaesthesia: string;
  procedureType: Procedure["procedureType"];
  recovery: string;
  success: string;
  note: string;
  included: string[];
  excluded: string[];
  risks: string[];
};

const profiles: Record<Band, Profile> = {
  med: {
    india: [500, 1800],
    usa: [2000, 8000],
    uk: [1200, 4000],
    unit: "per plan",
    stayH: "Outpatient review",
    stayT: "3–7 days",
    anaesthesia: "Usually none. A procedure is quoted separately if a specialist advises one.",
    procedureType: "NoninvasiveProcedure",
    recovery: "Many people leave with a medicine plan or a decision to watch, rather than an operation date.",
    success: "The useful result is a diagnosis and a written plan. A cure is not promised.",
    note: "If an operation is appropriate, it is a separate quote.",
    included: ["The consultation and the tests named in the quote", "An English summary for the doctor at home", "A statement of whether an operation is advised"],
    excluded: ["An operation, device or drug cycle unless it is a line in the quote", "Long-term medicines after you fly home"],
    risks: ["A plan that changes once the full scans are seen", "Incidental findings that need another specialist", "Travel that was unnecessary if medicines or physiotherapy are the right next step"],
  },
  endo: {
    india: [800, 2500],
    usa: [4000, 15000],
    uk: [2500, 7000],
    unit: "per procedure",
    stayH: "Day care or 1 night",
    stayT: "2–5 days",
    anaesthesia: "Sedation or local anaesthesia",
    procedureType: "PercutaneousProcedure",
    recovery: "Sore throat, bloating or puncture-site soreness usually settles in days. A complication can mean a longer stay.",
    success: "A scope can diagnose and sometimes treat in the same sitting. It does not replace surgery when the findings say surgery is required.",
    note: "A therapeutic step found during the test can change the price.",
    included: ["The procedure named in the quote", "Sedation and a short observation period", "An English report"],
    excluded: ["A later operation the findings lead to", "Repeat procedures"],
    risks: ["Bleeding, perforation or a reaction to sedation", "A missed lesion", "The need to convert the plan to surgery"],
  },
  minor: {
    india: [1500, 4000],
    usa: [8000, 20000],
    uk: [4000, 10000],
    unit: "per procedure",
    stayH: "Day care or 1–2 nights",
    stayT: "5–10 days",
    anaesthesia: "Local or general anaesthesia, as the quote states",
    procedureType: "SurgicalProcedure",
    recovery: "Desk work is often possible within one to two weeks. Heavy effort waits until the wound is quiet.",
    success: "Suitable cases usually solve the mechanical problem the operation was for. Recurrence and incomplete relief both happen.",
    note: "A larger finding during surgery can move the case into a different quote.",
    included: ["The operation named in the quote", "Standard anaesthesia and the nights written down", "An English discharge summary"],
    excluded: ["Treatment of a second, unrelated problem", "Revision surgery"],
    risks: ["Bleeding, infection and a wound problem", "Injury to a nearby nerve, vessel or organ", "The symptom returning"],
  },
  op: {
    india: [2500, 6000],
    usa: [12000, 30000],
    uk: [6000, 15000],
    unit: "per operation",
    stayH: "2–5 days",
    stayT: "7–14 days",
    anaesthesia: "General anaesthesia",
    procedureType: "SurgicalProcedure",
    recovery: "Walking usually starts early. Driving, lifting and a long flight wait for a fitness letter.",
    success: "The operation aims at the problem named in the consent. It is not a guarantee of pain relief or cure.",
    note: "An extra night, a drain or a change of technique is written into the final bill.",
    included: ["The operation named in the quote", "Standard anaesthesia, in-hospital medicines and the bed days written down", "An English discharge summary"],
    excluded: ["A second operation decided only after admission", "Rehabilitation and medicines after the flight home unless a count is written down"],
    risks: ["Bleeding, infection and anaesthetic complications", "Injury to nearby structures", "A result that is incomplete and needs further care"],
  },
  major: {
    india: [4500, 9000],
    usa: [25000, 60000],
    uk: [12000, 28000],
    unit: "per operation",
    stayH: "4–8 days",
    stayT: "2–3 weeks",
    anaesthesia: "General anaesthesia",
    procedureType: "SurgicalProcedure",
    recovery: "Hospital walking starts with help. Full recovery is measured in weeks, and a flight needs a fitness letter.",
    success: "Published series describe a range of results. Your scan, your fitness and whether the full plan is finished decide the outcome.",
    note: "Implants, extra levels and intensive care move the price.",
    included: ["The operation named in the quote", "Standard anaesthesia, in-hospital medicines and the bed days written down", "An English discharge summary and the implant card if a device is used"],
    excluded: ["A premium implant unless it is named", "Revision surgery and treatment of an unrelated illness"],
    risks: ["Bleeding, infection, clots and anaesthetic complications", "Nerve, vessel or organ injury", "The need for a further operation"],
  },
  complex: {
    india: [8000, 16000],
    usa: [40000, 100000],
    uk: [20000, 45000],
    unit: "per operation",
    stayH: "5–10 days",
    stayT: "2–4 weeks",
    anaesthesia: "General anaesthesia",
    procedureType: "SurgicalProcedure",
    recovery: "Intensive care is common for a day or more. A companion should travel. The flight home waits for a fitness letter.",
    success: "These operations are for selected anatomy. The team can refuse the case, or stop at a safer partial result.",
    note: "A long intensive-care stay is not inside a short package.",
    included: ["The operation named in the quote", "The intensive-care days written in the quote", "An English operation note and discharge summary"],
    excluded: ["Extra intensive-care days beyond the quote", "Radiotherapy, drugs or a second-stage operation unless listed"],
    risks: ["Stroke, bleeding and infection", "A deficit in speech, movement, vision or organ function", "The need to return to theatre"],
  },
  device: {
    india: [4000, 14000],
    usa: [20000, 70000],
    uk: [10000, 30000],
    unit: "per device named in the quote",
    stayH: "1–4 days",
    stayT: "7–14 days",
    anaesthesia: "Local anaesthesia with sedation, or general anaesthesia if the quote says so",
    procedureType: "SurgicalProcedure",
    recovery: "The wound is small compared with the follow-up. Programming, wound checks and a device card matter more than the scar.",
    success: "The device works only if it is the right device for the diagnosis and someone at home can follow it.",
    note: "The quote has to name the device. An unnamed implant is not a specification.",
    included: ["The device category named in the quote", "Implantation and an in-hospital check", "The device card and an English summary"],
    excluded: ["A different brand or a later generator change", "Remote-monitoring subscriptions after you fly home"],
    risks: ["Infection of the device", "Lead or device movement", "A device that needs repositioning or removal"],
  },
  premium: {
    india: [20000, 38000],
    usa: [70000, 150000],
    uk: [30000, 55000],
    unit: "per valve procedure",
    stayH: "3–6 days",
    stayT: "10–18 days",
    anaesthesia: "Local anaesthesia with sedation, or general anaesthesia if the quote says so",
    procedureType: "PercutaneousProcedure",
    recovery: "The groin puncture and the new valve are both watched. A surgical valve remains the right operation for some anatomies.",
    success: "A catheter valve can avoid an open chest in selected patients. It is not suitable for every valve, and the valve system has to be named.",
    note: "The quote has to name the valve. An unnamed imported valve is not a specification.",
    included: ["The valve system named in the quote", "The catheter procedure and the nights written down", "An echo before discharge and an English summary"],
    excluded: ["A surgical valve replacement if the catheter plan is not possible, unless the quote explains that switch", "A second valve"],
    risks: ["Stroke, bleeding and injury to the artery", "A leak beside the valve", "The need to convert to open surgery"],
  },
  robot: {
    india: [5500, 11000],
    usa: [30000, 70000],
    uk: [15000, 32000],
    unit: "per operation",
    stayH: "3–6 days",
    stayT: "10–18 days",
    anaesthesia: "General anaesthesia",
    procedureType: "SurgicalProcedure",
    recovery: "The cuts are smaller. The operation is not minor. Recovery still follows the joint, organ or tumour being treated.",
    success: "A robot does not replace the surgeon and does not guarantee a better result than a well-done open or standard keyhole operation.",
    note: "The quote has to say whether robotic equipment is included.",
    included: ["The operation named in the quote", "Robotic equipment only if the quote says so", "An English discharge summary"],
    excluded: ["A switch to an open operation billed as if the robot fee still applies without explanation", "Revision surgery"],
    risks: ["The usual risks of that operation", "Conversion to an open approach", "Positioning injury or a longer anaesthetic"],
  },
  cancer: {
    india: [5000, 11000],
    usa: [25000, 70000],
    uk: [12000, 30000],
    unit: "surgery package",
    stayH: "4–8 days",
    stayT: "2–3 weeks",
    anaesthesia: "General anaesthesia",
    procedureType: "SurgicalProcedure",
    recovery: "Pathology after surgery often changes the drug or radiotherapy plan. That later care is not automatic.",
    success: "Surgery removes what the scans and the operation can define. Cure depends on the cancer, the stage and whether the rest of the plan is completed.",
    note: "Drugs and radiotherapy are separate quotes.",
    included: ["The operation named in the quote", "Hospital stay and standard in-hospital medicines", "Histopathology of the tissue removed"],
    excluded: ["Chemotherapy, immunotherapy, targeted drugs and radiotherapy unless separately contracted", "Reconstruction unless it is a line in the quote"],
    risks: ["Bleeding, infection and a leak or collection", "Positive margins or nodes that change the next treatment", "The cancer can still recur"],
  },
  drug: {
    india: [1500, 8000],
    usa: [8000, 40000],
    uk: [4000, 18000],
    unit: "per cycle",
    stayH: "Day care, unless the drug needs admission",
    stayT: "Depends on the number of cycles",
    anaesthesia: "None for most drug treatments. A line insertion, if needed, is a separate small procedure.",
    procedureType: "NoninvasiveProcedure",
    recovery: "Side-effects depend on the drug. Blood counts can drop. The next cycle waits on those results.",
    success: "Response is judged on scans and blood tests, not on a package name. Some drugs cost more than this band once the product is named.",
    note: "The quote has to name the drug and the number of cycles.",
    included: ["The cycles and the drug category named in the quote", "Standard day-care administration and routine bloods for those cycles", "An English summary for the oncologist at home"],
    excluded: ["Extra cycles", "A different drug substituted because of cost", "Radiotherapy and surgery"],
    risks: ["Infection while blood counts are low", "Organ-specific side effects of the named drug", "A response that is partial or absent"],
  },
  radio: {
    india: [3500, 9000],
    usa: [15000, 40000],
    uk: [8000, 20000],
    unit: "per course",
    stayH: "Outpatient visits, or a short stay if sedation is used",
    stayT: "1–3 weeks, depending on the number of fractions",
    anaesthesia: "Usually none. Sedation or a frame is used for some radiosurgery.",
    procedureType: "NoninvasiveProcedure",
    recovery: "Fatigue and local irritation are common. The tumour response is judged weeks to months later.",
    success: "Radiation can control selected tumours. It is not surgery and it is not the right tool for every cancer.",
    note: "The number of sessions has to be in the quote. A long daily course may be easier at home.",
    included: ["The technique and the session count named in the quote", "Planning scans for that course", "An English treatment summary"],
    excluded: ["Surgery and drug treatment", "A second course"],
    risks: ["Skin, mucosa or organ irritation in the treated field", "Swelling that can matter inside the skull", "Incomplete control of the tumour"],
  },
  cell: {
    india: [40000, 80000],
    usa: [400000, 500000],
    uk: [200000, 350000],
    usaLabel: "USD 400,000+",
    ukLabel: "USD 200,000+",
    unit: "per treatment",
    stayH: "Several weeks nearby",
    stayT: "Often 4–8 weeks",
    anaesthesia: "None for the infusion. Collection of cells may use a line.",
    procedureType: "NoninvasiveProcedure",
    recovery: "Low blood counts and a watch for serious immune side effects mean you stay near the unit.",
    success: "CAR-T is for selected blood cancers after other treatment. It is not a general cancer package and it does not guarantee remission.",
    note: "The product name and the weeks of monitoring have to be in the quote.",
    included: ["The cell product named in the quote", "The inpatient monitoring window written down", "An English handover for the haematologist at home"],
    excluded: ["A second infusion", "Treatment of unrelated organ failure", "Lifelong follow-up at home"],
    risks: ["Cytokine release and neurological side effects", "Severe infection", "The cancer not responding"],
  },
  eye: {
    india: [600, 2000],
    usa: [2500, 8000],
    uk: [1500, 4000],
    unit: "per eye",
    stayH: "Day care",
    stayT: "3–7 days",
    anaesthesia: "Local anaesthesia, with sedation if the quote says so",
    procedureType: "SurgicalProcedure",
    recovery: "Drops and a day-1 check come before a flight. Vision can keep changing for days to weeks.",
    success: "The result depends on the cornea, the retina and the lens that was agreed. Glasses may still be needed.",
    note: "The lens, laser or graft has to be named. A thin cornea can make laser the wrong operation.",
    included: ["The eye procedure named in the quote", "The standard lens or laser named in the quote", "The first-day check and an English note"],
    excluded: ["A premium lens unless it is named", "Treatment of a separate retinal disease", "Enhancement surgery"],
    risks: ["Infection, inflammation and pressure problems", "A residual glasses prescription", "The need for a further eye operation"],
  },
  dental: {
    india: [500, 2500],
    usa: [2000, 8000],
    uk: [1500, 5000],
    unit: "per plan",
    stayH: "Dental chair",
    stayT: "5–10 days, or a second trip if healing is staged",
    anaesthesia: "Local anaesthesia",
    procedureType: "SurgicalProcedure",
    recovery: "A soft diet is usual. A final crown or bridge often waits for healing.",
    success: "Teeth and implants fail more often with smoking, uncontrolled diabetes and untreated gum disease.",
    note: "Fixture, abutment, crown and any graft should be separate lines.",
    included: ["The dental step named in the quote", "Local anaesthesia and a post-operative check", "The crown or tooth only if a line says so"],
    excluded: ["Bone graft or sinus lift unless listed", "A second trip’s laboratory work unless listed"],
    risks: ["Infection, implant failure and nerve numbness", "A bite that needs adjustment", "Sinus problems with upper back teeth"],
  },
  arch: {
    india: [4500, 12000],
    usa: [20000, 40000],
    uk: [10000, 22000],
    unit: "per jaw",
    stayH: "Dental chair or 1 night",
    stayT: "7–14 days, often with a later visit for final teeth",
    anaesthesia: "Local anaesthesia, sedation if requested and safe",
    procedureType: "SurgicalProcedure",
    recovery: "Provisional teeth may be fitted early. Final teeth usually wait for healing.",
    success: "Full-arch teeth depend on bone, bite and hygiene. They are not a same-morning promise for every jaw.",
    note: "The quote has to say which jaw, how many fixtures, and whether the final teeth are included.",
    included: ["The fixtures named in the quote", "Provisional teeth only if a line says so", "A written implant system for the dentist at home"],
    excluded: ["The opposite jaw unless listed", "Zygomatic fixtures unless listed", "The final bridge if it is staged"],
    risks: ["Implant failure and infection", "Nerve injury and sinus complications", "A provisional tooth that loosens"],
  },
  fertility: {
    india: [800, 4000],
    usa: [5000, 18000],
    uk: [3000, 9000],
    unit: "per cycle step",
    stayH: "Day care or short monitoring visits",
    stayT: "A few days for a frozen step, about 2–3 weeks for a fresh cycle",
    anaesthesia: "Sedation for egg collection. Many transfers and scans need none.",
    procedureType: "PercutaneousProcedure",
    recovery: "Bloating and spotting can follow stimulation or a transfer. Ovarian hyperstimulation is a reason to delay travel.",
    success: "A pregnancy is not promised. Age-banded live-birth rates are the figures worth reading.",
    note: "TechDr does not arrange surrogacy. Drugs and laboratory add-ons are extra until the quote lists them.",
    included: ["The step named in the quote", "The monitoring written into that step", "An English cycle summary"],
    excluded: ["Drugs unless listed", "Genetic testing, freezing and a later transfer unless listed", "Surrogacy, which TechDr does not arrange"],
    risks: ["No eggs, no embryo or a negative test", "Ovarian hyperstimulation and bleeding", "Multiple pregnancy if more than one embryo is transferred"],
  },
  rehab: {
    india: [800, 2500],
    usa: [4000, 12000],
    uk: [2500, 7000],
    unit: "per programme",
    stayH: "Outpatient, or a day-care admission",
    stayT: "1–3 weeks",
    anaesthesia: "None for therapy. An injection, if added, is a separate consent.",
    procedureType: "NoninvasiveProcedure",
    recovery: "Progress is scored on function, not on a promise to walk or to be pain-free by a date.",
    success: "Rehabilitation helps selected people. It does not reverse every injury, and it does not replace an operation that is actually required.",
    note: "The quote has to say how many sessions and which profession provides them.",
    included: ["The session count named in the quote", "A written home programme", "An English discharge note"],
    excluded: ["Extra weeks", "Surgery, devices and injections unless listed"],
    risks: ["A flare of pain", "Little measurable change", "A problem that should have been an operation or a medicine review instead"],
  },
  dialysis: {
    india: [40, 120],
    usa: [300, 800],
    uk: [200, 500],
    unit: "per session",
    stayH: "A few hours per session",
    stayT: "As many days as the booked sessions require",
    anaesthesia: "None for a routine dialysis session",
    procedureType: "NoninvasiveProcedure",
    recovery: "Blood pressure can fall during a session. Travel is reasonable only if the recent sessions have been stable.",
    success: "Dialysis replaces kidney function for that session. It is not a cure, and a transplant is a different plan.",
    note: "Multiply the session price by the number of sessions. The access operation is a separate quote.",
    included: ["The sessions named in the quote", "Routine in-centre monitoring for those sessions", "A record the nephrologist at home can read"],
    excluded: ["Fistula or catheter surgery unless listed", "A hospital admission for an unstable patient"],
    risks: ["Low blood pressure, bleeding from the access and infection", "Fluid overload if sessions are missed", "A session that has to move into hospital"],
  },
  urgent: {
    india: [8000, 22000],
    usa: [40000, 150000],
    uk: [20000, 80000],
    unit: "per transfer plan",
    stayH: "Local emergency care first",
    stayT: "A move only after a team says it is safe",
    anaesthesia: "Depends on the operation, if one is still required after the patient is stable",
    procedureType: "SurgicalProcedure",
    recovery: "Unstable patients should not board a commercial flight.",
    success: "Outcome depends on how early treatment starts and how stable the patient is. A planned trip is not emergency care.",
    note: "Acute danger needs the nearest emergency hospital. TechDr plans a transfer only after a team says the move is safe.",
    included: ["The planned operation or admission named after the team accepts a stable patient", "The intensive-care days written in that quote", "An English handover"],
    excluded: ["An emergency admission tonight in your own city", "Air ambulance unless a separate contract says so"],
    risks: ["Deterioration during travel", "Disability or death from the underlying emergency", "A plan that is no longer possible by the time you arrive"],
  },
  bmt: {
    india: [18000, 40000],
    usa: [300000, 400000],
    uk: [120000, 200000],
    usaLabel: "USD 300,000+",
    ukLabel: "USD 120,000+",
    unit: "per transplant",
    stayH: "3–6 weeks",
    stayT: "Often 1–3 months nearby",
    anaesthesia: "None for an infusion. A line insertion uses local anaesthesia.",
    procedureType: "NoninvasiveProcedure",
    recovery: "Blood counts fall before they recover. Infection during that window is the reason you stay nearby.",
    success: "Transplant can be the right treatment for selected blood disorders. It can also fail, and graft-versus-host disease is a risk when donor cells are used.",
    note: "A donor, when one is required, must be lawful. Paid donation is refused. Autologous transplants use the patient’s own cells.",
    included: ["The transplant type named in the quote", "The conditioning and the inpatient days written down", "An English summary for the haematologist at home"],
    excluded: ["A second transplant", "Lifelong medicines and care after you fly home", "An unrelated donor search fee unless listed"],
    risks: ["Serious infection and bleeding", "Graft failure or graft-versus-host disease", "The original disease returning"],
  },
  "kidney-tx": {
    india: [14000, 24000],
    usa: [300000, 400000],
    uk: [60000, 90000],
    usaLabel: "USD 300,000+",
    ukLabel: "USD 60,000+",
    unit: "recipient surgery package",
    stayH: "7–12 days",
    stayT: "3–6 weeks",
    anaesthesia: "General anaesthesia",
    procedureType: "SurgicalProcedure",
    recovery: "The new kidney is watched daily at first. Rejection and infection are reasons to stay in the city.",
    success: "A lawful living-donor transplant can free many people from dialysis. The kidney can still reject, and medicines continue at home.",
    note: "A lawful donor and authorisation-committee approval are required. Paid donation is refused. Foreign patients cannot freely receive an Indian deceased-donor organ.",
    included: ["The recipient operation named in the quote", "The donor operation only if the quote has a separate donor line", "The in-hospital medicines for that admission"],
    excluded: ["Paying a donor", "Lifelong immunosuppression unless a short supply is written down", "Dialysis if the kidney is slow to work, beyond the days in the quote"],
    risks: ["Rejection, infection and bleeding", "The kidney not working at once", "The committee declining the donor"],
  },
  "liver-tx": {
    india: [30000, 48000],
    usa: [500000, 600000],
    uk: [100000, 180000],
    usaLabel: "USD 500,000+",
    ukLabel: "USD 100,000+",
    unit: "recipient surgery package",
    stayH: "2–4 weeks",
    stayT: "Often 1–3 months nearby",
    anaesthesia: "General anaesthesia",
    procedureType: "SurgicalProcedure",
    recovery: "Intensive care follows the operation. A companion should plan to stay for weeks, not days.",
    success: "Living-donor liver transplant is a planned operation with real risk to the donor and the recipient. It is not a booking you make while hoping for a public-list organ.",
    note: "A lawful donor and authorisation-committee approval are required. Paid donation is refused. Foreign patients cannot freely receive an Indian deceased-donor organ.",
    included: ["The recipient operation named in the quote", "The donor evaluation and operation only if those lines are written", "Intensive-care days written in the quote"],
    excluded: ["Paying a donor", "A deceased-donor organ that the law does not allow you to receive", "Lifelong medicines after discharge unless a supply is written down"],
    risks: ["Bleeding, bile leak and graft failure", "Risk to a living donor, including serious complications", "The committee saying no"],
  },
  pregnancy: {
    india: [2000, 6000],
    usa: [10000, 30000],
    uk: [5000, 14000],
    unit: "per delivery plan",
    stayH: "2–4 days for an uncomplicated caesarean",
    stayT: "7–14 days if travel is still allowed",
    anaesthesia: "Spinal or general anaesthesia if a caesarean is planned",
    procedureType: "SurgicalProcedure",
    recovery: "A new baby and a surgical wound both need time. A fever, bleeding or a sick newborn changes the flight.",
    success: "The aim is a safe birth. No one can promise the timing or that the pregnancy will stay uncomplicated.",
    note: "Airlines often refuse late pregnancy. Bleeding, pain or a baby in distress needs the nearest hospital, not a flight.",
    included: ["The delivery plan named in the quote", "Routine in-hospital care for those days", "An English birth summary"],
    excluded: ["A neonatal intensive-care stay unless listed", "Care of a separate maternal illness"],
    risks: ["Bleeding and infection", "An unplanned change from a vaginal birth to a caesarean", "A newborn who needs extra care"],
  },
};

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function price(pair: readonly [number, number]) {
  return `${money.format(pair[0])}–${money.format(pair[1])}`;
}

export function slugifyGuide(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function sameGuideLabel(a: string, b: string) {
  const norm = (value: string) =>
    value
      .toLowerCase()
      .replace(/surgery|treatment|procedure|operation/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  return norm(a) === norm(b);
}

function parseExtra(extra = "") {
  const fields: Record<string, string> = {};
  for (const part of extra.split(";").map((item) => item.trim()).filter(Boolean)) {
    const index = part.indexOf(":");
    if (index === -1) continue;
    fields[part.slice(0, index)] = part.slice(index + 1);
  }
  return {
    link: fields.link,
    rel: fields.rel,
    slug: fields.slug,
    also: fields.also?.split(",").map((item) => item.trim()).filter(Boolean) ?? [],
  };
}

export type SectionEntry = { specialty: string; label: string; slug: string };

const taken = new Set(reservedSlugs);
const created = new Set<string>();
const relChecks: { from: string; to: string }[] = [];
const seenEntries = new Set<string>();

export const sectionEntries: SectionEntry[] = [];
export const libraryProcedures: Procedure[] = [];
export const libraryCostRecords: CostRecord[] = [];

function addEntry(specialty: string, label: string, slug: string) {
  const key = `${specialty}|${label.toLowerCase()}|${slug}`;
  if (seenEntries.has(key)) return;
  seenEntries.add(key);
  sectionEntries.push({ specialty, label, slug });
}

function addEntries(specialties: string[], label: string, slug: string) {
  for (const specialty of [...new Set(specialties)]) addEntry(specialty, label, slug);
}

for (const row of libraryRows) {
  const [label, specialty, band, fact, extraText] = row;
  const extra = parseExtra(extraText);
  const specialties = [specialty, ...extra.also.filter((item) => item && item !== specialty)];
  if (extra.link) {
    addEntries(specialties, label, extra.link);
    continue;
  }
  const base = extra.slug ?? slugifyGuide(label);
  if (!extra.slug && (reservedSlugs.has(base) || taken.has(base))) {
    addEntries(specialties, label, base);
    continue;
  }
  if (taken.has(base)) throw new Error(`Duplicate guide slug: ${base}`);
  taken.add(base);
  created.add(base);

  let costId = base;
  if (reservedCostIds.has(costId)) costId = `${base}-plan`;
  if (reservedCostIds.has(costId)) throw new Error(`Cost id clash: ${costId}`);

  const profile = profiles[band];
  const range = price(profile.india);
  const lower = label.toLowerCase();
  const child = specialty === "pediatric-surgery" ? " A parent or legal guardian must travel and consent." : "";
  const advisory = `${profile.note}${child}`;
  const emergency = base === "cauda-equina-syndrome";
  if (extra.rel) relChecks.push({ from: base, to: extra.rel });

  libraryCostRecords.push({
    id: costId,
    name: label,
    india: profile.india,
    usa: profile.usa,
    uk: profile.uk,
    usaLabel: profile.usaLabel,
    ukLabel: profile.ukLabel,
    guide: false,
    unit: profile.unit,
  });

  const articles =
    band === "fertility" || specialty === "ivf-fertility"
      ? ["ivf-in-india-for-foreigners", "whats-included-in-a-medical-tourism-package"]
      : band === "bmt" || band === "kidney-tx" || band === "liver-tx"
        ? ["liver-transplant-donor-rules", "is-medical-treatment-in-india-safe"]
        : band === "cancer" || band === "drug" || band === "radio" || band === "cell" || specialty === "oncology" || specialty === "haematology"
          ? ["cancer-treatment-in-india", "is-medical-treatment-in-india-safe"]
          : ["is-medical-treatment-in-india-safe", "flying-home-after-surgery"];

  const caudaAnswer =
    "Cauda equina syndrome is a surgical emergency. If you have new loss of bladder or bowel control or numbness in the groin, go to the nearest emergency department now — do not wait to travel. Rehabilitation for cauda equina syndrome is planned only after that local operation, and only once a surgeon says travel is safe.";

  libraryProcedures.push({
    slug: base,
    costId,
    specialty,
    name: label,
    card: label,
    kind: emergency ? "emergency" : band === "med" ? "condition" : "procedure",
    alsoKnownAs: base === "lumbar-disc-herniation" ? ["slipped disc"] : undefined,
    description: emergency
      ? "Cauda equina syndrome is a surgical emergency. Go to the nearest emergency department for new bladder, bowel or groin symptoms. Do not wait to travel."
      : `${label} in India: a planning range of ${range} ${profile.unit}. ${advisory} The written quote for ${label} follows your reports.`,
    answer: emergency
      ? caudaAnswer
      : `${label} in India has an indicative range of ${range} ${profile.unit}. Care usually takes ${profile.stayH}, with ${profile.stayT} in India. A written quote for ${label} follows your reports and can advise against travel. The range for ${label} is not an invoice.`,
    hospitalStay: profile.stayH,
    totalStay: profile.stayT,
    success: profile.success,
    recovery: profile.recovery,
    anaesthesia: profile.anaesthesia,
    whatIs: fact,
    whoNeeds: [
      `People whose reports already point to ${lower}, and who can send those reports before they travel`,
      band === "urgent"
        ? `Only a patient a specialist has said is stable enough to move for ${lower}. Someone who is unsafe tonight needs the nearest hospital.`
        : `People fit enough for the stay described for ${lower}, with a companion if the operation is major`,
    ],
    types: [
      {
        title: "The decision named for this person",
        text: `The written plan for ${lower} should say whether the next step is treatment in India, care at home, or an emergency locally.`,
      },
      {
        title: "A different next step",
        text: `Medicines, a smaller procedure, a larger operation or no travel can all be right for ${label}. The team should say which, in writing.`,
      },
    ],
    included: profile.included,
    excluded: profile.excluded,
    factors: [
      "What the reports show, including stage, size or how stable you are",
      "Whether a device, an implant, a drug name or extra intensive-care days are required",
      "A complication, a second problem, or a plan that has to change after admission",
    ],
    preparation: [
      "Send the scans and reports before any flight is booked",
      "List blood thinners, allergies, previous operations and the doses you take",
      "Do not stop a medicine unless the treating team writes the date",
    ],
    extraDocuments: ["Earlier operation notes if you have had surgery for this problem"],
    risks: profile.risks,
    timeline: [
      { when: "Before travel", text: `${fact} A date is offered only after the team accepts the case.` },
      { when: "In hospital", text: `The usual stay is ${profile.stayH}. The quote states what is included.` },
      { when: "Before flying", text: `Plan ${profile.stayT} in India. Fly only with a fitness letter.` },
    ],
    whyIndia: [
      "The condition or operation is named before a price is treated as final",
      "English notes your doctor at home can follow",
      "A written quote after the reports, with separate lines for drugs, devices and extra days",
    ],
    faqs: emergency
      ? [
          { question: "Is cauda equina syndrome an emergency?", answer: "Yes. New loss of bladder or bowel control, or numbness in the groin, needs the nearest emergency department the same day." },
          { question: "Can I fly to India if bladder control has just changed?", answer: "No. A commercial flight is not treatment for cauda equina syndrome, and waiting for a visa can cost nerve function." },
          { question: "What should I tell the emergency doctor?", answer: "Say when the bladder, bowel or groin symptoms started, list your medicines, and bring any MRI you already have." },
          { question: "Can TechDr arrange emergency surgery in my own city tonight?", answer: "No. TechDr coordinates planned care in India. It does not dispatch a surgeon to your local emergency department." },
          { question: "Will a hospital quote help tonight?", answer: "No. A quote, an invitation letter and a flight do not replace emergency decompression for cauda equina syndrome." },
          { question: "When is rehabilitation discussed?", answer: "Physiotherapy and bladder or bowel care start with the team that did the emergency operation. A later stay in India is a separate plan." },
          { question: "Can I travel for physiotherapy after the emergency operation?", answer: "Only after the operating surgeon says the spine and the bladder are safe to move. Ask for that in writing." },
          { question: "Does saddle numbness always mean cauda equina syndrome?", answer: "It is a warning sign until a clinician has examined you. Do not decide from a webpage that you can wait." },
        ]
      : [
          { question: `What does a written quote for ${lower} include?`, answer: `A quote for ${label} should name the consultation or operation, the days under care and any device. Anything unnamed is outside that quote.` },
          { question: `Do flights sit inside the price for ${lower}?`, answer: `International flights and the visa fee are outside the quote for ${label}. Ask for them to be listed only if a line actually says so.` },
          { question: `Do I need a medical visa before travel for ${lower}?`, answer: `Check the official e-Medical Visa page for ${label} before you pay for tickets. TechDr can request an invitation letter after you accept a written plan.` },
          { question: `Should a companion travel for ${lower}?`, answer: `A companion should travel for ${label} if an anaesthetic, a ward stay or help with walking is likely. Ask when the plan is still unsigned.` },
          { question: `How do I pay a hospital for ${lower}?`, answer: `Pay the hospital for ${label} by the method written on the quote, usually a card or a bank transfer you can document. Do not send cash through an informal broker.` },
          { question: `Who follows me at home after ${lower}?`, answer: `The doctor at home follows ${label} after you land. The discharge summary is written so that doctor can read the operation, the medicines and the warning symptoms.` },
          { question: `What if the specialist advises against travel for ${lower}?`, answer: `Then do not book flights for ${label}. A refusal is a result. TechDr will not replace it with a package.` },
          { question: `Which reports matter most for ${lower}?`, answer: `Send the scans and the clinic notes that already mention ${label}, plus a medicine list. A new opinion without those files is a guess.` },
        ],
    related: extra.rel ? [extra.rel] : [],
    articles,
    howPerformed: `${fact} The team explains the approach in the consent. TechDr does not publish a step-by-step operative script.`,
    followup: "Send the discharge summary to the doctor at home. Fever, bleeding, sudden weakness, chest pain or breathlessness needs urgent local care.",
    procedureType: profile.procedureType,
    updated,
  });
  addEntries(specialties, label, base);
}

for (const entry of sectionEntries) {
  if (!reservedSlugs.has(entry.slug) && !created.has(entry.slug)) {
    throw new Error(`Missing guide for “${entry.label}” → ${entry.slug}`);
  }
}
for (const rel of relChecks) {
  if (!reservedSlugs.has(rel.to) && !created.has(rel.to)) {
    throw new Error(`Missing related guide ${rel.to} from ${rel.from}`);
  }
}
