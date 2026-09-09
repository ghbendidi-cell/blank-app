import { useEffect } from "react";
import { About } from "../components/About";
import { ContactSection } from "../components/ContactSection";
import { Gallery } from "../components/Gallery";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { Promise } from "../components/Promise";
import { Services } from "../components/Services";
import { useLanguage } from "../i18n/LanguageContext";

export function Home() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t.meta.title;
  }, [t]);

  return (
    <>
      <Hero />
      <Promise />
      <Services />
      <Gallery />
      <HowItWorks />
      <About />
      <ContactSection />
    </>
  );
}
