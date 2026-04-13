import { createContext } from 'react';

export type ThemeMode = 'light' | 'dark';

export type ThemeModeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
};

export const THEME_MODE_STORAGE_KEY = 'themeMode';

export const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);
