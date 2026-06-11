# nasiful-coder-space — Locked Decisions

These decisions are settled. Do not re-open without explicit human approval.

---

## Stack

- **React 19 + TypeScript + Vite + Tailwind + shadcn/ui** — do not change the stack
- **shadcn/ui** for UI primitives; add via `npx shadcn-ui@latest add <component>`
- **No xterm.js** — too heavy (~300KB+). Upgrade existing `Terminal.tsx` instead
- **Howler.js (~7KB gz)** for audio when Phase 3 ships — loaded lazily, not in main bundle
- No new packages without explicit approval

## Performance Budget

- Main chunk ≤ 140 kB gzip (enforced by CI gate in `npm run build`)
- Command palette chunk ≤ 80 kB gzip
- Audio files: `.ogg` format, max 20KB per file, loaded on demand
- No breaking changes to URL structure — deployed URLs must keep working

## Architecture

- **Single layout** — `ResponsiveLayout.tsx` serves both mobile and desktop. No separate shell component.
- **FileExplorer owns its width** — never set `w-*` on the wrapper in `ResponsiveLayout`. Pass `navClassName` to control width in specific contexts.
- **SECTION_ALIASES** in `src/constants/sections.ts` is the single source of truth for navigation — never duplicate in components. Derived from `FileExplorer.files`; skips items where `section === ''`.
- **`scripts/routes.mjs`** is the single source of truth for all prerenderable routes. When adding a new section, update this file.
- Functional components + hooks only — no class components
- No `any` types — proper TypeScript interfaces required

## Design System

- **Phosphor palette only**: `text-phosphor`, `text-phosphor-soft`, `text-phosphor-dim`, `text-danger`. The `terminal-{cyan,purple,...}` classes are retired — do not use in `src/`.
- **Fonts**: Departure Mono (primary, `public/fonts/DepartureMono-Regular.woff2`) + JetBrains Mono (fallback). Declared in `tailwind.config.ts`.
- Tailwind for all styling — no inline styles, no CSS modules
- CSS custom properties (`:root` tokens) for design-sensitive values — never hardcode hex or px

## Specific Technical Constraints

- **No `backdrop-blur` on `.editor-content`** — removed intentionally. Causes dark overlay artifact on mobile GPU compositing layer. Do not re-add.
- **`@vitejs/plugin-legacy` must use spread** (`...legacy({})`) in `vite.config.ts` — plugin returns `Plugin[]`. Do not remove the spread.
- **`vercel.json` rewrite order**: ArcZero proxy rewrites MUST come before the SPA fallback `/(.*) → /index.html`. First match wins. Never move SPA fallback above game rewrites.
- **`vercel.json` www redirect**: canonical is apex domain (no www). Redirect stays in `redirects`, not `rewrites`.
- **`MatrixBackground` opacity**: `Editor.tsx` passes `opacity={0.08}` on `writing/*` routes. Prefix check is `currentSection?.startsWith('writing')` — no trailing slash.

## Content Rules

- No Lorem Ipsum anywhere in final state — content must be real and personal
- **`src/constants/` owns all project/skills data** — never hardcode in components
- Commit format: `type(scope): description` (feat/fix/chore/refactor/docs)

## Storage Namespace

All localStorage/sessionStorage keys prefixed `ncs_*` — never add bare keys.

## Phased Roadmap (locked order)

Phase 1 (Foundation) must ship before Phase 2 (Live Data). Phase 2 before Phase 3 (Game Layer).
- Phase 1: VS Code fidelity + content authenticity + skeleton loading fallbacks
- Phase 2: GitHub activity in StatusBar + `status.json`-driven /now page
- Phase 3: Sound design (Howler.js) + fake compile effect + terminal command registry + Snake easter egg

## Hosting

- Vercel free tier (keep)
- Custom domain registered separately — `nasif-programmer-space.vercel.app` stays as redirect
- No migration of `/blog` or `/games` content types into this Vite app until Phase 3 ships
