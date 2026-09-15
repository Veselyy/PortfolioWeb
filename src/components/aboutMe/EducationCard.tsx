import { Box, Paper, Stack, Typography } from '@mui/material';
import MuiMarkdown from 'mui-markdown';

import { bold, bulletItem, bulletList } from '../../theme/sharedStyles';
import type { EducationCardData } from './education';
import EducationLink from './EducationLink';
import EducationReferences from './EducationReferences';

const styles = {
  card: {
    p: 2,
    borderRadius: 1,
    bgcolor: 'info.main',
    // Pair the fill with its own computed foreground instead of inheriting `text.primary`,
    // which only happens to contrast with the current info hue.
    color: 'info.contrastText',
  },
  content: { alignItems: 'flex-start' },
  title: bold,
  bulletList,
  bulletItem,
} as const;

type EducationCardProps = {
  card: EducationCardData;
  /** Position in the list, used for unique accordion ids. */
  index: number;
};

/** One school or job: title, website link, bullet points and optional references. */
function EducationCard({ card, index }: EducationCardProps) {
  const hasReferences = card.references && card.references.length > 0;

  return (
    <Paper sx={styles.card}>
      <Stack spacing={1} sx={styles.content}>
        <Typography variant="h6" component="h4" sx={styles.title}>
          {card.title}
        </Typography>

        <EducationLink href={card.linkHref} label={card.linkLabel} />

        <Box component="ul" sx={styles.bulletList}>
          {card.bullets.map((bullet, bulletIndex) => (
            <Box key={`${card.title}-b-${bulletIndex}`} component="li" sx={styles.bulletItem}>
              <MuiMarkdown options={{ forceInline: true }}>{bullet}</MuiMarkdown>
            </Box>
          ))}
        </Box>

        {hasReferences && (
          <EducationReferences
            panelId={`education-panel-${index}`}
            references={card.references ?? []}
          />
        )}
      </Stack>
    </Paper>
  );
}

export default EducationCard;
