// QuoteConfigurator — interactive software-development quote builder for the
// Services page. Presented in the SERVICES.CFG-style terminal chrome (header bar,
// dotted grid backdrop, monospace font) reused from src/pages/Services.jsx.
//
// State is only the raw selection: a single base tier id + a multi-select set of
// add-on ids. The Estimated_Total and its custom/numeric branch are DERIVED on
// every render from PRICING_DATA via the pure helpers in quote.js — never stored
// in state — so the displayed figure can never drift from the data source (R6.4).
//
// There is deliberately NO typed-command reveal interaction anywhere (R5.6).
//
// _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 6.4, 10.2_

import React, { useMemo, useState } from "react";
import {
  Globe,
  LayoutDashboard,
  Zap,
  Smartphone,
  Check,
  Star,
  ArrowRight,
  Plus,
} from "lucide-react";
import { PRICING_DATA } from "./pricingData";
import {
  findTier,
  isCustomQuote,
  computeEstimatedTotal,
  formatGHS,
  buildQuoteRequest,
} from "./quote";

// Reuse the page's booking/prefill path. The primary CTA across Services.jsx and
// Consultation.jsx opens this Calendly link in a new tab; the quote request reuses
// that exact mechanism, carrying the structured selection as a prefill note.
const CALENDLY_URL = "https://calendly.com/krafosystems";

// Per-category icon (decorative only — data still comes from PRICING_DATA).
const CATEGORY_ICONS = {
  websites: Globe,
  webapps: LayoutDashboard,
  saas: Zap,
  mobile: Smartphone,
};

/**
 * First selectable (non-custom) tier id in PRICING_DATA, used as the default
 * base tier so the Estimated_Total renders a real figure on first paint. Falls
 * back to the very first tier if every tier were custom.
 */
function firstSelectableTierId(data) {
  const tiers = data.categories.flatMap((c) => c.tiers);
  const numeric = tiers.find((t) => !t.custom);
  return (numeric || tiers[0]).id;
}

/**
 * Build the Calendly prefill URL carrying a human-readable summary of the current
 * selection in the first custom-question field (a1). Reuses buildQuoteRequest so
 * the summary reflects exactly the selected tier + add-ons + total.
 */
function buildCalendlyUrl(quote) {
  const lines = [];
  if (quote.tier) {
    lines.push(`Base tier: ${quote.tier.name} (${quote.tier.priceLabel})`);
  }
  lines.push(
    quote.addOns.length
      ? `Add-ons: ${quote.addOns.map((a) => `${a.label} (${a.priceLabel})`).join(", ")}`
      : "Add-ons: none"
  );
  lines.push(`Estimated: ${quote.totalLabel}`);
  const params = new URLSearchParams({ a1: lines.join("\n") });
  return `${CALENDLY_URL}?${params.toString()}`;
}

