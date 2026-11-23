# Phase 0 audit — TechDr Medical Tourism

Read-only audit of the Next.js app in this repository and of https://medicaltourism.techdr.in. No application code was changed. Phase 1 should not start until this report is approved.

The URL table is [docs/url-inventory.csv](url-inventory.csv): 24,680 rows (url, type, locale, indexable, word count, unique-content estimate, schema types, issues).

## How this was measured

- Stack, routes, and content were read from the repository.
- `npm run lint` and `npx tsc --noEmit` were run in the project.
- `scripts/check-repetition.ts` and `scripts/check-jsonld.ts` were run in a copy of the tree. They do not write files. `npm run build` was not used as the build command, because it runs `scripts/readiness.ts` first, and that script rewrites `data/patients/indexable.json` and moves route files.
- `npx next build` was then run in this project. It prerendered 26,024 pages.
- HTML, sitemaps, `robots.txt`, and `llms.txt` were read from the local dev server at `http://localhost:3000`, which is this codebase.
- `https://medicaltourism.techdr.in` was requested directly. It is not serving the site. Core Web Vitals and a live sitemap crawl were therefore not possible. Lighthouse was not run against the dev server, because a dev-server score is not field Core Web Vitals.

`node_modules` was already installed (Next.js 16.4.3 resolved and the build compiled). `npm install` was not run again, so the lockfile was left untouched.

The dev server and the production build share `.next`. Restart `npm run dev` if the local server looks stale after this audit.

## Architecture

| Layer | What the repo actually uses |
|---|---|
| App | Next.js 16.4.3, React 19.3, App Router only. No `pages/` router. |
| Language | TypeScript. `npx tsc --noEmit` passes. |
| Styling | Tailwind CSS 4. Shared UI is hand-rolled around Radix (accordion, dialog, select, tabs). |
| Animation | Framer Motion and Lenis are mounted from `app/[locale]/(site)/layout.tsx` on every page. |
| i18n | `next-intl` 4. Routing in `i18n/routing.ts`: `en`, `ar`, `fr`, `ru`, `bn`. Default locale is unprefixed (`localePrefix: "as-needed"`). Locale detection is off. The Next 16 request interceptor is `proxy.ts`, not `middleware.ts`. |
| Content | Typed TypeScript in `data/`, MDX in `content/blog/` (38 files). There is no CMS. |
| Validation | Zod is used for patient-country records (`data/patients/schema.ts`) and for the quote payload. Procedure, specialty, city, and cost records are not Zod-validated at build. |
| Forms | `POST /api/quote` (`app/api/quote/route.ts`), not a Server Action. Honeypot, in-memory rate limit, lazy Cloudflare Turnstile when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set. Delivery needs Resend or a webhook in production (`lib/leads.ts`). |
| Analytics | GA4 or Plausible, loaded only after cookie consent (`components/layout/Assist.tsx`). IDs come from env. |
| Rendering | `cacheComponents: true` and `partialPrefetching: true` in `next.config.ts`. No `export const revalidate`. Blog MDX uses `"use cache"` and `cacheLife("max")` in `lib/articles.ts`. The README’s “cost and procedure pages revalidate every 24 hours” is not implemented. Build output marks content routes as Partial Prerender: static HTML plus a streamed slot. |
| Static params | `generateStaticParams` on every content route. `dynamicParams` is left at the default, so unknown slugs are not hard-failed at the edge. |
| SEO helper | `lib/seo.ts` `pageMetadata` (canonical, hreflang, robots, Open Graph, Twitter). There is no `lib/seo/buildMetadata.ts`. |
| JSON-LD | `components/seo/JsonLd.tsx` and builders in `lib/schema.ts`. |
| Sitemaps | Custom XML. Index at `app/sitemap.xml/route.ts`. Children under `app/sitemaps/`. There is no `app/sitemap.ts` and no `generateSitemaps()`. |
| robots / llms | `app/robots.ts`. `app/llms.txt/route.ts` builds the short file from data. `public/llms-full.txt` is a separate static file. |
| OG images | One image at `app/[locale]/opengraph-image.tsx`. Content routes do not have their own `opengraph-image.tsx`. |
| Redirects | `data/redirects.ts`, returned from `next.config.ts`. 1,512 redirect rules. Next warns once the custom-route count passes 1,000. |
| Fonts | `next/font/google`: Plus Jakarta Sans, Inter, and Noto Kufi Arabic for Arabic. |
| Images | `next/image` is configured (AVIF/WebP). Several UI icons still use `<img>` (`Assist.tsx`, `ServiceIcon.tsx`). |

