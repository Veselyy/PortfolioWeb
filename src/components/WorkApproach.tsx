import { Box, Stack, Typography } from '@mui/material';
import MuiMarkdown from 'mui-markdown';

import { SECTION_IDS } from '../constants/sections';
import { WORK_APPROACH_CONTENT } from '../data/workApproachContent';
import { useLanguage } from '../context/useLanguage';
import { bold } from '../theme/sharedStyles';

const styles = {
  title: bold,
  markdown: {
    '& blockquote': {
      borderColor: 'info.main',
    },
  },
} as const;

function WorkApproach() {
  const { lang } = useLanguage();
  const content = WORK_APPROACH_CONTENT[lang];

  return (
    <Stack component="section" id={SECTION_IDS.work} spacing={3} aria-labelledby="work-heading">
      <Typography id="work-heading" variant="h4" component="h2" align="center" sx={styles.title}>
        {content.title}
      </Typography>

      <Box sx={styles.markdown}>
        <MuiMarkdown>{content.markdown}</MuiMarkdown>
      </Box>
    </Stack>
  );
}

export default WorkApproach;
