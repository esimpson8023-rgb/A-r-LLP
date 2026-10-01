import { isFieldValid, MAX_LENGTH, REQUIRED_FIELDS, SERVICE_OPTIONS, type ContactRequest } from '@/lib/contact';

// Sends contact form submissions to the firm's inbox through Resend (https://resend.com).
// Settings, from environment variables (see .env.example):
//   RESEND_API_KEY      required
//   CONTACT_TO_EMAIL    inbox that receives the requests (default info@arllp.ca)
//   CONTACT_FROM_EMAIL  sender address on a domain verified in Resend

const METHODS: Record<string, string> = { email: 'Email', phone: 'Phone', either: 'Either' };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

// Keeps header values on one line.
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

function parse(body: unknown): ContactRequest | null {
  if (!body || typeof body !== 'object') return null;
  const b = body as Record<string, unknown>;
  const str = (k: string) => (typeof b[k] === 'string' ? (b[k] as string).trim() : '');
  const data: ContactRequest = {
    name: oneLine(str('name')),
    email: oneLine(str('email')),
    phone: oneLine(str('phone')),
    service: str('service'),
    method: (str('method') in METHODS ? str('method') : 'email') as ContactRequest['method'],
    message: str('message'),
    website: str('website'),
  };
  if (data.phone.length > MAX_LENGTH.phone) return null;
  return REQUIRED_FIELDS.every(f => isFieldValid(f, data[f])) ? data : null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const data = parse(body);
  if (!data) return Response.json({ ok: false, error: 'invalid' }, { status: 400 });

  // A filled honeypot means a bot: report success so it moves on, but send nothing.
  if (data.website) return Response.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Contact form: RESEND_API_KEY is not set, so the message was not sent.');
    return Response.json({ ok: false, error: 'not_configured' }, { status: 500 });
  }

  const to = process.env.CONTACT_TO_EMAIL || 'info@arllp.ca';
  const from = process.env.CONTACT_FROM_EMAIL || 'A&R LLP Website <website@arllp.ca>';
  const service = SERVICE_OPTIONS[data.service];
  const rows: [string, string][] = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone || 'Not provided'],
    ['Service', service],
    ['Preferred contact', METHODS[data.method]],
  ];

  const text = `New consultation request from the website\n\n${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMessage:\n${data.message}\n`;
  const html = `<p>New consultation request from the website</p>
<table cellpadding="4" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join('')}</table>
<p><strong>Message</strong></p>
<p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Consultation request: ${service} (${data.name})`,
        text,
        html,
      }),
    });
    if (!res.ok) {
      console.error(`Contact form: Resend returned ${res.status}: ${await res.text()}`);
      return Response.json({ ok: false, error: 'send_failed' }, { status: 502 });
    }
  } catch (err) {
    console.error('Contact form: could not reach Resend.', err);
    return Response.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
