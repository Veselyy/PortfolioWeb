import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { IconButton, Tooltip } from '@mui/material';

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

function ThemeSwitcher() {
  const { mode, toggle } = useThemeMode();
  const { lang } = useLanguage();
  const isDark = mode === 'dark';
  const text = TEXT[lang];

  return (
    <Tooltip title={isDark ? text.lightMode : text.darkMode}>
      <IconButton
        color="inherit"
        onClick={toggle}
        aria-label={isDark ? text.switchToLight : text.switchToDark}
      >
        {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeSwitcher;
