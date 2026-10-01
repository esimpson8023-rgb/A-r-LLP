'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * Reveal on scroll for every [data-reveal] element on the page.
 * Content stays visible at rest; it only settles into place as it scrolls in.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const reduce = prefersReducedMotion();
    const timers: number[] = [];
    const revealer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          obs.unobserve(el);
          el.classList.add('in');
          // Once revealed, hand transforms back to hover effects.
          const delay = parseFloat(el.style.getPropertyValue('--d')) || 0;
          timers.push(
            window.setTimeout(() => {
              el.removeAttribute('data-reveal');
              el.classList.remove('in');
            }, reduce ? 0 : 900 + delay * 1000),
          );
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('[data-reveal]').forEach(el => revealer.observe(el));
    return () => {
      revealer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return null;
}