### Routes that render

All of these live under `app/[locale]/(site)/`.

| Route | Role | Indexable in English today |
|---|---|---|
| `/` | Home | Yes |
| `/treatments`, `/treatments/[specialty]`, `/treatments/[specialty]/[procedure]` | 31 specialty hubs and 664 clinical pages | Yes |
| `/cost/[slug]` | One cost URL per procedure, including the emergency | Yes |
| `/destinations/[city]` | Delhi, Mumbai, Chennai, Hyderabad, Bengaluru, Kolkata | Yes |
| `/destinations/[city]/[procedure]` | 5 cities × 664 procedures | No (`robots: noindex`) |
| `/destinations/[city]/departments/[specialty]` | 6 cities × specialties that have guides | No |
| `/destinations/[city]/departments` | Redirects to the city hub | No |
| `/patients-from`, `/patients-from/[country]` | Directory plus 10 country narratives | Directory yes. Country pages no |
| `/blog`, `/blog/[slug]` | 38 MDX guides | Yes |
| `/about`, `/how-it-works`, `/patient-services`, `/why-india`, `/medical-visa-india`, `/faq`, `/contact`, `/get-a-free-quote` | Trust and conversion | Yes |
| `/editorial-policy`, `/medical-review-team`, `/medical-disclaimer`, `/privacy-policy`, `/terms` | Policy | Yes |

These clusters are data-only. Their page files are parked in `recycle/patient-routes/` and are copied back by `scripts/readiness.ts` only when a record is approved:

- `/patients-from/[country]/[slug]` (country × treatment and source city)
- `/answers` and `/answers/[question]`

`data/patients/indexable.json` is empty for countries, treatments, cities, and answers, so those sitemaps 404 on purpose.

There is no route yet for `/conditions`, `/tests`, `/technology`, `/compare`, `/glossary`, `/guides`, `/tools`, `/medical-tourism-packages`, `/recovery-destinations`, `/patient-stories`, or `/site-map`.

### Content counts

| Source | Records |
|---|---|
| `data/specialties.ts` | 31 hubs. Neurology is the only hub with zero guides. |
| `data/procedures/` | 664 pages: 480 `procedure`, 183 `condition`, 1 `emergency` (cauda equina). 594 of the 664 are generated in `data/procedures/library.ts` from shared band profiles. 70 are hand-written. |
| `data/costs.ts` plus library cost rows | One cost id per procedure. 664. Library rows use a band profile (`med`, `complex`, and similar), with `guide: false`. |
| `data/cities.ts` | 6 Indian cities. City × procedure pages are generated for 5 of them (Kolkata is a city hub only). |
| `data/city-unique.ts` | Empty. A city combo is indexable only at 300 unique words, so none qualify. |
| `data/countries.ts` | 10 narrative country pages. |
| `data/patients/countries/*.json` | The same 10 countries, all failing the readiness gate. |
| `data/patients/catalog.ts` | 45 source countries planned across four waves. 15 market treatments. 46 source-city candidates. |
| `data/patients/cities.json` | 23 source-city stubs. |
| `content/blog` | 38 MDX articles, matched by `data/blog.ts`. |
| `data/decision-guides.ts` | 30 procedure-level “which option” notes. |
| Locales with `translated: true` | 0. `lib/translation.ts` noindexes `ar`, `fr`, `ru`, and `bn` unless that flag is set. |

Conditions are not a separate collection. A condition is a procedure record with `kind: "condition"` and the URL `/treatments/{specialty}/{slug}`.

### Sitemap the app actually publishes

Fetched from the local server. Hreflang on every URL is only `en` and `x-default`.

| Sitemap | URLs | lastmod values |
|---|---|---|
| `/sitemaps/pages/sitemap.xml` | 17 | 2026-10-15, 2026-11-13, 2026-11-23 |
| `/sitemaps/treatments/sitemap.xml` | 695 (31 hubs + 664 pages) | 641 on 2026-11-13, 54 on 2026-10-15 |
| `/sitemaps/costs/sitemap.xml` | 664 | 641 on 2026-11-13, 23 on 2026-10-15 |
| `/sitemaps/countries/sitemap.xml` | 6 city hubs | all 2026-10-15 |
| `/sitemaps/blog/sitemap.xml` | 38 | 2026-10-15 and 2026-11-11 |
| City, country-treatment, source-city, and answer sitemaps | 404 | omitted because they have zero indexable URLs |

