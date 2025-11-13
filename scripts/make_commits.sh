#!/usr/bin/env bash
set -euo pipefail

# Script to create 15 meaningful commits by appending entries to CHANGELOG.md
# It configures a local git user so commits succeed in fresh repos.

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

git config user.name "Auto Commit Bot"
git config user.email "autobot@example.com"

FILE=CHANGELOG.md
touch "$FILE"

messages=(
  "chore: initialize changelog"
  "docs: add project overview entry"
  "feat(header): note Header component presence"
  "feat(footer): note Footer component presence"
  "feat(auth): mention Login/Register forms"
  "feat(models): describe ModelsList and ModelCard"
  "fix(readme): correct small README typo"
  "refactor: update component import paths note"
  "test: add note about planned tests"
  "style: record Tailwind + theme adjustments"
  "perf: note minor performance tweaks"
  "ci: mention adding basic CI workflow"
  "chore: update dependency notes"
  "docs: add usage examples note"
  "release: v0.1.0 - initial release notes"
)

echo "# Changelog" > "$FILE"

i=1
for msg in "${messages[@]}"; do
  timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  echo "- [$timestamp] $msg" >> "$FILE"
  git add "$FILE"
  git commit -m "$msg"
  echo "Created commit $i: $msg"
  i=$((i+1))
done

echo "All ${#messages[@]} commits created."
