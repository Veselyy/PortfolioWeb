import { Stack } from '@mui/material';
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
      <SocialsIcons />
    </Stack>
  );
}

export default Navbar;
