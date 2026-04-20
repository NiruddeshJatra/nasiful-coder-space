#!/bin/bash
# Runs after every Edit/Write. Auto-formats the saved file.
FILE="${CLAUDE_TOOL_INPUT_PATH:-}"
if [ -z "$FILE" ]; then exit 0; fi
if [[ "$FILE" =~ \.(ts|tsx|js|jsx)$ ]]; then
  if command -v npx &>/dev/null; then
    npx prettier --write "$FILE" --log-level silent 2>/dev/null || true
    npx eslint "$FILE" --fix --quiet 2>/dev/null || true
  fi
fi
exit 0
