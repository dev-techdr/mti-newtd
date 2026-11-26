"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { QUOTE_MAX_FILES, quoteFileError } from "@/lib/quote-files";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const field = "mt-1.5 min-h-11 w-full rounded-xl border border-border bg-background px-3 text-base";

function SpamCheck() {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!turnstileSiteKey) return;
    const form = document.getElementById("assistance-form");
    const arm = () => setArmed(true);
    form?.addEventListener("focusin", arm, { once: true });
    return () => form?.removeEventListener("focusin", arm);
  }, []);
  useEffect(() => {
    if (!armed || !turnstileSiteKey || document.getElementById("cf-turnstile-script")) return;
    const script = document.createElement("script");
    script.id = "cf-turnstile-script";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    document.body.appendChild(script);
  }, [armed]);
  if (!turnstileSiteKey || !armed) return null;
  return <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />;
}

export function AssistanceRequestForm({
  services,
}: {
  services: { slug: string; label: string }[];
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [service, setService] = useState(services[0]?.slug ?? "");
  const [urgent, setUrgent] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("service");
    if (!selected || !services.some((item) => item.slug === selected)) return;
    const frame = requestAnimationFrame(() => setService(selected));
    return () => cancelAnimationFrame(frame);
  }, [services]);

  const quiet = service === "repatriation-support";

  function addFiles(list: FileList | null) {
    const next = [...files];
    for (const file of list ?? []) {
      const duplicate = next.some((item) => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified);
      if (!duplicate) next.push(file);
    }
    const message = quoteFileError(next);
    if (message) {
      setError(message);
      return;
    }
    setError("");
    setFiles(next);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const fileMessage = quoteFileError(files);
    if (fileMessage) {
      setError(fileMessage);
      return;
    }
    setPending(true);
    setError("");
    const body = new FormData(form);
    body.set("service", service);
    body.set("urgent", urgent ? "yes" : "no");
    body.set("pageUrl", window.location.href);
    for (const file of files) body.append("summary", file);
    const response = await fetch("/api/assistance", { method: "POST", body });
    const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; message?: string };
    setPending(false);
    if (!response.ok || !payload.ok) {
      setError(payload.message || "Please check the form and try again.");
      return;
    }
    window.dispatchEvent(new CustomEvent("assistance-request", { detail: { service } }));
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8" role="status">
        <h2>{quiet ? "The support team has your message" : "Request received"}</h2>
        <p className="mt-3">
          {urgent
            ? "This was marked urgent and has been sent to the duty desk."
            : "A TechDr coordinator will reply on the WhatsApp number you gave."}
        </p>
      </div>
    );
  }

  return (
    <form id="assistance-form" onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      {error ? (
        <p className="mb-4 text-sm text-warning" role="alert">
          {error}
        </p>
      ) : null}
      <div className="grid gap-4">
        <label className="text-sm font-medium">
          Service
          <select required className={field} value={service} onChange={(event) => setService(event.target.value)}>
            {services.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Patient&apos;s current city
          <input required name="city" minLength={2} maxLength={80} className={field} autoComplete="address-level2" />
        </label>
        <label className="text-sm font-medium">
          Patient&apos;s current country
          <input required name="country" minLength={2} maxLength={80} className={field} autoComplete="country-name" />
        </label>
        <label className="text-sm font-medium">
          Destination
          <input required name="destination" minLength={2} maxLength={120} className={field} />
        </label>
        <label className="text-sm font-medium">
          Patient&apos;s condition
          <textarea required name="condition" minLength={10} maxLength={2000} className={`${field} min-h-28 py-2`} />
        </label>
        <fieldset className="grid gap-3 sm:grid-cols-3">
          <YesNo name="ventilator" label="On a ventilator?" />
          <YesNo name="oxygen" label="Needs oxygen?" />
          <YesNo name="stretcher" label="Needs a stretcher?" />
        </fieldset>
        <fieldset>
          <legend className="text-sm font-medium">When is it needed?</legend>
          <label className="mt-2 flex items-center gap-2 text-sm">
            <input type="radio" name="timing" checked={!urgent} onChange={() => setUrgent(false)} />
            On a date
          </label>
          {!urgent ? <input required name="dateNeeded" type="date" className={field} /> : <input type="hidden" name="dateNeeded" value="urgent" />}
          <label className="mt-2 flex items-center gap-2 text-sm">
            <input type="radio" name="timing" checked={urgent} onChange={() => setUrgent(true)} />
            This is urgent
          </label>
        </fieldset>
        <label className="text-sm font-medium">
          Your name
          <input required name="name" minLength={2} maxLength={80} className={field} autoComplete="name" />
        </label>
        <label className="text-sm font-medium">
          WhatsApp number with country code
          <input required name="phone" minLength={8} maxLength={40} className={field} autoComplete="tel" inputMode="tel" pattern="^\+[0-9][0-9\s-]{7,}$" title="Start with + and the country code" />
        </label>
        <label className="text-sm font-medium">
          Email <span className="font-normal text-muted">(optional)</span>
          <input type="email" name="email" maxLength={120} className={field} autoComplete="email" />
        </label>
        <div>
          <p className="text-sm font-medium">
            Medical summary <span className="font-normal text-muted">(optional)</span>
          </p>
          <button type="button" className="mt-2 min-h-11 rounded-full border border-border px-4 text-sm" onClick={() => fileRef.current?.click()}>
            Upload a file
          </button>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.docx,.zip,application/pdf,image/jpeg,image/png"
            className="sr-only"
            aria-label="Upload medical summary"
            onChange={(event) => {
              addFiles(event.target.files);
              event.target.value = "";
            }}
          />
          {files.length ? (
            <ul className="mt-3 space-y-2 text-sm">
              {files.map((file, index) => (
                <li key={`${file.name}-${file.lastModified}`} className="flex items-center justify-between gap-3">
                  <span className="truncate">{file.name}</span>
                  <button type="button" className="text-muted underline" onClick={() => setFiles(files.filter((_, item) => item !== index))}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-2 text-sm text-muted">PDF, JPG, PNG, DOCX or ZIP. Up to {QUOTE_MAX_FILES} files, 25 MB each.</p>
        </div>
      </div>
      <label className="mt-4 flex items-start gap-2 text-sm">
        <input required type="checkbox" name="consent" className="mt-1 size-4" />
        <span>
          I agree to the <Link className="underline" href="/privacy-policy">privacy policy</Link> and to TechDr contacting me about this request.
        </span>
      </label>
      <p className="absolute -left-[9999px] h-px overflow-hidden" aria-hidden="true">
        <input name="hp_field" tabIndex={-1} autoComplete="off" defaultValue="" />
      </p>
      <SpamCheck />
      <button disabled={pending} className="mt-5 min-h-11 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink disabled:opacity-60" type="submit">
        {pending ? "Sending…" : quiet ? "Speak to our support team" : "Send request"}
      </button>
    </form>
  );
}

function YesNo({ name, label }: { name: string; label: string }) {
  return (
    <label className="text-sm font-medium">
      {label}
      <select required name={name} className={field} defaultValue="no">
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>
    </label>
  );
}
