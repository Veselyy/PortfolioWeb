import { screen } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { renderWithLanguage } from '../test/renderWithLanguage';
import Projects from './Projects';

describe('Projects card image', () => {
  it('renders below-the-fold project images lazily, unlike the eager hero image', () => {
    renderWithLanguage(<Projects />);

    const img = screen.getByRole('img', { name: 'Náhled projektu Myšlenkové mapy' });

    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).not.toHaveAttribute('fetchpriority');
  });
});
