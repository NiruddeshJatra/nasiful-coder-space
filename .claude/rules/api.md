---
paths:
  - "src/lib/**"
  - "src/utils/**"
  - "src/hooks/**"
---

# API / Data Layer Rules

- Validate all external data at fetch boundaries before using in components
- Return consistent error shapes: `{ error: string, code: string }`
- Never expose raw fetch errors to UI — map to user-friendly messages
- No business logic in components — delegate to hooks or utils
- Type all API responses — no implicit `any` from JSON
- Use React Query or SWR patterns for server state; avoid manual loading/error state
- Contact form: sanitize inputs before sending, rate-limit awareness on submit handler
