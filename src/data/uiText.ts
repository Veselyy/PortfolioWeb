/**
 * Small interface strings that aren't tied to one content section: accessibility labels,
 * the skip link, navigation controls and typographic quote marks.
 *
 * Section copy lives in its own `*Content.ts` file; form strings in `contactFormText.ts`.
 */
export const UI_TEXT = {
  cs: {
    skipLink: 'Přeskočit na obsah',
    nav: {
      landmark: 'Navigace',
      open: 'Otevřít navigaci',
      close: 'Zavřít navigaci',
    },
    /** Standalone name for the icon-only contact buttons in the header, which show no text. */
    contactAria: {
      whatsapp: 'Kontaktovat přes WhatsApp',
      email: 'Napsat e-mail',
    },
    /**
     * Screen-reader-only suffix for the footer contact links, which already show the contact
     * itself as visible text. It has to be a suffix rather than an `aria-label`: overriding
     * the name with text the user can't see breaks voice control (WCAG 2.5.3).
     */
    contactPurpose: {
      whatsapp: '(kontaktovat přes WhatsApp)',
      email: '(napsat e-mail)',
      phone: '(zavolat)',
    },
    /** Screen-reader-only suffix for links with `target="_blank"`. */
    newTab: '(otevře se v novém okně)',
    references: 'Reference',
    quoteMarks: { open: '„', close: '“' },
  },
  en: {
    skipLink: 'Skip to content',
    nav: {
      landmark: 'Navigation',
      open: 'Open navigation',
      close: 'Close navigation',
    },
    contactAria: {
      whatsapp: 'Contact via WhatsApp',
      email: 'Send an email',
    },
    contactPurpose: {
      whatsapp: '(contact via WhatsApp)',
      email: '(send an email)',
      phone: '(call)',
    },
    newTab: '(opens in a new tab)',
    references: 'References',
    quoteMarks: { open: '“', close: '”' },
  },
} as const;
