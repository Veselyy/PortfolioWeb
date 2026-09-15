import WebIcon from '@mui/icons-material/Web';
import { Stack, Typography } from '@mui/material';

import { FONT_WEIGHT, RADIUS } from '../../theme/tokens';

const styles = {
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: RADIUS.pill,
    px: 2,
    py: 0.75,
    width: 'fit-content',
    alignSelf: { xs: 'center', md: 'flex-start' },
  },
  icon: { color: 'text.secondary' },
  text: {
    fontWeight: FONT_WEIGHT.medium,
    color: 'text.secondary',
  },
} as const;

/** Small rounded label above the hero title (portfolio variant only). */
function EyebrowPill({ text }: { text: string }) {
  return (
    <Stack direction="row" spacing={1} sx={styles.pill}>
      <WebIcon fontSize="small" sx={styles.icon} />
      <Typography variant="subtitle2" component="span" sx={styles.text}>
        {text}
      </Typography>
    </Stack>
  );
}

export default EyebrowPill;
