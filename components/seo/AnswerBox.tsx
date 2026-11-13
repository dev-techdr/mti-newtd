import { formatUpdated } from "@/lib/utils";

export function AnswerBox({ children }: { children: string }) {
  return (
    <section id="quick-answer" aria-label="Quick answer" className="rounded-2xl border border-primary/30 bg-surface p-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-ink">Quick answer</p>
      <p className="mt-2 text-lg leading-relaxed">{children}</p>
    </section>
  );
}

export function Byline({ updated, locale }: { updated: string; locale: string }) {
  const reviewed = formatUpdated(updated, locale);
  return (
    <footer className="mt-10 space-y-2 border-t border-border pt-6 text-sm text-muted">
      <p>This content is for information only and is not a substitute for professional medical advice.</p>
      <p>Medically reviewed by TODO(client): Dr ___, qualification · Reviewed on {reviewed}</p>
      <p>Last updated: {reviewed}</p>
    </footer>
  );
}

export function EstimateNote({ planning = false }: { planning?: boolean }) {
  return (
    <p className="text-sm text-muted">
      Indicative starting estimates in USD. A written quote follows review of your reports. TechDr does not guarantee a price or a clinical outcome.
      {planning ? " This figure is a planning range and is not part of the locked comparison table." : ""}
    </p>
  );
}
