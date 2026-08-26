import { render } from '@testing-library/react';
import type { ReactElement } from 'react';

import { LanguageProvider } from '../../src/context/LanguageProvider';
import { ThemeModeProvider } from '../../src/context/ThemeModeProvider';

export function renderWithLanguage(ui: ReactElement) {
  return render(
    <ThemeModeProvider>
      <LanguageProvider>{ui}</LanguageProvider>
    </ThemeModeProvider>,
  );
}
