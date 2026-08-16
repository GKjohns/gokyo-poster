// Generate optimized webp derivatives of the poster images into src/public/img/.
// Grid: {id}.webp @640px. Detail: {id}-lg.webp @1024px. Skips existing: npm run images
import { readdirSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

let made = 0, skipped = 0
for (const kind of ['throws', 'analogies']) {
  const srcDir = join(root, 'images', kind)
  const outDir = join(root, 'src/public/img', kind)
  mkdirSync(outDir, { recursive: true })
  for (const file of readdirSync(srcDir).filter(f => f.endsWith('.png'))) {
    const id = file.replace(/\.png$/, '')
    for (const [suffix, width] of [['', 640], ['-lg', 1024]]) {
      const out = join(outDir, `${id}${suffix}.webp`)
      if (existsSync(out)) { skipped++; continue }
      await sharp(join(srcDir, file)).resize(width, width).webp({ quality: 82 }).toFile(out)
      made++
    }
  }
}
console.log(`images: ${made} generated, ${skipped} skipped`)
