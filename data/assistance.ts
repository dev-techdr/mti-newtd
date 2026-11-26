import { assistanceNav } from "@/data/assistance-nav";
import { indexableRoutes } from "@/data/assistance-routes";
import { absoluteUrl } from "@/lib/seo";

export const assistanceUpdated = "2026-11-25";

/** Home-care cities and hospital-assistance countries stay empty until TechDr confirms them. */
export const assistanceCoverage = {
  homeCareLocations: [] as string[],
  hospitalAssistanceCountries: [] as string[],
};

export type VerifiedAssistancePrice = {
  service: string;
  label: string;
  min: number;
  max: number;
  currency: "USD";
  verified: true;
};

/** Ranges appear on the site only when verified is true. Leave this empty until then. */
export const assistancePrices: VerifiedAssistancePrice[] = [];

export type AssistanceService = {
  slug: string;
  label: string;
  nav: boolean;
  emergency: boolean;
  quiet: boolean;
  title: string;
  description: string;
  h1: string;
  quickAnswer: string;
  when: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  included: string[];
  depends: string[];
  documents: string[];
  insurance: string;
  safety: string;
  faqs: { question: string; answer: string }[];
  related: { href: string; label: string }[];
};

const request = "/medical-assistance/request";

export const assistanceServices: AssistanceService[] = [
  {
    slug: "air-ambulance",
    label: "Air ambulance",
    nav: true,
    emergency: true,
    quiet: false,
    title: "Air Ambulance to India | Medical Flight & Stretcher Transfer | TechDr",
    description:
      "TechDr arranges air ambulance flights to and from India with licensed operators, including bed-to-bed transfer and the medical team the case needs.",
    h1: "Air ambulance to India",
    quickAnswer:
      "An air ambulance is a medical flight for a patient too unwell to use a normal airline seat. TechDr arranges the flight with a licensed air ambulance operator, a medical team matched to the case, and bed-to-bed handover. Send the assistance form, or use the emergency number shown on this page when that line is staffed.",
    when: [
      {
        title: "Too unwell for a scheduled seat",
        text: "A patient who needs to lie flat, who is on a ventilator, or who cannot manage a long airport wait usually cannot travel on a normal ticket.",
      },
      {
        title: "Moving to India for treatment",
        text: "Some people need hospital care in India and are not stable enough to fly as an ordinary passenger from home.",
      },
      {
        title: "Returning after treatment",
        text: "After major surgery or an ICU stay, the treating team may say a normal flight home is unsafe. A medical flight is then one of the options.",
      },
      {
        title: "A short helicopter hop",
        text: "A helicopter is for a short transfer, often between a hospital and an airport, when a road journey would take too long for that patient.",
      },
    ],
    steps: [
      { title: "Request", text: "Send the patient's city, condition, and whether oxygen, a ventilator or a stretcher is in use. Urgent cases are marked for the duty desk." },
      { title: "Medical assessment", text: "A clinician reviews the summary and says whether a dedicated aircraft, a helicopter or a commercial stretcher is appropriate." },
      { title: "Quote", text: "The operator prices the case. TechDr shares that quote in writing. Nothing is booked on a guess." },
      { title: "Permits and booking", text: "The licensed operator requests slots, landing permission and any exit papers. TechDr keeps the family updated." },
      { title: "Transfer", text: "The medical team travels with the patient. Equipment is what the assessment said the case needs." },
      { title: "Handover", text: "The team hands the patient to the receiving hospital, with a written summary of the journey." },
    ],
    included: [
      "Coordination of the request and the medical summary",
      "A written quote from the operator before booking",
      "A medical team on board, made up of the doctor, nurse or paramedic the case needs",
      "Bed-to-bed handover when the sending and receiving hospitals agree",
    ],
    depends: [
      "Distance, the aircraft, and whether a fuel stop is required",
      "The level of care: oxygen only, a stretcher, or intensive-care equipment",
      "Airport permission at both ends, and the patient's fitness to fly as judged by the clinicians",
      "Whether a relative can be seated on that aircraft",
    ],
    documents: [
      "Passport and visa status, if a visa is required",
      "A current medical summary, including diagnosis and recent vital signs",
      "A fitness-to-fly or transfer letter from the treating clinician",
      "Ventilator settings, oxygen flow, and infusion doses if those are in use",
      "Insurance details, if you want the papers shared with an insurer",
    ],
    insurance:
      "Some international health policies pay for a medical flight when a clinician says a normal seat is unsafe. Cover is decided by the insurer, not by TechDr. TechDr can send the quote, the medical summary and the operator's invoice to the insurer you name. That is not a promise that the claim will be paid.",
    safety:
      "Air ambulance flights are operated by licensed air ambulance operators. Country-specific permits, slots and overflight permission are the operator's responsibility. TechDr coordinates the request and the handover. TechDr does not operate the aircraft and does not employ the crew on board.",
    faqs: [
      { question: "Who needs an air ambulance to India?", answer: "Someone who must travel lying down, who needs a clinician throughout the flight, or whose treating team has said a normal airline seat is unsafe. A stable patient who can sit, with or without oxygen, may be suitable for a medical escort instead." },
      { question: "What is the difference between a private jet, a helicopter and a commercial stretcher?", answer: "A dedicated air ambulance is usually a private jet fitted for a patient who needs intensive care. A helicopter covers a short distance. A commercial stretcher is a scheduled airline flight with a stretcher installed, for a patient who is stable enough for that cabin. The assessment chooses among them." },
      { question: "Who travels with the patient?", answer: "The operator assigns a doctor, a nurse, a paramedic, or a combination, according to the patient's condition. TechDr does not claim those clinicians as its own staff. They work under the operator's licence." },
      { question: "What does bed-to-bed transfer mean?", answer: "The patient is collected from the current bed and delivered to the receiving hospital bed, with the ambulance legs at each airport included when the quote says so. It still depends on both hospitals accepting the time of arrival." },
      { question: "Can a patient on a ventilator fly?", answer: "Often yes, on a dedicated aircraft with the right equipment and a clinician who can manage it. The sending doctor and the operator's clinician both have to agree. A ventilator is not a reason to put someone on a holiday flight." },
      { question: "How do I request a flight?", answer: "Use the medical assistance form and say the city, the hospital, and what support the patient is on. If a staffed emergency number is published on this page, call that number for a transfer that cannot wait." },
      { question: "Will my insurance pay?", answer: "Some policies do, after they review the medical reason. TechDr can share documents with the insurer. Payment of the claim is the insurer's decision." },
      { question: "How far ahead should we ask?", answer: "Ask as soon as a transfer is being discussed. Permits and an available aircraft take time. An urgent request is still handled as fast as the operator can safely move, not on a fixed clock." },
    ],
    related: [
      { href: "/medical-assistance/medical-escort", label: "Stable enough for a scheduled flight?" },
      { href: "/medical-assistance/ground-ambulance", label: "Ground ambulance at each end" },
      { href: request, label: "Request this service" },
    ],
  },
  {
    slug: "medical-escort",
    label: "Medical escort",
    nav: true,
    emergency: false,
    quiet: false,
    title: "Medical Escort on Commercial Flights | TechDr",
    description:
      "TechDr arranges a nurse or doctor escort, stretcher or wheelchair, and airline medical clearance for stable patients on a scheduled flight.",
    h1: "Commercial stretcher and medical escort",
    quickAnswer:
      "A medical escort travels with a stable patient on a scheduled airline, with a stretcher, wheelchair or oxygen when the airline agrees. TechDr arranges the escort and helps prepare the medical clearance form. This is the usual path when a private air ambulance is not required. Request it on the assistance form.",
    when: [
      { title: "Stable, but not ready to fly alone", text: "A patient who can travel on an airline but needs a nurse or doctor nearby, for medicines, oxygen or simple observation." },
      { title: "A stretcher on a scheduled flight", text: "Some airlines fit a stretcher in the cabin for a patient who must lie down but does not need a flying intensive-care unit." },
      { title: "Wheelchair and airport help", text: "A passenger who can sit but cannot walk the terminal still needs the airline's wheelchair request, and sometimes an escort through the connection." },
      { title: "When this costs less than an air ambulance", text: "If the clinicians agree the patient is stable, a scheduled ticket plus an escort is usually far less than a dedicated aircraft. The airline can still refuse clearance." },
    ],
    steps: [
      { title: "Request", text: "Tell us the route, the date, and whether you need a stretcher, a wheelchair, oxygen or an escort." },
      { title: "Medical assessment", text: "A clinician reads the summary and says whether a scheduled flight is reasonable. If it is not, we talk about an air ambulance instead." },
      { title: "Airline clearance", text: "The airline asks for a medical information form, often called a MEDIF. The treating doctor completes the clinical parts. The airline decides." },
      { title: "Booking", text: "Once the airline accepts the form, the seat or stretcher and the escort are booked. Oxygen, if approved, is the airline's supply or a unit they allow." },
      { title: "Travel", text: "The escort meets the patient at the agreed point and stays for the flights named in the booking." },
      { title: "Handover", text: "At the destination the escort hands over to the family or the hospital team named in the plan." },
    ],
    included: [
      "Help preparing the airline medical form",
      "An escort matched to the case: nurse, doctor or paramedic, as the assessment requires",
      "Coordination of wheelchair, stretcher or oxygen requests with the airline",
      "A written note of what was agreed before tickets are issued",
    ],
    depends: [
      "The airline's acceptance of the MEDIF. Clearance is never automatic",
      "Stretcher space, which many aircraft do not have on every flight",
      "Oxygen flow the airline will carry",
      "Whether the patient can sit for take-off and landing if a stretcher is refused",
    ],
    documents: [
      "Passport and ticket details, or the cities and dates if tickets are not bought yet",
      "Medical summary and a list of medicines",
      "Fitness-to-fly letter from the treating clinician",
      "Oxygen prescription, including the flow rate, if oxygen is needed",
      "Insurance details if a claim will be made for the escort",
    ],
    insurance:
      "Some policies reimburse a medical escort or an extra seat when a doctor has said the passenger should not travel alone. The insurer decides. TechDr can send the clearance form and the escort invoice. We do not tell you the claim will succeed.",
    safety:
      "The flight is a scheduled airline service. The escort is a registered clinician arranged for that journey. Airline medical clearance, including the MEDIF, is the airline's decision. TechDr prepares the request and does not override a refusal.",
    faqs: [
      { question: "What is a MEDIF?", answer: "It is the airline's medical information form. The treating doctor states the diagnosis, whether the passenger can sit, and what oxygen or equipment is needed. The airline's medical desk accepts or refuses the booking." },
      { question: "Who should choose an escort instead of an air ambulance?", answer: "A patient the clinicians call stable: able to travel in an airline cabin, without a ventilator, and without treatment that only an intensive-care aircraft can provide. If that is uncertain, ask for an assessment before buying tickets." },
      { question: "Can I bring my own oxygen cylinder?", answer: "Most airlines refuse personal cylinders and provide approved oxygen if the form is accepted. Do not arrive with an unapproved cylinder. The flow rate has to be on the form." },
      { question: "Does a stretcher need the whole cabin?", answer: "No. It uses a block of seats the airline allocates, often with a curtain. Not every aircraft or route has that block. The airline confirms it in the clearance." },
      { question: "Can a family member sit with the escort?", answer: "Usually yes, on a normal ticket, if the cabin allows it. The escort's seat is separate. Tell us how many relatives are travelling when you request." },
      { question: "What if the airline refuses clearance?", answer: "The trip does not go ahead on that flight. The options are more information from the treating doctor, a different date, or an air ambulance if the patient is too unwell for any scheduled cabin." },
      { question: "Is this suitable the day after surgery?", answer: "Sometimes, and often not. The surgeon's fitness-to-fly letter decides. Wound care, clot risk and cabin pressure all matter. TechDr will not book against that letter." },
      { question: "How do I start?", answer: "Send the assistance form with the route and the discharge or clinic note. Do not buy a non-refundable ticket until the airline has accepted the form." },
    ],
    related: [
      { href: "/medical-assistance/air-ambulance", label: "Too unwell to fly normally?" },
      { href: "/medical-assistance/ground-ambulance", label: "Transfer between airport and hospital" },
      { href: request, label: "Request an escort" },
    ],
  },
  {
    slug: "ground-ambulance",
    label: "Ground ambulance",
    nav: true,
    emergency: true,
    quiet: false,
    title: "Ground Ambulance and Patient Transfers | TechDr",
    description:
      "TechDr arranges licensed ground ambulances for airport, hospital and hotel transfers in India, including basic and advanced life support.",
    h1: "Ground ambulance and patient transfers",
    quickAnswer:
      "A ground ambulance moves a patient between an airport, hospital, hotel or home when a normal car is not safe. TechDr arranges the vehicle and crew through a licensed ambulance service, at a basic or advanced level matched to the case. Use the assistance form, or the emergency number on this page when that line is staffed.",
    when: [
      { title: "Airport to hospital", text: "A patient arriving on a stretcher, with oxygen, or unable to sit in a car needs an ambulance from the aircraft to the ward." },
      { title: "Hospital to hotel or airport", text: "Discharge day still needs the right vehicle if the person cannot use a normal car or the hospital's wheelchair taxi." },
      { title: "Inter-hospital transfer", text: "Moving between two hospitals for a scan, a higher level of care, or a different specialty, when a clinician wants monitoring on the way." },
      { title: "A normal car is enough", text: "Many people leaving hospital can use a private car. Ask for an ambulance only when the clinical team says the extra equipment or crew is needed." },
    ],
    steps: [
      { title: "Request", text: "Share the pickup point, the destination, the time, and whether the patient needs oxygen, a stretcher or monitoring." },
      { title: "Medical assessment", text: "The level of ambulance is chosen from that information: basic life support, or advanced life support with more equipment and a higher-trained crew." },
      { title: "Quote", text: "You receive a written price for that journey before the vehicle is reserved." },
      { title: "Booking", text: "The licensed service confirms a vehicle and a meeting point, including which terminal door if this is an airport." },
      { title: "Transfer", text: "The crew moves the patient. Relatives usually follow in a separate car unless the service can seat one person." },
      { title: "Handover", text: "At a hospital, the crew hands over to the ward. At a hotel or home, they settle the patient and leave a contact for the booking." },
    ],
    included: [
      "A vehicle and crew from a licensed ambulance service",
      "The clinical level named in the quote",
      "Pickup and drop-off at the addresses you confirm",
      "Coordination with the hospital or airline desk when they need to know the arrival time",
    ],
    depends: [
      "City and distance, including traffic at that hour",
      "Basic or advanced equipment, and whether a doctor rides along",
      "Stairs, a lift, or a trolley at the hotel",
      "Waiting time if a flight is late",
    ],
    documents: [
      "Patient's name and a phone number at the pickup point",
      "Hospital or hotel address, with a ward or room if you have it",
      "A short note of oxygen, stretcher or infection precautions",
      "Flight number and terminal for airport pickups",
      "Insurance details if the journey is being claimed",
    ],
    insurance:
      "Transfer by ambulance is sometimes covered when it is part of an admission or a discharge the insurer has approved. TechDr can send the booking note to the insurer. Approval is theirs. A receipt is not the same as a paid claim.",
    safety:
      "Ground ambulance transfers are provided by licensed ambulance services. The crew and the equipment follow that service's licence. TechDr arranges the booking and the meeting point. TechDr does not operate the vehicles.",
    faqs: [
      { question: "What is basic life support?", answer: "A crew and vehicle that can move a stable patient, give oxygen, and handle first aid. It is the usual choice for a stretcher discharge when the person is not in intensive care." },
      { question: "What is advanced life support?", answer: "A higher level: monitoring, more medicines and equipment, and a crew trained for a sicker patient. It is used when the hospital says the transfer needs that support, including many ICU-to-ICU moves." },
      { question: "Can you collect someone from the aircraft door?", answer: "Often yes, when the airline and airport allow a meet-and-assist onto the airbridge or ambulance bay. The flight number and the patient's condition have to be sent ahead. Not every airport permits the same access." },
      { question: "Is an ambulance required after every surgery?", answer: "No. If the person can sit safely and the surgeon agrees, a car is appropriate. Using an ambulance for comfort alone is a different booking, and some hospitals will not call it a clinical transfer." },
      { question: "Can the family ride in the ambulance?", answer: "One relative is sometimes allowed. It depends on the vehicle and the equipment on board. Other relatives should plan a separate car." },
      { question: "Do you cover every city in India?", answer: "A transfer is offered where a licensed service can take that booking. Tell us the city in the request. We do not publish a city list until each place is confirmed." },
      { question: "What if the flight is delayed?", answer: "Share the flight number so the service can watch it. Long waiting time can change the price. The quote should say how waiting is charged." },
      { question: "How do I book a transfer that is urgent?", answer: "Call the emergency number on this page if it is published. If it is not, call the local emergency number for an emergency, and send the assistance form for a planned transfer." },
    ],
    related: [
      { href: "/medical-assistance/air-ambulance", label: "Medical flight, with ambulances at each end" },
      { href: "/medical-assistance/home-care", label: "Care after you reach the hotel" },
      { href: request, label: "Request a transfer" },
    ],
  },
  {
    slug: "teleconsultation",
    label: "Teleconsultation",
    nav: true,
    emergency: false,
    quiet: false,
    title: "Teleconsultation and Second Opinion | TechDr",
    description:
      "TechDr arranges a video or phone consultation with a registered medical practitioner before you decide whether to travel for treatment.",
    h1: "Teleconsultation and second opinion",
    quickAnswer:
      "A teleconsultation is a video or phone conversation with a registered medical practitioner before you travel. TechDr arranges the appointment and sends the opinion in writing. It is a way to ask whether a trip to India is appropriate. It is not emergency care. Request it through the assistance form.",
    when: [
      { title: "Before you book flights", text: "You have reports and want a specialist to say whether travel, and which treatment, is worth discussing." },
      { title: "A second reading of a plan", text: "You already have an opinion at home and want another registered practitioner to review the same scans and notes." },
      { title: "Family in another country", text: "Relatives can join the call when the patient agrees. The practitioner still needs the reports, not only a description." },
      { title: "Not for an emergency", text: "Chest pain, trouble breathing, heavy bleeding or a sudden collapse need the local emergency service. A video call is not that service." },
    ],
    steps: [
      { title: "Request", text: "Send the condition in your own words and upload the reports you already have. Name the specialty if you know it." },
      { title: "Medical assessment", text: "TechDr checks the file is readable and asks a registered practitioner in the relevant specialty to take the case." },
      { title: "Quote", text: "You are told the fee and the format, video or phone, before the appointment is fixed." },
      { title: "Booking", text: "A time is agreed. You receive the link or the number, and a list of what to have in front of you." },
      { title: "Consultation", text: "The practitioner speaks with you. TechDr is not on the call as a doctor. We set it up and pass the file." },
      { title: "Written note", text: "You receive a written summary you can share with your doctor at home. It is an opinion on the file, not a promise of a result." },
    ],
    included: [
      "Arrangement of the appointment with a registered medical practitioner",
      "A video or phone format, as agreed",
      "Passing the reports you upload",
      "A written summary after the call",
    ],
    depends: [
      "Whether the reports are complete enough for an opinion",
      "The specialty, and the practitioner's available time",
      "A stable internet connection if the call is on video",
      "Language. Tell us if you need an interpreter and we will say if one can be arranged",
    ],
    documents: [
      "A short description of the problem and how long you have had it",
      "Recent reports, scans and a medicine list",
      "The questions you want answered",
      "Passport name if a later visa letter might use the same file",
      "Insurance details only if you plan to claim the consultation fee",
    ],
    insurance:
      "Some insurers reimburse a specialist opinion. Ask them before the call if the fee matters. TechDr can provide the invoice and the written summary. We do not decide the claim.",
    safety:
      "Teleconsultations arranged by TechDr are given by registered medical practitioners. TechDr makes the appointment and shares the file. The opinion is the practitioner's. It is not emergency care, and it does not replace an examination when the practitioner says they need to see you in person.",
    faqs: [
      { question: "Is this a TechDr doctor on the call?", answer: "No. The consultation is with a registered medical practitioner TechDr arranges. TechDr is the coordinator. The clinical opinion belongs to that practitioner." },
      { question: "Will I be told to fly to India?", answer: "Not automatically. A useful opinion sometimes says you should be treated at home, or that more tests are needed first. Travel is recommended only when the practitioner thinks the trip is appropriate." },
      { question: "What should I prepare?", answer: "The latest reports, a medicine list, and two or three questions. Have a quiet room and, for video, enough light that the practitioner can see you if they ask." },
      { question: "Can you read a photo of a scan?", answer: "A photo of a screen is a weak copy. Send the report PDF and, if you have it, the disc or the image files. The practitioner may decline an opinion until those arrive." },
      { question: "Is the call recorded?", answer: "Only if you are told so before it starts. The written summary is the record you can keep. Do not assume a recording exists." },
      { question: "Can this replace the hospital visit?", answer: "No. It can narrow the plan. Admission, surgery and prescriptions that need an examination still happen in person, with the hospital team." },
      { question: "How much does it cost?", answer: "The fee is quoted before the appointment. It is separate from any later hospital estimate. No range is published here until TechDr has a verified figure." },
      { question: "What if I am unwell right now?", answer: "Call your local emergency number. Use this form for a planned opinion, not for a crisis." },
    ],
    related: [
      { href: "/get-a-free-quote", label: "Ask for a treatment estimate" },
      { href: "/medical-assistance/air-ambulance", label: "If a normal flight is unsafe" },
      { href: request, label: "Request a teleconsultation" },
    ],
  },
  {
    slug: "home-care",
    label: "Home care",
    nav: true,
    emergency: false,
    quiet: false,
    title: "Home Care after Treatment in India | TechDr",
    description:
      "TechDr arranges nursing, physiotherapy and post-surgery care at a hotel or residence where a licensed provider is confirmed.",
    h1: "Home care after treatment",
    quickAnswer:
      "Home care is nursing, physiotherapy or post-surgery support at a hotel or residence after treatment, in India or in a city TechDr has confirmed. TechDr arranges licensed providers. It does not replace the hospital team that treated you. Tell us the city and the care the discharge note asks for, using the assistance form.",
    when: [
      { title: "The first days out of hospital", text: "Dressings, injections, or a nurse checking a wound, while you stay in a hotel near the hospital." },
      { title: "Physiotherapy where you are staying", text: "Walking practice after joint or spine surgery, when the hospital plan names sessions and you cannot easily return each day." },
      { title: "After you fly home", text: "Similar support in your own city, only where TechDr has confirmed a provider. If we have not, we will say so." },
      { title: "What this is not", text: "It is not intensive care, and it is not a reason to leave hospital early against the surgeon's advice." },
    ],
    steps: [
      { title: "Request", text: "Send the discharge plan, the city, and the dates you need a nurse or a physiotherapist." },
      { title: "Medical assessment", text: "The tasks are checked against what a home-care provider is allowed to do. Hospital-only care stays in hospital." },
      { title: "Quote", text: "You receive the visit schedule and the price before anyone is booked." },
      { title: "Booking", text: "A licensed provider is reserved in a city TechDr can actually cover. If the city is not available, we say that before you rely on it." },
      { title: "Visits", text: "The nurse or therapist comes to the hotel or home for the sessions named in the quote." },
      { title: "Handover", text: "Notes from the visits can be sent to the hospital team and, when you leave, to your doctor at home." },
    ],
    included: [
      "Coordination of the visits the discharge note describes",
      "A written schedule and price before the first visit",
      "A licensed nurse, physiotherapist or both, as the plan requires",
      "A message route if a visit needs to be moved",
    ],
    depends: [
      "The city. A location is offered only after TechDr confirms a provider there",
      "The tasks: a dressing is different from ventilator care at home",
      "How many visits, and whether nights are included",
      "Access to the hotel room and any equipment the therapist must bring",
    ],
    documents: [
      "Discharge summary and the medicine list",
      "The wound or physiotherapy instructions",
      "Hotel or home address and a contact who will be there",
      "Any infection precaution the hospital has named",
      "Insurance details if the visits will be claimed",
    ],
    insurance:
      "Home nursing after an overseas admission is covered by some policies and excluded by others. TechDr can send the discharge summary and the provider's invoice. The insurer decides whether those visits qualify.",
    safety:
      "Nursing, physiotherapy and other home care are provided by licensed providers in the place TechDr has confirmed for that case. TechDr arranges the schedule. The hospital team remains responsible for the medical plan. Home care does not replace an emergency department.",
    faqs: [
      { question: "Which cities can you cover?", answer: "Only cities TechDr has confirmed in writing for that booking. This page does not list cities until those confirmations exist. Ask for your city on the form and we will say yes or no." },
      { question: "Can a nurse stay overnight at the hotel?", answer: "Sometimes, if a provider offers night cover in that city and the quote includes it. It is not assumed. Intensive-care equipment belongs in a hospital." },
      { question: "Will the physiotherapist follow the hospital programme?", answer: "Yes. Send the programme. The therapist should not invent a different plan. If the notes are unclear, the hospital is asked before the first session." },
      { question: "Can this continue after I fly home?", answer: "Only in a city where a provider is confirmed. Many patients are handed back to their own doctor and a local clinic. We will not pretend a service exists where it does not." },
      { question: "Do you send medicines to the hotel?", answer: "Medicines follow the hospital prescription and local pharmacy rules. TechDr does not ship prescription drugs. A nurse can help you understand the list you were given." },
      { question: "What if I feel worse between visits?", answer: "Call the hospital that treated you, or the local emergency number if it is urgent. A scheduled nurse visit is not an emergency response." },
      { question: "Can relatives be shown how to help?", answer: "Yes, when the task is safe for a relative, such as a simple exercise. The nurse should say which tasks are not safe to hand over." },
      { question: "How is the price set?", answer: "Per case, from the number of visits, the skill required and the city. No public range is shown until a verified figure is on file." },
    ],
    related: [
      { href: "/medical-assistance/ground-ambulance", label: "Transport from the hospital" },
      { href: "/patient-services", label: "Hotel and other practical help" },
      { href: request, label: "Request home care" },
    ],
  },
  {
    slug: "hospital-assistance",
    label: "Hospital assistance",
    nav: true,
    emergency: false,
    quiet: false,
    title: "Hospital Assistance Abroad | TechDr",
    description:
      "TechDr arranges admission help, case management and family updates when a traveller or expatriate needs a hospital outside India, where coverage is confirmed.",
    h1: "Hospital assistance abroad",
    quickAnswer:
      "Hospital assistance is for a traveller or expatriate who falls ill outside India and needs admission, paperwork and a coordinator for the family. TechDr arranges case management with local providers where coverage is confirmed. It is not a substitute for the local emergency number. Start with the assistance form.",
    when: [
      { title: "Illness on a trip", text: "A traveller who needs admission and a coordinator to speak with the hospital and the family at home." },
      { title: "An expatriate far from their usual doctor", text: "Someone living abroad who needs help choosing a hospital, sending reports, and keeping relatives informed." },
      { title: "Paperwork and insurance forms", text: "Admission notes, guarantee-of-payment requests and translations the insurer or the family needs." },
      { title: "A move to India, if it is safe", text: "If the local clinicians later say a transfer to India is appropriate, that becomes an air-ambulance or escort case. It is a separate decision." },
    ],
    steps: [
      { title: "Request", text: "Tell us the country, the city, the hospital if you are already there, and what has happened." },
      { title: "Medical assessment", text: "We ask what the local clinicians have said. TechDr does not replace their emergency care." },
      { title: "Quote", text: "Case-management fees, if any, are explained before extra services are added." },
      { title: "Coordination", text: "Where a provider is confirmed, a coordinator helps with admission questions, updates and documents." },
      { title: "Family support", text: "Relatives get a plain-language update and help with practical questions, such as where to stay." },
      { title: "Next step", text: "The case stays local, or a transfer is planned, according to the clinicians. TechDr does not move a patient against local medical advice." },
    ],
    included: [
      "A named coordinator for the family",
      "Help gathering admission and discharge papers",
      "Updates in plain language",
      "A path into a medical flight or escort if the clinicians later recommend a move",
    ],
    depends: [
      "The country. Assistance is arranged only where TechDr has confirmed coverage",
      "What the local hospital will share, and whether the patient has consented",
      "Insurance guarantees, which the insurer controls",
      "Whether a transfer is medically acceptable",
    ],
    documents: [
      "Passport copy and the country you are in now",
      "Hospital name and the treating team's contact, if you have them",
      "A consent from the patient, or the legal basis on which a relative is asking",
      "Insurance policy number, if a guarantee of payment is needed",
      "Reports you already hold",
    ],
    insurance:
      "International policies often have an assistance clause for admission abroad. The insurer may appoint its own assistance company. TechDr can share clinical papers with the insurer you name. We do not guarantee that they will pay the hospital or appoint us.",
    safety:
      "Admission and treatment are provided by the local hospital and its clinicians. TechDr arranges case management, paperwork and family communication where coverage is confirmed. In an emergency, call the local emergency number before you call TechDr.",
    faqs: [
      { question: "Which countries are covered?", answer: "Only countries TechDr has confirmed for that kind of help. None are listed on this page until that confirmation exists. Tell us where the person is and we will say whether we can take the case." },
      { question: "Can you get someone admitted tonight?", answer: "A local emergency department does not need TechDr to accept a sick patient. Go there, or call the local emergency number. We can help with the calls, the insurer and the family once the person is safe." },
      { question: "Will you choose the hospital?", answer: "We can explain options where we have confirmed information. The admitting clinicians decide whether they can take the case. We do not rank hospitals." },
      { question: "Can you talk to my insurer?", answer: "Yes, with your consent. We send the papers they ask for. Their decision on payment is theirs." },
      { question: "Can the patient be moved to India?", answer: "Only if the treating clinicians agree the move is appropriate, and a licensed operator accepts the flight. That is a separate medical-flight request." },
      { question: "What can you tell the family?", answer: "What the patient has allowed, in plain language: where they are, what the team has said, and what is needed next. We do not invent clinical news." },
      { question: "Do you replace the insurer's assistance line?", answer: "No. If the policy has its own assistance number, call it. TechDr can still help with documents and with a later plan in India." },
      { question: "What does the request need?", answer: "The city and country, a phone number we can reach, and consent to speak about the patient. Medical detail can follow." },
    ],
    related: [
      { href: "/medical-assistance/air-ambulance", label: "If a transfer becomes necessary" },
      { href: "/medical-assistance/family-support", label: "Help for relatives who need to travel" },
      { href: request, label: "Request hospital assistance" },
    ],
  },
  {
    slug: "family-support",
    label: "Family support",
    nav: true,
    emergency: false,
    quiet: false,
    title: "Family Travel and Stay Support | TechDr",
    description:
      "TechDr arranges flights, accommodation and local help for relatives travelling with a patient or joining them in India.",
    h1: "Family travel and stay support",
    quickAnswer:
      "Family support is help with flights, a place to stay and local errands for relatives who travel with a patient or join them in India. TechDr arranges these practical tasks alongside the treatment plan. Clinical care stays with the hospital. Request it on the assistance form or with a treatment quote.",
    when: [
      { title: "A companion on the same trip", text: "Someone who will sit with the patient on the flight, stay through the admission, and hear the discharge instructions." },
      { title: "Relatives joining later", text: "Flights and a room for family who come once a date for surgery is real, not before." },
      { title: "Local practical help", text: "A SIM, a driver to the hospital, or a hotel with a lift, when those details would otherwise fall to a tired relative." },
      { title: "After discharge", text: "A place to stay that matches the recovery, close enough for a wound check, with room for a caregiver." },
    ],
    steps: [
      { title: "Request", text: "Say how many relatives, their cities, and whether they travel with the patient or later." },
      { title: "Plan", text: "We fit the dates around the clinical plan. Tickets are not pushed before a surgeon has accepted the case." },
      { title: "Quote", text: "Flights, rooms and local help are itemised. They are not hidden inside a surgery figure." },
      { title: "Booking", text: "Bookings are made when you accept the quote. Names must match passports." },
      { title: "Arrival", text: "The same airport notes used for the patient can include the relatives, including a car if one was booked." },
      { title: "During the stay", text: "A coordinator remains the contact for hotel or transport problems. Medical questions still go to the hospital team." },
    ],
    included: [
      "Advice on timing of family flights",
      "Hotel or serviced-apartment options near the hospital named in the plan",
      "Local practical help that you ask for and accept in the quote",
      "A coordinator the relatives can message",
    ],
    depends: [
      "Passport names, visas and how soon the tickets must be changed",
      "The hospital's visitor rules",
      "Whether the hotel can take a wheelchair or an extra caregiver",
      "The clinical dates, which can move",
    ],
    documents: [
      "Passport names of each relative",
      "The city they fly from",
      "How they are related to the patient, where a hospital visitor form asks",
      "Any mobility need of the relative",
      "Dates you already know, marked as flexible if the surgery date can move",
    ],
    insurance:
      "Companion travel is often not part of a medical policy. Some policies pay for one escort when a doctor has ordered it. TechDr can separate that invoice from hotel costs so an insurer can see the difference. We do not promise repayment.",
    safety:
      "Family support is travel and stay coordination. It is not medical care. Clinical decisions remain with the hospital team and, where a flight needs clearance, with the airline or the air-ambulance operator.",
    faqs: [
      { question: "Should relatives buy tickets before the surgeon accepts the case?", answer: "No. A refused or delayed operation leaves you with flights you may not use. TechDr will say when a date is firm enough to book." },
      { question: "How many people can stay?", answer: "As many as the hotel and the hospital's visitor rules allow. The quote should name the room, not a vague 'family package'." },
      { question: "Can you book a hotel with a lift and a kitchen?", answer: "Yes, if that is what recovery needs. Say so on the form. A kitchen matters when family want to cook. A lift matters after joint or spine surgery." },
      { question: "Do you arrange visas for relatives?", answer: "We explain the route that fits the purpose of travel. Each person applies for their own visa. TechDr does not issue visas." },
      { question: "Can a relative fly in the air ambulance?", answer: "Only if the operator has a seat and the clinicians agree the cabin can take them. A relative's seat is a separate question. Ask when the flight is quoted." },
      { question: "What if I only need a hotel?", answer: "That is enough. Say hotel only. You do not have to buy a bundle of services you will not use." },
      { question: "Is this the same as a treatment package?", answer: "No. A treatment estimate covers the hospital plan. Family flights and rooms are separate lines. You can request them together so the dates match." },
      { question: "Who do relatives call if they are lost at the airport?", answer: "The coordinator named in your plan, on the number you were given. That number is for the trip you booked, not a substitute for the local emergency services." },
    ],
    related: [
      { href: "/patient-services", label: "Patient services, including hotels" },
      { href: "/medical-assistance/medical-escort", label: "An escort on the patient's flight" },
      { href: request, label: "Request family support" },
    ],
  },
  {
    slug: "repatriation-support",
    label: "Repatriation of remains",
    nav: false,
    emergency: true,
    quiet: true,
    title: "Repatriation of Remains to Home Country | Support | TechDr",
    description:
      "TechDr helps families coordinate documents, a funeral home and an airline when a loved one needs to be brought home.",
    h1: "Repatriation of remains",
    quickAnswer:
      "Repatriation of remains is the process of bringing a person who has died back to the home country. TechDr coordinates documents, the funeral home and the airline with the family. Embalming, permits and religious rites are handled by the licensed parties those steps require. Speak to the support team when you are ready.",
    when: [
      { title: "A death away from home", text: "A family needs to understand which papers, which officials and which airline are involved in bringing the person home." },
      { title: "Religious or cultural rites", text: "The family wants time for rites. Those rites are arranged with the funeral home and the faith community, not rushed to suit a flight." },
      { title: "A death during treatment in India", text: "The hospital, the local authorities and the family's embassy or consulate may all need to be informed. TechDr can help the family see who does what." },
      { title: "When you are not ready to decide", text: "You can ask what the steps are and wait. No one should be pressed to choose a date." },
    ],
    steps: [
      { title: "You contact the support team", text: "A person speaks with you, takes the cities involved, and explains the sequence in ordinary language." },
      { title: "Documents are listed", text: "You are told which papers are usually required. The exact list comes from the authorities and the airline for those two countries." },
      { title: "A funeral home and an airline are approached", text: "Embalming, a coffin that meets airline rules, and the booking are done by those licensed parties." },
      { title: "Permits", text: "Exit papers, death registration and any consular step are requested by the parties responsible. TechDr tracks what is still missing." },
      { title: "The journey", text: "The airline carries the coffin on the flight that accepts it. Timing depends on documents, not on a sales target." },
      { title: "Receiving the person", text: "The family is told when and where to be at the arrival airport, and which local funeral home will meet the flight." },
    ],
    included: [
      "A calm explanation of the steps",
      "A list of documents for the countries involved",
      "Coordination with the funeral home and the airline the family chooses, or that the case requires",
      "Updates so the family is not left chasing each office alone",
    ],
    depends: [
      "The two countries' rules on registration, embalming and exit",
      "Airline acceptance and the type of coffin they require",
      "Religious preparations the family has asked for",
      "How long official papers take. That varies, and we will not invent a number of days",
    ],
    documents: [
      "Passport of the person who has died, if it is available",
      "Death registration, once the authorities issue it",
      "Hospital or medical note of the cause, if one has been completed",
      "Family identification and proof of relationship, if an office asks",
      "Any written wishes about rites",
      "Insurance or assistance-policy details, if a claim will be made",
    ],
    insurance:
      "Some travel and health policies include repatriation of remains. The insurer may run the process itself. TechDr can provide the documents a family asks us to share. Whether the policy pays is the insurer's decision.",
    safety:
      "Embalming, coffins, permits and the flight are carried out by licensed funeral directors, authorities and airlines. Country-specific permits are their responsibility. TechDr coordinates information for the family. TechDr does not operate the airline and does not perform embalming.",
    faqs: [
      { question: "What usually has to be gathered?", answer: "A registered death record, identification, a medical note of the cause where one is required, and the airline's acceptance. Some countries also ask for embassy or consular paperwork and permission to leave. The funeral home confirms the list for your two countries." },
      { question: "Is embalming always required?", answer: "Often an airline or a destination country asks for embalming before a body can be carried. Not every case is the same. The funeral director says what is required. The family can ask what it involves before they agree." },
      { question: "Can religious rites still take place?", answer: "Yes. Tell the support team what the family needs. The funeral home and the faith community arrange the rites. The flight is timed around those steps as far as the documents allow." },
      { question: "How long does it take?", answer: "It depends on registration, any post-mortem the authorities require, embalming, and airline space. It is often several days and can be longer. We will not give you a fixed number of hours." },
      { question: "Can the family travel on the same flight?", answer: "Sometimes, if seats exist on the flight that carries the coffin. It is the airline's booking. We can ask. It is not always possible." },
      { question: "What if we decide on a burial or cremation in India?", answer: "That is a valid choice. The support team can explain what the local funeral home needs. You do not have to repatriate." },
      { question: "Who pays?", answer: "The family, or an insurer if the policy covers it. Costs are explained in writing before bookings are made. There is no published price, because each country pair differs." },
      { question: "What should I do first?", answer: "If a medical emergency is still unfolding, call the local emergency number. If the death is already registered and you want help with the journey home, speak to the support team through the form on this page." },
    ],
    related: [
      { href: "/medical-assistance/hospital-assistance", label: "Help when someone is still in hospital" },
      { href: request, label: "Speak to our support team" },
    ],
  },
];

