# User Feedback: Kyle Johnson — Video Walkthrough of the Gokyo Poster

**Source:** Screen recording with audio narration (05:10), `localhost:3000` grid view, 4 cards per row
**Reviewer:** Kyle Johnson (`gkjohns@gmail.com`), project owner
**Recording Date:** Saturday, August 15, 2026 at ~7:34 PM
**Received:** Saturday, August 15, 2026
**Overall Sentiment:** Positive on the whole ("All in all, these are very good"; "For tai otoshi, incredible, don't change a thing"; "Hanemakikomi is perfect"). The review is entirely about the images: which analogy scenes don't read mechanically, which renders have broken body positioning, and three throw renders that don't look like the throw. No comments on layout, chrome, hover behavior, or the detail modal (never opened).

## How this was aligned

Whisper mangled most technique names ("Yuzu guruma", "sase", "Haraigoshi guruma", and "tai otoshi" used for two different throws). Every mention below was resolved against the screen frame at that timestamp: which card the cursor was on, which section was scrolled into view, and whether the throw or the (hovered) analogy was showing. See `alignment.json` for the per-mention evidence and `screenshots/` for the frames. Three items that hinged on this were spot-checked by hand: 03:01 is the **Tai Otoshi throw** (he scrolled back up to Dai Nikyo), 03:38 is **Tani Otoshi** (only Dai Yonkyo on screen), 04:50 is **Ushiro Goshi** (Utsuri Goshi is scrolled off).

## Full transcript (lightly cleaned, technique names corrected in brackets)

> Okay, so I'm going to just do a review and just point out things that don't look good.
>
> Deashi harai looks good, but for deashi harai, notice that **the skateboard is not attached to the person's leg**. I see what you're trying to illustrate, but **I'd rather just have the person stepping on it and kind of slipping**. Hiza guruma is good. Sasae is good. **Maybe redo the analogy for the sasae**, because it doesn't look like the person was actually tripped. The positioning of the two people doesn't make sense, and you can adjust the prompt wherever you need to for that. Uki goshi, good. Seoi nage could be a little better. **Maybe the kid shouldn't be so far away from the mom.** I don't know if he would get hurled that far, but it's not terrible. Ouchi gari is good. O goshi, the little kid getting dumped out of the wheelbarrow, **his legs and body positioning don't make sense. It's almost like his upper body is spun 180 degrees.** Osoto gari, **I simply don't like the analogy.** A broom sweeping the leg out from under a chair doesn't make sense. There's no real life situation where a broom would be sweeping under a chair that would be tipped back. **Maybe just think of something else.**
>
> Kosoto [gari] is good, kouchi gari is good, even though they're kind of the same thing, that's actually fine. Koshi guruma is good. Tsurikomi goshi, the image is almost good, but it just doesn't make sense. **The bucket is being pulled up, but the water is spilling in the opposite direction, not over.** If that's hard, try to render it a few more times. If it's difficult, just use another analogy. Uchi mata is pretty good, but **the turnstile thing is going up into the guy's crotch, not in their leg.** Harai goshi is kind of weird, and again, **a broom wouldn't be sweeping a person's leg in that situation.** Something else could be lifting their body up, but the broom just doesn't make sense. It's also weirdly touching the guy's body. **For tai otoshi, incredible, don't change a thing.** Okuri ashi harai is pretty good.
>
> Kosoto [gake] is great, tsuri goshi is good, yoko otoshi is good. Ashi guruma could be a little bit better. **Maybe just try a few more of them. The kid's body positioning doesn't make sense.** **Kata guruma could be better.** Going back to tai otoshi, **the actual throw image doesn't look good. Redo the tai otoshi throw.** Tomoe nage is good. Harai tsurikomi ashi is good, but again, that broom doing the sweeping of the legs of the marionette, **I think we could just use a better analogy for harai tsurikomi ashi.** **Hane goshi, use another analogy.**
>
> Sumi gaeshi, **the kid is being thrown forward as opposed to backwards with the airplane game, so do the analogy again.** Tani otoshi **doesn't look like the throw, so fix the throw** with tani otoshi. And **the positioning of the kids with the push could be better.** **Hane makikomi is perfect.** Sukui nage is pretty good, **maybe try to think of another one for that.** Uki otoshi is very good, but **the bull is kind of crashing down like a missile into the ground and it's not a realistic bullfighting situation.** Soto makikomi is good, o guruma is very good, utsuri goshi is pretty good, **maybe try another one and just present it and see**, but I think that's not sufficient.
>
> Osoto [guruma] is good. Uki waza, **maybe do another one for the analogy.** Yoko wakare, **definitely do another one for the analogy.** Yoko guruma is great. Yoko gake, **the throw image doesn't make sense, use another one.** Sumi otoshi is pretty good. Ura nage, use another one. Ushiro goshi, **use another analogy image.** And for ura nage, **I meant do another analogy image.**
>
> **All in all, these are very good.**

