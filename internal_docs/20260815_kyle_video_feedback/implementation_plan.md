# Regeneration Plan: Kyle's Video Feedback (August 15, 2026)

> Addressing the 24 image items from Kyle's 5-minute screen recording. Everything here is image regeneration; there are no code changes to the site.

**Source:** [`feedback_summary.md`](feedback_summary.md)
**Created:** 2026-08-15
**Status:** Done 2026-08-15. Round 1: 89 candidates, Kyle picked 16 (promoted). Round 2 (sumi-gaeshi, ashi-guruma, tani-otoshi analogy, uchi-mata new concept): 25 candidates, Kyle picked 4 (promoted). 20 of the 24 items closed. Left as-is by Kyle's choice at pick time: deashi-harai (#1), sasae-tsurikomi-ashi (#2), yoko-wakare (#21), utsuri-goshi (#19). Picks: `picks_round1.json`, `picks_round2.json`.
**Targeted close:** 2026-08-22

## Scope at a glance

| Bucket | Techniques | Candidates each | Images |
|---|---|---|---|
| **A. Throw re-rolls** (Gemini + reference) | tai-otoshi, tani-otoshi, yoko-gake | 3 | 9 |
| **B. Analogy re-renders, same concept, tightened prompt** (gpt-image-2) | deashi-harai, sasae-tsurikomi-ashi, o-goshi, tsurikomi-goshi, uchi-mata, ashi-guruma, kata-guruma, sumi-gaeshi, tani-otoshi, uki-otoshi | 3 | 30 |
| **B-minor** | seoi-nage | 2 | 2 |
| **C. New analogy concepts, firm ask** | osoto-gari, harai-goshi, harai-tsurikomi-ashi, hane-goshi, yoko-wakare, ura-nage, ushiro-goshi | 2 concepts × 2 renders | 28 |
| **C-soft. New analogy to present alongside current** | sukui-nage, uki-waza, utsuri-goshi | 1 concept × 2 renders | 6 |
| | **21 techniques, 24 images to replace** | | **~75 candidates** |

Estimated cost at the observed rates in `GENERATING.md` (~$0.15–0.25 per gpt-image-2, ~$0.03–0.06 per Gemini): **~$14–18**. Wall time is dominated by reference hunting for the three throws and the QA pass, not generation.

## How this connects to prior work

| Item | Prior signal | Status |
|---|---|---|
| #11 tai-otoshi throw | `data/styles.json` test subject; the pilot's showcase throw | Regressed at some point; current render is a merged single figure. Reference likely at fault. |
| #15 tani-otoshi throw | Full-run QA pass (~16% throw failure) | Slipped through QA. |
| #22 yoko-gake throw | `GENERATING.md`: reference dropped, positional text prompt used after Gemini merged the athletes | Text-only approach produced a coherent but wrong image. Needs a new reference or better description. |
| #10 kata-guruma analogy | `b8af7a4` re-rolled the kata-guruma *throw* two days ago | Throw is now fine; this is the analogy. |
| #5, #8, #12 (brooms) | Analogies were authored in one pass per group | Same failure mode three times: broom as the sweeping agent. Ban it in the brainstorm. |
| #7 uchi-mata, #6 tsurikomi-goshi, #14 sumi-gaeshi | Prompts describe the mechanic but not the physical direction precisely enough | Prompt-precision fixes, not concept changes. |

## Sprint A. Set up the candidate pipeline (Small, ~30 min)

