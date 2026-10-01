import { Handshake, Scale, Target } from 'lucide-react';
import { delay } from '@/lib/style';
import ApproachSteps from './ApproachSteps';

const VALUES = [
  { icon: Scale, name: 'Integrity', text: 'Objective advice, clearly documented.' },
  { icon: Target, name: 'Precision', text: 'Accurate work, reviewed at every step.' },
  { icon: Handshake, name: 'Partnership', text: 'One team that knows your story.' },
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 data-reveal="" style={delay('.05s')} className="font-display text-4xl leading-[1.1] tracking-[-0.015em] text-ink sm:text-5xl">
            A partner-led firm, rooted in Halton and Hamilton.
          </h2>
          <div data-reveal="" style={delay('.1s')} className="mt-7 space-y-5 text-[17px] leading-relaxed">
            <p>
              Since 2010, A&amp;R LLP has provided accounting, tax and advisory services to individuals and businesses
              across Halton, Hamilton and the Greater Toronto Area from our office in Waterdown.
            </p>
            <p>
              The firm is led by partner Hassan Rasul, CPA, CMA, who brings more than 20 years of experience in
              accounting, audit, taxation, costing and financial reporting. You work directly with an experienced CPA,
              whether it&apos;s your first personal return, a corporate year-end or a CRA audit.
            </p>
          </div>
          <dl data-reveal="" style={delay('.1s')} className="mt-10 divide-y divide-stone-200 border-y border-stone-200">
            {VALUES.map(({ icon: Icon, name, text }) => (
              <div key={name} className="flex items-center gap-4 py-4">
                <Icon className="h-5 w-5 shrink-0 text-accent" />
                <dt className="w-28 shrink-0 font-medium text-ink">{name}</dt>
                <dd className="text-[15px]">{text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div data-reveal="" className="rounded-3xl bg-navy-pale p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[.14em] text-stone-500">Our approach</p>
            <ApproachSteps />
          </div>
        </div>
      </div>
    </section>
  );
}
