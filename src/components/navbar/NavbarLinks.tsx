import { Stack } from '@mui/material';

import { NavbarLink } from './NavbarLink';
import { navbarLinks } from '../../data/navbar/navbarLinksData';
import { useLanguage } from '../../context/useLanguage';

const NAV_ARIA_LABEL = { cs: 'Navigace', en: 'Navigation' } as const;

type NavbarLinksProps = {
  direction?: 'row' | 'column';
  spacing?: number;
  onNavigate?: () => void;
};

export function NavbarLinks({ direction = 'row', spacing = 8, onNavigate }: NavbarLinksProps) {
  const { lang } = useLanguage();

  return (
    <Stack
      component="nav"
      direction={direction}
      spacing={spacing}
      aria-label={NAV_ARIA_LABEL[lang]}
      sx={{ alignItems: 'center' }}
    >
      {navbarLinks[lang].map(({ id, label, href, ariaLabel }) => (
        <NavbarLink key={id} label={label} href={href} ariaLabel={ariaLabel} onClick={onNavigate} />
      ))}
    </Stack>
  );
}

export default NavbarLinks;
