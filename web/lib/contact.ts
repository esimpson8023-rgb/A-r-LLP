import { SERVICES, type ServiceKey } from './content';

// Shared by the contact form (browser) and the /api/contact route (server),
// so both sides apply the same rules.

export type ContactField = 'name' | 'email' | 'service' | 'message';
export type ContactMethod = 'email' | 'phone' | 'either';

export type ContactRequest = {
  name: string;
  email: string;
  phone: string;
  service: string;
  method: ContactMethod;
  message: string;
  /** Hidden "honeypot" field. People never see or fill it; spam bots usually do. */
  website?: string;
};

export const REQUIRED_FIELDS: ContactField[] = ['name', 'email', 'service', 'message'];

export const MAX_LENGTH: Record<keyof Omit<ContactRequest, 'method' | 'website'>, number> = {
  name: 120,
  email: 254,
  phone: 40,
  service: 40,
  message: 5000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const SERVICE_OPTIONS: Record<string, string> = {
  ...Object.fromEntries(Object.entries(SERVICES).map(([k, s]) => [k, s.title])),
  other: 'Something else',
} as Record<ServiceKey | 'other', string>;

export function isFieldValid(field: ContactField, value: string): boolean {
  const v = value.trim();
  if (!v || v.length > MAX_LENGTH[field]) return false;
  if (field === 'email') return EMAIL_RE.test(v);
  if (field === 'service') return v in SERVICE_OPTIONS;
  return true;
}
