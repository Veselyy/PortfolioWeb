import { createContext } from 'react';

export type Language = 'cs' | 'en';

export type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
};

export const LANGUAGE_STORAGE_KEY = 'language';

export const LanguageContext = createContext<LanguageContextValue | null>(null);
