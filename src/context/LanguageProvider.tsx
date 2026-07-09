import { useEffect, useState, type ReactNode } from 'react';

import { LANGUAGE_STORAGE_KEY, LanguageContext, type Language } from './languageContext';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'cs';

  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (saved === 'cs' || saved === 'en') return saved;

  return 'cs';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(getInitialLanguage);
  const toggle = () => setLang((l) => (l === 'cs' ? 'en' : 'cs'));

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}
