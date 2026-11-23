import { getCost, moneyRange } from "@/data/costs";
import { fareSource, formatInr, indiaFares, oneWayLabel, returnLabel, type IndiaFare } from "@/data/patients/india-fares";
import { isLibraryProcedure, procedures, type Procedure } from "@/data/procedures";

/** Hand-written treatment guides. Library templates are not copied once per country. */
export function fareProcedures() {
  return procedures.filter((item) => !isLibraryProcedure(item.slug));
}

export function fareTreatmentPairs() {
  const items = fareProcedures();
  return indiaFares.flatMap((fare) => items.map((procedure) => ({ country: fare.slug, procedure: procedure.slug })));
}

export function fareLine(fare: IndiaFare) {
  const parts = [
    fare.oneWayFromINR == null ? null : `one-way ${oneWayLabel(fare)}`,
    fare.returnFromINR == null ? null : `return ${returnLabel(fare)}`,
    fare.lowestAroundINR == null ? null : `lowest fares around ${formatInr(fare.lowestAroundINR)}`,
  ];
  return parts.filter(Boolean).join("; ");
}

export function fareTreatmentAnswer(fare: IndiaFare, procedure: Procedure) {
  const india = moneyRange(getCost(procedure.costId).india);
  const arrivals = fare.arrivals ?? "Mumbai or New Delhi";
  const airlines = fare.airlines ? ` ${fare.airlines}.` : "";
  return `${procedure.name} for a patient leaving ${fare.name} is planned in India from the reports. The India planning range is ${india}. A recent economy fare from ${fare.name} to ${arrivals} is ${fareLine(fare)}.${airlines} ${fareSource(fare)} There is no sourced private price for this operation inside ${fare.name}. A written quote replaces both figures.`;
}

export function fareTreatmentPath(country: string, procedure: Pick<Procedure, "slug">) {
  return `/patients-from/${country}/${procedure.slug}`;
}
