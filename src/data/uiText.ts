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
    contactAria: {
      whatsapp: 'Kontaktovat přes WhatsApp',
      email: 'Napsat e-mail',
      phone: 'Zavolat',
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
      phone: 'Call',
    },
    newTab: '(opens in a new tab)',
    references: 'References',
    quoteMarks: { open: '“', close: '”' },
  },
} as const;