English URLs in the sitemap index: **1,420**. Non-English URLs in the sitemap: **0**.

The shared treatment `lastmod` is produced in `lib/page-model.ts`. When the shared filler FAQs are added, `updated` is forced to `2026-11-13`.

### Client JavaScript

Uncompressed First Load JS from `.next/diagnostics/route-bundle-stats.json` after the production build:

| Route | First Load JS |
|---|---|
| Content pages (procedure, cost, specialty, city, country, visa, FAQ) | 694 KB |
| Home and destination city | 695 KB |
| Legal, about, blog, how-it-works | 677 KB |
| `/get-a-free-quote` | 1,156 KB |

The content-page budget in the master plan is 30 KB. The shared layout carries Framer Motion, Lenis, and the header/assist client components onto every page. The quote page is larger because `components/forms/QuoteForm.tsx` is a client component that imports the full `procedures` array, including the long clinical fields.

Build wall clock was about 5.1 minutes. TypeScript finished in 4.2 seconds, the compile in 4.5 seconds, and static generation of 26,024 pages in 3.9 minutes. That is inside a 15-minute budget, and most of those pages are locale copies, city aliases, and noindex city × procedure URLs.

## Live site

`https://medicaltourism.techdr.in/` returns HTTP 404 from Vercel:

`x-vercel-error: DEPLOYMENT_NOT_FOUND`

`/sitemap.xml`, `/robots.txt`, and `/llms.txt` on that host return the same error. There is no deployed site to crawl, and there is no field Core Web Vitals sample. The domain is pointed at Vercel and the project is not deployed.

The earlier manual review (indexable untranslated locales, combined `tel:`, locale CTAs pointing at English URLs) describes a site this codebase has since changed. Those three items are fixed in the current HTML. They cannot be rechecked on the public host until a deployment exists.

## Sample of rendered HTML

Taken from the completed local response, which is the document a crawler receives after the stream finishes. The article H1 is in that HTML. A Suspense fallback (`animate-pulse`) is also present in the payload.

| URL | robots | Title / H1 | Notes |
|---|---|---|---|
| `/` | index, follow | English title and H1. H1 says “World-Class” and “up to 80% less”. | Canonical is the bare origin. Schema: Organization, MedicalBusiness, WebSite, FAQPage. One `tel:+916303225006`. |
| `/treatments/cardiology` | index, follow | English specialty H1. | ItemList + FAQPage + MedicalWebPage. Byline is `TODO(client): Dr ___`. |
| `/treatments/neurology` | index, follow | “Neurology and neurosurgery in India”. | No procedure list. Hub is a short intro plus FAQs. |
| `/treatments/neurosurgery/deep-brain-stimulation` | index, follow | “Deep brain stimulation Cost in India 2026”. | Hand-written record. Still indexable beside the Parkinson’s page. |
| `/treatments/neurosurgery/parkinsons-disease-treatment` | index, follow | “Parkinson's Disease Treatment Cost in India 2026”. | Library condition page. Unique-content estimate 1%. |
| `/treatments/spine-surgery/cauda-equina-syndrome` | index, follow | “Cauda Equina Syndrome is an emergency”. H1 is the condition name. | Body tells the reader to go to the nearest emergency department. The page’s own quote block is hidden. Header, mobile bar, and WhatsApp button still render. |
| `/cost/cauda-equina-syndrome-cost-in-india` | index, follow | “Cauda Equina Syndrome Cost in India 2026”. | A price page for an emergency. In the cost sitemap. |
| `/treatments/spine-surgery/slipped-disc` | redirects | Lands on `/treatments/spine-surgery/lumbar-disc-herniation`. | The 301 in `data/redirects.ts` works. |
| `/destinations/delhi/departments/cardiology` | noindex, follow | “Cardiology and cardiac surgery in Delhi”. | Self-canonical. Not in the sitemap. The Delhi hub still links to these department URLs. |
| `/destinations/delhi/knee-replacement-surgery` | noindex, follow | “Knee replacement in Delhi”. | Not in the sitemap. |
| `/patients-from/nigeria` | noindex, follow | English country H1. | Self-canonical because `index: false` uses the current URL as canonical. |
| `/blog/knee-replacement-cost-india-2026` | index, follow | Title is cut to `…Complete Guide \|`. | `generateMetadata` slices `` `${title} \| TechDr` `` to 60 characters. BlogPosting schema. |
| `/ar` and `/ar/treatments/cardiology` | noindex, follow | English title, English H1, Arabic banner that the medical text is still in English. | Canonical points at the English URL. Quote links stay under `/ar/get-a-free-quote`. |
| `/fr` | noindex, follow | Same pattern as Arabic. | French banner, English article. |