export const assistanceHub = {
  title: "Medical Assistance and Patient Transfer | TechDr",
  description:
    "TechDr arranges air ambulance, medical escort, ground ambulance, teleconsultation, home care and family support through licensed operators and providers.",
  h1: "Medical Assistance and Patient Transfer Services",
  quickAnswer:
    "TechDr arranges medical flights, ground ambulances, escorts on scheduled airlines, teleconsultations, home care, hospital help abroad and support for families. Licensed operators and providers deliver the service. TechDr coordinates the case. Send the assistance form. If a staffed emergency number is shown, use that for an urgent transfer.",
};

export const assistanceTopics = [
  "Medical assistance coordination",
  "Air ambulance coordination",
  "Medical escort on commercial flights",
  "Ground ambulance transfers",
  "Teleconsultation arrangements",
  "Home care after treatment",
  "Hospital assistance abroad",
  "Repatriation of remains",
];

export const highAcuitySpecialties = new Set([
  "organ-transplant",
  "cardiology",
  "neurology",
  "neurosurgery",
  "oncology",
  "spine-surgery",
]);

export function publishedServices() {
  return assistanceServices;
}

export function getAssistanceService(slug: string) {
  return publishedServices().find((item) => item.slug === slug);
}

export function priceFor(slug: string) {
  return assistancePrices.find((item) => item.service === slug && item.verified);
}

