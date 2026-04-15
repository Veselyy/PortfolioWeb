import { Stack } from '@mui/material';
import NavbarLinks from './navbar/NavbarLinks';
import SocialsIcons from './navbar/SocialsIcons';
import ThemeSwitcher from './navbar/ThemeSwitcher';

function Navbar() {
  return (
    <Stack
      component="div"
      direction="row"
      sx={{ alignItems: 'center', justifyContent: 'space-between' }}
    >
      <ThemeSwitcher />
      <NavbarLinks />
      <SocialsIcons />
    </Stack>
  );
}

export default Navbar;
