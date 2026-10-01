'use client';

import type { CSSProperties, PointerEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { SERVICES, type ServiceKey } from '@/lib/content';
import { delay } from '@/lib/style';
import { useSite } from './SiteProvider';

// Card layout for the bento grid: the tax card is the dark feature card, CRA support is gold-tinted.
const CARDS: { key: ServiceKey; d?: string; wide?: boolean; tone?: 'dark' | 'tint' }[] = [
  { key: 'accounting' },
  { key: 'tax', d: '.06s', wide: true, tone: 'dark' },
  { key: 'cra', d: '.12s', wide: true, tone: 'tint' },
  { key: 'cfo' },
  { key: 'estate', d: '.06s' },
  { key: 'assurance', d: '.12s', wide: true },
];

const TONES = {
  light: { card: 'border-stone-200/80 bg-white', ic: 'bg-accent-soft text-accent', h: 'text-ink', p: '', more: 'text-accent' },
  dark: { card: 'svc-dark border-navy bg-navy', ic: 'bg-white/10 text-gold-light', h: 'text-white', p: 'text-navy-mist', more: 'text-gold-light' },
  tint: { card: 'border-[#EADFC6] bg-accent-soft', ic: 'bg-white text-accent', h: 'text-ink', p: '', more: 'text-accent' },
};

// The hover glow follows the pointer.
const trackPointer = (e: PointerEvent<HTMLElement>) => {
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${e.clientX - r.left}px`);
  card.style.setProperty('--my', `${e.clientY - r.top}px`);
};

export default function Services() {
  const { openService } = useSite();

  return (
    <section id="services" className="bg-navy-pale py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 data-reveal="" style={delay('.05s')} className="font-display text-4xl leading-[1.1] tracking-[-0.015em] text-ink sm:text-5xl">
            Accounting and tax services, delivered with care.
          </h2>
          <p data-reveal="" style={delay('.1s')} className="mt-5 max-w-xl text-[17px] leading-relaxed">
            Select any service to see what&apos;s included and who it&apos;s designed for.
          </p>
        </div>

        <div id="svc-grid" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map(({ key, d, wide, tone }) => {
            const s = SERVICES[key];
            const t = TONES[tone ?? 'light'];
            const Icon = s.icon;
            return (
              <article
                key={key}
                data-svc={key}
                data-reveal=""
                style={d ? delay(d) : ({} as CSSProperties)}
                className={`svc-card flex flex-col rounded-2xl border p-7 ${t.card}${wide ? ' lg:col-span-2' : ''}`}
                onClick={() => openService(key)}
                onPointerMove={trackPointer}
              >
                <span className={`ic grid h-12 w-12 place-items-center rounded-xl ${t.ic}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className={`mt-6 font-display text-[22px] ${t.h}`}>{s.title}</h3>
                <p className={`mt-3 flex-1 text-[15px] leading-relaxed${wide ? ' max-w-md' : ''}${t.p ? ` ${t.p}` : ''}`}>{s.summary}</p>
                <button type="button" className={`more mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium ${t.more}`}>
                  Learn more <ArrowRight className="arrow h-4 w-4" />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
