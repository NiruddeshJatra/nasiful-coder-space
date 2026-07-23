// Single source of truth for all prerenderable routes. Each entry co-locates
// its sitemap metadata (priority, changefreq) and, for bilingual pages, an
// explicit `alternate` pointer to its sibling-language route — so sitemap.xml
// generation reads this config directly instead of guessing behavior from
// path-string conventions (e.g. a `-bn` suffix).
export const ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/writing', priority: 0.9, changefreq: 'weekly' },
  {
    path: '/writing/essays/on-running-for-nothing',
    priority: 0.8,
    changefreq: 'monthly',
    alternate: { lang: 'bn', path: '/writing/essays/on-running-for-nothing-bn' },
  },
  {
    path: '/writing/essays/on-running-for-nothing-bn',
    priority: 0.8,
    changefreq: 'monthly',
    alternate: { lang: 'en', path: '/writing/essays/on-running-for-nothing' },
  },
  {
    path: '/writing/essays/on-staying-small',
    priority: 0.8,
    changefreq: 'monthly',
    alternate: { lang: 'bn', path: '/writing/essays/on-staying-small-bn' },
  },
  {
    path: '/writing/essays/on-staying-small-bn',
    priority: 0.8,
    changefreq: 'monthly',
    alternate: { lang: 'en', path: '/writing/essays/on-staying-small' },
  },
  {
    path: '/writing/essays/on-forgetting',
    priority: 0.8,
    changefreq: 'monthly',
    alternate: { lang: 'bn', path: '/writing/essays/on-forgetting-bn' },
  },
  {
    path: '/writing/essays/on-forgetting-bn',
    priority: 0.8,
    changefreq: 'monthly',
    alternate: { lang: 'en', path: '/writing/essays/on-forgetting' },
  },
  { path: '/journey', priority: 0.7, changefreq: 'monthly' },
  { path: '/journey-running', priority: 0.7, changefreq: 'weekly' },
  { path: '/journey-hiking', priority: 0.7, changefreq: 'monthly' },
  { path: '/games', priority: 0.7, changefreq: 'monthly' },
  { path: '/field-notes', priority: 0.7, changefreq: 'weekly' },
  { path: '/now', priority: 0.8, changefreq: 'weekly' },
  { path: '/contact', priority: 0.5, changefreq: 'yearly' },
  { path: '/writing/tech-articles', priority: 0.9, changefreq: 'monthly' },
  { path: '/writing/the-machine-beneath-your-code', priority: 0.8, changefreq: 'monthly' },
  { path: '/writing/whats-inside-a-bit', priority: 0.8, changefreq: 'monthly' },
];

// Flat path list for consumers that only need the URL (e.g. prerender.mjs).
export const ROUTE_PATHS = ROUTES.map((r) => r.path);
