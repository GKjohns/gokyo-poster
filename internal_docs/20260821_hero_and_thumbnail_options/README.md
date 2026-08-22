# Hero rethink + Monument Labs thumbnail options (Aug 21, 2026)

Follow-up to the launch (`../20260821_gentleway_launch_seo/`). Kyle's feedback after the first deploy: the top of the page had too many type sizes and scripts, the mark was too small, and the Monument Labs tile (two judoka in gi) didn't fit the classical line-art set.

## Files

| File | What it is |
|---|---|
| `hero-storyboard.html` / `.png` | Seven top-of-page treatments (current + 6), each at 1280 desktop with the real first card rows and at 390 mobile. **Kyle picked Option 5, Editorial masthead.** |
| `thumbnail-options.html` / `.png`, `thumb-*.webp` | Current tile + six classical-monument alternatives (tipping column, lever, balance, pankration relief, discus, yielding arch), shown full and as the 5/3 tile crop in light and dark. **Kyle picked the tipping column.** |
| `verification/hero5_*.webp` | Local and prod screenshots of the shipped masthead (index desktop/mobile, throw page). |
| `verification/ml_tile_*.webp` | The tipping-column tile on the ML dev server and on prod, light and dark, with `object-position: center 20%` so the whole column stays in the crop. |

## Outcome

- Masthead shipped 2026-08-21 (gokyo-poster `b05e8fd`): shared `AppMasthead.vue` on `/` and `/throws/[id]`; H1 stays "Gokyo no Waza"; SEO head and JSON-LD unchanged.
- ML tile swapped to the tipping column with a per-tile `imagePosition` field (MonumentLabsSite, same night); six alternates kept under `assets/clipart/`.
