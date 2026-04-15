import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { THEME_MODE_STORAGE_KEY, ThemeModeContext, type ThemeMode } from './themeModeContext';

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light';

  const saved = window.localStorage.getItem(THEME_MODE_STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
        typography: {
          fontFamily: '"Figtree", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
        },
        components: {
          MuiIconButton: {
            defaultProps: { size: 'small' },
          },
          MuiSvgIcon: {
            defaultProps: { fontSize: 'small' },
          },
        },
      }),
    [mode],
  );
  const toggle = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    window.localStorage.setItem(THEME_MODE_STORAGE_KEY, mode);
  }, [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, setMode, toggle }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
