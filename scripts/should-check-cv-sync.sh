#!/usr/bin/env sh
set -e

# Run CV sync check when staged files touch CV sources or generated markdown.
CV_SYNC_FILE_PATTERN='^(src/content/(about-me|work-approach)\.md|src/data/(aboutMeContent|contact|headerContent|projectsContent)\.ts|scripts/(generate-cv|check-cv-sync)\.(ts|sh)|CV-(FE|BE|SUPP)\.md)$'

for file in $(git diff --cached --name-only --diff-filter=ACMR); do
  if echo "$file" | grep -qE "$CV_SYNC_FILE_PATTERN"; then
    exit 0
  fi
done

exit 1
