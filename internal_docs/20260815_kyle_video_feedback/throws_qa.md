# Throw re-roll QA: tai-otoshi, tani-otoshi, yoko-gake

Feedback items 11, 15, 22. Manifest: `manifest_throws.json`, outputs in `candidates/{id}/throw-{label}-{n}.png`.
Three rounds total (20 + 7 + 3 renders, Gemini `google/gemini-3.1-flash-image`, ~$1.50). Rejected files were deleted; the manifest reflects the final `n` per entry, so re-running it would regenerate the deleted slots.

## Why the old refs failed

- `tai-otoshi.jpg` (= `tai-otoshi-b.jpg`) is a front-on competition photo at the entry stage with uke hidden behind tori: exactly the compact/occluded shape that makes Gemini merge the two into one figure. `tai-otoshi-a.jpg` is the M2013 illustration (`File:Tai-otoshi-2.jpg`), also entry-stage and front-on.
- `tani-otoshi.jpg` is the M2013 illustration seen from behind (`File:Tani-otoshi.jpg`): the straight leg behind the heels and the backward drop are both invisible from that angle, so the render came out as two seated figures.
- `yoko-gake.jpg` (`File:Yokogake.jpg`) is a wide nage-no-kata frame with the athletes tiny in a cluttered venue; the production render was text-only after that ref kept merging.

## Tai Otoshi

Refs (both from Commons `Category:Tai otoshi`):
- `images/refs/tai-otoshi-v2.jpg` = `File:Seattle - Budokan Dojo judo demo 02.jpg` (CC BY-SA 3.0). Side view, uke fully airborne going over tori's extended leg. Dramatic finish.
- `images/refs/tai-otoshi-v3.jpg` = `File:Hisayoshi HARASAWA 220429r.jpg` (CC BY-SA 4.0, 2022 All-Japan Championships). Side view of the classic moment: tori's leg extended low across uke's shin, uke pitching forward, both fully visible.

Survivors (6/6, nothing rejected): `throw-v2-1.png`, `throw-v2-2.png`, `throw-v2-3.png`, `throw-v3-1.png`, `throw-v3-2.png`, `throw-v3-3.png`.

Top pick: **`throw-v3-2.png`**. Textbook tai-otoshi read: leg barred across uke's shin, uke breaking forward over it, two clean distinct figures. (v3-1 is a close second; the v2 set is more theatrical but the leg block is less legible because uke is already inverted.)

## Tani Otoshi

Refs:
- `images/refs/tani-otoshi-v2.jpg` = crop of `File:2023 African Games Judo 84.jpg` (CC BY-SA 4.0, `Category:Tani otoshi`). Tori (blue) already dropped to the mat, straight leg extended behind uke, uke (white) toppling backward over it. Side view, the finish of the throw. Cropped to the two athletes to shed the scoreboard.
- `images/refs/tani-otoshi-v3.jpg` = `File:Jud-tani-otoshi.png` line drawing. Dropped after round 1: it shows tori upright with a leg behind uke, which Gemini rendered as an o-soto-otoshi-style standing reap with no backward drop (and two of three came out faceless). All three v3 renders deleted.

Round 1 also lost `throw-v2-2` (uke's gi came out blue-gray, a palette break); v2 was bumped to n=6 in round 2 and all four new renders passed.

Survivors (6): `throw-v2-1.png`, `throw-v2-2.png`, `throw-v2-3.png`, `throw-v2-4.png`, `throw-v2-5.png`, `throw-v2-6.png` (all one composition family: tori seated with straight leg out, uke going over backward). Seals vary: plain red circle (v2-1, v2-2, v2-4), red square outline (v2-3, v2-5), small pseudo-character seal (v2-6).

Top pick: **`throw-v2-1.png`**. Straight leg behind uke's heels, tori dropped alongside, uke clearly falling backward; cleanest ink and both faces readable.

## Yoko Gake

Refs tried:
- `images/refs/yoko-gake-v2.jpg` = crop of `File:Yokogake.jpg` to the two athletes. Rejected after round 1: renders were a top-down mid-air tangle (v2-1 had two seals, v2-2 leaked "SIN" and kanji from the gi, v2-3 unreadable action). All deleted.
- `images/refs/yoko-gake-v3.jpg` = M2012/M2013 illustration `File:Yoko-gake.jpg`. Rejected: it depicts the entry (foot on ankle, both upright), so the renders read as an ankle block, not the sacrifice; two of three faceless. All deleted.
- Text-only (label `text`, default Gemini throw model, positional description of tori dropping onto his side, sole hooking outside of uke's ankle, uke horizontal and airborne, grips maintained). This is what worked, same conclusion as the original production run, but with the tighter description the athletes stay separate and the hook reads. Rolled n=2, then 5, then 7.

Rejected among text renders: `text-4` (round 2) and `text-6` (round 3) both had a legible "柔道" seal (leaked readable text). `text-4` was regenerated in round 3 and passed.

Survivors (6): `throw-text-1.png`, `throw-text-2.png`, `throw-text-3.png`, `throw-text-4.png`, `throw-text-5.png`, `throw-text-7.png`. `text-3` is the weakest (tori on his back with uke horizontal above; could be mistaken for a tomoe-nage variant) and is kept only as an alternate.

Top pick: **`throw-text-7.png`**. Tori thrown onto his side, extended leg hooking uke's ankle, uke flat and horizontal in the air with sleeve/lapel grips still connecting them; both figures complete and distinct, single letterless seal. `text-2` and `text-5` are close alternates.

## Notes

- Seals: several survivors carry small pseudo-character seals like the rest of the production set; only the two "柔道" ones were legible and got cut.
- Refs stay gitignored (`images/refs/`), same as before. If a pick is promoted to production, copy the ref to `images/refs/{id}.jpg` per GENERATING.md so `batch.mjs` stays reproducible (yoko-gake has no ref: keep it text-only).
