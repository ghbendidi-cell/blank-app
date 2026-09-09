import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/500.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SelectionProvider } from "./context/SelectionContext";
import { LanguageProvider } from "./i18n/LanguageContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LanguageProvider>
        <SelectionProvider>
          <App />
        </SelectionProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
