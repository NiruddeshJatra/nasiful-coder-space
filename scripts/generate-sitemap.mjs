import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { ROUTES } from './routes.mjs';
import { SITE_URL } from '../src/lib/site.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// hreflang pairs always list en first, then bn, regardless of which route
// this entry itself is — matches how sitemap.xml has always been formatted.
function hreflangBlockFor(route) {
  if (!route.alternate) return '';
  const enPath = route.alternate.lang === 'en' ? route.alternate.path : route.path;
  const bnPath = route.alternate.lang === 'bn' ? route.alternate.path : route.path;
  return `\n    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${enPath}"/>\n    <xhtml:link rel="alternate" hreflang="bn" href="${SITE_URL}${bnPath}"/>`;
}

const urlEntries = ROUTES.map((route) => {
  const loc = `${SITE_URL}${route.path}`;
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority.toFixed(1)}</priority>${hreflangBlockFor(route)}\n  </url>`;
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