`/robots.txt` allows `*` plus Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, and Applebot, and lists the five live sitemaps.

`/llms.txt` is generated and is about 138 KB. It lists every treatment with a price band. `public/llms-full.txt` is a 10 KB static file that still says the service coordinates “senior consultants”, which the generated file does not say.

## Confirmed issues

Severity is for this codebase, before any new clusters are added.

| Sev. | Issue | Where |
|---|---|---|
| Critical | The public host has no deployment. Nothing in this audit is what Google can fetch today. | Vercel `DEPLOYMENT_NOT_FOUND` on `medicaltourism.techdr.in` |
| Critical | 594 library pages, and the cost page for each, are indexable. After the page name is removed, the median treatment page shares its sentences with other pages (median unique 3%, cost pages max 8%). The current repetition script still passes, because it compares sentences that contain the name. | `data/procedures/library.ts`, `lib/page-model.ts`, `scripts/check-repetition.ts` |
| Critical | Cauda equina has an indexable cost URL, “Cauda Equina Syndrome Cost in India 2026”. | `app/[locale]/(site)/cost/[slug]/page.tsx`, `app/sitemaps/costs/sitemap.ts` |
| Critical | No page has a named, registered reviewer. The byline is `TODO(client): Dr ___`. The review-team page says the same. Under the medical-review rule, zero clinical pages should be indexed. | `components/seo/AnswerBox.tsx`, `app/[locale]/(site)/medical-review-team/page.tsx` |
| High | Parkinson’s disease treatment (condition, 1% unique) and deep brain stimulation (procedure, 31% unique) are both indexable. Whipple procedure and pancreatic surgery are both indexable. Neurology (empty) and neurosurgery are both indexable. Cosmetic surgery and plastic surgery are both indexable. | `data/procedures/catalog.ts`, `data/procedures/library.ts`, `data/specialties.ts` |
| High | City hubs link to city × department URLs that are noindex and near-duplicate. 3,320 city × procedure pages and 180 city × department pages are still generated. | `app/[locale]/(site)/destinations/[city]/page.tsx`, `data/city-unique.ts` |
| High | 641 of 695 treatment sitemap URLs share `lastmod` 2026-11-13, because filler FAQs force that date. | `lib/page-model.ts` |
| High | Library prices are band profiles, not sourced quotes. They are still published as USD ranges on indexable pages. | `data/procedures/library.ts` (`guide: false`) |
| High | Home H1 claims “world-class” care and “up to 80% less” without a source on the page. | `components/sections/HomeView.tsx` |
| High | Every content route ships about 677–695 KB uncompressed JavaScript. The quote route ships 1,156 KB. | `app/[locale]/(site)/layout.tsx`, `components/forms/QuoteForm.tsx` |
| Medium | Country pages are noindex, which is correct, and their canonical is their own URL rather than a single English canonical. | `lib/seo.ts` |
| Medium | Blog titles are sliced to 60 characters and can end on a pipe. | `app/[locale]/(site)/blog/[slug]/page.tsx` |
| Medium | `public/llms-full.txt` is hand-maintained and disagrees with the generated `/llms.txt`. | `public/llms-full.txt`, `lib/city-treatments.ts` |
| Medium | 1,512 redirect rules. Next warns above 1,000 custom routes. | `data/redirects.ts`, `next.config.ts` |
| Medium | Destination pages inline `data/india-states.json` (about 100 KB of GeoJSON). The Kolkata HTML response was about 700 KB. | `components/maps/IndiaCityMap.tsx` |
| Medium | Lint fails: 12 errors, 2 warnings. `setState` in effects in `QuoteForm.tsx`, `Assist.tsx`, and `Header.tsx`. A raw `<a href="/privacy-policy/">` in `QuoteForm.tsx`. `<img>` warnings in `Assist.tsx` and `ServiceIcon.tsx`. | those files |
| Low | README still describes a 24-hour revalidate and an older sitemap list. | `README.md` |
| Low | SearchAction target is `/treatments?q=`, while search is client-side filtering, not a results URL. | `lib/schema.ts` |
| Low | Dev server has logged a hydration mismatch on the home transition and missing React keys. | local terminal |

