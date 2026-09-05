import { Header } from './components/Header';
import { Announcement } from './components/Announcement';
import { Hero } from './components/Hero';
import { SelfService } from './components/SelfService';
import { DigitalAccount } from './components/DigitalAccount';
import { Promo } from './components/Promo';
import { SimulatorSection } from './components/SimulatorSection';
import { Steps } from './components/Steps';
import { RequestForm } from './components/RequestForm';
import { Regulation } from './components/Regulation';
import { Faq } from './components/Faq';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-blue focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        Ir para o conteúdo
      </a>

      <Header />
      <Announcement />

      <main id="conteudo">
        <Hero />
        <SelfService />
        <DigitalAccount />
        <Promo />
        <SimulatorSection />
        <Steps />
        <RequestForm />
        <Regulation />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}
