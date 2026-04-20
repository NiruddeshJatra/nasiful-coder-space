---
paths:
  - "src/pages/**"
  - "src/components/**"
  - "src/constants/**"
---

# Portfolio Domain Rules

- Project data lives in `src/constants/` — never hardcoded inside components
- Each project entry must have: title, description, tech stack array, live URL or null, repo URL or null
- Skills/technologies list maintained in constants — don't duplicate across components
- Hero section: must have clear CTA (contact or resume download)
- Resume: served as static PDF from `public/` — no external hosting
- Dark/light mode: respect system preference via Tailwind `dark:` classes
- SEO: every page needs title, meta description, og:image
- Performance: Lighthouse score target ≥ 90 on all metrics before deploy
- No placeholder content in production — all lorem ipsum must be replaced
