#!/usr/bin/env bash
# Bootstrap twobitENT/twobitent-site from a git bundle, zip, or ed-norris-portfolio branch.
#
# Usage:
#   ./scripts/bootstrap-twobitent-repo.sh                    # clone from GitHub branch
#   ./scripts/bootstrap-twobitent-repo.sh ./twobitent-site.bundle
#   ./scripts/bootstrap-twobitent-repo.sh ./twobitent-site.zip
#
# Prerequisite: empty repo at https://github.com/twobitENT/twobitent-site

set -euo pipefail

TARGET="twobitENT/twobitent-site"
CREATE_URL="https://github.com/organizations/twobitENT/repositories/new?name=twobitent-site"
SOURCE_BRANCH="https://github.com/twobitEDD/ed-norris-portfolio.git"
WORKDIR="twobitent-site-publish"

if ! gh repo view "$TARGET" >/dev/null 2>&1; then
  echo "Repository $TARGET not found."
  echo "Create it first (empty, no README): $CREATE_URL"
  exit 1
fi

INPUT="${1:-}"

if [ -z "$INPUT" ]; then
  echo "Cloning 2bitent-site branch from ed-norris-portfolio..."
  rm -rf "$WORKDIR"
  git clone --branch 2bitent-site --single-branch "$SOURCE_BRANCH" "$WORKDIR"
elif [[ "$INPUT" == *.bundle ]]; then
  echo "Cloning from bundle: $INPUT"
  rm -rf "$WORKDIR"
  git clone "$INPUT" "$WORKDIR"
elif [[ "$INPUT" == *.zip ]]; then
  echo "Extracting zip: $INPUT"
  rm -rf "$WORKDIR"
  unzip -q "$INPUT" -d "$WORKDIR-tmp"
  # git archive zip has files at root
  if [ -d "$WORKDIR-tmp" ] && [ "$(ls -A "$WORKDIR-tmp" | wc -l)" -eq 1 ]; then
    mv "$WORKDIR-tmp"/* "$WORKDIR" 2>/dev/null || mv "$WORKDIR-tmp/$(ls "$WORKDIR-tmp")" "$WORKDIR"
  else
    mv "$WORKDIR-tmp" "$WORKDIR"
  fi
  rm -rf "$WORKDIR-tmp"
  cd "$WORKDIR"
  git init -b main
  git add -A
  git commit -m "Initial commit: 2bitENT agency site"
  cd - >/dev/null
else
  echo "Unknown input: $INPUT"
  echo "Use a .bundle file, .zip file, or no argument to clone from GitHub."
  exit 1
fi

cd "$WORKDIR"
git branch -M main
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/${TARGET}.git"
git push -u origin main --force

echo ""
echo "Published: https://github.com/${TARGET}"
