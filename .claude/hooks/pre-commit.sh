#!/bin/bash
# Runs before every commit. Exit 2 to BLOCK, exit 0 to ALLOW.
set -e
echo "=== Pre-commit checks ==="

if [ -f "tsconfig.json" ]; then
  echo "Running type check..."
  npx tsc --noEmit || exit 2
fi

STAGED_TS=$(git diff --cached --name-only | grep -E "\.(ts|tsx)$" || true)
if [ -n "$STAGED_TS" ]; then
  echo "Running ESLint..."
  npx eslint $STAGED_TS --quiet || exit 2
fi

if [ -f "package.json" ] && grep -q '"test"' package.json; then
  echo "Running tests..."
  npm test -- --silent || exit 2
fi

echo "All checks passed!"
exit 0
