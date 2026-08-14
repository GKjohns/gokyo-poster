import { readFileSync, writeFileSync } from 'node:fs'

const base = JSON.parse(readFileSync('data/techniques.json', 'utf8'))

const merged = base.groups.map(group => {
  const analogies = JSON.parse(readFileSync(`data/group-${group.id}.json`, 'utf8'))
  const byId = Object.fromEntries(analogies.techniques.map(t => [t.id, t]))
  const missing = group.techniques.filter(t => !byId[t.id]).map(t => t.id)
  if (missing.length) throw new Error(`group ${group.id} missing analogies for: ${missing.join(', ')}`)
  return { ...group, techniques: group.techniques.map(t => ({ ...t, ...byId[t.id] })) }
})

const esc = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

const card = (t, n) => `
<article class="card">
  <div class="throw">
    <div class="num">${n}</div>
    <h3>${esc(t.romaji)} <span class="kanji">${esc(t.kanji)}</span></h3>
    <p class="english">${esc(t.english)}</p>
    <p class="mechanic">${esc(t.mechanic)}</p>
  </div>
  <div class="analogy">
    <h4>${esc(t.analogy_name)}</h4>
    <p>${esc(t.analogy)}</p>
    <p class="maps">${esc(t.why_it_maps)}</p>
    <details><summary>image prompt</summary><p>${esc(t.image_prompt)}</p></details>
  </div>
</article>`

const section = g => `
<section>
  <h2>${esc(g.name)} <span class="kanji">${esc(g.kanji)}</span></h2>
  ${g.techniques.map((t, i) => card(t, `${g.id}.${i + 1}`)).join('\n')}
</section>`

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gokyo Analogies — Review</title>
<style>
  :root {
    --bg: #faf8f4; --card: #ffffff; --ink: #1c1a17; --muted: #6b6459;
    --accent: #a33b2e; --line: #e5dfd4; --analogy-bg: #f3efe6;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #16140f; --card: #211e18; --ink: #ece7dd; --muted: #9c9485;
      --accent: #e06a52; --line: #35302a; --analogy-bg: #2a261f;
    }
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink);
    font: 16px/1.55 -apple-system, "Segoe UI", sans-serif; padding: 2rem 1rem 5rem; }
  main { max-width: 900px; margin: 0 auto; }
  h1 { font-size: 2rem; margin: 0 0 .25rem; }
  .sub { color: var(--muted); margin: 0 0 2.5rem; }
  h2 { font-size: 1.3rem; margin: 3rem 0 1rem; border-bottom: 2px solid var(--accent);
    padding-bottom: .35rem; }
  .kanji { color: var(--muted); font-weight: 400; margin-left: .4rem; }
  .card { display: grid; grid-template-columns: 1fr 1.2fr; gap: 0; background: var(--card);
    border: 1px solid var(--line); border-radius: 10px; margin-bottom: 1rem; overflow: hidden; }
  @media (max-width: 640px) { .card { grid-template-columns: 1fr; } }
  .throw { padding: 1.1rem 1.25rem; position: relative; }
  .num { position: absolute; top: .9rem; right: 1rem; color: var(--muted); font-size: .8rem; }
  .throw h3 { margin: 0; font-size: 1.05rem; }
  .english { color: var(--accent); font-size: .85rem; margin: .15rem 0 .6rem;
    text-transform: uppercase; letter-spacing: .04em; }
  .mechanic { margin: 0; color: var(--muted); font-size: .92rem; }
  .analogy { background: var(--analogy-bg); padding: 1.1rem 1.25rem; border-left: 1px solid var(--line); }
  .analogy h4 { margin: 0 0 .35rem; font-size: 1rem; }
  .analogy p { margin: 0 0 .5rem; font-size: .95rem; }
  .maps { color: var(--muted); font-size: .85rem !important; font-style: italic; }
  details { font-size: .82rem; color: var(--muted); }
  summary { cursor: pointer; }
</style>
</head>
<body>
<main>
  <h1>Gokyo Analogies</h1>
  <p class="sub">All 40 throws of the traditional Gokyo no Waza, each paired with the everyday scene that carries its mechanics. Review pass — images and styling come later.</p>
  ${merged.map(section).join('\n')}
</main>
</body>
</html>`

writeFileSync('index.html', html)
console.log(`wrote index.html — ${merged.reduce((n, g) => n + g.techniques.length, 0)} techniques`)
