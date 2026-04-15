import { Stack } from '@mui/material';

import { NavbarLink } from './NavbarLink';
import { navbarLinks } from '../../data/navbar/navbarLinksData';

type NavbarLinksProps = {
  direction?: 'row' | 'column';
  spacing?: number;
  onNavigate?: () => void;
};

export function NavbarLinks({ direction = 'row', spacing = 8, onNavigate }: NavbarLinksProps) {
  return (
    <Stack component="nav" direction={direction} spacing={spacing} aria-label="Navigace">
      {navbarLinks.map(({ id, label, href, ariaLabel }) => (
        <NavbarLink key={id} label={label} href={href} ariaLabel={ariaLabel} onClick={onNavigate} />
      ))}
    </Stack>
  );
}

export default NavbarLinks;
