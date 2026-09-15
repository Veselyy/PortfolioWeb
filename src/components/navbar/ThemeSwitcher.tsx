import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

import { useThemeMode } from '../../context/useThemeMode';
import { useLanguage } from '../../context/useLanguage';
import { THEME_SWITCHER_TEXT } from '../../data/themeSwitcherText';
import { PILL_SWITCH_SIZES } from '../../theme/tokens';
import PillToggleSwitch from './PillSwitch';

function ThemeSwitcher({ small = false }: { small?: boolean }) {
  const { mode, toggle } = useThemeMode();
  const { lang } = useLanguage();
  const isDark = mode === 'dark';
  const text = THEME_SWITCHER_TEXT[lang];
  const { track, height, thumb, iconFontSize } = PILL_SWITCH_SIZES[small ? 'small' : 'medium'];

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
