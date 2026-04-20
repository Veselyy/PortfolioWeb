import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
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
      >
        {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeSwitcher;
