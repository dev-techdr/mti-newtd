"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";

type Item = { href: string; label: string; specialty: string };

export function TreatmentSearch({ items, initial = "" }: { items: Item[]; initial?: string }) {
  const [query, setQuery] = useState(initial);
  const [open, setOpen] = useState(false);
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 8);
    return items.filter((item) => `${item.label} ${item.specialty}`.toLowerCase().includes(q)).slice(0, 8);
  }, [items, query]);

  return (
    <div className="relative">
      <label className="sr-only" htmlFor="treatment-search">Search a treatment, condition or procedure</label>
      <input
        id="treatment-search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search a treatment, condition or procedure…"
        className="min-h-12 w-full rounded-full border border-border bg-card px-5"
        role="combobox"
        aria-expanded={open}
        aria-controls="treatment-search-list"
        autoComplete="off"
      />
      {open ? (
        <ul id="treatment-search-list" role="listbox" className="absolute z-20 mt-2 max-h-80 w-full overflow-auto rounded-2xl border border-border bg-card p-2 shadow-lg">
          {matches.length === 0 ? <li className="px-3 py-2 text-sm text-muted">No matching treatment. Send a free quote and a case manager will guide you.</li> : null}
          {matches.map((item) => (
            <li key={item.href} role="option" aria-selected={false}>
              <Link href={item.href} className="flex min-h-11 items-center rounded-xl px-3 hover:bg-surface" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
