import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { FormEvent } from 'react';

import type { Language } from '../../../src/context/languageContext';
import { useContactForm } from '../../../src/hooks/useContactForm';

function fakeSubmitEvent() {
  return { preventDefault: jest.fn() } as unknown as FormEvent<HTMLFormElement>;
}

describe('useContactForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('rejects an empty email and a too-short message', () => {
    const { result } = renderHook(() => useContactForm('cs'));

    expect(result.current.validation.email).toBe(false);
    expect(result.current.validation.message).toBe(false);
  });

  it('rejects a malformed email and a too-short message', () => {
    const { result } = renderHook(() => useContactForm('cs'));

    act(() => {
      result.current.setField('email', 'a@b');
      result.current.setField('message', 'hi');
    });

    expect(result.current.validation.email).toBe(false);
    expect(result.current.validation.message).toBe(false);
  });

  it('accepts a valid email and a message of 5+ trimmed characters', () => {
    const { result } = renderHook(() => useContactForm('cs'));

    act(() => {
      result.current.setField('email', 'a@b.com');
      result.current.setField('message', 'hello');
    });

    expect(result.current.validation.email).toBe(true);
    expect(result.current.validation.message).toBe(true);
  });

  it.each(['plainaddress', '@b.com', 'a@b', 'a@b.', 'a b@c.com', 'a@@b.com'])(
    'rejects the malformed email %s',
    (email: string) => {
      const { result } = renderHook(() => useContactForm('cs'));

      act(() => {
        result.current.setField('email', email);
      });

      expect(result.current.validation.email).toBe(false);
    },
  );

  it('trims before validating, so a whitespace-only message stays invalid', () => {
    const { result } = renderHook(() => useContactForm('cs'));

    act(() => {
      result.current.setField('email', '  a@b.com  ');
      result.current.setField('message', '       ');
    });

    expect(result.current.validation.email).toBe(true);
    expect(result.current.validation.message).toBe(false);

    act(() => {
      result.current.setField('message', '  hello  ');
    });

    expect(result.current.validation.message).toBe(true);
  });

  it('canSubmit is false while a submission is in flight, even with valid fields', () => {
    jest.mocked(fetch).mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useContactForm('cs'));

    act(() => {
      result.current.setField('email', 'a@b.com');
      result.current.setField('message', 'hello there');
    });
    expect(result.current.canSubmit).toBe(true);

    act(() => {
      result.current.submit(fakeSubmitEvent());
    });

    expect(result.current.status).toBe('sending');
    expect(result.current.canSubmit).toBe(false);
  });

  it('submit() calls preventDefault on the form event', async () => {
    const event = fakeSubmitEvent();
    const { result } = renderHook(() => useContactForm('cs'));

    await act(async () => {
      await result.current.submit(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('submit() with invalid fields sets an error and never calls fetch', async () => {
    const { result } = renderHook(() => useContactForm('cs'));

    await act(async () => {
      await result.current.submit(fakeSubmitEvent());
    });

    expect(result.current.status).toBe('error');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('setField resets a non-idle status back to idle', async () => {
    const { result } = renderHook(() => useContactForm('cs'));

    await act(async () => {
      await result.current.submit(fakeSubmitEvent());
    });
    expect(result.current.status).toBe('error');

    act(() => {
      result.current.setField('firstName', 'Martin');
    });

    expect(result.current.status).toBe('idle');
  });

  it('submit() success posts the expected body and resets the fields', async () => {
    jest.mocked(fetch).mockResolvedValue({ ok: true } as Response);
    const { result } = renderHook(() => useContactForm('cs'));

    act(() => {
      result.current.setField('firstName', 'Martin');
      result.current.setField('email', 'a@b.com');
      result.current.setField('message', 'hello there');
    });

    await act(async () => {
      await result.current.submit(fakeSubmitEvent());
    });

    expect(fetch).toHaveBeenCalledWith(
      '/',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }),
    );
    const body = jest.mocked(fetch).mock.calls[0][1]?.body as string;
    expect(body).toContain('form-name=contact');
    expect(body).toContain('email=a%40b.com');

    expect(result.current.status).toBe('success');
    expect(result.current.values).toEqual({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    });
  });

  it('submit() sets an error containing the HTTP status when the response is not ok', async () => {
    jest.mocked(fetch).mockResolvedValue({ ok: false, status: 500 } as Response);
    const { result } = renderHook(() => useContactForm('cs'));

    act(() => {
      result.current.setField('email', 'a@b.com');
      result.current.setField('message', 'hello there');
    });

    await act(async () => {
      await result.current.submit(fakeSubmitEvent());
    });

    expect(result.current.status).toBe('error');
    expect(result.current.errorMsg).toContain('500');
  });

  it('submit() sets an error from a rejected fetch', async () => {
    jest.mocked(fetch).mockRejectedValue(new TypeError('network down'));
    const { result } = renderHook(() => useContactForm('cs'));

    act(() => {
      result.current.setField('email', 'a@b.com');
      result.current.setField('message', 'hello there');
    });

    await act(async () => {
      await result.current.submit(fakeSubmitEvent());
    });

    expect(result.current.status).toBe('error');
    expect(result.current.errorMsg).toBe('network down');
  });

  it.each(['cs', 'en'] as const)(
    'shows a non-empty invalid-submission message for lang=%s',
    async (lang: Language) => {
      const { result } = renderHook(() => useContactForm(lang));

      await act(async () => {
        await result.current.submit(fakeSubmitEvent());
      });

      expect(result.current.status).toBe('error');
      expect(result.current.errorMsg.length).toBeGreaterThan(0);
    },
  );
});
