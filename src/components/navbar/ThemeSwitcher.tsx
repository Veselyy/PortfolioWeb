import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { Box, Tooltip } from '@mui/material';
import { type Theme } from '@mui/material/styles';

import { useThemeMode } from '../../context/useThemeMode';
import { useLanguage } from '../../context/useLanguage';
import { PillSwitchRoot, getPillSwitchMetrics } from './PillSwitch';

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
  const { margin, travel } = getPillSwitchMetrics({ track, height, thumb });
  // Centers the icon within the thumb's resting spot on either side.
  const iconInset = margin + thumb / 2 - iconFontSize / 2;

  return { track, height, thumb, iconFontSize, margin, travel, iconInset };
}

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
  const { track, height, thumb, iconInset, iconFontSize } = getMetrics(size);

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
        <PillSwitchRoot
          checked={isDark}
          onChange={toggle}
          dims={{ track, height, thumb }}
          slotProps={{
            input: { 'aria-label': isDark ? text.switchToLight : text.switchToDark },
          }}
        />
      </Box>
    </Tooltip>
  );
}

export default ThemeSwitcher;
