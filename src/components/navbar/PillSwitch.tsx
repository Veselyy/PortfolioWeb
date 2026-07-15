import type { ReactNode } from 'react';
import { Box, Switch, Tooltip } from '@mui/material';
import { alpha, styled, useTheme, type Theme } from '@mui/material/styles';

type PillSwitchDims = { track: number; height: number; thumb: number };

function getPillSwitchMetrics({ track, height, thumb }: PillSwitchDims) {
  const margin = (height - thumb) / 2;
  const travel = track - thumb - margin * 2;

  return { margin, travel };
}

const PillSwitchRoot = styled(Switch, {
  shouldForwardProp: (prop) => prop !== 'dims',
})<{ dims: PillSwitchDims }>(({ theme, dims }) => {
  const { track, height, thumb } = dims;
  const { margin, travel } = getPillSwitchMetrics(dims);

  return {
    width: track,
    height,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin,
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeInOut,
      }),
      '&.Mui-checked': {
        transform: `translateX(${travel}px)`,
        '& + .MuiSwitch-track': {
          backgroundColor: alpha(theme.palette.text.primary, 0.15),
          opacity: 1,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      width: thumb,
      height: thumb,
      zIndex: 0,
      boxShadow: theme.shadows[1],
      backgroundColor: theme.palette.background.paper,
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.standard,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: height / 2,
      backgroundColor: alpha(theme.palette.text.primary, 0.15),
      opacity: 1,
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.standard,
      }),
    },
  };
});

const contentTransition = (theme: Theme) =>
  theme.transitions.create('color', { duration: theme.transitions.duration.standard });

export type PillToggleSwitchProps = {
  /** Track/thumb geometry in px. */
  size: PillSwitchDims;
  checked: boolean;
  onChange: () => void;
  ariaLabel: string;
  tooltip: string;
  /** Rendered on the unchecked side (icon or short label). */
  startContent: ReactNode;
  /** Rendered on the checked side (icon or short label). */
  endContent: ReactNode;
};

/**
 * A two-state pill switch: both `startContent`/`endContent` stay visible in
 * the track (muted grey when inactive), while the active one is colored
 * black/white and rides on top of the sliding thumb.
 */
function PillToggleSwitch({
  size,
  checked,
  onChange,
  ariaLabel,
  tooltip,
  startContent,
  endContent,
}: PillToggleSwitchProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { track, height, thumb } = size;
  const { margin } = getPillSwitchMetrics(size);
  const activeColor = isDark ? 'common.white' : 'common.black';
  const inactiveColor = 'grey.500';

  return (
    <Tooltip title={tooltip}>
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          width: track,
          height,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: margin,
            width: thumb,
            height: thumb,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            pointerEvents: 'none',
            transition: contentTransition,
            color: checked ? inactiveColor : activeColor,
          }}
        >
          {startContent}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            right: margin,
            width: thumb,
            height: thumb,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            pointerEvents: 'none',
            transition: contentTransition,
            color: checked ? activeColor : inactiveColor,
          }}
        >
          {endContent}
        </Box>
        <PillSwitchRoot
          checked={checked}
          onChange={onChange}
          dims={size}
          slotProps={{ input: { 'aria-label': ariaLabel } }}
        />
      </Box>
    </Tooltip>
  );
}

export default PillToggleSwitch;
