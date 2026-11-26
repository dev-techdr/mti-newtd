import { Link } from "@/i18n/navigation";
import { emergencyContact, localEmergencyNotice } from "@/lib/emergency-contact";
import { formatPhone, whatsappHref, whatsappMessage } from "@/lib/site";
import { cn } from "@/lib/utils";

const button = "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold";

export function EmergencyNotice({ service = "medical-assistance" }: { service?: string }) {
  const lines = emergencyContact();
  return (
    <p className="mt-4">
      {localEmergencyNotice}
      {lines.staffed && lines.phone ? (
        <>
          {" "}
          A TechDr line is staffed 24/7 for urgent transfers.{" "}
          <a className="text-primary-ink underline" data-track="emergency_call" data-service={service} href={lines.phoneHref ?? undefined}>
            Call {formatPhone(lines.phone)}
          </a>
          .
        </>
      ) : null}
    </p>
  );
}

export function AssistanceCta({
  service,
  quiet,
  emergency,
  className,
}: {
  service: string;
  quiet: boolean;
  emergency: boolean;
  className?: string;
}) {
  const lines = emergencyContact();
  const requestHref = `/medical-assistance/request?service=${service}`;
  const desk = whatsappHref(whatsappMessage("medical assistance"));

  return (
    <section className={cn("mt-10 rounded-2xl bg-secondary p-6 text-background", className)}>
      <h2 className="!text-xl">{quiet ? "Speak to our support team" : emergency ? "Request this transfer" : "Request this service"}</h2>
      {emergency ? <p className="mt-3 text-background/85">{localEmergencyNotice}</p> : null}
      {emergency && lines.staffed && lines.phone ? (
        <p className="mt-3 text-background/85">
          A TechDr line is staffed 24/7 for this kind of case.{" "}
          <a className="underline" data-track="emergency_call" data-service={service} href={lines.phoneHref ?? undefined}>
            Call {formatPhone(lines.phone)}
          </a>
          {lines.whatsapp && lines.whatsappHref ? (
            <>
              {" "}
              or{" "}
              <a className="underline" data-track="emergency_call" data-service={service} href={lines.whatsappHref}>
                WhatsApp {formatPhone(lines.whatsapp)}
              </a>
            </>
          ) : null}
          .
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-3">
        <Link className={`${button} bg-accent text-accent-ink`} href={requestHref}>
          {quiet ? "Speak to our support team" : "Send a request"}
        </Link>
        {emergency && lines.staffed && lines.phoneHref ? (
          <a className={`${button} border border-background/25`} data-track="emergency_call" data-service={service} href={lines.phoneHref}>
            Call the duty line
          </a>
        ) : (
          <a className={`${button} border border-background/25`} href={desk}>
            {quiet ? "Message the support team" : "WhatsApp TechDr"}
          </a>
        )}
      </div>
    </section>
  );
}
