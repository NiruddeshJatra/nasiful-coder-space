---
name: fix-issue
argument-hint: [issue-number]
---

Fix GitHub issue #$ARGUMENTS:
1. `gh issue view $ARGUMENTS` — read fully
2. Find relevant files using Grep and Glob
3. Implement minimal fix — no scope creep
4. Write a regression test that would have caught this
5. Run test suite — all must pass
6. Commit: `fix: <description> (closes #$ARGUMENTS)`
