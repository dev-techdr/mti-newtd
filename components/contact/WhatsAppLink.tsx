"use client";

import { usePathname } from "@/i18n/navigation";
import { waveCountries } from "@/data/patients/catalog";
import { indiaFareFor } from "@/data/patients/india-fares";
import { whatsappCountryMessage, whatsappHref, whatsappMessage } from "@/lib/site";

function countryName(slug: string) {
  return waveCountries.find((item) => item.slug === slug)?.name ?? indiaFareFor(slug)?.name ?? null;
}

export function topicFromPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "treatments" && parts[2]) return parts[2].replace(/-/g, " ");
  if (parts[0] === "cost" && parts[1]) return parts[1].replace(/-cost-in-india$/, "").replace(/-/g, " ");
  if (parts[0] === "destinations" && parts[2]) return `${parts[2].replace(/-/g, " ")} in ${parts[1].replace(/-/g, " ")}`;
  if (parts[0] === "patients-from" && parts[2]) return parts[2].replace(/-/g, " ");
  return "treatment";
}

export function messageFromPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "medical-assistance" && parts[1] === "repatriation-support") {
    return "Hello TechDr, I need to speak to the support team about bringing a family member home.";
  }
  if (parts[0] === "medical-assistance") {
    const topic = parts[1]?.replace(/-/g, " ") || "medical assistance";
    return whatsappMessage(topic);
  }
  if (parts[0] === "patients-from" && parts[1]) {
    const name = countryName(parts[1]);
    if (name) return whatsappCountryMessage(name, topicFromPath(pathname));
  }
  return whatsappMessage(topicFromPath(pathname));
}

export function WhatsAppLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <a className={className} href={whatsappHref(messageFromPath(pathname))}>
      {children}
    </a>
  );
}
