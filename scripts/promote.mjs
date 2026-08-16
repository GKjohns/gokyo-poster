#!/usr/bin/env node
// Promote picked candidates into the project: copy PNGs into images/, write the winning
// prompt (and, for new concepts, name/analogy/why from concepts.md) into data/group-N.json,
// copy the throw ref used, and delete stale webps so `npm run images` regenerates them.
// Usage: node scripts/promote.mjs <feedbackDir> <picks.json>
//   picks.json = { "<id>:<throw|analogy>": "<candidate filename>", ... }  ("__keep__" entries ignored)
import { readFileSync, writeFileSync, copyFileSync, existsSync, unlinkSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const [dir, picksPath] = process.argv.slice(2)
if (!dir || !picksPath) { console.error('usage: promote.mjs <feedbackDir> <picks.json>'); process.exit(1) }
const picks = JSON.parse(readFileSync(picksPath, 'utf8'))
const manifest = readdirSync(dir).filter(f => /^manifest.*\.json$/.test(f))
  .flatMap(f => JSON.parse(readFileSync(join(dir, f), 'utf8')))
const concepts = readdirSync(dir).filter(f => /^concepts.*\.md$/.test(f))
  .map(f => readFileSync(join(dir, f), 'utf8')).join('\n')

const base = JSON.parse(readFileSync('data/techniques.json', 'utf8'))
const groupOf = {}
for (const g of base.groups) for (const t of g.techniques) groupOf[t.id] = g.id
const groups = {}
const group = n => groups[n] ||= JSON.parse(readFileSync(`data/group-${n}.json`, 'utf8'))

// Pull the four data fields for a concept slug out of concepts.md (section header contains `slug`).
function conceptFields(slug) {
  const re = new RegExp('^###[^\\n]*`' + slug.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&') + '`[^\\n]*\\n([\\s\\S]*?)(?=^### |^## |^---\\s*$|(?![\\s\\S]))', 'm')
  const m = concepts.match(re)
  if (!m) return null
  const body = m[1]
  const field = k => body.match(new RegExp('\\*\\*' + k + ':\\*\\*\\s*`([^`]+)`'))?.[1]
  return { analogy_name: field('analogy_name'), analogy: field('analogy'), why_it_maps: field('why_it_maps') }
}

const changed = new Set()
for (const [key, file] of Object.entries(picks)) {
  if (!file || file === '__keep__') continue
  const [id, kind] = key.split(':')
  const src = join(dir, 'candidates', id, file)
  if (!existsSync(src)) { console.error(`missing candidate ${src}`); process.exit(1) }
  const label = file.replace(/^(throw|analogy)-/, '').replace(/-\d+\.png$/, '')
  const entry = manifest.find(e => e.id === id && e.kind === kind && e.label === label)
  if (!entry) { console.error(`no manifest entry for ${id} ${kind} ${label}`); process.exit(1) }

  if (kind === 'throw') {
    copyFileSync(src, `images/throws/${id}.png`)
    if (entry.ref) copyFileSync(entry.ref, `images/refs/${id}.jpg`)
    console.log(`throw    ${id} <- ${file}${entry.ref ? ` (ref ${entry.ref} -> images/refs/${id}.jpg)` : ' (text-only)'}`)
  } else {
    copyFileSync(src, `images/analogies/${id}.png`)
    const g = group(groupOf[id])
    const t = g.techniques.find(x => x.id === id)
    t.image_prompt = entry.prompt.replace(/\s+/g, ' ').trim()
    const isFix = /^(r\d+-)?(fix|closer|airplane|chain|prank)/.test(label)
    let note = 'prompt updated'
    if (!isFix) {
      const bare = label.replace(/^r\d+-/, '')
      const f = conceptFields(label) || conceptFields(bare) || conceptFields(bare.replace(/\d+$/, ''))
      if (f?.analogy_name) { Object.assign(t, f); note = `new concept "${f.analogy_name}"` }
      else note = 'WARNING: new-concept label but no fields found in concepts.md; only image_prompt updated'
    }
    console.log(`analogy  ${id} <- ${file} (${note})`)
  }
  changed.add(`${kind}s/${id}`)
  for (const suf of ['', '-lg']) { const w = `src/public/img/${kind === 'throw' ? 'throws' : 'analogies'}/${id}${suf}.webp`; if (existsSync(w)) unlinkSync(w) }
}
for (const [n, g] of Object.entries(groups)) writeFileSync(`data/group-${n}.json`, JSON.stringify(g, null, 2) + '\n')
console.log(`\n${changed.size} images promoted; ${Object.keys(groups).length} group files rewritten. Next: cd src && npm run images && npm run data; node build.mjs`)
