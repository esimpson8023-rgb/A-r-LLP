'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { INDUSTRIES, SERVICES } from '@/lib/content';
import { prefersReducedMotion } from '@/lib/motion';
import { delay, stagger } from '@/lib/style';
import { useSite } from './SiteProvider';
import CheckIcon from './CheckIcon';

export default function Industries() {
  const { openService } = useSite();
  const [selected, setSelected] = useState(0);
  // The panel fades out, swaps content, then fades back in.
  const [shown, setShown] = useState(0);
  const [out, setOut] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (selected === shown) return;
    setOut(true);
    const t = window.setTimeout(() => {
      setShown(selected);
      setOut(false);
    }, prefersReducedMotion() ? 0 : 200);
    return () => clearTimeout(t);
  }, [selected, shown]);

  const select = (i: number, focus = false) => {
    const tab = tabs.current[i];
    if (focus) tab?.focus();
    tab?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    setSelected(i);
  };

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const dir = ({ ArrowRight: 1, ArrowLeft: -1 } as Record<string, number>)[e.key];
    if (!dir) return;
    e.preventDefault();
    select((i + dir + INDUSTRIES.length) % INDUSTRIES.length, true);
  };

  const ind = INDUSTRIES[shown];
  const Icon = ind.icon;

  return (
    <section id="industries" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 data-reveal="" style={delay('.05s')} className="font-display text-4xl leading-[1.1] tracking-[-0.015em] text-ink sm:text-5xl">
            Experience with clients like you.
          </h2>
          <p data-reveal="" style={delay('.1s')} className="mt-5 text-[17px] leading-relaxed">
            Every client has different rules, deadlines and risks. Choose yours to see how we help.
          </p>
        </div>

        <div data-reveal="" style={delay('.1s')} className="tabs-scroll -mx-5 mt-10 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <div role="tablist" aria-label="Industries" className="flex w-max gap-2 pb-1 lg:w-auto lg:flex-wrap">
            {INDUSTRIES.map((x, i) => {
              const TabIcon = x.icon;
              return (
                <button
                  key={x.key}
                  ref={el => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`ind-${x.key}`}
                  aria-controls="ind-panel"
                  aria-selected={i === selected}
                  tabIndex={i === selected ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={e => onKeyDown(e, i)}
                  className="ind-tab inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-600"
                >
                  <TabIcon className="h-4 w-4" />
                  {x.name}
                </button>
              );
            })}
          </div>
        </div>

        <div
          data-reveal=""
          style={delay('.15s')}
          className="mt-8 overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-[0_2px_4px_rgba(31,28,24,.03),0_30px_60px_-40px_rgba(31,28,24,.3)]"
        >
          <div
            id="ind-panel"
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`ind-${INDUSTRIES[selected].key}`}
            className={`grid lg:grid-cols-12${out ? ' out' : ''}`}
          >
            {/* Keyed so the staggered entrance replays for each industry. */}
            <div key={`${ind.key}-a`} className="border-b border-stone-100 p-7 sm:p-10 lg:col-span-7 lg:border-b-0 lg:border-r">
              <span className="stag grid h-12 w-12 place-items-center rounded-xl bg-navy text-gold-light">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="stag mt-6 font-display text-3xl leading-tight text-ink" style={stagger(1)}>
                {ind.title}
              </h3>
              <p className="stag mt-4 max-w-xl text-[16px] leading-relaxed" style={stagger(2)}>
                {ind.text}
              </p>
              <a href="#contact" className="stag btn btn-primary mt-8 px-6 py-3 text-sm" style={stagger(3)}>
                Book a Consultation <ArrowRight className="arrow h-4 w-4" />
              </a>
            </div>
            <div key={`${ind.key}-b`} className="bg-navy-pale/70 p-7 sm:p-10 lg:col-span-5">
              <p className="stag text-xs font-semibold uppercase tracking-[.14em] text-stone-500" style={stagger(1)}>
                Challenges we solve
              </p>
              <ul className="mt-4 space-y-3">
                {ind.needs.map((n, i) => (
                  <li key={n} className="stag flex items-start gap-3 text-[15px] text-stone-700" style={stagger(i + 2)}>
                    <CheckIcon />
                    {n}
                  </li>
                ))}
              </ul>
              <p className="stag mt-8 text-xs font-semibold uppercase tracking-[.14em] text-stone-500" style={stagger(5)}>
                Related services
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {ind.services.map((k, i) => (
                  <button
                    key={k}
                    type="button"
                    data-open={k}
                    onClick={() => openService(k)}
                    className="stag chip-link rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-sm text-ink"
                    style={stagger(i + 6)}
                  >
                    {SERVICES[k].title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
