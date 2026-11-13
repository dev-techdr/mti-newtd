export type Specialty = {
  slug: string;
  name: string;
  description: string;
  answer: string;
  intro: string;
  focus: string[];
  faqs: { question: string; answer: string }[];
};

export const specialties: Specialty[] = [
  {
    slug: "orthopedics",
    name: "Orthopedics and joint replacement",
    description:
      "Plan hip or knee replacement in India with indicative USD ranges, stay times and written implant quotes from accredited partner hospitals.",
    answer:
      "Orthopaedic care through TechDr focuses on joint replacement for people whose pain no longer responds to physiotherapy and medicines. Indicative single knee packages are USD 4,500–7,000 and hip packages USD 5,500–8,000, including a standard implant when the quote says so.",
    intro:
      "International patients usually ask about knees and hips first. The useful comparison is not a hospital slogan. It is the implant name, the number of nights, and whether physiotherapy is inside the package. A revision operation, an infection, or both joints together is a different plan from a primary replacement. Send standing X-rays so the surgeon can say if you need surgery at all.",
    focus: ["Primary and revision joint replacement", "Implant name written into the quote", "A flight planned around wound checks, not the other way around"],
    faqs: [
      { question: "Do I need surgery if an X-ray shows arthritis?", answer: "Not always. Arthritis on a film plus pain that still responds to rehabilitation can be managed without a flight. Surgery is for pain and function, not for a picture alone." },
      { question: "Are both joints cheaper if done together?", answer: "You pay for two implants and a harder recovery. Some people are safer staged. The quote should show each joint." },
      { question: "How long before I can fly?", answer: "Often two to three weeks after an uncomplicated primary joint, with clearance. Swelling, a fever or a calf clot means you stay." },
      { question: "Which city should I choose?", answer: "The city matters less than the written plan. Delhi NCR, Mumbai, Chennai, Hyderabad, Bengaluru and Kolkata all have accredited orthopaedic units. We match the plan, then the flight." },
    ],
  },
  {
    slug: "cardiology",
    name: "Cardiology and cardiac surgery",
    description:
      "Compare bypass, stent and valve costs in India for 2026, with ICU allowances and English discharge notes for your cardiologist at home.",
    answer:
      "Heart care in India is planned from the angiogram or echo, not from a package name. Indicative ranges are about USD 5,000–8,500 for bypass, USD 3,500–5,500 for one stent, and USD 7,500–11,000 for a surgical valve.",
    intro:
      "A heart attack in progress belongs in the nearest emergency hospital, not on a flight. Planned bypass, stents and valve surgery are different. TechDr asks a heart team to say which one your films support, then itemises grafts, stent count or valve type. Tablets after a stent are as important as the procedure. Stopping them early can clot the stent.",
    focus: ["Angiogram-based choice between stent and bypass", "Named valve or stent category", "Medicine lists your home doctor can follow"],
    faqs: [
      { question: "Can I fly for chest pain this week?", answer: "New or worsening chest pain needs local emergency care. TechDr plans elective heart treatment only." },
      { question: "Is a cheaper stent a worse stent?", answer: "Not automatically. The quote should name the drug-eluting category. An unnamed ‘imported stent’ is not a specification." },
      { question: "How long is a bypass stay?", answer: "Often 7–10 days in hospital and two to three weeks in India if recovery is smooth." },
      { question: "Do you publish surgeon names?", answer: "No. Senior cardiac specialists at accredited partner hospitals review the file. We do not advertise individuals." },
    ],
  },
  {
    slug: "oncology",
    name: "Oncology and cancer care",
    description:
      "Understand surgery, drug and radiotherapy costs for cancer treatment in India. TechDr separates each line so a package cannot hide the real plan.",
    answer:
      "Cancer care is not one price. Breast cancer surgery is often estimated at USD 4,000–7,000, while chemotherapy, targeted drugs and radiotherapy are separate. A useful plan names the stage, the intent of treatment, and where each part will happen.",
    intro:
      "People travel hoping a single invoice will cover a year of cancer care. It will not, and it should not pretend to. Surgery, systemic drugs and radiotherapy have different schedules. Some radiotherapy is easier at home because it is daily for weeks. TechDr’s job is to get a written sequence and to say which parts are worth the flight.",
    focus: ["Stage and receptor status before a quote", "Surgery priced apart from drugs", "A handover your oncologist at home can continue"],
    faqs: [
      { question: "Can India cure cancer more cheaply?", answer: "No one should promise a cure. Treatment can be more affordable. The outcome still depends on the cancer, the stage and whether the full plan is completed." },
      { question: "Should I bring biopsy slides?", answer: "Yes if the team asks to confirm the diagnosis. A PDF helps, slides are better." },
      { question: "Is radiotherapy included in surgery prices?", answer: "No. Ask for it as its own line, including how many visits and whether they should happen in India or at home." },
      { question: "What if my reports are incomplete?", answer: "The opinion waits. Guessing a stage from a WhatsApp photo is not a plan." },
    ],
  },
  {
    slug: "neurology",
    name: "Neurology and neurosurgery",
    description:
      "Plan brain tumour surgery in India with indicative costs, ICU time and a clear line between removal, biopsy and radiosurgery.",
    answer:
      "Neurosurgery quotes start from the MRI. A standard craniotomy is typically estimated at USD 6,500–10,000. Awake mapping, a long ICU stay and later radiotherapy are not included automatically.",
    intro:
      "Location of a tumour matters more than the city. A surface meningioma and a tumour in speech cortex are different risks. TechDr will say if a commercial flight is unsafe. Radiosurgery is not an open operation and should not share a headline price with a craniotomy.",
    focus: ["MRI files reviewed before travel", "Function the surgeon is protecting, written down", "A companion for the flight home"],
    faqs: [
      { question: "Can you guarantee total removal?", answer: "No. Near critical areas the safe limit may be a partial removal or a biopsy." },
      { question: "How long before flying home?", answer: "Often two to three weeks after a smooth craniotomy, and only with a fitness letter." },
      { question: "Is spine surgery on this page?", answer: "Spinal fusion has its own guide. Neck and lower-back operations are not brain surgery." },
      { question: "What records should I send?", answer: "The MRI files, any biopsy, a seizure diary and the dose of steroids." },
    ],
  },
  {
    slug: "organ-transplant",
    name: "Organ transplant",
    description:
      "Kidney, liver, paediatric liver, bone marrow, heart, lung, cornea and pancreas transplant guides. Foreign patients cannot freely access Indian deceased-donor organs.",
    answer:
      "Living-donor packages in India are typically estimated at USD 13,000–18,000 for a kidney, USD 28,000–40,000 for a liver, and USD 18,000–40,000 for bone marrow. Heart, lung and pancreas transplants depend on a deceased donor. A legal donor and committee approval are mandatory. Paid donation is refused. Foreign patients cannot freely receive a deceased-donor organ.",
    intro:
      "The price is not the hard part. The law is. Living donors must fit India’s eligibility rules, and an authorisation committee can say no. TechDr will not invent a relationship, pay a donor, or tell you to try. If the file is not lawful, the case stops. Budget weeks in India and lifelong medicines afterwards.",
    focus: ["Legal donor pathway or no travel", "Recipient and donor costs split in writing", "Medicine supply planned for home"],
    faqs: [
      { question: "Can I pay a donor?", answer: "No. It is illegal. TechDr will not coordinate it." },
      { question: "Are medicines included for life?", answer: "No. In-hospital drugs are usual. Lifelong tablets are your plan at home unless a short supply is written down." },
      { question: "How long must we stay?", answer: "Weeks, not days. Liver and bone marrow cases often need one to three months nearby." },
      { question: "Can a friend donate?", answer: "Sometimes only after strict legal review, and often not. Confirm before you buy flights." },
    ],
  },
  {
    slug: "ivf-fertility",
    name: "IVF and fertility",
    description:
      "IVF in India for international patients: cycle costs around USD 2,500–4,000, realistic age-banded success, and what TechDr will not arrange.",
    answer:
      "A self IVF cycle is typically estimated at USD 2,500–4,000 before medicines, ICSI and freezing. Stay about 18–21 days. Live birth is not guaranteed. TechDr does not arrange surrogacy.",
    intro:
      "Fertility treatment fails most often when add-ons and the law are vague. We ask clinics to itemise drugs and laboratory steps, and we will not suggest a surrogacy workaround. Donor routes depend on current Indian rules for your passport. Age-banded live-birth rates are the only success figures worth reading.",
    focus: ["Itemised cycle quotes", "No surrogacy", "Age-banded outcomes, not a single percentage"],
    faqs: [
      { question: "Do you guarantee a pregnancy?", answer: "No. More than one cycle is common, especially at older ages." },
      { question: "Is surrogacy included?", answer: "No. TechDr does not arrange surrogacy." },
      { question: "How long is a fresh cycle?", answer: "About three weeks in the city for monitoring, collection and transfer." },
      { question: "Are drugs in the headline price?", answer: "Only if the quote says so. They are a frequent extra." },
    ],
  },
  {
    slug: "spine-surgery",
    name: "Spine surgery",
    description:
      "Spinal fusion in India is often USD 6,000–9,500 for one level. See when fusion is the wrong operation for ordinary back pain.",
    answer:
      "One-level spinal fusion is typically estimated at USD 6,000–9,500. Extra levels cost more. Many disc problems do not need fusion. The MRI, not a package, decides.",
    intro:
      "Back pain is common and surgery is not. Fusion is for instability and selected nerve problems that have not settled. TechDr would rather return a file with ‘no operation’ than sell screws. If fusion is appropriate, the quote counts levels, cages and whether the neck or the lower back is being treated. Narrower spine conditions are listed below, and many of them do not need fusion.",
    focus: ["MRI before a recommendation", "Level count in the quote", "A clear reason fusion is better than decompression alone"],
    faqs: [
      { question: "Is every slipped disc a fusion?", answer: "No. Many improve, and some need only a decompression." },
      { question: "How many levels are in the price?", answer: "Assume one until the quote counts more." },
      { question: "When can I fly?", answer: "Often two to three weeks after an uncomplicated lumbar fusion, with clearance." },
      { question: "Will metal detectors alarm?", answer: "They can. Carry the implant card." },
    ],
  },
  {
    slug: "bariatric-surgery",
    name: "Bariatric and weight-loss surgery",
    description:
      "Sleeve gastrectomy in India is typically USD 5,000–7,000. Read the diet, vitamin and reflux limits before you treat it as cosmetic.",
    answer:
      "Sleeve gastrectomy is typically estimated at USD 5,000–7,000, with 2–4 days in hospital and 10–14 days in India. Weight loss is not guaranteed. Reflux and lifelong vitamins are part of the decision.",
    intro:
      "A sleeve is a gastrointestinal operation. It is not a holiday and not a substitute for a diet you have never tried when surgery is not indicated. Surgeons look at BMI, diabetes and sleep apnoea. TechDr will not book a case the bariatric team has not accepted, and we do not promise a number of kilos.",
    focus: ["Candidacy before flights", "Dietitian follow-up in the quote", "Vitamins planned for home"],
    faqs: [
      { question: "Will I lose a set amount?", answer: "No. Published series show a range. Your result depends on diet and follow-up." },
      { question: "Is a bypass the same price?", answer: "No. Ask for it specifically if that is the operation suggested." },
      { question: "How long do I stay?", answer: "About 10–14 days so you are drinking reliably before a long flight." },
      { question: "Are vitamins included for a year?", answer: "Usually not. Budget for them." },
    ],
  },
  {
    slug: "cosmetic-surgery",
    name: "Cosmetic and plastic surgery",
    description:
      "Hair transplant costs in India are typically USD 1,000–2,500 a session. Graft counts are written down. A photo match is not promised.",
    answer:
      "Cosmetic plans through TechDr start with hair transplant sessions around USD 1,000–2,500. The donor area sets the limit. Revision and unrealistic hairlines are turned down.",
    intro:
      "Cosmetic surgery is still surgery. Infection, bad scars and a result you dislike are possible. We ask for daylight photos and a graft ceiling so a donor area is not stripped to chase a filtered picture. Rhinoplasty sits with ENT because breathing and shape belong together.",
    focus: ["Graft counts, not slogans", "No guaranteed celebrity result", "Healing time built into the trip"],
    faqs: [
      { question: "Can density be guaranteed?", answer: "No. Donor hair is finite." },
      { question: "How long until hair grows?", answer: "Judge it at 9–12 months. Early shedding is normal." },
      { question: "Do you name celebrity surgeons?", answer: "No. We do not publish personal names." },
      { question: "Is rhinoplasty listed here?", answer: "The clinical guide sits under ENT, because airway and shape are one operation." },
    ],
  },
  {
    slug: "ophthalmology",
    name: "Ophthalmology",
    description:
      "Cataract surgery in India is about USD 600–1,500 per eye. LASIK is a separate planning range and depends on corneal scans.",
    answer:
      "Cataract surgery with a standard lens is typically USD 600–1,500 per eye. LASIK is a separate planning range around USD 800–1,500 for suitable eyes. Premium lenses and thin corneas change the advice.",
    intro:
      "Eye trips are short only when the eye is suitable. A cataract in a healthy retina is a different promise from a cataract plus diabetic macular disease. LASIK is refused when the cornea is too thin. TechDr would rather lose a booking than book the wrong laser.",
    focus: ["Lens model written down", "Scan before LASIK", "Drops and a day-1 check before the flight"],
    faqs: [
      { question: "Will I need glasses after cataract surgery?", answer: "Often for reading, if you choose a monofocal lens. That is normal, not a failure." },
      { question: "Can both eyes be treated together?", answer: "Sometimes for cataract, with a gap of days. LASIK is often both eyes in one sitting if both pass the scan." },
      { question: "Is LASIK permanent?", answer: "The reshape is, but reading vision still changes with age, and a residual number is possible." },
      { question: "How long is the trip?", answer: "Often under a week for an uncomplicated cataract or LASIK, including the first check." },
    ],
  },
  {
    slug: "dental-care",
    name: "Dental care",
    description:
      "Dental implants in India are about USD 500–900 per fixture in 2026. Confirm whether the crown and any bone graft are included.",
    answer:
      "A single implant fixture is typically estimated at USD 500–900. The crown and any graft are extra until the quote lists them. Many final teeth need a second visit months later.",
    intro:
      "Dental tourism goes wrong when the fixture is cheap and the tooth is not in the price. We split fixture, abutment and crown. If the bone is thin, we say you need a graft and a second trip rather than a same-week miracle crown.",
    focus: ["Three-line quotes", "Grafts disclosed early", "Implant system documented for your dentist at home"],
    faqs: [
      { question: "Is the crown included?", answer: "Only if a line says so." },
      { question: "Can it be finished in five days?", answer: "A temporary tooth, sometimes. A final crown often waits for healing." },
      { question: "What if I smoke?", answer: "Failure rates rise. Tell the dentist." },
      { question: "Will security stop me?", answer: "Dental implants rarely alarm. Carry the card anyway." },
    ],
  },
  {
    slug: "urology",
    name: "Urology",
    description:
      "Prostate surgery in India is a planning range of about USD 3,500–7,000. TURP and cancer surgery must be quoted separately.",
    answer:
      "Prostate surgery is planned around USD 3,500–7,000, but only after the file shows whether this is benign obstruction or cancer. They are different operations, stays and risks.",
    intro:
      "A weak stream is not a cancer diagnosis, and a PSA number is not an operation. TechDr separates TURP or laser procedures from radical prostatectomy and will not let one package title cover both. Catheter timing decides the flight.",
    focus: ["Diagnosis before technique", "Catheter plan", "Cancer cases paired with an oncology handover"],
    faqs: [
      { question: "Does TURP treat cancer?", answer: "No. It relieves blockage from benign enlargement." },
      { question: "Will continence recover?", answer: "After cancer surgery it often improves and sometimes does not. Ask for the surgeon’s own figures." },
      { question: "How long is the catheter?", answer: "Days, sometimes longer. Do not fix the flight before the urologist does." },
      { question: "Is the price on the main comparison table?", answer: "No. It is a planning range until your written quote arrives." },
    ],
  },
  {
    slug: "gastroenterology",
    name: "Gastroenterology",
    description:
      "Laparoscopic gallbladder removal in India is planned around USD 1,800–3,000. Silent stones are not an automatic reason to fly.",
    answer:
      "Keyhole gallbladder removal is a planning range of about USD 1,800–3,000, with a 1–2 day stay. A duct stone needing endoscopy is a different procedure and price.",
    intro:
      "Stones on an ultrasound frighten people into booking surgery they may not need. Pain, infection or jaundice are the usual reasons to operate. TechDr sends the scan to a surgeon and is content to reply ‘watch’. If an ERCP is required, it appears as its own line.",
    focus: ["Symptoms, not just a scan", "Keyhole and endoscopy priced apart", "A short trip only after an uncomplicated operation"],
    faqs: [
      { question: "Should every stone come out?", answer: "No. Silent stones are often observed." },
      { question: "What is ERCP?", answer: "An endoscopy for a duct stone. It is not included unless listed." },
      { question: "When can I fly?", answer: "Often within a week after uncomplicated keyhole surgery, if you are eating and not jaundiced." },
      { question: "Can the operation become an open cut?", answer: "Yes, if safety requires it. Consent should say so." },
    ],
  },
  {
    slug: "pediatric-surgery",
    name: "Pediatric surgery",
    description:
      "Pediatric heart surgery in India is planned around USD 5,000–9,000 for straightforward repairs. The echo, not a package name, sets the quote.",
    answer:
      "A straightforward congenital heart repair is often planned around USD 5,000–9,000, with paediatric ICU as the swing factor. A parent must travel. Unstable children should not board a commercial flight.",
    intro:
      "Children are not small adults. Quotes follow the echo and the child’s weight. TechDr does not publish a generic ‘hole in the heart’ price as if every defect were the same. Fitness to fly after surgery is a letter, not an assumption, and airlines can still refuse.",
    focus: ["Echo before a firm quote", "Paediatric ICU", "A parent who can consent"],
    faqs: [
      { question: "Can you quote from a report alone?", answer: "Only a wide band. The echo video changes the operation." },
      { question: "Who must come?", answer: "A parent or legal guardian." },
      { question: "What if our baby needs oxygen now?", answer: "Tell us. The next hospital may need to be the nearest one, not one in India." },
      { question: "Are later staged operations included?", answer: "No. Each stage is its own plan." },
    ],
  },
  {
    slug: "ent",
    name: "ENT",
    description:
      "ENT guides for India include rhinoplasty at about USD 1,800–3,500 and cochlear implant at about USD 11,000–18,000 per ear. The quote names the operation and, for an implant, the device.",
    answer:
      "Primary rhinoplasty is often planned around USD 1,800–3,500, with 10–14 days before a flight you will be comfortable taking. Swelling lasts months. Revision costs more.",
    intro:
      "ENT and facial surgeons should talk about the airway even when you came for a profile. Septum-only surgery is cheaper and does less for the bridge. TechDr will not pass on a guarantee of a celebrity nose. Reference photos are a starting language, not a contract. Cochlear implant is a separate ear operation: the audiogram decides candidacy, and switch-on is planned before travel.",
    focus: ["Function plus shape", "Splint removal before travel", "No guaranteed photo match"],
    faqs: [
      { question: "When is the final result visible?", answer: "Over months. Week two is bruising, not the outcome." },
      { question: "Is a septum operation the same?", answer: "No. Ask the quote to say septorhinoplasty if both are intended." },
      { question: "Can sinus disease be treated too?", answer: "Sometimes, as an extra line." },
      { question: "Will I have black eyes?", answer: "Often for one to two weeks." },
      { question: "Where is the cochlear implant guide?", answer: "On its own page under ENT. It is priced per ear and needs an audiogram before a date is set." },
    ],
  },
  {
    slug: "health-checkups",
    name: "Health check-ups",
    description:
      "Full-body health checks in India cost about USD 150–400. Compare the test list, not the brochure title, and treat results as screening.",
    answer:
      "Common full-body checks cost about USD 150–400 and finish in a day or two. They do not rule out every cancer and they are not a treatment plan.",
    intro:
      "The useful product is a named list of tests and a physician who will explain abnormal results. Whole-body scans sold as reassurance often create incidental findings. TechDr compares panels and will tell you if a symptom needs a specialist visit instead of a package.",
    focus: ["Named tests", "English physician summary", "No pressure to convert a mild abnormality into surgery"],
    faqs: [
      { question: "Will it find all cancers?", answer: "No. Symptoms need a targeted consultation." },
      { question: "Do I fast?", answer: "Usually for morning bloods. The confirmation says from when." },
      { question: "Can I fly the same day?", answer: "After a standard check, yes. Not after sedation." },
      { question: "Is this an immigration medical?", answer: "Only if you asked for a specific form. Say so." },
    ],
  },
  {
    slug: "neurosurgery",
    name: "Neurosurgery",
    description:
      "Neurosurgery in India for spinal cord tumours, aneurysm clipping, deep brain stimulation, epilepsy surgery and complex spine plans. Each quote names the operation.",
    answer:
      "Neurosurgery is planned from the MRI or angiogram. Indicative ranges start around USD 8,000–15,000 for selected spinal cord and epilepsy operations, and around USD 18,000–30,000 for deep brain stimulation including the device. A ruptured aneurysm is an emergency at home, not a flight.",
    intro:
      "Brain tumour surgery already has its own guide. This section lists named brain conditions and operations, from tumours and aneurysms to shunts and stimulation. Each quote names one plan. Spine conditions have their own section. A sudden severe headache or a new paralysis needs the nearest emergency hospital.",
    focus: ["The operation is named", "Emergency bleeds stay local", "Devices and programming are written into the quote"],
    faqs: [
      { question: "Is every brain problem operable?", answer: "No. Some aneurysms are watched or coiled. Some epilepsy foci are not clear enough to remove." },
      { question: "Can I fly after a brain bleed?", answer: "No. That is local emergency care." },
      { question: "Are device costs included?", answer: "Only if the quote names the deep brain stimulation system." },
      { question: "Where is brain tumour surgery?", answer: "On its own guide under neurology. This section links the other cranial and spinal operations." },
    ],
  },
  {
    slug: "gynaecology",
    name: "Gynaecology",
    description:
      "Gynaecology surgery in India: myomectomy, hysterectomy, endometriosis, ovarian cysts and complex reproductive surgery. IVF and ICSI have their own fertility guides. Surrogacy is not arranged.",
    answer:
      "A named gynaecology operation is often planned between about USD 1,800 and USD 8,000, depending on whether this is a cyst, a hysterectomy or deep endometriosis. Fertility is stated honestly. TechDr does not arrange surrogacy.",
    intro:
      "The uterus, ovaries and a cancer diagnosis are different operations. Keeping the uterus is a myomectomy. Removing it is a hysterectomy. A suspicious ovarian mass is not given a simple cyst price. IVF and ICSI sit in the fertility section.",
    focus: ["The organ being removed is written down", "Cancer is not priced as a simple cyst", "No surrogacy"],
    faqs: [
      { question: "Is hysterectomy reversible?", answer: "No. If you want a pregnancy, ask about myomectomy or another operation instead." },
      { question: "Do you arrange surrogacy?", answer: "No." },
      { question: "Are ovaries removed automatically?", answer: "No. That choice is written before travel." },
      { question: "Where is IVF?", answer: "On the IVF and ICSI guides. A surgical page does not include a fertility cycle unless a separate quote says so." },
    ],
  },
  {
    slug: "plastic-surgery",
    name: "Plastic and reconstructive surgery",
    description:
      "Reconstructive surgery in India for burns, facial defects, breast reconstruction, scar revision and microsurgical flaps. Cosmetic rhinoplasty has its own guide.",
    answer:
      "Reconstruction is priced per stage. A scar sitting is often about USD 800–3,000. A free flap is often about USD 6,000–16,000. Acute major burns need a local emergency unit. A scar cannot be erased.",
    intro:
      "These pages are for function and closure after burns, cancer and injury. Cosmetic rhinoplasty stays under ENT. Breast reconstruction does not replace cancer treatment. A free flap is watched in hospital for several days and can fail.",
    focus: ["Stages are counted", "Acute burns stay local", "Flaps are named"],
    faqs: [
      { question: "Can a scar be removed completely?", answer: "No. Revision aims at a better scar." },
      { question: "Is reconstruction the same as a cosmetic nose job?", answer: "No. Rhinoplasty has its own guide." },
      { question: "What if a flap fails?", answer: "The team usually returns to theatre. That return is discussed before travel. It is not an unlimited promise." },
      { question: "Can you treat a fresh major burn?", answer: "A healed contracture can be planned. An acute unstable burn needs the nearest burn unit." },
    ],
  },
  {
    slug: "nephrology",
    name: "Nephrology and kidney care",
    description: "Plan dialysis, kidney biopsy and chronic kidney disease care in India. A transplant is a separate legal pathway.",
    answer: "Kidney care is planned from the blood tests and the scan. Dialysis, a biopsy and a transplant are different stays and different prices. A lawful donor is mandatory for a transplant. Paid donation is refused.",
    intro: "People travel hoping one package will cover years of kidney failure. It will not. This section names the disease and the access operations. Transplant pages state the donor rules. An unstable patient who needs emergency dialysis tonight belongs in the nearest hospital.",
    focus: ["The cause of the kidney disease is named", "Dialysis sessions are counted", "Transplant stays on the legal pathway"],
    faqs: [
      { question: "Is dialysis a cure?", answer: "No. It replaces kidney function for that session. A transplant is a different plan." },
      { question: "Can I fly for emergency dialysis?", answer: "No. Acute fluid overload or a high potassium needs local emergency care." },
      { question: "Does this page include a kidney transplant?", answer: "Only as a link to the transplant guide. The donor still has to be lawful." },
    ],
  },
  {
    slug: "hepatology",
    name: "Liver transplant and hepatology",
    description: "Liver disease treatment and transplant planning in India. Deceased-donor organs are not freely available to foreign patients.",
    answer: "Liver care is planned from the scans, the blood tests and whether a transplant is even lawful. Medical treatment, a resection and a transplant are different quotes. Paid donation is refused.",
    intro: "Cirrhosis, a bile-duct problem and a transplant are not one package. This section separates them. A living donor has to fit India’s rules. A trip should not be booked on the hope of a public waiting-list organ.",
    focus: ["The liver disease is named", "Transplant and resection are different quotes", "No paid donation"],
    faqs: [
      { question: "Can a foreign patient join the Indian deceased-donor list?", answer: "Not freely. Assume a living donor or no transplant until a hospital says otherwise in writing." },
      { question: "Is every cirrhotic liver transplanted?", answer: "No. Many people are treated for the cause, the fluid and the bleeding risk." },
      { question: "Are ERCP and a transplant the same stay?", answer: "No. Ask for separate lines." },
    ],
  },
  {
    slug: "pulmonology",
    name: "Pulmonology and thoracic surgery",
    description: "Lung disease treatment and chest surgery in India, with transplant limits stated separately from a lobectomy.",
    answer: "Chest care is planned from the CT and the breathing tests. Medicines, a scope and an operation are different quotes. A lung transplant needs a lawful donor pathway. Acute breathlessness needs the nearest hospital.",
    intro: "COPD, a pleural effusion and a lung resection should not share a headline price. This section names each one. Oxygen-dependent patients need a fitness-to-fly decision before any ticket is bought.",
    focus: ["Breathing tests before a surgical quote", "Cancer operations named separately", "No commercial flight for someone in respiratory failure"],
    faqs: [
      { question: "Is every lung nodule an operation?", answer: "No. Some are watched. The CT and a biopsy decide." },
      { question: "Can I fly on oxygen?", answer: "Only if the airline and the chest team both agree. Tell us before you book." },
      { question: "Is a lung transplant listed here?", answer: "The guide is linked. Foreign patients cannot freely receive an Indian deceased-donor organ." },
    ],
  },
  {
    slug: "vascular-surgery",
    name: "Vascular and endovascular surgery",
    description: "Aneurysm, carotid and peripheral artery plans in India. A rupture is an emergency at home, not a flight.",
    answer: "Artery and vein care is planned from the scan. Open surgery and a stent are different operations. A leaking aneurysm or a cold, painful leg needs the nearest emergency hospital.",
    intro: "This section names the vessel problem and the procedure. A stent graft that must be watched for years is not the same as an open repair. The quote should say which one the scan supports.",
    focus: ["The scan decides open surgery or a stent", "Rupture stays local", "Surveillance after a stent is part of the plan"],
    faqs: [
      { question: "Can I fly with a known aneurysm?", answer: "Only if the surgeon who knows the diameter says the flight is reasonable. Sudden pain is an emergency." },
      { question: "Is a varicose-vein laser the same as a bypass?", answer: "No. They are different operations and different prices." },
      { question: "Do stents need follow-up?", answer: "Yes. A stent graft needs surveillance scans. Ask who does them after you fly home." },
    ],
  },
  {
    slug: "haematology",
    name: "Haematology and bone marrow transplant",
    description: "Blood cancer and bone marrow transplant planning in India. The donor type and the weeks in the city are written down.",
    answer: "Blood disorders are not one price. Chemotherapy, a named transplant and supportive care are separate lines. A donor, when one is required, must be lawful. Paid donation is refused.",
    intro: "Leukaemia treatment can last months. A transplant is a long stay near the unit, not a weekend admission. This section separates the disease pages from autologous, allogeneic, haploidentical and cord transplants.",
    focus: ["The disease and the transplant type are named", "Weeks nearby, not a short package", "No paid donor"],
    faqs: [
      { question: "Is every leukaemia treated with a transplant?", answer: "No. Many are treated with medicines. A transplant is for selected cases." },
      { question: "How long is a transplant stay?", answer: "Often one to three months nearby. The quote should say so." },
      { question: "Can I pay a donor?", answer: "No." },
    ],
  },
  {
    slug: "general-surgery",
    name: "General and laparoscopic surgery",
    description: "Hernia, appendix and other abdominal operations in India. Acute peritonitis needs the nearest hospital.",
    answer: "General surgery quotes name the operation and whether it is keyhole or open. A hernia repair is not an appendix operation. Severe pain with fever needs local emergency care, not a flight.",
    intro: "This section is for planned abdominal operations and for naming the hernia or the appendix problem. Gallbladder and bowel pages also sit with gastroenterology when that is the clearer home. The written quote says which cut is intended.",
    focus: ["Keyhole and open are different lines", "The hernia type is named", "Acute abdominal emergencies stay local"],
    faqs: [
      { question: "Is every hernia a keyhole repair?", answer: "No. The scan and previous surgery decide. The quote should say which approach." },
      { question: "Can I fly with appendicitis tonight?", answer: "No. Acute appendicitis needs the nearest surgical hospital." },
      { question: "Are gallbladder pages here?", answer: "The main gallbladder guide sits with gastroenterology. This section links the general-surgery names." },
    ],
  },
  {
    slug: "rheumatology",
    name: "Rheumatology and autoimmune disorders",
    description: "Arthritis and autoimmune disease plans in India. Medicines come before joint surgery.",
    answer: "Rheumatology care is a diagnosis and a medicine plan. Joint replacement is a separate orthopaedic quote, and it is not the first step for most people.",
    intro: "Inflammatory arthritis, lupus and gout should not be booked as operations. This section is for the medical plan. If a joint is destroyed, the orthopaedic guide is a different page and a different consent.",
    focus: ["Medicines before surgery", "The disease is named", "Infections and cancer screens are not skipped to start a strong drug"],
    faqs: [
      { question: "Will I have a joint replacement on this page?", answer: "Only if an orthopaedic guide is linked. Rheumatoid arthritis itself is not an operation." },
      { question: "Can strong arthritis drugs be started on a short trip?", answer: "Sometimes the plan starts here. The monitoring often continues at home. The quote should say which." },
      { question: "Is gout an operation?", answer: "No. It is a medical plan, with surgery only for a separate damaged joint." },
    ],
  },
  {
    slug: "endocrinology",
    name: "Endocrinology and endocrine surgery",
    description: "Diabetes, thyroid and adrenal plans in India. An operation is quoted only when the tests support one.",
    answer: "Hormone care is planned from blood tests and scans. Diabetes treatment is not a thyroidectomy. Surgery is a separate quote when a gland actually needs to come out.",
    intro: "This section separates medical endocrine disease from neck and adrenal operations. A thyroid nodule is not automatically a total thyroidectomy. The quote names the operation and what is left behind.",
    focus: ["Blood tests before a surgical quote", "Total and partial thyroid surgery are different", "Diabetes surgery sits with the bariatric pages"],
    faqs: [
      { question: "Does every thyroid nodule need surgery?", answer: "No. Ultrasound and a needle test decide. Many nodules are watched." },
      { question: "Is diabetes cured by a trip?", answer: "No. Type 2 diabetes surgery is a separate bariatric plan, and it is not right for everyone." },
      { question: "Will I need thyroid tablets after surgery?", answer: "After a total thyroidectomy, yes. The discharge letter must say so." },
    ],
  },
  {
    slug: "dermatology",
    name: "Dermatology and skin treatments",
    description: "Skin disease treatment and selected skin surgery in India. A rash is not the same as skin-cancer surgery.",
    answer: "Dermatology plans name the condition. Creams, light treatment and an operation are different quotes. Skin cancer is not treated as a cosmetic laser.",
    intro: "Psoriasis and a mole that might be cancer should not share a package. This section keeps them apart. A scar can be improved and cannot be erased. Acute widespread skin failure needs local care.",
    focus: ["The diagnosis is named", "Cancer surgery is not a cosmetic sitting", "Lasers are quoted per area"],
    faqs: [
      { question: "Can a laser remove every scar?", answer: "No. It can improve some scars. It does not restore normal skin." },
      { question: "Is vitiligo cured in one sitting?", answer: "No. Medical treatment and surgery, when used, are partial and can need repeat care." },
      { question: "Where is burn reconstruction?", answer: "On the plastic-surgery guide. Acute major burns need a local burn unit." },
    ],
  },
  {
    slug: "infectious-diseases",
    name: "Infectious diseases and tropical medicine",
    description: "TB, hepatitis, HIV and other infection plans in India. A cure is not a short package, and sepsis is an emergency.",
    answer: "Infection care is a drug plan with a duration. Tuberculosis and HIV are not weekend treatments. Severe sepsis needs the nearest hospital.",
    intro: "This section is for planned specialist care of named infections. Drug-resistant TB takes months. HIV treatment continues at home. Do not fly if you are unstable, confused or in shock.",
    focus: ["The organism and the drug plan are named", "Duration is honest", "Emergencies stay local"],
    faqs: [
      { question: "Can India cure drug-resistant TB in a week?", answer: "No. Treatment is measured in months, and the drugs have to match the resistance report." },
      { question: "Is HIV cured by travel?", answer: "No. Treatment is long-term. A trip can be for a plan and a supply discussion." },
      { question: "Should I fly with suspected sepsis?", answer: "No. That is local emergency care." },
    ],
  },
  {
    slug: "critical-care",
    name: "Critical care and emergency medicine",
    description: "Intensive-care transfers are planned only after a team says the move is safe. An emergency tonight stays local.",
    answer: "Critical care is not a holiday admission. Unstable patients need the nearest emergency hospital. TechDr coordinates a transfer only after the receiving team accepts a patient who is safe to move.",
    intro: "These pages exist so families can see what an intensive-care plan involves. They are not an instruction to board a flight during a stroke, a bleed or septic shock. Air ambulance, when it is appropriate, is a separate contract.",
    focus: ["Nearest hospital first", "A transfer only after acceptance", "No promise of survival"],
    faqs: [
      { question: "Can you evacuate someone tonight?", answer: "Not from this website. The local emergency team has to stabilise the patient. A receiving unit then has to accept the transfer." },
      { question: "Is ECMO a package I can book?", answer: "No. It is for selected organ failure in an intensive-care unit, after a team agrees it is appropriate." },
      { question: "Does the price include an air ambulance?", answer: "No, unless a separate contract says so." },
    ],
  },
  {
    slug: "pain-rehabilitation",
    name: "Pain and rehabilitation medicine",
    description: "Pain procedures and rehabilitation programmes in India. An injection is not a cure, and the session count is written down.",
    answer: "Pain care starts with the diagnosis. Injections, a stimulator and a rehabilitation programme are different quotes. None of them promises a pain-free date.",
    intro: "Back pain after failed surgery, nerve pain and a joint that needs physiotherapy should not be sold as one injection. This section names the procedure and the number of sessions. A new weakness or loss of bladder control is an emergency, not a pain-clinic booking.",
    focus: ["The pain diagnosis is named", "Session counts are written down", "Injections are not described as a cure"],
    faqs: [
      { question: "Will one injection fix chronic pain?", answer: "Usually no. Some injections help for a time. The plan should say what happens if they do not." },
      { question: "Is rehabilitation the same as surgery?", answer: "No. It is exercise, therapy and education. Surgery is a different consent." },
      { question: "How many sessions are included?", answer: "Only the number in the quote. Extra weeks cost more." },
    ],
  },
];

export function getSpecialty(slug: string) {
  return specialties.find((item) => item.slug === slug);
}
