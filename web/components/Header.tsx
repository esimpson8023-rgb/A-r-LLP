'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { NAV } from '@/lib/content';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [active, setActive] = useState<string>('home');
  const sentinel = useRef<HTMLDivElement>(null);

  // Header shrinks once the page leaves the top (IntersectionObserver, no scroll listener).
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setAtTop(e.isIntersecting));
    if (sentinel.current) io.observe(sentinel.current);
    return () => io.disconnect();
  }, []);

  // Highlight the nav link for the section in the middle of the viewport.
  useEffect(() => {
    const spy = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      <div ref={sentinel} className="pointer-events-none absolute left-0 top-0 h-2 w-px" aria-hidden="true" />
      <header id="header" className={`fixed inset-x-0 top-0 z-50${!atTop || menuOpen ? ' scrolled' : ''}`}>
        <div className="bar-h mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <a href="#home" className="flex shrink-0 items-center" aria-label="A&R LLP home">
            <Image
              src="/images/ar-llp-logo.png"
              alt="A&R LLP, Chartered Professional Accountants"
              className="logo"
              width={315}
              height={75}
              priority
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`nav-link text-sm font-medium${active === id ? ' active' : ''}`}
                aria-current={active === id ? 'true' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contact" className="hdr-cta btn btn-primary px-5 py-2.5 text-sm">
              Book a Consultation
            </a>
            <button
              id="burger"
              type="button"
              className="burger grid h-10 w-10 place-items-center rounded-full border border-stone-200 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(o => !o)}
            >
              <span className="flex flex-col gap-1">
                <span className="l" />
                <span className="l" />
                <span className="l" />
              </span>
            </button>
          </div>
        </div>

        <div id="mobile-menu" className={`border-t border-transparent bg-white lg:hidden${menuOpen ? ' open' : ''}`}>
          <div>
            <nav className="mx-auto flex max-w-7xl flex-col px-5 pb-5 pt-2 sm:px-8" aria-label="Mobile">
              {NAV.map(({ id, label }, i) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={close}
                  className={`${i < NAV.length - 1 ? 'border-b border-stone-100 ' : ''}py-3.5 text-[17px] text-ink`}
                >
                  {label}
                </a>
              ))}
              <a href="#contact" onClick={close} className="btn btn-primary mt-3 px-5 py-3.5">
                Book a Consultation
              </a>
            </nav>
          </div>
        </div>
        <div id="progress" className="absolute inset-x-0 bottom-0 h-[2px] bg-gold" aria-hidden="true" />
      </header>
    </>
  );
}
