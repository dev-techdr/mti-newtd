const allPosts = [
  {
    slug: "knee-replacement-cost-india-2026",
    title: "Cost of Knee Replacement in India in 2026: Complete Guide",
    description:
      "A 2026 guide to knee replacement cost in India, what USD 4,500–7,000 includes, stay length, implants and how to compare a written quote.",
    date: "2026-09-12",
    updated: "2026-10-15",
    category: "Costs",
    excerpt: "What a single knee package usually contains, and the extras that move a quote.",
  },
  {
    slug: "is-medical-treatment-in-india-safe",
    title: "Is Medical Treatment in India Safe? What Patients Should Know",
    description:
      "How international patients can judge safety in India: accreditation, written quotes, fitness to fly, companions and questions to ask before paying.",
    date: "2026-08-20",
    updated: "2026-10-15",
    category: "Safety",
    excerpt: "Accreditation and a written plan matter more than a star rating on a brochure.",
  },
  {
    slug: "india-e-medical-visa-guide",
    title: "India e-Medical Visa: Step-by-Step Guide for Patients",
    description:
      "How the India e-Medical Visa and attendant visa work, which documents to prepare, and what TechDr’s hospital invitation letter does and does not do.",
    date: "2026-07-18",
    updated: "2026-10-15",
    category: "Visas",
    excerpt: "The invitation letter helps the application. It is not the visa.",
  },
  {
    slug: "how-to-choose-a-hospital-abroad",
    title: "How to Choose a Hospital Abroad: 10 Questions to Ask",
    description:
      "Ten practical questions for choosing a hospital abroad, from accreditation and ICU caps to who is on call after you fly home.",
    date: "2026-06-02",
    updated: "2026-10-15",
    category: "Planning",
    excerpt: "Ask who operates, what is excluded, and what happens if the plan changes.",
  },
  {
    slug: "ivf-in-india-for-foreigners",
    title: "IVF in India: Costs, Success Rates and Rules for Foreigners",
    description:
      "IVF cycle costs in India, why age-banded live-birth rates matter, and which routes, including surrogacy, TechDr will not arrange.",
    date: "2026-05-14",
    updated: "2026-10-15",
    category: "Fertility",
    excerpt: "A self-cycle is often USD 2,500–4,000 before the add-ons that change the bill.",
  },
  {
    slug: "flying-home-after-surgery",
    title: "Recovering After Surgery Abroad: Flying Home Safely",
    description:
      "When flying after surgery is reasonable, what to ask your surgeon, and how clots, wounds and cabin time change the plan.",
    date: "2026-04-09",
    updated: "2026-10-15",
    category: "Recovery",
    excerpt: "A flight date should follow medical clearance, not a non-refundable ticket.",
  },
  {
    slug: "liver-transplant-donor-rules",
    title: "Liver Transplant in India: Donor Rules for International Patients",
    description:
      "Living-donor rules for liver transplant in India, why paid donation is refused, and how long families should plan to stay.",
    date: "2026-03-22",
    updated: "2026-10-15",
    category: "Transplants",
    excerpt: "The committee can say no. A legal donor is the whole pathway.",
  },
  {
    slug: "medical-tourism-cost-calculator",
    title: "Medical Tourism vs Treatment at Home: A Cost Comparison",
    description:
      "How to compare an Indian treatment quote with care at home, including flights, a companion, medicines and time off work.",
    date: "2026-02-11",
    updated: "2026-10-15",
    category: "Costs",
    excerpt: "The surgery line is only one part of the true cost of a trip.",
  },
  {
    slug: "whats-included-in-a-medical-tourism-package",
    title: "What’s Included in a Medical Tourism Package?",
    description:
      "A plain-language list of what belongs in a medical travel quote: device, nights, ICU caps, exclusions and who pays for complications.",
    date: "2026-01-28",
    updated: "2026-10-15",
    category: "Planning",
    excerpt: "If the implant, the ICU days and the exclusions are missing, you do not have a package.",
  },
  {
    slug: "best-cities-india-medical-treatment",
    title: "Cities in India for Medical Treatment",
    description:
      "How to choose between Delhi NCR, Mumbai, Chennai, Hyderabad, Bengaluru and Kolkata for treatment without chasing one preferred city.",
    date: "2025-12-16",
    updated: "2026-10-15",
    category: "Cities",
    excerpt: "The right city is the one with the right plan and a hotel near that campus.",
  },
  {
    slug: "cancer-treatment-in-india",
    title: "Cancer Treatment in India: Therapies Available to Travellers",
    description:
      "Surgery, drugs and radiotherapy for cancer in India, why they must be priced separately, and how to plan the part that happens at home.",
    date: "2025-11-04",
    updated: "2026-10-15",
    category: "Cancer",
    excerpt: "A surgery package is not a year of cancer care.",
  },
  {
    slug: "free-second-opinion-online",
    title: "How to Get a Free Second Opinion Online",
    description:
      "What to send for an online second opinion, how fast a written view can come back, and what an opinion does not decide for you.",
    date: "2025-10-08",
    updated: "2026-10-15",
    category: "Second opinions",
    excerpt: "A remote opinion can prevent a wasted flight. It cannot manage an emergency.",
  },
  {
    slug: "best-medical-tourism-facilitators-india",
    title: "How to Check Medical Tourism Facilitators in India",
    description:
      "There is no official ranking of medical tourism facilitators in India. Use a written hospital quote, accreditation you can check, and who you pay.",
    date: "2026-11-11",
    updated: "2026-11-11",
    category: "Planning",
    excerpt: "No league table. Judge the letter, the hospital directory, and who receives the money.",
  },
  {
    slug: "best-medical-tourism-agency-india",
    title: "How to Check a Medical Tourism Agency in India",
    description:
      "A medical tourism agency in India arranges the quote, invitation letter, airport pickup and hotel. The hospital still treats you. Here is what to check.",
    date: "2026-11-11",
    updated: "2026-11-11",
    category: "Planning",
    excerpt: "An agency coordinates the trip. It does not become the surgeon because the website says so.",
  },
  {
    slug: "medical-tourism-consultant-india",
    title: "Medical Tourism Consultant in India",
    description:
      "A medical tourism consultant in India explains a written plan. They do not operate, grant a visa, or guarantee a result. Here is what to ask.",
    date: "2026-11-11",
    updated: "2026-11-11",
    category: "Planning",
    excerpt: "A consultant can collect a quote. They cannot operate, issue a visa, or clear you to fly.",
  },
  {
    slug: "compare-medical-tourism-companies-india",
    title: "How to Compare Medical Tourism Companies in India",
    description:
      "Compare medical tourism companies in India on the quote, the invoice, the visa letter, and the cases they refuse. A slogan is not a comparison.",
    date: "2026-11-11",
    updated: "2026-11-11",
    category: "Planning",
    excerpt: "Five written lines beat a ranking banner. Compare the invoice, not the slogan.",
  },
  {
    slug: "how-to-check-a-medical-tourism-facilitator-in-india",
    title: "How to Check a Medical Tourism Facilitator in India",
    description:
      "Check a medical tourism facilitator in India on the legal name, the hospital letter, the accreditation directory, and the cases they refuse.",
    date: "2026-11-11",
    updated: "2026-11-11",
    category: "Planning",
    excerpt: "No official title. Check the legal name, the hospital letter, the directory, and the cases TechDr refuses.",
  },
  {
    slug: "what-techdr-facilitators-handle-in-india",
    title: "What TechDr Facilitators Handle for Patients in India",
    description:
      "TechDr facilitators collect the file, a written hospital quote, the invitation letter, arrival, and the papers you take home. The hospital still treats you.",
    date: "2026-11-11",
    updated: "2026-11-11",
    category: "Planning",
    excerpt: "The facilitator collects the letter and the trip. The hospital still does the operation.",
  },
  {
    slug: "hip-replacement-cost-india-2026",
    title: "Hip Replacement Cost in India in 2026",
    description:
      "Hip replacement in India is typically USD 5,500–8,000 in 2026. See what a standard implant package includes, how long to stay, and how the range compares.",
    date: "2026-11-11",
    updated: "2026-11-11",
    category: "Costs",
    excerpt: "A primary hip package is a named implant and a stay, not a lobby photograph.",
  },
  {
    slug: "heart-bypass-cost-india-2026",
    title: "Heart Bypass Surgery Cost in India in 2026",
    description:
      "Heart bypass in India is typically USD 5,000–8,500 in 2026. See ICU allowances, graft counts, stay length, and how a written quote differs from a package slogan.",
    date: "2026-11-10",
    updated: "2026-11-11",
    category: "Costs",
    excerpt: "The graft count and the ICU cap belong on the letter before you fly.",
  },
  {
    slug: "angioplasty-stent-cost-india",
    title: "Angioplasty and Stent Cost in India",
    description:
      "Angioplasty with one stent in India is about USD 3,500–5,500 in 2026. See how extra stents, drug-eluting models and the medicine list change the bill.",
    date: "2026-11-09",
    updated: "2026-11-11",
    category: "Costs",
    excerpt: "One stent is the band. The tablets you must not stop are part of the plan.",
  },
  {
    slug: "heart-valve-replacement-cost-india",
    title: "Heart Valve Replacement Cost in India",
    description:
      "Heart valve replacement in India is typically USD 7,500–11,000 in 2026. Mechanical and tissue valves change follow-up, warfarin, and the stay.",
    date: "2026-11-08",
    updated: "2026-11-11",
    category: "Costs",
    excerpt: "Name the valve. Repair and replacement are not the same invoice.",
  },
  {
    slug: "kidney-transplant-cost-india",
    title: "Kidney Transplant Cost in India for Foreign Patients",
    description:
      "A kidney transplant package in India is often USD 13,000–18,000 in 2026. Donor law, committee approval and lifelong medicines matter more than the headline.",
    date: "2026-11-07",
    updated: "2026-11-11",
    category: "Transplants",
    excerpt: "A legal donor and a committee can decide the trip. A paid donor cannot.",
  },
  {
    slug: "bone-marrow-transplant-cost-india",
    title: "Bone Marrow Transplant Cost in India",
    description:
      "Bone marrow transplant in India spans about USD 18,000–40,000 in 2026. Autologous and donor transplants are priced differently and need weeks nearby.",
    date: "2026-11-06",
    updated: "2026-11-11",
    category: "Transplants",
    excerpt: "Your own cells and a donor transplant are different prices and different stays.",
  },
  {
    slug: "spinal-fusion-cost-india",
    title: "Spinal Fusion Cost in India",
    description:
      "One-level spinal fusion in India is often USD 6,000–9,500 in 2026. See why many disc problems do not need fusion, and what extra levels do to the quote.",
    date: "2026-11-05",
    updated: "2026-11-11",
    category: "Spine",
    excerpt: "Count the levels. Many discs do not need screws at all.",
  },
  {
    slug: "gastric-sleeve-cost-india",
    title: "Gastric Sleeve Cost in India",
    description:
      "Sleeve gastrectomy in India is typically USD 5,000–7,000 in 2026. See who qualifies, how a bypass quote differs, and what diet follow-up is not included.",
    date: "2026-11-04",
    updated: "2026-11-11",
    category: "Bariatric",
    excerpt: "A sleeve is not cosmetic surgery, and a bypass is not a deluxe sleeve.",
  },
  {
    slug: "cataract-surgery-cost-india",
    title: "Cataract Surgery Cost in India",
    description:
      "Cataract surgery in India is about USD 600–1,500 per eye in 2026. Lens choice, the second eye, and a retina check decide whether that band applies.",
    date: "2026-11-03",
    updated: "2026-11-11",
    category: "Eyes",
    excerpt: "The standard band is one eye and a monofocal lens. Premium lenses are a different line.",
  },
  {
    slug: "lasik-cost-india",
    title: "LASIK Cost in India: Who Is Suitable",
    description:
      "LASIK in India is a planning range of about USD 800–1,500 for both eyes in 2026. Corneal thickness, not the discount, decides if laser is safe.",
    date: "2026-11-02",
    updated: "2026-11-11",
    category: "Eyes",
    excerpt: "A scan can rule the operation out. A package price cannot overrule the scan.",
  },
  {
    slug: "hair-transplant-cost-india",
    title: "Hair Transplant Cost in India",
    description:
      "A hair transplant session in India is typically USD 1,000–2,500 in 2026. Graft count, donor limits, and FUE versus FUT should set the price you accept.",
    date: "2026-11-01",
    updated: "2026-11-11",
    category: "Cosmetic",
    excerpt: "Price the grafts. A full-head promise before anyone sees the donor area is marketing.",
  },
  {
    slug: "dental-implant-cost-india",
    title: "Dental Implant Cost in India",
    description:
      "A single dental implant fixture in India is about USD 500–900 in 2026. The crown, abutment, and any bone graft should be separate lines on the quote.",
    date: "2026-10-31",
    updated: "2026-11-11",
    category: "Dental",
    excerpt: "The fixture price is not automatically the tooth you chew on.",
  },
  {
    slug: "brain-tumour-surgery-cost-india",
    title: "Brain Tumour Surgery Cost in India",
    description:
      "A standard craniotomy in India is typically USD 6,500–10,000 in 2026. Location, ICU time, and later radiotherapy change the plan and the price.",
    date: "2026-10-30",
    updated: "2026-11-11",
    category: "Neurology",
    excerpt: "Location decides the risk. Radiotherapy is not inside the surgical price.",
  },
  {
    slug: "cochlear-implant-cost-india",
    title: "Cochlear Implant Cost in India",
    description:
      "A cochlear implant in India is a planning range of about USD 11,000–18,000 per ear in 2026. The quote must name the device, and switch-on must be arranged.",
    date: "2026-10-29",
    updated: "2026-11-11",
    category: "Hearing",
    excerpt: "Name the device. Switch-on decides whether the trip is ten days or a month.",
  },
  {
    slug: "nabh-vs-jci-hospital-accreditation",
    title: "NABH vs JCI: How to Check a Hospital",
    description:
      "NABH and JCI are hospital accreditation systems, not a promise about your operation. Here is how to verify a logo before you pay a deposit.",
    date: "2026-10-28",
    updated: "2026-11-11",
    category: "Safety",
    excerpt: "Check the accreditor’s directory. A logo on a brochure is not the check.",
  },
  {
    slug: "documents-for-a-treatment-quote",
    title: "Documents to Send Before a Treatment Quote",
    description:
      "What to send for a written treatment quote in India: scans, medicines, allergies, and passport details. A photo of a screen is not a final plan.",
    date: "2026-10-27",
    updated: "2026-11-11",
    category: "Planning",
    excerpt: "Send the scan files and the medicine list. A cheapest-price sentence cannot be quoted.",
  },
  {
    slug: "medical-travel-insurance-before-surgery",
    title: "Medical Travel Insurance Before Surgery Abroad",
    description:
      "What to ask an insurer before surgery in India: planned-treatment exclusions, complications, a companion, and why a cheap policy can pay nothing.",
    date: "2026-10-26",
    updated: "2026-11-11",
    category: "Planning",
    excerpt: "Many policies refuse the operation you flew to have. Read the schedule before you rely on it.",
  },
  {
    slug: "companion-for-surgery-abroad",
    title: "Who Should Travel With You for Surgery",
    description:
      "When a companion is part of a safe trip for surgery in India, what they do in hospital, and how an attendant visa differs from your medical visa.",
    date: "2026-10-25",
    updated: "2026-11-11",
    category: "Planning",
    excerpt: "Heart, brain, and transplant trips need a companion. The attendant visa is a separate application.",
  },
  {
    slug: "how-to-pay-a-hospital-in-india",
    title: "How to Pay a Hospital in India Safely",
    description:
      "Pay a hospital invoice in the hospital’s name. See what a deposit should say about visa refusal, fitness, and extra nights before you transfer money.",
    date: "2026-10-24",
    updated: "2026-11-11",
    category: "Planning",
    excerpt: "Pay the hospital on the quote. Do not pay a personal account to hold a bed.",
  },
  {
    slug: "records-to-carry-home-after-surgery",
    title: "Records to Carry Home After Surgery in India",
    description:
      "The operation note, implant stickers, medicine list, and discharge summary to carry in your cabin bag so a doctor at home can continue your care.",
    date: "2026-10-23",
    updated: "2026-11-11",
    category: "Recovery",
    excerpt: "Cabin bag, not the hold: operation note, implant stickers, and the medicine chart.",
  },
] as const;