export function areaServedFor(slug: string) {
  if (slug === "home-care") return [...assistanceCoverage.homeCareLocations];
  if (slug === "hospital-assistance") return [...assistanceCoverage.hospitalAssistanceCountries];
  return [];
}

export function assistancePaths() {
  return [
    "/medical-assistance",
    ...publishedServices().map((item) => `/medical-assistance/${item.slug}`),
    "/medical-assistance/request",
    ...indexableRoutes().map((route) => `/medical-assistance/air-ambulance/${route.slug}`),
  ];
}

const bannedCopy = [
  /\bour aircraft\b/i,
  /\bour ambulances\b/i,
  /\bour nurses\b/i,
  /\bour doctors\b/i,
  /\bour hospitals\b/i,
  /24\/7/,
  /since 2004/i,
  /3,500\s*\+/,
  /\bbest\b/i,
  /\bguaranteed\b/i,
];

function words(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function assistanceCopyIssues() {
  const issues: string[] = [];
  const pages = [
    { id: "hub", quick: assistanceHub.quickAnswer, faqs: [] as { question: string; answer: string }[], blob: assistanceHub.quickAnswer },
    ...assistanceServices.map((item) => ({
      id: item.slug,
      quick: item.quickAnswer,
      faqs: item.faqs,
      blob: [
        item.quickAnswer,
        item.safety,
        item.insurance,
        ...item.faqs.flatMap((faq) => [faq.question, faq.answer]),
        ...item.steps.flatMap((step) => [step.title, step.text]),
        ...item.when.flatMap((row) => [row.title, row.text]),
        ...item.included,
        ...item.depends,
      ].join("\n"),
    })),
  ];
  const navSlugs = assistanceServices.filter((item) => item.nav).map((item) => `${item.slug}:${item.label}`);
  const fileSlugs = assistanceNav.map((item) => `${item.slug}:${item.label}`);
  if (navSlugs.join("|") !== fileSlugs.join("|")) issues.push("Navigation list does not match the published services");
  for (const page of pages) {
    const count = words(page.quick);
    if (count < 40 || count > 60) issues.push(`${page.id} quick answer is ${count} words`);
    if (page.faqs.length && (page.faqs.length < 8 || page.faqs.length > 10)) {
      issues.push(`${page.id} has ${page.faqs.length} FAQs`);
    }
    for (const pattern of bannedCopy) {
      if (pattern.test(page.blob)) issues.push(`${page.id} matches ${pattern}`);
    }
  }
  return issues;
}

export function assistanceLlmsSection() {
  const lines = [
    "## Medical assistance",
    "",
    "TechDr arranges medical assistance and patient transfers through licensed operators and providers. TechDr coordinates the case. The flight, the vehicle and the clinical care are delivered by those licensed parties.",
    "",
    `- [Medical assistance](${absoluteUrl("en", "/medical-assistance")}): what can be arranged, and how to request it.`,
    ...publishedServices().map(
      (item) => `- [${item.h1}](${absoluteUrl("en", `/medical-assistance/${item.slug}`)}): ${item.description}`,
    ),
    ...indexableRoutes().map(
      (route) =>
        `- [${route.from.city} to ${route.to.city}](${absoluteUrl("en", `/medical-assistance/air-ambulance/${route.slug}`)}): air ambulance coordination for this city pair.`,
    ),
  ];
  return lines.join("\n");
}
