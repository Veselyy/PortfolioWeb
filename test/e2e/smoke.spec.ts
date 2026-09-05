import { CONTACT_FORM_TEXT } from '../../src/data/contactFormText';
import { HEADER_CONTENT, HEADER_CTA, HEADER_UNIVERSAL_TITLE } from '../../src/data/headerContent';
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
  const isOpenToWork = process.env.VITE_IS_OPEN_TO_WORK === 'true';
  const universalTitle = HEADER_UNIVERSAL_TITLE.cs.parts.map((part) => part.text).join('');
  const frontendTitle = HEADER_CONTENT.cs.frontend.title.parts.map((part) => part.text).join('');

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

  test('renders the expected header variant content and ctas', async ({ homePage }) => {
    if (isOpenToWork) {
      await expect(homePage.hero.title).toContainText(frontendTitle);
      await expect(homePage.hero.subtitle).toHaveText(HEADER_CONTENT.cs.frontend.subtitle);
      await expect(homePage.hero.ctaLink(HEADER_CTA.cs.title)).toBeVisible();
      await expect(homePage.hero.contactLink('Kontaktovat přes WhatsApp')).toBeVisible();
      await expect(homePage.hero.contactLink('Napsat e-mail')).toBeVisible();
      return;
    }

    await expect(homePage.hero.title).toContainText(universalTitle);
    await expect(homePage.hero.subtitle).toHaveCount(0);
    await expect(homePage.hero.ctaLink(HEADER_CTA.cs.title)).toHaveCount(0);
    await expect(homePage.hero.contactLink('Kontaktovat přes WhatsApp')).toHaveCount(0);
    await expect(homePage.hero.contactLink('Napsat e-mail')).toHaveCount(0);
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
