import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { ROUTES } from './routes.mjs';

const SITE_URL = 'https://niruddeshjatra.space';
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

function priorityFor(route) {
  if (route === '/') return 1.0;
  if (route === '/writing' || route === '/writing/tech-articles') return 0.9;
  if (route.startsWith('/writing/')) return 0.8;
  if (route === '/about' || route === '/now') return 0.8;
  if (route === '/contact') return 0.5;
  return 0.7;
}

function changefreqFor(route) {
  if (route === '/' || route === '/writing' || route === '/field-notes' || route === '/now' || route === '/journey-running') {
    return 'weekly';
  }
  if (route === '/contact') return 'yearly';
  return 'monthly';
}

// BN/EN essay pairs use a `-bn` suffix on the same base path. Derive hreflang
// alternates from ROUTES directly so a new bilingual essay picks this up
// automatically — no separate hand-maintained pairing list.
function hreflangBlockFor(route) {
  if (!route.startsWith('/writing/essays/')) return '';
  const isBn = route.endsWith('-bn');
  const enPath = isBn ? route.slice(0, -'-bn'.length) : route;
  const bnPath = `${enPath}-bn`;
  if (!ROUTES.includes(enPath) || !ROUTES.includes(bnPath)) return '';
  return `\n    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${enPath}"/>\n    <xhtml:link rel="alternate" hreflang="bn" href="${SITE_URL}${bnPath}"/>`;
}

const urlEntries = ROUTES.map((route) => {
  const loc = `${SITE_URL}${route}`;
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreqFor(route)}</changefreq>\n    <priority>${priorityFor(route).toFixed(1)}</priority>${hreflangBlockFor(route)}\n  </url>`;
}).join('\n\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${urlEntries}

</urlset>
`;

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
console.log(`sitemap.xml generated with ${ROUTES.length} routes`);

const robots = `User-agent: facebookexternalhit
Allow: /
Disallow: /vault
Disallow: /vault/

User-agent: Facebot
Allow: /
Disallow: /vault
Disallow: /vault/

User-agent: Twitterbot
Allow: /
Disallow: /vault
Disallow: /vault/

User-agent: WhatsApp
Allow: /
Disallow: /vault
Disallow: /vault/

User-agent: LinkedInBot
Allow: /
Disallow: /vault
Disallow: /vault/

User-agent: *
Allow: /
Disallow: /vault
Disallow: /vault/
Disallow: /vault/the-real-story

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(join(publicDir, 'robots.txt'), robots, 'utf8');
console.log('robots.txt generated');
