import { Box, Stack, Typography } from '@mui/material';

import { RADIUS } from '../../theme/tokens';

const styles = {
  card: {
    border: '1px solid',
    borderColor: 'success.main',
    bgcolor: 'action.hover',
    borderRadius: 1,
    px: 2,
    py: 1.5,
    alignItems: 'center',
    maxWidth: 760,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.circle,
    bgcolor: 'success.main',
    flex: '0 0 auto',
  },
} as const;

type AvailabilityCardProps = {
  availability: { strong: string; normal: string };
};

/** "Currently looking for…" note with a green status dot (job-hunting variant only). */
function AvailabilityCard({ availability }: AvailabilityCardProps) {
  return (
    <Stack direction="row" spacing={2} sx={styles.card}>
      <Box sx={styles.dot} />
      <Typography variant="body1">
        <strong>{availability.strong}</strong>
        {availability.normal}
      </Typography>
    </Stack>
  );
}

export default AvailabilityCard;
