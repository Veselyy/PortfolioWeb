import type { Locator, Page } from '@playwright/test';

/**
 * The hero section at the top of the page.
 *
 * Owned by {@link HomePage} — reach it via `homePage.hero`.
 */
export class Hero {
  readonly page: Page;

  readonly root: Locator;
  readonly title: Locator;
  readonly subtitle: Locator;

  /** The portrait photo — the LCP element, so its loading hints matter. */
  readonly image: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator('header');
    this.title = this.root.getByRole('heading', { level: 1 });
    this.subtitle = this.root.getByRole('heading', { level: 2 });
    this.image = this.root.getByRole('img', { name: 'Martin Veselý, portrétní fotografie' });
  }

  ctaLink(name: string): Locator {
    return this.root.getByRole('link', { name });
  }

  contactLink(name: string): Locator {
    return this.root.getByRole('link', { name });
  }

  /**
   * Whether the photo decoded, rather than merely being present in the DOM.
   *
   * A broken `src` still yields a visible `<img>`, so visibility alone would not catch an
   * asset that failed to ship in the build.
   */
  async imageHasLoaded(): Promise<boolean> {
    return this.image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0);
  }
}