## Feedback items

Every item is one image. **Components** for every analogy item are the same three things: the technique's `image_prompt` (and, for new analogies, `analogy_name` / `analogy` / `why_it_maps`) in `data/group-N.json`; the source PNG `images/analogies/{id}.png`; and the derivatives `src/public/img/analogies/{id}.webp` + `{id}-lg.webp` (regenerated with `npm run images` after deleting the old webp). Throw items touch `images/refs/{id}.jpg` (gitignored reference), `images/throws/{id}.png`, and `src/public/img/throws/{id}.webp` + `{id}-lg.webp`. Site copy comes from `src/app/assets/gokyo.json` (`npm run data`).

### 1. Deashi Harai analogy: put the foot on the skateboard

**Timestamp:** 00:11 – 00:25 · **Image:** analogy · **Verdict:** re-render, same concept
**Group file:** `data/group-1.json`
**Screenshot:** [deashi-harai](screenshots/0014_deashi-harai.jpg)

> "notice that the skateboard is like not attached to the person's leg. I see what you're trying to illustrate, but I'd rather just have the person like stepping on it and kind of slipping."

The current prompt deliberately composes "the gap between the sliding foot and the falling body" as the focus. Kyle wants the opposite: the foot planted on the board as it scoots out. Rewrite the prompt so the sneaker is on the deck, board shooting forward, body dropping behind it.

### 2. Sasae Tsurikomi Ashi analogy: make the trip legible

**Timestamp:** 00:32 – 00:45 · **Image:** analogy · **Verdict:** re-render, same concept (prompt rewrite)
**Group file:** `data/group-1.json`
**Screenshot:** [sasae-tsurikomi-ashi](screenshots/0030_sasae-tsurikomi-ashi.jpg)

> "Maybe redo the analogy for the sase, because it doesn't look like the person was actually tripped. Like the positioning of the two people doesn't make sense, and you can adjust the prompt wherever you need to for that."

Classroom-trip concept is fine; the render doesn't show the outstretched foot actually blocking the walker's ankle. Prompt needs the seated kid's foot clearly across the aisle in contact with the walker's shin, and the walker pitching over that point.

### 3. Seoi Nage analogy: kid closer to the carrier (minor)

**Timestamp:** 00:52 – 01:02 · **Image:** analogy · **Verdict:** minor, optional re-render
**Group file:** `data/group-1.json`
**Screenshot:** [seoi-nage](screenshots/0052_seoi-nage.jpg)

> "Maybe the kid shouldn't be so far away from the mom. I don't know if he would get hurled that far, but it's not terrible."

Lowest priority. If re-rolling, constrain the kid to be just past the carrier's shoulder, not sailing across the yard.

### 4. O Goshi analogy: fix the passenger's body

**Timestamp:** 01:06 – 01:16 · **Image:** analogy · **Verdict:** re-render, same concept
**Group file:** `data/group-1.json`
**Screenshot:** [o-goshi](screenshots/0106_o-goshi.jpg)

> "the little kid getting dumped out of the wheelbarrow, his legs and body positioning don't make sense. It's almost like his upper body is spun 180 degrees."

Anatomy failure, not a concept problem. Re-roll with an explicit "body intact, head and hips facing the same way, rolling forward over the front lip" constraint.

### 5. Osoto Gari analogy: replace the broom-under-chair scene

**Timestamp:** 01:17 – 01:33 · **Image:** analogy · **Verdict:** new analogy
**Group file:** `data/group-1.json`
**Screenshot:** [osoto-gari](screenshots/0118_osoto-gari.jpg)

