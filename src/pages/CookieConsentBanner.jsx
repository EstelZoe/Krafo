import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_CONSENT_KEY = "krafo_cookie_consent";

export default function CookieConsentBanner() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (storedConsent) {
      setConsent(storedConsent);
    } else {
      setConsent("pending");
    }
  }, []);

  const handleConsent = (decision) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, decision);
    setConsent(decision);
    if (decision === "accepted") {
      // You can trigger analytics initialization here
      window.dispatchEvent(new CustomEvent("consent-given"));
    }
    // Reload if needed, or manage state to load scripts
    // window.location.reload();
  };

  if (consent !== "pending") {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        // Floated off the viewport edge and frosted, rather than a solid bar
        // welded to the bottom — it now reads as a card sitting above the page
        // instead of a strip cutting the design off.
        className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-5"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 rounded-2xl border border-white/15 bg-black/45 p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:flex-row sm:p-5">
          <p className="text-sm text-gray-200 text-center sm:text-left">
            We use cookies to enhance your browsing experience and analyze our
            traffic. By clicking "Accept", you consent to our use of cookies.
            Read our{" "}
            <Link to="/cookies-policy" className="underline text-[#F2600B] hover:text-orange-400">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link to="/terms-and-conditions" className="underline text-[#F2600B] hover:text-orange-400">
              Terms & Conditions
            </Link>.
          </p>
          <div className="flex flex-shrink-0 gap-3">
            <button
              onClick={() => handleConsent("declined")}
              className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-gray-300 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              Decline
            </button>
            <button
              onClick={() => handleConsent("accepted")}
              className="rounded-full bg-[#F2600B] px-6 py-2 text-sm font-bold text-white shadow-lg shadow-[#F2600B]/25 transition hover:bg-[#d94f00]"
            >
              Accept
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}