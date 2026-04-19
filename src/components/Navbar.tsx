import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import NavbarLinks from './navbar/NavbarLinks';
import SocialsIcons from './navbar/SocialsIcons';
import ThemeSwitcher from './navbar/ThemeSwitcher';

const styles = {
  bar: { alignItems: 'center', justifyContent: 'space-between' },
  mobileStickyBar: {
    position: 'sticky',
    top: 0,
    zIndex: (theme) => theme.zIndex.appBar,
    backgroundColor: (theme) =>
      theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    borderBottom: '1px solid',
    borderColor: 'divider',
    py: 1,
  },
  drawerContent: { p: 2 },
  drawerClose: { alignSelf: 'flex-end' },
} as const;

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  if (isMobile) {
    return (
      <>
        <Stack component="div" direction="row" sx={{ ...styles.bar, ...styles.mobileStickyBar }}>
          <ThemeSwitcher />
          <IconButton color="inherit" aria-label="Otevřít navigaci" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Stack>

        <Drawer anchor="right" open={open} onClose={close}>
          <Stack sx={styles.drawerContent} spacing={2}>
            <IconButton
              color="inherit"
              aria-label="Zavřít navigaci"
              onClick={close}
              sx={styles.drawerClose}
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
    <Stack component="div" direction="row" sx={styles.bar}>
      <ThemeSwitcher />
      <NavbarLinks />
      <SocialsIcons />
    </Stack>
  );
}

export default Navbar;
