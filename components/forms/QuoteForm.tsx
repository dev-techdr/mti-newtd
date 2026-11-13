"use client";

import { useEffect, useRef, useState } from "react";
import { procedures } from "@/data/procedures";
import { cities } from "@/data/cities";
import { QUOTE_MAX_FILES, quoteFileError } from "@/lib/quote-files";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const field =
  "mt-1.5 min-h-11 w-full rounded-xl border border-border bg-background px-3 text-base";

function SpamCheck() {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!turnstileSiteKey) return;
    const form = document.getElementById("quote-form");
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

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function QuoteForm({ preset }: { preset?: string }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [treatment, setTreatment] = useState(preset ?? "");
  const [preferredCity, setPreferredCity] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const found = procedures.find((item) => item.slug === params.get("procedure"));
    if (found) setTreatment(found.name);
    const cityQuery = params.get("city");
    const city = cities.find(
      (item) => item.searchName === cityQuery || item.name === cityQuery || item.path === cityQuery || item.slug === cityQuery,
    );
    if (city) setPreferredCity(city.name);
  }, []);

  function addFiles(list: FileList | null) {
    const next = [...files];
    for (const file of list ?? []) {
      const duplicate = next.some(
        (item) => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified,
      );
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
    for (const file of files) body.append("reports", file);
    const response = await fetch("/api/quote", { method: "POST", body });
    const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; message?: string };
    setPending(false);
    if (!response.ok || !payload.ok) {
      setError(payload.message || "Please check the highlighted fields.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8" role="status">
        <h2>Your request is with our case desk</h2>
        <p className="mt-3">Our case manager will share expert opinions and estimates within 48 hours.</p>
      </div>
    );
  }

  return (
    <form id="quote-form" onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      {error ? <p className="mb-4 text-sm text-warning" role="alert">{error}</p> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">Patient name
          <input required name="name" minLength={2} className={field} autoComplete="name" />
        </label>
        <label className="text-sm font-medium">Country
          <input required name="country" minLength={2} className={field} autoComplete="country-name" />
        </label>
        <label className="text-sm font-medium">Phone
          <input required name="phone" minLength={6} className={field} autoComplete="tel" placeholder="+234 …" />
        </label>
        <label className="text-sm font-medium">Email
          <input required type="email" name="email" className={field} autoComplete="email" />
        </label>
        <label className="flex min-h-11 items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" name="whatsapp" className="size-4" /> This number is on WhatsApp
        </label>
        <label className="text-sm font-medium sm:col-span-2">Treatment
          <input required minLength={2} className={field} list="treatments" name="treatment" value={treatment} onChange={(event) => setTreatment(event.target.value)} placeholder="Knee replacement, bypass, IVF…" />
          <datalist id="treatments">{procedures.map((item) => <option key={item.slug} value={item.name} />)}</datalist>
        </label>
        <label className="text-sm font-medium sm:col-span-2">What should we know?
          <textarea required minLength={10} name="condition" className={`${field} min-h-28 py-2`} placeholder="A sentence or two about the condition, reports you have, and when you hope to travel." />
        </label>
        <label className="text-sm font-medium">Preferred city <span className="font-normal text-muted">(optional)</span>
          <select name="city" value={preferredCity} onChange={(event) => setPreferredCity(event.target.value)} className={field}>
            <option value="">No preference</option>
            {cities.map((city) => <option key={city.slug} value={city.name}>{city.name}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium">Travel month <span className="font-normal text-muted">(optional)</span>
          <input type="month" name="travelDate" className={field} />
        </label>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium">Documents <span className="font-normal text-muted">(optional)</span></p>
        <p className="mt-1 text-sm text-muted">Any file type. Add up to {QUOTE_MAX_FILES} files, 10 MB each.</p>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            addFiles(event.dataTransfer.files);
          }}
          className={`mt-2 flex min-h-28 w-full flex-col items-center justify-center rounded-2xl border border-dashed px-4 text-sm ${dragging ? "border-primary bg-surface" : "border-border bg-background"}`}
        >
          <span className="font-medium">Drop files here or browse</span>
          <span className="mt-1 text-muted">PDF, scans, Word, photos, DICOM, zip, and anything else</span>
        </button>
        <input
          ref={fileRef}
          type="file"
          multiple
          className="sr-only"
          aria-label="Upload documents"
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />
        {files.length ? (
          <ul className="mt-3 grid gap-2">
            {files.map((file, index) => (
              <li key={`${file.name}-${file.lastModified}-${file.size}`} className="flex items-center justify-between gap-3 rounded-xl border border-border px-3 py-2 text-sm">
                <span className="min-w-0 truncate">{file.name} <span className="text-muted">· {formatSize(file.size)}</span></span>
                <button
                  type="button"
                  className="shrink-0 text-muted underline"
                  onClick={() => {
                    const next = files.filter((_, item) => item !== index);
                    setFiles(next);
                    if (!quoteFileError(next)) setError("");
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <label className="mt-4 flex items-start gap-2 text-sm">
        <input required type="checkbox" name="consent" className="mt-1 size-4" />
        <span>I agree to the <a className="underline" href="/privacy-policy">privacy policy</a> and to TechDr contacting me about this enquiry.</span>
      </label>
      <p className="absolute -left-[9999px]" aria-hidden>
        <label>Company website<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
      </p>
      <SpamCheck />
      <button disabled={pending} className="mt-5 min-h-11 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink disabled:opacity-60" type="submit">
        {pending ? "Sending…" : "Get my free quote"}
      </button>
    </form>
  );
}
