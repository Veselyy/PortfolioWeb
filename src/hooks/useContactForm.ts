import { useMemo, useState } from 'react';

import type { Language } from '../context/languageContext';

type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export type ContactFormStatus = 'idle' | 'sending' | 'success' | 'error';

const MESSAGES = {
  cs: {
    invalid: 'Zkontroluj prosím email a zprávu.',
    sendFailedWithStatus: (status: number) => `Odeslání selhalo (HTTP ${status}).`,
    sendFailed: 'Nepodařilo se odeslat.',
  },
  en: {
    invalid: 'Please check the email and message.',
    sendFailedWithStatus: (status: number) => `Failed to send (HTTP ${status}).`,
    sendFailed: 'Failed to send.',
  },
} as const;

export function useContactForm(lang: Language) {
  const messages = MESSAGES[lang];
  const [values, setValues] = useState<ContactFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<ContactFormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const validation = useMemo(() => {
    const email = values.email.trim();
    const message = values.message.trim();

    return {
      email: email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      message: message.length >= 5,
    };
  }, [values.email, values.message]);

  const canSubmit = status !== 'sending' && validation.email && validation.message;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg('');

    if (!validation.email || !validation.message) {
      setStatus('error');
      setErrorMsg(messages.invalid);
      return;
    }

    try {
      setStatus('sending');
      const body = new URLSearchParams({
        'form-name': 'contact',
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      }).toString();

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      if (!res.ok) {
        throw new Error(messages.sendFailedWithStatus(res.status));
      }

      setStatus('success');
      setValues({ firstName: '', lastName: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : messages.sendFailed);
    }
  }

  function setField<K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (status !== 'idle') setStatus('idle');
  }

  return {
    values,
    setField,
    status,
    errorMsg,
    validation,
    canSubmit,
    submit,
  } as const;
}
