#!/usr/bin/env sh
set -e

cd "$(dirname "$0")/.."

CV_MARKDOWN_FILES="cv/vesely_martin_cv.md"

pnpm cv:generate >/dev/null

if git diff --quiet -- $CV_MARKDOWN_FILES; then
  exit 0
fi

echo "CV markdown není synchronizované s obsahem webu." >&2
echo "Spusť 'pnpm cv' (nebo 'pnpm cv:generate'), zkontroluj změny a přidej je do commitu:" >&2
echo "  git add $CV_MARKDOWN_FILES" >&2
echo "" >&2
git diff -- $CV_MARKDOWN_FILES >&2
exit 1
