import Image from 'next/image';
import { Facebook, Linkedin, Mail } from 'lucide-react';

const social = 'grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:border-white hover:text-white';
const heading = 'text-xs font-semibold uppercase tracking-[.14em] text-gold-light';

export default function Footer() {
  return (
    <footer className="bg-navy text-navy-mist">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <a href="#home" className="inline-flex" aria-label="A&R LLP home">
              <Image src="/images/ar-llp-logo.png" alt="A&R LLP, Chartered Professional Accountants" className="h-14 w-auto" width={315} height={75} />
            </a>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed">
              Chartered Professional Accountants serving individuals and businesses across Halton, Hamilton and the GTA
              since 2010.
            </p>
            <div className="mt-6 flex gap-2">
              {/* Replace # with the firm's LinkedIn and Facebook pages */}
              <a href="#" aria-label="LinkedIn" className={social}>
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Facebook" className={social}>
                <Facebook className="h-4 w-4" />
              </a>
              <a href="mailto:info@arllp.ca" aria-label="Email info@arllp.ca" className={social}>
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
            <div>
              <p className={heading}>Services</p>
              <ul className="mt-5 space-y-3 text-[15px]">
                <li><a href="#services" className="flink">Accounting &amp; Bookkeeping</a></li>
                <li><a href="#services" className="flink">Personal &amp; Corporate Tax</a></li>
                <li><a href="#services" className="flink">CRA Audit Support</a></li>
                <li><a href="#services" className="flink">Virtual CFO &amp; Advisory</a></li>
              </ul>
            </div>
            <div>
              <p className={heading}>Firm</p>
              <ul className="mt-5 space-y-3 text-[15px]">
                <li><a href="#about" className="flink">About</a></li>
                <li><a href="#industries" className="flink">Industries</a></li>
                <li><a href="#testimonials" className="flink">Testimonials</a></li>
                <li><a href="#contact" className="flink">Contact</a></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className={heading}>Get in touch</p>
              <ul className="mt-5 space-y-3 text-[15px]">
                <li><a href="tel:+19056337081" className="flink">(905) 633-7081</a></li>
                <li><a href="mailto:info@arllp.ca" className="flink">info@arllp.ca</a></li>
                <li>9-22 Spring Creek Dr<br />Waterdown, ON L8B 1V7</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 border-t border-white/10 pt-8 text-xs leading-relaxed">
          <p className="max-w-4xl">
            A&amp;R LLP is a firm of Chartered Professional Accountants based in Waterdown, Ontario. The information on
            this website is for general informational purposes only and does not constitute accounting, tax, legal or
            investment advice. Viewing this site or contacting A&amp;R LLP does not create a client relationship;
            engagements are established only through a signed engagement letter. Please consult a qualified professional
            about your specific circumstances.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} A&amp;R LLP. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="flink">Privacy Policy</a>
              <a href="#" className="flink">Terms of Use</a>
              <a href="#" className="flink">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
