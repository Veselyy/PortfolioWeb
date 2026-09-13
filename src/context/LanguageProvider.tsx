import { useEffect, useState, type ReactNode } from 'react';

import { IS_OPEN_TO_WORK } from '../constants/env';
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY } from '../constants/preferences';
import { SEO_CONTENT } from '../data/seoContent';
import { LanguageContext, type Language } from './languageContext';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (saved === 'cs' || saved === 'en') return saved;

  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(getInitialLanguage);
  const toggle = () => setLang((l) => (l === 'cs' ? 'en' : 'cs'));

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    document.documentElement.lang = lang;

    const variant = IS_OPEN_TO_WORK ? 'jobHunting' : 'portfolio';
    const { title, description } = SEO_CONTENT[lang][variant];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}
