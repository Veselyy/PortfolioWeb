/**
 * Contact form submission and validation rules (see useContactForm.ts).
 */
export const CONTACT_FORM = {
  /**
   * Netlify Forms name. Must match the static shadow `<form name="contact">` in index.html,
   * which is how Netlify's build crawler registers the form.
   */
  netlifyFormName: 'contact',
  /** Netlify Forms accepts the POST on any page path; the site root is simplest. */
  submitUrl: '/',
  messageMinLength: 5,
  emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;
