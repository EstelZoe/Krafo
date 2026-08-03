// ProductDetail — full page for a single build product (Websites, Web Apps,
// SaaS Platforms, Mobile Apps). Reached via /services/:slug.
//
// Pricing is read from PRICING_DATA (single source of truth); narrative content
// from PRODUCTS (productData.jsx). The two are joined by the category `key`,
// which is the URL slug. Unknown slugs redirect back to /services.
//
// Brand theme: black surface, #F2600B accents (#ff8534 highlights), Proxon
// display headings (.hero-display), framer-motion reveals — consistent with the
// Consultation and Services pages.

import React, { useEffect, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CalendarClock,
  Check,
  Star,
  ShieldCheck,
  KeyRound,
  LifeBuoy,
  Sparkles,
} from "lucide-react";
import Navbar from "../../assets/components/Navbar";
import Footer from "../../assets/components/Footer";
import { PRICING_DATA } from "./pricingData";
import { PRODUCTS, SHARED_PROCESS } from "./productData";
import { formatGHS } from "./quote";

const CALENDLY_URL = "https://calendly.com/krafosystems";

// Build a Calendly prefill URL carrying the product + tier the visitor picked,
// reusing the site-wide booking mechanism (opens in a new tab).
function calendlyFor(productName, tier) {
  const note =
    tier && tier.custom
      ? `Interested in: ${productName} — ${tier.name} (custom quote)`
      : tier
      ? `Interested in: ${productName} — ${tier.name} (${formatGHS(tier.price, PRICING_DATA.currency)})`
      : `Interested in: ${productName}`;
  const params = new URLSearchParams({ a1: note });
  return `${CALENDLY_URL}?${params.toString()}`;
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

// A branded, self-contained "screen" mockup used in the feature deep-dive so we
// don't depend on external screenshots we don't have yet.
function MockPanel({ Icon }) {
  return (
    <div className="relative w-full">
      <div className="rounded-2xl border border-[#F2600B]/15 bg-[#0c0705] p-2 shadow-2xl shadow-black/60">
        <div className="rounded-xl border border-[#F2600B]/10 bg-black/60 overflow-hidden">
          {/* window chrome */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#F2600B]/10">
            <span className="w-3 h-3 rounded-full bg-[#F2600B]/30" />
            <span className="w-3 h-3 rounded-full bg-[#F2600B]/50" />
            <span className="w-3 h-3 rounded-full bg-[#F2600B]/80" />
          </div>
          {/* faux content */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F2600B]/25 bg-[#F2600B]/10 text-[#F2600B]">
                {Icon ? <Icon size={22} /> : <Sparkles size={22} />}
              </div>
              <div className="flex-1">
                <div className="h-2.5 w-1/3 rounded-full bg-[#F2600B]/50" />
                <div className="mt-2 h-2 w-1/2 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {[90, 70, 82, 55].map((w, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#F2600B]/60" />
                  <span className="h-2 rounded-full bg-white/10" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                  <div className="h-1.5 w-2/3 rounded-full bg-[#F2600B]/40" />
                  <div className="mt-2 h-4 w-1/2 rounded bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* glow */}
      <div className="absolute -inset-6 -z-10 rounded-3xl bg-[#F2600B]/5 blur-3xl" />
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();

  const category = useMemo(
    () => PRICING_DATA.categories.find((c) => c.key === slug),
    [slug]
  );
  const content = PRODUCTS[slug];

  useEffect(() => {
    if (content) {
      document.title = `${content.eyebrow} — Krafo Systems`;
    }
    return () => {
      document.title = "Krafo Systems";
    };
  }, [content]);

  // Unknown or unsupported slug → back to the Services page.
  if (!category || !content) {
    return <Navigate to="/services" replace />;
  }

  const { notes, addOns, currency } = PRICING_DATA;
  const Icon = content.Icon;
  const tiers = category.tiers || [];

  // Starting price for the hero chip (lowest numeric tier, else "Custom").
  const numericTiers = tiers.filter((t) => !t.custom);
  const startingLabel = numericTiers.length
    ? `from ${formatGHS(Math.min(...numericTiers.map((t) => t.price)), currency)}`
    : "Custom quote";

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <style>{`.hero-display { font-family: 'Proxon', sans-serif; }`}</style>

      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#F2600B]/10 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,#F2600B18,transparent_60%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#F2600B 1px, transparent 1px), linear-gradient(90deg, #F2600B 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-28 md:pt-32 pb-16 md:pb-20">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#ff8534] transition-colors"
          >
            <ArrowLeft size={16} /> All services
          </Link>

          <motion.div className="mt-6 max-w-3xl" {...fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F2600B]/30 bg-[#F2600B]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#ff8534] uppercase">
              {Icon ? <Icon size={14} className="text-[#F2600B]" /> : null}
              {content.eyebrow}
            </span>
            <h1 className="hero-display mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight">
              {content.title}
            </h1>
            <p className="mt-5 text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl">
              {content.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={calendlyFor(content.eyebrow)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold text-white bg-[#F2600B] hover:bg-[#d94f00] shadow-lg shadow-[#F2600B]/30 hover:shadow-[#F2600B]/50 transition-all duration-300 hover:scale-[1.03] active:scale-95"
              >
                Book a Consultation <CalendarClock size={18} />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-[#F2600B]/60 text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-300"
              >
                See pricing <ArrowRight size={18} />
              </a>
              <span className="text-sm font-semibold text-[#ff8534]">{startingLabel}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OVERVIEW + WHO FOR ───────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-black to-[#0a0503]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <motion.div {...fadeUp}>
            <div className="w-12 h-1 bg-[#F2600B]/50 rounded-full mb-5" />
            <h2 className="hero-display text-2xl md:text-3xl font-bold mb-4">
              Overview
            </h2>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
              {content.overview}
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="lg:pt-16">
            <div className="rounded-2xl border border-[#F2600B]/15 bg-[#111111] p-6">
              <h3 className="hero-display text-lg font-semibold text-white mb-4">
                Who it&apos;s for
              </h3>
              <ul className="space-y-3">
                {content.whoFor.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-gray-300 text-sm">
                    <Check size={18} className="text-[#F2600B] shrink-0 mt-0.5" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING TIERS ────────────────────────────────────────────── */}
      <section id="pricing" className="py-16 md:py-24 bg-black scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <div className="w-12 h-1 bg-[#F2600B] mx-auto mb-4 rounded-full" />
            <h2 className="hero-display text-3xl md:text-4xl font-bold">
              {content.eyebrow} <span className="text-[#F2600B]">Pricing</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mt-3">
              {category.tagline}. {PRICING_DATA.startingPriceNote}
            </p>
          </motion.div>

          <div
            className={`grid gap-5 ${
              tiers.length >= 3
                ? "md:grid-cols-3"
                : "md:grid-cols-2 md:max-w-3xl md:mx-auto"
            }`}
          >
            {tiers.map((tier, i) => {
              const priceLabel = tier.custom
                ? "Custom quote"
                : formatGHS(tier.price, currency);
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative flex flex-col rounded-2xl border p-6 ${
                    tier.best
                      ? "border-[#F2600B]/50 bg-gradient-to-b from-[#F2600B]/10 to-transparent shadow-lg shadow-[#F2600B]/10"
                      : "border-[#F2600B]/15 bg-[#111111]"
                  }`}
                >
                  {tier.best && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-[#F2600B] text-black text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">
                      <Star size={11} className="fill-black" /> BEST VALUE
                    </span>
                  )}
                  <h3 className="hero-display text-xl font-bold text-white">{tier.name}</h3>
                  {tier.bestFor && (
                    <p className="text-gray-500 text-xs italic mt-1">{tier.bestFor}</p>
                  )}
                  <p className="mt-4 text-2xl font-extrabold text-[#F2600B]">{priceLabel}</p>
                  <ul className="mt-5 space-y-2.5 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <Check size={16} className="text-[#F2600B] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={calendlyFor(content.eyebrow, tier)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold transition-all hover:scale-[1.02] ${
                      tier.best
                        ? "bg-[#F2600B] text-white hover:bg-[#d94f00] shadow-lg shadow-[#F2600B]/30"
                        : "border border-[#F2600B]/40 text-white hover:border-[#F2600B] hover:bg-[#F2600B]/10"
                    }`}
                  >
                    {tier.custom ? "Request a quote" : "Get started"} <ArrowRight size={16} />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURE DEEP-DIVE (alternating) ──────────────────────────── */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black via-black to-[#160b02]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div className="text-center mb-14 md:mb-20" {...fadeUp}>
            <div className="w-12 h-1 bg-[#F2600B] mx-auto mb-4 rounded-full" />
            <h2 className="hero-display text-3xl md:text-4xl font-bold">
              What you <span className="text-[#F2600B]">get</span>
            </h2>
          </motion.div>

          <div className="flex flex-col gap-16 md:gap-24">
            {content.highlights.map((block, i) => {
              const BIcon = block.Icon;
              const reversed = i % 2 === 1;
              return (
                <div
                  key={block.title}
                  className="grid grid-cols-1 gap-8 md:gap-16 lg:grid-cols-2 items-center"
                >
                  <motion.div
                    className={`max-w-xl ${reversed ? "lg:order-last" : ""}`}
                    initial={{ opacity: 0, x: reversed ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#F2600B]/20 bg-[#F2600B]/10 text-[#F2600B]">
                      {BIcon ? <BIcon size={26} /> : <Sparkles size={26} />}
                    </div>
                    <h3 className="hero-display mt-5 text-2xl md:text-3xl font-bold text-white">
                      {block.title}
                    </h3>
                    <p className="mt-3 text-gray-300 leading-relaxed md:text-lg">
                      {block.text}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {block.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-gray-300">
                          <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#F2600B]/15 text-[#F2600B] shrink-0">
                            <Check size={13} />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <MockPanel Icon={BIcon} />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ADD-ONS ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-black border-t border-[#F2600B]/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div className="text-center mb-10" {...fadeUp}>
            <h2 className="hero-display text-2xl md:text-3xl font-bold">
              Add-ons — <span className="text-[#F2600B]">mix &amp; match</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mt-3">
              Bolt on extra capabilities to any tier.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {addOns.map((a) => (
              <div
                key={a.id}
                className="rounded-xl border border-[#F2600B]/10 bg-[#111111] p-4 flex flex-col gap-1"
              >
                <span className="text-sm text-gray-300">{a.label}</span>
                <span className="text-[#F2600B] font-bold">{formatGHS(a.price, currency)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOTES: ownership / care / third-party ────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-black to-[#0a0503]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid gap-5 md:grid-cols-3">
          {[
            { Icon: KeyRound, title: "You own everything", text: notes.ownership },
            { Icon: LifeBuoy, title: "Website Care", text: notes.care },
            { Icon: ShieldCheck, title: "Transparent costs", text: notes.thirdParty },
          ].map((n) => (
            <motion.div key={n.title} className="rounded-2xl border border-[#F2600B]/15 bg-[#111111] p-6" {...fadeUp}>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F2600B]/10 text-[#F2600B] border border-[#F2600B]/20">
                <n.Icon size={20} />
              </div>
              <h3 className="hero-display mt-4 text-lg font-semibold text-white">{n.title}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{n.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <div className="w-12 h-1 bg-[#F2600B] mx-auto mb-4 rounded-full" />
            <h2 className="hero-display text-3xl md:text-4xl font-bold">
              How we <span className="text-[#F2600B]">work</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SHARED_PROCESS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-2xl border border-[#F2600B]/15 bg-[#111111] p-6"
              >
                <span className="hero-display absolute top-4 right-5 text-4xl font-extrabold text-[#F2600B]/15">
                  {i + 1}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F2600B]/20 bg-[#F2600B]/10 text-[#F2600B]">
                  <step.Icon size={22} />
                </div>
                <h3 className="hero-display mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK (placeholder) ──────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-black to-[#0a0503] border-t border-[#F2600B]/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div className="text-center mb-10" {...fadeUp}>
            <h2 className="hero-display text-2xl md:text-3xl font-bold">
              Selected <span className="text-[#F2600B]">work</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mt-3">
              We&apos;re curating a showcase of recent projects. In the meantime, we&apos;d be
              glad to walk you through relevant examples on a call.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="group relative overflow-hidden rounded-2xl border border-dashed border-[#F2600B]/20 bg-[#0c0705] p-8 flex flex-col items-center justify-center text-center min-h-[220px]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#F2600B]/20 bg-[#F2600B]/10 text-[#F2600B]">
                  {Icon ? <Icon size={26} /> : <Sparkles size={26} />}
                </div>
                <p className="hero-display mt-4 text-lg font-semibold text-white/90">
                  Case study coming soon
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  A {content.eyebrow.toLowerCase()} project we&apos;re proud of.
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href={calendlyFor(content.eyebrow)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#F2600B] font-semibold hover:text-[#ff8534] transition-colors"
            >
              Ask to see relevant work <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-black">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div className="text-center mb-10" {...fadeUp}>
            <div className="w-12 h-1 bg-[#F2600B] mx-auto mb-4 rounded-full" />
            <h2 className="hero-display text-3xl md:text-4xl font-bold">
              Frequently <span className="text-[#F2600B]">asked</span>
            </h2>
          </motion.div>
          <div className="space-y-3">
            {content.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-[#F2600B]/15 bg-[#111111] p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-white">
                  {faq.q}
                  <span className="text-[#F2600B] transition-transform duration-300 group-open:rotate-45 text-2xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#F2600B]/10 via-black to-black border-t border-[#F2600B]/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="hero-display text-3xl md:text-4xl font-bold mb-3">
            Ready to build your <span className="text-[#F2600B]">{content.eyebrow.toLowerCase()}</span>?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Tell us what you need and we&apos;ll shape the right solution with you — with a
            clear scope, timeline, and price.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={calendlyFor(content.eyebrow)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold text-white bg-[#F2600B] hover:bg-[#d94f00] shadow-lg shadow-[#F2600B]/30 transition-all hover:scale-[1.02]"
            >
              Book a Consultation <CalendarClock size={18} />
            </a>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border border-[#F2600B]/40 hover:border-[#F2600B] text-white font-semibold py-3.5 px-8 rounded-full transition"
            >
              <ArrowLeft size={18} /> All services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
