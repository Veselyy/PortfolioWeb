import { LANGUAGE_STORAGE_KEY } from '../../src/context/languageContext';
import { LANGUAGE_SWITCHER_TEXT } from '../../src/data/languageSwitcherText';
import { expect, test } from './fixtures';
import { TAG } from './tags';

/**
 * How the language is chosen and remembered across loads.
 *
 * What the toggle does to the head tags (title, description, html lang) is covered in
 * seo.spec.ts. No shared `beforeEach` here: seeding `localStorage` has to happen before the
 * app boots, so each test navigates at its own point.
 */
test.describe('Language selection', { tag: TAG.regression }, () => {
  test('defaults to Czech on a first visit', async ({ homePage }) => {
    await homePage.goto();

    await expect(homePage.html).toHaveAttribute('lang', 'cs');
  });

  test('restores a language saved from a previous visit', async ({ homePage }) => {
    await homePage.seedStorage({ [LANGUAGE_STORAGE_KEY]: 'en' });

    await homePage.goto();

    await expect(homePage.html).toHaveAttribute('lang', 'en');
  });

  test('falls back to Czech when the saved value is not a supported language', async ({
    homePage,
  }) => {
    await homePage.seedStorage({ [LANGUAGE_STORAGE_KEY]: 'garbage' });

    await homePage.goto();

    await expect(homePage.html).toHaveAttribute('lang', 'cs');
  });

  test('persists the choice, so it survives a reload', async ({ page, homePage }) => {
    await homePage.goto();

    await homePage.switchLanguage(LANGUAGE_SWITCHER_TEXT.cs.ariaLabel);
    await expect(homePage.html).toHaveAttribute('lang', 'en');
    expect(await homePage.storedValue(LANGUAGE_STORAGE_KEY)).toBe('en');

    await page.reload();

    await expect(homePage.html).toHaveAttribute('lang', 'en');
  });
});
