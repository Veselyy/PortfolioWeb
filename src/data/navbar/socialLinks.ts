import type { SvgIconComponent } from '@mui/icons-material';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { CONTACT } from '../contact';

export type SocialLink = {
  id: 'github' | 'linkedin' | 'whatsapp';
  href: string;
  tooltip: string;
  ariaLabel: string;
  Icon: SvgIconComponent;
};

export const socialLinks = {
  cs: [
    {
      id: 'github',
      href: CONTACT.github.href,
      tooltip: 'GitHub',
      ariaLabel: 'Otevřít GitHub profil v nové kartě',
      Icon: GitHubIcon,
    },
    {
      id: 'linkedin',
      href: 'https://www.linkedin.com/in/veselymartin-online/',
      tooltip: 'LinkedIn',
      ariaLabel: 'Otevřít LinkedIn profil v nové kartě',
      Icon: LinkedInIcon,
    },
    {
      id: 'whatsapp',
      href: CONTACT.whatsapp.href,
      tooltip: 'WhatsApp',
      ariaLabel: 'Otevřít WhatsApp chat v nové kartě',
      Icon: WhatsAppIcon,
    },
  ],
  en: [
    {
      id: 'github',
      href: CONTACT.github.href,
      tooltip: 'GitHub',
      ariaLabel: 'Open GitHub profile in a new tab',
      Icon: GitHubIcon,
    },
    {
      id: 'linkedin',
      href: 'https://www.linkedin.com/in/veselymartin-online/',
      tooltip: 'LinkedIn',
      ariaLabel: 'Open LinkedIn profile in a new tab',
      Icon: LinkedInIcon,
    },
    {
      id: 'whatsapp',
      href: CONTACT.whatsapp.href,
      tooltip: 'WhatsApp',
      ariaLabel: 'Open WhatsApp chat in a new tab',
      Icon: WhatsAppIcon,
    },
  ],
} as const satisfies Record<'cs' | 'en', readonly SocialLink[]>;
