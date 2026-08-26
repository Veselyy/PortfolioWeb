import { expect, test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { SEO_CONTENT } from '../src/data/seoContent';
import { LANGUAGE_SWITCHER_TEXT } from '../src/data/languageSwitcherText';

const SITE_URL = 'https://martinvesely.netlify.app/';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.goto();
});

test.describe('SEO — static head tags', () => {
  test('has exactly one H1', async () => {
    await expect(homePage.h1).toHaveCount(1);
  });

  test('has a title and meta description matching the Czech default', async ({ page }) => {
    await expect(page).toHaveTitle(SEO_CONTENT.cs.title);
    await expect(homePage.metaDescription).toHaveAttribute('content', SEO_CONTENT.cs.description);
  });

  test('declares the default document language as cs', async () => {
    await expect(homePage.html).toHaveAttribute('lang', 'cs');
  });

  test('has a canonical link pointing at the production URL', async () => {
    await expect(homePage.canonicalLink).toHaveAttribute('href', SITE_URL);
  });

  test('has a favicon link', async () => {
    await expect(homePage.faviconLink).toHaveAttribute('href', /.+/);
  });

  test('has a viewport meta tag for responsive/mobile SEO', async () => {
    await expect(homePage.viewportMeta).toHaveAttribute('content', /width=device-width/);
  });

  test('has complete Open Graph tags', async () => {
    await expect(homePage.ogType).toHaveAttribute('content', 'website');
    await expect(homePage.ogSiteName).toHaveAttribute('content', /.+/);
    await expect(homePage.ogTitle).toHaveAttribute('content', /.+/);
    await expect(homePage.ogDescription).toHaveAttribute('content', /.+/);
    await expect(homePage.ogImage).toHaveAttribute('content', /^https?:\/\//);
    await expect(homePage.ogUrl).toHaveAttribute('content', SITE_URL);
  });

  test('has Twitter card tags', async () => {
    await expect(homePage.twitterCard).toHaveAttribute('content', 'summary_large_image');
    await expect(homePage.twitterTitle).toHaveAttribute('content', /.+/);
    await expect(homePage.twitterDescription).toHaveAttribute('content', /.+/);
    await expect(homePage.twitterImage).toHaveAttribute('content', /^https?:\/\//);
  });

  test('has valid Person JSON-LD structured data', async () => {
    const data = await homePage.readJsonLd();
    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBe('Person');
    expect(data.name).toBeTruthy();
    expect(data.url).toBe(SITE_URL);
  });

  test('is not blocked from indexing', async () => {
    if (await homePage.robotsMeta.count()) {
      await expect(homePage.robotsMeta).not.toHaveAttribute('content', /noindex/);
    }
  });
});

test.describe('SEO — language toggle updates head tags', () => {
  test('switching to English updates title, meta description and html lang', async ({ page }) => {
    await homePage.switchLanguage(LANGUAGE_SWITCHER_TEXT.cs.ariaLabel);

    await expect(page).toHaveTitle(SEO_CONTENT.en.title);
    await expect(homePage.metaDescription).toHaveAttribute('content', SEO_CONTENT.en.description);
    await expect(homePage.html).toHaveAttribute('lang', 'en');
  });

  test('switching back to Czech restores the original title, description and lang', async ({
    page,
  }) => {
    await homePage.switchLanguage(LANGUAGE_SWITCHER_TEXT.cs.ariaLabel);
    await homePage.switchLanguage(LANGUAGE_SWITCHER_TEXT.en.ariaLabel);

    await expect(page).toHaveTitle(SEO_CONTENT.cs.title);
    await expect(homePage.metaDescription).toHaveAttribute('content', SEO_CONTENT.cs.description);
    await expect(homePage.html).toHaveAttribute('lang', 'cs');
  });
});
