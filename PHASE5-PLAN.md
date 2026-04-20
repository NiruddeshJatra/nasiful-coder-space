# Phase 5 Plan — nasiful-coder-space
<!-- /autoplan restore point: /c/Users/ASUS/.gstack/projects/NiruddeshJatra-nasiful-coder-space/main-autoplan-restore-20260420-152559.md -->

## Context

Phases 1–4 of the portfolio audit are complete and deployed (commits bbb771e → 60425c0):
- Phase 1: Hygiene + matrix fidelity (katakana chars, trail fade, kill cursor, terminal hint)
- Phase 2: URL routing, lazy sections, /now, StatusBar, sidebar caption ← **tabs, palette, mobile still deferred**
- Phase 3: Reactive matrix, /lab experiments (MatrixPlayground, TypingChallenge), home changelog
- Phase 4: View transitions, /colophon, bundle budget CI gate (main chunk 113.1 kB gz)

## Problem

Four Phase-2/3 items were explicitly deferred as too structurally complex for inline work:

1. **MobileShell rewrite** — at `< 768px`, the site still renders the desktop editor shrunk to phone width. The audit calls this "the single most important change in the whole audit." Currently `ResponsiveLayout.tsx` conditionally renders `<LazyResponsiveTerminal>` for mobile but keeps the editor chrome. Need a separate `<MobileShell>` component tree with terminal-first layout, bottom thumb nav, and `/` shortcut for command palette.

2. **Open-tabs bar** — the file tree allows only one "active" section at a time. A real editor has multi-tab state: click a file → tab opens; tabs are closeable; `Cmd+W` closes active tab; URL reflects the active tab.

3. **Cmd+P / Cmd+Shift+P command palette** — `KeyboardShortcutsHelp.tsx` exists but there is no fuzzy-search command palette. The audit specifies it should share a command tree with the terminal (`cd`, `open`, `search`, `theme` all wire to real navigation).

4. **Backlinks on notes** — `NotesContent.tsx` is currently an empty "seedling" placeholder. Backlinks require a front-matter tag system for note entries and a "mentioned in:" footer.

## Proposed Solution

### 5.1 MobileShell component (`src/components/MobileShell.tsx`)

- Gate: `viewport.isMobile` (`< 768px`) in `ResponsiveLayout.tsx` → render `<MobileShell>` instead of the full desktop editor tree
- Layout: `flex flex-col h-screen` — top bar + main scroll pane + bottom nav + thin status strip
- Top bar: site name + `/` icon (opens palette) + theme toggle
- Main content: reuse `<Editor>` content area (the section content components), full-width
- Bottom nav: 4 fixed items — Files | Lab | Blog | About — using existing section names
- `/` shortcut: opens `<MobileCommandPalette>` (full-screen modal, same items as Cmd+P on desktop)
- Status strip: monospace, cycles through `$ viewing <section>` / `$ press / to search` — no interactive chrome

~~### 5.2 Open-tabs bar — CUT (user decision 2026-04-20)~~
~~TabBar removed from scope. CommandPalette provides equivalent navigation value without 200 lines of tab state management.~~

### 5.2 Command palette (`src/components/CommandPalette.tsx`)

- Trigger: `Cmd+P` (quick-open files), `Cmd+Shift+P` (command palette with nav + actions)
- Shared command tree with the terminal: same `SECTION_ALIASES` map; same `cd`/`open`/`theme` handlers
- UI: modal overlay, `<input>` with fuzzy filter, list of matching commands/files
- Items for Cmd+P: all entries from `FileExplorer.files` (about.txt, experience.txt, …)
- Items for Cmd+Shift+P: files + `theme dark|light|system`, `open /resume`, `cd /`
- Keyboard: `↑↓` navigate, `Enter` activates, `Esc` closes
- Accessible: `role="combobox"`, `aria-expanded`, `aria-activedescendant`
- Reuse in `<MobileCommandPalette>` for mobile `/` shortcut (same component, full-screen CSS variant)

### 5.4 Backlinks on notes (`src/components/sections/NotesContent.tsx`)

- Define `NoteEntry` type: `{ id, title, content, tags: string[], status: 'seedling'|'budding'|'evergreen', updatedAt }`
- Seed with 3–4 real notes to make backlinks demonstrable
- Backlinks: for each note, compute which other notes in the set reference its `id` or share `tags`; render as "mentioned in: …" footer
- Status badge: render `[seedling]`, `[budding]`, `[evergreen]` as a colored pill next to the title

## Files to create / modify

