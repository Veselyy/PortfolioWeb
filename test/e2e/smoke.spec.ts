import { CONTACT_FORM_TEXT } from '../../src/data/contactFormText';
import { SEO_CONTENT } from '../../src/data/seoContent';
import { expect, test } from './fixtures';
import { TAG } from './tags';

/**
 * The gate: is this build usable at all?
 *
 * Deliberately shallow and deliberately overlapping with the deeper specs — one check per
 * thing that must work, so a build that fails here is not worth running the rest against.
 * Keep it small; depth belongs in the tiered specs alongside it.
 */
test.describe('Smoke', { tag: TAG.smoke }, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('serves the page with its title and a single H1', async ({ page, homePage }) => {
    await expect(page).toHaveTitle(SEO_CONTENT.cs.title);
    await expect(homePage.h1).toHaveCount(1);
  });

  test('renders the hero photo, decoded and not just present', async ({ homePage }) => {
    await expect(homePage.hero.image).toBeVisible();
    await expect.poll(() => homePage.hero.imageHasLoaded()).toBe(true);
  });

  test('renders the projects section', async ({ homePage }) => {
    await expect(homePage.projects.section).toBeVisible();
  });

  test('sends a message from the contact form', async ({ homePage }) => {
    const form = homePage.contactForm;
    await form.stubSubmit({ status: 200 });

    await form.fillValid();
    await form.submit();

    await expect(form.successAlert).toHaveText(CONTACT_FORM_TEXT.cs.sent);
  });
});
