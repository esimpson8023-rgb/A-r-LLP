'use client';

import { useEffect, useRef, useState } from 'react';

const STEPS = [
  { title: 'Listen', text: 'We start by understanding your goals, obligations, and concerns.' },
  { title: 'Plan', text: 'We agree on the scope, timing and fees before any work begins.' },
  { title: 'Deliver', text: 'Our team handles the details accurately and on schedule.' },
  { title: 'Review', text: 'Regular check-ins keep your plan aligned as life and business change.' },
];

export default function ApproachSteps() {
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const [lit, setLit] = useState<boolean[]>(() => STEPS.map(() => false));

  // A step lights up once it passes 65% of the way down the viewport, and stays lit above it.
  useEffect(() => {
    const io = new IntersectionObserver(
      entries =>
        setLit(prev => {
          const next = [...prev];
          entries.forEach(e => {
            const i = refs.current.indexOf(e.target as HTMLLIElement);
            if (i >= 0) next[i] = e.isIntersecting || e.boundingClientRect.top < 0;
          });
          return next;
        }),
      { rootMargin: '0px 0px -35% 0px' },
    );
    refs.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ol id="approach" className="relative mt-7 space-y-8">
      <li className="pointer-events-none absolute bottom-4 left-[19px] top-4 w-px bg-stone-200" aria-hidden="true">
        <span className="fill block h-full w-full bg-accent" />
      </li>
      {STEPS.map((s, i) => (
        <li
          key={s.title}
          ref={el => {
            refs.current[i] = el;
          }}
          className={`ap-step relative flex gap-5${lit[i] ? ' on' : ''}`}
        >
          <span className="dot relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-stone-300 bg-white text-sm font-medium text-ink">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <p className="font-medium text-ink">{s.title}</p>
            <p className="mt-1 text-[15px] leading-relaxed">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
