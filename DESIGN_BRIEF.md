# nasiful-coder-space — Design Brief

Generated via /office-hours on 2026-04-20. Status: APPROVED.
Live URL: https://nasif-programmer-space.vercel.app/

---

## Vision

A developer portfolio that behaves like a codebase — because it IS one.

The VS Code shell is already the game engine. The game hasn't fully shipped yet.

When done: a developer lands, types `git log --oneline` in the terminal, sees the
builder's actual last 5 commits. Types `./snake` — a game launches in the editor pane.
Hovers a sidebar file — hears a subtle mechanical keyboard click. Clicks a different
file — a fake "compiling..." bar flickers before content renders.

Two audiences, one interface:
- **Recruiters** navigate via the sidebar and read the content.
- **Developers** discover the terminal layer and find the easter eggs.

No confusion between the two paths.

---

## Problem This Solves

The site had strong architectural bones (5 phases of upgrades, VS Code chrome, command
palette, mobile shell, matrix background) but felt like a costume rather than a genuine
identity:

- VS Code illusion incomplete — sidebar spacing wrong, matrix rain too dense/fast
- Lazy loading flashed "loading..." before content rendered (first-impression killer)
- Section layouts had no consistent max-width, typography, or spacing
- All content read like generic developer portfolio copy — not personal

---

## Design Approach: Phased Overhaul (Approach C)

Chosen over Foundation-First (A) or Game-Layer-First (B). Key rationale: game effects
on a broken layout = compounded confusion. Fix foundation fidelity first, then build up.

### Phase 1 — Foundation & Identity

**VS Code Fidelity**
- Matrix: reduce density 40%, slow spawn rate, increase trail fade. Atmosphere, not main event.
- Sidebar: 4px vertical / 8px horizontal padding per file item (match real VS Code explorer).
- Skeleton fallbacks: replace "loading..." with layout-matched skeletons (`animate-pulse`, `bg-muted rounded`). No layout shift vs final content.

**Layout System**
- Consistent `max-w-xl mx-auto` for short-form sections; `max-w-2xl` for prose.
- Typography scale: 3 sizes (heading, body, mono) enforced across all section components.

**Content Personalization**
- Real personal versions of: About, Experience, Skills, Projects, /now.
- No template bullet points — specific impact and story.

**First-Time Visitor Flow**
- Default to about.md pre-selected on first load (not blank editor).
- StatusBar hint on first visit: "try the terminal ↓ or explore the files →"

### Phase 2 — Live Data (after Phase 1 ships)

**GitHub Activity (ambient, never centerpiece)**
- `api.github.com/users/NiruddeshJatra/events` — unauthenticated, cached 5 min in localStorage.
- StatusBar: "last commit: {relative time} — {branch}"
- /now section: `GitHubActivity` widget (recent commits, active repos)

**status.json**
- `public/status.json` manually updated. Fields: `working_on`, `reading`, `building`, `updated_at`.
- NowContent reads via `fetch('/status.json')`. Commit to update → Vercel auto-deploys.
- Graceful degradation: if missing or malformed, section hidden (no error state).

### Phase 3 — Game Layer (after Phase 2 ships)

**Fake Compile Effect**
- On section change: 300ms "compiling..." animation in StatusBar (progress bar).
- Wraps Phase 1 skeleton: skeleton shows first (real latency), compile bar takes over aesthetically.

**Sound Design (Howler.js)**
- Three sounds: `key-click.ogg`, `compile-done.ogg`, `terminal-cmd.ogg` (~5-8KB each).
- Toggleable via StatusBar mute icon. Default: on for desktop, off for mobile.
- Loaded lazily after first user interaction. Key: `pref_audio` in localStorage.

**Terminal Command Registry**
- New `src/constants/commands.ts`: `COMMAND_REGISTRY` — single source for Terminal, CommandPalette, and MobileShell.
- Commands: `whoami`, `ls projects/`, `git log --oneline` (real GitHub API), `open <section>`, `theme {dark|light}`, `./snake`.

**Snake Easter Egg**
- `easter-egg.tsx` visible in sidebar (grayed out, different icon).
- Opens a playable Snake game in the editor pane (canvas, grid-based, score, collision, restart).
- `./snake` in terminal also opens it. Port logic from `e:/Projects/Snake-Game/Snake.py`.

**Section World Differentiation**
- CSS `data-section="*"` attribute on editor pane. ≤5% hue shift per section.
- /lab: cooler tint (`hsl(210, 15%, 10%)`), monospace-heavy
- /notes: warmer tint (`hsl(30, 10%, 10%)`), looser line height
- /now: terminal-log aesthetic (`[2026-04-20]` timestamp prefix per entry)
- Subtle — visitor shouldn't consciously notice, just feel it.

---

## What Makes This Cool

When the VS Code illusion is complete and the game layer ships, this isn't a portfolio
that *shows* a developer's work — it *is* the developer's work. The medium is the message.
