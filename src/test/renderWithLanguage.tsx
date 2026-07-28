import { render } from '@testing-library/react';
import type { ReactElement } from 'react';

import { LanguageProvider } from '../context/LanguageProvider';
import { ThemeModeProvider } from '../context/ThemeModeProvider';

export function renderWithLanguage(ui: ReactElement) {
  return render(
    <ThemeModeProvider>
      <LanguageProvider>{ui}</LanguageProvider>
    </ThemeModeProvider>,
  );
}
