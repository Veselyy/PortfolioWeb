import { LANGUAGE_STORAGE_KEY } from '../../src/constants/preferences';
import { FOOTER_CONTENT } from '../../src/data/footerContent';
import { UI_TEXT } from '../../src/data/uiText';
import { expect, test } from './fixtures';
import { TAG } from './tags';

/**
 * What a screen reader announces for the footer contact links, and which of them open a new tab.
 *
 * axe only checks that each name *contains* the visible text (WCAG 2.5.3), so it doesn't notice
 * a missing purpose or "opens in a new tab" suffix.
 */
test.describe('Footer contact links', { tag: TAG.regression }, () => {
  for (const lang of ['cs', 'en'] as const) {
    test.describe(lang, () => {
      test.beforeEach(async ({ homePage }) => {
        await homePage.seedStorage({ [LANGUAGE_STORAGE_KEY]: lang });
        await homePage.goto();
      });

      for (const item of FOOTER_CONTENT[lang].contactItems) {
        const external = 'external' in item && item.external;

        test(`${item.key}: announces its purpose${external ? ' and that it opens a new tab' : ''}`, async ({
          homePage,
        }) => {
          const link = homePage.footer.contactLink(item.href);
          const expectedName = external
            ? `${item.text} ${item.purpose} ${UI_TEXT[lang].newTab}`
            : `${item.text} ${item.purpose}`;

          await expect(link).toHaveAccessibleName(expectedName);
        });

        test(`${item.key}: ${external ? 'opens' : 'does not open'} in a new tab`, async ({
          homePage,
        }) => {
          const link = homePage.footer.contactLink(item.href);

          if (external) {
            await expect(link).toHaveAttribute('target', '_blank');
            await expect(link).toHaveAttribute('rel', /noreferrer/);
          } else {
            // mailto:/tel: hand off to a local app; a new tab would just be left empty.
            await expect(link).not.toHaveAttribute('target', /.*/);
          }
        });
      }
    });
  }
});
