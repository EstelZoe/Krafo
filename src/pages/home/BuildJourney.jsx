// BuildJourney — the four build products laid out as a delivery path rather
// than a row of cards.
//
// The old homepage treatment was a 4-up grid of icon cards, which said nothing
// about what we actually make. This threads the real device mockups from the
// services page along a zig-zag, so a visitor sees a website on a monitor, a
// web app on a tablet, a SaaS dashboard on a laptop and an app on a phone —
// the product, not a description of it.
//
// The devices are the same components the services page uses, so there is one
// source of truth for what a Krafo build looks like.

import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PRICING_DATA } from "../services/pricingData";
import { PRODUCT_CARD_META, PRODUCTS } from "../services/productData";
import { DeviceMockup } from "../services/deviceMockups";
import { formatGHS } from "../services/quote";

// Alternating lean, so the path reads as hand-placed rather than gridded.
const TILTS = ["-rotate-3", "rotate-3", "-rotate-2", "rotate-2"];

// A per-product footnote, pulled from the product's own highlights so it can
// never drift from the offering page. Only websites has one today; the map
// keeps the door open without special-casing in the render.
const FOOTNOTES = {
  websites: PRODUCTS.websites?.highlights?.find(
    (highlight) => highlight.title === "You control your content"
  )?.text,
};

function startingLabel(category) {
  const numeric = (category.tiers || []).filter((t) => !t.custom);
  if (!numeric.length) return "Custom quote";
  return `from ${formatGHS(Math.min(...numeric.map((t) => t.price)), PRICING_DATA.currency)}`;
}

/**
 * The dashed run between two steps. Drawn with preserveAspectRatio="none" so
 * it stretches to whatever gap the layout gives it, and non-scaling-stroke so
 * that stretch never distorts the dashes or the line weight.
 *
 * Hidden below md, where the steps stack in a single column and a crossing
 * path would have nothing to cross.
 */
const Connector = ({ toRight }) => (
  <div aria-hidden="true" className="hidden h-24 w-full md:block lg:h-28">
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full">
      <path
        d={toRight ? "M27 0 C27 24, 73 16, 73 40" : "M73 0 C73 24, 27 16, 27 40"}
        fill="none"
        stroke="#F2600B"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeDasharray="7 8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  </div>
);

export default function BuildJourney() {
  const categories = PRICING_DATA.categories;

  return (
    <div className="relative mx-auto max-w-5xl">
      {categories.map((category, i) => {
        const meta = PRODUCT_CARD_META[category.key] || {};
        // The device screen already shows the short blurb, so the copy beside
        // it uses the product's fuller subtitle — otherwise the row says the
        // same six words twice.
        const description =
          PRODUCTS[category.key]?.subtitle || meta.blurb || category.tagline;
        const flip = i % 2 === 1;
        const isLast = i === categories.length - 1;

        return (
          <Fragment key={category.key}>
            <motion.div
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.55 }}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
            >
              {/* ── The device ──────────────────────────────────────── */}
              <div className={`flex justify-center ${flip ? "md:order-2" : ""}`}>
                <Link
                  to={`/services/${category.key}`}
                  aria-label={`${category.label} — view full offering`}
                  className={`group block outline-none transition-transform duration-500 ${TILTS[i % TILTS.length]} hover:rotate-0 focus-visible:rotate-0`}
                >
                  <div className="relative transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.04]">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-[#F2600B]/10 opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <div className="relative">
                      <DeviceMockup
                        productKey={category.key}
                        blurb={meta.blurb || category.tagline}
                        price={startingLabel(category)}
                        Icon={meta.Icon}
                      />
                    </div>
                  </div>
                </Link>
              </div>

              {/* ── The copy ────────────────────────────────────────── */}
              <div className={flip ? "md:order-1 md:text-right" : ""}>
                <div
                  className={`flex items-center gap-3 ${flip ? "md:justify-end" : ""}`}
                >
                  <span className="hero-display text-sm font-bold tracking-widest text-[#F2600B]/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-gradient-to-r from-[#F2600B]/60 to-transparent"
                  />
                </div>

                <h3 className="hero-display mt-2 text-2xl font-bold text-white md:text-3xl">
                  {category.label}
                </h3>
                <p
                  className={`mt-3 max-w-md text-balance leading-relaxed text-gray-400 ${flip ? "md:ml-auto" : ""}`}
                >
                  {description}
                </p>

                {FOOTNOTES[category.key] && (
                  <p
                    className={`mt-3 max-w-md text-sm leading-relaxed text-gray-500 ${flip ? "md:ml-auto" : ""}`}
                  >
                    {FOOTNOTES[category.key]}
                  </p>
                )}

                <div
                  className={`mt-5 flex flex-wrap items-center gap-4 ${flip ? "md:justify-end" : ""}`}
                >
                  <span className="text-sm font-semibold text-[#ff8534]">
                    {startingLabel(category)}
                  </span>
                  <Link
                    to={`/services/${category.key}`}
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-[#F2600B]"
                  >
                    View offering
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>

            {!isLast && <Connector toRight={!flip} />}
          </Fragment>
        );
      })}

      {/* Closing note, in the spirit of the reference's hand-written tag —
          the path ends at hand-over, which is the promise the rest of the
          page keeps making. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-14 flex justify-center"
      >
        <span className="inline-flex -rotate-2 items-center gap-2 rounded-full border border-dashed border-[#F2600B]/45 bg-[#F2600B]/5 px-5 py-2.5 text-sm font-semibold text-[#ff8534]">
          Built, launched, and handed over in your name
        </span>
      </motion.div>
    </div>
  );
}
