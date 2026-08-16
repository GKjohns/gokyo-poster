# Analogy candidates: QA pass

Every analogy render in `candidates/{id}/analogy-*.png` was viewed at 700px and judged on
(a) render integrity (complete, coherent figures; black ink + gray wash + one letterless red
seal; no border; fills the frame) and (b) mechanic fidelity against the prompt and against
the reviewer's specific objection in `feedback_summary.md`. Failures were deleted. Buckets
that dropped below 2 survivors were re-rolled (bumped `n`, or a rewritten `fix2` prompt when
the miss was systematic). Prompts for every label, including the `fix2` rewrites, are in
`manifest_analogies.json`.

Totals: 68 initial renders, 11 cut from the first batch; 2 re-roll rounds, 18 extra renders
(16 + 2), 4 of those cut; 71 survivors on disk. Note: the manifest still lists the original `n` for buckets
whose slots were deleted (e.g. `seoi-nage closer` n=3 with only 1 and 3 on disk), so a bare
re-run of `candidates.mjs` on the full manifest would regenerate the deleted slots. Use `--only`
or a trimmed run manifest.

Seal note: every render's red seal carries small squiggle marks that read as pseudo-characters
at 1024px. That is the house style across the whole set (throws included), so it was not treated
as a fail. None had actual readable text or a signature.

## Per technique

### deashi-harai / fix (item 1): 3 of 3 survived
- Top pick: `fix-1`. Sole flat on the deck, board scooting ahead, hips dropping behind it, exactly the "stepping on it and slipping" ask.
- `fix-2`, `fix-3` also good; foot on the board in all three.

### sasae-tsurikomi-ashi / fix (item 2): 3 of 3 survived
- Top pick: `fix-1`. Seated kid's sole against the walker's ankle, walker pitching forward over that point, backpack sells "walking down the aisle".
- `fix-2`, `fix-3` equivalent; contact and forward pitch read in all three.

