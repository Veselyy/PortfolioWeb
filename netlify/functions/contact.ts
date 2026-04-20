import type { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  page?: string;
};

function json(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(body),
  };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, error: 'Method Not Allowed' });
  }

  let data: ContactPayload = {};
  try {
    data = event.body ? (JSON.parse(event.body) as ContactPayload) : {};
  } catch {
    return json(400, { ok: false, error: 'Invalid JSON' });
  }

  const fromEmail = (data.email ?? '').trim();
  const message = (data.message ?? '').trim();
  const name = `${(data.firstName ?? '').trim()} ${(data.lastName ?? '').trim()}`.trim();

  if (!fromEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail)) {
    return json(400, { ok: false, error: 'Invalid email' });
  }
  if (message.length < 5) {
    return json(400, { ok: false, error: 'Message too short' });
  }

  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!host || !portRaw || !user || !pass || !to) {
    return json(500, { ok: false, error: 'Missing server configuration' });
  }

  const port = Number(portRaw);
  const secure = port === 465;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.sendMail({
      to,
      from: to,
      replyTo: fromEmail,
      subject: `Portfolio kontakt: ${name || fromEmail}`,
      text: [
        `Jméno: ${name || '-'}`,
        `Email: ${fromEmail}`,
        data.page ? `Stránka: ${data.page}` : undefined,
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    return json(200, { ok: true });
  } catch {
    return json(500, { ok: false, error: 'Email send failed' });
  }
};
