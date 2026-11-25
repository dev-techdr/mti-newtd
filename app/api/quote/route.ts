import { NextResponse } from "next/server";
import { createLead, rateLimited } from "@/lib/leads";

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests from this network. Please wait an hour or write to us by email." },
      { status: 429 },
    );
  }

  const form = await request.formData();
  const files = form.getAll("reports").filter((item): item is File => item instanceof File && item.size > 0);
  const result = await createLead(
    {
      name: text(form, "name"),
      country: text(form, "country"),
      phone: text(form, "phone"),
      email: text(form, "email"),
      treatment: text(form, "treatment"),
      condition: text(form, "condition"),
      consent: form.get("consent") === "on" || form.get("consent") === "true",
      hp_field: text(form, "hp_field"),
      turnstileToken: text(form, "cf-turnstile-response") || text(form, "turnstileToken"),
      pageUrl: text(form, "pageUrl"),
      utm_source: text(form, "utm_source"),
      utm_medium: text(form, "utm_medium"),
      utm_campaign: text(form, "utm_campaign"),
      utm_content: text(form, "utm_content"),
      utm_term: text(form, "utm_term"),
    },
    files,
  );

  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.message }, { status: result.status });
  }
  return NextResponse.json({ ok: true });
}
