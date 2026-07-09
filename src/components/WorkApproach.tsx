import { Box, Stack, Typography } from '@mui/material';
import MuiMarkdown from 'mui-markdown';

import { WORK_APPROACH_CONTENT } from '../data/workApproachContent';
import { useLanguage } from '../context/useLanguage';

const styles = {
  title: { fontWeight: 700 },
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
    <Stack id="work" spacing={3}>
      <Typography variant="h4" align="center" sx={styles.title}>
        {content.title}
      </Typography>

      <Box sx={styles.markdown}>
        <MuiMarkdown>{content.markdown}</MuiMarkdown>
      </Box>
    </Stack>
  );
}

export default WorkApproach;