### Earlier review, checked against this code

| Earlier finding | Status in this tree |
|---|---|
| `ar` / `fr` / `ru` / `bn` indexable with English body copy | Fixed in code. Locales are noindex, omitted from hreflang and the sitemap, and show a “translation in progress” banner. Titles and H1s are still English. |
| ~150 city × department and city × condition pages | Worse in count, better in indexing. 3,320 city × procedure and 180 city × department URLs exist. All are noindex and absent from the sitemap. City hubs still link to the department URLs. `data/city-unique.ts` is empty. |
| Duplicate pairs (slipped disc, epilepsy surgery, aneurysm clipping, brain-tumour surgery, colorectal cancer surgery, liver cancer surgery) | Redirects exist in `data/redirects.ts` and the slipped-disc redirect was confirmed locally. |
| Parkinson’s vs deep brain stimulation, Whipple vs pancreatic surgery, neurology vs neurosurgery, cosmetic vs plastic | Still two indexable URLs each. |
| Cauda equina framed as a trip | The clinical page is now an emergency explanation and hides its own quote. It remains indexable, the global quote/WhatsApp chrome remains, and the cost URL is an indexable price page. |
| One `tel:` with two numbers | Fixed. Local HTML has a single `tel:+916303225006`. The second number is a separate WhatsApp link. |
| Locale CTAs pointing at English URLs | Fixed for `Button` and `next-intl` `Link`. Arabic quote links are `/ar/get-a-free-quote`. |
| Same definition repeated on a condition page | The on-page de-dupe drops an exact sentence repeated on that page. Across pages, the library template and the shared visa/companion/payment FAQs are the same sentence with the name swapped. |
| Identical `lastmod` | Confirmed. See the sitemap table. |

Name-normalised uniqueness, measured on the rendered page model (long sentences, page name replaced, then counted across treatment, cost, country, and city texts):

| Set | Result |
|---|---|
| Pages at or above 60% unique | 17: the 6 Indian cities, 10 country narratives, and cauda equina (87%). Country pages are noindex. |
| Treatment pages | min 0%, median 3%, max 87% (the emergency). One treatment page clears 60%. |
| Cost pages | min 0%, median 0%, max 8%. None clear 60%. |
| Hand-written example | Deep brain stimulation is 31% unique, because the shared filler FAQs dominate once the name is removed. |
| Existing gate | `check-repetition.ts` passed for 1,344 pages. `check-jsonld.ts` passed. Neither checks name-swapped templates, missing reviewers, or banned claims. |

So the build can publish about 1,420 English URLs, and the medical-review rule plus the unique-facts rule would index the city hubs and little else.

## Reuse plan

Extend these. Do not add a second system beside them unless the note says the cluster does not exist.

