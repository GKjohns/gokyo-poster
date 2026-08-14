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
```

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

## Costs (observed)

~$0.15–0.25 per gpt-image-2 image, ~$0.03–0.06 per Gemini image. The full
40-technique set ≈ $10; a 6-style × 2-model bake-off ≈ $3–4.

## Review pages

- `index.html` (from `node build.mjs`) — all 40 techniques: images + analogy text.
- `styles.html` — the style/model bake-off that picked the config.
- `batch.html` — the 5-throw pilot that validated the production pipeline.
