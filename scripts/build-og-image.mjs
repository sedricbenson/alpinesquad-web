/**
 * Generates the social-share Open Graph image (1200×630) by rendering an
 * SVG and rasterizing it with sharp. Run manually after content edits:
 *
 *   node scripts/build-og-image.mjs
 *
 * Output: public/images/bibleblitz-og.png
 *
 * Pure-Node script — keeps the build pipeline simple. Sharp is the only
 * non-dev dependency this adds; cost is justified by needing a real PNG
 * (not SVG) for OG which crawlers reliably support.
 */
import sharp from 'sharp';
import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconBuffer = readFileSync(join(__dirname, '..', 'public', 'images', 'bibleblitz-icon.png'));
const iconB64 = iconBuffer.toString('base64');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A0F0C"/>
      <stop offset="100%" stop-color="#060B07"/>
    </linearGradient>
    <radialGradient id="glow" cx="20%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#1FA968" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#1FA968" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="goldglow" cx="80%" cy="100%" r="50%">
      <stop offset="0%" stop-color="#C9A961" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#C9A961" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="iconClip"><rect x="80" y="180" width="180" height="180" rx="40"/></clipPath>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#goldglow)"/>

  <image xlink:href="data:image/png;base64,${iconB64}" x="80" y="180" width="180" height="180" clip-path="url(#iconClip)"/>

  <text x="80" y="420" fill="#F4F1EA" font-family="-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="3" opacity="0.85">BIBLE BLITZ · iPhone &amp; iPad</text>

  <text x="80" y="490" fill="#F4F1EA" font-family="ui-serif, 'New York', 'Iowan Old Style', serif" font-size="62" font-weight="600" letter-spacing="-1.2">Bible trivia that teaches</text>
  <text x="80" y="558" fill="#34D17F" font-family="ui-serif, 'New York', 'Iowan Old Style', serif" font-size="62" font-weight="600" font-style="italic" letter-spacing="-1.2">you Scripture.</text>

  <g transform="translate(800, 90)">
    <rect x="0" y="0" width="320" height="450" rx="44" fill="#1a1d24" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <rect x="6" y="6" width="308" height="438" rx="38" fill="#FFFFFF"/>
    <rect x="120" y="20" width="80" height="22" rx="11" fill="#000"/>

    <text x="160" y="100" text-anchor="middle" fill="#1A1D24" font-family="-apple-system, sans-serif" font-size="18" font-weight="600">Good morning</text>
    <text x="160" y="124" text-anchor="middle" fill="#8B9292" font-family="-apple-system, sans-serif" font-size="12">🔥 7 day streak</text>

    <rect x="20" y="160" width="280" height="80" rx="14" fill="#1FA968"/>
    <text x="160" y="200" text-anchor="middle" fill="#fff" font-family="-apple-system, sans-serif" font-size="24" font-weight="700">Play</text>
    <text x="160" y="222" text-anchor="middle" fill="#fff" opacity="0.9" font-family="-apple-system, sans-serif" font-size="11">10 questions · ~2 min</text>

    <rect x="20" y="260" width="280" height="44" rx="10" fill="#FBF7EE"/>
    <text x="36" y="282" fill="#1A1D24" font-family="-apple-system, sans-serif" font-size="12" font-weight="600">Today's Challenge</text>
    <text x="36" y="296" fill="#8B9292" font-family="-apple-system, sans-serif" font-size="10">5 questions · 2× XP bonus</text>

    <rect x="20" y="316" width="280" height="44" rx="10" fill="#FBF7EE"/>
    <text x="36" y="338" fill="#1A1D24" font-family="-apple-system, sans-serif" font-size="12" font-weight="600">Categories</text>
    <text x="36" y="352" fill="#8B9292" font-family="-apple-system, sans-serif" font-size="10">Pick a Bible topic to focus on</text>

    <rect x="20" y="372" width="280" height="44" rx="10" fill="#FBF7EE"/>
    <text x="36" y="394" fill="#1A1D24" font-family="-apple-system, sans-serif" font-size="12" font-weight="600">Memorize</text>
    <text x="36" y="408" fill="#8B9292" font-family="-apple-system, sans-serif" font-size="10">Learn verses by heart</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ quality: 90, compressionLevel: 9 })
  .toFile(join(__dirname, '..', 'public', 'images', 'bibleblitz-og.png'));

console.log('✓ Wrote public/images/bibleblitz-og.png (1200×630)');