| Cluster | Extend | Add only after approval |
|---|---|---|
| 1. Specialty hubs | `data/specialties.ts`, `app/[locale]/(site)/treatments/[specialty]/page.tsx` | Neurology should be filled or merged. Do not add a 32nd empty hub. |
| 2. Procedures | `data/procedures/*`, `components/templates/ProcedureArticle.tsx`, `lib/page-model.ts` | Stop generating indexable pages from `library.ts` band profiles. New procedures need their own fields. |
| 3. Conditions | The 183 `kind: "condition"` records and the same template | A `/conditions/[slug]` move is a redirect project, not a new content model. The domain is not deployed, so the URL choice is still cheap. |
| 4. Costs | `data/costs.ts`, `app/[locale]/(site)/cost/[slug]/page.tsx`, `costModel` | Drop the emergency cost URL. Keep one cost URL per procedure that passes the gate. |
| 5. Tests | Nothing clinical exists under `/tests` | New `data/tests.ts` and route, Zod-validated, noindex until reviewed. |
| 6. Technologies | Mentions inside procedure copy only | New `data/technologies.ts` and route. |
| 7. Country hubs | `data/patients/countries/*.json` (the gate) and `data/countries.ts` (the prose). `app/[locale]/(site)/patients-from/[country]/page.tsx` | Pick one record per country. The prose file and the JSON file currently overlap. |
| 8. Country × treatment | `data/patients/publish.ts`, `lib/patient-route-templates/country-child-page.tsx` | The route stays parked until a record passes readiness. |
| 9. Source cities | `data/patients/cities.json`, same parked route | Same gate. Do not build source-city × treatment pages. |
| 10. Indian cities | `data/cities.ts`, `app/[locale]/(site)/destinations/[city]/page.tsx` | Do not turn city × department back on. Add things-to-do only with its own fields. |
| 11. Packages | None | New data file and route. |
| 12. Recovery destinations | None | New data file and route. |
| 13. Comparisons | `data/decision-guides.ts` is the seed for “which option”, not a vs page | New `data/comparisons.ts` and `/compare/[slug]`. |
| 14. Answers | `lib/answers.ts`, `lib/patient-route-templates/answer-page.tsx` | Keep the install-on-approval behaviour in `scripts/readiness.ts`. |
| 15. Glossary | None | New data file and route. Terms under 150 words stay off the sitemap. |
| 16. Guides | `content/blog/*.mdx`, `data/blog.ts`, the blog route | Fix the 60-character title slice before adding posts. A `/guides` prefix would be a new route and needs redirects from `/blog` if it replaces it. |
| 17. Tools | `components/sections/CostEstimator.tsx` on the quote page | New `/tools/[tool]` routes. Pass a small options list into the client. Do not import `procedures` into a client component. |
| 18. Patient stories | `Procedure.journeys` exists and is empty | No route until a consented record exists. |
| 19. Trust | about, editorial policy, medical disclaimer, privacy, terms, review-team page | Reviewer profiles and “how we’re paid” are already marked `TODO(client)` on the about and review-team pages. Extend those pages. |

Shared machinery to extend, not replace:

- Metadata: `lib/seo.ts` `pageMetadata`. Teach it to read a quality-gate result.
- Schema: `lib/schema.ts`.
- Sitemaps: the current XML routes. Moving to `app/sitemap.ts` and `generateSitemaps()` is a later cleanup, not a requirement for the first fix wave.
- Uniqueness: `scripts/check-repetition.ts`. It needs a name-normalised check. A second `scripts/quality-gate.ts` should wait until this script’s gap is agreed.
- i18n: keep `next-intl` and the `translated` flags.
- Quotes: keep the API route.

## Migration map

No URL in the list below should disappear without a 301 or an explicit 410. Nothing has been changed in this phase.

### Already redirected (keep)

`data/redirects.ts` already 301s these, including locale copies:

- `/treatments/spine-surgery/slipped-disc` → lumbar disc herniation
- `/treatments/neurosurgery/epilepsy-surgery` → epilepsy treatment
- `/treatments/neurosurgery/aneurysm-clipping` → brain aneurysm treatment
- `/treatments/neurology/brain-tumour-surgery` → `/treatments/neurosurgery/brain-tumour-treatment`
- colorectal, pancreatic, and liver cancer surgery URLs → the surviving procedure or cost URL
- short `/{slug}` and `/cost/{id}` aliases → the canonical treatment or cost path
- city aliases such as `/destinations/delhi-ncr` and `/destinations/new-delhi` → `/destinations/delhi`
- `/home`, `/doctors`, `/hospitals`, `/quote` → `/`, `/about`, `/why-india`, `/get-a-free-quote`

`/en/...` is generated and the `next-intl` proxy redirects it to the unprefixed English URL. Confirmed locally for `/en`, `/en/about`, and `/en/treatments/cardiology`.

### Already noindex (keep until a record passes)

- All `ar`, `fr`, `ru`, and `bn` URLs.
- All 10 `/patients-from/{country}` pages.
- All city × procedure and city × department URLs.
- Country × treatment, source-city, and answer URLs are not routed, so there is nothing to redirect yet.

### Keep the URL, stop indexing until the gate and a reviewer pass

Recommended for Phase 1, not done here:

