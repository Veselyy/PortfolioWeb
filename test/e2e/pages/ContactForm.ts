import type { Locator, Page } from '@playwright/test';

export type FieldName = 'firstName' | 'lastName' | 'email' | 'message';

export type ContactFormValues = Partial<Record<FieldName, string>>;

/** How the intercepted contact-form POST should behave. */
export type SubmitStub =
  | { status: number }
  /** Reject the request the way a dropped connection would, so `fetch` throws. */
  | { networkError: true }
  /** Hold the request open so the in-flight UI can be asserted; call `release()` to finish it. */
  | { hold: true };

export type SubmitInterception = {
  /** Body of the intercepted POST, available once the request has been made. */
  postedBody: () => string | undefined;
  /** Completes a `{ hold: true }` request with a 200. */
  release: () => void;
};

/**
 * The contact form in the site footer.
 *
 * Owned by {@link HomePage} — reach it via `homePage.contactForm` rather than constructing
 * it directly.
 */
export class ContactForm {
  readonly page: Page;

  readonly form: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly message: Locator;
  readonly submitButton: Locator;

  /** Polite success alert (`role="status"`). */
  readonly successAlert: Locator;
  /** Assertive failure alert (`role="alert"`). */
  readonly errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;

    // index.html also carries a hidden shadow form of the same name for Netlify's
    // build-time crawler, so this has to be scoped to the rendered one.
    this.form = page.locator('footer form[name="contact"]');
    this.firstName = page.getByLabel(/Jméno/);
    this.lastName = page.getByLabel(/Příjmení/);
    this.email = page.getByLabel(/Email/);
    this.message = page.getByLabel(/Zpráva/);
    this.submitButton = page.getByRole('button', { name: /Odeslat|Send/ });

    this.successAlert = page.getByRole('status');
    this.errorAlert = page.getByRole('alert');
  }

  field(name: FieldName): Locator {
    return this[name];
  }

  /** The `FormHelperText` under a field — carries the inline validation error, or a blank space. */
  helperText(name: FieldName): Locator {
    return this.page.locator(`#contact-${name}-helper`);
  }

  async fill(values: ContactFormValues) {
    for (const [name, value] of Object.entries(values) as [FieldName, string][]) {
      await this.field(name).fill(value);
    }
  }

  /** Fills every field with values that pass validation. */
  async fillValid() {
    await this.fill({
      firstName: 'Martin',
      lastName: 'Veselý',
      email: 'a@b.com',
      message: 'Ahoj, mam zajem.',
    });
  }

  async submit() {
    await this.submitButton.click();
  }

  /**
   * Submits through the DOM, bypassing the button.
   *
   * useContactForm has a defensive branch that reports an error when submit fires with
   * invalid values. Nothing a user does can reach it: the button is disabled precisely when
   * validation fails, and browsers skip implicit submission (Enter in a field) while a
   * form's submit button is disabled. requestSubmit() is the only way to exercise it.
   */
  async requestSubmit() {
    await this.form.evaluate((form: HTMLFormElement) => form.requestSubmit());
  }

  /**
   * Intercepts the form's POST so the response can be controlled.
   *
   * The form posts to `/`, the same URL as the document itself, so non-POST requests are
   * handed back to the network — otherwise this would swallow the page navigation.
   */
  async stubSubmit(stub: SubmitStub): Promise<SubmitInterception> {
    let postedBody: string | undefined;
    let release: () => void = () => {};
    const held = new Promise<void>((resolve) => {
      release = resolve;
    });

    await this.page.route(/\/$/, async (route) => {
      if (route.request().method() !== 'POST') {
        await route.fallback();
        return;
      }

      postedBody = route.request().postData() ?? undefined;

      if ('networkError' in stub) {
        await route.abort('connectionrefused');
        return;
      }

      if ('hold' in stub) {
        await held;
        await route.fulfill({ status: 200, body: '' });
        return;
      }

      await route.fulfill({ status: stub.status, body: '' });
    });

    return { postedBody: () => postedBody, release: () => release() };
  }
}
