import { CONTACT } from './contact';
import { UI_TEXT } from './uiText';

export const FOOTER_CONTENT = {
  cs: {
    title: 'Kontakt',
    contactItems: [
      {
        key: 'whatsapp',
        icon: 'whatsapp',
        text: 'Martin Veselý',
        href: CONTACT.whatsapp.href,
        ariaLabel: UI_TEXT.cs.contactAria.whatsapp,
      },
      {
        key: 'email',
        icon: 'mail',
        text: CONTACT.email.address,
        href: CONTACT.email.href,
        ariaLabel: UI_TEXT.cs.contactAria.email,
      },
      {
        key: 'phone',
        icon: 'phone',
        text: '+420 732 424 435',
        href: `tel:${CONTACT.whatsapp.phone}`,
        ariaLabel: UI_TEXT.cs.contactAria.phone,
      },
    ],
  },
  en: {
    title: 'Contact',
    contactItems: [
      {
        key: 'whatsapp',
        icon: 'whatsapp',
        text: 'Martin Veselý',
        href: CONTACT.whatsapp.href,
        ariaLabel: UI_TEXT.en.contactAria.whatsapp,
      },
      {
        key: 'email',
        icon: 'mail',
        text: CONTACT.email.address,
        href: CONTACT.email.href,
        ariaLabel: UI_TEXT.en.contactAria.email,
      },
      {
        key: 'phone',
        icon: 'phone',
        text: '+420 732 424 435',
        href: `tel:${CONTACT.whatsapp.phone}`,
        ariaLabel: UI_TEXT.en.contactAria.phone,
      },
    ],
  },
} as const;
