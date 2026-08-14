# Gokyo Poster

A stylized poster of the traditional **Gokyo no Waza** (五教の技) — the Kodokan's 40 judo throwing techniques in five groups of eight — with a twist: each technique is shown as an image of the throw, and hovering reveals an *analogous everyday scene* that makes the mechanics of the throw instantly grokkable.

The canonical example: **Tai Otoshi** feels like having a rock tied around your neck as it drops off a cliff. Every throw gets an analogy like that — mechanically faithful, drawable as a single image, and clear enough to explain to a child.

## Current state

- `data/techniques.json` — canonical list of all 40 techniques (romaji, kanji, English, group)
- `data/group-{1..5}.json` — per-group analogies: mechanic, analogy scene, why it maps, and the image prompt
- `data/styles.json` — the style bake-off candidates and the chosen production config (sumi-e; Gemini+reference for throws, gpt-image-2 for analogies)
- `images/throws/`, `images/analogies/` — the generated pairs, one per technique
- `scripts/` — generation tooling (see **[GENERATING.md](GENERATING.md)** for the full methodology: models, endpoints, reference-photo sourcing, safety workarounds, costs)
- `build.mjs` — merges the data and generates `index.html`
- `index.html` — review page: every throw's image pair + analogy text side by side
- `styles.html` / `batch.html` — the style bake-off and the 5-throw pilot that picked the config

## The site

`site/` is the poster itself — a Nuxt 4 + Nuxt UI app (started from the official
`nuxt-ui-templates/starter`): paper-white gallery page, five kyo sections, 40 cards.
Hover a card and the throw crossfades into its analogy; click for the pair
side-by-side with the mechanic, the analogy, and why it maps. Touch devices flip
on first tap, open on second.

```
cd site && npm install && npm run dev
```

- `npm run data` — re-merge `../data/*.json` into `app/assets/gokyo.json` after editing analogies
- `npm run images` — regenerate 640/1024px webp derivatives in `public/img/` from `../images/` (skips existing; delete a webp to redo it)

## Review pages (pre-site artifacts)

```
node build.mjs && open index.html
```
