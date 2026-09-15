import type { Locator, Page } from '@playwright/test';

import { SECTION_IDS } from '../../../src/constants/sections';

/**
 * The contact section at the bottom of the page: contact links beside the contact form.
 *
 * Owned by {@link HomePage} — reach it via `homePage.footer`. The form itself has its own
 * page object, `homePage.contactForm`.
 */
export class Footer {
  readonly page: Page;

  readonly root: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator(`#${SECTION_IDS.contact}`);
  }

  /**
   * A contact link, found by its `href` rather than its name — the name is what the tests
   * check, so it can't also be how they find the link.
   */
  contactLink(href: string): Locator {
    return this.root.locator(`a[href="${href}"]`);
  }
}
