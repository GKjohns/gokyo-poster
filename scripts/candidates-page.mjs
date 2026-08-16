#!/usr/bin/env node
// Build a candidate review page: current image + every candidate per technique, radio picks,
// picks exported as JSON (also persisted in localStorage).
// Usage: node scripts/candidates-page.mjs <feedbackDir> [manifest.json ...] [--only id,id] [--out file.html] [--label-prefix r2-]
//   feedbackDir contains candidates/<id>/<kind>-<label>-<n>.png ; page is written to <feedbackDir>/candidates.html
import { readFileSync, readdirSync, existsSync, writeFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const argv = process.argv.slice(2)
const flag = k => { const i = argv.indexOf(k); return i >= 0 ? argv.splice(i, 2)[1] : null }
const only = flag('--only')?.split(',')      // limit to these technique ids
const outName = flag('--out') || 'candidates.html'
const minRound = flag('--label-prefix')      // only candidates whose label starts with this (e.g. r2-)
const [dir, ...manifests] = argv
if (!dir) { console.error('usage: candidates-page.mjs <feedbackDir> [manifest.json ...]'); process.exit(1) }

const base = JSON.parse(readFileSync('data/techniques.json', 'utf8'))
const info = {}
for (const g of base.groups) {
  const an = JSON.parse(readFileSync(`data/group-${g.id}.json`, 'utf8'))
  for (const t of g.techniques) info[t.id] = { ...t, group: g.name, ...an.techniques.find(x => x.id === t.id) }
}
const picksPath = join(dir, 'agent_picks.json')
const agentPicks = existsSync(picksPath) ? JSON.parse(readFileSync(picksPath, 'utf8')) : {}
const prompts = {}
for (const m of manifests) for (const e of JSON.parse(readFileSync(m, 'utf8'))) prompts[`${e.id}/${e.kind}-${e.label}`] = e.prompt

const candDir = join(dir, 'candidates')
const ids = readdirSync(candDir).filter(d => statSync(join(candDir, d)).isDirectory() && info[d] && (!only || only.includes(d)))
const order = base.groups.flatMap(g => g.techniques.map(t => t.id))
ids.sort((a, b) => order.indexOf(a) - order.indexOf(b))

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
const rel = p => relative(dir, p)
let sections = ''
for (const id of ids) {
  const files = readdirSync(join(candDir, id)).filter(f => f.endsWith('.png')).sort()
  for (const kind of ['throw', 'analogy']) {
    const fs = files.filter(f => f.startsWith(kind + '-') && (!minRound || f.startsWith(`${kind}-${minRound}`)))
    if (!fs.length) continue
    const cur = `images/${kind === 'throw' ? 'throws' : 'analogies'}/${id}.png`
    const t = info[id]
    const key = `${id}:${kind}`
    const cards = fs.map(f => {
      const label = f.replace(/^(throw|analogy)-/, '').replace(/-\d+\.png$/, '')
      const p = prompts[`${id}/${kind}-${label}`] || ''
      const star = agentPicks[key] === f ? '<span class="star" title="QA agent pick">★ agent pick</span>' : ''
      return `<label class="card"><input type="radio" name="${key}" value="${f}"><img loading="lazy" src="candidates/${id}/${f}"><div class="cap"><b>${esc(label)}</b> <span>${esc(f)}</span> ${star}</div>${p ? `<details><summary>prompt</summary><p>${esc(p)}</p></details>` : ''}</label>`
    }).join('')
    sections += `<section id="${key}"><h2>${esc(t.romaji)} <small>${esc(t.kanji)} · ${esc(t.group)} · ${kind}</small></h2>
<div class="row"><label class="card current"><input type="radio" name="${key}" value="__keep__" checked><img loading="lazy" src="${rel(cur)}"><div class="cap"><b>current</b> <span>${kind === 'analogy' ? esc(t.analogy_name) : ''}</span></div></label>${cards}</div></section>`
  }
}

const html = `<!doctype html><meta charset="utf-8"><title>Gokyo candidates</title>
<style>
body{font:14px/1.4 -apple-system,system-ui,sans-serif;margin:0;padding:16px 24px 120px;background:#f6f4ef;color:#222}
h1{font-weight:500;margin:0 0 4px}h2{font-weight:500;margin:28px 0 8px}h2 small{color:#777;font-weight:400;font-size:13px}
.row{display:flex;gap:12px;overflow-x:auto;padding-bottom:6px}
.card{flex:0 0 260px;background:#fff;border:2px solid #ddd;border-radius:6px;padding:8px;cursor:pointer;position:relative}
.card.current{border-color:#bbb;background:#faf8f3}
.card:has(input:checked){border-color:#c33;box-shadow:0 0 0 2px #c33 inset}
.card input{position:absolute;top:10px;left:10px}
.card img{width:100%;aspect-ratio:1;object-fit:contain;background:#fff;display:block}
.star{color:#c33;font-size:12px;font-weight:600}
.cap{margin-top:6px}.cap span{color:#888;font-size:12px}
details{margin-top:4px}summary{color:#888;font-size:12px;cursor:pointer}details p{font-size:12px;color:#555;margin:4px 0 0}
#bar{position:fixed;left:0;right:0;bottom:0;background:#222;color:#eee;padding:10px 24px;display:flex;gap:12px;align-items:center}
#bar textarea{flex:1;height:60px;font:12px monospace;background:#111;color:#ddd;border:1px solid #444}
#bar button{padding:8px 14px}
nav a{margin-right:10px;font-size:12px;color:#555}
</style>
<h1>Gokyo poster candidates</h1>
<p>Click a card to pick it (outlined red). "current" = keep as is. ★ marks the QA agent pick. Picks persist in this browser; copy the JSON at the bottom when done.</p>
<nav>${ids.map(id => `<a href="#${id}:analogy">${esc(info[id].romaji)}</a>`).join('')}</nav>
${sections}
<div id="bar"><textarea id="out" readonly></textarea><button onclick="navigator.clipboard.writeText(document.getElementById('out').value)">Copy picks</button><button onclick="localStorage.removeItem('gokyo-picks');location.reload()">Reset</button></div>
<script>
const KEY='gokyo-picks';const saved=JSON.parse(localStorage.getItem(KEY)||'{}');
for(const [k,v] of Object.entries(saved)){const el=document.querySelector('input[name="'+k+'"][value="'+v+'"]');if(el)el.checked=true}
function update(){const picks={};for(const r of document.querySelectorAll('input[type=radio]:checked')){if(r.value!=='__keep__')picks[r.name]=r.value}
localStorage.setItem(KEY,JSON.stringify(picks));document.getElementById('out').value=JSON.stringify(picks,null,1)}
document.addEventListener('change',update);update();
</script>`
writeFileSync(join(dir, outName), html)
console.log(`wrote ${join(dir, outName)} (${ids.length} techniques)`)
