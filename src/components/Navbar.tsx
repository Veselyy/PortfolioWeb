import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Drawer, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { alpha, type Theme } from '@mui/material/styles';
import { useState } from 'react';
import NavbarLinks from './navbar/NavbarLinks';
import SocialsIcons from './navbar/SocialsIcons';
import ThemeSwitcher from './navbar/ThemeSwitcher';

const styles = {
  bar: { alignItems: 'center', justifyContent: 'space-between' },
  mobileStickyBar: {
    position: 'sticky',
    top: 0,
    zIndex: (theme: Theme) => theme.zIndex.appBar,
    backgroundColor: (theme: Theme) => alpha(theme.palette.background.paper, 0.7),
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    borderBottom: '1px solid',
    borderColor: 'divider',
    py: 1,
  },
  drawerContent: { p: 2, alignItems: 'center' },
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
            <MenuOutlinedIcon />
          </IconButton>
        </Stack>

        <Drawer anchor="top" open={open} onClose={close}>
          <Stack sx={styles.drawerContent} spacing={2}>
            <IconButton
              color="inherit"
              aria-label="Zavřít navigaci"
              onClick={close}
              sx={styles.drawerClose}
            >
              <CloseOutlinedIcon />
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
