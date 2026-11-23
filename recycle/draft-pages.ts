import { notFound } from "next/navigation";
import type { WorldwideDraft } from "@/data/worldwide";

export function DraftNotice({ title }: { title: string }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1>{title}</h1>
      <p className="mt-4">This draft is not in the sitemap. It stays unpublished until the sourced fields and a medical review are on the record.</p>
    </article>
  );
}

export function requireDraft(records: WorldwideDraft[], slug: string) {
  const record = records.find((item) => item.slug === slug);
  if (!record) notFound();
  return record;
}
