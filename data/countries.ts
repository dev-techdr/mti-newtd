export type CountryPage = {
  slug: string;
  name: string;
  adjective: string;
  description: string;
  answer: string;
  flights: string;
  visa: string;
  language: string;
  money: string;
  treatments: string;
  culture: string;
  faqs: { question: string; answer: string }[];
};

export const countries: CountryPage[] = [
  {
    slug: "nigeria",
    name: "Nigeria",
    adjective: "Nigerian",
    description:
      "Medical travel from Nigeria to India: typical flight patterns, visa checks, English coordination and the treatments families most often ask TechDr to price.",
    answer:
      "Patients from Nigeria usually reach India in about 8–14 hours including a Gulf or Addis Ababa connection, sometimes less when a nonstop is on sale. TechDr plans the hospital, the invitation letter and the hotel. The visa itself is confirmed on the official Indian portal, not by a travel agent’s screenshot.",
    flights:
      "Lagos and Abuja connect to Delhi, Mumbai and other cities most often through Dubai, Doha, Addis Ababa or Istanbul. Nonstop services appear and disappear by season. Build a rest night if the connection is tight and you are not well. TechDr’s pickup meets the flight that actually lands, including delays.",
    visa:
      "Check whether the e-Medical Visa is open for your Nigerian passport before you pay anyone. The list and the fee change. You will need a passport with enough validity, a photo, proof of funds and a hospital invitation letter. TechDr requests that letter from the partner hospital after you accept a written plan. We cannot speed up a government queue.",
    language:
      "Coordination is in English. If a parent is more comfortable in another language, ask for an interpreter before you travel rather than on the morning of consent.",
    money:
      "Cards are widely used in private hospitals, but Nigerian cards are sometimes declined abroad. Tell your bank, carry a backup card, and keep some USD for the first day. India asks travellers to declare foreign currency notes above the customs threshold — check the current CBIC figure before you pack cash. Do not move money through informal brokers.",
    treatments:
      "Families writing from Nigeria most often ask about knee and hip replacement, heart bypass or stents, cancer surgery, IVF and full-body checks. None of those is booked from a chat message. Send the reports and we will say if a trip is even appropriate.",
    culture:
      "Halal meals and a prayer space can be requested in partner hospitals. Ask two weeks before admission, not at the nursing station on day one. A companion is strongly recommended for heart surgery, joint replacement and any admission involving anaesthesia.",
    faqs: [
      { question: "Is there a direct flight from Lagos to India?", answer: "Sometimes, depending on the season and the airline. Most itineraries still connect in the Gulf or via Addis Ababa. Check dates close to travel." },
      { question: "Will TechDr get my visa?", answer: "We arrange the hospital invitation letter. You apply on the official portal, and only the Indian authorities approve the visa." },
      { question: "Can you talk to my family on WhatsApp?", answer: "Yes, once a case is open. The number is the TechDr desk published on the contact page, not a personal number that changes." },
      { question: "Do I need a companion?", answer: "For any operation, yes. Airlines and wards are difficult alone if you are sore or drowsy." },
    ],
  },
  {
    slug: "kenya",
    name: "Kenya",
    adjective: "Kenyan",
    description:
      "From Kenya to treatment in India: Nairobi flight times, visa steps, English and Swahili support, and how to plan money and recovery.",
    answer:
      "Nairobi–Mumbai is often about 6–8 hours when a nonstop operates, and longer via the Gulf. Kenyan patients usually coordinate in English. A Swahili interpreter can be requested. Visa eligibility is checked on the official Indian portal before tickets are locked.",
    flights:
      "Direct Nairobi–Mumbai services have operated for years, alongside connections via Dubai, Doha and Addis Ababa into Delhi, Chennai and other cities. If you use a wheelchair or have had recent chest pain, do not book the last connection of the night.",
    visa:
      "Apply only after you know your passport is eligible for the category you want. TechDr’s invitation letter supports a medical visa application. It is not the visa. Print the approval and the letter for the airline, because check-in staff sometimes ask.",
    language:
      "English is the default. Swahili interpretation can be arranged for consultations if you ask while the file is being scheduled, not in the anaesthetic room.",
    money:
      "M-Pesa does not pay an Indian hospital bill. Use an international card or a transfer your bank can document. Declare cash above the Indian customs threshold. Keep the hospital invoice for your records at home.",
    treatments:
      "Common requests are orthopaedics, cardiac care, cancer opinions and fertility. A second opinion on an existing Kenyan plan is often the right first step, especially if someone has already recommended a major operation.",
    culture:
      "Diet requests, including halal food, should be on the admission form. Sunday clinics may be limited. Plan tests on weekdays.",
    faqs: [
      { question: "How long is the flight from Nairobi?", answer: "About 6–8 hours nonstop to Mumbai when that flight is operating. Other cities usually need a connection." },
      { question: "Can a child travel for heart surgery?", answer: "Only if a paediatric cardiac team says the child is fit to fly, and a parent comes. See the pediatric heart surgery guide." },
      { question: "Will someone meet us at night?", answer: "Yes if the pickup is booked against the flight number. Send delays on WhatsApp." },
      { question: "Is India safe for Kenyan patients?", answer: "Accredited hospitals and a planned transfer are the safety model. Ordinary city precautions still apply. Read the safety guide before you decide." },
    ],
  },
  {
    slug: "bangladesh",
    name: "Bangladesh",
    adjective: "Bangladeshi",
    description:
      "Treatment in India for patients from Bangladesh: short Dhaka flights, Bengali coordinators, visa cautions and the care families usually request.",
    answer:
      "Dhaka to Kolkata is often about an hour, and Dhaka to Delhi about two and a half to three hours when nonstops operate. Bengali-speaking coordinators are available. Confirm the correct Indian visa channel for Bangladeshi passports on the official site before you pay a middleman.",
    flights:
      "Kolkata is the short hop and a practical hospital city. Delhi, Chennai, Hyderabad, Mumbai and Bengaluru are a little further and are chosen when the specialty team is there. Do not pick a city only because the fare is USD 40 cheaper if the surgeon you need is elsewhere.",
    visa:
      "Bangladeshi passports do not always use the same e-visa screen as other countries. Rules change. TechDr will not guess. We prepare the hospital letter for the route you are actually eligible for, and we would rather delay than send you to a closed counter.",
    language:
      "Bengali and English. Consent forms can be explained in Bengali. Sign only what you understand. Ask for a pause if the translation feels rushed.",
    money:
      "Carry a documented route for hospital payments. Declare currency above the Indian threshold. Keep a buffer for extra nights if a discharge slips, which is common after surgery.",
    treatments:
      "Cardiac care, cancer, eye surgery, orthopaedics and liver opinions are frequent requests. Proximity makes people rush. A one-hour flight is still an operation. Send the reports first.",
    culture:
      "Food is easy to match, including halal meals. Family attendants are welcome within the hospital’s visitor rules. Large groups in a ward are often stopped. Name two attendants, not ten.",
    faqs: [
      { question: "Should we always choose Kolkata?", answer: "Choose it when the clinical plan is there. A short flight to the wrong operation is still the wrong operation." },
      { question: "Can you coordinate in Bengali?", answer: "Yes. Say so on the quote form and we will assign a Bengali-speaking coordinator." },
      { question: "Is a medical visa different from a tourist visa?", answer: "Yes. Treatment on the wrong visa category can become a problem at the hospital. Use the category the official portal offers you." },
      { question: "How soon can we travel?", answer: "After the opinion and the visa, not before. Emergencies belong in the nearest capable hospital." },
    ],
  },
  {
    slug: "iraq",
    name: "Iraq",
    adjective: "Iraqi",
    description:
      "Medical travel from Iraq to India: Gulf connections, Arabic-speaking support, invitation letters and the treatments families ask about most.",
    answer:
      "Most journeys from Baghdad, Erbil or Basra to India connect in the Gulf and take roughly 6–12 hours door to door. Arabic-speaking coordinators are available. The Indian e-Medical Visa must be confirmed for your passport on the official portal before flights are paid.",
    flights:
      "Routes usually run via Dubai, Doha or Istanbul into Delhi or Mumbai. Erbil often has the smoother connections. Leave a gap between landing and admission so a delayed Gulf flight does not become a missed surgery slot.",
    visa:
      "Eligibility and fees change. Apply yourself on the official portal using the hospital invitation letter TechDr arranges after you accept a plan. Do not hand your passport to an unofficial agent who promises a ‘special medical visa’.",
    language:
      "Arabic for coordination and consent explanations, English for the medical record. Both can be in the file. Tell us which dialect your parents are most comfortable with if they will sign.",
    money:
      "USD is familiar to many Iraqi families. Hospitals still want a traceable payment. Declare cash above the Indian customs threshold. Sanctions and bank checks sometimes delay transfers — start that conversation early, not the day before surgery.",
    treatments:
      "Cardiac surgery, cancer, orthopaedics, neurosurgery and IVF are the usual requests. War injuries and complex reconstructions need the imaging, not a summary. If a patient is unstable, we will say not to fly.",
    culture:
      "Request halal food and a prayer area before admission. A male or female attendant can be specified where the hospital can accommodate it. Friday schedules are quieter for elective tests.",
    faqs: [
      { question: "Can we travel from Erbil more easily than Baghdad?", answer: "Often the connections are simpler. The medical plan is the same. Choose the airport that gets you there rested." },
      { question: "Do you speak Arabic?", answer: "Yes. Arabic coordinators cover the case, not only the first phone call." },
      { question: "Will the hospital accept a cash deposit?", answer: "Policies differ. We confirm the payment route in the quote so you are not arguing at admissions." },
      { question: "What if our reports are in Arabic?", answer: "Send them. We will translate what the surgeon needs. Original scans still matter more than the translated prose." },
    ],
  },
  {
    slug: "oman",
    name: "Oman",
    adjective: "Omani",
    description:
      "Treatment in India for patients from Oman: short Muscat flights, Arabic support, and how a planned quote compares with treatment at home.",
    answer:
      "Muscat to Mumbai is often about three hours nonstop. Delhi and other cities are a similar short-haul via a direct or one-stop flight. Arabic coordination is available. Many Omani families use India for planned surgery rather than emergencies, which is the right way around.",
    flights:
      "Direct Muscat–Mumbai flights are frequent. Delhi, Chennai and Hyderabad are easy with one stop or a direct service when it operates. The flight is short enough that people under-plan recovery. The stay in India is set by the operation, not by the three-hour sector.",
    visa:
      "Confirm e-Medical Visa eligibility for Omani passports on the official portal. TechDr supplies the hospital invitation after you accept a written estimate. Residents who are not Omani citizens must check the passport they will actually travel on.",
    language:
      "Arabic and English. Discharge summaries are in English so a doctor in Muscat can continue care. Ask for an Arabic explanation before you sign consent.",
    money:
      "Omani cards generally work in private hospitals. Tell the bank. USD is unnecessary if the card is reliable, but a small backup is sensible. Keep invoices for reimbursement if a sponsor or insurer has agreed to consider them — TechDr does not bill insurers directly unless that is contracted.",
    treatments:
      "Joint replacement, heart procedures, cancer surgery and health checks are common. Because the flight is short, some families want to go and return in a weekend. That is realistic for a health check and unrealistic for a joint replacement.",
    culture:
      "Halal meals are a standard request and easy to honour if we know before admission. Prayer times can be accommodated around non-urgent tests. A male attendant for a male patient, or the reverse, can be noted on the file.",
    faqs: [
      { question: "Is Mumbai the default from Muscat?", answer: "It is the shortest flight, not always the right campus. We pick the campus after the reports." },
      { question: "Can I come for a check and decide later?", answer: "Yes. A one- to three-day health check is a sensible first trip." },
      { question: "Do you guarantee a date next week?", answer: "Only after a surgeon has accepted the file and a visa is in hand." },
      { question: "Will follow-up be in Oman?", answer: "Yes, with your own doctor, using the English summary. Video review with India can be added." },
    ],
  },
  {
    slug: "uzbekistan",
    name: "Uzbekistan",
    adjective: "Uzbek",
    description:
      "Medical travel from Uzbekistan to India: Tashkent–Delhi flights, Russian-speaking support, visa letters and treatments patients usually compare.",
    answer:
      "Tashkent to Delhi is often about three to four hours when a nonstop operates. Russian-speaking coordinators handle the file. An Uzbek interpreter can be added. Confirm the Indian medical visa route for your passport before you pay for tickets.",
    flights:
      "Delhi is the usual gateway, with connections on to Mumbai, Chennai or other campuses if the team is not in the capital. Winter schedules are reliable enough, but leave a night in Delhi if you are continuing domestically after a long delay.",
    visa:
      "Use the official Indian portal. TechDr’s role is the hospital invitation letter and a checklist, not a stamped visa. Print everything. Border staff have asked families for the letter even when an e-visa is linked to the passport.",
    language:
      "Russian is available for coordination and family meetings. Medical records are issued in English. If you need Uzbek rather than Russian, say so at the start.",
    money:
      "USD cash is common in travel plans from Uzbekistan. Indian hospitals prefer a documented payment. Declare amounts above the customs threshold. Cards work more often than people expect — still carry a second method.",
    treatments:
      "Cardiac surgery, orthopaedics, neurosurgery, IVF and cancer opinions are the requests we see most. Bring imaging on disk. A translated epicrisis without the images is not enough for a surgeon.",
    culture:
      "Halal food can be requested. The climate shock from a Uzbek winter to an Indian summer is real — say if you are travelling with an older parent who does not tolerate heat.",
    faqs: [
      { question: "Is Delhi the right city from Tashkent?", answer: "It is the right airport. The hospital might still be in another city. We will say which, and why." },
      { question: "Do you work in Russian?", answer: "Yes. The case manager can run the file in Russian." },
      { question: "Can we bring a CD of the MRI?", answer: "Please do. Films and PDFs lose detail." },
      { question: "How many attendants can get a visa?", answer: "Medical attendant visas exist and the rules change. Check the current attendant rules on the official portal. We explain them on the visa page." },
    ],
  },
  {
    slug: "ethiopia",
    name: "Ethiopia",
    adjective: "Ethiopian",
    description:
      "From Ethiopia to hospitals in India: Addis–Delhi flights, English coordination, forex planning and the treatments families ask TechDr to arrange.",
    answer:
      "Addis Ababa to Delhi is often about six hours nonstop on Ethiopian Airlines when that service operates. Coordination is in English, with Amharic interpretation on request. Sort forex permission before you promise a hospital a transfer date.",
    flights:
      "Addis is a practical hub, with onward Indian cities via Delhi or separate tickets. If you are unwell, a six-hour nonstop is kinder than a two-stop ticket that saves a little money. Tell us if you need a wheelchair at Bole and at DEL.",
    visa:
      "Confirm e-Medical Visa eligibility for Ethiopian passports on the official portal. The hospital invitation comes after a clinical plan is accepted. Applying with a tourist visa ‘to decide later’ can leave a hospital unable to admit you for surgery.",
    language:
      "English for the medical record. Amharic interpreters can join key consultations if booked in advance.",
    money:
      "Ethiopian forex rules can slow a transfer. Start with your bank early and keep the paperwork. Declare cash above India’s customs threshold. A card that works abroad is the cleanest backup.",
    treatments:
      "Cardiac care, orthopaedics, cancer and kidney opinions are common. Dialysis patients need a confirmed dialysis slot if the transplant work-up will take weeks. Do not arrive assuming a bed.",
    culture:
      "Fasting calendars matter to some families. Tell us if a surgery date collides with a fast you intend to keep, so the physician can say whether that is safe. Halal or other diet requests should be on the admission note.",
    faqs: [
      { question: "How long is Addis to Delhi?", answer: "About six hours when the nonstop operates. Confirm the day you ticket." },
      { question: "Can you arrange Amharic?", answer: "Yes, if you ask before the consultations are booked." },
      { question: "What if the bank delays the transfer?", answer: "Surgery dates move. We would rather reschedule than admit you without a clear payment route." },
      { question: "Is a companion visa separate?", answer: "Often yes. Check the attendant category on the official portal." },
    ],
  },
  {
    slug: "tanzania",
    name: "Tanzania",
    adjective: "Tanzanian",
    description:
      "Medical travel from Tanzania to India: connections from Dar es Salaam, English and Swahili support, and how to compare a written Indian quote.",
    answer:
      "Journeys from Dar es Salaam or Kilimanjaro to India typically take 9–14 hours with a connection in Addis Ababa or the Gulf. English is the coordinating language. Swahili interpretation can be requested. Confirm the visa on the official Indian portal before you pay a third party.",
    flights:
      "Most routings connect in Addis Ababa, Dubai or Doha and land in Mumbai or Delhi. Zanzibar travellers should add the domestic leg and a rest, not a same-night international departure after a ferry. Wheelchair requests need the airline and our pickup both notified.",
    visa:
      "The invitation letter is our part. The visa decision is the Indian government’s. Check passport eligibility, photo rules and the medical versus attendant category. Print the approval.",
    language:
      "English by default. Swahili can be arranged for family conferences if we know when you book the consultations.",
    money:
      "Use a card that works internationally or a documented transfer. Mobile money from Tanzania will not pay the hospital. Declare large cash on arrival in India. Keep every receipt.",
    treatments:
      "Orthopaedics, cardiac opinions, cancer and IVF are the usual requests. A second opinion is cheaper than a wasted flight. Send the imaging first.",
    culture:
      "Request halal meals early. Attendants should expect security checks at hospital gates. One trained attendant is more useful than a rotating crowd.",
    faqs: [
      { question: "Which Indian city is closest?", answer: "In time, Mumbai or Delhi via Addis or the Gulf. The closest useful city is the one with the right plan." },
      { question: "Can parents who do not speak English come?", answer: "Yes. Book Swahili or another interpreter in advance and do not rely on a child to translate consent." },
      { question: "How long should we budget?", answer: "The procedure page has the stay. Add two days for flights and delays." },
      { question: "Do you have a Dar es Salaam office?", answer: "The case desk is remote and on WhatsApp. We do not pretend to have a ward in Dar." },
    ],
  },
  {
    slug: "afghanistan",
    name: "Afghanistan",
    adjective: "Afghan",
    description:
      "Treatment in India for Afghan patients: changing flight routes, Dari or Pashto interpreters, visa caution and how TechDr handles unstable travel plans.",
    answer:
      "Commercial routes from Afghanistan change often. Most families connect through a regional hub into Delhi. Dari or Pashto interpreters can be requested. Confirm the Indian visa category for the passport you hold today, and do not buy non-refundable tickets before that is clear.",
    flights:
      "Assume a connection and a buffer day. Direct options, when they exist, should be rechecked close to departure. If a patient is injured or short of breath, the first hospital is the nearest safe one, not a flight to India. TechDr will say that plainly.",
    visa:
      "Rules for Afghan passports can be tighter and can change with little notice. Use only the official Indian portal and the hospital letter we arrange. Anyone offering a visa ‘without documents’ is not working with us.",
    language:
      "Dari or Pashto interpretation can be booked for consultations. The written record is English. Tell us which language the person signing consent actually speaks.",
    money:
      "Banking is difficult. Agree a traceable payment route before travel. Carry only what you can declare legally and keep documents. We will not suggest informal money transfer.",
    treatments:
      "Orthopaedics, general surgery, cardiac opinions and cancer are common requests. Old injuries need the X-rays. We cannot reconstruct a story from a voice note.",
    culture:
      "Halal food and prayer space are requested before admission. A female patient can ask for a female coordinator on the TechDr side. Hospital clinical teams are assigned by the hospital.",
    faqs: [
      { question: "Can you guarantee a flight?", answer: "No. Routes change. We plan hospitals, not airlines, and we tell you when to wait." },
      { question: "Will someone speak Dari?", answer: "Yes if you request it when the file opens." },
      { question: "What if our passport is newly issued?", answer: "Carry the old passport too if the visa system or the airline asks for travel history." },
      { question: "Is emergency evacuation part of this?", answer: "No. TechDr coordinates planned care. Emergencies need local services." },
    ],
  },
  {
    slug: "yemen",
    name: "Yemen",
    adjective: "Yemeni",
    description:
      "Medical travel from Yemen to India: limited flights, Arabic case support, honest visa checks and the care families most often need priced in writing.",
    answer:
      "Direct flights are limited, so most Yemeni patients connect through a regional hub and should plan a buffer day. Arabic coordinators run the file. Visa rules must be checked on the official Indian portal for the exact passport. TechDr does not buy tickets until a clinical plan exists.",
    flights:
      "Expect a connection and possible schedule changes. Aden, Sana’a and Seiyun options differ and shift. Send the city you can actually depart from. If you need a stretcher or oxygen, that is an air-ambulance conversation, not a standard TechDr ticket.",
    visa:
      "Confirm eligibility before you pay an agent. The hospital invitation letter is prepared after you accept a quote. Keep copies of medical reports in your cabin bag in case the airline asks why you are travelling.",
    language:
      "Arabic coordination, English medical documents. Ask for the Arabic explanation of the consent, especially for heart or cancer surgery.",
    money:
      "Agree the payment path early. Cash above the Indian declaration threshold must be declared. We will not route funds informally. If a transfer may be blocked, tell us before we reserve a bed.",
    treatments:
      "Cardiac care, cancer, orthopaedics and kidney opinions are the usual requests. Unstable patients should not be put on a commercial flight to save money. We will refuse that plan.",
    culture:
      "Halal meals and a prayer area are requested in advance. A companion is essential. Name the attendant on the visa paperwork, not only in a family chat.",
    faqs: [
      { question: "Can you collect us inside Yemen?", answer: "No. We meet you at the Indian airport on the flight you book once the plan and visa are ready." },
      { question: "Do you speak Arabic?", answer: "Yes. The case can be handled in Arabic." },
      { question: "What if the airline cancels?", answer: "Admission dates move. Surgery is rebooked. This is why we dislike non-refundable downstream payments." },
      { question: "Can a child travel without both parents?", answer: "Only with documents that satisfy the airline and the hospital consent rules. Ask before you reach the counter." },
    ],
  },
];

export function getCountry(slug: string) {
  return countries.find((country) => country.slug === slug);
}
