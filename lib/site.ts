const defaultWhatsapps = ["+916303225006", "+918499005006"];

function listFromEnv(value: string | undefined, fallback: readonly string[]) {
  const items = (value ?? "")
    .split(/[,|]/)
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length ? items : [...fallback];
}

const whatsapps = listFromEnv(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, defaultWhatsapps);

export const legal = {
  entity: "Gorityala Abhista Sai",
  tradeName: "TechDr",
  constitution: "Sole Proprietorship",
  brand: "Medical Tours India",
  signatory: "Ms. Gorityala Abhista Sai",
  signatoryRole: "Proprietor/CEO",
  website: "https://medicaltourism.techdr.in",
  websiteLabel: "medicaltourism.techdr.in",
  gstin: "36DEMPG0503M1ZI",
  pan: "DEMPG0503M",
  tan: "HYDA42965G",
  street: "Behind Sai Ram Theater, 13-1/37, Sai Ram Theater Road, Sai Puri Colony",
  locality: "Secunderabad",
  district: "Medchal Malkajgiri",
  region: "Telangana",
  postalCode: "500047",
  country: "IN",
  address:
    "Behind Sai Ram Theater, 13-1/37, Sai Ram Theater Road, Sai Puri Colony, Secunderabad, Medchal Malkajgiri, Telangana 500047",
} as const;

export const site = {
  name: "TechDr Medical Tourism",
  entity: `${legal.entity}, trading as ${legal.tradeName}`,
  url: "https://medicaltourism.techdr.in",
  email: process.env.NEXT_PUBLIC_EMAIL || "medicaltourism@techdr.in",
  phone: process.env.NEXT_PUBLIC_PHONE || whatsapps[0] || "",
  phones: listFromEnv(process.env.NEXT_PUBLIC_PHONE, whatsapps),
  whatsapp: whatsapps[0] || "",
  whatsapps,
  year: 2026,
  updated: "2026-10-15",
  locale: "en_IN",
} as const;

export const coordinatorLanguages = [
  "English",
  "Arabic",
  "French",
  "Russian",
  "Bengali",
  "Hindi",
] as const;

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return value.trim();
}

export function whatsappHref(text: string, number = site.whatsapp) {
  if (!number) return "/contact#whatsapp";
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function telHref(number = site.phone) {
  if (!number) return "/contact";
  return `tel:+${number.replace(/\D/g, "")}`;
}

export function socialLinks() {
  return (process.env.NEXT_PUBLIC_SOCIAL_LINKS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
