/**
 * Build-time flags from `.env` (see `.env.example`), parsed once so components don't compare
 * raw strings themselves.
 *
 * Only for code under `src/`: vite.config.ts and the Playwright specs read the same variable
 * through `loadEnv` / `process.env`, since `import.meta.env` isn't available there.
 */

/** `true` = job-hunting variant (role-specific header + availability card), `false` = plain portfolio. */
export const IS_OPEN_TO_WORK = import.meta.env.VITE_IS_OPEN_TO_WORK === 'true';
