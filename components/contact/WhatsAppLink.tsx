"use client";

import { usePathname } from "@/i18n/navigation";
import { whatsappHref, whatsappMessage } from "@/lib/site";

export function topicFromPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "treatments" && parts[2]) return parts[2].replace(/-/g, " ");
  if (parts[0] === "cost" && parts[1]) return parts[1].replace(/-cost-in-india$/, "").replace(/-/g, " ");
  if (parts[0] === "destinations" && parts[2]) return `${parts[2].replace(/-/g, " ")} in ${parts[1].replace(/-/g, " ")}`;
  return "treatment";
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
    <a className={className} href={whatsappHref(whatsappMessage(topicFromPath(pathname)))}>
      {children}
    </a>
  );
}
