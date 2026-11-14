import { z } from "zod";
import { quoteFileError } from "@/lib/quote-files";
import { site } from "@/lib/site";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  country: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(40),
  whatsapp: z.boolean().default(false),
  email: z.string().trim().email().max(120),
  treatment: z.string().trim().min(2).max(140),
  condition: z.string().trim().min(10).max(2000),
  city: z.string().trim().max(80).optional().default(""),
  travelDate: z.string().trim().max(40).optional().default(""),
  attendants: z.string().trim().max(10).optional().default(""),
  budget: z.string().trim().max(40).optional().default(""),
  consent: z.literal(true),
  turnstileToken: z.string().optional().default(""),
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
  name: "Patient name",
  country: "Country",
  phone: "Phone",
  email: "Email",
  treatment: "Treatment",
  condition: "What should we know",
};

function validationMessage(error: z.ZodError) {
  const issue = error.issues[0];
  const field = String(issue?.path[0] ?? "");
  if (field === "consent") return "Please agree to the privacy policy before sending.";
  const label = fieldLabels[field];
  if (!label) return "Please check the form and try again.";
  if (issue?.code === "too_big") return `${label} is too long.`;
  if (issue?.code === "too_small") return `${label} needs a little more detail.`;
  if (field === "email") return "Enter a valid email address.";
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
    ...parsed.data,
    turnstileToken: undefined,
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

  const leadRecipients = (process.env.LEAD_EMAIL || "medicaltourism@techdr.in,info@techdr.in")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  if (process.env.RESEND_API_KEY && leadRecipients.length) {
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
      to: leadRecipients,
      subject: `Quote: ${parsed.data.treatment} — ${parsed.data.country}`,
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
