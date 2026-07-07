import { useMemo, useState } from 'react';

type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export type ContactFormStatus = 'idle' | 'sending' | 'success' | 'error';

export function useContactForm() {
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
      setErrorMsg('Zkontroluj prosím email a zprávu.');
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
        throw new Error(`Odeslání selhalo (HTTP ${res.status}).`);
      }

      setStatus('success');
      setValues({ firstName: '', lastName: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Nepodařilo se odeslat.');
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
