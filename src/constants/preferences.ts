/**
 * User preferences persisted in localStorage, with their keys and fallback values.
 *
 * Changing a key forgets every visitor's saved choice, so only rename one deliberately.
 */
import type { Language } from '../context/languageContext';
import type { ThemeMode } from '../context/themeModeContext';

export const LANGUAGE_STORAGE_KEY = 'language';
export const THEME_MODE_STORAGE_KEY = 'themeMode';

export const DEFAULT_LANGUAGE: Language = 'cs';
/** Used only when nothing is saved and the OS colour-scheme preference can't be read. */
export const DEFAULT_THEME_MODE: ThemeMode = 'light';
