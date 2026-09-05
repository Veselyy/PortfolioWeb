import { LANGUAGE_SWITCHER_TEXT } from '../../src/data/languageSwitcherText';
import { SEO_CONTENT } from '../../src/data/seoContent';
import { expect, test } from './fixtures';
import { TAG } from './tags';

const SITE_URL = 'https://martinvesely.netlify.app/';

test.beforeEach(async ({ homePage }) => {
  await homePage.goto();
});

/** Tags a crawler or a link preview reads, none of which are visible on the rendered page. */
test.describe('SEO — static head tags', { tag: TAG.seo }, () => {
  test('has exactly one H1', async ({ homePage }) => {
    await expect(homePage.h1).toHaveCount(1);
  });

  test('has a title and meta description matching the Czech default', async ({
    page,
    homePage,
  }) => {
    await expect(page).toHaveTitle(SEO_CONTENT.cs.portfolio.title);
    await expect(homePage.metaDescription).toHaveAttribute(
      'content',
      SEO_CONTENT.cs.portfolio.description,
    );
  });

  test('declares the default document language as cs', async ({ homePage }) => {
    await expect(homePage.html).toHaveAttribute('lang', 'cs');
  });

  test('has a canonical link pointing at the production URL', async ({ homePage }) => {
    await expect(homePage.canonicalLink).toHaveAttribute('href', SITE_URL);
  });

  test('has a favicon link', async ({ homePage }) => {
    await expect(homePage.faviconLink).toHaveAttribute('href', /.+/);
  });

  test('has a viewport meta tag for responsive/mobile SEO', async ({ homePage }) => {
    await expect(homePage.viewportMeta).toHaveAttribute('content', /width=device-width/);
  });

  test('has complete Open Graph tags', async ({ homePage }) => {
    await expect(homePage.ogType).toHaveAttribute('content', 'website');
    await expect(homePage.ogSiteName).toHaveAttribute('content', /.+/);
    await expect(homePage.ogTitle).toHaveAttribute('content', /.+/);
    await expect(homePage.ogDescription).toHaveAttribute('content', /.+/);
    await expect(homePage.ogImage).toHaveAttribute('content', /^https?:\/\//);
    await expect(homePage.ogUrl).toHaveAttribute('content', SITE_URL);
  });

  test('has Twitter card tags', async ({ homePage }) => {
    await expect(homePage.twitterCard).toHaveAttribute('content', 'summary_large_image');
    await expect(homePage.twitterTitle).toHaveAttribute('content', /.+/);
    await expect(homePage.twitterDescription).toHaveAttribute('content', /.+/);
    await expect(homePage.twitterImage).toHaveAttribute('content', /^https?:\/\//);
  });

  test('has valid Person JSON-LD structured data', async ({ homePage }) => {
    const data = await homePage.readJsonLd();
    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBe('Person');
    expect(data.name).toBeTruthy();
    expect(data.url).toBe(SITE_URL);
  });

  test('is not blocked from indexing', async ({ homePage }) => {
    if (await homePage.robotsMeta.count()) {
      await expect(homePage.robotsMeta).not.toHaveAttribute('content', /noindex/);
    }
  });
});

test.describe('SEO — language toggle updates head tags', { tag: TAG.seo }, () => {
  test('switching to English updates title, meta description and html lang', async ({
    page,
    homePage,
  }) => {
    await homePage.switchLanguage(LANGUAGE_SWITCHER_TEXT.cs.ariaLabel);

    await expect(page).toHaveTitle(SEO_CONTENT.en.portfolio.title);
    await expect(homePage.metaDescription).toHaveAttribute(
      'content',
      SEO_CONTENT.en.portfolio.description,
    );
    await expect(homePage.html).toHaveAttribute('lang', 'en');
  });

  test('switching back to Czech restores the original title, description and lang', async ({
    page,
    homePage,
  }) => {
    await homePage.switchLanguage(LANGUAGE_SWITCHER_TEXT.cs.ariaLabel);
    await homePage.switchLanguage(LANGUAGE_SWITCHER_TEXT.en.ariaLabel);

    await expect(page).toHaveTitle(SEO_CONTENT.cs.portfolio.title);
    await expect(homePage.metaDescription).toHaveAttribute(
      'content',
      SEO_CONTENT.cs.portfolio.description,
    );
    await expect(homePage.html).toHaveAttribute('lang', 'cs');
  });
});
