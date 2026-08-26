import { test as base } from '@playwright/test';

import { HomePage } from './pages/HomePage';

/**
 * The base `test` every spec imports, extended with a ready-made {@link HomePage}.
 *
 * The page object is built but *not* navigated: specs that need a loaded page call
 * `homePage.goto()` in a `beforeEach`, and specs that seed `localStorage` first have to
 * navigate themselves, after seeding (see language.spec.ts).
 */
export const test = base.extend<{ homePage: HomePage }>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect } from '@playwright/test';
