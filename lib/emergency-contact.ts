import { telHref, whatsappHref } from "@/lib/site";

function clean(value: string | undefined) {
  const next = value?.trim() ?? "";
  return next || null;
}

/** A number is shown as staffed only when TechDr sets it in the environment. */
export function emergencyContact() {
  const phone = clean(process.env.EMERGENCY_PHONE);
  const whatsapp = clean(process.env.EMERGENCY_WHATSAPP);
  return {
    phone,
    whatsapp,
    phoneHref: phone ? telHref(phone) : null,
    whatsappHref: whatsapp ? whatsappHref("Hello TechDr, this is an urgent medical assistance request.", whatsapp) : null,
    staffed: Boolean(phone),
  };
}

export const localEmergencyNotice = "For a medical emergency, call your local emergency number first.";
