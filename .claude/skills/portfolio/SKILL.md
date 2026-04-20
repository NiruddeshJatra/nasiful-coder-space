---
name: portfolio-review
description: Reviews portfolio site for completeness, polish, and recruiter-readiness. Triggers on requests to audit, polish, or review the portfolio.
user-invocable: true
---

# Portfolio Review Skill

## Rules
- Every project card must have: title, description, 2–4 tech tags, at least one link (live or repo)
- Hero section must have name, role title, and CTA above the fold on mobile
- Contact section must have working email link or form with success/error feedback
- No broken links — all hrefs must resolve
- Lighthouse performance ≥ 90, accessibility ≥ 95
- Resume PDF must be downloadable and up to date
- All placeholder/lorem ipsum content replaced with real content
- Social links (GitHub, LinkedIn) present and correct
- Mobile responsive — test at 375px, 768px, 1280px breakpoints
- No console errors on page load

## When to apply
Triggered on: "review my portfolio", "is my portfolio ready", "audit the site", "pre-deploy check", or any request to polish/finalize the portfolio site.

## Checklist output format
Report as: ✅ Pass | ❌ Fail | ⚠️ Warning — with file path and line for each failure.
