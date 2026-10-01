import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';
import bandImage from '@/public/images/band-boardroom.jpg';

export default function CtaBand() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy py-24 sm:py-32" aria-labelledby="band-title">
      <Image
        src={bandImage}
        alt=""
        className="photo-bg absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: '60% 40%' }}
        sizes="100vw"
        aria-hidden="true"
      />
      <div
        className="band-overlay absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(90deg,rgba(20,35,56,.94) 0%,rgba(20,35,56,.82) 45%,rgba(20,35,56,.5) 100%)' }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div data-reveal="" className="max-w-2xl">
          <p className="eyebrow">Work with A&amp;R LLP</p>
          <h2 id="band-title" className="mt-5 font-display text-4xl leading-[1.1] tracking-[-0.015em] text-white sm:text-5xl">
            Year-end, a CRA letter, or a big decision ahead?
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-stone-300">
            Talk it through with an experienced CPA. We&apos;ll explain what needs to happen, when it needs to happen, and
            how we can help.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn btn-primary px-7 py-3.5 text-[15px]">
              Book a Consultation <ArrowRight className="arrow h-4 w-4" />
            </a>
            <a href="tel:+19056337081" className="btn btn-ghost-dark px-7 py-3.5 text-[15px]">
              <Phone className="h-4 w-4" /> (905) 633-7081
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
