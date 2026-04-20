---
name: deploy
argument-hint: [environment: staging|production]
---

Deploy to $ARGUMENTS (Vercel):
1. Confirm environment: $ARGUMENTS
2. Run full test suite — block if any fail
3. Run `npm run build` — block if fails
4. Check for uncommitted changes — commit or stash first
5. Push to deploy branch for $ARGUMENTS
6. Monitor Vercel deployment logs for errors
7. Run smoke tests against deployed URL
8. Report deployment status and live URL
