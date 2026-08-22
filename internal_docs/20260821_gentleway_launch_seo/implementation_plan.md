# Gentle Way Launch: Domain, Brand Assets, SEO Package — Implementation Plan

**Created:** August 21, 2026
**Status:** Approved by Kyle 2026-08-21. Sprints 0 (except Kyle's DNS/GSC/analytics toggles), 1, 2 and 3 complete (2 and 3 with deviations noted in-section); nothing committed or deployed yet. Sprint 4: docs (4.5) and verification artifact (4.7) done 2026-08-21; 4.1–4.4 pending prod deploy/DNS.
**Context:** Kyle bought `gentleway.ink` (judo = 柔道 = "the gentle way") to host the Gokyo no Waza poster as an official Monument Labs product. Today the deployed app (`gokyo-poster.vercel.app`) has a bare Nuxt UI starter head: a `<title>`, one `description` meta, the starter `favicon.ico`, no OG/Twitter tags, no canonical, no JSON-LD, no sitemap/robots, no mark, and no Monument Labs attribution. The 40 throws' real content (mechanic / analogy / why-it-maps prose, ~25k words) only renders inside a modal after a click, so crawlers never see it.
**Goal:** `https://gentleway.ink` serves the poster with the full Monument Labs product SEO package (matching Camera Shy / cosmo / Clean Markdown), a real mark + favicon set + OG card, per-throw indexable pages, and is listed on monumentlabs.io like the other products.
**Scope:** Domain + DNS, brand mark + static asset set, head/meta/JSON-LD/sitemap/robots/llms.txt, per-throw routes (`/throws/[id]`), footer attribution, Monument Labs site listing, launch verification, docs sync. No content changes to the 40 analogies, no design restyle beyond the header brand row, footer line, and the new throw page (which reuses the modal's layout).

> **The one scope call Kyle is approving:** the per-throw pages (Sprint 2, tasks 2.9–2.14). Everything else is the standard package. Without them the 25k words stay invisible to search and the sitemap module is overkill (a static 1-URL `sitemap.xml` would do). With them, Gentle Way has 41 indexable URLs and 80 unique images for Google Images. Recommendation: do it; it's ~3 h and the modal's layout promotes to a page almost verbatim.

---

## Handoff / Execution Notes (read first — this plan is self-contained)

- **Repo & runtime.** Repo root `~/Programming/Workspace/gokyo-poster` is the image pipeline (`data/`, `images/`, `scripts/`, review HTML). The deployed Nuxt 4.5 + Nuxt UI 4.10 app lives in **`src/`** (no root `package.json`). Commands, all from `src/`: `npm install`, `npm run dev` (http://localhost:3000), `npx nuxi typecheck`, `npm run lint`, `npm run build`, `npm run data` (rebuild `app/assets/gokyo.json` from `../data`), `npm run images` (regenerate webp derivatives). No test suite. Node 22+ locally (`nvm use 22`), Vercel builds on Node 24.
- **Deploy.** Vercel project `gkjohns-projects/gokyo-poster` (`prj_3n2kND1UqUofDfU1uMkzOXwwSGVb`, team `team_KHp64cz7yPmg0MTiJdbsgNL3`), Root Directory `src`, framework Nuxt. Root `.vercelignore` excludes `internal_docs images data scripts .playwright-mcp *.html build.mjs *.md`; bare `scripts` also excludes `src/scripts/`, which is fine: every script there (`build-data.mjs`, `build-images.mjs`, and the new `build-og.mjs`) runs locally and its outputs are committed under `src/public/`. Domains `gentleway.ink` (primary) and `www.gentleway.ink` (308 → apex) are **already attached and verified** on the project (2026-08-21, via CLI + REST). DNS at GoDaddy is Kyle's manual step (2FA) — Sprint 0.3.
- **Conventions to match.** The Monument Labs product SEO pattern: `~/claude-ops/conventions/project_bootstrap.md` §"Reference: the SEO head + brand asset set". Reference implementations: `~/Programming/Workspace/cosmo/src/app/utils/site.ts` + `app/app.vue` + `nuxt.config.ts` + `app/pages/index.vue` (newest shape — use this), `~/Programming/Workspace/camera_shy/src/` (public assets, `llms.txt`, footer "Built by Monument Labs"), `~/Programming/Workspace/clean-markdown/src/nuxt.config.ts:78-166` (best JSON-LD for a free no-login tool: `WebApplication` + `isAccessibleForFree` + global Organization `@id`). Design tokens live in `src/app/assets/css/main.css` (`--color-paper #faf8f4`, `--color-ink #1c1a17`, `--color-inkmuted #6b6459`, `--color-seal #a33b2e` = `--ui-primary`, `--color-hairline #e5dfd4`; display font Iowan Old Style/Palatino/Georgia; kanji font Hiragino Mincho/Yu Mincho/Noto Serif JP — system fonts, nothing loaded). Tailwind 4 utilities (`text-ink`, `bg-seal`, `border-hairline`, `font-display`, `font-kanji`). **Displayed copy uses no em dashes** (commit `34db7fd` purged them deliberately) — same rule for the meta description, OG tagline, alt text.
- **Data contract (must not change).** `src/app/assets/gokyo.json` = `{ groups: Group[] }`; `Group { id, name, kanji, meaning, techniques: Technique[] }`; `Technique { id (slug, e.g. "tai-otoshi"), romaji, kanji, english, mechanic, analogy_name, analogy, why_it_maps, image_prompt }` (`src/app/types.ts`). Images: `src/public/img/throws/{id}.webp` (640²) and `{id}-lg.webp` (1024²), same under `img/analogies/`. Group and technique order in the JSON are canonical (1920 Kodokan Gokyo).
- **Execution order.** Sprint 0 done except Kyle's DNS/GSC/analytics toggles (independent, can land any time). Sprint 1 (assets) → Sprint 2 (all code, one push) are sequential (2 references the assets). Sprint 3 (MonumentLabsSite) is a different repo; parallel with 1–2. Sprint 4 (launch checks, docs, artifact) last, after DNS resolves. Per-sprint loop: `npx nuxi typecheck` + `npm run lint` + `npm run build` green → verify **server HTML** (`curl`/`.output/public/**/index.html`, not post-hydration DOM) → Playwright screenshots → update this file → report. Phase 5 verification artifact (`verification/index.html` + webp screenshots) required before reporting done.
- **Commit/push policy.** Don't commit or push unless Kyle asks (`acp`). MonumentLabsSite edits are a separate commit in that repo, also gated on Kyle's go.

---

## Current State

### What Exists
- `src/nuxt.config.ts:9-16` — the entire SEO surface: `title: 'Gokyo no Waza'`, `lang: 'en'`, one `description` meta (contains an em dash). No `app.head.link` block.
- `src/app/app.vue` — `<UApp><NuxtPage/></UApp>`; no `useHead`/`useSeoMeta` anywhere.
- `src/app/pages/index.vue` — the only route. Header (五教の技 / `<h1>Gokyo no Waza</h1>` / tagline / seal dot), 5 group sections × 8 `ThrowCard`, footer (provenance + GitHub link), `ThrowDetail` modal.
- `src/app/components/ThrowCard.vue` — a single `<button>` wrapping image + caption; emits `flip`/`open`. `ThrowDetail.vue` — `UModal` (unmounts when closed, so its prose is never in server HTML). No `error.vue`.
- `src/public/favicon.ico` — starter icon. `src/public/img/` — 160 webp. **New (Sprint 0): `src/public/favicon.svg`, `src/app/components/AppLogo.vue`.**
- SSR on, no prerendering; Vercel serves via serverless function. Grid labels are in server HTML; modal prose is not.
- Vercel: domains attached + verified, www→apex 308 set (done).
- Monument Labs site lists products in three places kept in step: `MonumentLabsSite/nuxt-app/app/components/ProductsSection.vue:86-153` (tiles), `nuxt-app/nuxt.config.ts:193-230` (`makesOffer` Product nodes; descriptions must equal tile taglines), `nuxt-app/app/layouts/default.vue:214-248` (footer "Our Products"). Precedent commits: `afd9ebd`, `268eef5`. Tile images: 1024² black-line-on-white WebP at `nuxt-app/public/img/clipart/product-*.webp`, generated via `assets/clipart/scripts/variants.mjs` + `generate.mjs` (`assets/clipart/README.md`).

### What Changes
- Static asset set via `brand-assets` skill + `site.webmanifest`, `robots.txt`, `llms.txt`, `og-image.png`, 40 per-throw OG JPEGs.
- `app/utils/site.ts`, `app/app.vue` (canonical + head + seo meta), `nuxt.config.ts` (icon links, `site`, `@nuxtjs/sitemap`, `@vercel/analytics/nuxt`, prerender), JSON-LD `@graph` on `/` and per throw, `error.vue`, `vercel.json`.
- Header brand row + footer attribution; `ThrowCard` becomes a link; `/throws/[id]` pages.
- Monument Labs site: tile, Product node, footer link, clipart; Organization `@id` fix.
- Docs: root README, `src/README.md`, plan README, `STATE.md`, `CLAUDE.md` row, conventions note.

### What Stays
- All 40 analogies, images, the hover/flip/modal interaction, palette, fonts, ordering. Root pipeline untouched. No auth, no DB, no env vars.

---

## Storyboard

No new Nuxt UI screens; the UI delta is a brand row in the header, a footer line, and `/throws/[id]`, which is `ThrowDetail`'s pair-plus-prose layout promoted to a page (left: 1024² throw; right: 1024² analogy; below: Mechanic / Analogy / Why it maps; prev/next). The logo gallery (`logo-options-gentleway.html`, option 7 chosen) was the visual review surface for the mark.

---

## Sprint Breakdown

### Sprint 0: Mark + Kyle's manual toggles [Complete except Kyle items]
**Decision (2026-08-21):** Kyle picked **option 7, the belt knot** (obi reduced to band + knot + two tails), with a **tighter border radius** than the gallery render. Mark ships in ink `#1c1a17` (a black belt); seal red stays the accent for the OG URL block/rule. Flip to seal fill later if the black knot reads too heavy in the tab.

- 0.1 ✅ Gallery: `logo-options-gentleway.html` / `.png` (8 concepts; option 7 marked chosen, shipped variant card added).
- 0.2 ✅ Delivered `src/public/favicon.svg` (64×64 viewBox, 4 filled rects, `rx` 1/1.25/1 vs gallery 2/3/2, fill `#1c1a17`, concept comment at top) and `src/app/components/AppLogo.vue` (`currentColor`, props `size`=28, `wordmark`=true, `font-display` wordmark). Not yet wired into the head/header (Sprint 2).
- 0.3 **Kyle (manual, 2FA) — GoDaddy DNS for gentleway.ink:** delete `A @ Parked` (or edit its Data to `216.150.1.1`), delete `CNAME www → gentleway.ink.`; add `A @ 216.150.1.1` TTL 600 and `CNAME www → 7fe738d5defe2fc1.vercel-dns-016.com`. Leave NS, SOA, `_domainconnect`, `_dmarc` TXT alone. Alternates if GoDaddy rejects: A `216.150.16.1` / `76.76.21.21`; CNAME `cname.vercel-dns.com`. No `_vercel` TXT needed. *(In progress as of 2026-08-21 evening.)*
- 0.4 **Kyle:** while in GoDaddy, add the Google Search Console DNS TXT for the `gentleway.ink` Domain property (one trip; submit `https://gentleway.ink/sitemap.xml` after Sprint 2 deploys).
- 0.5 **Kyle:** Vercel dashboard → project `gokyo-poster` → Analytics → Enable Web Analytics (`@vercel/analytics/nuxt` 404s its script until this is on).

#### Verification
- [x] `favicon.svg` reads as a belt knot at 16 px (checked: `scratchpad/favicon-check.png`).
- [ ] `dig +short gentleway.ink` → `216.150.1.1`; `dig +short www.gentleway.ink` → the CNAME; `vercel domains inspect gentleway.ink` → configured; cert issued.

---

### Sprint 1: Brand assets + static SEO files [Complete]
**Goal:** the canon static asset set exists in `src/public/` and reads as the same product as the live page.
**Estimated effort:** 1 h

#### Tasks
- 1.1 Run the `brand-assets` skill (`~/.claude/skills/brand-assets/SKILL.md`; it ships its own Playwright, no project install) from `src/`:
  ```
  node ~/.claude/skills/brand-assets/regenerate.mjs \
    --source public/favicon.svg --out public \
    --brand-name "Gentle Way" \
    --tagline "The forty throws of Kodokan judo, and the everyday physics that explain them." \
    --style serif --font-family "Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif" \
    --accent "#a33b2e" --bg "#faf8f4" --ink "#1c1a17" --ink-soft "#6b6459" --ink-muted "#6b6459" --rule "#e5dfd4" \
    --footer-primary "gentleway.ink" --footer-secondary "Monument Labs, Richmond, Virginia"
  ```
  Produces `favicon.ico` (16/32/48, replaces the starter), `favicon-96.png`, `apple-touch-icon.png` (180², solid paper bg), `icon-192-maskable.png`, `icon-512-maskable.png`, `og-image.png` (1200×630 house layout: mark + wordmark centered, tagline, URL block bottom-right). If the tagline overflows, shorten to "Forty judo throws, explained with everyday physics." rather than auto-wrap. `--font-family` matters: the site uses system serifs and the OG renders on Kyle's Mac, so the card will match the live page.
  - Considered and rejected for the site-wide card: a throw/analogy diptych. Off the house pattern (no hero images on any Monument Labs card). The diptych idea lives on as the *per-throw* OG (2.13).
- 1.2 `src/public/site.webmanifest` — mirror `camera_shy/src/public/site.webmanifest`: `name`/`short_name` "Gentle Way", `description` = SITE.description, `start_url: "/"`, `scope: "/"`, `display: "standalone"`, `background_color: "#faf8f4"`, `theme_color: "#faf8f4"`, `icons`: two maskable PNGs (`purpose: "maskable"`) + `favicon-96.png` + `favicon.svg` (`any`).
- 1.3 `src/public/robots.txt` — clean-markdown shape: `User-agent: *` / `Allow: /`; explicit `Allow: /` blocks for `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-Web`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`; `Sitemap: https://gentleway.ink/sitemap.xml`.
- 1.4 `src/public/llms.txt` — camera_shy template: `# Gentle Way`, blockquote one-paragraph description (40 throws × 5 kyo, throw + everyday-physics analogy, sumi-e), prose paragraph including *"It is built and operated by Monument Labs LLC, an AI consultancy and product studio in Richmond, Virginia."*, `## Pages` (`https://gentleway.ink/`, the `/throws/{id}` pattern with 2–3 examples, GitHub repo), `## Notes` (free, no login; images are AI-generated sumi-e renderings; analogies are original).

#### Verification
- [x] Six asset files at canon names with right sizes (`sips`: 96², 180², 192², 512², 1200×630; `favicon.ico` 16/32/48); `og-image.png` legible, no overflow, Iowan Old Style serif rendered, seal-red URL block bottom-right, paper bg; `icon-512-maskable.png` mark centered in inner 80 % (screenshots: `verification/screenshots/sprint1_og_card.webp`, `sprint1_icon_512.webp`).
- [x] `site.webmanifest` parses as JSON; `robots.txt`/`llms.txt`/`site.webmanifest` contain no em dashes.

#### Deviations (2026-08-21)
- OG tagline: the long tagline did not trigger the script's overflow warning but auto-wrapped to two lines (orphan "them."), so per 1.1 the card was re-rendered with the short tagline **"Forty judo throws, explained with everyday physics."** The long tagline ("The forty throws of Kodokan judo, and the everyday physics that explain them.") is unchanged everywhere else (`llms.txt`, Sprint 2 copy).
- `favicon.ico` overwrote the starter icon (now the belt knot, 16/32/48). Mark reads as solid ink at 512; slightly below optical center but within the maskable safe zone. No SVG changes.

---

### Sprint 2: Head, JSON-LD, brand row, footer, `/throws/[id]`, error page, redirects — one push [Complete with deviations]
**Goal:** `/` and 40 `/throws/[id]` pages ship prerendered with the full Monument Labs SEO head + JSON-LD; "Gentle Way" visible as the brand; Monument Labs attributed; duplicates redirected.
**Estimated effort:** 5 h

#### Tasks — site-wide
- 2.1 `src/app/utils/site.ts` (new; cosmo shape, trimmed):
  ```ts
  export const SITE = {
    name: 'Gentle Way',
    description: 'An interactive poster of the Gokyo no Waza, the forty throws of Kodokan judo, each drawn in sumi-e ink and paired with an everyday scene that makes the mechanics click.', // ≤160 chars, no em dash; used for meta, og, manifest, JSON-LD
    url: 'https://gentleway.ink',          // no trailing slash
    github: 'https://github.com/GKjohns/gokyo-poster',
    launched: '2026-08-22',                  // datePublished for JSON-LD
    org: { id: 'https://monumentlabs.io/#org', name: 'Monument Labs', url: 'https://monumentlabs.io', logo: 'https://www.monumentlabs.io/og-image-monument.png', sameAs: ['https://www.linkedin.com/company/106072838'] }
  } as const
  ```
  Check the description length when writing it (target 150–160); one field, used everywhere.
- 2.2 `src/app/app.vue` — per `cosmo/src/app/app.vue:13-46`: `canonical = computed(() => route.path === '/' ? SITE.url : SITE.url + route.path.replace(/\/$/, ''))`; `useHead({ htmlAttrs: { lang: 'en' }, meta: [charset, viewport, { key: 'theme-color', name: 'theme-color', content: '#faf8f4' }], link: [{ rel: 'canonical', href: canonical }] })`; `useSeoMeta({ title: SITE.name, titleTemplate: '%s · Gentle Way', description: SITE.description, ogTitle, ogDescription, ogType: 'website', ogSiteName, ogUrl: canonical, ogImage: `${SITE.url}/og-image.png`, ogImageWidth: 1200, ogImageHeight: 630, ogImageType: 'image/png', ogImageAlt: 'Gentle Way: the forty throws of Kodokan judo', ogLocale: 'en_US', twitterCard: 'summary_large_image' })`. Canonical lives here, not in `nuxt.config.ts`. `theme-color` static (`colorMode: false`).
- 2.3 `src/nuxt.config.ts`:
  - Remove `app.head.title/meta`; **add** `app.head.link` with exactly four icon links: `favicon.ico` (`sizes: 48x48`), `favicon.svg` (`type: image/svg+xml`), `apple-touch-icon.png` (`sizes: 180x180`), `manifest` → `/site.webmanifest`, plus the fleet comment about not duplicating icons in `app.vue`.
  - `import { SITE } from './app/utils/site'`; `site: { url: SITE.url, name: SITE.name }`.
  - Modules: `@nuxtjs/sitemap` (^8.3.4) and `@vercel/analytics/nuxt` (`npm i @nuxtjs/sitemap @vercel/analytics`).
  - `nitro: { prerender: { crawlLinks: true, routes: ['/', '/sitemap.xml'] } }` — `crawlLinks` from `/` discovers all 40 throw links; `/sitemap.xml` in `routes` makes the sitemap module prerender. (No `routeRules '/**': prerender` — Nitro ignores wildcard prerender rules for enumeration; redundant.) Unknown `/throws/x` still SSRs through the server function → `createError` 404.
  - `eslint` block unchanged.
- 2.4 `src/app/error.vue` (new; cosmo/camera_shy have one) — paper/ink, `<h1>` with the status ("Throw not found" / "Something slipped"), one line, `AppLogo` link home. `useSeoMeta({ title: 'Not found', robots: 'noindex' })`.
- 2.5 `src/vercel.json` (new; Root Directory is `src`, so it lives there): `{ "trailingSlash": false, "redirects": [{ "source": "/(.*)", "has": [{ "type": "host", "value": "gokyo-poster.vercel.app" }], "destination": "https://gentleway.ink/$1", "permanent": true }] }`. Verify on a preview deploy that Vercel honors it alongside Nitro's Build Output (it should: project-level `redirects` apply before the build output's routes). If it doesn't, fall back to canonical + GSC and note it here. Deployment preview URLs (`*-gkjohns-projects.vercel.app`) are unaffected by the host match.
- 2.6 `src/app/components/AppFooter.vue` (new; extract from `pages/index.vue:63-73` so `/` and `/throws/[id]` share it): provenance line unchanged; second line `Built by Monument Labs` → `https://monumentlabs.io` (`rel="noopener"`) `·` `Source on GitHub` → SITE.github, in the page's existing `underline underline-offset-2 hover:text-seal` anchor style.
- 2.7 `src/app/pages/index.vue` header: add a slim brand row at the top of `<header>`: `<AppLogo>` (linked to `/`) and the etymology line `柔道 · jūdō · the gentle way` in `text-xs uppercase tracking-widest text-inkmuted` (kanji in `font-kanji`), centered like the rest. Keep 五教の技 / `<h1>Gokyo no Waza</h1>` / tagline / seal dot as-is. Index head: `useHead({ titleTemplate: null })` + `useSeoMeta({ title: 'Gentle Way · Gokyo no Waza, the forty throws of Kodokan judo' })` (cosmo pattern; avoids "Gentle Way · Gentle Way").
- 2.8 JSON-LD on `/` — `useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(graph) }] })` in `pages/index.vue`; `@graph`:
  - `Organization` `{ '@id': SITE.org.id, name, url, logo, sameAs }` (global id; NOT `${SITE.url}/#org`).
  - `WebSite` `{ '@id': SITE.url + '/#website', url, name, description, publisher: { '@id': org }, inLanguage: 'en' }`.
  - `WebApplication` `{ '@id': SITE.url + '/#app', name, url, applicationCategory: 'EducationalApplication', applicationSubCategory: 'Interactive poster', operatingSystem: 'Any', browserRequirements: 'Requires JavaScript', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, image: `${SITE.url}/og-image.png`, description, datePublished: SITE.launched, about: { '@type': 'Thing', name: 'Gokyo no Waza', alternateName: '五教の技', sameAs: 'https://en.wikipedia.org/wiki/Gokyo_(judo)' }, featureList: [5 short strings], publisher: { '@id': org }, creator: { '@id': org } }`.
  - `ItemList` `{ '@id': SITE.url + '/#gokyo', name: 'Gokyo no Waza', numberOfItems: 40, itemListOrder: 'ItemListOrderAscending', itemListElement: 40 × { '@type': 'ListItem', position, name: romaji, url: `${SITE.url}/throws/${id}` } }` built from the data at render time.

#### Tasks — per-throw pages
- 2.9 `src/app/utils/gokyo.ts` (new, tiny): import `~/assets/gokyo.json`; export `groups`, `techniques` (flat, each with its `group`), `findTechnique(id)`, `neighbors(id)` (prev/next, wrapping). `pages/index.vue` imports `groups` from here (no behavior change).
- 2.10 `src/app/pages/throws/[id].vue` (new). `const t = findTechnique(route.params.id as string)`; `if (!t) throw createError({ statusCode: 404, statusMessage: 'Throw not found', fatal: true })`. Layout in the poster's style: `AppLogo` back link to `/` top-left; `<h1>` romaji with kanji beside it (`font-kanji`), english below; group line (`第X教 · Dai Xkyo`); the pair side-by-side, each `<img>` with `srcset="/img/throws/{id}.webp 640w, /img/throws/{id}-lg.webp 1024w" sizes="(min-width: 640px) 50vw, 100vw"`, `width/height` 1024, first `loading="eager" fetchpriority="high"`, second `loading="lazy"`; captions "the throw" / `analogy_name`; three prose sections **Mechanic / Analogy / Why it maps** as `<h2>` + plain `<p>` (this is the SEO payload — it must be in server HTML); prev/next `NuxtLink`s (romaji labels, wrapping); `<AppFooter>`.
  - Alt text: throw `"${romaji} (${english}), sumi-e ink drawing of the judo throw"`; analogy `"${analogy_name}: the everyday analogy for ${romaji}"`. Apply the same two strings in `ThrowCard.vue` (replaces `"${romaji}: the throw"` and bare `analogy_name`).
- 2.11 Per-page head in `[id].vue`: `useSeoMeta({ title: `${t.romaji} (${t.kanji}) · ${t.english}`, description: first sentence(s) of `t.mechanic` trimmed to ≤155 chars, ogTitle, ogDescription, ogType: 'website', ogImage: `${SITE.url}/og/${t.id}.jpg`, ogImageWidth: 1200, ogImageHeight: 630, ogImageType: 'image/jpeg', ogImageAlt: `${t.romaji}: the throw and its everyday analogy`, twitterCard: 'summary_large_image' })`. Canonical and `· Gentle Way` suffix come from `app.vue`.
- 2.12 JSON-LD per page: `@graph` = `WebPage { '@id': url, url, name, description, isPartOf: { '@id': SITE.url + '/#website' }, datePublished: SITE.launched, primaryImageOfPage: ImageObject(throw), image: [ImageObject(throw), ImageObject(analogy)], about: { '@type': 'Thing', name: romaji, alternateName: [kanji, english], description: mechanic }, publisher/creator: { '@id': org }, inLanguage: 'en' }` where `ImageObject = { '@type': 'ImageObject', contentUrl: absolute -lg.webp, width: 1024, height: 1024, caption: alt, creator: { '@id': org }, creditText: 'Monument Labs', description: 'AI-generated sumi-e rendering' }`. No BreadcrumbList (fragment crumbs aren't pages; Home→throw adds nothing). No `license` until Kyle picks one (Open Question 2).
- 2.13 Per-throw OG JPEGs: `src/scripts/build-og.mjs` (local, like `build-images.mjs`; uses the existing `sharp` devDependency): for each technique composite `public/og/{id}.jpg` 1200×630 — paper `#faf8f4` bg, throw 1024² scaled to ~540² at left, analogy at right, thin hairline between, no text (fonts aren't embeddable in sharp without extra work; the OG title/description carry the words). JPEG q82, ~60–90 KB each. Add `"og": "node scripts/build-og.mjs"` to `src/package.json` scripts; commit the 40 outputs. **Fallback if this drags past 30 min:** point throw pages' `ogImage` at the house `og-image.png` and move 2.13 to Deferred.
- 2.14 `ThrowCard.vue:33-71` — the card is a `<button>`; an `<a>` inside it is invalid. Restructure: the root becomes `<NuxtLink :to="`/throws/${technique.id}`" @click.prevent="onClick" :aria-label="…">` wrapping image block + caption. Crawlers and cmd/middle-click get the page; plain click keeps today's flip/modal behavior; touch unchanged. In `ThrowDetail.vue` add a footer link "Open page →" to `/throws/${id}` (share/escape hatch).
- 2.15 `src/README.md` (still the upstream Nuxt UI starter README): title "Gentle Way", one paragraph, dev/build/data/images/og commands, link to root README.

#### Verification (2026-08-21, local)
- [x] `npx nuxi typecheck`, `npm run lint`, `npm run build` green; build log: `Prerendered 84 routes` = `/` + 40 `/throws/*` + `/sitemap.xml` (+ `__sitemap__/style.xsl` and the per-route `_payload.json`s). Build log saved nowhere; route list re-checkable via `ls .output/public/throws | wc -l` (40).
- [x] **Server HTML** (`.output/public/index.html`, `.output/public/throws/tai-otoshi/index.html`; dumps in `verification/samples/`): canonical absolute (`https://gentleway.ink`, `.../throws/tai-otoshi`), exactly one `meta[name=description]`, one ld+json that `JSON.parse`s (4 nodes + 40 `ListItem`s on `/`; `WebPage` + 2 `ImageObject`s on the throw page), og:image absolute (`/og-image.png`, `/og/tai-otoshi.jpg`), one icon link set (4 links), zero `—` in all 41 pages, throw page contains the `mechanic` text under `<h2>Mechanic</h2>`. All 40 throw descriptions ≤155 chars.
- [x] `/sitemap.xml` (Nitro preview on :3100): 41 `<url>`/`<loc>`s, no trailing-slash variants, `<image:image>` present: 160 total (80 on `/` from the grid, 2 per throw page), no `<lastmod>`. `/robots.txt`, `/llms.txt`, `/site.webmanifest`, `/og/tai-otoshi.jpg`, `/og-image.png` all 200; `/throws/nope` → 404 (JSON body to a bare curl, the styled HTML error page with `Accept: text/html`, title "Throw not found · Gentle Way", `robots: noindex`). Table in `verification/samples/curl_status.txt`.
- [x] Browser (Playwright vs `npm run dev`, Chromium 1280 + 390): brand row + footer on `/`; plain click on a card opens the modal (URL stays `/`); modal "Open page →" navigates to `/throws/tai-otoshi`; `/throws/tai-otoshi` desktop + mobile; prev/next wrap (`deashi-harai` prev → `yoko-gake`, `yoko-gake` next → `deashi-harai`); error page styled. Screenshots: `verification/screenshots/sprint2_{index_desktop,index_footer,index_modal,throw_desktop,throw_mobile,error_404}.webp`. Not exercised: cmd-click (modifier clicks are explicitly let through to the browser in `ThrowCard.onClick`; same code path as before for the `<a href>`), mobile tap-flip (Playwright desktop Chromium reports `hover: hover` even at 390px; logic unchanged from before).
- [ ] Preview deploy: `curl -I https://gokyo-poster.vercel.app/` → 308 to gentleway.ink (or note the fallback); `/throws/tai-otoshi/` → 308 to no-slash. (Needs a push; Sprint 4.)

#### Deviations (routine calls made during execution)
- `SITE.description` trimmed to 160 chars (the plan's draft was 168): *"An interactive poster of the Gokyo no Waza, the forty throws of Kodokan judo, drawn in sumi-e ink and paired with everyday scenes that make the mechanics click."* **Sprint 1's `site.webmanifest` `description` and `llms.txt` blockquote still carry the 168-char draft; they should be updated to the string above so there is one description.**
- `ThrowCard.vue` root is a plain `<a :href="/throws/{id}">`, not `NuxtLink`: `NuxtLink`'s own click handler SPA-navigates before a child `@click.prevent` can stop it (verified in the browser: plain click went to the page). The handler lets modifier/non-left clicks through to the browser and `preventDefault`s plain clicks, keeping flip/modal. Same server HTML as a `NuxtLink` would render.
- `nuxt.config.ts` key order reflowed by `eslint --fix` (`nuxt/nuxt-config-keys-order`); `AppLogo.vue` attributes reflowed one-per-line by the same fix; `scripts/build-images.mjs` pre-existing `max-statements-per-line` lint error fixed (the `if { skipped++; continue }` line). No behavior change.
- `build-og.mjs`: each 540² image also gets a 2px `#e5dfd4` frame (matches the poster's card borders; the plan only named the rule between). Output 43–71 KB per JPEG (under the 60–90 KB estimate).
- Throw-page meta description: whole sentences from `mechanic` while ≤155 chars; 15 throws whose first sentence is longer are cut at a word boundary with `…`.
- `error.vue` title uses `titleTemplate` (`Throw not found · Gentle Way`) since `app.vue` is not rendered on the error route; the 404 shows a small status line above the h1 plus one sentence and a "Back to the poster" link.
- Throw page adds a small "All forty throws" text link top-right next to the `AppLogo` back link (both go to `/`), and wraps the content in `<main>` (the sitemap module's image discovery and plain semantics).
- Installed `@nuxtjs/sitemap` ^8.5.0 (plan said ^8.3.4; latest 8.x) and `@vercel/analytics` ^2.0.1. Dev build logs "Debug mode" for analytics; production needs Kyle's dashboard toggle (0.5).
- `index.vue` footer extraction left the provenance sentence byte-identical; the old single GitHub link became the "Source on GitHub" link.

---

### Sprint 3: List Gentle Way on monumentlabs.io [Complete, with deviations]
**Goal:** Gentle Way appears as a product tile, in the Product schema, and in the footer of the Monument Labs site with a matching clipart image; the Organization node gets a resolvable `@id`.
**Estimated effort:** 1.5 h (+ image generation)
**Repo:** `~/Programming/Workspace/MonumentLabsSite` — separate commit, gated on Kyle's go.

#### Tasks
- 3.1 Clipart: add `product-gentleway` to `assets/clipart/scripts/variants.mjs` (copy the `product-*` block, `MODEL_OPENAI`), subject in the house formula (single classical object in a quiet formal garden, stone path, clipped hedges, one slender tree), e.g. *"a classical marble relief stele of two wrestlers mid-throw on a low plinth"*. `node scripts/generate.mjs`, `build-gallery.mjs`, pick, `cwebp -q 82` → `nuxt-app/public/img/clipart/product-gentleway.webp` (1024², black line on pure white; tile applies `dark:invert`, crops 5/3).
- 3.2 `ProductsSection.vue:86-153` — append `{ slug: 'gentleway', name: 'Gentle Way', domain: 'gentleway.ink', url: 'https://gentleway.ink', tagline: 'The forty throws of Kodokan judo, and the everyday physics that explain them.', image: '/img/clipart/product-gentleway.webp', imageAlt: '…' }`. 7 tiles in a 2-col grid leaves an orphan; accept it.
- 3.3 `nuxt.config.ts:193-230` — append `{ '@type': 'Product', name: 'Gentle Way', description: <byte-identical tagline>, url: 'https://gentleway.ink' }` to `makesOffer`. Follow the six precedents exactly (no `@id` — a `Product` and a `WebApplication` shouldn't share one).
- 3.4 `nuxt.config.ts:157-160` — add `'@id': 'https://monumentlabs.io/#org'` to the Organization node so clean-markdown's and Gentle Way's references resolve. `url` apex-vs-www normalization stays deferred.
- 3.5 `layouts/default.vue:214-248` — append `{ label: 'Gentle Way', to: 'https://gentleway.ink', target: '_blank' }` to `footerColumns[0].children`.
- 3.6 Optional one-liners: the site description/keywords at `nuxt.config.ts:92,94,105,163,242` enumerate only four products — drop the enumeration if each is a one-line edit; otherwise leave.

#### Verification
- [x] `npm run dev` in MonumentLabsSite: tile renders light + dark, footer link present, `/` JSON-LD parses and `makesOffer` count = tile count (7 = 7, Organization `@id` present); typecheck + lint green; screenshots → `verification/screenshots/sprint3_ml_tiles_light.webp`, `sprint3_ml_tiles_dark.webp`, `sprint3_ml_footer.webp`; JSON-LD dump → `verification/samples/monumentlabs_jsonld.json`. (2026-08-21, headless Playwright against the dev server on :3080.)

#### Deviations (2026-08-21)
- 3.1: the first two prompts ("two wrestlers mid-throw", relief stele + statue group) were rejected by the OpenAI image safety system (`safety_violations=[sexual]`, 2 × 400). Rephrased both to "two fully robed figures in belted tunics … judo hip throw"; both generated (gpt-image-2, high, 2 images, ~2 min each). Kept both PNGs in `assets/clipart/images/` (`product-gentleway.png` relief stele, `product-gentleway-b.png` statue group) and both entries in `variants.mjs` (a/b precedent). Shipped **b** (statue group on a round plinth): the throw reads at tile size where the relief's figures are too small inside the 5/3 crop. `product-gentleway.webp` 1024², 161 KB.
- 3.6 done: the four site/OG/Organization/WebSite descriptions now read "…We build and operate our own AI products." and the `keywords` meta drops the four product names (five one-line edits in `nuxt.config.ts`).
- Typecheck reports one pre-existing error inside `node_modules/@nuxt/image/.../NuxtPicture.vue` (unrelated to these edits); lint clean.
- Not committed (gated on Kyle's go). Kyle's long-running ML dev server on :3080 (PID 96300, since 08-17) was reused for verification and left running.

---

### Sprint 4: Launch checks, docs sync, verification artifact [In progress: 4.5 + 4.7 done; 4.1–4.4 pending prod deploy/DNS]
**Goal:** `https://gentleway.ink` is live with a valid cert, passes validators, the docs humans read are current, and the work is recorded.
**Estimated effort:** 1.5 h (after DNS propagates and Sprint 2 is deployed)

#### Tasks
- 4.1 DNS/TLS: `dig +short gentleway.ink` / `www`; `vercel domains inspect gentleway.ink` → configured; cert issued; `curl -I https://www.gentleway.ink` → 308 → apex; `curl -I https://gokyo-poster.vercel.app` → 308 → gentleway.ink (or canonical fallback noted).
- 4.2 Prod crawl: fetch `https://gentleway.ink/sitemap.xml`, extract every `<loc>`, assert 41 × HTTP 200; `robots.txt`, `llms.txt`, `og-image.png`, one `/og/*.jpg` all 200.
- 4.3 Validators: Google Rich Results Test + Schema.org validator on `/` and `/throws/tai-otoshi` (no errors); LinkedIn Post Inspector / opengraph.xyz render both the house card and a per-throw JPEG; Lighthouse (mobile) on both routes: SEO ≥ 95, Performance/LCP noted for the throw page.
- 4.4 **Kyle:** GSC — verify the Domain property (TXT from 0.4), submit the sitemap, request indexing on `/` and 2–3 throw pages. Optional Bing import.
- 4.5 ✅ Docs (concrete, each a file edit) — done 2026-08-21:
  - ✅ Root `README.md` "The site": name Gentle Way, live URL, `/throws/[id]` route, `npm run og`, pointer to this plan; add this folder to the `internal_docs/` bullet under "Current state". `GENERATING.md`: no change needed.
  - ✅ `internal_docs/20260821_gentleway_launch_seo/README.md` (house format per `20260815_kyle_video_feedback/README.md`): provenance paragraph, `## Files` table (plan, logo gallery html/png, `verification/`, `samples/`), headline outcomes.
  - ✅ `~/claude-ops/monument/projects/gentle-way/STATE.md` from `_template/STATE.md`: phase, blockers, next 3, notes (`src/` layout, Vercel ids, plan folder).
  - ✅ `~/.claude/CLAUDE.md` Active projects row: Gentle Way · `gokyo-poster` · interactive judo poster, live at gentleway.ink, Nuxt app in `src/`.
  - ✅ `~/claude-ops/conventions/project_bootstrap.md`: one line naming Gentle Way as the reference for `ItemList` + per-page `WebPage` JSON-LD and the global `https://monumentlabs.io/#org` id; note that fully static content sites may prerender `/` (the doc currently says never to).
- 4.6 Optional housekeeping (Kyle's call): rename Vercel project `gokyo-poster` → `gentle-way` (updates `.vercel/project.json`); rename the GitHub repo (update `SITE.github`, README, footer). Not required for launch.
- 4.7 ✅ Phase 5 artifact (written 2026-08-21; Sprint 4 section marked pending prod deploy/DNS, validator screenshots to be appended after 4.1–4.3): `verification/index.html` + `verification/screenshots/*.webp` (OG card, favicon in tab, index brand row + footer, card → modal → page, `/throws/tai-otoshi` desktop/mobile, error page, ML products tile, validator results) + `verification/samples/` (server HTML head dumps, JSON-LD blobs, `sitemap.xml`, curl status table).

#### Verification
- [ ] 4.1–4.3 pass (pending prod deploy/DNS). Docs in 4.5 edited ✅; artifact written ✅ (all 11 screenshots resolve); plan statuses updated for 4.5/4.7.

---

## Environment / Config Changes

| Item | Required | Description |
|---|---|---|
| GoDaddy DNS (A, CNAME) | Yes | Kyle, manual (2FA). Records in 0.3. |
| GSC DNS TXT | Recommended | Kyle, manual; batch with 0.3. |
| Vercel Web Analytics toggle | Yes (for `@vercel/analytics`) | Kyle, dashboard (0.5). |
| Vercel domains | Done | `gentleway.ink` primary, `www` 308 → apex, both verified (2026-08-21). |
| `@nuxtjs/sitemap`, `@vercel/analytics` | Yes | New deps in `src/package.json`. No env vars. |
| `src/vercel.json` | Yes | `trailingSlash: false` + `.vercel.app` host redirect (2.5). |
| MonumentLabsSite | Yes (Sprint 3) | Separate repo/commit; clipart generation uses the OpenAI key `assets/clipart/scripts` already reads. |

No Supabase, no env vars, no secrets in this project.

## Production Safety

The poster is live at `gokyo-poster.vercel.app` with no users, DB, or auth. Prod-impacting surfaces: (a) the domain cutover — Vercel attaches the new domain while the `.vercel.app` alias keeps working, and the host redirect in 2.5 only fires once `gentleway.ink` resolves (verify on a preview deploy first; if the redirect misbehaves, remove it and rely on canonical); (b) the switch to prerendering — verified locally by `npm run build` before push; unknown routes still hit the server function. Sprint 2 ships as one push so the `ItemList` never points at 404s. MonumentLabsSite edits are additive one-array-entry changes following two precedent commits.

## Considered and rejected
- `routeRules '/**': { prerender: true }` — Nitro ignores wildcard prerender rules for enumeration; `prerender.routes + crawlLinks` does the work.
- `BreadcrumbList` with group-fragment crumbs; `Product @id` shared with the `WebApplication`; `ogType: 'article'` on throw pages — no benefit, some semantic mess.
- History-API intercept so the URL changes while the modal is open — more state, no SEO gain once the pages exist.
- Separate "ship Sprint 2 before 3" — merged; the ItemList and the routes must land together.
- Diptych for the site-wide OG card — off the house pattern; used per-throw instead.
- Hand-verified Wikipedia `sameAs` per throw (optional `wikipedia` field in `data/techniques.json`) — good entity signal, 40 manual lookups; deferred.
- `llms-full.txt` generated from `gokyo.json` — the prose is crawlable on 40 pages; deferred.

## What's Deferred / Out of Scope
- Restyling the poster, changing any analogy text or images; webfont loading for kanji on non-Apple devices.
- Terms/Privacy pages (no accounts, no data collection beyond Vercel Analytics).
- Wikipedia `sameAs` per throw; `llms-full.txt`; image `license`/`acquireLicensePage` (pending a license decision).
- Normalizing Monument Labs Organization `url` (apex vs www) and the site-local `#org` ids in Camera Shy/cosmo; canon asset filenames on the ML site.
- Renaming the Vercel project / GitHub repo.

## Open Questions
1. **Brand hierarchy on `/`:** plan keeps 五教の技 / *Gokyo no Waza* as the `<h1>` (the poster's title) and adds a slim "Gentle Way" brand row above it. Alternative: "Gentle Way" as `<h1>`, Gokyo no Waza as subtitle. Default = keep the poster title as h1.
2. **Image license:** the repo has no LICENSE; if Kyle wants the sumi-e images reusable (CC BY?) or explicitly reserved, say so and 2.12 gains `license`/`acquireLicensePage` and the footer a line. Default = nothing stated.
3. **Route name:** `/throws/[id]` (default) vs `/waza/[id]`.
4. ~~Mark~~ — decided: option 7 belt knot, tighter radius, ink fill.
