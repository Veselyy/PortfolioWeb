import { THEME_SWITCHER_TEXT } from '../../src/data/themeSwitcherText';
import { expect, test } from './fixtures';
import { TAG } from './tags';

/**
 * axe run against the states a static scan of the light-mode page would miss: the other
 * theme, and the mobile drawer while it is open.
 */
test.describe('Accessibility', { tag: TAG.a11y }, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('has no violations in light mode (default)', async ({ homePage }) => {
    expect(await homePage.scanForAccessibilityViolations()).toEqual([]);
  });

  test('has no violations in dark mode', async ({ homePage }) => {
    await homePage.switchTheme(THEME_SWITCHER_TEXT.cs.switchToDark);

    expect(await homePage.scanForAccessibilityViolations()).toEqual([]);
  });

  test('has no violations on mobile with the nav drawer open', async ({ page, homePage }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await homePage.openMobileNav();

    expect(await homePage.scanForAccessibilityViolations()).toEqual([]);
  });
});