- All 594 library clinical URLs and their `/cost/...-cost-in-india` twins.
- Hand-written clinical URLs whose name-normalised uniqueness is under 60% (deep brain stimulation is 31%).
- The empty `/treatments/neurology` hub, unless it receives its own guides in the same change.

They should stay reachable, with `robots: noindex, follow`, and drop out of the sitemap. Deleting them would need a 301 to the surviving hub.

### Needs a decision before any redirect

| Pair | Recommendation to approve |
|---|---|
| `/cost/cauda-equina-syndrome-cost-in-india` | 301 to the emergency clinical page, or 410. It should not be a price URL. |
| Parkinson’s page and deep brain stimulation | Keep both only if each page answers a different question with its own facts. Today the Parkinson’s page does not. |
| Whipple and pancreatic surgery | Choose one canonical query in the keyword map, then 301 the other. |
| Neurology hub and neurosurgery hub | 301 neurology to neurosurgery, or give neurology its own non-surgical guides and a different H1. |
| Cosmetic hub and plastic hub | Keep both only with an explicit aesthetic vs reconstructive split. Otherwise 301 one to the other. |
| City × department URLs | 301 each to `/treatments/{specialty}` or to the city hub, and remove the links from the city template. Leaving them as noindex still lets the city hub point at doorway URLs. |
| City × procedure URLs | 301 each to `/treatments/{specialty}/{procedure}`. They are already noindex. |
| `/blog/{slug}` vs a future `/guides/{slug}` | Stay on `/blog` until a keyword map says otherwise. |

### Do not build

Country × Indian city × treatment, source city × treatment, “best hospital in X”, and keyword-variant cost URLs. The current city × department and city × procedure routes are the ones to retire, not to expand.

## Build health

| Check | Result |
|---|---|
| `npm run lint` | Failed. 12 errors, 2 warnings. Listed above. |
| `npx tsc --noEmit` | Passed. |
| `scripts/check-repetition.ts` | Passed for 1,344 pages. The check does not catch name-swapped templates. |
| `scripts/check-jsonld.ts` | Passed. It samples one procedure, one condition, and one emergency, and it rejects Review, AggregateRating, HowTo, and speakable. |
| `npx next build` | Passed. 26,024 static pages in 3.9 minutes. Compile 4.5 seconds. Typecheck 4.2 seconds. Wall clock about 5.1 minutes. Next warned that 1,512 redirects exceed the 1,000 custom-route hint. |
| First Load JS | 677–695 KB uncompressed on content pages, 1,156 KB on the quote page. |
| Production host | Not deployed. |

Next.js 16.4.3 also reported a known security advisory during an earlier build attempt and asked for an upgrade. The project build was retried and completed. No upgrade was applied, because this phase is read-only.

## Risks and open questions

1. Publishing the current sitemap would put roughly 1,300 template URLs into an index that has no reviewer and no deployment history. The demotion risk is the library that already exists.
2. The domain is down. There is no Search Console export, no live hreflang set, and no backlink equity to preserve. That makes a URL change cheaper now than after launch, and it also means we cannot prove which old URLs Google already knows.
3. Who is the named reviewer, and what is their registration number? The review-team page is a placeholder. No clinical URL should be indexed before that exists.
4. Which file is the country source of truth, `data/countries.ts` or `data/patients/countries/*.json`?
5. Are the band-profile USD figures allowed to stay on noindex drafts, or should they be removed until a sourced quote exists?
6. What is the source for “up to 80% less”? If there is no source, the H1 should change before launch.
7. Will Arabic, French, Russian, and Bengali ever be human-translated, or should those locales stay as a noindex language switch only? Swahili, Amharic, Uzbek, Dari, and Portuguese are not locales yet.
8. The keyword map, quote-form exports, and Search Console queries are not in the repo. Phase 1 cannot fill `/data/keyword-map.csv` from real questions until those are supplied.
9. Quote delivery, Turnstile, and analytics IDs are environment variables. They were not inspected. A launch without `RESEND_API_KEY` or `LEAD_WEBHOOK_URL` accepts the form in development and fails it in production.
10. Restart the local dev server after this audit. The production build wrote into `.next` while `npm run dev` was running.

## Stop

Phase 0 is complete. No templates, redirects, noindex rules, or content were changed. Later phases should follow the reuse plan above unless you approve a different direction.

Would you like me to run the Next.js security upgrade in the background in a separate Git worktree? I can use the current checkout if you prefer.