const retiredBlogPosts = [
  ["knee-replacement-cost-india-2026", "/cost/knee-replacement-cost-in-india"],
  ["hip-replacement-cost-india-2026", "/cost/hip-replacement-cost-in-india"],
  ["heart-bypass-cost-india-2026", "/cost/heart-bypass-cost-in-india"],
  ["angioplasty-stent-cost-india", "/cost/angioplasty-cost-in-india"],
  ["heart-valve-replacement-cost-india", "/cost/heart-valve-replacement-cost-in-india"],
  ["kidney-transplant-cost-india", "/cost/kidney-transplant-cost-in-india"],
  ["bone-marrow-transplant-cost-india", "/cost/bone-marrow-transplant-cost-in-india"],
  ["spinal-fusion-cost-india", "/cost/spinal-fusion-cost-in-india"],
  ["gastric-sleeve-cost-india", "/cost/sleeve-gastrectomy-cost-in-india"],
  ["cataract-surgery-cost-india", "/cost/cataract-cost-in-india"],
  ["lasik-cost-india", "/cost/lasik-cost-in-india"],
  ["hair-transplant-cost-india", "/cost/hair-transplant-cost-in-india"],
  ["dental-implant-cost-india", "/cost/dental-implant-cost-in-india"],
  ["brain-tumour-surgery-cost-india", "/cost/brain-tumour-surgery-cost-in-india"],
  ["cochlear-implant-cost-india", "/cost/cochlear-implant-cost-in-india"],
] as const;

const retiredBlogSlugs = new Set<string>(retiredBlogPosts.map(([slug]) => slug));

export const posts = allPosts.filter((post) => !retiredBlogSlugs.has(post.slug));
export const blogRedirects = retiredBlogPosts.map(([slug, destination]) => ({
  source: `/blog/${slug}`,
  destination,
}));

export type PostMeta = (typeof allPosts)[number];

export function getPostMeta(slug: string) {
  return posts.find((post) => post.slug === slug);
}
