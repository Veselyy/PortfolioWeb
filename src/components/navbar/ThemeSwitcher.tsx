import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { Box, Switch, Tooltip } from '@mui/material';
import { alpha, styled, type Theme } from '@mui/material/styles';

import { useThemeMode } from '../../context/useThemeMode';
import { useLanguage } from '../../context/useLanguage';

const TEXT = {
  cs: {
    lightMode: 'Světlý režim',
    darkMode: 'Tmavý režim',
    switchToLight: 'Přepnout na světlý motiv',
    switchToDark: 'Přepnout na tmavý motiv',
  },
  en: {
    lightMode: 'Light mode',
    darkMode: 'Dark mode',
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
  },
} as const;

type Size = 'medium' | 'small';

const SIZES: Record<Size, { track: number; height: number; thumb: number; iconFontSize: number }> =
  {
    medium: { track: 64, height: 32, thumb: 24, iconFontSize: 16 },
    small: { track: 52, height: 26, thumb: 20, iconFontSize: 13 },
  };

function getMetrics(size: Size) {
  const { track, height, thumb, iconFontSize } = SIZES[size];
  const margin = (height - thumb) / 2;
  const travel = track - thumb - margin * 2;
  // Centers the icon within the thumb's resting spot on either side.
  const iconInset = margin + thumb / 2 - iconFontSize / 2;

  return { track, height, thumb, iconFontSize, margin, travel, iconInset };
}

const ThemeSwitchRoot = styled(Switch, {
  shouldForwardProp: (prop) => prop !== 'sizePreset',
})<{ sizePreset: Size }>(({ theme, sizePreset }) => {
  const { thumb, margin, travel } = getMetrics(sizePreset);
  const { track, height } = SIZES[sizePreset];

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

const iconTransition = (theme: Theme) =>
  theme.transitions.create(['color', 'transform'], {
    duration: theme.transitions.duration.standard,
  });

function ThemeSwitcher({ small = false }: { small?: boolean }) {
  const { mode, toggle } = useThemeMode();
  const { lang } = useLanguage();
  const isDark = mode === 'dark';
  const text = TEXT[lang];
  const size: Size = small ? 'small' : 'medium';
  const { track, height, iconInset, iconFontSize } = getMetrics(size);

  return (
    <Tooltip title={isDark ? text.lightMode : text.darkMode}>
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          width: track,
          height,
        }}
      >
        <LightModeRoundedIcon
          sx={{
            position: 'absolute',
            left: iconInset,
            zIndex: 1,
            pointerEvents: 'none',
            transition: iconTransition,
            fontSize: iconFontSize,
            color: isDark ? 'grey.500' : 'common.black',
          }}
        />
        <DarkModeRoundedIcon
          sx={{
            position: 'absolute',
            right: iconInset,
            zIndex: 1,
            pointerEvents: 'none',
            transition: iconTransition,
            fontSize: iconFontSize,
            color: isDark ? 'common.white' : 'grey.500',
          }}
        />
        <ThemeSwitchRoot
          checked={isDark}
          onChange={toggle}
          sizePreset={size}
          slotProps={{
            input: { 'aria-label': isDark ? text.switchToLight : text.switchToDark },
          }}
        />
      </Box>
    </Tooltip>
  );
}

export default ThemeSwitcher;
