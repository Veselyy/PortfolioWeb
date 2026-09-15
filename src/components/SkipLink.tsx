import { Box } from '@mui/material';
import type { Theme } from '@mui/material/styles';

import { SECTION_IDS, sectionHref } from '../constants/sections';
import { UI_TEXT } from '../data/uiText';
import { useLanguage } from '../context/useLanguage';
import { bold } from '../theme/sharedStyles';

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
  ...bold,
  '&:focus-visible': {
    top: 8,
  },
} as const;

function SkipLink() {
  const { lang } = useLanguage();

  return (
    <Box component="a" href={sectionHref(SECTION_IDS.main)} sx={styles}>
      {UI_TEXT[lang].skipLink}
    </Box>
  );
}

export default SkipLink;