**Addresses:** all items (infrastructure)
**Files:**
- `scripts/candidates.mjs` (new) — thin loop over `scripts/generate.mjs`: takes a JSON manifest of `{id, kind: throw|analogy, label, model, prompt, ref?}` entries and N rolls, writes to `internal_docs/20260815_kyle_video_feedback/candidates/{id}/{kind}-{label}-{n}.png`, skips existing, concurrency 4, retries once. Reuses the existing gateway call in `generate.mjs`; appends the chosen sumi-e style prompt from `data/styles.json` and the QA constraints ("black ink only; letterless red seal; artwork fills the frame edge to edge; both figures complete and distinct").
- `internal_docs/20260815_kyle_video_feedback/candidates.html` (generated) — review page in the style of `batch.html`: one row per technique, current image first, then every candidate with its label and prompt, radio buttons that dump a `picks.json` to copy out. Kyle picks here.
- `.gitignore` — add `internal_docs/**/candidates/` (candidate PNGs are big; only the winners get promoted into `images/`).

**Verification:** `node scripts/candidates.mjs --dry-run` prints the manifest; a single test roll lands in the right folder.

## Sprint B. Brainstorm the new analogy concepts (Medium, ~1 hr, no images yet)

**Addresses:** #5, #8, #12, #13, #17, #19, #20, #21, #23, #24
**Files:** `internal_docs/20260815_kyle_video_feedback/concepts.md` (new)

For each of the 10 techniques: re-read the `mechanic` in `data/group-N.json`, propose 3 candidate concepts in the project's house rules (mechanically faithful, a single drawable frame, explainable to a child, whimsical enough to clear gpt-image-2 safety, **no brooms**, no repeats of scenes already used elsewhere on the poster). Rank them, write full `analogy_name` / `analogy` / `why_it_maps` / `image_prompt` for the top 2 (top 1 for the C-soft trio). This doc is what gets promoted into `group-N.json` after Kyle picks.

Starting directions from Kyle's own words and the mechanics:
- **osoto-gari**: weight rocked back onto the heel, then the supporting leg reaped from behind. Ideas: a bike kickstand kicked out while the rider leans back on it; someone leaning back on a ladder's rear feet that get pulled forward.
- **harai-goshi**: "something else could be lifting their body up." Torso committed over a hip-high pivot, legs swept up from behind. Ideas: leaning over a fence rail as a big dog bounds up under the thighs; a wave lifting a wader's legs over a jetty rail.
- **harai-tsurikomi-ashi**: held up from above while the advancing foot is swept sideways before it lands. Ideas: a kid held by both hands by a parent stepping onto ice; a puppy on a leash on a slick floor.
- **hane-goshi**: coiled spring under the thighs that snaps straight. Ideas: sitting on a bent sapling that springs up; a diving board / springboard flip; a mattress bounce.
- **yoko-wakare**: the support vanishes sideways and you're yanked forward and down. Ideas: leaning on a swinging gate that swings away; a canoe pushed off the dock as you step onto it.
- **ura-nage**: bear-hug, hips under, arch back like a drawn bow, load goes over the shoulder behind. Ideas: a wheelbarrow / backpack flipped over the head; a firefighter's carry gone over backward; a shot-putter's back arch.
- **ushiro-goshi**: lifted straight up from behind on the hips, then the platform pulled away. Ideas: a kid lifted onto a shoulder-height ledge that gives way; an elevator floor dropping; a chair pulled out mid-lift.
- **sukui-nage** (soft): scoop under the hips, base leaves the floor, top tips back. Ideas: a forklift lifting a pallet from the front edge; a snowplow under a mailbox.
- **uki-waza** (soft): drop to your own side and block the advancing foot low; forward momentum does the rest.
- **utsuri-goshi** (soft): hoisted by a rear bear-hug, hips swapped underneath while floating.

**Verification:** Kyle reads `concepts.md` before Sprint D spends money on the C bucket, or, if he'd rather see pictures, we skip straight to D and he judges the renders. Default: skip the read and render, since he asked to "regenerate a bunch of candidates and then make the decision."

## Sprint C. Throw references and re-rolls (Medium, ~1–2 hrs, ~$0.50)

**Addresses:** #11 tai-otoshi, #15 tani-otoshi, #22 yoko-gake
**Files:** `images/refs/{id}.jpg` (gitignored), `candidates/{id}/throw-*.png`

