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

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    href: 'https://github.com/Veselyy',
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
];
