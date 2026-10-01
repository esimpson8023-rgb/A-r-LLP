'use client';

import { useEffect, useRef, useState } from 'react';

/** Appears once the visitor has scrolled past the first 800px. */
export default function BackToTop() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0));
    if (sentinel.current) io.observe(sentinel.current);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} className="pointer-events-none absolute left-0 h-px w-px" style={{ top: 800 }} aria-hidden="true" />
      <a
        href="#home"
        id="to-top"
        className={`fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-navy text-white shadow-lg transition hover:bg-accent${show ? ' show' : ''}`}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 15l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </>
  );
}