Per `GENERATING.md`, a merged or missing figure means the reference is wrong. For each: pull 3–5 Wikimedia Commons candidates (competition photo first, M2012 instructional illustration as fallback; space API calls, set a User-Agent), have an agent *look* at them and pick one with the signature action unmistakable and both athletes visible from the side. Roll 3 candidates each with the standard re-draw prompt. For yoko-gake, roll 3 from the best reference *and* 2 from a rewritten positional description, since the text-only path is what's already there.

**Verification:** an agent views every candidate against the checklist (two complete athletes, correct blocking/reaping/sweeping action, no leaked text, no border, black ink only) and flags failures for one repair pass before Kyle sees them.

## Sprint D. Analogy candidates (Small effort, ~30 min wall time, ~$14)

**Addresses:** #1–#10, #12–#14, #16–#21, #23, #24
**Files:** `data/group-N.json` prompt rewrites staged in `concepts.md` / the manifest (not written to `group-N.json` until picked); `candidates/{id}/analogy-*.png`

Bucket B prompt fixes, one line each:
- deashi-harai: sneaker planted on the deck, board shooting forward, body dropping behind.
- sasae-tsurikomi-ashi: seated kid's foot clearly across the aisle against the walker's shin; walker pivoting over that contact.
- seoi-nage: kid just past the carrier's shoulder, not across the yard.
- o-goshi: passenger's body intact and facing one way, rolling forward over the front lip.
- tsurikomi-goshi: bucket pivoting on the rim, water pouring over the far side; state the direction twice.
- uchi-mata: barrier arm under one inner thigh, offset to one side, that leg lifted; nothing at the crotch.
- ashi-guruma: shins against the chain, body rotating over it, head down, feet up.
- kata-guruma: sack draped across the shoulders and rolling off the far side; farmer's shoulders as the visible pivot.
- sumi-gaeshi: kid sailing back over the parent's head in the direction of the backward roll, landing behind the parent.
- tani-otoshi: kneeler directly behind the heels, faller tipping straight back over them, pusher in front.
- uki-otoshi: bull stumbling forward past the kneeling matador, front legs buckled, hindquarters lifting, not a vertical nosedive.

Bucket C/C-soft: render the top concepts from Sprint B (2 renders each). Run everything through `scripts/candidates.mjs`; then an agent QA-views every render (palette break, merged figures, borders, leaked text) and re-rolls the failures once so Kyle isn't picking among broken images.

**Verification:** `candidates.html` shows current + all candidates for all 21 techniques; nothing in the grid is a known-broken render.

## Sprint E. Kyle picks, then promote (Small, ~30 min)

**Addresses:** all
**Files:**
- `data/group-N.json` — write the winning `image_prompt` (and, for new concepts, `analogy_name` / `analogy` / `why_it_maps`).
- `images/throws/{id}.png`, `images/analogies/{id}.png` — copy the winning PNG over the old one.
- `src/public/img/{throws,analogies}/{id}.webp`, `{id}-lg.webp` — delete, then `cd src && npm run images`.
- `src/app/assets/gokyo.json` — `npm run data`.
- `index.html` — `node build.mjs` for the review page.
- `GENERATING.md` — add a line to the QA notes: brooms as the sweeping agent were rejected in review; and any new reference-hunting lesson from Sprint C.

**Verification:** `npm run build` green; agent walks the site with Playwright and screenshots each of the 21 changed cards (throw + hover) to confirm the new images render and crossfade; Kyle eyeballs the grid.

## Open decisions for Kyle before Sprint D spends money

1. Concept review first (read `concepts.md`, ~10 min) or straight to renders? Default: straight to renders.
2. Candidate count: 3 per re-render / 4 per new concept as above, or fewer? Doubling everything is roughly +$14.
3. Kata guruma: analogy (default, what was on screen) or throw?
