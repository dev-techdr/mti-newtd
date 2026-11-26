"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { WhatsAppLink } from "@/components/contact/WhatsAppLink";
import { Link } from "@/i18n/navigation";
import { countryNames } from "@/data/country-names";
import { QUOTE_MAX_FILES, quoteFileError } from "@/lib/quote-files";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const field = "mt-1.5 min-h-11 w-full rounded-xl border border-border bg-background px-3 text-base";
const notSure = "Not sure, please advise";
const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

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

function storedUtm() {
  const params = new URLSearchParams(window.location.search);
  const saved = JSON.parse(sessionStorage.getItem("utm") || "{}") as Record<string, string>;
  const next = { ...saved };
  for (const key of utmKeys) {
    const value = params.get(key);
    if (value) next[key] = value;
  }
  sessionStorage.setItem("utm", JSON.stringify(next));
  return next;
}

function SearchSelect({
  name,
  label,
  required,
  value,
  options,
  onChange,
}: {
  name: string;
  label: string;
  required?: boolean;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const matches = options.filter((item) => item.toLowerCase().includes(value.trim().toLowerCase())).slice(0, 8);
  return (
    <label className="relative text-sm font-medium">
      {label}
      <input
        name={name}
        required={required}
        value={value}
        className={field}
        autoComplete="off"
        onFocus={() => setOpen(true)}
        onBlur={() => {
          window.setTimeout(() => setOpen(false), 120);
          const exact = options.find((item) => item.toLowerCase() === value.trim().toLowerCase());
          if (exact) onChange(exact);
          else if (!required) onChange("");
        }}
        onChange={(event) => {
          setOpen(true);
          onChange(event.target.value);
        }}
      />
      {open && matches.length ? (
        <ul id={`${name}-options`} className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-border bg-card py-1 shadow-lg" role="listbox">
          {matches.map((item) => (
            <li key={item}>
              <button
                type="button"
                className="block w-full px-3 py-2 text-start text-sm hover:bg-surface"
                onMouseDown={(event) => {
                  event.preventDefault();
                  onChange(item);
                  setOpen(false);
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </label>
  );
}

export function QuoteForm({
  treatments,
}: {
  treatments: { slug: string; name: string }[];
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const countries = countryNames;
  const treatmentOptions = useMemo(() => [notSure, "Medical assistance", ...treatments.map((item) => item.name)], [treatments]);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [country, setCountry] = useState("");
  const [treatment, setTreatment] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const found = treatments.find((item) => item.slug === params.get("procedure"));
    const named = params.get("country");
    const countryMatch = named ? countries.find((item) => item.toLowerCase() === named.toLowerCase()) : "";
    const frame = requestAnimationFrame(() => {
      if (found) setTreatment(found.name);
      if (params.get("service") === "medical-assistance") setTreatment("Medical assistance");
      if (countryMatch) setCountry(countryMatch);
    });
    return () => cancelAnimationFrame(frame);
  }, [countries, treatments]);

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
    if (!countries.includes(country)) {
      setError("Choose the country you live in from the list.");
      return;
    }
    if (treatment && !treatmentOptions.includes(treatment)) {
      setError("Choose a treatment from the list, or leave it blank.");
      return;
    }
    if (!form.reportValidity()) return;
    const fileMessage = quoteFileError(files);
    if (fileMessage) {
      setError(fileMessage);
      return;
    }
    setPending(true);
    setError("");
    const body = new FormData(form);
    const campaign = storedUtm();
    body.set("country", country);
    body.set("treatment", treatment);
    body.set("pageUrl", window.location.href);
    for (const key of utmKeys) body.set(key, campaign[key] ?? "");
    for (const file of files) body.append("reports", file);
    const response = await fetch("/api/quote", { method: "POST", body });
    const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; message?: string };
    setPending(false);
    if (!response.ok || !payload.ok) {
      setError(payload.message || "Please check the highlighted fields.");
      return;
    }
    window.dispatchEvent(new CustomEvent("generate-lead", { detail: { treatment, country, pageUrl: window.location.href } }));
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8" role="status">
        <h2>Thank you</h2>
        <p className="mt-3">A TechDr coordinator will message you on WhatsApp. Your written estimate follows within 48 hours of complete reports.</p>
        <WhatsAppLink className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink">
          Chat on WhatsApp
        </WhatsAppLink>
      </div>
    );
  }

  return (
    <form id="quote-form" onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      {error ? <p className="mb-4 text-sm text-warning" role="alert">{error}</p> : null}
      <div className="grid gap-4">
        <label className="text-sm font-medium">Full name
          <input required name="name" minLength={2} maxLength={80} className={field} autoComplete="name" />
        </label>
        <SearchSelect name="country" label="Country you live in" required value={country} options={countries} onChange={setCountry} />
        <label className="text-sm font-medium">WhatsApp number with country code
          <input required name="phone" minLength={6} maxLength={40} className={field} autoComplete="tel" inputMode="tel" />
        </label>
        <label className="text-sm font-medium">Email <span className="font-normal text-muted">(optional)</span>
          <input type="email" name="email" maxLength={120} className={field} autoComplete="email" />
        </label>
        <label className="text-sm font-medium">Tell us the problem or the treatment you need
          <textarea required minLength={10} maxLength={2000} name="condition" className={`${field} min-h-28 py-2`} />
        </label>
        <SearchSelect name="treatment" label="Treatment (optional)" value={treatment} options={treatmentOptions} onChange={setTreatment} />
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium">Upload reports <span className="font-normal text-muted">(optional)</span></p>
        <p className="mt-1 text-sm text-muted">PDF, JPG, PNG, DOCX or ZIP. Up to {QUOTE_MAX_FILES} files, 25 MB each. You can also send reports on WhatsApp later.</p>
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
        </button>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.docx,.zip,application/pdf,image/jpeg,image/png"
          className="sr-only"
          aria-label="Upload reports"
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
        <span>I agree to the <Link className="underline" href="/privacy-policy">privacy policy</Link> and to TechDr contacting me about this enquiry.</span>
      </label>
      <p className="absolute -left-[9999px] h-px overflow-hidden" aria-hidden="true">
        <input name="hp_field" tabIndex={-1} autoComplete="off" defaultValue="" />
      </p>
      <SpamCheck />
      <button disabled={pending} className="mt-5 min-h-11 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink disabled:opacity-60" type="submit">
        {pending ? "Sending…" : "Get my free opinion"}
      </button>
    </form>
  );
}
