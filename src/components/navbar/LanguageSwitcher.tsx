import { Box } from '@mui/material';

import { useLanguage } from '../../context/useLanguage';
import PillToggleSwitch from './PillSwitch';

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

type Size = 'medium' | 'small';

const SIZES: Record<Size, { track: number; height: number; thumb: number; labelFontSize: number }> =
  {
    medium: { track: 64, height: 32, thumb: 24, labelFontSize: 12 },
    small: { track: 52, height: 26, thumb: 20, labelFontSize: 10 },
  };

function LanguageSwitcher({ small = false }: { small?: boolean }) {
  const { lang, toggle } = useLanguage();
  const isCs = lang === 'cs';
  const text = TEXT[lang];
  const size: Size = small ? 'small' : 'medium';
  const { track, height, thumb, labelFontSize } = SIZES[size];

  return (
    <PillToggleSwitch
      size={{ track, height, thumb }}
      checked={isCs}
      onChange={toggle}
      ariaLabel={text.ariaLabel}
      tooltip={text.tooltip}
      startContent={
        <Box component="span" sx={{ fontSize: labelFontSize, fontWeight: 700 }}>
          EN
        </Box>
      }
      endContent={
        <Box component="span" sx={{ fontSize: labelFontSize, fontWeight: 700 }}>
          CS
        </Box>
      }
    />
  );
}

export default LanguageSwitcher;
