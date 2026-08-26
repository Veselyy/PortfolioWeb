import { expect, test } from './fixtures';
import { TAG } from './tags';

/**
 * The loading hints that decide how fast the page paints. The budgets they serve are
 * asserted by Lighthouse (`lighthouserc.json`, `pnpm test:perf`); this only pins the markup
 * those budgets depend on, which is cheap to break in a refactor and invisible until a
 * Lighthouse run catches it.
 */
test.describe('Image loading hints', { tag: TAG.perf }, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('loads the hero photo eagerly at high priority, since it is the LCP element', async ({
    homePage,
  }) => {
    await expect(homePage.hero.image).toHaveAttribute('loading', 'eager');
    await expect(homePage.hero.image).toHaveAttribute('fetchpriority', 'high');
  });

  test('loads below-the-fold project images lazily, without competing for priority', async ({
    homePage,
  }) => {
    await expect(homePage.projects.firstCardImage).toHaveAttribute('loading', 'lazy');
    await expect(homePage.projects.firstCardImage).not.toHaveAttribute('fetchpriority', /.*/);
  });
});
