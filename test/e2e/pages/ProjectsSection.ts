import type { Locator, Page } from '@playwright/test';

/**
 * The projects section, below the fold.
 *
 * Owned by {@link HomePage} — reach it via `homePage.projects`.
 */
export class ProjectsSection {
  readonly page: Page;

  readonly section: Locator;
  /** Preview image of the first project card. */
  readonly firstCardImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.section = page.locator('#projects');
    this.firstCardImage = page.getByRole('img', { name: 'Náhled projektu Myšlenkové mapy' });
  }
}
