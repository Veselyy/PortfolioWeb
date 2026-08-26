import AxeBuilder from '@axe-core/playwright';
import type { Locator, Page } from '@playwright/test';
import type { Result } from 'axe-core';

/** Same rule set Lighthouse's accessibility audit is built on. */
const LIGHTHOUSE_EQUIVALENT_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

export class HomePage {
  readonly page: Page;

  readonly h1: Locator;
  readonly html: Locator;
  readonly metaDescription: Locator;
  readonly canonicalLink: Locator;
  readonly faviconLink: Locator;
  readonly viewportMeta: Locator;
  readonly robotsMeta: Locator;
  readonly jsonLd: Locator;

  readonly ogType: Locator;
  readonly ogSiteName: Locator;
  readonly ogTitle: Locator;
  readonly ogDescription: Locator;
  readonly ogImage: Locator;
  readonly ogUrl: Locator;

  readonly twitterCard: Locator;
  readonly twitterTitle: Locator;
  readonly twitterDescription: Locator;
  readonly twitterImage: Locator;

  readonly mobileNavOpenButton: Locator;
  readonly mobileNavCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.h1 = page.locator('h1');
    this.html = page.locator('html');
    this.metaDescription = page.locator('meta[name="description"]');
    this.canonicalLink = page.locator('link[rel="canonical"]');
    this.faviconLink = page.locator('link[rel="icon"]');
    this.viewportMeta = page.locator('meta[name="viewport"]');
    this.robotsMeta = page.locator('meta[name="robots"]');
    this.jsonLd = page.locator('script[type="application/ld+json"]');

    this.ogType = page.locator('meta[property="og:type"]');
    this.ogSiteName = page.locator('meta[property="og:site_name"]');
    this.ogTitle = page.locator('meta[property="og:title"]');
    this.ogDescription = page.locator('meta[property="og:description"]');
    this.ogImage = page.locator('meta[property="og:image"]');
    this.ogUrl = page.locator('meta[property="og:url"]');

    this.twitterCard = page.locator('meta[name="twitter:card"]');
    this.twitterTitle = page.locator('meta[name="twitter:title"]');
    this.twitterDescription = page.locator('meta[name="twitter:description"]');
    this.twitterImage = page.locator('meta[name="twitter:image"]');

    this.mobileNavOpenButton = page.getByRole('button', {
      name: /Otevřít navigaci|Open navigation/,
    });
    this.mobileNavCloseButton = page.getByRole('button', {
      name: /Zavřít navigaci|Close navigation/,
    });
  }

  async goto() {
    await this.page.goto('/');
  }

  /** Clicks the language switcher; `label` is the accessible name of its current state. */
  async switchLanguage(label: string) {
    await this.page.getByLabel(label).click();
  }

  /** Clicks the theme switcher; `label` is the accessible name of its current state. */
  async switchTheme(label: string) {
    await this.page.getByLabel(label).click();
  }

  async openMobileNav() {
    await this.mobileNavOpenButton.click();
    // The drawer is a lazy chunk fetched on this first tap, so it is not in the DOM yet.
    await this.mobileNavCloseButton.waitFor({ state: 'visible' });
  }

  async readJsonLd(): Promise<Record<string, unknown>> {
    const text = await this.jsonLd.textContent();
    return JSON.parse(text ?? '{}');
  }

  /** Runs axe against the current page state, scoped to Lighthouse's accessibility rule set. */
  async scanForAccessibilityViolations(): Promise<Result[]> {
    // Freeze CSS transitions/animations first so axe reads final colors, not a mid-transition
    // frame (e.g. right after toggling the theme, or while the nav drawer is still sliding in).
    await this.page.addStyleTag({
      content:
        '*, *::before, *::after { transition: none !important; animation: none !important; }',
    });

    const results = await new AxeBuilder({ page: this.page })
      .withTags(LIGHTHOUSE_EQUIVALENT_TAGS)
      .analyze();

    return results.violations;
  }
}
