import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { Box, Typography } from '@mui/material';

import { EXTERNAL_LINK_PROPS } from '../../constants/links';
import { useLanguage } from '../../context/useLanguage';
import { UI_TEXT } from '../../data/uiText';
import { bold, interactiveScale, linkRow, visuallyHidden } from '../../theme/sharedStyles';
import { TOUCH_TARGET_SIZE } from '../../theme/tokens';

const styles = {
  anchor: {
    ...linkRow,
    ...interactiveScale,
    minHeight: TOUCH_TARGET_SIZE,
    py: 0.75,
    // Underlined so the link is distinguishable from the bold copy around it without relying
    // on colour alone (WCAG 1.4.1).
    textDecoration: 'underline',
    textUnderlineOffset: 3,
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
      '&:hover, &:focus-visible': { transform: 'none' },
    },
  },
  label: { typography: 'body1', color: 'inherit', textDecoration: 'inherit', ...bold },
  visuallyHidden,
} as const;

type EducationLinkProps = {
  href: string;
  label: string;
};

/** Link to the school / employer website, opening in a new tab. */
function EducationLink({ href, label }: EducationLinkProps) {
  const { lang } = useLanguage();

  return (
    <Box component="a" href={href} {...EXTERNAL_LINK_PROPS} sx={styles.anchor}>
      <LinkOutlinedIcon fontSize="small" />
      <Typography sx={styles.label}>{label}</Typography>
      <Box component="span" sx={styles.visuallyHidden}>
        {UI_TEXT[lang].newTab}
      </Box>
    </Box>
  );
}

export default EducationLink;
