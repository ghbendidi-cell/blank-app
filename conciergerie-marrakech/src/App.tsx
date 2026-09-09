import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Pricing } from "./pages/Pricing";
import { ServiceDetail } from "./pages/ServiceDetail";
import { ServicesList } from "./pages/ServicesList";
import { useLanguage } from "./i18n/LanguageContext";

export default function App() {
  const { t } = useLanguage();

  useEffect(() => {
    // Per-page routes set their own document.title; this just covers the
    // default (home) case and keeps the meta description in sync everywhere.
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", t.meta.description);
  }, [t]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<ServicesList />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="tarifs" element={<Pricing />} />
        <Route path="a-propos" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
