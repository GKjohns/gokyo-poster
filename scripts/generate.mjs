#!/usr/bin/env node
// Generate one image via the Vercel AI Gateway and save it as PNG.
// Usage: node scripts/generate.mjs <model> <outPath> [--ref <imagePath>] <prompt>
// Reads AI_GATEWAY_API_KEY from the environment.
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname, extname } from 'node:path'

const GATEWAY = 'https://ai-gateway.vercel.sh/v1'
const KEY = process.env.AI_GATEWAY_API_KEY
if (!KEY) { console.error('AI_GATEWAY_API_KEY not set'); process.exit(1) }

const args = process.argv.slice(2)
const [model, outPath] = args
let refPath = null
let rest = args.slice(2)
if (rest[0] === '--ref') { refPath = rest[1]; rest = rest.slice(2) }
const prompt = rest.join(' ')
if (!model || !outPath || !prompt) {
  console.error('usage: generate.mjs <model> <outPath> [--ref <imagePath>] <prompt>'); process.exit(1)
}

const refDataUrl = () => {
  const mime = extname(refPath).match(/jpe?g/i) ? 'image/jpeg' : 'image/png'
  return `data:${mime};base64,${readFileSync(refPath).toString('base64')}`
}

async function openaiImage() {
  if (refPath) {
    const form = new FormData()
    form.append('model', model)
    form.append('prompt', prompt)
    form.append('size', '1024x1024')
    const mime = extname(refPath).match(/jpe?g/i) ? 'image/jpeg' : 'image/png'
    form.append('image', new Blob([readFileSync(refPath)], { type: mime }), 'ref' + extname(refPath))
    const res = await fetch(`${GATEWAY}/images/edits`, {
      method: 'POST', headers: { Authorization: `Bearer ${KEY}` }, body: form,
    })
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
    return extract(await res.json())
  }
  const res = await fetch(`${GATEWAY}/images/generations`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, prompt, size: '1024x1024', n: 1 }),
  })
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
  return extract(await res.json())
}

function extract(json) {
  const d = json.data?.[0]
  if (d?.b64_json) return Buffer.from(d.b64_json, 'base64')
  if (d?.url) return fetch(d.url).then(r => r.arrayBuffer()).then(Buffer.from)
  throw new Error(`no image in response: ${JSON.stringify(json).slice(0, 400)}`)
}

async function geminiImage() {
  const content = refPath
    ? [{ type: 'text', text: `Generate a square image. ${prompt}` },
       { type: 'image_url', image_url: { url: refDataUrl() } }]
    : `Generate a square image. ${prompt}`
  const res = await fetch(`${GATEWAY}/chat/completions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages: [{ role: 'user', content }], modalities: ['image', 'text'] }),
  })
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
  const json = await res.json()
  const url = json.choices?.[0]?.message?.images?.[0]?.image_url?.url
  if (url?.startsWith('data:')) return Buffer.from(url.split(',')[1], 'base64')
  if (url) return Buffer.from(await (await fetch(url)).arrayBuffer())
  throw new Error(`no image in response: ${JSON.stringify(json).slice(0, 400)}`)
}

const buf = await (model.startsWith('openai/') ? openaiImage() : geminiImage())
mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, buf)
console.log(`${outPath} ${(buf.length / 1024).toFixed(0)}KB`)
