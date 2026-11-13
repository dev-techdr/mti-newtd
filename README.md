# TechDr Medical Tourism

Production site for [medicaltourism.techdr.in](https://medicaltourism.techdr.in). It helps international patients plan treatment in India with accredited partner hospitals. The site is a coordinator. It is not a hospital, and it does not name individual doctors.

## Stack

Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4, next-intl (`en`, `ar`, `fr`, `ru`, `bn`), Framer Motion, Lenis, Zod, and MDX for articles. English URLs have no prefix. `/ar`, `/fr`, `/ru`, and `/bn` translate the interface. Medical articles stay in English.

## Scripts

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm start
```

## Deploy on Vercel

1. Import this repository. Framework preset: Next.js. Node 22 or newer.
2. Set the environment variables from `.env.example`.
3. Production domain: `medicaltourism.techdr.in`.
4. `cacheComponents` is on. Cost and procedure pages revalidate every 24 hours.

Call and WhatsApp use `NEXT_PUBLIC_PHONE` and `NEXT_PUBLIC_WHATSAPP_NUMBER` when set. The defaults are `+916303225006` and `+918499005006`, and the public email is `medicaltourism@techdr.in`. In production, quote delivery returns an error until `RESEND_API_KEY` plus `LEAD_EMAIL`, or `LEAD_WEBHOOK_URL`, is set. Local development accepts the form without those keys.

Uploads are validated at 10MB. Vercel’s request body limit on smaller plans is about 4.5MB, so large PDFs may need the webhook path or a later direct-to-storage upload.

## Update a price

Edit the row in `data/costs.ts`. Procedure pages, cost pages, the home chart, the estimator, and the guide copy that quotes those figures should stay aligned with that file. After a price change, update `public/llms.txt` and `public/llms-full.txt` (they are generated from the same numbers) and set `updated` on the procedure if the clinical page changed. The current edition date in the product is 15 October 2026.

Rows with `guide: true` are the published comparison table. Rows with `guide: false` are planning ranges and are labelled as such.

## Update a page

- Procedures: `data/procedures/*.ts`
- Specialties: `data/specialties.ts`
- Cities: `data/cities.ts`
- Countries: `data/countries.ts`
- Articles: `content/blog/*.mdx`, and the matching summary in `data/blog.ts`
- Interface strings: `messages/*.json`

Do not add a named doctor or a named hospital. Do not promise an outcome. Keep the medical disclaimer on clinical pages.

## What the client still needs to supply

- Logo and any brand photography they have rights to
- Audited replacements for the placeholder figures (patients guided, countries, savings, quote turnaround)
- Social profile URLs
- Analytics IDs (GA4 or Plausible)
- Resend API key, from-address, and inbox, or a lead webhook
- Cloudflare Turnstile site key and secret
- Confirmation that the 2026 cost table matches the contracts they actually offer

## Sitemaps and crawlers

`app/robots.ts` allows major search and AI crawlers. Sitemaps are split under `/sitemaps/pages`, `/treatments`, `/costs`, `/countries`, and `/blog`. A short brief for answer engines is at `/llms.txt`, with a longer brief at `/llms-full.txt`.
