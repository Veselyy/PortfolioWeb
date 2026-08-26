import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Drawer, IconButton, Stack } from '@mui/material';

import NavbarLinks from './NavbarLinks';
import SocialsIcons from './SocialsIcons';

// Split out of Navbar so the Drawer -> Modal -> FocusTrap chain (~45 kB) is fetched on the
// first tap of the menu button instead of shipping in the initial bundle, where it never runs.

const styles = {
  content: { paddingBlock: 1, paddingInline: 0, alignItems: 'center' },
  close: { alignSelf: 'flex-end' },
} as const;

type NavDrawerProps = {
  open: boolean;
  onClose: () => void;
  closeLabel: string;
};

function NavDrawer({ open, onClose, closeLabel }: NavDrawerProps) {
  return (
    <Drawer anchor="top" open={open} onClose={onClose}>
      <Stack sx={styles.content} spacing={2}>
        <IconButton color="inherit" aria-label={closeLabel} onClick={onClose} sx={styles.close}>
          <CloseOutlinedIcon />
        </IconButton>
        <NavbarLinks direction="column" spacing={2} onNavigate={onClose} />
        <SocialsIcons direction="row" spacing={1} onNavigate={onClose} />
      </Stack>
    </Drawer>
  );
}

export default NavDrawer;
