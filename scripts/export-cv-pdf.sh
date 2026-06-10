#!/usr/bin/env sh
set -e

cd "$(dirname "$0")/.."

if ! command -v pandoc >/dev/null 2>&1; then
  echo "pandoc is required. Install it first: https://pandoc.org/installing.html" >&2
  exit 1
fi

export_cv_pdf() {
  input="$1"
  output="$2"

  if command -v wkhtmltopdf >/dev/null 2>&1; then
    pandoc "$input" -o "$output" \
      --pdf-engine=wkhtmltopdf \
      --css="scripts/cv-pdf.css" \
      --variable margin-left=10mm \
      --variable margin-right=10mm \
      --variable margin-top=12mm \
      --variable margin-bottom=12mm
  else
    pandoc "$input" -o "$output" \
      -H "scripts/cv-pdf-header.tex" \
      -V papersize=a4 \
      -V fontsize=11pt \
      -V colorlinks=true
  fi

  echo "Wrote $output"
}

for variant in FE BE SUPP; do
  export_cv_pdf "CV-${variant}.md" "CV-${variant}.pdf"
done
