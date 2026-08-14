# Gokyo Poster

A stylized poster of the traditional **Gokyo no Waza** (五教の技) — the Kodokan's 40 judo throwing techniques in five groups of eight — with a twist: each technique is shown as an image of the throw, and hovering reveals an *analogous everyday scene* that makes the mechanics of the throw instantly grokkable.

The canonical example: **Tai Otoshi** feels like having a rock tied around your neck as it drops off a cliff. Every throw gets an analogy like that — mechanically faithful, drawable as a single image, and clear enough to explain to a child.

## Current state

- `data/techniques.json` — canonical list of all 40 techniques (romaji, kanji, English, group)
- `data/group-{1..5}.json` — per-group analogies: mechanic, analogy scene, why it maps, and an image-prompt seed for later generation
- `build.mjs` — merges the data and generates `index.html`
- `index.html` — review page showing each throw side by side with its analogy

## Next

- Generate the throw images and the analogy images (style TBD)
- Assemble the actual poster grid with hover interaction

## Build

```
node build.mjs && open index.html
```
