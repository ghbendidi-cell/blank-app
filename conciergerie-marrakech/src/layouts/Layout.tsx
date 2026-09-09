import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ScrollToTop } from "./ScrollToTop";

export function Layout() {
  return (
    <div className="bg-cream text-ink">
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
