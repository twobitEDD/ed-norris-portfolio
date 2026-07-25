#!/usr/bin/env bash
# Push 2bitent-site branch to twobitENT/twobitent-site (run locally after creating empty repo).
set -euo pipefail

TARGET="twobitENT/twobitent-site"
CREATE_URL="https://github.com/organizations/twobitENT/repositories/new?name=twobitent-site"

if ! gh repo view "$TARGET" >/dev/null 2>&1; then
  echo "Repository $TARGET does not exist yet."
  echo "Create it first: $CREATE_URL"
  echo "Then re-run this script."
  exit 1
fi

git push "https://github.com/${TARGET}.git" HEAD:main --force
echo "Published: https://github.com/${TARGET}"
