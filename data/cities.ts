export type City = {
  slug: string;
  path: string;
  searchName: string;
  airportCode: string;
  aliases: string[];
  name: string;
  airport: string;
  description: string;
  answer: string;
  overview: string;
  stay: string;
  climate: string;
  practical: string[];
  faqs: { question: string; answer: string }[];
};

export const cities: City[] = [
  {
    slug: "delhi-ncr",
    path: "delhi",
    searchName: "Delhi",
    airportCode: "DEL",
    aliases: ["delhi-ncr", "new-delhi"],
    name: "Delhi NCR",
    airport: "Indira Gandhi International Airport (DEL)",
    description:
      "Delhi NCR is a common arrival city for medical travel to India, with long-haul links and accredited hospitals across Delhi, Gurugram and Noida.",
    answer:
      "Delhi NCR suits patients who want a major international airport and a short drive to accredited hospitals in Delhi, Gurugram or Noida. Most treatment plans need a hotel for the nights after discharge, not only the hospital bed.",
    overview:
      "The National Capital Region is the usual first landing for flights from Europe, the CIS, Africa and parts of the Middle East. Hospitals are spread across south Delhi, Gurugram and Noida, so the ‘city’ in your quote should name the district. Traffic can turn a 20-kilometre trip into an hour. TechDr books airport pickup to the hospital you actually chose, not to a generic Delhi pin.",
    stay:
      "Budget a hotel or serviced apartment for the recovery nights after discharge. A companion needs a bed too. Power backup and a lift matter more than a tourist view if you are using a frame or a wheelchair.",
    climate:
      "Winters are cool and smoggy. Summers are very hot. Spring and autumn are the easier months for someone who will be walking after surgery. Pack a layer even if you are travelling from a hot country in winter.",
    practical: [
      "DEL has direct and one-stop links from the Gulf, Addis Ababa, London, Tashkent and many African cities",
      "Metro and app taxis exist. After surgery, use the pre-booked car",
      "Halal food and prayer space can be requested at partner hospitals. Ask before admission",
      "A local SIM at the airport is simpler than roaming for OTP messages from the hospital",
    ],
    faqs: [
      { question: "Is Delhi one hospital zone?", answer: "No. Gurugram, south Delhi and Noida are different drives. The quote should name the campus." },
      { question: "How far is the airport from hospitals?", answer: "Often 30–90 minutes depending on the campus and the time of day. Do not plan a same-day connection after surgery." },
      { question: "Is winter a bad time because of smog?", answer: "Air quality can be poor. People with severe lung disease should mention it. Many still travel in winter because flights are frequent." },
      { question: "Can I do a health check and surgery in one trip?", answer: "A check can be the first morning. Elective surgery still waits on surgeon review, not on the tourist itinerary." },
    ],
  },
  {
    slug: "mumbai",
    path: "mumbai",
    searchName: "Mumbai",
    airportCode: "BOM",
    aliases: [],
    name: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport (BOM)",
    description:
      "Mumbai is a major medical travel gateway with frequent Gulf and African links. Plan around monsoon rain and long cross-town drives.",
    answer:
      "Mumbai works well if your flights already land at BOM and the treating campus is in the suburbs or south Mumbai named in the quote. Monsoon months mean slower traffic and a need for extra time between airport and admission.",
    overview:
      "Mumbai’s private hospitals draw patients for cardiac care, cancer and transplants. The city is linear, so a hospital in the south and a hotel in the suburbs can be a long daily trip. TechDr matches the hotel to the campus. Arabian Sea humidity is tiring after surgery. Plan indoor recovery, not sightseeing, in the first week.",
    stay:
      "Serviced apartments near the campus are easier than a beach hotel an hour away. Ask for a refrigerator if you are on a special diet after bariatric or transplant care.",
    climate:
      "Hot and humid most of the year. The monsoon, roughly June to September, brings heavy rain and traffic delays. Build a buffer day into arrivals then.",
    practical: [
      "Frequent links from the Gulf, East Africa and Europe",
      "Local trains are not a recovery plan. Use the booked car",
      "Halal meals and a prayer room should be requested in writing",
      "International cards usually work. Tell your bank before you travel",
    ],
    faqs: [
      { question: "Is Mumbai better than Delhi for heart surgery?", answer: "Neither city is automatically better. The written plan and the ICU allowance matter more than the skyline." },
      { question: "Should I avoid the monsoon?", answer: "You can travel, but add time. Flooding delays airport pickups on some days." },
      { question: "Where should attendants stay?", answer: "As close to the campus as the quote’s hotel list allows. Cross-town visits exhaust everyone." },
      { question: "Is the airport inside the city?", answer: "BOM is in the city and still often 45–90 minutes from the hospital in traffic." },
    ],
  },
  {
    slug: "chennai",
    path: "chennai",
    searchName: "Chennai",
    airportCode: "MAA",
    aliases: [],
    name: "Chennai",
    airport: "Chennai International Airport (MAA)",
    description:
      "Chennai is a long-standing medical travel city for cardiac, transplant and orthopaedic care, with direct Asian and Gulf links.",
    answer:
      "Chennai is a practical choice when your surgeon’s campus is there and you want a city used to international patients. Expect heat and humidity. Hospital stay lengths do not shrink because the airport is busy.",
    overview:
      "Chennai has received medical travellers for years, especially for heart surgery, transplants and joint replacement. That history is not a reason to skip the written quote. Distances from MAA to the main hospital corridors are manageable outside peak traffic. The food is easy to adapt for halal requests if you ask early. English is widely used in hospitals.",
    stay:
      "Many families stay in hotels on the same road as the campus. After a transplant or bypass, that short distance matters more than a city-centre address.",
    climate:
      "Hot and humid, with a cooler but still warm winter. The north-east monsoon can bring heavy rain later in the year. Pack light cotton and one layer for aggressive hospital air-conditioning.",
    practical: [
      "Direct and one-stop flights from Southeast Asia, the Gulf and some African cities",
      "Request halal meals before admission",
      "A local SIM helps with discharge calls",
      "Do not plan temple or beach days in the first week after major surgery",
    ],
    faqs: [
      { question: "Why do so many heart patients fly to Chennai?", answer: "There is a long record of international cardiac work. Your case still needs its own quote and ICU cap." },
      { question: "Is the city walkable after surgery?", answer: "Heat and traffic say no. Use the arranged car even for a five-minute feeling of distance." },
      { question: "Can donors and recipients stay together?", answer: "They are often in different wards. Plan two attendants if both people are recovering." },
      { question: "Which months are easiest?", answer: "The cooler months are kinder, but treatment dates follow the surgeon, not the weather brochure." },
    ],
  },
  {
    slug: "hyderabad",
    path: "hyderabad",
    searchName: "Hyderabad",
    airportCode: "HYD",
    aliases: ["hyderbad", "hydrabad"],
    name: "Hyderabad",
    airport: "Rajiv Gandhi International Airport (HYD)",
    description:
      "Hyderabad offers a modern airport and accredited hospitals for cardiac, cancer and transplant opinions, with a drier climate than the coast.",
    answer:
      "Hyderabad suits travellers who want a single international airport and campuses that are a planned drive away, not a cross-town maze. It is a strong option for cardiac, cancer and transplant files once the quote names the campus.",
    overview:
      "HYD is a relatively straightforward airport. The medical campuses are in the city, so pickup time should be written in hours, not wished away. Hyderabad’s food culture makes halal meals simple to arrange. The climate is drier than Chennai or Mumbai for much of the year, which some joint-replacement patients find easier.",
    stay:
      "Stay near the campus named in the quote. The airport is outside the city, so do not book an airport hotel for a week of outpatient visits.",
    climate:
      "Hot summers, a pleasant winter, and monsoon showers. Winter is the most comfortable time to walk after orthopaedic surgery.",
    practical: [
      "Good one-stop connections via the Gulf and direct links on several Asian and Middle East routes",
      "Halal food is widely available. Still request it inside the hospital",
      "English and Hindi are the usual coordinating languages",
      "Ask for a ground-floor or lift-served room if you cannot climb stairs",
    ],
    faqs: [
      { question: "Is Hyderabad only an IT city?", answer: "No. Accredited hospitals treat international patients. The campus in your quote is what matters." },
      { question: "How long from the airport?", answer: "Often under an hour outside peak traffic, longer in the evening. Confirm on your pickup sheet." },
      { question: "Can I combine a health check and a city break?", answer: "A check takes a day. Surgery needs the stay on its own page, not a holiday schedule." },
      { question: "Are prayer rooms available?", answer: "Ask the case manager to request one. Do not assume every ward has a dedicated room." },
    ],
  },
  {
    slug: "bengaluru",
    path: "bangalore",
    searchName: "Bangalore",
    airportCode: "BLR",
    aliases: ["bengaluru", "banglore"],
    name: "Bengaluru",
    airport: "Kempegowda International Airport (BLR)",
    description:
      "Bangalore (Bengaluru) has a milder climate and accredited hospitals for cancer, cardiac and orthopaedic care. Traffic means the hotel must be near the campus.",
    answer:
      "Bangalore (Bengaluru) is a good fit if you want milder weather and the treating campus is in the city. The airport is far north. A hotel near the hospital will save more pain than any sightseeing plan.",
    overview:
      "BLR is well connected and the weather is kinder than the coast for much of the year. Traffic is the tax you pay for that. TechDr does not book a hotel on the opposite side of the city to save a small fare. Cancer day-care visits, in particular, punish a long commute.",
    stay:
      "Choose a hotel with a lift, a pharmacy nearby and a kitchenette if your stay is longer than a week. Power and water backup are worth asking about.",
    climate:
      "Milder than Chennai or Delhi in summer, with pleasant evenings for much of the year. Rain is common in the monsoon and can slow the airport road.",
    practical: [
      "Direct and one-stop flights from Europe, the Gulf and East Asia",
      "The airport road can take 90 minutes or more at the wrong time",
      "English is the main coordinating language",
      "Request any special diet before admission, not on the morning of surgery",
    ],
    faqs: [
      { question: "Is Bengaluru cooler for recovery?", answer: "Usually milder than the coastal cities. You still recover indoors." },
      { question: "Should I stay near the airport?", answer: "No, unless your only visit is a same-day check. Stay near the campus." },
      { question: "Is it a good city for cancer day care?", answer: "Yes if the hotel is close, because visits are repeated. A long daily drive is a false economy." },
      { question: "Do I need Hindi?", answer: "No. English-speaking coordinators are the default. Other languages can be arranged." },
    ],
  },
  {
    slug: "kolkata",
    path: "kolkata",
    searchName: "Kolkata",
    airportCode: "CCU",
    aliases: [],
    name: "Kolkata",
    airport: "Netaji Subhas Chandra Bose International Airport (CCU)",
    description:
      "Kolkata is the practical gateway for many travellers from Bangladesh and the east, with cardiac, cancer and gastrointestinal care in accredited hospitals.",
    answer:
      "Kolkata is often the shortest flight from Bangladesh and a sensible base for eastern India plans. Cardiac, cancer and gastrointestinal opinions are the usual requests. Humidity is high for much of the year.",
    overview:
      "For families coming from Dhaka, Kolkata can be a shorter, simpler journey than routing through Delhi. That convenience does not change surgical risk. The quote still has to name the operation, the stay and the exclusions. The city is used to cross-border patients, and Bengali-speaking coordination is available.",
    stay:
      "Stay near the campus. Monsoon flooding can slow river and road routes, so a buffer day on arrival is wise between June and September.",
    climate:
      "Humid subtropical. Winters are mild and pleasant. Summers and the monsoon are heavy. Hospital wards are air-conditioned and can feel cold after the street.",
    practical: [
      "Short flights from Dhaka and connections across East and Southeast Asia",
      "Bengali and English coordinators",
      "Halal meals on request",
      "Declare currency on arrival if you are over the customs threshold",
    ],
    faqs: [
      { question: "Is Kolkata only for patients from Bangladesh?", answer: "No. It is especially practical for them, and it treats other international patients too." },
      { question: "How long is the flight from Dhaka?", answer: "Often about an hour when a nonstop is operating. Confirm the current timetable." },
      { question: "Is the humidity a problem after surgery?", answer: "It can make walking outside tiring. Recovery walks can be indoors." },
      { question: "Can relatives cook?", answer: "Serviced apartments are better than hotel rooms if you want family food. Tell us if that matters." },
    ],
  },
];

/** Cities with a page for every treatment, aimed at city + procedure searches. */
export const treatmentCitySlugs = ["delhi-ncr", "mumbai", "chennai", "hyderabad", "bengaluru"] as const;

export function treatmentCities() {
  const allowed = new Set<string>(treatmentCitySlugs);
  return cities.filter((city) => allowed.has(city.slug));
}

export function getCity(slug: string) {
  return cities.find((city) => city.path === slug || city.slug === slug || city.aliases.includes(slug));
}

export function cityPath(city: Pick<City, "path">) {
  return `/destinations/${city.path}`;
}

export function cityRouteParams(city: City) {
  return [...new Set([city.path, city.slug, ...city.aliases])];
}
