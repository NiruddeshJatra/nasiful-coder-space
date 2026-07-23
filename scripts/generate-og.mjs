import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync, existsSync } from 'fs';
import { ARTICLES, INTRO_ARTICLE, SERIES_TITLE } from '../src/articles/manifest.ts';
import { SITE_URL, SITE_NAME } from '../src/lib/site.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');
const ogDir = join(publicDir, 'og');
const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '');

function escapeXml(str) {
  return str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));
}

// Site-wide default OG image — terminal/phosphor palette.
const siteSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0a0e0a"/>
  <g opacity="0.05">
    <line x1="0" y1="100" x2="1200" y2="100" stroke="#00d26a" stroke-width="1"/>
    <line x1="0" y1="200" x2="1200" y2="200" stroke="#00d26a" stroke-width="1"/>
    <line x1="0" y1="300" x2="1200" y2="300" stroke="#00d26a" stroke-width="1"/>
    <line x1="0" y1="400" x2="1200" y2="400" stroke="#00d26a" stroke-width="1"/>
    <line x1="0" y1="500" x2="1200" y2="500" stroke="#00d26a" stroke-width="1"/>
  </g>
  <text x="600" y="290" text-anchor="middle" font-family="monospace" font-size="120" font-weight="bold" fill="#00d26a" letter-spacing="-2">${SITE_NAME}</text>
  <text x="600" y="370" text-anchor="middle" font-family="monospace" font-size="42" fill="#9ab09a" letter-spacing="6">tutor · runner · maker</text>
  <text x="600" y="540" text-anchor="middle" font-family="monospace" font-size="24" fill="#9ab09a" letter-spacing="2">a quiet corner of the internet</text>
  <text x="600" y="600" text-anchor="middle" font-family="monospace" font-size="20" fill="#00d26a">&gt; _</text>
</svg>`;

// Wraps text to a max character width per line (rough monospace-ish estimate for the title font).
function wrapLines(text, maxCharsPerLine) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

// Paper Oscilloscope palette — matches src/articles/article.css tokens.
function articleSvg({ kicker, title }) {
  const lines = wrapLines(title, 24).slice(0, 3);
  const startY = 630 / 2 - ((lines.length - 1) * 64) / 2;
  const titleTspans = lines
    .map((line, i) => `<tspan x="80" y="${startY + i * 64}">${escapeXml(line)}</tspan>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#e8dfc9"/>
  <g opacity="0.15" stroke="#26241C" stroke-width="1">
    <line x1="0" y1="160" x2="1200" y2="160"/>
    <line x1="0" y1="470" x2="1200" y2="470"/>
  </g>
  <text x="80" y="110" font-family="monospace" font-size="26" font-weight="600" fill="#00753F" letter-spacing="2">${escapeXml(SERIES_TITLE.toUpperCase())}</text>
  <text x="80" y="145" font-family="monospace" font-size="20" fill="#5c5442" letter-spacing="1">${escapeXml(kicker)}</text>
  <text font-family="'Bricolage Grotesque',sans-serif" font-size="56" font-weight="700" fill="#26241C">${titleTspans}</text>
  <text x="80" y="560" font-family="monospace" font-size="22" fill="#5c5442">${SITE_HOST}/writing</text>
</svg>`;
}

async function renderPng(svg, outPath) {
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  console.log(`generated ${outPath}`);
}

if (!existsSync(ogDir)) mkdirSync(ogDir, { recursive: true });

await renderPng(siteSvg, join(publicDir, 'og-image.png'));

await renderPng(
  articleSvg({ kicker: 'SERIES 001 · INTRO', title: INTRO_ARTICLE.enTitle }),
  join(ogDir, `${INTRO_ARTICLE.slug}.png`)
);

for (const article of ARTICLES.filter((a) => a.state === 'read')) {
  await renderPng(
    articleSvg({ kicker: `${article.level} · PART ${article.part}`, title: article.enTitle }),
    join(ogDir, `${article.slug}.png`)
  );
}

await renderPng(
  articleSvg({ kicker: 'ARTICLE SERIES', title: SERIES_TITLE }),
  join(ogDir, 'tech-articles.png')
);

console.log('OG image generation complete.');
