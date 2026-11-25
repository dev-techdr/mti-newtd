"use client";

import { useMemo, useState } from "react";
import { costs, midpointSavings, moneyRange } from "@/data/costs";
import { CostMark } from "@/components/ui/CostMark";
import { PriceText } from "@/components/ui/PriceText";

export function CostEstimator() {
  const [id, setId] = useState(costs[0]?.id ?? "knee-replacement");
  const [home, setHome] = useState<"usa" | "uk">("usa");
  const row = useMemo(() => costs.find((item) => item.id === id) ?? costs[0], [id]);
  if (!row) return null;
  const other = home === "usa" ? row.usa : row.uk;
  const label = home === "usa" ? row.usaLabel : row.ukLabel;
  const savings = midpointSavings(row.india, other, Boolean(label));
  return (
    <PriceText>
    <form className="rounded-2xl border border-border bg-card p-5" onSubmit={(event) => event.preventDefault()}>
      <h2 className="text-xl">Compare an indicative saving</h2>
      <label className="mt-4 block text-sm">Procedure
        <select className="mt-1 min-h-11 w-full rounded-xl border border-border bg-card px-3" value={id} onChange={(event) => setId(event.target.value as typeof id)}>
          {costs.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </label>
      <label className="mt-3 block text-sm">Compare with
        <select className="mt-1 min-h-11 w-full rounded-xl border border-border bg-card px-3" value={home} onChange={(event) => setHome(event.target.value as "usa" | "uk")}>
          <option value="usa">United States private range</option>
          <option value="uk">United Kingdom private range</option>
        </select>
      </label>
      <p className="mt-4 flex flex-wrap items-center gap-2">India <CostMark value={moneyRange(row.india)} /> versus {moneyRange(other, label)}. The midpoint gap is about {savings}%, based on the published ranges in this table. This is not your quote.</p>
    </form>
    </PriceText>
  );
}
