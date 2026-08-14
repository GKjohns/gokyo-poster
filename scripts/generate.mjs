#!/usr/bin/env node
// Generate one image via the Vercel AI Gateway and save it as PNG.
// Usage: node scripts/generate.mjs <model> <outPath> <prompt>
// Reads AI_GATEWAY_API_KEY from the environment.
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const GATEWAY = 'https://ai-gateway.vercel.sh/v1'
const KEY = process.env.AI_GATEWAY_API_KEY
if (!KEY) { console.error('AI_GATEWAY_API_KEY not set'); process.exit(1) }

const [model, outPath, ...promptParts] = process.argv.slice(2)
const prompt = promptParts.join(' ')
if (!model || !outPath || !prompt) {
  console.error('usage: generate.mjs <model> <outPath> <prompt>'); process.exit(1)
}

const headers = { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }

async function openaiImage() {
  const res = await fetch(`${GATEWAY}/images/generations`, {
    method: 'POST', headers,
    body: JSON.stringify({ model, prompt, size: '1024x1024', n: 1 }),
  })
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
  const json = await res.json()
  const d = json.data?.[0]
  if (d?.b64_json) return Buffer.from(d.b64_json, 'base64')
  if (d?.url) return Buffer.from(await (await fetch(d.url)).arrayBuffer())
  throw new Error(`no image in response: ${JSON.stringify(json).slice(0, 400)}`)
}

async function geminiImage() {
  const res = await fetch(`${GATEWAY}/chat/completions`, {
    method: 'POST', headers,
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: `Generate a square image. ${prompt}` }],
      modalities: ['image', 'text'],
    }),
  })
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
  const json = await res.json()
  const msg = json.choices?.[0]?.message
  const url = msg?.images?.[0]?.image_url?.url
  if (url?.startsWith('data:')) return Buffer.from(url.split(',')[1], 'base64')
  if (url) return Buffer.from(await (await fetch(url)).arrayBuffer())
  throw new Error(`no image in response: ${JSON.stringify(json).slice(0, 400)}`)
}

const buf = await (model.startsWith('openai/') ? openaiImage() : geminiImage())
mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, buf)
console.log(`${outPath} ${(buf.length / 1024).toFixed(0)}KB`)
