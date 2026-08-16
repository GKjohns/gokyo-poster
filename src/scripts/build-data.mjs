// Merge repo-root data (techniques + per-group analogies) into app/assets/gokyo.json.
// Rerun after editing data/group-*.json: npm run data
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const base = JSON.parse(readFileSync(join(root, 'data/techniques.json'), 'utf8'))

const groups = base.groups.map((group) => {
  const analogies = JSON.parse(readFileSync(join(root, `data/group-${group.id}.json`), 'utf8'))
  const byId = Object.fromEntries(analogies.techniques.map(t => [t.id, t]))
  const missing = group.techniques.filter(t => !byId[t.id]).map(t => t.id)
  if (missing.length) throw new Error(`group ${group.id} missing analogies: ${missing.join(', ')}`)
  return { ...group, techniques: group.techniques.map(t => ({ ...t, ...byId[t.id] })) }
})

const out = join(root, 'src/app/assets/gokyo.json')
writeFileSync(out, JSON.stringify({ groups }, null, 2))
console.log(`wrote ${out} — ${groups.reduce((n, g) => n + g.techniques.length, 0)} techniques`)
