/**
 * Every way to reach me. The site and the generated CV both read from here.
 *
 * The phone number and the e-mail are each stored once, in the form a link needs, and every
 * other shape is derived from them — the displayed number, the `wa.me` link, the `mailto:`.
 * Written out by hand they drift: changing the number in one place and not the other leaves
 * the digits a visitor dials different from the ones printed next to them, and nothing fails.
 */

const PHONE_E164 = '+420732424435';
const EMAIL = 'veselymartin.online@gmail.com';

/** `+420732424435` → `+420 732 424 435`. Anything that isn't a Czech number is left as-is. */
function formatCzechPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length !== 12 || !digits.startsWith('420')) {
    return phone;
  }

  return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
}

export const CONTACT = {
  /** Shown as the label of the WhatsApp link, which has no address of its own to display. */
  name: 'Martin Veselý',
  github: {
    href: 'https://github.com/Veselyy',
  },
  whatsapp: {
    /** E.164, as `tel:` expects it. */
    phone: PHONE_E164,
    /** Same number, grouped for reading. */
    phoneDisplay: formatCzechPhone(PHONE_E164),
    // wa.me takes the digits without the leading '+'.
    href: `https://wa.me/${PHONE_E164.replace(/\D/g, '')}`,
  },
  email: {
    address: EMAIL,
    href: `mailto:${EMAIL}`,
  },
} as const;
