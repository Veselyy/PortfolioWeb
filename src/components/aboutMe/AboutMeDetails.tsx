import { Box, Typography } from '@mui/material';
import MuiMarkdown, { defaultOverrides } from 'mui-markdown';

import { bold } from '../../theme/sharedStyles';

const styles = {
  markdown: {
    '& p': { mt: 1 },
    '& ul': { m: 0, pl: 2.5 },
    '& li': { mb: 1, '&:last-child': { mb: 0 } },
  },
} as const;

const markdownOverrides = {
  ...defaultOverrides,
  // Semantic tag stays h3 (see about-me.*.md), but rendered at the original h5 visual scale.
  h3: {
    component: Typography,
    props: { component: 'h3', variant: 'h5', sx: { ...bold, mt: 3 } },
  },
  // Former `**<u>…</u>**` pseudo-headings (see about-me.*.md): underline reads as a link on the
  // web, so they are real h4s now, sized to sit between the h3 and the body copy.
  h4: {
    component: Typography,
    props: { component: 'h4', variant: 'subtitle1', sx: { ...bold, mt: 2 } },
  },
};

/** The About Me markdown after the intro: skills, languages, hobbies… */
function AboutMeDetails({ markdown }: { markdown: string }) {
  return (
    <Box sx={styles.markdown}>
      <MuiMarkdown overrides={markdownOverrides}>{markdown}</MuiMarkdown>
    </Box>
  );
}

export default AboutMeDetails;
