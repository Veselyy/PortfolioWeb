import { Box } from '@mui/material';
import MuiMarkdown from 'mui-markdown';

import { SECTION_IDS } from '../constants/sections';
import { useLanguage } from '../context/useLanguage';
import { WORK_APPROACH_CONTENT } from '../data/workApproachContent';
import PageSection from './common/PageSection';

const styles = {
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
    <PageSection id={SECTION_IDS.work} title={content.title}>
      <Box sx={styles.markdown}>
        <MuiMarkdown>{content.markdown}</MuiMarkdown>
      </Box>
    </PageSection>
  );
}

export default WorkApproach;
