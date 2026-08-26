import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from '@jest/globals';
import type { ReactNode } from 'react';

import { SEO_CONTENT } from '../../../src/data/seoContent';
import { LANGUAGE_STORAGE_KEY } from '../../../src/context/languageContext';
import { LanguageProvider } from '../../../src/context/LanguageProvider';
import { useLanguage } from '../../../src/context/useLanguage';

function wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

describe('LanguageProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.title = '';
    document.querySelectorAll('meta[name="description"]').forEach((el) => el.remove());
  });

  it('defaults to cs when localStorage is empty', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.lang).toBe('cs');
  });

  it('reads a valid saved language from localStorage', () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');

    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.lang).toBe('en');
  });

  it('falls back to cs for an invalid saved value', () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'garbage');

    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.lang).toBe('cs');
  });

  it('toggle() flips the language and persists it to localStorage', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    act(() => result.current.toggle());

    expect(result.current.lang).toBe('en');
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en');
  });

  it('syncs document.documentElement.lang', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    act(() => result.current.toggle());

    expect(document.documentElement.lang).toBe('en');
  });

  it('syncs document.title to SEO_CONTENT for the current language', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(document.title).toBe(SEO_CONTENT.cs.title);

    act(() => result.current.toggle());

    expect(document.title).toBe(SEO_CONTENT.en.title);
  });

  it('syncs the meta description content when the tag exists', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    document.head.appendChild(meta);

    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(meta.getAttribute('content')).toBe(SEO_CONTENT.cs.description);

    act(() => result.current.toggle());

    expect(meta.getAttribute('content')).toBe(SEO_CONTENT.en.description);
  });

  it('does not throw when no meta description tag exists', () => {
    expect(() => renderHook(() => useLanguage(), { wrapper })).not.toThrow();
  });
});
