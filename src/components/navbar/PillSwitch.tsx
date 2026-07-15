import { Switch } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

export type PillSwitchDims = { track: number; height: number; thumb: number };

export function getPillSwitchMetrics({ track, height, thumb }: PillSwitchDims) {
  const margin = (height - thumb) / 2;
  const travel = track - thumb - margin * 2;

  return { margin, travel };
}

export const PillSwitchRoot = styled(Switch, {
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
