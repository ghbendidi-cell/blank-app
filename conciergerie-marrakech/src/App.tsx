import { About } from "./components/About";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Promise } from "./components/Promise";
import { Services } from "./components/Services";
import { useLanguage } from "./i18n/LanguageContext";
import { useEffect } from "react";

export default function App() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t.meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", t.meta.description);
  }, [t]);

  return (
    <div className="bg-cream text-ink">
      <Header />
      <main>
        <Hero />
        <Promise />
        <Services />
        <Gallery />
        <HowItWorks />
        <About />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
