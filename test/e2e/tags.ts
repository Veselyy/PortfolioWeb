/**
 * Tiers the suite is grouped into. Every test carries exactly one.
 *
 * Run a single tier with `--grep`, e.g. `pnpm test:smoke`; `pnpm test` runs all of them.
 */
export const TAG = {
  /** Critical paths — the page renders and a message can be sent. A broken build fails here first. */
  smoke: '@smoke',
  /** Deep behaviour: validation branches, error handling, state that survives a reload. */
  regression: '@regression',
  /** axe scans of the rendered page in each theme and at mobile width. */
  a11y: '@a11y',
  /** Head tags, structured data and what the language toggle does to them. */
  seo: '@seo',
  /** Loading hints that decide how fast the page paints. Budgets themselves live in Lighthouse. */
  perf: '@perf',
} as const;
