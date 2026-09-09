import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ServiceSlug } from "../data/services";

const STORAGE_KEY = "dar-amana-selection";

interface SelectionContextValue {
  selected: ServiceSlug[];
  isSelected: (slug: ServiceSlug) => boolean;
  toggle: (slug: ServiceSlug) => void;
  addMany: (slugs: ServiceSlug[]) => void;
  remove: (slug: ServiceSlug) => void;
  clear: () => void;
  count: number;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

function readStoredSelection(): ServiceSlug[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ServiceSlug[]) : [];
  } catch {
    return [];
  }
}

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<ServiceSlug[]>(readStoredSelection);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    } catch {
      // sessionStorage unavailable (private mode, etc.) — selection still
      // works for this render, it just won't persist across a reload.
    }
  }, [selected]);

  const isSelected = useCallback(
    (slug: ServiceSlug) => selected.includes(slug),
    [selected]
  );

  const toggle = useCallback((slug: ServiceSlug) => {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const addMany = useCallback((slugs: ServiceSlug[]) => {
    setSelected((prev) => {
      const next = new Set(prev);
      slugs.forEach((slug) => next.add(slug));
      return Array.from(next);
    });
  }, []);

  const remove = useCallback((slug: ServiceSlug) => {
    setSelected((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clear = useCallback(() => setSelected([]), []);

  const value = useMemo<SelectionContextValue>(
    () => ({
      selected,
      isSelected,
      toggle,
      addMany,
      remove,
      clear,
      count: selected.length,
    }),
    [selected, isSelected, toggle, addMany, remove, clear]
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection(): SelectionContextValue {
  const ctx = useContext(SelectionContext);
  if (!ctx) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return ctx;
}
