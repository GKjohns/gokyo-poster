# How the images are generated

Everything needed to (re)generate any image in this project, end to end.

## The recipe

Every image = **scene prompt + ", " + style prompt**, generated through the
**Vercel AI Gateway** (OpenAI-compatible endpoints at `https://ai-gateway.vercel.sh/v1`).

The locked-in production config lives in `data/styles.json` under `"chosen"`:

| Image | Model | Method |
|---|---|---|
| Throw (`images/throws/{id}.png`) | `google/gemini-3.1-flash-image` | Re-render of a **real reference photo/illustration** of the technique (`images/refs/{id}.jpg`). Prompt: "Re-draw this exact judo throw ({Name}) — keep the two athletes' precise body positions, grips, and the key blocking/sweeping action — as: {style_prompt}" |
| Analogy (`images/analogies/{id}.png`) | `openai/gpt-image-2` | Text-only. Prompt: the technique's `image_prompt` from `data/group-N.json` + ", " + style_prompt |

Style: **sumi-e** (see `data/styles.json` for the exact style prompt). This split won
a bake-off (`styles.html`): Gemini renders throws best when conditioned on a real
photo; gpt-image-2 renders the analogy scenes best; name-only prompts ("draw Tai
Otoshi") produce wrong body mechanics — don't use them.

## API key

`AI_GATEWAY_API_KEY` — Kyle's Vercel AI Gateway key, borrowed from Camera Shy
(`~/Programming/Workspace/camera_shy/src/.env`). Export it into the environment;
never commit it (`.env*` is gitignored, this repo is public).

## Scripts

```bash
# one image (either provider; --ref enables image input, Gemini only)
node scripts/generate.mjs <model> <outPath> [--ref <imagePath>] <prompt...>

# production pair(s): throw + analogy for each technique id.
# Skips existing outputs, retries once, concurrency 4.
# Requires images/refs/{id}.jpg to exist for each id.
AI_GATEWAY_API_KEY=... node scripts/batch.mjs <id> [<id> ...]

# candidate rounds for review: roll N variants per manifest entry into a review folder
node scripts/candidates.mjs <manifest.json> <outDir> [--n 3] [--only id,id] [--dry-run]
# build the side-by-side review page (current image + candidates, radio picks -> JSON)
node scripts/candidates-page.mjs <feedbackDir> [manifest.json ...] [--only id,id] [--out file.html] [--label-prefix r2-]
# promote picks: copy PNGs into images/, write prompts (+ new concept text) into data/group-N.json,
# copy the throw ref used, delete stale webps
node scripts/promote.mjs <feedbackDir> <picks.json>
```

The candidate flow (used for the 2026-08-15 review round, see
`internal_docs/20260815_kyle_video_feedback/`): manifest of `{id, kind, label,
prompt, ref?, n}` -> `candidates.mjs` -> an agent views every render and deletes
failures -> `candidates-page.mjs` -> Kyle picks -> `promote.mjs` -> `cd src && npm run
images && npm run data && cd .. && node build.mjs`.

To **redo one image**, delete it and rerun `batch.mjs` with that id (it skips
whatever exists). To redo with a tweaked scene, edit the `image_prompt` in the
technique's `data/group-N.json` first.

## Gateway provider quirks (learned the hard way)

- **Gemini image gen** goes through `/v1/chat/completions` with
  `modalities: ["image","text"]`; the image comes back as a data URL in
  `choices[0].message.images[0].image_url.url`. Image input = a content part
  (`image_url` with a base64 data URL).
- **gpt-image-2** goes through `/v1/images/generations` (`b64_json` response).
  The gateway does **not** support image input for it: `/v1/images/edits` 404s
  and the chat endpoint rejects the model. If you need reference conditioning
  on the OpenAI side, describe the reference in text instead.
- **Safety**: gpt-image-2 sometimes rejects analogy scenes that read as peril
  ("dragged over a cliff" → self-harm/violence flags), stochastically. Fix by
  rewording the scene more whimsically (smiling cartoon figures, comic moment);
  last resort, generate that one with the Gemini model.

## Reference images (`images/refs/`, gitignored)

- **Wikimedia Commons first.** Competition photos when a clear one exists; the
  Commons "M2012" instructional illustration series covers many throws and
  re-renders into sumi-e just as well — it's the reliable fallback for rare
  techniques (most of Dai Yonkyo / Dai Gokyo).
- An agent must **look at the candidates** before choosing: signature action
  unmistakable, both athletes visible, side-ish view. Multi-frame sequence
  strips are common in results and unusable.
- Commons `Special:FilePath` / API requests need a `User-Agent` header or they
  return junk, and rapid API calls get rate-limited — space them ~2–3s apart.
- The instructional series follows the filename pattern
  `File:{Hyphenated-name}.jpg` (e.g. `File:O-soto-guruma.jpg`) — it hit for
  every technique we needed, including all of Dai Gokyo.
- SVG references work too — render to raster first (sumi-gaeshi used one).
- Because the illustrations are signed ("M2012"/"M2013"), visually QA the
  renders afterward for leaked signature-like marks or garbled text.
- Refs stay out of git (third-party rights); they're inputs, not content.

## QA pass (do this after any batch)

Blind generation has a real failure rate (~16% of throws, ~10% of analogies in
the full run): merged/missing figures, palette breaks (a stray color), leaked
readable text in the seal, photographed-paper borders, or the signature action
not reading. After a batch, have an agent **view every image** and flag
failures, then a repair agent re-rolls the flagged ones — viewing each result
and iterating (≤3 attempts) with these constraints appended to the prompt:
black ink only; letterless red seal; artwork fills the frame edge to edge, no
borders; both figures complete and distinct. If a throw keeps failing, the
reference is usually the problem — hunt a better one. Specifically: when Gemini
keeps merging the two athletes into one mass, the reference is a compact,
entangled illustration — drop the reference entirely and generate from a
precise positional text description instead (fixed yoko-otoshi and yoko-gake).

### Lessons from the 2026-08-15 review round

- **No brooms.** Three analogies that used a broom as the sweeping agent were all
  rejected ("a broom wouldn't be sweeping a person's leg"). Prefer devices with a
  real-life reason to be there.
- **State direction and contact explicitly, twice.** The recurring render bug was
  physically-wrong direction: water pouring the wrong way, kid flying forward
  instead of back, barrier arm at the groin, shins already past the pivot. Prompts
  that name the direction (BACKWARD over the head), the contact point (shins
  pressed against the chain), and the body orientation (belly-down, facing the
  parent) fixed these; prompts that merely described the mechanic did not.
- **Some devices always render wrong.** A barrier arm "under one inner thigh"
  rendered at the crotch 5/5 times in side view; swap the concept rather than
  re-roll.
- **Text-only throws.** `yoko-gake` is generated text-only (every reference merged
  or tangled). Prompt: "The judo sacrifice throw Yoko Gake (side hook), two judoka
  in white judogi, clean side view, figures large in frame: tori has thrown himself
  down onto his own side on the mat while the sole of his foot hooks and sweeps the
  outside of uke's ankle; uke is airborne, body horizontal, about to land flat on
  his side beside tori; tori's hands still grip uke's sleeve and lapel, pulling him
  down; two complete, distinct figures with correct anatomy, drawn accurately as
  in Kodokan textbooks, as: {style_prompt}". `batch.mjs` will refuse it for lack of
  a ref; use `generate.mjs` directly.
- **Reference quality is the throw.** tai-otoshi and tani-otoshi both failed on
  refs that were front-on or from behind; a side-view competition photo fixed
  each on the first roll.

## Costs (observed)

~$0.15–0.25 per gpt-image-2 image, ~$0.03–0.06 per Gemini image. The full
40-technique set ≈ $10; a 6-style × 2-model bake-off ≈ $3–4.

## Review pages

- `index.html` (from `node build.mjs`) — all 40 techniques: images + analogy text.
- `styles.html` — the style/model bake-off that picked the config.
- `batch.html` — the 5-throw pilot that validated the production pipeline.
