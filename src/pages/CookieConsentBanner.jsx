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
        className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-orange-500/30 p-4 z-50"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-300 text-center sm:text-left">
            We use cookies to enhance your browsing experience and analyze our
            traffic. By clicking "Accept", you consent to our use of cookies.
            Read our{" "}
            <Link to="/cookies-policy" className="underline text-[#F2600B] hover:text-orange-400">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="underline text-[#F2600B] hover:text-orange-400">
              Terms & Conditions
            </Link>.
          </p>
          <div className="flex-shrink-0 flex gap-3">
            <button
              onClick={() => handleConsent("declined")}
              className="px-4 py-2 text-sm font-medium rounded-md text-white hover:bg-white/10 transition"
            >
              Decline
            </button>
            <button
              onClick={() => handleConsent("accepted")}
              className="px-4 py-2 text-sm font-medium rounded-md bg-[#F2600B] text-white hover:bg-orange-600 transition"
            >
              Accept
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}