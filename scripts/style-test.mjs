#!/usr/bin/env node
// Fan out the style-test grid: 6 styles x {throw,analogy} x {openai,google}.
// Skips files that already exist (>20KB), retries each failure once.
import { readFileSync, existsSync, statSync } from 'node:fs'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const run = promisify(execFile)
const MODELS = { openai: 'openai/gpt-image-2', google: 'google/gemini-3.1-flash-image' }
const { styles, test_subject } = JSON.parse(readFileSync('data/styles.json', 'utf8'))
const scenes = { throw: test_subject.throw_prompt, analogy: test_subject.analogy_prompt }

const jobs = []
for (const s of styles)
  for (const [scene, scenePrompt] of Object.entries(scenes))
    for (const [prov, model] of Object.entries(MODELS))
      jobs.push({ model, out: `images/style-test/${s.id}-${scene}-${prov}.png`, prompt: `${scenePrompt}, ${s.style_prompt}` })

const done = j => existsSync(j.out) && statSync(j.out).size > 20 * 1024
const failures = []

async function work(queue) {
  for (;;) {
    const j = queue.shift()
    if (!j) return
    if (done(j)) { console.log(`skip ${j.out}`); continue }
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        await run('node', ['scripts/generate.mjs', j.model, j.out, j.prompt], { timeout: 300000 })
        console.log(`ok   ${j.out}`)
        break
      } catch (e) {
        if (attempt === 2) { failures.push({ out: j.out, err: String(e).slice(0, 300) }); console.log(`FAIL ${j.out}`) }
      }
    }
  }
}

const queue = [...jobs]
await Promise.all(Array.from({ length: 6 }, () => work(queue)))
console.log(`\n${jobs.filter(done).length}/${jobs.length} complete`)
for (const f of failures) console.log(`FAILED: ${f.out}\n  ${f.err}`)
