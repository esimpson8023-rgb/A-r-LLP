'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/content';
import { prefersReducedMotion } from '@/lib/motion';
import { delay } from '@/lib/style';
import bgImage from '@/public/images/testimonials-bg.jpg';

const N = TESTIMONIALS.length;

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  // Bumped on every change so the active dot's progress bar restarts.
  const [cycle, setCycle] = useState(0);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number | null; dx: number }>({ x: null, dx: 0 });

  useEffect(() => setAutoplay(!prefersReducedMotion()), []);

  // Pause while the carousel is off screen.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  const show = (i: number) => {
    const next = ((i % N) + N) % N;
    setPrev(next === idx ? null : idx);
    setIdx(next);
    setCycle(c => c + 1);
  };

  const paused = hover || focus || offscreen;

  return (
    <section id="testimonials" className="on-dark relative isolate overflow-hidden bg-navy py-24 sm:py-32">
      <Image src={bgImage} alt="" className="photo-bg absolute inset-0 -z-10 h-full w-full object-cover" sizes="100vw" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-[rgba(20,35,56,.84)]" aria-hidden="true" />
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <h2 data-reveal="" style={delay('.05s')} className="font-display text-4xl leading-[1.1] tracking-[-0.015em] text-white sm:text-5xl">
          What our clients value most.
        </h2>
        <p data-reveal="" style={delay('.1s')} className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-stone-300">
          <Sparkles className="h-3.5 w-3.5" /> Paraphrased from client testimonials on arllp.ca. Replace with the exact wording
          before publishing.
        </p>

        <div
          ref={wrap}
          id="t-wrap"
          data-reveal=""
          style={delay('.15s')}
          className={`relative mt-12${paused ? ' paused' : ''}`}
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        >
          <div
            className="t-stack"
            style={{ touchAction: 'pan-y' }}
            onPointerDown={e => (swipe.current = { x: e.clientX, dx: 0 })}
            onPointerMove={e => {
              if (swipe.current.x !== null) swipe.current.dx = e.clientX - swipe.current.x;
            }}
            onPointerUp={() => {
              const { x, dx } = swipe.current;
              if (x !== null && Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
              swipe.current.x = null;
            }}
            onPointerCancel={() => (swipe.current.x = null)}
          >
            {TESTIMONIALS.map(({ quote, author, icon: Icon }, i) => (
              <figure
                key={author}
                className={`t-slide${i === idx ? ' active' : ''}${i === prev ? ' prev' : ''}`}
                aria-hidden={i !== idx}
              >
                <Quote className="mx-auto h-8 w-8 text-gold" />
                <blockquote className="mx-auto mt-6 max-w-3xl font-display text-2xl leading-[1.4] text-white sm:text-[2rem]">{quote}</blockquote>
                <figcaption className="mt-8 flex items-center justify-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-gold-light ring-1 ring-white/15">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-left font-medium text-stone-200">{author}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              id="t-prev"
              type="button"
              onClick={() => show(idx - 1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/5 text-white transition hover:border-white hover:bg-white/10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`t-dot${i === idx ? ' active' : ''}`}
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => show(i)}
                >
                  {/* The fill animation runs for 7s, then advances to the next testimonial. */}
                  <span key={i === idx ? cycle : undefined} onAnimationEnd={autoplay && i === idx ? () => show(idx + 1) : undefined} />
                </button>
              ))}
            </div>
            <button
              id="t-next"
              type="button"
              onClick={() => show(idx + 1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/5 text-white transition hover:border-white hover:bg-white/10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
