import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Resets scroll to the top on new-page navigations only.
 *
 * Previously this fired window.scrollTo(0,0) on every pathname change, which
 * also ran on browser back/forward — so returning from /services/:slug back to
 * /services dropped the visitor at the top instead of where they left off.
 *
 * Now it defers to the browser's native scroll restoration on POP (back/
 * forward) and lets in-page #hash anchors scroll themselves; it only jumps to
 * the top when the user pushes/replaces to a genuinely new page.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "POP") return; // back/forward → restore position
    if (hash) return; // deep-link anchors handle their own scroll
    window.scrollTo(0, 0);
  }, [pathname, hash, navigationType]);

  return null;
}
