import About from '@/components/About';
import BackToTop from '@/components/BackToTop';
import Contact from '@/components/Contact';
import CtaBand from '@/components/CtaBand';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Industries from '@/components/Industries';
import ScrollEffects from '@/components/ScrollEffects';
import ServiceDialog from '@/components/ServiceDialog';
import Services from '@/components/Services';
import { SiteProvider } from '@/components/SiteProvider';
import Testimonials from '@/components/Testimonials';
import TrustBar from '@/components/TrustBar';

export default function Home() {
  return (
    <SiteProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <ServiceDialog />
        <CtaBand />
        <Industries />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <ScrollEffects />
    </SiteProvider>
  );
}
