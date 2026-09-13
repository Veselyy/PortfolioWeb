/** Short codes shown inside the switch track; the same in both UI languages. */
export const LANGUAGE_SWITCHER_LABELS = {
  cs: 'CS',
  en: 'EN',
} as const;

export const LANGUAGE_SWITCHER_TEXT = {
  cs: {
    tooltip: 'Switch to English',
    ariaLabel: 'Přepnout jazyk na angličtinu',
  },
  en: {
    tooltip: 'Přepnout do češtiny',
    ariaLabel: 'Switch language to Czech',
  },
} as const;
