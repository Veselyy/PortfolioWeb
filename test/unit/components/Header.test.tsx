import { screen } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { renderWithLanguage } from '../../helpers/renderWithLanguage';
import Header from '../../../src/components/Header';

describe('Header hero image', () => {
  it('renders the hero photo eagerly with a high fetch priority', () => {
    renderWithLanguage(<Header />);

    const img = screen.getByRole('img', { name: 'Martin Veselý, portrétní fotografie' });

    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchpriority', 'high');
  });
});
