export const assistanceNav = [
  { slug: "air-ambulance", label: "Air ambulance" },
  { slug: "medical-escort", label: "Medical escort" },
  { slug: "ground-ambulance", label: "Ground ambulance" },
  { slug: "teleconsultation", label: "Teleconsultation" },
  { slug: "home-care", label: "Home care" },
  { slug: "hospital-assistance", label: "Hospital assistance" },
  { slug: "family-support", label: "Family support" },
] as const;

export function navAssistanceLinks() {
  return assistanceNav.map((item) => ({ href: `/medical-assistance/${item.slug}`, label: item.label }));
}
