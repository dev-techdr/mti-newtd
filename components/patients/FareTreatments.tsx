import { Link } from "@/i18n/navigation";
import { fareProcedures, fareTreatmentPath } from "@/data/patients/fare-treatments";
import { indiaFareFor } from "@/data/patients/india-fares";

export function FareTreatmentLinks({ country }: { country: string }) {
  const fare = indiaFareFor(country);
  if (!fare) return null;
  return (
    <section className="mx-auto max-w-3xl px-4 pb-12">
      <h2>Treatments for patients from {fare.name}</h2>
      <p className="mt-2 text-sm text-muted">Each link is that treatment for someone flying from {fare.name} to India. The India guide stays the clinical page.</p>
      <ul className="mt-4 columns-1 gap-x-8 sm:columns-2">
        {fareProcedures().map((procedure) => (
          <li key={procedure.slug} className="py-1">
            <Link className="text-primary-ink underline" href={fareTreatmentPath(country, procedure)}>{procedure.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
