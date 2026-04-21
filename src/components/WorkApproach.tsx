import { Box, Stack, Typography } from '@mui/material';
import MuiMarkdown from 'mui-markdown';

import { WORK_APPROACH_CONTENT } from '../data/workApproachContent';

const styles = {
  title: { fontWeight: 700 },
  markdown: {
    '& blockquote': {
      borderColor: 'info.main',
    },
  },
} as const;

function WorkApproach() {
  return (
    <Stack id="work" spacing={3}>
      <Typography variant="h4" align="center" sx={styles.title}>
        {WORK_APPROACH_CONTENT.title}
      </Typography>

      <Box sx={styles.markdown}>
        <MuiMarkdown>{WORK_APPROACH_CONTENT.markdown}</MuiMarkdown>
      </Box>
    </Stack>
  );
}

export default WorkApproach;
