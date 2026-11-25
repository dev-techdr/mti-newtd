import { z } from "zod";
import { quoteFileError } from "@/lib/quote-files";
import { site } from "@/lib/site";

const optionalText = z.string().trim().max(200).optional().default("");

const leadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  country: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(40),
  email: z.union([z.literal(""), z.string().trim().email().max(120)]).optional().default(""),
  treatment: z.string().trim().max(140).optional().default(""),
  condition: z.string().trim().min(10).max(2000),
  consent: z.literal(true),
  turnstileToken: z.string().optional().default(""),
  pageUrl: z.string().trim().max(500).optional().default(""),
  utm_source: optionalText,
  utm_medium: optionalText,
  utm_campaign: optionalText,
  utm_content: optionalText,
  utm_term: optionalText,
});

export type LeadInput = z.infer<typeof leadSchema>;

const hits = new Map<string, number[]>();

export function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((stamp) => now - stamp < 60 * 60 * 1000);
  if (recent.length >= 5) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const fieldLabels: Record<string, string> = {
  name: "Full name",
  country: "Country you live in",
  phone: "WhatsApp number",
  email: "Email",
  treatment: "Treatment",
  condition: "The problem or treatment",
};

function validationMessage(error: z.ZodError) {
  const issue = error.issues[0];
  const field = String(issue?.path[0] ?? "");
  if (field === "consent") return "Please agree to the privacy policy before sending.";
  const label = fieldLabels[field];
  if (!label) return "Please check the form and try again.";
  if (issue?.code === "too_big") return `${label} is too long.`;
  if (issue?.code === "too_small") return `${label} needs a little more detail.`;
  if (field === "email") return "Enter a valid email address, or leave it blank.";
  return `Check the ${label} field.`;
}

export async function createLead(input: unknown, files: File[] = []) {
  const record = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const trap = typeof record.hp_field === "string" ? record.hp_field.trim() : "";
  if (trap) return { ok: true as const, delivered: true };

  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, status: 400, message: validationMessage(parsed.error) };
  }
  const fileMessage = quoteFileError(files);
  if (fileMessage) {
    return { ok: false as const, status: 400, message: fileMessage };
  }

  if (process.env.TURNSTILE_SECRET_KEY) {
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: parsed.data.turnstileToken,
      }),
    });
    const outcome = (await verify.json()) as { success?: boolean };
    if (!outcome.success) {
      return { ok: false as const, status: 400, message: "The spam check failed. Please try again." };
    }
  }

  const payload = {
    receivedAt: new Date().toISOString(),
    name: parsed.data.name,
    country: parsed.data.country,
    phone: parsed.data.phone,
    whatsapp: true,
    email: parsed.data.email,
    treatment: parsed.data.treatment,
    condition: parsed.data.condition,
    consent: true,
    pageUrl: parsed.data.pageUrl,
    utm_source: parsed.data.utm_source,
    utm_medium: parsed.data.utm_medium,
    utm_campaign: parsed.data.utm_campaign,
    utm_content: parsed.data.utm_content,
    utm_term: parsed.data.utm_term,
    files: files.map((file) => ({ name: file.name, type: file.type, size: file.size })),
  };

  let delivered = false;
  if (process.env.LEAD_WEBHOOK_URL) {
    await fetch(process.env.LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    delivered = true;
  }

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      })),
    );
    const sent = await resend.emails.send({
      from: process.env.RESEND_FROM || "TechDr <onboarding@resend.dev>",
      to: site.email,
      subject: `Quote: ${parsed.data.treatment || "Not sure"} — ${parsed.data.country}`,
      text: Object.entries(payload)
        .filter(([key]) => key !== "files")
        .map(([key, value]) => `${key}: ${String(value ?? "")}`)
        .join("\n"),
      attachments,
    });
    if (sent.error) {
      console.error("Quote email failed:", sent.error.message);
      return {
        ok: false as const,
        status: 503,
        message: `We could not send this request. Email ${site.email} or use WhatsApp.`,
      };
    }
    delivered = true;
  }

  if (!delivered && process.env.NODE_ENV === "production") {
    return {
      ok: false as const,
      status: 503,
      message: `The quote desk is not connected yet. Email ${site.email} or use WhatsApp.`,
    };
  }

  return { ok: true as const, delivered };
}
