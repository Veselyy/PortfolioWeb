import { expect, test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { THEME_SWITCHER_TEXT } from '../../src/data/themeSwitcherText';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.goto();
});

test.describe('Accessibility', () => {
  test('has no violations in light mode (default)', async () => {
    const violations = await homePage.scanForAccessibilityViolations();
    expect(violations).toEqual([]);
  });

  test('has no violations in dark mode', async () => {
    await homePage.switchTheme(THEME_SWITCHER_TEXT.cs.switchToDark);

    const violations = await homePage.scanForAccessibilityViolations();
    expect(violations).toEqual([]);
  });

  test('has no violations on mobile with the nav drawer open', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await homePage.openMobileNav();

    const violations = await homePage.scanForAccessibilityViolations();
    expect(violations).toEqual([]);
  });
});
