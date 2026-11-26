import { Link } from "@/i18n/navigation";
import { fareProcedures } from "@/data/patients/fare-treatments";
import { indiaFareFor } from "@/data/patients/india-fares";
import { isTreatmentIndexable } from "@/data/patients/publish";
import { procedurePath } from "@/data/procedures";

export function FareTreatmentLinks({ country }: { country: string }) {
  const fare = indiaFareFor(country);
  if (!fare) return null;
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12">
      <h2>Treatments for patients from {fare.name}</h2>
      <p className="mt-2 max-w-3xl text-sm text-muted">Open the India guide. A country page for one treatment is linked only when that pair has its own sourced record.</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {fareProcedures().map((procedure) => {
          const pair = isTreatmentIndexable(country, procedure.slug);
          const href = pair ? `/patients-from/${country}/${procedure.slug}` : procedurePath(procedure);
          return (
            <li key={procedure.slug}>
              <Link className="block rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-primary-ink hover:bg-surface" href={href}>{procedure.name}</Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
