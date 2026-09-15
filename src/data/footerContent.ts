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
        purpose: UI_TEXT.cs.contactPurpose.whatsapp,
      },
      {
        key: 'email',
        icon: 'mail',
        text: CONTACT.email.address,
        href: CONTACT.email.href,
        purpose: UI_TEXT.cs.contactPurpose.email,
      },
      {
        key: 'phone',
        icon: 'phone',
        text: '+420 732 424 435',
        href: `tel:${CONTACT.whatsapp.phone}`,
        purpose: UI_TEXT.cs.contactPurpose.phone,
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
        purpose: UI_TEXT.en.contactPurpose.whatsapp,
      },
      {
        key: 'email',
        icon: 'mail',
        text: CONTACT.email.address,
        href: CONTACT.email.href,
        purpose: UI_TEXT.en.contactPurpose.email,
      },
      {
        key: 'phone',
        icon: 'phone',
        text: '+420 732 424 435',
        href: `tel:${CONTACT.whatsapp.phone}`,
        purpose: UI_TEXT.en.contactPurpose.phone,
      },
    ],
  },
} as const;
