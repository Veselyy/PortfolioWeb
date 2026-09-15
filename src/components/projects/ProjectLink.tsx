import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

import { EXTERNAL_LINK_PROPS } from '../../constants/links';
import { bold, interactiveScale, linkRow } from '../../theme/sharedStyles';

const styles = {
  anchor: {
    ...linkRow,
    ...interactiveScale,
    textDecoration: 'none',
    transformOrigin: 'left center',
  },
  label: { typography: 'body1', color: 'inherit', textDecoration: 'none', ...bold },
} as const;

type ProjectLinkProps = {
  href: string;
  label: string;
  icon: ReactNode;
};

/** Icon + label link on a project card (GitHub repo, live website). */
function ProjectLink({ href, label, icon }: ProjectLinkProps) {
  return (
    <Box component="a" href={href} {...EXTERNAL_LINK_PROPS} sx={styles.anchor}>
      {icon}
      <Typography sx={styles.label}>{label}</Typography>
    </Box>
  );
}

export default ProjectLink;
