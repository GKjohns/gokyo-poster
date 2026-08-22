# Gentle Way launch: domain, brand assets, SEO package (Aug 21, 2026)

Kyle bought `gentleway.ink` (judo = 柔道 = "the gentle way") to ship the Gokyo no Waza poster as an official Monument Labs product. This folder holds the launch plan: Vercel domain wiring (done 2026-08-21), GoDaddy DNS (Kyle, manual, 2FA), the logomark decision, the full Monument Labs product SEO package (head/meta/JSON-LD/sitemap/robots/llms.txt, favicon set, OG cards), per-throw indexable pages, and the monumentlabs.io listing.

## Files

| File | What it is |
|---|---|
| `implementation_plan.md` | The plan: Sprint 0 (mark + Kyle's DNS/GSC/analytics toggles), 1 (brand assets + static files), 2 (head, JSON-LD, `/throws/[id]`, error page, redirects, one push), 3 (Monument Labs site listing), 4 (launch checks, docs, verification artifact). Two fresh-eyes review passes baked in. |
| `logo-options-gentleway.html` / `.png` | Logo options gallery (8 concepts, house style). Option 7, the belt knot, was chosen; a tighter-radius "shipped" variant card was added. |
| `verification/index.html` | The verification artifact: what was built, sprint-by-sprint screenshots with captions, key server-HTML / JSON-LD / sitemap / curl samples, end-to-end run-through, deviations. Sprint 4 section lists what gets checked once prod is live. |
| `verification/screenshots/` | 11 webp: `sprint1_og_card`, `sprint1_icon_512`, `sprint2_index_desktop`, `sprint2_index_footer`, `sprint2_index_modal`, `sprint2_throw_desktop`, `sprint2_throw_mobile`, `sprint2_error_404`, `sprint3_ml_tiles_light`, `sprint3_ml_tiles_dark`, `sprint3_ml_footer`. |
| `verification/samples/` | `index_head.html` / `tai-otoshi_head.html` (prerendered server HTML), `index_ld.json` / `tai-otoshi_ld.json` (parsed JSON-LD), `sitemap.xml` (41 URLs, 160 images), `curl_status.txt` (local Nitro preview status table), `monumentlabs_jsonld.json` (ML site `@graph` with the Gentle Way Product + Organization `@id`). |

## Headline decisions

- Mark: option 7, belt knot (band + knot + two tails), ink `#1c1a17`, tighter radius than the gallery. Lives at `src/public/favicon.svg`; `src/app/components/AppLogo.vue` is the `currentColor` Vue version.
- Brand hierarchy: "Gentle Way" brand row above the poster; 五教の技 / Gokyo no Waza stays the `<h1>` (flip if Kyle prefers).
- Per-throw pages at `/throws/[id]` are the one real scope expansion, and the biggest SEO win (25k words of prose otherwise hidden in a modal).
- JSON-LD uses the global Monument Labs Organization id `https://monumentlabs.io/#org` (not a site-local one).

## Outcome

Sprints 0–3 complete locally on 2026-08-21 (see the plan's per-sprint Deviations blocks for the routine calls made): belt-knot mark + full asset set, `site.webmanifest` / `robots.txt` / `llms.txt`, SEO head + JSON-LD on `/` and on 40 prerendered `/throws/[id]` pages, sitemap (41 URLs, 160 images), error page, `vercel.json` redirects, footer attribution, and the Monument Labs site tile / Product node / footer link / clipart. Typecheck, lint and build green; server HTML, sitemap and status codes verified against a local Nitro preview; browser flows screenshotted.

Not yet done: nothing is committed or pushed (gokyo-poster and MonumentLabsSite both gated on Kyle's go); Kyle's GoDaddy DNS, GSC TXT and Vercel Analytics toggle are pending; Sprint 4's prod checks (4.1–4.4) run after the push and DNS cutover. Vercel side was already complete (`gentleway.ink` primary, `www` 308 → apex, both verified). Docs (4.5) and the verification artifact (4.7) are written.
