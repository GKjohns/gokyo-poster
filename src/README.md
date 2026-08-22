# Gentle Way

The Nuxt 4 + Nuxt UI app behind [gentleway.ink](https://gentleway.ink): an interactive poster of the Gokyo no Waza, the forty throws of Kodokan judo, each drawn in sumi-e ink and paired with an everyday scene that explains the mechanics. `/` is the poster; `/throws/[id]` is one page per throw. Built by [Monument Labs](https://monumentlabs.io).

Commands (run from this directory, Node 22+):

```bash
npm install        # deps + nuxt prepare
npm run dev        # http://localhost:3000
npm run build      # prerenders / + 40 throw pages + sitemap.xml
npm run preview    # serve the build
npm run data       # rebuild app/assets/gokyo.json from ../data
npm run images     # regenerate public/img webp derivatives from ../images
npm run og         # regenerate public/og/{id}.jpg share cards
npx nuxi typecheck && npm run lint
```

The image pipeline, source data and review tooling live in the repo root; see [../README.md](../README.md).
