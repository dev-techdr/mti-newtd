import { z } from "zod";
import { publishedServices } from "@/data/assistance";
import { quoteFileError } from "@/lib/quote-files";
import { rateLimited } from "@/lib/leads";
import { site } from "@/lib/site";

const slugs = publishedServices().map((item) => item.slug);

const schema = z.object({
  service: z.string().refine((value) => slugs.includes(value), "Choose a service."),
  city: z.string().trim().min(2).max(80),
  country: z.string().trim().min(2).max(80),
  destination: z.string().trim().min(2).max(120),
  condition: z.string().trim().min(10).max(2000),
  ventilator: z.enum(["yes", "no"]),
  oxygen: z.enum(["yes", "no"]),
  stretcher: z.enum(["yes", "no"]),
  urgent: z.enum(["yes", "no"]),
  dateNeeded: z.string().trim().min(2).max(40),
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^\+[0-9][0-9\s-]{7,}$/, "Start the WhatsApp number with + and the country code."),
  email: z.union([z.literal(""), z.string().trim().email().max(120)]).optional().default(""),
  consent: z.literal(true),
  turnstileToken: z.string().optional().default(""),
  pageUrl: z.string().trim().max(500).optional().default(""),
});

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
}

async function turnstileError(token: string) {
  if (!process.env.TURNSTILE_SECRET_KEY) return "";
  const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: token }),
  });
  const outcome = (await verify.json()) as { success?: boolean };
  return outcome.success ? "" : "The spam check failed. Please try again.";
}

async function postJson(url: string, payload: unknown) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
}

export async function createAssistanceRequest(form: FormData) {
  const trap = text(form, "hp_field").trim();
  if (trap) return { ok: true as const };

  const parsed = schema.safeParse({
    service: text(form, "service"),
    city: text(form, "city"),
    country: text(form, "country"),
    destination: text(form, "destination"),
    condition: text(form, "condition"),
    ventilator: text(form, "ventilator"),
    oxygen: text(form, "oxygen"),
    stretcher: text(form, "stretcher"),
    urgent: text(form, "urgent"),
    dateNeeded: text(form, "dateNeeded"),
    name: text(form, "name"),
    phone: text(form, "phone"),
    email: text(form, "email"),
    consent: form.get("consent") === "on" || form.get("consent") === "true",
    turnstileToken: text(form, "cf-turnstile-response") || text(form, "turnstileToken"),
    pageUrl: text(form, "pageUrl"),
  });
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false as const, status: 400, message: issue?.message || "Please check the form and try again." };
  }

  const files = form.getAll("summary").filter((item): item is File => item instanceof File && item.size > 0);
  const fileMessage = quoteFileError(files);
  if (fileMessage) return { ok: false as const, status: 400, message: fileMessage };

  const spam = await turnstileError(parsed.data.turnstileToken);
  if (spam) return { ok: false as const, status: 400, message: spam };

  const urgent = parsed.data.urgent === "yes" || parsed.data.dateNeeded.toLowerCase() === "urgent";
  const label = publishedServices().find((item) => item.slug === parsed.data.service)?.label ?? parsed.data.service;
  const subject = `${urgent ? "URGENT " : ""}Medical assistance: ${label}, ${parsed.data.city}, ${parsed.data.country}`;
  const payload = {
    receivedAt: new Date().toISOString(),
    urgent,
    subject,
    service: parsed.data.service,
    city: parsed.data.city,
    country: parsed.data.country,
    destination: parsed.data.destination,
    condition: parsed.data.condition,
    ventilator: parsed.data.ventilator,
    oxygen: parsed.data.oxygen,
    stretcher: parsed.data.stretcher,
    dateNeeded: urgent ? "urgent" : parsed.data.dateNeeded,
    name: parsed.data.name,
    phone: parsed.data.phone,
    email: parsed.data.email,
    pageUrl: parsed.data.pageUrl,
    files: files.map((file) => ({ name: file.name, type: file.type, size: file.size })),
  };

  let delivered = false;
  const hooks = [...new Set([process.env.ASSISTANCE_WEBHOOK, urgent ? "" : process.env.LEAD_WEBHOOK_URL].filter(Boolean))] as string[];
  for (const url of hooks) {
    try {
      await postJson(url, payload);
      delivered = true;
    } catch (error) {
      console.error("Assistance webhook failed:", error instanceof Error ? error.message : "unknown");
    }
  }

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const attachments = await Promise.all(
      files.map(async (file) => ({ filename: file.name, content: Buffer.from(await file.arrayBuffer()) })),
    );
    const sent = await resend.emails.send({
      from: process.env.RESEND_FROM || "TechDr <onboarding@resend.dev>",
      to: site.email,
      subject,
      text: Object.entries(payload)
        .filter(([key]) => key !== "files")
        .map(([key, value]) => `${key}: ${String(value ?? "")}`)
        .join("\n"),
      attachments,
    });
    if (sent.error) {
      console.error("Assistance email failed:", sent.error.message);
    } else {
      delivered = true;
    }
  }

  if (!delivered && process.env.NODE_ENV === "production") {
    return {
      ok: false as const,
      status: 503,
      message: `We could not send this request. Email ${site.email} or use WhatsApp.`,
    };
  }
  return { ok: true as const };
}

export { rateLimited };
