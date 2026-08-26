import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { alpha, type Theme } from '@mui/material/styles';
import { Suspense, lazy, useState } from 'react';
import NavbarLinks from './navbar/NavbarLinks';
import SocialsIcons from './navbar/SocialsIcons';
import ThemeSwitcher from './navbar/ThemeSwitcher';
import LanguageSwitcher from './navbar/LanguageSwitcher';
import { useLanguage } from '../context/useLanguage';

// Kept out of the initial bundle: the drawer can't be on screen before the menu button is
// tapped, so its Modal/FocusTrap/Slide dependencies load with that first tap.
const NavDrawer = lazy(() => import('./navbar/NavDrawer'));

const NAV_ARIA_LABELS = {
  cs: { open: 'Otevřít navigaci', close: 'Zavřít navigaci' },
  en: { open: 'Open navigation', close: 'Close navigation' },
} as const;

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
  switchers: { alignItems: 'center', padding: '5px' },
} as const;

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  // Latches on the first open so the drawer stays mounted afterwards and keeps its
  // closing transition instead of being unmounted mid-slide.
  const [drawerRequested, setDrawerRequested] = useState(false);
  const { lang } = useLanguage();
  const navAriaLabels = NAV_ARIA_LABELS[lang];

  const close = () => setOpen(false);
  const openDrawer = () => {
    setDrawerRequested(true);
    setOpen(true);
  };

  if (isMobile) {
    return (
      <>
        <Stack component="div" direction="row" sx={{ ...styles.bar, ...styles.mobileStickyBar }}>
          <Stack direction="row" spacing={1} sx={styles.switchers}>
            <LanguageSwitcher small />
            <ThemeSwitcher small />
          </Stack>
          <IconButton color="inherit" aria-label={navAriaLabels.open} onClick={openDrawer}>
            <MenuOutlinedIcon />
          </IconButton>
        </Stack>

        {drawerRequested && (
          <Suspense fallback={null}>
            <NavDrawer open={open} onClose={close} closeLabel={navAriaLabels.close} />
          </Suspense>
        )}
      </>
    );
  }

  return (
    <Stack component="div" direction="row" sx={styles.bar}>
      <Stack direction="row" spacing={1} sx={styles.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher />
      </Stack>
      <NavbarLinks />
      <SocialsIcons />
    </Stack>
  );
}

export default Navbar;
