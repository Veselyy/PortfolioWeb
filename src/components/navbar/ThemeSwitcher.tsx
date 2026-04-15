import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton, Tooltip } from '@mui/material';

import { useThemeMode } from '../../context/useThemeMode';

function ThemeSwitcher() {
  const { mode, toggle } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <Tooltip title={isDark ? 'Světlý režim' : 'Tmavý režim'}>
      <IconButton
        color="inherit"
        onClick={toggle}
        aria-label={isDark ? 'Přepnout na světlý motiv' : 'Přepnout na tmavý motiv'}
        size="small"
      >
        {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeSwitcher;
