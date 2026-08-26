import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

import { renderWithLanguage } from '../../helpers/renderWithLanguage';
import Footer from '../../../src/components/Footer';

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

/** Mirrors the Netlify shadow form in index.html — the names have to stay in sync. */
const FIELDS = [
  { name: 'firstName', label: /Jméno/ },
  { name: 'lastName', label: /Příjmení/ },
  { name: 'email', label: /Email/ },
  { name: 'message', label: /Zpráva/ },
];

const EMAIL_ERROR = 'Zadej platný email.';
const MESSAGE_ERROR = 'Zpráva musí mít aspoň 5 znaků.';

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

  it.each(FIELDS)('renders $name as a required input carrying its form name', ({ name, label }) => {
    renderWithLanguage(<Footer />);

    const input = screen.getByLabelText(label);

    expect(input).toBeRequired();
    expect(input).toHaveAttribute('name', name);
  });

  it('shows no inline field error while the inputs are still untouched', () => {
    renderWithLanguage(<Footer />);

    expect(screen.queryByText(EMAIL_ERROR)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGE_ERROR)).not.toBeInTheDocument();
  });

  it('describes a malformed email with its inline error and clears it once valid', async () => {
    const user = userEvent.setup();
    renderWithLanguage(<Footer />);
    const email = screen.getByLabelText(/Email/);

    await user.type(email, 'martin@example');

    expect(email).toBeInvalid();
    expect(email).toHaveAccessibleDescription(EMAIL_ERROR);

    await user.type(email, '.com');

    expect(email).toBeValid();
    expect(screen.queryByText(EMAIL_ERROR)).not.toBeInTheDocument();
  });

  it('describes a too-short message with its inline error and clears it at 5 characters', async () => {
    const user = userEvent.setup();
    renderWithLanguage(<Footer />);
    const message = screen.getByLabelText(/Zpráva/);

    await user.type(message, 'ahoj');

    expect(message).toBeInvalid();
    expect(message).toHaveAccessibleDescription(MESSAGE_ERROR);

    await user.type(message, 'ky');

    expect(message).toBeValid();
    expect(screen.queryByText(MESSAGE_ERROR)).not.toBeInTheDocument();
  });

  it('disables the submit button until the fields are valid', async () => {
    renderWithLanguage(<Footer />);

    expect(screen.getByRole('button', { name: 'Odeslat' })).toBeDisabled();

    const { fill } = fillValidForm();
    await fill();

    expect(screen.getByRole('button', { name: 'Odeslat' })).toBeEnabled();
  });
});
