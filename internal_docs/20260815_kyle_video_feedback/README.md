# Kyle Video Feedback — August 15, 2026

Kyle recorded a 5-minute screen walkthrough of the Gokyo poster site (`localhost:3000`, grid view) on Saturday, August 15, 2026 at ~7:34 PM, hovering every card and calling out which throw and analogy images don't read. All 40 techniques were mentioned. This folder is the transcript, the aligned screenshots, the itemized feedback, and the regeneration plan.

**Source video:** `~/Desktop/Screen Recording 2026-08-15 at 7.34.16 PM.mov` (copied here as `source.mov`, gitignored)

## Files

| File | What it is |
|------|------------|
| `feedback_summary.md` | Cleaned transcript + 24 numbered image items with timestamps, verdicts, group files, and screenshot links |
| `implementation_plan.md` | The regeneration plan: buckets, candidate counts, cost, sprints, open decisions |
| `alignment.json` | Per-mention alignment evidence: technique id, throw vs analogy, cursor/screen notes, confidence |
| `technique_order.txt` | The 40 techniques in poster order with analogy names (used for alignment) |
| `transcript.md` | whisper-1 segment transcript, `[mm:ss]` prefixed |
| `transcript_raw.json` | Raw whisper-1 verbose_json response |
| `audio.mp3` | Extracted audio (16 kHz mono) |
| `screenshots/` | 43 frames, `mmss_<technique-id>.jpg`, one per mention |
| `candidates.html` | **Review page**: current image + all surviving candidates per technique, radio picks, JSON export. Rebuild with `node scripts/candidates-page.mjs internal_docs/20260815_kyle_video_feedback internal_docs/20260815_kyle_video_feedback/manifest_*.json` |
| `candidates/` | 89 candidate PNGs (gitignored), `<id>/<kind>-<label>-<n>.png` |
| `concepts.md` | Brainstorm + data-ready fields (`analogy_name`, `analogy`, `why_it_maps`, `image_prompt`) for the 10 new-concept analogies |
| `manifest_analogies.json`, `manifest_throws.json` | Inputs to `scripts/candidates.mjs` (prompts per candidate) |
| `analogies_qa.md`, `throws_qa.md` | What was rendered, what was cut and why, agent's top pick per technique |
| `agent_picks.json`, `agent_picks_round2.json` | The starred picks shown on the review pages |
| `candidates_round2.html`, `manifest_round2.json`, `concepts_round2.md` | Round 2 (sumi-gaeshi, ashi-guruma, tani-otoshi analogy, uchi-mata new concept) |
| `picks_round1.json`, `picks_round2.json` | Kyle's picks, as fed to `scripts/promote.mjs` |
| `source.mov` | The recording (gitignored) |

## Headline takeaways

- **The site is fine; the images are the work.** No comments on layout, hover, or the modal. Overall verdict: "All in all, these are very good."
- **24 images to replace across 21 techniques**: 3 throws (tai-otoshi, tani-otoshi, yoko-gake), 11 analogy re-renders where the concept stays but the render breaks physics or anatomy, 10 analogies that need a new concept.
- **Brooms don't work.** Three of the ten rejected concepts were rejected for the identical reason ("a broom wouldn't be sweeping a person's leg"). Ban the device.
- **Precision of direction is the recurring render bug**: water pouring the wrong way, kid flying the wrong way, barrier arm in the wrong place, bull nosediving. Prompts need the physical direction stated explicitly.
- **Whisper is not to be trusted on technique names.** Two "tai otoshi"s were tai-otoshi (throw) and tani-otoshi; "utsuri goshi" at 04:50 was ushiro-goshi; "ukigoshi" at 04:00 was uki-otoshi. Every mapping was checked against the frame.

## Outcome

20 of 24 images replaced on 2026-08-15 across two candidate rounds (114 renders, ~$22). Not replaced, by Kyle's choice at pick time: deashi-harai, sasae-tsurikomi-ashi, yoko-wakare, utsuri-goshi.

## Targeted close: 2026-08-22 (closed 2026-08-15)
