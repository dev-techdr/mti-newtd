import { NextResponse } from "next/server";
import { createAssistanceRequest, rateLimited } from "@/lib/assistance-leads";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests from this network. Please wait an hour or write to us by email." },
      { status: 429 },
    );
  }
  const form = await request.formData();
  const result = await createAssistanceRequest(form);
  if (!result.ok) return NextResponse.json({ ok: false, message: result.message }, { status: result.status });
  return NextResponse.json({ ok: true });
}
