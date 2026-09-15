import type { ReactNode } from 'react';
import { Stack, Typography } from '@mui/material';

import { sectionHeadingId, type SectionId } from '../../constants/sections';
import { bold } from '../../theme/sharedStyles';

const styles = {
  title: bold,
} as const;

type PageSectionProps = {
  id: SectionId;
  title: string;
  /** `footer` for the contact block at the bottom of the page; everything else is a `section`. */
  component?: 'section' | 'footer';
  children: ReactNode;
};

/**
 * A top-level page block: the landmark element with its id plus the centred `<h2>` title.
 *
 * A `<section>` is only exposed as a region when it has an accessible name, so it is labelled
 * by its heading; the `<footer>` is already a landmark on its own.
 */
function PageSection({ id, title, component = 'section', children }: PageSectionProps) {
  const headingId = sectionHeadingId(id);
  const isSection = component === 'section';

  return (
    <Stack
      component={component}
      id={id}
      spacing={3}
      aria-labelledby={isSection ? headingId : undefined}
    >
      <Typography id={headingId} variant="h4" component="h2" align="center" sx={styles.title}>
        {title}
      </Typography>
      {children}
    </Stack>
  );
}

export default PageSection;
