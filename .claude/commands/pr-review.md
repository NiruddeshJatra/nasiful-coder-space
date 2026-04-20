---
name: pr-review
argument-hint: [pr-number]
---

Review pull request #$ARGUMENTS:
1. `gh pr view $ARGUMENTS` — read title, description, linked issues
2. `gh pr diff $ARGUMENTS` — review all changed files
3. Delegate to code-reviewer agent for systematic analysis
4. Check: tests added for new functionality?
5. Check: no breaking changes without version bump?
6. Check: PR description explains the why, not just the what?
7. Post review via `gh pr review $ARGUMENTS --comment --body "..."`
