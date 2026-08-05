<img src="./public/og-image.png" alt="niruddeshjatra.space — a quiet corner of the internet" width="100%" />

<br />

# nasiful-coder-space

**A developer portfolio built to feel like a workspace, not a resume.**

VS Code shell. Interactive terminal. Bilingual CS writing. Deployed as a prerendered static site.

[![Live](https://img.shields.io/badge/Live-niruddeshjatra.space-00d26a?style=for-the-badge&logo=vercel&logoColor=white)](https://niruddeshjatra.space/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## Overview

The UI is modeled after VS Code — file explorer on the left, editor pane in the center, terminal at the bottom. Navigation happens through files, not nav links. Every section of my life (writing, running, games, field notes) is a file in a tree.

The writing section runs a separate design system: **"The Paper Oscilloscope"** — warm aged-paper aesthetic, outside the VS Code shell entirely. It hosts a bilingual (বাংলা / English) series on how computers actually work, with interactive widgets built in plain React: transistors, clock cycles, instruction pipelines, adders.

The whole thing deploys as a static site. A custom prerender pipeline (headless Chrome via `puppeteer-core`) crawls every route post-build and writes crawler-visible HTML with full meta — so Facebook, LinkedIn, and search crawlers get real `og:` tags without running JavaScript.

---

## Screenshots

<table>
  <tr>
    <td align="center" width="50%">
      <img src="./public/og-image.png" alt="Homepage — niruddeshjatra.space" width="100%" />
      <sub><b>Homepage</b> — terminal intro, VS Code shell, matrix backdrop</sub>
    </td>
    <td align="center" width="50%">
      <img src="./public/og/tech-articles.png" alt="The Machine Beneath Your Code — article series hub" width="100%" />
      <sub><b>Article Series Hub</b> — The Machine Beneath Your Code</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="./public/og/heartbeat-fde.png" alt="Heartbeat: Fetch-Decode-Execute — article" width="100%" />
      <sub><b>Tech Article</b> — Heartbeat: Fetch-Decode-Execute (Paper Oscilloscope design system)</sub>
    </td>
    <td align="center" width="50%">
      <img src="./public/og/cpu-blueprint.png" alt="The CPU's Blueprint — article" width="100%" />
      <sub><b>Tech Article</b> — The CPU's Blueprint</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="./public/og/whats-inside-a-bit.png" alt="What's Inside a Bit — article" width="100%" />
      <sub><b>Tech Article</b> — What's Inside a Bit</sub>
    </td>
    <td align="center" width="50%">
      <img src="./public/og/how-does-anything-become-bits.png" alt="How Does Anything Become Bits — article" width="100%" />
      <sub><b>Tech Article</b> — How Does Anything Become Bits</sub>
    </td>
  </tr>
</table>

---

## Features

- **VS Code shell** — file explorer, editor pane, interactive terminal with custom commands (`help`, `ls`, `cd`, `open`, `clear`, `whoami`)
- **Command palette** — `Cmd+P` opens file navigation, `Cmd+Shift+P` opens commands; built with `cmdk`
- **Paper Oscilloscope** — a separate article design system with aged-paper typography, inline interactive instruments (transistors, adders, clock visualizers, pipeline demos), and bilingual toggle
- **Bilingual articles** — Bangla/English toggle with no URL change; Bengali numerals via `bd()` helper; `lang="bn"` for correct font rendering; SEO title/description updates dynamically
- **SSG prerendering** — `puppeteer-core` crawls every route post-build; CI hard-fails if no browser resolves (catches silent meta-less deploys)
- **Build-time OG images** — `sharp` generates 1200×630 `og/<slug>.png` per published article at build time — no manual step
- **Build-time sitemap** — `scripts/generate-sitemap.mjs` writes `sitemap.xml` + `robots.txt` with explicit hreflang pairing
- **Theme switching** — dark / light / system via `next-themes`; phosphor green accent on dark, ink-on-paper for articles
- **Matrix background** — ambient katakana/digit rain with per-section opacity tuning; GPU-composited on mobile
- **Mobile layout** — slide-in file drawer + slide-up terminal sheet; visual viewport API for keyboard offset; no separate mobile shell
- **Portal transitions** — scramble + cloud-dissolve animation between site areas via GSAP (`firePortal()` singleton)
- **Structured data** — JSON-LD `WebSite`, `Person`, `Article` schemas per route via `react-helmet-async`

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 + TypeScript 5 |
| Build tool | Vite 5 + `@vitejs/plugin-legacy` (spread — plugin returns `Plugin[]`) |
| Styling | Tailwind CSS 3 + Radix UI + shadcn/ui |
| Animation | GSAP 3 |
| Routing | React Router v6 |
| State / async | TanStack Query v5 |
| Forms | React Hook Form + Zod |
| SEO | `react-helmet-async` + custom prerender pipeline |
| Image gen | `sharp` (OG images + favicons at build time) |
| Prerender | `puppeteer-core` + `@sparticuz/chromium` (serverless fallback) |
| Deploy | Vercel — apex domain canonical, `www` → apex 301 redirect |

**Article instruments** are plain React — no DC runtime, no template engine, no external dependencies.

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `gsap` | Portal scramble + cloud-dissolve transitions |
| `cmdk` | Command palette (`Cmd+P` / `Cmd+Shift+P`) |
| `next-themes` | Dark / light / system theme provider |
| `react-helmet-async` | Per-route `<head>` management (title, meta, JSON-LD) |
| `react-router-dom` | Client-side routing + catch-all 404 via `forceSection` |
| `@tanstack/react-query` | Async state, server data fetching |
| `react-hook-form` + `zod` | Contact form validation |
| `react-resizable-panels` | Editor / terminal panel layout |
| `vaul` | Mobile terminal slide-up sheet |
| `sharp` | Build-time OG + favicon image generation |
| `puppeteer-core` | Post-build SSG prerendering |
| `@sparticuz/chromium` | Serverless-compatible Chrome binary (Vercel builds) |
| `tsx` | Runs `.ts` build scripts (`generate-og`, `generate-sitemap`) |
| `recharts` | Charts (if/when analytics are surfaced) |
| `lucide-react` + `react-icons` | Icon sets |

---

## Local Setup

```bash
# Clone and install
git clone https://github.com/NiruddeshJatra/nasiful-coder-space.git
cd nasiful-coder-space
npm install

# Start dev server
npm run dev
# → http://localhost:5173
```

**Full production build** (generates OG images, favicons, sitemap, runs Vite, prerenders all routes):

```bash
npm run build
npm run preview
```

Individual build steps (if iterating):

```bash
npm run generate-og        # → public/og-image.png + public/og/<slug>.png
npm run generate-favicons  # → public/favicon-*.png, apple-touch-icon, etc.
npm run generate-sitemap   # → public/sitemap.xml + public/robots.txt
npm run prerender          # → crawls dist/ and writes static HTML per route
```

Prerender with a specific Chrome binary (local dev):

```bash
CHROME_PATH="/path/to/chrome" npm run prerender
```

Type check and lint:

```bash
npx tsc --noEmit
npm run lint
```

> **Note on prerender in CI** — the build hard-fails if no browser resolves (`CHROME_PATH`, desktop Chrome, or `@sparticuz/chromium`). This is intentional: a silent failure would ship meta-less HTML.

---

## Stats

<p>
  <img height="165" src="https://github-readme-stats.vercel.app/api?username=NiruddeshJatra&show_icons=true&theme=github_dark&hide_border=true&count_private=true&cache_seconds=86400" alt="GitHub Stats" />
  <img height="165" src="https://github-readme-stats.vercel.app/api/top-langs/?username=NiruddeshJatra&layout=compact&theme=github_dark&hide_border=true&langs_count=8&cache_seconds=86400" alt="Top Languages" />
</p>

<p>
  <img src="https://streak-stats.demolab.com?user=NiruddeshJatra&theme=github-dark&hide_border=true" alt="GitHub Streak" />
</p>

---

## Stack (Personal)

**Backend**

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![DRF](https://img.shields.io/badge/Django%20REST-A30000?style=for-the-badge&logo=django&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Celery](https://img.shields.io/badge/Celery-37814A?style=for-the-badge&logo=celery&logoColor=white)

**Frontend**

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)

**Data**

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-FF4438?style=for-the-badge&logo=redis&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)

**Infra & Tools**

![AWS](https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonwebservices&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)

---

## Links

[![Portfolio](https://img.shields.io/badge/Portfolio-niruddeshjatra.space-00d26a?style=for-the-badge&logo=vercel&logoColor=white)](https://niruddeshjatra.space/)
[![Writing](https://img.shields.io/badge/Writing-The%20Machine%20Beneath%20Your%20Code-00d26a?style=for-the-badge&logo=vercel&logoColor=white)](https://niruddeshjatra.space/writing/tech-articles)
[![ArcZero](https://img.shields.io/badge/Game-ArcZero-44aaff?style=for-the-badge&logo=gamepad&logoColor=white)](https://arczero.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nasiful-alam/)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:nasif@niruddeshjatra.space)
