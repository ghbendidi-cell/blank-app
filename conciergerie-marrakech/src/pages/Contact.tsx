import { useEffect } from "react";
import { ContactSection } from "../components/ContactSection";
import { useLanguage } from "../i18n/LanguageContext";

export function Contact() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `${t.contact.heading} — ${t.nav.brand}`;
  }, [t]);

  return <ContactSection headingLevel="h1" />;
}
