# nasiful-coder-space — Project Brain

## What This Is
A developer portfolio site built with React 19 + TypeScript + Vite + Tailwind. Features a VS Code-inspired UI with interactive terminal, file explorer, and theme switching. Deploys to Vercel.

## Stack
- Runtime: Node.js / Vite dev server
- Language: TypeScript
- Framework: React 19
- UI: Tailwind CSS + Radix UI + shadcn/ui (`components.json`)
- Testing: Vitest (unit) + Playwright (E2E)
- Linting: ESLint + Prettier
- Deploy: Vercel

## File Structure
```
src/
├── components/
│   ├── sections/         # Page content sections (About, Projects, Skills, etc.)
│   ├── ui/               # shadcn/ui primitives
│   ├── Editor.tsx        # Main VS Code-style editor pane
│   ├── FileExplorer.tsx  # Sidebar file tree navigation
│   ├── Terminal.tsx      # Interactive terminal component
│   ├── ResponsiveLayout.tsx  # Root layout, breakpoint logic
│   ├── ResponsiveHeader.tsx  # Top nav / menu bar
│   ├── StatusBar.tsx     # Bottom VS Code status bar
│   ├── ThemeSwitcher.tsx # Dark/light/system theme toggle
│   └── MatrixBackground.tsx  # Animated background effect
├── pages/
│   ├── Index.tsx         # Home page
│   └── NotFound.tsx      # 404
├── hooks/                # Custom React hooks
├── lib/                  # Shared utilities
└── constants/            # Static data (projects, skills, etc.)
```

## Key Conventions
- Functional components + hooks only — no class components
- Tailwind CSS for all styling — no inline styles, no CSS modules
- shadcn/ui for UI primitives — add via `npx shadcn-ui@latest add <component>`
- Named exports for components; default export for pages
- No `any` types — proper TypeScript interfaces required
- Project/skills data lives in `src/constants/` — never hardcoded in components
- Commit format: `type(scope): description` (feat/fix/chore/refactor/docs)

## Commands
```bash
npm run dev          # Start dev server (Vite)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint check
npx tsc --noEmit     # Type check
npx vitest           # Run unit tests
npx playwright test  # Run E2E tests
```

## AI Agents Available
| Agent | Purpose |
|-------|---------|
| code-reviewer | Review for bugs, security, quality |
| debugger | Interactive DAP debugging |
| test-writer | Vitest unit + Playwright E2E tests |
| refactorer | Clean up without changing behavior |
| doc-writer | Docs and comments |
| security-auditor | XSS, secrets, dependency CVEs |

## Custom Commands
- `/fix-issue <number>` — Fix a GitHub issue end-to-end
- `/deploy <env>` — Deploy to staging or production via Vercel
- `/pr-review <number>` — Full PR review and comment

## Skills Active
- `portfolio-review` — Audits portfolio completeness and recruiter-readiness. Trigger: "review my portfolio", "is it ready", "pre-deploy check"

## gstack
gstack installed at `~/.claude/skills/gstack`. Use `/browse` for all web browsing — never use `mcp__claude-in-chrome__*` tools.

Available skills:
`/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/design-consultation`, `/design-shotgun`, `/design-html`, `/review`, `/ship`, `/land-and-deploy`, `/canary`, `/benchmark`, `/browse`, `/connect-chrome`, `/qa`, `/qa-only`, `/design-review`, `/setup-browser-cookies`, `/setup-deploy`, `/retro`, `/investigate`, `/document-release`, `/codex`, `/cso`, `/autoplan`, `/plan-devex-review`, `/devex-review`, `/careful`, `/freeze`, `/guard`, `/unfreeze`, `/gstack-upgrade`, `/learn`

## Security Notes
- Never commit `.env` files — all secrets via Vercel environment variables
- No user input reaches `eval` or `dangerouslySetInnerHTML` without sanitization
- Contact form inputs validated client + server side
