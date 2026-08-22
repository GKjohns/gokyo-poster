// Per-throw Open Graph cards: src/public/og/{id}.jpg, 1200x630. Paper bg, the
// throw at left and its analogy at right (each 540px square on white with a
// hairline border, like the poster's cards), a hairline rule between, no text:
// the og:title / og:description carry the words. Run with: npm run og
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import gokyo from '../app/assets/gokyo.json' with { type: 'json' }

const src = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(src, 'public/og')
mkdirSync(outDir, { recursive: true })

const W = 1200, H = 630, S = 540, TOP = (H - S) / 2
const LEFT = (W / 2 - S) / 2, RIGHT = W / 2 + LEFT
const PAPER = '#faf8f4', HAIRLINE = '#e5dfd4'
const frame = Buffer.from(`<svg width="${W}" height="${H}">
  <rect x="${W / 2 - 0.5}" y="${TOP}" width="1" height="${S}" fill="${HAIRLINE}"/>
  <rect x="${LEFT}" y="${TOP}" width="${S}" height="${S}" fill="none" stroke="${HAIRLINE}" stroke-width="2"/>
  <rect x="${RIGHT}" y="${TOP}" width="${S}" height="${S}" fill="none" stroke="${HAIRLINE}" stroke-width="2"/>
</svg>`)

const techniques = gokyo.groups.flatMap(g => g.techniques)
for (const t of techniques) {
  const [throwImg, analogyImg] = await Promise.all([
    sharp(join(src, `public/img/throws/${t.id}-lg.webp`)).resize(S, S).toBuffer(),
    sharp(join(src, `public/img/analogies/${t.id}-lg.webp`)).resize(S, S).toBuffer()
  ])
  await sharp({ create: { width: W, height: H, channels: 3, background: PAPER } })
    .composite([
      { input: throwImg, left: LEFT, top: TOP },
      { input: analogyImg, left: RIGHT, top: TOP },
      { input: frame, left: 0, top: 0 }
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(outDir, `${t.id}.jpg`))
}
console.log(`og: ${techniques.length} cards written to public/og/`)
