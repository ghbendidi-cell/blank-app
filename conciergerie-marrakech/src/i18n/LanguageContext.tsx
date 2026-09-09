import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultLanguage,
  translations,
  type Language,
  type TranslationStrings,
} from "./translations";

const STORAGE_KEY = "conciergerie-lang";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationStrings;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLanguage(): Language {
  if (typeof window === "undefined") return defaultLanguage;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" || stored === "fr" ? stored : defaultLanguage;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // localStorage unavailable (private mode, etc.) — language still
      // switches for this session, it just won't persist.
    }
    document.documentElement.lang = lang;
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t: translations[language] }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
