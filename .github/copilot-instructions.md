# Copilot code review instructions

Personal portfolio SPA (React 19 + TypeScript, Vite, MUI/Emotion — no Tailwind). Content sources
also generate CV variants (`pnpm cv`), so changes to `src/data/**` or `src/content/**` can affect
the generated CV as well as the site.

## Conventions to check for

- **Components**: functional components + hooks only. Styles via CSS Modules or MUI's `sx` —
  flag any Tailwind classes. Props should be typed (strict mode); avoid prop-drilling in favor of
  context/composition.
- **Unit tests** (`src/**/*.test.ts(x)`, Jest + React Testing Library): should cover risky
  logic/edge cases, not exist for coverage's sake. Prefer asserting user-facing behavior over
  implementation details.
- **E2E tests** (`e2e/**/*.spec.ts`, Playwright): follow the **Page Object Model** — locators and
  page actions belong in `e2e/pages/*.ts` classes; spec files should only call POM
  methods/locators and hold `expect()` assertions plus test-only data. Flag any raw
  `page.locator()` / `page.goto()` calls inlined directly in a spec file.
- **CV generation scripts** (`scripts/generate-cv.ts`, `scripts/cv-pdf-header.tex`,
  `scripts/export-cv-pdf.sh`): these have a history of relative-path bugs when the CV's
  input/output location changes (see the `cv/` restructure). Check that any path changes there
  still resolve correctly for both the wkhtmltopdf and LaTeX PDF export branches.
- **Dependencies**: keep them lean — a new package in `package.json` should earn its place.

## Not worth flagging

- Generated files: `cv/vesely_martin_cv.md` (run `pnpm cv:generate` to update, don't hand-edit),
  `cv/vesely_martin_cv.pdf`, `pnpm-lock.yaml`, `dist/`.
