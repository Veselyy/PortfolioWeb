import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import NavbarLinks from './navbar/NavbarLinks';
import SocialsIcons from './navbar/SocialsIcons';
import ThemeSwitcher from './navbar/ThemeSwitcher';

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  if (isMobile) {
    return (
      <>
        <Stack
          component="div"
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <ThemeSwitcher />
          <IconButton
            color="inherit"
            aria-label="Otevřít navigaci"
            onClick={() => setOpen(true)}
            sx={{
              '&:focus-visible': {
                outline: '1px solid currentColor',
                outlineOffset: 4,
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Stack>

        <Drawer anchor="right" open={open} onClose={close}>
          <Stack sx={{ width: 280, p: 2 }} spacing={2}>
            <IconButton
              color="inherit"
              aria-label="Zavřít navigaci"
              onClick={close}
              sx={{
                alignSelf: 'flex-end',
                '&:focus-visible': {
                  outline: '1px solid currentColor',
                  outlineOffset: 4,
                },
              }}
            >
              <CloseIcon />
            </IconButton>
            <NavbarLinks direction="column" spacing={2} onNavigate={close} />
            <SocialsIcons direction="row" spacing={1} onNavigate={close} />
          </Stack>
        </Drawer>
      </>
    );
  }

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
