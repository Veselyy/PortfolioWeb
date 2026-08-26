import type { Locator, Page } from '@playwright/test';

/**
 * The hero section at the top of the page.
 *
 * Owned by {@link HomePage} — reach it via `homePage.hero`.
 */
export class Hero {
  readonly page: Page;

  /** The portrait photo — the LCP element, so its loading hints matter. */
  readonly image: Locator;

  constructor(page: Page) {
    this.page = page;
    this.image = page.getByRole('img', { name: 'Martin Veselý, portrétní fotografie' });
  }
}
