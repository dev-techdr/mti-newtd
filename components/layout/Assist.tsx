"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import Script from "next/script";
import { Link, usePathname } from "@/i18n/navigation";
import { topicFromPath } from "@/components/contact/WhatsAppLink";
import { telHref, whatsappHref, whatsappMessage } from "@/lib/site";

export function Assist() {
  const t = useTranslations();
  const pathname = usePathname();
  const wa = whatsappHref(whatsappMessage(topicFromPath(pathname)));
  const cookies = useSyncExternalStore(subscribeConsent, consentSnapshot, () => "unknown" as const);

  function choose(value: "accepted" | "rejected") {
    localStorage.setItem("cookie-consent", value);
    window.dispatchEvent(new Event("analytics-consent"));
  }

  return (
    <>
      <a href={wa} className="pulse fixed end-4 bottom-24 z-40 size-14 shadow-lg md:bottom-6" aria-label={t("nav.whatsapp")}>
        <img src="/images/icons/social.svg" alt="" width={56} height={56} className="size-14" />
      </a>
      {pathname === "/get-a-free-quote" ? null : (
        <Link href="/get-a-free-quote" className="fixed end-4 bottom-40 z-40 hidden min-h-11 items-center rounded-full bg-accent px-4 text-sm font-semibold text-accent-ink md:inline-flex">
          {t("nav.quote")}
        </Link>
      )}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-background md:hidden" aria-label="Quick contact">
        <a className="flex min-h-14 items-center justify-center text-sm font-medium" href={telHref()}>{t("mobile.call")}</a>
        <a className="flex min-h-14 items-center justify-center bg-accent text-sm font-semibold text-accent-ink" href={wa}>Chat on WhatsApp</a>
        <Link className="flex min-h-14 items-center justify-center text-sm font-medium" href="/get-a-free-quote">Get a free quote</Link>
      </nav>
      {cookies === "unknown" ? (
        <div className="fixed inset-x-3 bottom-20 z-40 rounded-2xl border border-border bg-card p-4 shadow-lg md:bottom-6 md:end-auto md:start-4 md:max-w-sm" role="dialog" aria-label="Cookies">
          <p className="text-sm">{t("cookie.text")} <Link className="underline" href="/privacy-policy">{t("footer.privacy")}</Link></p>
          <div className="mt-3 flex gap-2">
            <button type="button" className="min-h-11 rounded-full bg-secondary px-4 text-sm text-background" onClick={() => choose("accepted")}>{t("cookie.accept")}</button>
            <button type="button" className="min-h-11 rounded-full border border-border px-4 text-sm" onClick={() => choose("rejected")}>{t("cookie.reject")}</button>
          </div>
        </div>
      ) : null}
      <Analytics />
    </>
  );
}

function subscribeConsent(onStoreChange: () => void) {
  window.addEventListener("analytics-consent", onStoreChange);
  return () => window.removeEventListener("analytics-consent", onStoreChange);
}

function consentSnapshot() {
  return localStorage.getItem("cookie-consent") ? "set" : "unknown";
}

type LeadEvent = "generate_lead" | "whatsapp_click" | "call_click";

function campaignParams(extra: { treatment?: string; country?: string } = {}) {
  const params = new URLSearchParams(window.location.search);
  const stored = JSON.parse(sessionStorage.getItem("utm") || "{}") as Record<string, string>;
  return {
    page_path: window.location.pathname,
    treatment: extra.treatment || params.get("procedure") || "",
    country: extra.country || "",
    utm_source: stored.utm_source || params.get("utm_source") || "",
    utm_campaign: stored.utm_campaign || params.get("utm_campaign") || "",
  };
}

function rememberCampaign() {
  const params = new URLSearchParams(window.location.search);
  const stored = JSON.parse(sessionStorage.getItem("utm") || "{}") as Record<string, string>;
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const value = params.get(key);
    if (value) stored[key] = value;
  }
  sessionStorage.setItem("utm", JSON.stringify(stored));
}

function sendEvent(name: LeadEvent, extra: { treatment?: string; country?: string } = {}) {
  const payload = campaignParams(extra);
  const win = window as Window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };
  win.dataLayer = win.dataLayer || [];
  if (!win.gtag) {
    win.gtag = function gtag(...args: unknown[]) {
      win.dataLayer?.push(args);
    };
  }
  win.gtag("event", name, payload);
  const ads = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL;
  if (ads && label) win.gtag?.("event", "conversion", { send_to: `${ads}/${label}`, ...payload });
  win.fbq?.("trackCustom", name, payload);
  if (name === "generate_lead") win.fbq?.("track", "Lead", payload);
}

const queued: { name: LeadEvent; extra: { treatment?: string; country?: string } }[] = [];

function track(name: LeadEvent, extra: { treatment?: string; country?: string } = {}) {
  if (typeof window === "undefined") return;
  if (localStorage.getItem("cookie-consent") !== "accepted") {
    queued.push({ name, extra });
    return;
  }
  sendEvent(name, extra);
}

function Analytics() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    rememberCampaign();
    const sync = () => {
      const next = localStorage.getItem("cookie-consent") === "accepted";
      setAllowed(next);
      if (next) {
        for (const item of queued.splice(0)) sendEvent(item.name, item.extra);
      }
    };
    sync();
    const onLead = (event: Event) => {
      const detail = (event as CustomEvent<{ treatment?: string; country?: string }>).detail ?? {};
      track("generate_lead", detail);
    };
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href.includes("wa.me")) track("whatsapp_click");
      if (href.startsWith("tel:")) track("call_click");
    };
    window.addEventListener("analytics-consent", sync);
    window.addEventListener("generate-lead", onLead);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("analytics-consent", sync);
      window.removeEventListener("generate-lead", onLead);
      document.removeEventListener("click", onClick);
    };
  }, []);
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const ads = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const tagId = ga || ads;
  if (!allowed) return null;
  return (
    <>
      {tagId ? <Script src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`} strategy="lazyOnload" /> : null}
      {tagId ? (
        <Script id="ga4" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${ga ? `gtag('config','${ga}');` : ""}${ads ? `gtag('config','${ads}');` : ""}`}
        </Script>
      ) : null}
      {pixel ? (
        <Script id="meta-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');`}
        </Script>
      ) : null}
      {plausible ? (
        <Script defer data-domain={plausible} src="https://plausible.io/js/script.js" strategy="lazyOnload" />
      ) : null}
    </>
  );
}
