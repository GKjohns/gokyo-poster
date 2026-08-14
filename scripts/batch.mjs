#!/usr/bin/env node
// Production batch runner: for each technique id, generate the throw image
// (google + reference photo at images/refs/{id}.jpg) and the analogy image
// (openai, text-only). Skips outputs that already exist; retries once.
// Usage: AI_GATEWAY_API_KEY=... node scripts/batch.mjs <id> [<id> ...]
import { readFileSync, existsSync, statSync } from 'node:fs'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const run = promisify(execFile)
const ids = process.argv.slice(2)
if (!ids.length) { console.error('usage: batch.mjs <technique-id> ...'); process.exit(1) }

const styles = JSON.parse(readFileSync('data/styles.json', 'utf8'))
const stylePrompt = styles.styles.find(s => s.id === styles.chosen.style).style_prompt
const base = JSON.parse(readFileSync('data/techniques.json', 'utf8'))

const lookup = {}
for (const g of base.groups) {
  const analogies = JSON.parse(readFileSync(`data/group-${g.id}.json`, 'utf8'))
  for (const t of g.techniques) {
    const a = analogies.techniques.find(x => x.id === t.id)
    lookup[t.id] = { name: t.romaji, image_prompt: a.image_prompt }
  }
}

const jobs = []
for (const id of ids) {
  const t = lookup[id]
  if (!t) { console.error(`unknown technique id: ${id}`); process.exit(1) }
  const ref = `images/refs/${id}.jpg`
  if (!existsSync(ref)) { console.error(`missing reference photo: ${ref}`); process.exit(1) }
  jobs.push({
    out: `images/throws/${id}.png`,
    args: [styles.chosen.throw.model, `images/throws/${id}.png`, '--ref', ref,
      `Re-draw this exact judo throw (${t.name}) — keep the two athletes' precise body positions, grips, and the key blocking/sweeping action — as: ${stylePrompt}`],
  })
  jobs.push({
    out: `images/analogies/${id}.png`,
    args: [styles.chosen.analogy.model, `images/analogies/${id}.png`,
      `${t.image_prompt}, ${stylePrompt}`],
  })
}

const CONCURRENCY = 4
let failures = []
const queue = jobs.filter(j => {
  if (existsSync(j.out) && statSync(j.out).size > 20 * 1024) { console.log(`skip ${j.out}`); return false }
  return true
})

async function worker() {
  while (queue.length) {
    const job = queue.shift()
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const { stdout } = await run('node', ['scripts/generate.mjs', ...job.args], { timeout: 300000 })
        process.stdout.write(stdout)
        break
      } catch (e) {
        if (attempt === 2) { failures.push({ out: job.out, error: String(e.message).slice(0, 300) }); console.error(`FAIL ${job.out}`) }
        else console.error(`retry ${job.out}`)
      }
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker))

const bad = jobs.filter(j => !existsSync(j.out) || statSync(j.out).size < 20 * 1024)
console.log(`\ndone: ${jobs.length - bad.length}/${jobs.length} ok`)
if (failures.length) console.log(JSON.stringify(failures, null, 2))
process.exit(bad.length ? 1 : 0)