> "I simply don't like the analogy. A broom sweeping the leg out from under a chair doesn't make sense. There's no real life situation where a broom would be sweeping under a chair that would be tipped back. Maybe just think of something else."

First of three broom rejections (see #12, #15). New concept must show weight already rocked back onto the heel and then the supporting leg reaped from behind. Needs new `analogy_name`, `analogy`, `why_it_maps`, `image_prompt`.

### 6. Tsurikomi Goshi analogy: water must pour over the rim

**Timestamp:** 01:43 – 02:00 · **Image:** analogy · **Verdict:** re-render; fall back to new analogy
**Group file:** `data/group-2.json`
**Screenshot:** [tsurikomi-goshi](screenshots/0144_tsurikomi-goshi.jpg)

> "The bucket is being pulled up, but the water is spilling in the opposite direction, not over. If that's hard, try to render it a few more times. If it's difficult, just use another analogy."

Physics is wrong: the bucket tips over the rim so water should pour over the far side. Try several re-rolls with an explicit pour direction; if the model keeps getting it wrong, swap the concept.

### 7. Uchi Mata analogy: barrier arm under the thigh, not the crotch

**Timestamp:** 02:01 – 02:10 · **Image:** analogy · **Verdict:** re-render, same concept
**Group file:** `data/group-2.json`
**Screenshot:** [uchi-mata](screenshots/0202_uchi-mata.jpg)

> "the turnstile thing is going up into the guy's crotch, not in their leg."

("Turnstile thing" = the parking-barrier arm; O Guruma's actual turnstile is praised at 04:13.) Prompt should place the arm under one inner thigh, offset to one side, lifting that leg.

### 8. Harai Goshi analogy: replace the broom-over-the-wall scene

**Timestamp:** 02:11 – 02:25 · **Image:** analogy · **Verdict:** new analogy
**Group file:** `data/group-2.json`
**Screenshot:** [harai-goshi](screenshots/0212_harai-goshi.jpg)

> "again, a broom wouldn't be sweeping a person's leg in that situation. Something else could be lifting their body up, but yeah, the broom just doesn't make sense. It's also weirdly touching the guy's body."

Second broom rejection. Kyle's hint: "something else could be lifting their body up." New concept must show the torso committed over a hip-height pivot while something sweeps the legs up from behind.

### 9. Ashi Guruma analogy: fix the kid's body positioning

**Timestamp:** 02:45 – 02:52 · **Image:** analogy · **Verdict:** re-render, same concept, several rolls
**Group file:** `data/group-3.json`
**Screenshot:** [ashi-guruma](screenshots/0246_ashi-guruma.jpg)

> "could be a little bit better. Maybe just try a few more of them. The kid's body positioning doesn't make sense."

Chain-fence concept stays. Roll several candidates with anatomy constraints; the kid's shins should be against the chain with the body rotating over it.

### 10. Kata Guruma analogy: could be better

**Timestamp:** 02:53 – 03:00 · **Image:** analogy (medium confidence) · **Verdict:** re-render, same concept
**Group file:** `data/group-3.json`
**Screenshot:** [kata-guruma](screenshots/0254_kata-guruma.jpg)

> "Kata guruma could be better."

The grain-sack analogy was on screen for the whole remark and he never inspected the throw (which was re-rolled in `b8af7a4` two days ago). Treat as analogy re-roll; confirm with Kyle if candidates don't land.

### 11. Tai Otoshi throw: redo

**Timestamp:** 03:01 – 03:08 · **Image:** throw · **Verdict:** redo throw
**Files:** `images/refs/tai-otoshi.jpg`, `images/throws/tai-otoshi.png`
**Screenshot:** [tai-otoshi throw](screenshots/0304_tai-otoshi.jpg)

> "Going back to tai otoshi, the actual throw image doesn't look good. Redo the tai otoshi throw."

Verified: he scrolled back up to Dai Nikyo and parked under the Tai Otoshi label with the throw showing. The current render is a single tangled figure; the second athlete is missing. Per `GENERATING.md`, a merged/missing figure usually means the reference is the problem: hunt a cleaner side-view reference (competition photo or the Commons M2012 illustration) and re-roll. The analogy (dog and bench) is explicitly praised at 02:26 and must not change.

### 12. Harai Tsurikomi Ashi analogy: replace the broom-and-marionette scene

**Timestamp:** 03:10 – 03:23 · **Image:** analogy · **Verdict:** new analogy
**Group file:** `data/group-3.json`
**Screenshot:** [harai-tsurikomi-ashi](screenshots/0314_harai-tsurikomi-ashi.jpg)

> "again, that broom doing the sweeping of the legs of the marionette, I think we could just use a better analogy for harai sumikomi ashi."

Third broom rejection. New concept: something held up/suspended from above while its feet are swept sideways before they can land.

### 13. Hane Goshi analogy: replace the seesaw scene

**Timestamp:** 03:24 – 03:28 · **Image:** analogy · **Verdict:** new analogy
**Group file:** `data/group-3.json`
**Screenshot:** [hane-goshi](screenshots/0324_hane-goshi.jpg)

> "Hanegoshi, use another analogy."

No reason given. The mechanic is a coiled leg pressed across the thighs that springs straight ("hane" = spring), bouncing uke up off it. New concept should keep the spring/bounce idea.

### 14. Sumi Gaeshi analogy: reverse the kid's flight direction

**Timestamp:** 03:29 – 03:37 · **Image:** analogy · **Verdict:** re-render, same concept
**Group file:** `data/group-4.json`
**Screenshot:** [sumi-gaeshi](screenshots/0328_sumi-gaeshi.jpg)

> "the kid is being thrown forward as opposed to backwards with the airplane game, so do the analogy again."

The kid should sail back over the parent's head (following the parent's backward roll), not out in front. Prompt must state the direction explicitly. Note tomoe-nage (#23, kept) also uses the airplane game; if the two renders end up near-identical, consider whether sumi-gaeshi should be a distinct scene.

### 15. Tani Otoshi throw: redo

**Timestamp:** 03:38 – 03:45 · **Image:** throw · **Verdict:** redo throw
**Files:** `images/refs/tani-otoshi.jpg`, `images/throws/tani-otoshi.png`
**Screenshot:** [tani-otoshi throw](screenshots/0340_tani-otoshi.jpg)

> "[Tani] otoshi doesn't look like the throw, so fix the throw with [tani] otoshi."

Whisper heard "tai otoshi" but only Dai Yonkyo is on screen and the cursor is under the Tani Otoshi label. Current render reads as two seated figures, not a straight leg behind both heels with a backward drop. Find a better reference and re-roll.

### 16. Tani Otoshi analogy: fix the kids' positioning

**Timestamp:** 03:46 – 03:50 · **Image:** analogy · **Verdict:** re-render, same concept
**Group file:** `data/group-4.json`
**Screenshot:** [tani-otoshi analogy](screenshots/0346_tani-otoshi.jpg)

> "And the positioning of the kids with the push could be better."

Crouching-friend prank stays. Kneeler must be directly behind the heels, faller tipping straight back over them, pusher in front.

### 17. Sukui Nage analogy: try another concept

**Timestamp:** 03:56 – 03:59 · **Image:** analogy · **Verdict:** new analogy (low priority)
**Group file:** `data/group-4.json`
**Screenshot:** [sukui-nage](screenshots/0354_sukui-nage.jpg)

> "Sukuinage is pretty good, maybe try to think of another one for that."

Snowman-on-shovel is "pretty good"; he wants to see an alternative. Mechanic: arms dive under the hips and scoop up so the base leaves the floor and the top-heavy body tips backward.

### 18. Uki Otoshi analogy: bull should tumble, not nosedive

**Timestamp:** 04:00 – 04:10 · **Image:** analogy · **Verdict:** re-render, same concept
**Group file:** `data/group-4.json`
**Screenshot:** [uki-otoshi](screenshots/0402_uki-otoshi.jpg)

> "the bull is kind of like crashing down like a missile into the ground and it's not a realistic like bullfighting situation."

Matador/cape concept praised ("very good"). Re-roll with the bull stumbling/somersaulting past the kneeling matador, front legs buckled, not diving vertically.

### 19. Utsuri Goshi analogy: generate an alternative to compare

**Timestamp:** 04:15 – 04:24 · **Image:** analogy · **Verdict:** new analogy, present side by side
**Group file:** `data/group-4.json`
**Screenshot:** [utsuri-goshi](screenshots/0416_utsuri-goshi.jpg)

> "utsuri goshi is pretty good, maybe try another one and just present it and see, but I think that's not sufficient."

Explicit ask to present a candidate against the current trampoline scene rather than replace outright. Mechanic: hoisted in the air by a rear bear-hug, then hips swapped underneath while floating.

### 20. Uki Waza analogy: try another (maybe)

**Timestamp:** 04:26 – 04:30 · **Image:** analogy · **Verdict:** new analogy (soft)
**Group file:** `data/group-5.json`
**Screenshot:** [uki-waza](screenshots/0428_uki-waza.jpg)

> "ukiwaza, maybe do another one for the analogy"

Softer than #21. Present alongside the current tripwire scene.

### 21. Yoko Wakare analogy: definitely replace

**Timestamp:** 04:31 – 04:36 · **Image:** analogy · **Verdict:** new analogy
**Group file:** `data/group-5.json`
**Screenshot:** [yoko-wakare](screenshots/0434_yoko-wakare.jpg)

> "yokowakare definitely do another one for the analogy"

Folding-table concept out. Mechanic: the thing you're leaning on vanishes sideways, legs stretched across in front of your feet, and you're yanked forward and down.

### 22. Yoko Gake throw: redo

**Timestamp:** 04:38 – 04:45 · **Image:** throw · **Verdict:** redo throw
**Files:** `images/refs/yoko-gake.jpg` (or none), `images/throws/yoko-gake.png`
**Screenshot:** [yoko-gake throw](screenshots/0443_yoko-gake.jpg)

> "yokogake, the throw image doesn't make sense, use another one"

He deliberately un-hovered the card to look at the throw. `GENERATING.md` notes yoko-gake already had its reference dropped in favor of a positional text prompt because Gemini kept merging the athletes; the current result still doesn't read. Options: a new reference photo, or a tighter positional description (tori's sole against the outside of uke's ankle, tori falling to their side, uke flat and airborne sideways).

### 23. Ura Nage analogy: replace the catapult

**Timestamp:** 04:47 – 05:03 · **Image:** analogy · **Verdict:** new analogy
**Group file:** `data/group-5.json`
**Screenshot:** [ura-nage](screenshots/0452_ura-nage.jpg), [clarification](screenshots/0500_ura-nage.jpg)

> "uranage, use another one […] and for uranage, I meant do another analogy image."

Explicitly the analogy, not the throw. Mechanic: bear-hug, hips under, arch backward like a drawn bow, uke thrown up and over the shoulder to land behind.

### 24. Ushiro Goshi analogy: replace the rodeo bull

**Timestamp:** 04:50 – 04:57 · **Image:** analogy · **Verdict:** new analogy
**Group file:** `data/group-5.json`
**Screenshot:** [ushiro-goshi](screenshots/0456_ushiro-goshi.jpg)

> "[ushiro] goshi, use another analogy image"

Whisper heard "utsuri goshi" but Utsuri Goshi (#19) is scrolled off screen and the cursor is on the Ushiro Goshi card. Mechanic: lifted straight up from behind on the hips, then the platform is pulled away so uke drops flat.

## Kept as-is (explicit approvals)

Hiza Guruma, Uki Goshi, Ouchi Gari, Kosoto Gari, Kouchi Gari ("kind of the same thing, that's actually fine"), Koshi Guruma, **Tai Otoshi analogy** ("incredible, don't change a thing"), Okuri Ashi Harai, Kosoto Gake ("great"), Tsuri Goshi, Yoko Otoshi, Tomoe Nage, **Hane Makikomi** ("perfect"), Soto Makikomi, O Guruma ("very good"), Osoto Guruma, Yoko Guruma ("great"), Sumi Otoshi. Deashi Harai's throw ("looks good") and every other throw not named in #11/#15/#22 are implicitly kept.

## Out of scope / parking lot

- No UI, layout, hover, or modal feedback. The detail modal was never opened.
- Broom pattern: three of the ten rejected analogies (Osoto Gari, Harai Goshi, Harai Tsurikomi Ashi) were rejected for the same reason: "a broom wouldn't be sweeping a person's leg." Treat "broom as the sweeping agent" as a banned device when brainstorming replacements.
- Airplane-game duplication (Tomoe Nage kept, Sumi Gaeshi re-render): worth a look once the Sumi Gaeshi candidates exist.
