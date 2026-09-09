import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** React Router doesn't reset scroll position between routes on its own. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
