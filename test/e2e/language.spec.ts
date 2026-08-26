import { expect, test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LANGUAGE_STORAGE_KEY } from '../../src/context/languageContext';
import { LANGUAGE_SWITCHER_TEXT } from '../../src/data/languageSwitcherText';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
});

// The head tags that the toggle keeps in sync (title, description, html lang) are covered in
// seo.spec.ts. This file covers how the language is chosen and remembered across loads.

test.describe('Language selection', () => {
  test('defaults to Czech on a first visit', async () => {
    await homePage.goto();

    await expect(homePage.html).toHaveAttribute('lang', 'cs');
  });

  test('restores a language saved from a previous visit', async () => {
    await homePage.seedStorage({ [LANGUAGE_STORAGE_KEY]: 'en' });

    await homePage.goto();

    await expect(homePage.html).toHaveAttribute('lang', 'en');
  });

  test('falls back to Czech when the saved value is not a supported language', async () => {
    await homePage.seedStorage({ [LANGUAGE_STORAGE_KEY]: 'garbage' });

    await homePage.goto();

    await expect(homePage.html).toHaveAttribute('lang', 'cs');
  });

  test('persists the choice, so it survives a reload', async ({ page }) => {
    await homePage.goto();

    await homePage.switchLanguage(LANGUAGE_SWITCHER_TEXT.cs.ariaLabel);
    await expect(homePage.html).toHaveAttribute('lang', 'en');
    expect(await homePage.storedValue(LANGUAGE_STORAGE_KEY)).toBe('en');

    await page.reload();

    await expect(homePage.html).toHaveAttribute('lang', 'en');
  });
});
