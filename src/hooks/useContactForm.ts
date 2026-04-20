import { useMemo, useState } from 'react';

type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export type ContactFormStatus = 'idle' | 'sending' | 'success' | 'error';

export function useContactForm() {
  const endpoint =
    (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined) ||
    '/.netlify/functions/contact';

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
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          page: window.location.href,
        }),
      });

      if (!res.ok) {
        const ct = res.headers.get('content-type') ?? '';
        const txt = await res.text().catch(() => '');
        const msg =
          ct.includes('application/json') && txt
            ? (() => {
                try {
                  const parsed = JSON.parse(txt) as { error?: string };
                  return parsed.error || `HTTP ${res.status}`;
                } catch {
                  return `HTTP ${res.status}`;
                }
              })()
            : `Endpoint vrátil ${res.status}. Zkontroluj URL endpointu.`;
        throw new Error(msg);
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
    endpoint,
    values,
    setField,
    status,
    errorMsg,
    validation,
    canSubmit,
    submit,
  } as const;
}
