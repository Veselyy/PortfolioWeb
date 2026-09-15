import { Box } from '@mui/material';
import MuiMarkdown, { defaultOverrides } from 'mui-markdown';

const styles = {
  // The intro bullets are five independent facts, not an ordered process, so they carry no
  // numbering -- a counter here would assert a sequence the content does not have.
  introList: {
    '& ul': {
      listStyle: 'none',
      m: 0,
      p: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 1.5,
    },
    '& li': {
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 3,
      py: 1.5,
      px: 2,
      typography: 'body1',
      lineHeight: 1.6,
    },
  },
} as const;

/** The intro bullets at the top of About Me, each rendered as its own small card. */
function AboutMeIntro({ markdown }: { markdown: string }) {
  return (
    <Box sx={styles.introList}>
      <MuiMarkdown overrides={defaultOverrides}>{markdown}</MuiMarkdown>
    </Box>
  );
}

export default AboutMeIntro;
