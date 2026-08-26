import type { Locator, Page } from '@playwright/test';

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
  }

  async goto() {
    await this.page.goto('/');
  }

  /** Clicks the language switcher; `label` is the accessible name of its current state. */
  async switchLanguage(label: string) {
    await this.page.getByLabel(label).click();
  }

  async readJsonLd(): Promise<Record<string, unknown>> {
    const text = await this.jsonLd.textContent();
    return JSON.parse(text ?? '{}');
  }
}