### o-goshi / fix (item 4): 3 of 3 survived
- Top pick: `fix-2`. Passenger's hips right at the front lip, one continuous forward roll, no twist.
- `fix-1`, `fix-3` fine; all three bodies are anatomically coherent (the reviewer's objection is gone).

### tsurikomi-goshi
- fix (item 6): 3 of 3 survived. Water pours over the FAR rim, away from the hauler, in all three. Top pick: `fix-3` (bucket actually pivoting on the rim). `fix-1`/`fix-2` have the bucket just beyond the rim, still pouring away.
- ball-pit (fallback concept): 2 of 2 survived. Top pick: `ball-pit-1` (child folding over the padded rim, legs up behind). Note the pull reads horizontal rather than up-and-in; keep as backup only.

### uchi-mata / fix + fix2 (item 7): 3 of 5 survived (fix 2/3, fix2 1/2)
- Cut `fix-2`: barrier arm goes straight up under a yukata into the groin. Repeats the objection.
- Cut `fix2-2`: arm terminates at the crotch of the trousers. Repeats the objection.
- Top pick: `fix-3`. Arm ends under the raised leg's thigh (in a gi), hanging leg clearly in front.
- `fix-1`, `fix2-1` borderline: arm ends at the raised thigh but right where the legs meet.
- SYSTEMATIC: in a side view the model always draws the arm between the legs; "offset to one side, one thigh only" was ignored in 5/5, even with a from-behind three-quarter viewpoint. If Kyle still reads these as "into the crotch", the concept needs a swap (something that lifts one leg from the inside without being a bar between the legs is hard to draw side-on).

### ashi-guruma / fix + fix2 (item 9): 4 of 5 survived (fix 2/3, fix2 2/2)
- Cut `fix-2`: chain passes through the child's shoulder/neck; ambiguous where the body is relative to the chain.
- Original `fix` prompt: `fix-1`, `fix-3` have coherent bodies but the child is already flying above the chain, no shin contact (0/3 showed shins on the chain).
- `fix2` rewrite (earlier instant, shins pressed on the chain, not yet airborne) worked 2/2.
- Top pick: `fix2-1`. Shins on the chain, chain bowing, body jackknifing forward over it.

### kata-guruma / fix (item 10): 3 of 3 survived
- Top pick: `fix-3`. Sack across both shoulders, tilted end-over-end, grain pouring into the wagon.
- `fix-1`, `fix-2` fine. All three came out frontal rather than side-on, but the shoulders-as-axle idea reads.

### sumi-gaeshi / fix + fix2 (item 14): 4 of 6 survived (fix 1/3, fix2 3/3)
- Cut `fix-1`, `fix-3`: child launched toward the parent's feet, landing in front. Repeats the objection exactly.
- `fix2` rewrite (explicit left/right layout: head left, cushions far left, child on the left, "nothing beyond the hips on the right") worked 3/3.
- Top pick: `fix2-1`. Parent rolled onto shoulders, child sailing back over the head toward the cushions behind it. `fix-2` is a close second (more air, bigger arc).
- Distinct from tomoe-nage's airplane game: the parent is fully rolled onto the shoulders here.

### tani-otoshi / fix (item 16): 2 of 3 survived
- Cut `fix-2`: faller's feet are on top of the kneeler's back, not behind the heels.
- Top pick: `fix-1`. Kneeler directly behind the heels, faller tipping straight back, pusher in front with palms out.
- `fix-3` same layout, slightly tangled feet.

### uki-otoshi / fix (item 18): 3 of 3 survived
- Top pick: `fix-1`. Bull horizontal, front legs buckled, skidding past the kneeling matador, hind end lifting. No nosedive.
- `fix-3` similar (chest-skid). `fix-2` borderline: hindquarters higher, closer to a 45-degree somersault; keep as the most dynamic option but it is the nearest to the "missile" read.

### seoi-nage / closer (item 3): 2 of 4 survived (1/2 first batch, 1/2 re-roll)
- Cut `closer-2` (first batch): child sliding off the carrier's BACK, not over the shoulder.
- Cut `closer-2` (re-roll): child's legs missing, torso ends at the hip.
- Top pick: `closer-3`. Child rolling right over the carrier's shoulder, head-first, within arm's reach.
- `closer-1` fine (child head-down just in front of the carrier's face).

### osoto-gari (item 5, new concept)
- slide-tackle: 2 of 2 survived. Top pick: `slide-tackle-2` (slider's leg on the standing calf, standing kid falling backward toward the slider). `slide-tackle-1` equivalent.
- runaway-sled: 1 of 4 survived. Cut `sled-1` (first batch) and `sled-1`, `sled-3` (re-roll): sled shoots downhill in FRONT of the child while the body falls the other way, i.e. a banana-peel slip, not a reap. `sled-2` is the only one where sled and body travel the same way.
- SYSTEMATIC: the sled concept fails 3/4 even with an added same-direction clause. Recommend presenting slide-tackle and dropping the sled unless Kyle likes `sled-2` specifically.

### harai-goshi (item 8, new concept)
- leapfrog: 2 of 2 survived. Top pick: `leapfrog-1` (vaulter folded over the crouching back at the beltline, legs up, head down far side).
- vault-boost: 2 of 2 survived. Top pick: `vault-boost-1` (coach lifting the thighs, child's hips on the box edge). Near-identical pair.

### harai-tsurikomi-ashi (item 12, new concept)
- ice-hands: 0 of 2 survived. Cut both: skates flew off the feet (one shows a bare foot). Same "footwear detached from the foot" read Kyle rejected on deashi-harai.
- ice-hands2 (rewrite: skates stay laced on, no loose skates): 2 of 2 survived. Top pick: `ice-hands2-1` (beginner hanging from the joined hands, both skated feet sliding away sideways).
- rope-tow: 2 of 2 kept as borderline: skier hangs from the rope but the skis have popped off the boots in both. Superseded by rope-tow2.
- rope-tow2 (rewrite: skis clipped to boots): 2 of 2 survived. Top pick: `rope-tow2-1`.
- SYSTEMATIC (fixed): the model detaches footwear when told feet "shoot out from under"; an explicit "stays attached, no loose X" clause fixed it 4/4. Overall top pick for the technique: `ice-hands2-1`.

### hane-goshi (item 13, new concept)
- sapling: 2 of 2 survived. Top pick: `sapling-1` (trunk whipping up, child flung forward toward the haystack). Child is small in frame in both.
- spring-rider: 2 of 2 survived. Top pick: `spring-rider-2` (coil visibly extended, child tipping over the handle).

### yoko-wakare (item 21, new concept)
- camel-sits: 2 of 2 survived. Top pick: `camel-sits-1` (traveler diving forward over the flattened camel, hands still on the saddle).
- canoe-slips: 2 of 2 survived. Top pick: `canoe-slips-1` (canoe just off the dock, person pitching over it into the water).

### ura-nage (item 23, new concept)
- leaf-pile-toss: 2 of 2 survived. Top pick: `leaf-pile-toss-1` (adult arched into a bow, kid upside down above and behind the head, heading into the leaves).
- pumpkin-heave: 2 of 2 survived. Top pick: `pumpkin-heave-1`. Both have the farmer's arms reaching forward, which reads slightly like a forward toss; the arc still lands behind.

### ushiro-goshi (item 24, new concept)
- pancake-flip: 2 of 2 kept, both borderline. `pancake-flip-1` has the pan still directly under the pancake (not withdrawn). Top pick: `pancake-flip-2` (pan offset to the side). Lots of empty paper in both; weakest concept in the batch.
- hay-wagon: 2 of 2 survived. Top pick: `hay-wagon-2` (child floating flat on their back, wagon rolled on, pothole visible).

### sukui-nage / forklift (item 17, new concept): 2 of 2 survived
- Top pick: `forklift-2`. Bottom crate visibly lifted off the concrete on the forks, tower tipping backward away from the machine.

### uki-waza / sleeping-cat (item 20, new concept): 2 of 2 survived
- Top pick: `sleeping-cat-1`. Shin against the cat, child in a flat superman glide toward the laundry pile. `sleeping-cat-2` has the cat's tail merging into the child's foot.

### utsuri-goshi (item 19, new concept)
- pizza-peel: 0 of 2 survived. Cut both: the model drew TWO doughs (one spinning in the air, a second already draped on the peel).
- pizza-peel2 (rewrite: "exactly one disc of dough", "do not draw a second disc"): 3 of 3 survived. Top pick: `pizza-peel2-1` (single dough folding over the peel edge, flour column marking the toss). Concept is still fairly static: the "already floating" part is only implied by the flour.

## Systematic failures (concept may need a swap or a different framing)

1. uchi-mata / barrier arm: 5/5 renders put the arm between the legs at the crotch in a side view; the "one thigh, offset to one side" instruction never lands. Best available is `fix-3`; if that still reads wrong to Kyle, swap the concept.
2. osoto-gari / runaway-sled: 3/4 renders show a forward slip (sled in front, body falling opposite). Slide-tackle is the safe pick.
3. ashi-guruma / original fix prompt: 0/3 showed shins on the chain (child already airborne). Fixed by the `fix2` earlier-instant prompt (2/2), so the concept stays.
4. sumi-gaeshi / original fix prompt: 2/3 threw the kid forward. Fixed by the `fix2` explicit left/right composition (3/3).
5. harai-tsurikomi-ashi / ice-hands and rope-tow: 4/4 detached the skates/skis. Fixed by "stays attached" clauses (4/4).
6. utsuri-goshi / pizza-peel: 2/2 drew two doughs. Fixed by "exactly one disc" (3/3).
7. ushiro-goshi / pancake-flip: not a render failure, but both are weak (pan not withdrawn, sparse frame). Hay-wagon is the stronger candidate.

## Round 2 (Kyle rejected round 1 for four techniques)

Prompts in `manifest_round2.json`, review page `candidates_round2.html`, new uchi-mata
concepts in `concepts_round2.md`. 20 renders in the first batch, 2 cut, 5 re-rolled
(one tightened `r2-prank2` prompt plus the two deleted `r2-prank` slots regenerated by
`--only tani-otoshi`), 0 cut from the re-roll. 25 survivors on disk. Every render viewed
at 600px. No integrity failures anywhere in the round (no merged bodies, stray color,
readable text or borders); the only cuts were mechanic misses.

### sumi-gaeshi / r2-airplane-launch + r2-airplane-flight: 6 of 6 survived
- Fix that landed: "BELLY-DOWN like Superman, chest facing the floor, face toward the parent, never on their back" plus the head-left / cushions-far-left layout. 6/6 drew the child prone; the round 1 face-up kid is gone.
- launch (parent's feet still on the hips, child's head already past the parent's head, tilted down toward the cushions): `launch-1`, `launch-2`, `launch-3`. `launch-1` is the flattest and least "launched" (child horizontal, parent has one foot on the rug), keep as the calm option.
- flight (child fully airborne beyond the head, belly-down, gliding to the cushions, parent rolled up with legs over the head): `flight-1`, `flight-2`, `flight-3`, near-identical.
- Top pick: `r2-airplane-launch-2` (feet on the hips, roll started, child head-down toward the cushions behind the head). `r2-airplane-flight-1` if Kyle prefers the full arc.

### ashi-guruma / r2-chain: 4 of 4 survived
- Fix that landed: "frozen at the very first instant, shins pressed on the chain, chain bowing, sneakers just leaving the ground BEHIND the chain, head lower than hips, not yet flying above the chain".
- `chain-3`, `chain-4`: chain drawn crossing in front of both shins and bowing, feet just off the ground behind, hands reaching for the far side. `chain-4` has the head diving lowest.
- `chain-1`, `chain-2`: chain still at the shins but the body is more horizontal and the chain-to-shin contact is less explicit; keep as backups.
- Top pick: `r2-chain-4`.

### tani-otoshi / r2-prank + r2-prank2: 7 of 9 survived (prank 4/6 across two rolls, prank2 3/3)
- Cut first-batch `prank-1`, `prank-2`: the model put the kneeler under the faller's hips with the faller's feet on the FAR side of the kneeler (draped over the back like a bridge), a cousin of the round 1 "standing on the kneeler" miss.
- `prank-3`, `prank-4` (first batch) and the regenerated `prank-1`, `prank-2` all have the right layout: kneeler on the left, faller's shoes on the grass just right of the kneeler's rump, heels against the kneeler, torso at about 45 degrees going backward over the back, pusher close on the right with palms on the chest.
- `prank2` (tightened prompt with an explicit left/right layout and "feet on the ground beside the kneeler, never on top"): 3/3 clean, same layout.
- Top pick: `r2-prank-4` (cleanest heels-caught read, pusher's hands flat on the chest). `r2-prank2-1` and `r2-prank2-3` are equal alternates.

### uchi-mata / r2-dog-stands-up + r2-dolphin-surfaces (new concepts): 6 of 6 survived
- Concept swap (see `concepts_round2.md`): the barrier arm is gone. 12a `dog-stands-up` (stepping over the sleeping hallway dog, it stands up rump-first under the trailing inner thigh) and 12b `dolphin-surfaces` (wading forward, dolphin surfaces under the back leg).
- `dog-stands-up-1`, `dog-stands-up-2`: dog rump high and head low, child's trailing leg straight up with the thigh across the rump, other foot planted beside the dog's shoulder, upper body diving forward over the dog's head. This is the uchi-mata silhouette exactly. `dog-stands-up-3` same pose but the standing leg is hidden behind the dog, so it can read as one-legged; backup only.
- `dolphin-surfaces-1`, `dolphin-surfaces-3`: same geometry in water, standing foot on the sand, leg to the sky, forward dive over the dolphin's head. `dolphin-surfaces-2` has the dolphin's back under the hips rather than one thigh (more "sitting on the dolphin"); backup only.
- Crotch check: in both concepts the lifter is a broad back the child is astride, so it reads as riding, not as a bar poked between the legs. If Kyle still objects to anything under the pelvis in a side view, the dolphin variant hides the contact under the splash better than the dog does.
- Top pick: `r2-dog-stands-up-1`. Second concept pick: `r2-dolphin-surfaces-1`.

### Round 2 systematic notes
1. tani-otoshi: without an explicit left/right layout the model sometimes drapes the faller over the kneeler (2/6 with the r2-prank prompt); the r2-prank2 layout prompt was 3/3. Use the layout phrasing if this is ever re-rolled.
2. sumi-gaeshi: stating the child's orientation twice ("belly-down like Superman", "back facing the ceiling", "never on their back") fixed the face-up kid 6/6.
3. uchi-mata: the animal-back concepts avoid the crotch read that the barrier arm could not; 6/6 usable, no re-roll needed.
