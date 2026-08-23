# AGENTS.md — Gentle Way (gokyo-poster)

**Gentle Way** is an interactive poster of the Gokyo no Waza, the 40 throwing techniques of Kodokan judo, each drawn in sumi-e ink and paired with an everyday scene that explains the throw's mechanics (Tai Otoshi = a rock tied around your neck dropping off a cliff). Live at **https://www.gentleway.ink** (a Monument Labs product).

## Repo shape

- `src/` — the shipped Nuxt 4 + Nuxt UI site. **There is no root `package.json`; run all npm commands from `src/`.** `/` is the poster; `/throws/[id]` is one prerendered page per throw (41 URLs + sitemap, robots.txt, llms.txt, OG cards).
- Repo root — the image pipeline and review tooling: `data/` (`techniques.json`, per-group analogy files `group-{1..5}.json`, `styles.json`), `images/` (`throws/`, `analogies/`, `refs/` source PNGs), `scripts/` (generation: `generate.mjs`, `batch.mjs`, candidate/promote round tooling), `build.mjs` + `index.html` / `styles.html` / `batch.html` (pre-site review pages).
- `internal_docs/` — review rounds and the launch plan (`20260821_gentleway_launch_seo/` has the implementation plan and verification artifact).

## Commands (from `src/`, Node 22+)

- `npm install`
- `npm run dev` — http://localhost:3000
- `npm run build` — prerenders `/` + 40 throw pages + sitemap; `npm run preview` serves it
- `npm run lint` — eslint; `npm run typecheck` (`nuxt typecheck`)
- `npm run data` — rebuild `src/app/assets/gokyo.json` from `../data/*.json` (run after editing analogies)
- `npm run images` — regenerate 640/1024px webp derivatives in `public/img/` from `../images/` (skips existing; delete a webp to redo it)
- `npm run og` — regenerate `public/og/{id}.jpg` 1200x630 share cards
- `npm run indexnow` — ping Bing/DDG/Yandex after content changes

## Conventions

- No Supabase, no env vars for the site itself. Image *generation* needs `AI_GATEWAY_API_KEY` (Vercel AI Gateway); the full methodology, models, and costs are in `GENERATING.md`. Do not generate images from name-only prompts; throws are re-rendered from reference photos.
- Palette: paper `#faf8f4`, ink `#1c1a17`, seal red `#a33b2e`; system serifs, no webfonts. Logo is the belt-knot mark (`src/public/favicon.svg`, `src/app/components/AppLogo.vue`).
- Displayed copy uses **no em dashes**.
- JSON-LD: pages reference the global Organization id `https://monumentlabs.io/#org`; `ItemList` on `/`, `WebPage` + two `ImageObject`s per throw page.
- Hosting: Vercel project `gokyo-poster` with Root Directory `src`, Node 24 build; apex 308-redirects to `www.gentleway.ink`.

## Read next

`README.md` (root, pipeline + current state), `src/README.md` (site), `GENERATING.md` (image generation end to end), `internal_docs/20260821_gentleway_launch_seo/`.

## Agent PRs

This repo receives PRs from Monument Steward (branch `steward/*`, label `steward`). Keep diffs minimal, run lint/typecheck/build from `src/` before opening a PR, and keep this file accurate.