export default function QuoteConfigurator() {
  const [baseTierId, setBaseTierId] = useState(() => firstSelectableTierId(PRICING_DATA));
  const [selectedAddOnIds, setSelectedAddOnIds] = useState([]);

  // Derived on EVERY render from PRICING_DATA — never stored in state (R6.4).
  const selectedTier = findTier(PRICING_DATA, baseTierId);
  const isCustom = isCustomQuote(PRICING_DATA, baseTierId);
  const total = computeEstimatedTotal(PRICING_DATA, baseTierId, selectedAddOnIds);
  const estimateLine = isCustom
    ? "// estimated: Custom quote"
    : `// estimated: ${formatGHS(total, PRICING_DATA.currency)}`;

  const toggleAddOn = (id) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleRequestQuote = () => {
    const quote = buildQuoteRequest(PRICING_DATA, baseTierId, selectedAddOnIds);
    const url = buildCalendlyUrl(quote);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Add-on price lookup for the running list (derived from PRICING_DATA).
  const selectedAddOns = useMemo(
    () => PRICING_DATA.addOns.filter((a) => selectedAddOnIds.includes(a.id)),
    [selectedAddOnIds]
  );

  return (
    <div className="quote-configurator">
      <style>{`
        .quote-configurator .terminal {
          font-family: 'Space Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
        }
      `}</style>

      {/* Terminal card — reuses SERVICES.CFG chrome */}
      <div className="terminal relative rounded-2xl border border-[#F2600B]/25 bg-[#050505] overflow-hidden shadow-2xl shadow-black/60">
        {/* dotted grid backdrop */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.15] bg-[radial-gradient(#F2600B_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* header bar */}
        <div className="relative flex items-center gap-2 px-5 py-3 border-b border-[#F2600B]/20 bg-black/40">
          <span className="text-[#F2600B] font-bold tracking-widest text-sm">
            &gt; QUOTE.CFG
          </span>
          <span className="ml-auto flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#F2600B]/30" />
            <span className="w-3 h-3 rounded-full bg-[#F2600B]/50" />
            <span className="w-3 h-3 rounded-full bg-[#F2600B]/80" />
          </span>
        </div>

        {/* body */}
        <div className="relative p-5 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            {/* ── LEFT: base tier + add-on selection ─────────────────── */}
            <div>
              {/* Base tier — single select across categories */}
              <p className="text-[#F2600B] font-bold tracking-wider text-sm mb-1">
                # base_tier
              </p>
              <p className="text-gray-500 text-xs mb-4">
                Pick the project type and tier that fits your scope.
              </p>

              <div className="space-y-6">
                {PRICING_DATA.categories.map((category) => {
                  const CatIcon = CATEGORY_ICONS[category.key] || Globe;
                  return (
                    <fieldset key={category.key} className="border-0 p-0 m-0">
                      <legend className="flex items-center gap-2 text-gray-300 text-xs font-bold tracking-wider uppercase mb-3">
                        <CatIcon size={15} className="text-[#F2600B]" />
                        {category.label}
                      </legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {category.tiers.map((tier) => {
                          const selected = tier.id === baseTierId;
                          const priceLabel = tier.custom
                            ? "Custom quote"
                            : formatGHS(tier.price, PRICING_DATA.currency);
                          return (
                            <button
                              key={tier.id}
                              type="button"
                              role="radio"
                              aria-checked={selected}
                              onClick={() => setBaseTierId(tier.id)}
                              className={`relative text-left rounded-lg p-3 border transition-all ${
                                selected
                                  ? "border-[#F2600B] bg-[#F2600B]/10 shadow-lg shadow-[#F2600B]/10"
                                  : "border-[#F2600B]/15 bg-black/40 hover:border-[#F2600B]/40"
                              }`}
                            >
                              {tier.best && (
                                <span className="absolute -top-2 right-2 inline-flex items-center gap-1 bg-[#F2600B] text-black text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider">
                                  <Star size={9} className="fill-black" /> BEST
                                </span>
                              )}
                              <span className="flex items-center gap-2">
                                <span
                                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                    selected
                                      ? "border-[#F2600B]"
                                      : "border-[#F2600B]/40"
                                  }`}
                                >
                                  {selected && (
                                    <span className="w-2 h-2 rounded-full bg-[#F2600B]" />
                                  )}
                                </span>
                                <span className="font-bold text-white text-sm">
                                  {tier.name}
                                </span>
                              </span>
                              <span
                                className={`block mt-1 pl-6 font-bold text-sm ${
                                  tier.custom ? "text-gray-300" : "text-[#F2600B]"
                                }`}
                              >
                                {priceLabel}
                              </span>
                              {tier.bestFor && (
                                <span className="block mt-1 text-gray-500 text-[11px] italic">
                                  {tier.bestFor}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  );
                })}
              </div>

              {/* Add-ons — multi-select toggles */}
              <p className="text-[#F2600B] font-bold tracking-wider text-sm mt-8 mb-1">
                # add_ons
              </p>
              <p className="text-gray-500 text-xs mb-4">
                Bolt on extra capabilities — toggle any that apply.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PRICING_DATA.addOns.map((addOn) => {
                  const selected = selectedAddOnIds.includes(addOn.id);
                  return (
                    <button
                      key={addOn.id}
                      type="button"
                      role="checkbox"
                      aria-checked={selected}
                      onClick={() => toggleAddOn(addOn.id)}
                      className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg border text-left transition-all ${
                        selected
                          ? "border-[#F2600B] bg-[#F2600B]/10"
                          : "border-[#F2600B]/10 bg-black/40 hover:border-[#F2600B]/30"
                      }`}
                    >
                      <span className="flex items-center gap-2 text-gray-300 text-sm">
                        <span
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            selected
                              ? "border-[#F2600B] bg-[#F2600B] text-black"
                              : "border-[#F2600B]/40 text-transparent"
                          }`}
                        >
                          {selected ? <Check size={12} /> : <Plus size={12} className="text-[#F2600B]/50" />}
                        </span>
                        {addOn.label}
                      </span>
                      <span className="text-[#F2600B] font-bold text-sm whitespace-nowrap">
                        {formatGHS(addOn.price, PRICING_DATA.currency)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── RIGHT: live estimate summary ───────────────────────── */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="rounded-xl border border-[#F2600B]/25 bg-black/60 p-5">
                <p className="text-gray-500 text-xs mb-3">// current_selection</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-gray-400">Base</span>
                    <span className="text-white font-medium text-right">
                      {selectedTier ? selectedTier.name : "—"}
                      <span className="block text-[#F2600B] text-xs font-bold">
                        {selectedTier
                          ? selectedTier.custom
                            ? "Custom quote"
                            : formatGHS(selectedTier.price, PRICING_DATA.currency)
                          : ""}
                      </span>
                    </span>
                  </div>

                  <div className="border-t border-[#F2600B]/10 pt-2">
                    <span className="text-gray-400">Add-ons</span>
                    {selectedAddOns.length === 0 ? (
                      <p className="text-gray-600 text-xs mt-1">none selected</p>
                    ) : (
                      <ul className="mt-1 space-y-1">
                        {selectedAddOns.map((a) => (
                          <li
                            key={a.id}
                            className="flex items-center justify-between gap-3 text-xs"
                          >
                            <span className="text-gray-300">{a.label}</span>
                            <span className="text-[#F2600B] font-bold whitespace-nowrap">
                              {formatGHS(a.price, PRICING_DATA.currency)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Estimated line */}
                <div className="mt-5 rounded-lg border border-[#F2600B]/30 bg-[#F2600B]/5 px-4 py-4">
                  <p className="text-[#F2600B] font-bold text-lg break-words">
                    {estimateLine}
                  </p>
                  {isCustom && (
                    <p className="text-gray-400 text-xs mt-1">
                      Mobile apps are scoped individually — we&apos;ll quote after a
                      quick chat.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleRequestQuote}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold text-white bg-[#F2600B] hover:bg-[#d94f00] shadow-lg shadow-[#F2600B]/30 transition-all hover:scale-[1.02] active:scale-95"
                >
                  Request this quote <ArrowRight size={18} />
                </button>

                {/* Starting-figures note (R7.4) */}
                <p className="text-gray-500 text-[11px] mt-4 text-center leading-relaxed">
                  {PRICING_DATA.startingPriceNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
