import { expect, test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import type { FieldName } from './pages/ContactForm';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.goto();
});

/** Field names the Netlify shadow form in index.html registers — these must stay in sync. */
const FIELDS: { name: FieldName; label: string }[] = [
  { name: 'firstName', label: 'Jméno' },
  { name: 'lastName', label: 'Příjmení' },
  { name: 'email', label: 'Email' },
  { name: 'message', label: 'Zpráva' },
];

const EMAIL_ERROR = 'Zadej platný email.';
const MESSAGE_ERROR = 'Zpráva musí mít aspoň 5 znaků.';
const INVALID_SUBMISSION_ERROR = 'Zkontroluj prosím email a zprávu.';
const SUCCESS = 'Odesláno.';

test.describe('Contact form — fields', () => {
  for (const { name, label } of FIELDS) {
    test(`${name} is a required input labelled "${label}"`, async () => {
      const field = homePage.contactForm.field(name);

      await expect(field).toHaveAttribute('required', '');
      await expect(field).toHaveAttribute('name', name);
    });
  }

  test('submit is disabled until the email and message are both valid', async () => {
    const form = homePage.contactForm;

    await expect(form.submitButton).toBeDisabled();

    await form.fillValid();

    await expect(form.submitButton).toBeEnabled();
  });
});

test.describe('Contact form — email validation', () => {
  const MALFORMED = ['plainaddress', '@b.com', 'a@b', 'a@b.', 'a b@c.com', 'a@@b.com'];

  test('shows no inline error while the fields are untouched', async () => {
    const form = homePage.contactForm;

    await expect(form.helperText('email')).not.toHaveText(EMAIL_ERROR);
    await expect(form.helperText('message')).not.toHaveText(MESSAGE_ERROR);
  });

  for (const email of MALFORMED) {
    test(`rejects the malformed address ${email}`, async () => {
      const form = homePage.contactForm;

      await form.fill({ email });

      await expect(form.email).toHaveAttribute('aria-invalid', 'true');
      await expect(form.email).toHaveAccessibleDescription(EMAIL_ERROR);
    });
  }

  test('clears the inline error once the address becomes valid', async () => {
    const form = homePage.contactForm;

    await form.fill({ email: 'martin@example' });
    await expect(form.email).toHaveAccessibleDescription(EMAIL_ERROR);

    await form.fill({ email: 'martin@example.com' });

    await expect(form.email).toHaveAttribute('aria-invalid', 'false');
    await expect(form.helperText('email')).not.toHaveText(EMAIL_ERROR);
  });

  test('trims before validating, so a padded address is accepted', async () => {
    const form = homePage.contactForm;

    await form.fill({ email: '  a@b.com  ', message: 'hello there' });

    await expect(form.email).toHaveAttribute('aria-invalid', 'false');
    await expect(form.submitButton).toBeEnabled();
  });
});

test.describe('Contact form — message validation', () => {
  test('rejects a message shorter than 5 characters and clears at 5', async () => {
    const form = homePage.contactForm;

    await form.fill({ message: 'ahoj' });

    await expect(form.message).toHaveAttribute('aria-invalid', 'true');
    await expect(form.message).toHaveAccessibleDescription(MESSAGE_ERROR);

    await form.fill({ message: 'ahojky' });

    await expect(form.message).toHaveAttribute('aria-invalid', 'false');
    await expect(form.helperText('message')).not.toHaveText(MESSAGE_ERROR);
  });

  test('treats a whitespace-only message as empty', async () => {
    const form = homePage.contactForm;

    await form.fill({ email: 'a@b.com', message: '       ' });

    await expect(form.submitButton).toBeDisabled();
  });
});

test.describe('Contact form — submission', () => {
  test('posts a urlencoded body naming the Netlify form, then resets the fields', async () => {
    const form = homePage.contactForm;
    const submission = await form.stubSubmit({ status: 200 });

    await form.fillValid();
    await form.submit();

    await expect(form.successAlert).toHaveText(SUCCESS);
    expect(submission.postedBody()).toContain('form-name=contact');
    expect(submission.postedBody()).toContain('email=a%40b.com');

    await expect(form.firstName).toHaveValue('');
    await expect(form.lastName).toHaveValue('');
    await expect(form.email).toHaveValue('');
    await expect(form.message).toHaveValue('');
  });

  test('announces success politely, with no assertive alert alongside it', async () => {
    const form = homePage.contactForm;
    await form.stubSubmit({ status: 200 });

    await form.fillValid();
    await form.submit();

    await expect(form.successAlert).toHaveText(SUCCESS);
    await expect(form.errorAlert).toHaveCount(0);
  });

  test('reports the HTTP status assertively when the server rejects the post', async () => {
    const form = homePage.contactForm;
    await form.stubSubmit({ status: 500 });

    await form.fillValid();
    await form.submit();

    await expect(form.errorAlert).toContainText('500');
    await expect(form.successAlert).toHaveCount(0);
  });

  test('reports a dropped connection', async () => {
    const form = homePage.contactForm;
    await form.stubSubmit({ networkError: true });

    await form.fillValid();
    await form.submit();

    await expect(form.errorAlert).toBeVisible();
  });

  test('clears the error alert once the user edits a field again', async () => {
    const form = homePage.contactForm;
    await form.stubSubmit({ status: 500 });

    await form.fillValid();
    await form.submit();
    await expect(form.errorAlert).toBeVisible();

    await form.fill({ message: 'Ahoj, mam porad zajem.' });

    await expect(form.errorAlert).toHaveCount(0);
  });

  test('disables submit while a send is still in flight', async () => {
    const form = homePage.contactForm;
    const submission = await form.stubSubmit({ hold: true });

    await form.fillValid();
    await form.submit();

    await expect(form.submitButton).toBeDisabled();

    submission.release();

    await expect(form.successAlert).toHaveText(SUCCESS);
  });

  test('submits without navigating away from the page', async () => {
    const form = homePage.contactForm;
    await form.stubSubmit({ status: 200 });

    await form.fillValid();
    await homePage.markDocument();
    await form.submit();
    await expect(form.successAlert).toHaveText(SUCCESS);

    // A full-page form POST would have replaced the document and wiped the marker.
    expect(await homePage.documentStillMarked()).toBe(true);
  });

  test('rejects an invalid submission locally, without reaching the network', async () => {
    const form = homePage.contactForm;
    const submission = await form.stubSubmit({ status: 200 });

    // 'a@b' passes the browser's own email constraint but fails the app's stricter regex, so
    // native validation lets the submit reach the handler with values the app considers bad.
    await form.fill({
      firstName: 'Martin',
      lastName: 'Veselý',
      email: 'a@b',
      message: 'hello there',
    });
    await expect(form.submitButton).toBeDisabled();

    await form.requestSubmit();

    await expect(form.errorAlert).toHaveText(INVALID_SUBMISSION_ERROR);
    expect(submission.postedBody()).toBeUndefined();
  });
});
