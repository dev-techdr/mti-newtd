import { Link } from "@/i18n/navigation";
import { fareProcedures } from "@/data/patients/fare-treatments";
import { indiaFareFor } from "@/data/patients/india-fares";
import { isTreatmentIndexable } from "@/data/patients/publish";
import { procedurePath } from "@/data/procedures";

export function FareTreatmentLinks({ country }: { country: string }) {
  const fare = indiaFareFor(country);
  if (!fare) return null;
  return (
    <section className="mx-auto max-w-3xl px-4 pb-12">
      <h2>Treatments for patients from {fare.name}</h2>
      <p className="mt-2 text-sm text-muted">Open the India guide. A country page for one treatment is linked only when that pair has its own sourced record.</p>
      <ul className="mt-4 columns-1 gap-x-8 sm:columns-2">
        {fareProcedures().map((procedure) => {
          const pair = isTreatmentIndexable(country, procedure.slug);
          const href = pair ? `/patients-from/${country}/${procedure.slug}` : procedurePath(procedure);
          return (
            <li key={procedure.slug} className="py-1">
              <Link className="text-primary-ink underline" href={href}>{procedure.name}</Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
