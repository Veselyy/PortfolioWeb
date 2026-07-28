import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

import { renderWithLanguage } from '../test/renderWithLanguage';
import Footer from './Footer';

function fillValidForm() {
  const user = userEvent.setup();
  return { user, fill: fillForm };

  async function fillForm() {
    await user.type(screen.getByLabelText(/Jméno/), 'Martin');
    await user.type(screen.getByLabelText(/Příjmení/), 'Veselý');
    await user.type(screen.getByLabelText(/Email/), 'a@b.com');
    await user.type(screen.getByLabelText(/Zpráva/), 'Ahoj, mam zajem.');
  }
}

describe('Footer contact form', () => {
  beforeEach(() => {
    global.fetch = jest.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('shows the success alert with role="status" on a successful submit', async () => {
    jest.mocked(fetch).mockResolvedValue({ ok: true } as Response);
    renderWithLanguage(<Footer />);
    const { fill } = fillValidForm();
    await fill();

    await userEvent.click(screen.getByRole('button', { name: 'Odeslat' }));

    const alert = await screen.findByRole('status');
    expect(alert).toHaveTextContent('Odesláno.');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows the error alert with role="alert" (assertive) on a failed submit, not role="status"', async () => {
    jest.mocked(fetch).mockResolvedValue({ ok: false, status: 500 } as Response);
    renderWithLanguage(<Footer />);
    const { fill } = fillValidForm();
    await fill();

    await userEvent.click(screen.getByRole('button', { name: 'Odeslat' }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('500');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('clears the error alert once the user edits a field again', async () => {
    jest.mocked(fetch).mockResolvedValue({ ok: false, status: 500 } as Response);
    renderWithLanguage(<Footer />);
    const { user, fill } = fillValidForm();
    await fill();

    await userEvent.click(screen.getByRole('button', { name: 'Odeslat' }));
    await screen.findByRole('alert');

    await user.type(screen.getByLabelText(/Zpráva/), '!');

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  it('disables the submit button until the fields are valid', async () => {
    renderWithLanguage(<Footer />);

    expect(screen.getByRole('button', { name: 'Odeslat' })).toBeDisabled();

    const { fill } = fillValidForm();
    await fill();

    expect(screen.getByRole('button', { name: 'Odeslat' })).toBeEnabled();
  });
});
