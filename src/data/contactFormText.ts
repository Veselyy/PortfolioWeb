/**
 * Every user-facing string in the contact form: field labels, inline validation errors and
 * the status messages the submit handler reports.
 *
 * Shared by `Footer.tsx` (which renders the form) and `useContactForm.ts` (which validates
 * and submits it), so the e2e specs can assert against the same source the app renders from
 * rather than repeating the literals.
 */
export const CONTACT_FORM_TEXT = {
  cs: {
    firstName: 'Jméno',
    lastName: 'Příjmení',
    email: 'Email',
    message: 'Zpráva',
    send: 'Odeslat',

    emailError: 'Zadej platný email.',
    messageError: 'Zpráva musí mít aspoň 5 znaků.',

    sent: 'Odesláno.',
    invalid: 'Zkontroluj prosím email a zprávu.',
    sendFailedWithStatus: (status: number) => `Odeslání selhalo (HTTP ${status}).`,
    sendFailed: 'Nepodařilo se odeslat.',
  },
  en: {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    message: 'Message',
    send: 'Send',

    emailError: 'Enter a valid email.',
    messageError: 'Message must be at least 5 characters.',

    sent: 'Sent.',
    invalid: 'Please check the email and message.',
    sendFailedWithStatus: (status: number) => `Failed to send (HTTP ${status}).`,
    sendFailed: 'Failed to send.',
  },
} as const;