| File | Action |
|------|--------|
| `src/components/MobileShell.tsx` | Create |
| ~~`src/components/TabBar.tsx`~~ | ~~Cut~~ |
| `src/components/CommandPalette.tsx` | Create (uses `cmdk` from existing package.json) |
| `src/components/sections/NotesContent.tsx` | Rewrite (seed notes + backlinks) |
| `src/components/Editor.tsx` | Modify: add TabBar above content |
| `src/components/ResponsiveLayout.tsx` | Modify: gate MobileShell |
| `src/components/Terminal.tsx` | Modify: share command tree with palette |
| `src/pages/Index.tsx` | Modify: add palette open state |
| `src/hooks/useCommandPalette.ts` | Create |

## Acceptance criteria

- [x] At < 768px, the IDE chrome (sidebar, tab bar, desktop terminal) is not visible
- [x] MobileShell bottom nav works; tapping a nav item navigates to that section
- [x] `/` (or tap palette icon) opens MobileCommandPalette; typing fuzzy-filters files; Enter navigates
- [x] On desktop, Cmd+P opens CommandPalette with file list; typing filters; Enter navigates
- [x] On desktop, Cmd+Shift+P opens CommandPalette with commands + files
- ~~[ ] Tab bar appears above editor content~~ — CUT (user decision 2026-04-20)
- [x] `npx tsc --noEmit` clean
- [x] `npm run build:check` all chunks within budget (main 117 kB gz ≤ 140 kB, palette 13 kB gz ≤ 80 kB)
- [x] Notes section renders at least 3 real entries with status badges and backlinks

## Non-goals (explicitly out of scope)

- Full MDX blog pipeline (Phase 6 or later)
- Minimap, breadcrumbs, git decorations in tab bar
- Tab persistence across browser sessions (localStorage)
- Focus-mode / zen-mode
- `git blame` terminal overlay

## Architecture Notes (from review)

- `SECTION_ALIASES` must be **derived from `FileExplorer.files`** at import time — not a parallel constant
- `MobileShell` must get `currentSection` from `useLocation()` directly — not from parent props
- `CommandPalette` shortcut handler must check `e.target instanceof HTMLInputElement` before opening
- `CommandPalette` modal root: `position: fixed; height: 100dvh` for iOS keyboard safety
- Rename `backlinks` → `relatedNotes` in NotesContent
- Use `cmdk` (`<Command>` primitive already in package.json) — no new dependencies
- `CommandPalette` must be lazy-loaded: `lazy(() => import('./CommandPalette'))`
- Status badge colors: seedling=yellow-500, budding=blue-400, evergreen=green-500
- Theme toggle moves from MobileShell top bar → inside CommandPalette items
- Fuzzy filter: `string.includes()` case-insensitive — no library needed

## Decision Audit Trail

| # | Phase | Decision | Classification | Principle | Rationale | Rejected |
|---|-------|----------|-----------|-----------|----------|----------|
| 1 | P0 | Skip /office-hours | MECHANICAL | P6 | Plan is concrete enough | Run office-hours |
| 2 | P1 | Use cmdk for palette | MECHANICAL | P4 | Already in package.json | Build from scratch |
| 3 | P1 | Seed notes + basic relatedNotes | MECHANICAL | P1 | Empty notes = no value | Skip backlinks |
| 4 | P1 | Lazy-load CommandPalette | MECHANICAL | P5 | Rarely-opened modal | Eager load |
| 5 | P1 | Cut open-tabs bar | USER CONFIRMED | User | User chose 3-feature scope | Keep all 4 |
| 6 | P2 | Theme toggle → palette | MECHANICAL | P5 | Simpler top bar | Keep in top bar |
| 7 | P2 | URL = source of truth for nav | MECHANICAL | P5 | Already the pattern | Lift state |
| 8 | P2 | Palette empty state | MECHANICAL | P1 | Completeness | Silent empty |
| 9 | P2 | MobileShell from URL on mount | MECHANICAL | P5 | Explicit over prop-drill | Props |
| 10 | P2 | Fuzzy = string.includes() | MECHANICAL | P4 | No new deps | fuse.js |
| 11 | P2 | Badge colors explicit | MECHANICAL | P5 | Concrete spec | Designer decides |
| 12 | P2 | useMemo on relatedNotes | MECHANICAL | P5 | Explicit perf intent | Unguarded |
| 13 | P3 | Derive SECTION_ALIASES from files | MECHANICAL | P4 | Single source of truth | Parallel const |
| 14 | P3 | MobileShell uses useLocation() | MECHANICAL | P5 | Fix critical URL bug | Props |
| 15 | P3 | Guard palette on terminal input | MECHANICAL | P1 | Fix Cmd+P interference | Fire always |
| 16 | P3 | 100dvh fixed palette for iOS | MECHANICAL | P1 | iOS keyboard fix | No fix |
| 17 | P3 | Rename backlinks → relatedNotes | MECHANICAL | P5 | Accurate name | Keep backlinks |
