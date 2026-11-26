import { Link } from "@/i18n/navigation";
import { routesForCountry } from "@/data/assistance-routes";
import { highAcuitySpecialties } from "@/data/assistance";

export function TreatmentAssistance({ specialty }: { specialty: string }) {
  if (!highAcuitySpecialties.has(specialty)) return null;
  return (
    <aside className="mt-8">
      <div className="rounded-2xl border border-border bg-card p-5">
        <h2>Too unwell to fly normally?</h2>
        <p className="mt-2 max-w-3xl">
          For transplant, heart, neuro, cancer and spine plans, the trip home is part of the medical decision. TechDr can arrange an air ambulance when a normal seat is unsafe, or a medical escort when the patient is stable enough for a scheduled flight. Ground transfers and care at the hotel are arranged separately.
        </p>
        <ul className="mt-3 space-y-2">
          <li>
            <Link className="text-primary-ink underline" href="/medical-assistance/air-ambulance">
              Air ambulance
            </Link>
          </li>
          <li>
            <Link className="text-primary-ink underline" href="/medical-assistance/medical-escort">
              Medical escort on a commercial flight
            </Link>
          </li>
          <li>
            <Link className="text-primary-ink underline" href="/medical-assistance/ground-ambulance">
              Airport and hospital transfers
            </Link>
          </li>
          <li>
            <Link className="text-primary-ink underline" href="/medical-assistance/home-care">
              Care after discharge
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export function CountryAssistanceRoutes({ country }: { country: string }) {
  const routes = routesForCountry(country);
  if (!routes.length) return null;
  return (
    <section className="mx-auto mt-8 w-full max-w-6xl px-4">
      <h2>Medical flights linked to this country</h2>
      <ul className="mt-3 space-y-2">
        {routes.map((route) => (
          <li key={route.slug}>
            <Link className="text-primary-ink underline" href={`/medical-assistance/air-ambulance/${route.slug}`}>
              Air ambulance from {route.from.city} to {route.to.city}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
