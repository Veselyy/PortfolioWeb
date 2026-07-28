import { Box } from '@mui/material';
import type { Theme } from '@mui/material/styles';

import { useLanguage } from '../context/useLanguage';

const SKIP_LINK_TEXT = { cs: 'Přeskočit na obsah', en: 'Skip to content' } as const;

const styles = {
  position: 'absolute',
  top: -9999,
  left: 8,
  zIndex: (theme: Theme) => theme.zIndex.tooltip + 1,
  bgcolor: 'background.paper',
  color: 'text.primary',
  px: 2,
  py: 1,
  borderRadius: 1,
  textDecoration: 'none',
  fontWeight: 700,
  '&:focus-visible': {
    top: 8,
  },
} as const;

function SkipLink() {
  const { lang } = useLanguage();

  return (
    <Box component="a" href="#main" sx={styles}>
      {SKIP_LINK_TEXT[lang]}
    </Box>
  );
}

export default SkipLink;
