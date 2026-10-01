import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { delay } from '@/lib/style';
import heroImage from '@/public/images/hero-meeting.jpg';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-white pb-28 pt-32 sm:pt-40 lg:pb-32">
      <div className="hero-bg pointer-events-none absolute inset-x-0 top-0 aspect-[3/2]" aria-hidden="true">
        <Image src={heroImage} alt="" className="h-full w-full object-cover" sizes="100vw" priority />
        <div className="hero-wash absolute inset-0" />
      </div>
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(184,146,74,.10),transparent)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="hero-text relative z-10 lg:col-span-7">
          <p data-load="" style={delay('.05s')} className="eyebrow rounded-full bg-white/[.93] px-3.5 py-1.5 shadow-sm backdrop-blur-sm">
            Serving Halton &amp; Hamilton since 2010
          </p>
          <h1 className="mt-6 font-display text-[2.6rem] font-normal leading-[1.06] tracking-[-0.02em] text-ink sm:text-[3.4rem] lg:text-[3.5rem] xl:text-[3.9rem]">
            <span className="line-mask">
              <span style={delay('.15s')}>Numbers You Can Trust.</span>
            </span>
            <span className="line-mask">
              <span style={delay('.3s')} className="gold-text italic">
                Advice You Can Build On.
              </span>
            </span>
          </h1>
          <p data-load="" style={delay('.55s')} className="mt-7 max-w-xl text-lg leading-relaxed text-stone-800">
            A&amp;R LLP provides reliable accounting, tax, and advisory services designed to help individuals and
            businesses make smarter financial decisions.
          </p>
          <div data-load="" style={delay('.7s')} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn btn-primary px-7 py-3.5 text-[15px]">
              Book a Consultation <ArrowRight className="arrow h-4 w-4" />
            </a>
            <a href="#services" className="btn btn-outline px-7 py-3.5 text-[15px]">
              Explore Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
