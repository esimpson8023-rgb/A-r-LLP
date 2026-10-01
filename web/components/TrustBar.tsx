import { Award, Handshake, Sparkles } from 'lucide-react';
import CountUp from './CountUp';

const dt = 'order-2 mt-1 text-sm text-stone-500';
const badge = 'order-1 grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-accent';
const figure = 'order-1 tabular font-display text-4xl text-ink sm:text-[2.6rem]';

export default function TrustBar() {
  return (
    <section className="relative z-10 -mt-14 px-5 sm:px-8" aria-label="Firm at a glance">
      <div
        data-reveal=""
        className="mx-auto max-w-6xl rounded-2xl border border-stone-200/80 bg-white shadow-[0_2px_4px_rgba(31,28,24,.03),0_24px_48px_-28px_rgba(31,28,24,.3)]"
      >
        {/* Figures taken from arllp.ca and the partner's public profile; confirm before publishing */}
        <dl className="grid grid-cols-2 divide-stone-100 lg:grid-cols-4 lg:divide-x">
          <div className="flex flex-col border-b border-r border-stone-100 px-6 py-7 text-center lg:border-b-0 lg:border-r-0">
            <dt className={dt}>Years serving Halton &amp; Hamilton</dt>
            <dd className={figure}>
              <CountUp to={15} />+
            </dd>
          </div>
          <div className="flex flex-col border-b border-stone-100 px-6 py-7 text-center lg:border-b-0">
            <dt className={dt}>Years of partner experience</dt>
            <dd className={figure}>
              <CountUp to={20} />+
            </dd>
          </div>
          <div className="flex flex-col items-center border-r border-stone-100 px-6 py-7 text-center lg:border-r-0">
            <dt className={dt}>QuickBooks &amp; Sage ProAdvisors</dt>
            <dd className={badge}>
              <Award className="h-5 w-5" />
            </dd>
          </div>
          <div className="flex flex-col items-center px-6 py-7 text-center">
            <dt className={dt}>Partner-led, personal service</dt>
            <dd className={badge}>
              <Handshake className="h-5 w-5" />
            </dd>
          </div>
        </dl>
      </div>
      <p className="mx-auto mt-3 flex max-w-6xl items-center justify-center gap-1.5 text-center text-xs text-stone-500">
        <Sparkles className="h-3.5 w-3.5" /> Based on information published on arllp.ca. Please confirm before publishing.
      </p>
    </section>
  );
}
