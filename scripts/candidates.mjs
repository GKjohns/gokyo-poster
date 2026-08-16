#!/usr/bin/env node
// Candidate runner: roll N variants per manifest entry for side-by-side review.
// Usage: AI_GATEWAY_API_KEY=... node scripts/candidates.mjs <manifest.json> <outDir> [--n 3] [--only id,id] [--dry-run]
//
// manifest.json = [{ id, kind: "throw"|"analogy", label, model?, prompt, ref?, n? }]
//   - prompt is the SCENE prompt; the chosen style prompt from data/styles.json is appended
//   - throws default to the chosen throw model (+ ref image); analogies to the chosen analogy model
//   - output: <outDir>/<id>/<kind>-<label>-<n>.png ; existing outputs are skipped
// Retries once, concurrency 4. Prints a JSON summary of failures at the end.
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { join } from 'node:path'

const run = promisify(execFile)
const argv = process.argv.slice(2)
const [manifestPath, outDir] = argv
if (!manifestPath || !outDir) { console.error('usage: candidates.mjs <manifest.json> <outDir> [--n 3] [--only id,id] [--dry-run]'); process.exit(1) }
const flag = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null }
const N = Number(flag('--n') || 3)
const only = flag('--only')?.split(',')
const dry = argv.includes('--dry-run')

const styles = JSON.parse(readFileSync('data/styles.json', 'utf8'))
const stylePrompt = styles.styles.find(s => s.id === styles.chosen.style).style_prompt
const QA = 'Black ink only with gray wash, no other color except one small letterless red seal; artwork fills the frame edge to edge with no border or photographed paper edge; every figure complete and distinct with correct anatomy.'

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')).filter(m => !only || only.includes(m.id))
const jobs = []
for (const m of manifest) {
  const model = m.model || (m.kind === 'throw' ? styles.chosen.throw.model : styles.chosen.analogy.model)
  const n = m.n || N
  for (let i = 1; i <= n; i++) {
    const out = join(outDir, m.id, `${m.kind}-${m.label}-${i}.png`)
    const args = [model, out]
    if (m.ref) args.push('--ref', m.ref)
    args.push(`${m.prompt} ${QA} Style: ${stylePrompt}`)
    jobs.push({ out, args, id: m.id, label: m.label })
  }
}

const queue = jobs.filter(j => !(existsSync(j.out) && statSync(j.out).size > 20 * 1024))
console.log(`${jobs.length} candidates in manifest, ${queue.length} to generate`)
if (dry) { for (const j of queue) console.log(j.out, '::', j.args.at(-1).slice(0, 120)); process.exit(0) }

const failures = []
async function worker() {
  while (queue.length) {
    const job = queue.shift()
    mkdirSync(join(outDir, job.id), { recursive: true })
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
await Promise.all(Array.from({ length: 4 }, worker))
const bad = jobs.filter(j => !existsSync(j.out) || statSync(j.out).size < 20 * 1024)
console.log(`\ndone: ${jobs.length - bad.length}/${jobs.length} ok`)
if (failures.length) console.log(JSON.stringify(failures, null, 2))
process.exit(bad.length ? 1 : 0)
