import { Clock, Compass, Mail, MapPin, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { delay } from '@/lib/style';
import ContactForm from './ContactForm';
import CopyEmail from './CopyEmail';

function Detail({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-medium text-ink">{label}</p>
        {children}
      </div>
    </li>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-reveal="" className="eyebrow">
            Contact
          </p>
          <h2 data-reveal="" style={delay('.05s')} className="mt-5 font-display text-4xl leading-[1.1] tracking-[-0.015em] text-ink sm:text-5xl">
            Let&apos;s start the conversation.
          </h2>
          <p data-reveal="" style={delay('.1s')} className="mt-5 text-[17px] leading-relaxed">
            Tell us about your situation and we&apos;ll recommend a clear next step. We work with individuals and businesses
            across Halton, Hamilton and the GTA.
          </p>

          {/* Contact details from arllp.ca */}
          <ul data-reveal="" style={delay('.15s')} className="mt-10 space-y-5">
            <Detail icon={MapPin} label="Office">
              <p className="text-[15px]">
                9-22 Spring Creek Dr
                <br />
                Waterdown, ON L8B 1V7
              </p>
            </Detail>
            <Detail icon={Phone} label="Phone">
              <a href="tel:+19056337081" className="text-[15px] hover:text-accent">
                (905) 633-7081
              </a>
            </Detail>
            <Detail icon={Mail} label="Email">
              <CopyEmail />
            </Detail>
            <Detail icon={Compass} label="Areas served">
              <p className="text-[15px]">
                Waterdown, Burlington, Oakville, Hamilton
                <br />
                and the Greater Toronto Area
              </p>
            </Detail>
            <Detail icon={Clock} label="Appointments">
              <p className="text-[15px]">Call, email or send the form to book a time</p>
            </Detail>
          </ul>
        </div>

        <div data-reveal="" style={delay('.1s')} className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
