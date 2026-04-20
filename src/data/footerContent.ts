import { CONTACT } from './contact';

export const FOOTER_CONTENT = {
  title: 'Kontakt',
  contactItems: [
    {
      key: 'whatsapp',
      icon: 'whatsapp',
      text: 'Martin Veselý',
      href: CONTACT.whatsapp.href,
      ariaLabel: 'Kontaktovat přes WhatsApp',
    },
    {
      key: 'email',
      icon: 'mail',
      text: CONTACT.email.address,
      href: CONTACT.email.href,
      ariaLabel: 'Napsat e-mail',
    },

    {
      key: 'phone',
      icon: 'phone',
      text: '+420 732 424 435',
      href: `tel:${CONTACT.whatsapp.phone}`,
      ariaLabel: 'Zavolat',
    },
  ],
} as const;
