// ProductShowcase — clickable cards for each build product (Websites, Web Apps,
// SaaS Platforms, Mobile Apps) on the Services page. Each card deep-links to the
// full product page at /services/:slug (slug === category key).
//
// Content is derived from PRICING_DATA (labels, taglines, starting price) joined
// with PRODUCT_CARD_META (icon + short blurb), so it can never drift from the
// pricing source of truth.

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PRICING_DATA } from "./pricingData";
import { PRODUCT_CARD_META } from "./productData";
import { formatGHS } from "./quote";

// Lowest numeric tier price for a category, or null if all tiers are custom.
function startingPrice(category) {
  const numeric = (category.tiers || []).filter((t) => !t.custom);
  if (!numeric.length) return null;
  return Math.min(...numeric.map((t) => t.price));
}

export default function ProductShowcase() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {PRICING_DATA.categories.map((category, i) => {
        const meta = PRODUCT_CARD_META[category.key] || {};
        const Icon = meta.Icon;
        const start = startingPrice(category);
        const priceLabel = start
          ? `from ${formatGHS(start, PRICING_DATA.currency)}`
          : "Custom quote";

        return (
          <motion.div
            key={category.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
          >
            <Link
              to={`/services/${category.key}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#F2600B]/15 bg-[#0c0705] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F2600B]/45 hover:shadow-2xl hover:shadow-[#F2600B]/5 focus-visible:outline-none focus-visible:border-[#F2600B] focus-visible:ring-2 focus-visible:ring-[#F2600B]/50"
            >
              {/* top accent bar on hover */}
              <span className="absolute top-0 left-0 h-[2px] w-0 bg-[#F2600B] transition-all duration-500 group-hover:w-full" />

              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F2600B]/20 bg-[#F2600B]/10 text-[#F2600B] transition-all duration-300 group-hover:border-[#F2600B]/40 group-hover:bg-[#F2600B]/20">
                  {Icon ? <Icon size={22} /> : null}
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-gray-600 transition-colors duration-300 group-hover:text-[#ff8534]"
                />
              </div>

              <h3 className="hero-display mt-5 text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#ff8534]">
                {category.label}
              </h3>
              <p className="mt-1 text-sm text-gray-400">{meta.blurb || category.tagline}</p>

              <div className="mt-auto pt-5">
                <span className="text-[#F2600B] font-bold text-sm">{priceLabel}</span>
                <span className="mt-2 flex items-center gap-1.5 text-sm font-medium text-[#F2600B] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View full offering <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
