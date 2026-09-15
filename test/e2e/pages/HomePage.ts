import AxeBuilder from '@axe-core/playwright';
import type { Locator, Page } from '@playwright/test';
import type { Result } from 'axe-core';

import { SECTION_IDS, sectionHeadingId } from '../../../src/constants/sections';
import { ContactForm } from './ContactForm';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { ProjectsSection } from './ProjectsSection';

/** Same rule set Lighthouse's accessibility audit is built on. */
const LIGHTHOUSE_EQUIVALENT_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

/**
 * Rules carrying one of the tags above that axe still ships as `experimental`, so it skips
 * them unless asked. Lighthouse runs them, so the suite has to as well or a violation it
 * reports would pass here.
 */
const EXPERIMENTAL_RULES_LIGHTHOUSE_RUNS = {
  // WCAG 2.5.3: a control's accessible name must contain its visible text, or voice-control
  // users can't activate it by reading the label off the screen.
  'label-content-name-mismatch': { enabled: true },
};

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

  /**
   * One marker per lazily-loaded section, each rendered only once its chunk has arrived —
   * `#about`'s own Suspense fallback keeps the section element, so its `<h2>` is the tell.
   */
  readonly lazySectionMarkers: readonly Locator[];

  /** Sections of the page, each with its own locators. */
  readonly hero: Hero;
  readonly projects: ProjectsSection;
  readonly contactForm: ContactForm;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;

    this.hero = new Hero(page);
    this.projects = new ProjectsSection(page);
    this.contactForm = new ContactForm(page);
    this.footer = new Footer(page);

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

    this.lazySectionMarkers = [
      page.locator(`#${sectionHeadingId(SECTION_IDS.about)}`),
      page.locator(`#${SECTION_IDS.work}`),
      page.locator(`#${SECTION_IDS.contact}`),
    ];
  }

  async goto() {
    await this.page.goto('/');

    // `load` fires before AboutMe, WorkApproach and Footer mount — they are dynamic imports
    // kicked off on React's first render. Without this wait an accessibility scan or an
    // assertion silently runs against a page that is missing everything below the fold.
    await Promise.all(
      this.lazySectionMarkers.map((marker) => marker.waitFor({ state: 'attached' })),
    );
  }

  /**
   * Seeds `localStorage` before the app boots.
   *
   * Must be called before {@link goto} — the providers read their initial state during the
   * first render, so anything written after navigation is already too late.
   */
  async seedStorage(entries: Record<string, string>) {
    await this.page.addInitScript((data: Record<string, string>) => {
      for (const [key, value] of Object.entries(data)) {
        window.localStorage.setItem(key, value);
      }
    }, entries);
  }

  async storedValue(key: string): Promise<string | null> {
    return this.page.evaluate((k: string) => window.localStorage.getItem(k), key);
  }

  /** Marks the current document so a full page navigation can be detected afterwards. */
  async markDocument() {
    await this.page.evaluate(() => {
      (window as unknown as { __navigationMarker?: boolean }).__navigationMarker = true;
    });
  }

  async documentStillMarked(): Promise<boolean> {
    return this.page.evaluate(
      () => (window as unknown as { __navigationMarker?: boolean }).__navigationMarker === true,
    );
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

    // `runOnly` goes inside options rather than via `.withTags()`: passing an options object
    // replaces the builder's tag filter, so the two have to travel together.
    const results = await new AxeBuilder({ page: this.page })
      .options({
        runOnly: { type: 'tag', values: LIGHTHOUSE_EQUIVALENT_TAGS },
        rules: EXPERIMENTAL_RULES_LIGHTHOUSE_RUNS,
      })
      .analyze();

    return results.violations;
  }
}
