import { Box, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';

import { bold } from '../../theme/sharedStyles';

const styles = {
  title: {
    ...bold,
    textAlign: { xs: 'center', md: 'left' },
  },
  // 'info.main' is tuned as a background surface (icon buttons, cards) and is too light/dark
  // to use as text color directly against the page background (fails 3:1 contrast) —
  // 'highlight.main' is the paired foreground shade instead (see theme/tokens.ts).
  highlight: {
    color: (theme: Theme) => theme.palette.highlight.main,
  },
} as const;

type TitlePart = { text: string; highlight: boolean };

/** The page's `<h1>`, with some words picked out in the highlight colour. */
function HeroTitle({ parts }: { parts: readonly TitlePart[] }) {
  return (
    <Typography variant="h1" sx={styles.title}>
      {parts.map((part, index) => (
        <Box key={index} component="span" sx={part.highlight ? styles.highlight : undefined}>
          {part.text}
        </Box>
      ))}
    </Typography>
  );
}

export default HeroTitle;
