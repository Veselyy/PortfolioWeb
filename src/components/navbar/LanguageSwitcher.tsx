import { Box, Tooltip } from '@mui/material';
import { type Theme } from '@mui/material/styles';

import { useThemeMode } from '../../context/useThemeMode';
import { useLanguage } from '../../context/useLanguage';
import { PillSwitchRoot, getPillSwitchMetrics } from './PillSwitch';

const TEXT = {
  cs: {
    tooltip: 'Switch to English',
    ariaLabel: 'Přepnout jazyk na angličtinu',
  },
  en: {
    tooltip: 'Přepnout do češtiny',
    ariaLabel: 'Switch language to Czech',
  },
} as const;

const SIZES = {
  medium: { dims: { track: 64, height: 32, thumb: 24 }, labelFontSize: 12 },
  small: { dims: { track: 52, height: 26, thumb: 20 }, labelFontSize: 10 },
} as const;

const labelTransition = (theme: Theme) =>
  theme.transitions.create('color', { duration: theme.transitions.duration.standard });

function LanguageSwitcher({ small = false }: { small?: boolean }) {
  const { lang, toggle } = useLanguage();
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const isCs = lang === 'cs';
  const text = TEXT[lang];
  const { dims, labelFontSize } = small ? SIZES.small : SIZES.medium;
  const { track, height, thumb } = dims;
  const { margin } = getPillSwitchMetrics(dims);

  return (
    <Tooltip title={text.tooltip}>
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
            transition: labelTransition,
            fontSize: labelFontSize,
            fontWeight: 700,
            color: isCs ? 'grey.500' : isDark ? 'common.white' : 'common.black',
          }}
        >
          EN
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
            transition: labelTransition,
            fontSize: labelFontSize,
            fontWeight: 700,
            color: isCs ? (isDark ? 'common.white' : 'common.black') : 'grey.500',
          }}
        >
          CS
        </Box>
        <PillSwitchRoot
          checked={isCs}
          onChange={toggle}
          dims={dims}
          slotProps={{
            input: { 'aria-label': text.ariaLabel },
          }}
        />
      </Box>
    </Tooltip>
  );
}

export default LanguageSwitcher;
