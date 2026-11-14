import { NextResponse } from "next/server";
import { createLead, rateLimited } from "@/lib/leads";

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
      name: form.get("name"),
      country: form.get("country"),
      phone: form.get("phone"),
      whatsapp: form.get("whatsapp") === "on" || form.get("whatsapp") === "true",
      email: form.get("email"),
      treatment: form.get("treatment"),
      condition: form.get("condition"),
      city: form.get("city") || "",
      travelDate: form.get("travelDate") || "",
      attendants: form.get("attendants") || "",
      budget: form.get("budget") || "",
      consent: form.get("consent") === "on" || form.get("consent") === "true" ? true : false,
      hp_field: form.get("hp_field") || "",
      turnstileToken: form.get("cf-turnstile-response") || form.get("turnstileToken") || "",
    },
    files,
  );

  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.message }, { status: result.status });
  }
  return NextResponse.json({ ok: true });
}
