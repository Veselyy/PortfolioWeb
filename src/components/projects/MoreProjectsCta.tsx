import { Box, Paper, Typography } from '@mui/material';

import { EXTERNAL_LINK_PROPS } from '../../constants/links';
import { CONTACT } from '../../data/contact';
import { bold } from '../../theme/sharedStyles';
import { projectCardSurface } from './styles';

const styles = {
  card: projectCardSurface,
  link: { ...bold, textDecoration: 'underline', color: 'inherit' },
} as const;

type MoreProjectsCtaProps = {
  text: string;
  linkLabel: string;
};

/** Closing card pointing to the GitHub profile for the remaining projects. */
function MoreProjectsCta({ text, linkLabel }: MoreProjectsCtaProps) {
  return (
    <Paper sx={styles.card}>
      <Typography variant="body1">
        {text}{' '}
        <Box component="a" href={CONTACT.github.href} {...EXTERNAL_LINK_PROPS} sx={styles.link}>
          {linkLabel}
        </Box>
      </Typography>
    </Paper>
  );
}

export default MoreProjectsCta;
