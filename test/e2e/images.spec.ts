import { expect, test } from '@playwright/test';
import { HomePage } from './pages/HomePage';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.goto();
});

test.describe('Image loading hints', () => {
  test('loads the hero photo eagerly at high priority, since it is the LCP element', async () => {
    await expect(homePage.hero.image).toHaveAttribute('loading', 'eager');
    await expect(homePage.hero.image).toHaveAttribute('fetchpriority', 'high');
  });

  test('loads below-the-fold project images lazily, without competing for priority', async () => {
    await expect(homePage.projects.firstCardImage).toHaveAttribute('loading', 'lazy');
    await expect(homePage.projects.firstCardImage).not.toHaveAttribute('fetchpriority', /.*/);
  });
});
