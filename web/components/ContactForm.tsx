'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { SERVICES, SERVICE_KEYS } from '@/lib/content';
import { useSite } from './SiteProvider';

type Field = 'name' | 'email' | 'service' | 'message';
type Values = Record<Field | 'phone' | 'method', string>;

const REQUIRED: Field[] = ['name', 'email', 'service', 'message'];
const EMPTY: Values = { name: '', email: '', phone: '', service: '', method: 'email', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const isValid = (f: Field, v: string) => !!v.trim() && (f !== 'email' || EMAIL_RE.test(v.trim()));
const ERRORS: Record<Field, string> = {
  name: 'Please enter your name.',
  email: 'Please enter a valid email address.',
  service: 'Please choose a service.',
  message: 'Please add a short message.',
};

export default function ContactForm() {
  const { prefill } = useSite();
  const [values, setValues] = useState<Values>(EMPTY);
  const [invalid, setInvalid] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [shaking, setShaking] = useState(false);
  const [flash, setFlash] = useState(false);
  const [minHeight, setMinHeight] = useState<number | undefined>();
  const [firstName, setFirstName] = useState('');
  const card = useRef<HTMLDivElement>(null);
  const selWrap = useRef<HTMLDivElement>(null);
  const fieldRefs = useRef<Partial<Record<Field, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>>>({});

  const validate = (f: Field, v = values[f]) => {
    const ok = isValid(f, v);
    setInvalid(p => ({ ...p, [f]: !ok }));
    return ok;
  };

  const set = (f: keyof Values, v: string) => {
    setValues(p => ({ ...p, [f]: v }));
    if (f === 'service') validate('service', v);
    else if (REQUIRED.includes(f as Field) && invalid[f as Field]) validate(f as Field, v);
  };

  // "Book a Consultation" in a service dialog pre-selects that service, then flashes
  // a gold ring around the field once it is on screen (fade in 180ms, hold, fade out 400ms).
  useEffect(() => {
    if (!prefill) return;
    setValues(p => ({ ...p, service: prefill.key }));
    setInvalid(p => ({ ...p, service: false }));
    let t = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setFlash(true);
        t = window.setTimeout(() => setFlash(false), 780);
      },
      { threshold: 0.9 },
    );
    if (selWrap.current) io.observe(selWrap.current);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [prefill]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const bad = REQUIRED.filter(f => !validate(f));
    if (bad.length) {
      // Restart the shake even if the previous one is still running.
      setShaking(false);
      requestAnimationFrame(() => setShaking(true));
      fieldRefs.current[bad[0]]?.focus();
      return;
    }
    setStatus('loading');
    // Simulated submission. Replace with a fetch() to your form service or an API route.
    setTimeout(() => {
      setFirstName(values.name.trim().split(/\s+/)[0]);
      setMinHeight(card.current?.offsetHeight);
      setStatus('done');
    }, 1100);
  };

  const reset = () => {
    setValues(EMPTY);
    setInvalid({});
    setStatus('idle');
    setTimeout(() => setMinHeight(undefined), 500);
    fieldRefs.current.name?.focus({ preventScroll: true });
  };

  const fld = (f: Field, extra = '') => `fld${extra}${invalid[f] ? ' invalid' : ''}`;
  const common = (f: Field) => ({
    ref: (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null) => {
      fieldRefs.current[f] = el;
    },
    name: f,
    required: true,
    'aria-invalid': invalid[f] === undefined ? undefined : invalid[f],
    onBlur: () => values[f].trim() && validate(f),
  });
  const err = (f: Field) => (
    <p className="err">
      <span>{ERRORS[f]}</span>
    </p>
  );

  return (
    <div
      ref={card}
      id="form-card"
      className={`relative rounded-3xl border border-stone-200/80 bg-white p-6 shadow-[0_2px_4px_rgba(31,28,24,.03),0_40px_80px_-48px_rgba(31,28,24,.4)] sm:p-10${status === 'done' ? ' done' : ''}${shaking ? ' shake' : ''}`}
      style={{ minHeight }}
      onAnimationEnd={e => e.animationName === 'shake' && setShaking(false)}
    >
      <form noValidate onSubmit={onSubmit}>
        <div id="form-inner">
          <h3 className="font-display text-2xl text-ink">Book a Consultation</h3>
          <p className="mt-1 text-sm text-stone-500">
            A member of our team will follow up with you. Prefer email? Write to{' '}
            <a href="mailto:info@arllp.ca" className="font-medium text-accent hover:underline">
              info@arllp.ca
            </a>
            .
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className={fld('name')}>
              <label htmlFor="f-name" className="mb-1.5 block text-sm font-medium text-ink">
                Full name
              </label>
              <input id="f-name" {...common('name')} className="inp" type="text" autoComplete="name" placeholder="Jane Smith" value={values.name} onChange={e => set('name', e.target.value)} />
              {err('name')}
            </div>
            <div className={fld('email')}>
              <label htmlFor="f-email" className="mb-1.5 block text-sm font-medium text-ink">
                Email
              </label>
              <input id="f-email" {...common('email')} className="inp" type="email" autoComplete="email" placeholder="jane@company.ca" value={values.email} onChange={e => set('email', e.target.value)} />
              {err('email')}
            </div>
            <div className="fld">
              <label htmlFor="f-phone" className="mb-1.5 block text-sm font-medium text-ink">
                Phone <span className="font-normal text-stone-500">(optional)</span>
              </label>
              <input id="f-phone" name="phone" className="inp" type="tel" autoComplete="tel" placeholder="(905) 555-0123" value={values.phone} onChange={e => set('phone', e.target.value)} />
            </div>
            <div className={fld('service')}>
              <label htmlFor="f-service" className="mb-1.5 block text-sm font-medium text-ink">
                Service of interest
              </label>
              <div ref={selWrap} className={`sel-wrap${flash ? ' flash' : ''}`}>
                <select id="f-service" {...common('service')} className="inp" value={values.service} onChange={e => set('service', e.target.value)}>
                  <option value="" disabled>
                    Select a service
                  </option>
                  {SERVICE_KEYS.map(k => (
                    <option key={k} value={k}>
                      {SERVICES[k].title}
                    </option>
                  ))}
                  <option value="other">Something else</option>
                </select>
              </div>
              {err('service')}
            </div>
            <fieldset className="sm:col-span-2">
              <legend className="mb-2 text-sm font-medium text-ink">Preferred contact method</legend>
              <div className="seg-radio flex gap-2">
                {(['email', 'phone', 'either'] as const).map(m => (
                  <span key={m} className="contents">
                    <input type="radio" id={`m-${m}`} name="method" value={m} checked={values.method === m} onChange={() => set('method', m)} />
                    <label htmlFor={`m-${m}`} className="cursor-pointer rounded-full border border-stone-300 px-4 py-2 text-sm">
                      {m[0].toUpperCase() + m.slice(1)}
                    </label>
                  </span>
                ))}
              </div>
            </fieldset>
            <div className={fld('message', ' sm:col-span-2')}>
              <label htmlFor="f-msg" className="mb-1.5 block text-sm font-medium text-ink">
                How can we help?
              </label>
              <textarea id="f-msg" {...common('message')} className="inp min-h-[130px] resize-y" placeholder="Tell us briefly about your situation..." value={values.message} onChange={e => set('message', e.target.value)} />
              {err('message')}
            </div>
          </div>
          <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-relaxed text-stone-500">
              Your information is kept confidential. Submitting this form does not create a client relationship.
            </p>
            <button
              id="submit"
              type="submit"
              disabled={status === 'loading'}
              className={`btn btn-primary shrink-0 whitespace-nowrap px-7 py-3.5 text-[15px]${status === 'loading' ? ' loading' : ''}`}
            >
              <span className="label">Book a Consultation</span>
              <ArrowRight className="arrow h-4 w-4" />
              <svg className="spin h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".3" strokeWidth="3" />
                <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </form>

      <div id="success" className="absolute inset-0 grid place-items-center p-8 text-center" role="status" aria-live="polite">
        <div>
          <svg viewBox="0 0 96 96" className="mx-auto h-20 w-20" fill="none" aria-hidden="true">
            <circle cx="48" cy="48" r="44" fill="#F6EFDF" />
            <circle className="ring" pathLength={1} cx="48" cy="48" r="44" stroke="#B8924A" strokeWidth="2.5" transform="rotate(-90 48 48)" />
            <path className="tick" pathLength={1} d="M31 49 L43 61 L66 36" stroke="#86672A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h3 className="mt-6 font-display text-3xl text-ink">Thank you.</h3>
          <p className="mx-auto mt-3 max-w-sm leading-relaxed">
            {status === 'done'
              ? `Thank you, ${firstName}. Your request has been received, and a member of our team will be in touch soon.`
              : 'Your request has been received. A member of our team will be in touch soon.'}
          </p>
          <button type="button" onClick={reset} className="btn btn-outline mt-8 px-6 py-3 text-sm">
            Send another message
          </button>
        </div>
      </div>
    </div>
  );
}
