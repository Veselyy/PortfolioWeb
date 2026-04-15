import { Stack } from '@mui/material';

import { NavbarLink } from './NavbarLink';
import { navbarLinks } from './navbarLinksData';

export function NavbarLinks() {
  return (
    <Stack component="nav" direction="row" spacing={8} aria-label="Navigace">
      {navbarLinks.map(({ id, label, href, ariaLabel }) => (
        <NavbarLink key={id} label={label} href={href} ariaLabel={ariaLabel} />
      ))}
    </Stack>
  );
}

export default NavbarLinks;
