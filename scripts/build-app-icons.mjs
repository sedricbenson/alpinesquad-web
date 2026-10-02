/**
 * Generate App-Store-quality 1024×1024 hub icons for Glide, Switch, Pianotune.
 * Reads SVG sources from public/images/sources/ and rasterizes with sharp.
 *
 *   node scripts/build-app-icons.mjs
 *
 * Full-bleed squares (no baked corner radius) — site CSS applies border-radius.
 */
import sharp from 'sharp';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'images');
const srcDir = join(outDir, 'sources');

const names = ['glide', 'switch', 'pianotune'];

for (const name of names) {
  const svgPath = join(srcDir, `${name}.svg`);
  if (!existsSync(svgPath)) throw new Error(`Missing ${svgPath}`);
  const svg = readFileSync(svgPath);
  const pngPath = join(outDir, `${name}-icon.png`);
  await sharp(svg).resize(1024, 1024).png({ compressionLevel: 9 }).toFile(pngPath);
  console.log(`✓ ${name}-icon.png (1024×1024) from sources/${name}.svg`);
}
console.log('Done.');
