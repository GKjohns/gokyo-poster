#!/usr/bin/env node
// Round-2 style test: 6 styles x {throwname, throwref, analogy} x {openai, google}.
// throwref: google gets the real reference photo; the gateway has no image-input
// path for gpt-image-2, so openai gets a precise positional description instead.
// Skips files that already exist (>20KB), retries each failure once.
import { readFileSync, existsSync, statSync } from 'node:fs'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const run = promisify(execFile)
const MODELS = { openai: 'openai/gpt-image-2', google: 'google/gemini-3.1-flash-image' }
const REF = 'images/refs/tai-otoshi-b.jpg'
const { styles, test_subject } = JSON.parse(readFileSync('data/styles.json', 'utf8'))

const REF_REDRAW = "Re-draw the judo throw in this photograph (Tai Otoshi) keeping the two athletes' precise body positions, grips, stance width, and the extended low blocking leg exactly as shown, but as a finished standalone artwork with no background"
const REF_DESCRIBED = "Two judoka captured mid Tai Otoshi, exact positions: tori in white judogi with black belt has spun in with his back to his opponent, knees deeply bent in a wide low stance, torso twisted forward-left; his right leg is extended straight and low across the front of the opponent's right shin, foot planted just outside the opponent's right foot; his right hand grips the opponent's blue lapel high at the collar with elbow driven up, his left hand pulls the opponent's right sleeve down across his own chest toward his left hip; the opponent in blue judogi is close against tori's back, pitched up onto his toes, weight spilling forward over the extended blocking leg, about to pitch over it; clean side view, figures large in frame, no background detail"

const jobs = []
for (const s of styles) {
  for (const [prov, model] of Object.entries(MODELS)) {
    const out = v => `images/style-test-v2/${s.id}-${v}-${prov}.png`
    jobs.push({ model, out: out('throwname'), prompt: `${test_subject.throw_name_prompt}, ${s.style_prompt}` })
    jobs.push(prov === 'google'
      ? { model, out: out('throwref'), ref: REF, prompt: `${REF_REDRAW}, rendered as: ${s.style_prompt}` }
      : { model, out: out('throwref'), prompt: `${REF_DESCRIBED}, ${s.style_prompt}` })
    jobs.push({ model, out: out('analogy'), prompt: `${test_subject.analogy_prompt}, ${s.style_prompt}` })
  }
}

const done = j => existsSync(j.out) && statSync(j.out).size > 20 * 1024
const failures = []

async function work(queue) {
  for (;;) {
    const j = queue.shift()
    if (!j) return
    if (done(j)) { console.log(`skip ${j.out}`); continue }
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const args = ['scripts/generate.mjs', j.model, j.out, ...(j.ref ? ['--ref', j.ref] : []), j.prompt]
        await run('node', args, { timeout: 300000 })
        console.log(`ok   ${j.out}`)
        break
      } catch (e) {
        if (attempt === 2) { failures.push({ out: j.out, err: String(e).slice(0, 300) }); console.log(`FAIL ${j.out}`) }
      }
    }
  }
}

const queue = [...jobs]
await Promise.all(Array.from({ length: 4 }, () => work(queue)))
console.log(`\n${jobs.filter(done).length}/${jobs.length} complete`)
for (const f of failures) console.log(`FAILED: ${f.out}\n  ${f.err}`)
