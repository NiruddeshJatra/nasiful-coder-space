---
paths:
  - "src/components/**/*.tsx"
  - "src/pages/**/*.tsx"
  - "src/**/*.tsx"
---

# Frontend Rules

- Functional components + hooks only — no class components
- Tailwind CSS for styling — no inline styles, no CSS modules
- Keep components under 200 lines — split by responsibility if larger
- Co-locate component tests in `__tests__/` sibling folder
- Use named exports for components, default export only for pages
- No `any` types — use proper TypeScript interfaces/types
- Images: use `<img>` with explicit `width`/`height` or lazy loading
- Animations: prefer CSS transitions; GSAP for complex sequences
- Accessibility: every interactive element needs ARIA label or visible text
- No hardcoded colors — use Tailwind design tokens only
