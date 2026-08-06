// ProductShowcase — build products shown as a horizontal line of device mockups
// that each display their OWN content on-screen. Websites → desktop monitor,
// Web Apps → big tablet, SaaS → laptop, Mobile → phone. The service text sits
// above each device (no card), and the devices are staggered with a slight tilt.
//
// Content derives from PRICING_DATA + PRODUCT_CARD_META (single source of truth).

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { PRICING_DATA } from "./pricingData";
import { PRODUCT_CARD_META } from "./productData";
import { formatGHS } from "./quote";

function startingPrice(category) {
  const numeric = (category.tiers || []).filter((t) => !t.custom);
  if (!numeric.length) return null;
  return Math.min(...numeric.map((t) => t.price));
}

const CTA = ({ small }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full bg-[#F2600B] font-semibold text-white ${
      small ? "px-2.5 py-1 text-[8px]" : "px-3 py-1 text-[9px]"
    }`}
  >
    View offering <ArrowUpRight size={small ? 8 : 9} />
  </span>
);

/* ── Screen UIs (fill their device screens) ───────────────────────── */

const WebsiteUI = ({ blurb, price, Icon }) => (
  <div className="flex h-full flex-col p-2.5 text-white">
    <div className="mb-2 flex items-center justify-between">
      <div className="flex items-center gap-1">
        {Icon ? <Icon size={11} className="text-[#F2600B]" /> : null}
        <span className="h-1.5 w-8 rounded bg-white/40" />
      </div>
      <div className="flex items-center gap-1">
        <span className="h-1.5 w-4 rounded bg-white/20" />
        <span className="h-1.5 w-4 rounded bg-white/20" />
        <span className="h-2 w-6 rounded-full bg-[#F2600B]" />
      </div>
    </div>
    <div className="flex flex-1 flex-col justify-center rounded-lg bg-gradient-to-br from-[#F2600B]/25 to-white/5 p-3">
      <p className="hero-display text-[13px] font-bold leading-snug">{blurb}</p>
      <div className="mt-2 flex items-center gap-2">
        <CTA />
        <span className="text-[9px] font-semibold text-[#ff8534]">{price}</span>
      </div>
    </div>
    <div className="mt-2 grid grid-cols-3 gap-1.5">
      {[0, 1, 2].map((k) => (
        <div key={k} className="rounded-md bg-white/5 p-1.5">
          <div className="h-1.5 w-4 rounded bg-[#F2600B]/60" />
          <div className="mt-1 h-1 w-full rounded bg-white/15" />
          <div className="mt-0.5 h-1 w-2/3 rounded bg-white/10" />
        </div>
      ))}
    </div>
  </div>
);

const TabletUI = ({ blurb, price, Icon }) => (
  <div className="flex h-full gap-2 p-2.5 text-white">
    <div className="flex w-10 flex-col items-center gap-1.5 rounded-md bg-white/5 py-2">
      {Icon ? <Icon size={13} className="text-[#F2600B]" /> : null}
      <span className="h-1 w-5 rounded bg-white/25" />
      <span className="h-1 w-5 rounded bg-white/25" />
      <span className="h-1 w-4 rounded bg-white/25" />
    </div>
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col justify-center rounded-lg bg-gradient-to-br from-[#F2600B]/20 to-white/5 p-3">
        <p className="hero-display text-[13px] font-bold leading-snug">{blurb}</p>
        <p className="mt-1.5 text-[9px] font-semibold text-[#ff8534]">{price}</p>
      </div>
      <div className="mt-2 space-y-1.5">
        {["Role-based access", "Custom workflows", "Admin dashboard"].map((f) => (
          <div key={f} className="flex items-center gap-1.5 text-[9px] text-gray-200">
            <Check size={10} className="shrink-0 text-[#F2600B]" /> {f}
          </div>
        ))}
      </div>
      <div className="mt-2">
        <CTA />
      </div>
    </div>
  </div>
);

const SaasUI = ({ blurb, price, Icon }) => (
  <div className="flex h-full gap-2 p-2.5 text-white">
    <div className="hidden w-12 flex-col gap-1.5 rounded-md bg-white/5 p-1.5 sm:flex">
      <div className="mb-1 flex items-center gap-1">
        {Icon ? <Icon size={11} className="text-[#F2600B]" /> : null}
      </div>
      <span className="h-1.5 w-full rounded bg-[#F2600B]/50" />
      <span className="h-1.5 w-full rounded bg-white/15" />
      <span className="h-1.5 w-2/3 rounded bg-white/15" />
    </div>
    <div className="flex flex-1 flex-col">
      <div className="mb-1.5 flex items-center justify-between">
        <p className="hero-display text-[11px] font-bold leading-tight">{blurb}</p>
        <CTA small />
      </div>
      <div className="mb-1.5 grid grid-cols-3 gap-1">
        {[
          ["Tenants", "128"],
          ["MRR", "42k"],
          ["Uptime", "99.9%"],
        ].map(([k, v]) => (
          <div key={k} className="rounded bg-white/5 p-1">
            <div className="text-[6px] uppercase text-gray-500">{k}</div>
            <div className="text-[9px] font-bold text-white">{v}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-end rounded bg-white/5 p-1.5">
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-full w-full">
          <polyline points="0,24 18,18 34,21 52,10 70,14 88,4 100,7" fill="none" stroke="#F2600B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="0,24 18,18 34,21 52,10 70,14 88,4 100,7 100,30 0,30" fill="#F2600B" fillOpacity="0.12" stroke="none" />
        </svg>
      </div>
      <p className="mt-1 text-[9px] font-semibold text-[#ff8534]">{price}</p>
    </div>
  </div>
);

const PhoneUI = ({ blurb, price, Icon }) => (
  <div className="flex h-full flex-col p-2.5 text-white">
    <div className="mb-2 flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#F2600B]/30 bg-[#F2600B]/15 text-[#F2600B]">
        {Icon ? <Icon size={14} /> : null}
      </div>
      <span className="text-[9px] font-semibold text-[#ff8534]">iOS &amp; Android</span>
    </div>
    <div className="flex flex-1 flex-col justify-center rounded-xl bg-gradient-to-br from-[#F2600B]/30 to-white/5 p-3">
      <p className="hero-display text-[13px] font-bold leading-snug">{blurb}</p>
      <p className="mt-1.5 text-[9px] font-semibold text-[#ff8534]">{price}</p>
    </div>
    <div className="mt-2 space-y-1.5">
      {["Both app stores", "Push & accounts"].map((f) => (
        <div key={f} className="flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1.5 text-[9px] text-gray-200">
          <Check size={10} className="shrink-0 text-[#F2600B]" /> {f}
        </div>
      ))}
    </div>
    <div className="mt-2 flex justify-center rounded-full bg-[#F2600B] py-1.5 text-[9px] font-semibold text-white">
      View offering
    </div>
  </div>
);

/* ── Device frames ────────────────────────────────────────────────── */

const DesktopFrame = ({ children }) => (
  <div className="w-[290px]">
    <div className="rounded-xl border border-white/10 bg-[#141416] p-2 shadow-2xl shadow-black/60 ring-1 ring-white/5">
      <div className="aspect-[16/10] overflow-hidden rounded-md bg-[#0c0705]">{children}</div>
    </div>
    <div className="mx-auto h-4 w-12 bg-gradient-to-b from-[#2a2a2c] to-[#161618]" />
    <div className="mx-auto h-2 w-32 rounded-b-lg bg-gradient-to-b from-[#2a2a2c] to-[#161618]" />
  </div>
);

const TabletFrame = ({ children }) => (
  <div className="w-[290px] rounded-[1.2rem] border border-white/10 bg-gradient-to-b from-[#2b2b2d] to-[#0e0e10] p-2 shadow-2xl shadow-black/60 ring-1 ring-white/10">
    <div className="relative aspect-[4/3] overflow-hidden rounded-[0.7rem] bg-[#0c0705]">
      <span className="absolute left-1/2 top-[3px] z-10 h-1 w-1 -translate-x-1/2 rounded-full bg-[#1b2836]" />
      {children}
    </div>
  </div>
);

const LaptopFrame = ({ children }) => (
  <div className="w-[320px]">
    <div className="mx-auto w-[90%] rounded-t-xl border border-b-0 border-white/10 bg-[#1a1a1c] p-1.5 pt-2">
      <div className="aspect-[16/10] overflow-hidden rounded bg-[#0c0705]">{children}</div>
    </div>
    <div className="relative mx-auto h-2.5 w-full rounded-b-[10px] bg-gradient-to-b from-[#c9ccce] to-[#8f9296] shadow-md shadow-black/40">
      <span className="absolute left-1/2 top-0 h-1 w-1/5 -translate-x-1/2 rounded-b-md bg-[#7d8083]" />
    </div>
  </div>
);

const PhoneFrame = ({ children }) => (
  <div className="w-[170px]">
    <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#1c1c1e] to-[#0a0a0a] p-2 shadow-2xl shadow-black/60">
      <span className="absolute left-1/2 top-2 z-20 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-black ring-2 ring-[#0c0705]" />
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.6rem] bg-[#0c0705]">{children}</div>
    </div>
  </div>
);

const PRODUCTS = {
  websites: { Frame: DesktopFrame, UI: WebsiteUI, tilt: "-rotate-2" },
  webapps: { Frame: TabletFrame, UI: TabletUI, tilt: "rotate-2" },
  saas: { Frame: LaptopFrame, UI: SaasUI, tilt: "-rotate-2" },
  mobile: { Frame: PhoneFrame, UI: PhoneUI, tilt: "rotate-2" },
};

export default function ProductShowcase() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-x-6 gap-y-14 xl:flex-nowrap">
      {PRICING_DATA.categories.map((category, i) => {
        const meta = PRODUCT_CARD_META[category.key] || {};
        const Icon = meta.Icon;
        const start = startingPrice(category);
        const price = start ? `from ${formatGHS(start, PRICING_DATA.currency)}` : "Custom quote";
        const cfg = PRODUCTS[category.key] || PRODUCTS.websites;
        const { Frame, UI, tilt } = cfg;
        const uiProps = { blurb: meta.blurb || category.tagline, price, Icon };

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
                  <Frame>
                    <UI {...uiProps} />
                  </Frame>
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
