'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SERVICES, type ServiceKey } from '@/lib/content';
import { prefersReducedMotion } from '@/lib/motion';
import { stagger } from '@/lib/style';
import { useSite } from './SiteProvider';
import CheckIcon from './CheckIcon';

export default function ServiceDialog() {
  const { openKey, closeService, requestPrefill } = useSite();
  const ref = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const afterClose = useRef<(() => void) | null>(null);
  // Keep showing the last service while the closing animation plays.
  const [shown, setShown] = useState<ServiceKey | null>(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (openKey) {
      lastFocus.current = document.activeElement as HTMLElement | null;
      setShown(openKey);
      setClosing(false);
      if (!dlg.open) dlg.showModal();
    } else if (dlg.open) {
      if (prefersReducedMotion()) finish();
      else setClosing(true);
    }
  }, [openKey]);

  useEffect(() => {
    if (openKey && shown === openKey) titleRef.current?.focus();
  }, [openKey, shown]);

  function finish() {
    setClosing(false);
    ref.current?.close();
    const after = afterClose.current;
    afterClose.current = null;
    if (after) after();
    else lastFocus.current?.focus({ preventScroll: true });
  }

  const s = shown ? SERVICES[shown] : null;
  const Icon = s?.icon;

  return (
    <dialog
      ref={ref}
      id="svc-dialog"
      className={`modal${closing ? ' closing' : ''}`}
      aria-labelledby="dlg-title"
      onCancel={e => {
        e.preventDefault();
        closeService();
      }}
      onClick={e => {
        if (e.target === e.currentTarget) closeService();
      }}
      onAnimationEnd={e => {
        if (e.target === e.currentTarget && closing) finish();
      }}
    >
      <div className="relative max-h-[calc(100dvh-48px)] overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl sm:p-10">
        <button
          type="button"
          onClick={closeService}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-stone-500 transition hover:bg-stone-100 hover:text-ink"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
        {s && Icon && (
          // Keyed so the staggered entrance replays for each service.
          <div key={s.key} id="dlg-body">
            <span className="stag grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent">
              <Icon className="h-5 w-5" />
            </span>
            <h3 ref={titleRef} id="dlg-title" tabIndex={-1} className="stag mt-6 pr-10 font-display text-3xl text-ink outline-none" style={stagger(1)}>
              {s.title}
            </h3>
            <p className="stag mt-4 text-[16px] leading-relaxed" style={stagger(2)}>
              {s.body}
            </p>
            <p className="stag mt-8 text-xs font-semibold uppercase tracking-[.14em] text-stone-500" style={stagger(3)}>
              What&apos;s included
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {s.includes.map((x, i) => (
                <li key={x} className="stag flex items-start gap-3 text-[15px] text-stone-700" style={stagger(i + 3)}>
                  <CheckIcon />
                  {x}
                </li>
              ))}
            </ul>
            <div className="stag mt-8 rounded-2xl bg-paper p-5 text-[15px]" style={stagger(8)}>
              <span className="font-medium text-ink">Ideal for:</span> {s.who}
            </div>
            <div className="stag mt-8 flex flex-col gap-3 sm:flex-row" style={stagger(9)}>
              <a
                href="#contact"
                data-prefill={s.key}
                className="btn btn-primary px-6 py-3 text-[15px]"
                onClick={e => {
                  e.preventDefault();
                  const key = s.key;
                  afterClose.current = () => {
                    requestPrefill(key);
                    document.getElementById('contact')?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
                  };
                  closeService();
                }}
              >
                Book a Consultation <ArrowRight className="arrow h-4 w-4" />
              </a>
              <button type="button" onClick={closeService} className="btn btn-outline px-6 py-3 text-[15px]">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
