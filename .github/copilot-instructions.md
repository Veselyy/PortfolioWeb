# Copilot code review instructions

Personal portfolio SPA (React 19 + TypeScript, Vite, MUI/Emotion — no Tailwind). Content sources
also generate CV variants (`pnpm cv`), so changes to `src/data/**` or `src/content/**` can affect
the generated CV as well as the site.

## Conventions to check for

- **Components**: functional components + hooks only. Styles via CSS Modules or MUI's `sx` —
  flag any Tailwind classes. Props should be typed (strict mode); avoid prop-drilling in favor of
  context/composition.
- **Tests are Playwright only** — there is no Jest, no React Testing Library and no jsdom in
  this repo. Every test is an end-to-end spec under `test/e2e/`, running against the
  production build. Flag any `*.test.ts(x)` file, any `jest`/`@testing-library/*` import, and
  any suggestion to add a unit-test runner back. Tests should cover risky logic/edge cases,
  not exist for coverage's sake — prefer asserting user-facing behavior over implementation
  details.
- **Page Object Model is mandatory**: locators and page actions belong in
  `test/e2e/pages/*.ts` classes; spec files should only call POM methods/locators and hold
  `expect()` assertions plus test-only data (expected copy, field tables). Flag any raw
  `page.locator()` / `page.goto()` / `page.evaluate()` inlined directly in a spec file.
  `HomePage` is the entry point and owns the section objects (`hero`, `projects`,
  `contactForm`) — reach them through it rather than constructing them in a spec.
- **CV generation scripts** (`scripts/generate-cv.ts`, `scripts/cv-pdf-header.tex`,
  `scripts/export-cv-pdf.sh`): these have a history of relative-path bugs when the CV's
  input/output location changes (see the `cv/` restructure). Check that any path changes there
  still resolve correctly for both the wkhtmltopdf and LaTeX PDF export branches.
- **Dependencies**: keep them lean — a new package in `package.json` should earn its place.

## Not worth flagging

- Generated files: `cv/vesely_martin_cv.md` (run `pnpm cv:generate` to update, don't hand-edit),
  `cv/vesely_martin_cv.pdf`, `pnpm-lock.yaml`, `dist/`.
