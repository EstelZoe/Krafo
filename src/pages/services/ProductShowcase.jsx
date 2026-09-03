// ProductShowcase — build products shown as a horizontal line of device mockups
// that each display their OWN content on-screen. Websites → desktop monitor,
// Web Apps → big tablet, SaaS → laptop, Mobile → phone. The service text sits
// above each device (no card), and the devices are staggered with a slight tilt.
//
// Content derives from PRICING_DATA + PRODUCT_CARD_META (single source of truth).

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PRICING_DATA } from "./pricingData";
import { PRODUCT_CARD_META } from "./productData";
import { formatGHS } from "./quote";
import { DeviceMockup } from "./deviceMockups";

// How far each device leans in this row. A layout choice, so it lives with
// the layout rather than with the mockups themselves.
const ROW_TILT = {
  websites: "-rotate-2",
  webapps: "rotate-2",
  saas: "-rotate-2",
  mobile: "rotate-2",
};

function startingPrice(category) {
  const numeric = (category.tiers || []).filter((t) => !t.custom);
  if (!numeric.length) return null;
  return Math.min(...numeric.map((t) => t.price));
}


export default function ProductShowcase() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-x-6 gap-y-14 xl:flex-nowrap">
      {PRICING_DATA.categories.map((category, i) => {
        const meta = PRODUCT_CARD_META[category.key] || {};
        const Icon = meta.Icon;
        const start = startingPrice(category);
        const price = start ? `from ${formatGHS(start, PRICING_DATA.currency)}` : "Custom quote";
        const tilt = ROW_TILT[category.key] || "";

        return (
          <motion.div
            key={category.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col items-center"
          >
            {/* Service text above the mockup (no card) */}
            <div className="mb-4 max-w-[15rem] text-center">
              <h3 className="hero-display text-lg font-bold text-[#F2600B]">{category.label}</h3>
              <p className="mt-1 text-xs text-gray-400">{category.tagline}</p>
            </div>

            <Link
              to={`/services/${category.key}`}
              aria-label={`${category.label} — view full offering`}
              className={`group block outline-none transition-transform duration-500 ${tilt} hover:rotate-0 focus-visible:rotate-0`}
            >
              <div className="relative transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.05]">
                {/* glow — intensifies on hover */}
                <div className="pointer-events-none absolute -inset-3 rounded-[2.5rem] bg-[#F2600B]/10 blur-2xl opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <DeviceMockup
                    productKey={category.key}
                    blurb={meta.blurb || category.tagline}
                    price={price}
                    Icon={Icon}
                  />
                </div>

                {/* Desktop: CTA button appears on hover */}
                <div className="pointer-events-none absolute inset-0 hidden items-center justify-center rounded-3xl bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2600B] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#F2600B]/40">
                    Explore {category.label} <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>

              {/* Mobile: persistent tap hint (no hover on touch) */}
              <div className="mt-4 flex justify-center md:hidden">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F2600B]/40 bg-[#F2600B]/10 px-4 py-1.5 text-xs font-semibold text-[#ff8534]">
                  Tap to explore <ArrowUpRight size={13} />
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
