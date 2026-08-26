import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

import { useThemeMode } from '../../context/useThemeMode';
import { useLanguage } from '../../context/useLanguage';
import { THEME_SWITCHER_TEXT } from '../../data/themeSwitcherText';
import PillToggleSwitch from './PillSwitch';

type Size = 'medium' | 'small';

const SIZES: Record<Size, { track: number; height: number; thumb: number; iconFontSize: number }> =
  {
    medium: { track: 64, height: 32, thumb: 24, iconFontSize: 16 },
    small: { track: 52, height: 26, thumb: 20, iconFontSize: 13 },
  };

function ThemeSwitcher({ small = false }: { small?: boolean }) {
  const { mode, toggle } = useThemeMode();
  const { lang } = useLanguage();
  const isDark = mode === 'dark';
  const text = THEME_SWITCHER_TEXT[lang];
  const size: Size = small ? 'small' : 'medium';
  const { track, height, thumb, iconFontSize } = SIZES[size];

  return (
    <PillToggleSwitch
      size={{ track, height, thumb }}
      checked={isDark}
      onChange={toggle}
      ariaLabel={isDark ? text.switchToLight : text.switchToDark}
      tooltip={isDark ? text.lightMode : text.darkMode}
      startContent={<LightModeRoundedIcon sx={{ fontSize: iconFontSize }} />}
      endContent={<DarkModeRoundedIcon sx={{ fontSize: iconFontSize }} />}
    />
  );
}

export default ThemeSwitcher;
