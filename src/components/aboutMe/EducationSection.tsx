import { Stack, Typography } from '@mui/material';

import { bold } from '../../theme/sharedStyles';
import type { EducationSectionData } from './education';
import EducationCard from './EducationCard';

const styles = {
  title: bold,
} as const;

/** "Education, work and IT jobs": heading plus one card per school / job. */
function EducationSection({ section }: { section: EducationSectionData }) {
  return (
    <Stack spacing={2}>
      <Typography variant="h5" component="h3" sx={styles.title}>
        {section.title}
      </Typography>

      {section.cards.map((card, index) => (
        <EducationCard key={card.title} card={card} index={index} />
      ))}
    </Stack>
  );
}

export default EducationSection;
