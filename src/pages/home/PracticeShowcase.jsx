// PracticeShowcase — "We secure it. Then we build on it."
//
// The section is a fork: security is the practice we are licensed for and the
// reason a ministry or a bank calls; the build side follows from it. It used to
// be two equal cards, which made a visitor choose before they had read anything
// and gave each door half a column to argue in.
//
// Now it is one stage. The Krafo mark turns at the centre of a dashed orbit,
// with the active door's capabilities riding on it. Highlighting a capability
// — hover, keyboard focus, or tap — swaps the panel beside it to that
// capability's own words. Let go and the panel returns to the door's overview.
//
// Every line of that copy is read from data the rest of the site already owns:
// the security capabilities come from EXPERTISE, the build ones from the
// pricing and product records. Nothing here is written twice.

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, MousePointerClick } from "lucide-react";
import { EXPERTISE } from "../expertiseData";
import { PRICING_DATA } from "../services/pricingData";
import {
  PRODUCTS,
  PRODUCT_CARD_META,
  SHARED_PROCESS,
} from "../services/productData";
import { formatGHS } from "../services/quote";
import { useAutoCycle } from "../services/useAutoCycle";
import krafoMark from "../../assets/images/krafo-mark-animated.svg";
import secureVideo from "../../assets/videos/web/card-secure.mp4";
import buildVideo from "../../assets/videos/web/card-build.mp4";

const startingPrice = (categoryKey) => {
  const category = PRICING_DATA.categories.find((c) => c.key === categoryKey);
  const numeric = (category?.tiers || []).filter((t) => !t.custom);
  if (!numeric.length) return "Custom quote";
  return `from ${formatGHS(
    Math.min(...numeric.map((t) => t.price)),
    PRICING_DATA.currency
  )}`;
};

const buildPricingClaim = [
  PRICING_DATA.categories.some((c) => c.tiers.some((t) => !t.custom))
    ? "Published starting prices where available"
    : null,
  PRICING_DATA.startingPriceNote,
]
  .filter(Boolean)
  .join("; ");

const handoverClaim = SHARED_PROCESS.find(
  (step) => step.title === "Launch & Hand-over"
)?.text;

// ── The orbits, both read from existing records ───────────────────────────
const BY_SLUG = Object.fromEntries(EXPERTISE.map((e) => [e.slug, e]));

// Four of the twelve expertise areas — the ones that answer "what would you
// actually do for us". Short labels because they ride a 14px orbit chip; the
// full title and summary land in the panel.
const SECURE_ORBIT = [
  ["risk-vulnerability-assessment", "Assessments"],
  ["security-awareness-training", "Training"],
  ["policy-management", "Policy"],
  ["incident-response", "Response"],
]
  .map(([slug, label]) => {
    const entry = BY_SLUG[slug];
    if (!entry) return null;
    return {
      key: slug,
      label,
      Icon: entry.Icon,
      title: entry.title,
      text: entry.summary,
      // The panel reserves room for a list; without these the capability
      // state left a hole where the door's bullets had been.
      bullets: (entry.bullets || []).slice(0, 3),
      to: "/expertise",
    };
  })
  .filter(Boolean);

const BUILD_LABELS = {
  websites: "Websites",
  webapps: "Web apps",
  saas: "SaaS",
  mobile: "Mobile",
};

const BUILD_ORBIT = PRICING_DATA.categories.map((category) => {
  const meta = PRODUCT_CARD_META[category.key] || {};
  return {
    key: category.key,
    label: BUILD_LABELS[category.key] || category.label,
    Icon: meta.Icon,
    title: category.label,
    text:
      PRODUCTS[category.key]?.subtitle || meta.blurb || category.tagline,
    bullets: [],
    to: `/services/${category.key}`,
  };
});

const DOORS = [
  {
    key: "secure",
    eyebrow: "Secure",
    title: "Protect what you have",
    text: "Assessments, monitoring, policy and training from a CSA-licensed provider — practical, human-centred security scaled to your organisation.",
    video: secureVideo,
    points: [
      "Risk and vulnerability assessments",
      "Staff awareness training",
      "Policy, compliance and incident response",
    ],
    cta: "Explore our expertise",
    to: "/expertise",
    foot: "Free 30-minute consultation",
    orbit: SECURE_ORBIT,
  },
  {
    key: "build",
    eyebrow: "Build",
    title: "Start something new",
    text: "Websites, web apps, SaaS platforms and mobile apps — designed with security baked in from day one, and handed over entirely in your name.",
    video: buildVideo,
    points: [buildPricingClaim, handoverClaim].filter(Boolean),
    cta: "See what we build",
    to: "/services",
    foot: startingPrice("websites"),
    orbit: BUILD_ORBIT,
  },
];

// Ring positions in degrees, y measured downward. Spread around the whole
// circle now that the chips are interactive — anything bunched to one side is
// harder to hit and reads as decoration rather than as controls.
const ORBIT_ANGLES = [-90, 0, 90, 180];
const ORBIT_RADIUS = 44; // percent of the stage, matching the dashed ring

export default function PracticeShowcase({
  prefersReducedMotion = false,
  documentVisible = true,
}) {
  // The repository's own cycling hook: it settles after a couple of passes and
  // stops for good the moment a visitor picks something.
  const [index, select] = useAutoCycle(DOORS.length, {
    intervalMs: 7000,
    rounds: 2,
  });
  const door = DOORS[index];

  // Which capability is being highlighted, and whether that highlight is
  // pinned. Hover and focus preview; a tap pins, because touch has no hover
  // and the panel would otherwise flash and vanish.
  const [hovered, setHovered] = useState(null);
  const [pinned, setPinned] = useState(null);
  const active = hovered ?? pinned;
  const capability = active != null ? door.orbit[active] : null;

  const videoRef = useRef(null);

  // Reset the highlight whenever the door changes, so a pinned chip from the
  // previous door cannot leave the panel showing the wrong practice.
  useEffect(() => {
    setHovered(null);
    setPinned(null);
  }, [index]);

  // `autoPlay` only decides what happens at mount, so on its own a tab hidden
  // mid-session would keep the footage playing. Pause and resume explicitly.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!documentVisible || prefersReducedMotion) {
      if (!video.paused) video.pause();
      return;
    }

    video.play()?.catch(() => {
      // Autoplay can be blocked, or the asset can fail to load. The stage still
      // renders and every word of the section stays readable either way.
    });
  }, [documentVisible, prefersReducedMotion, index]);

  return (
    <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
      {/* ── The stage ────────────────────────────────────────────────── */}
      <div className="relative mx-auto aspect-square w-full max-w-[32rem] lg:order-1">
        {/* The ring turns against the mark at the centre, so the two read as
            one mechanism. Motion is dropped entirely for visitors who ask for
            reduced motion — the dashes stay, they simply hold still. */}
        <style>{`
          @keyframes practice-orbit { to { transform: rotate(-360deg); } }
          .practice-ring { transform-origin: 50% 50%; animation: practice-orbit 48s linear infinite; }
          @media (prefers-reduced-motion: reduce) { .practice-ring { animation: none; } }
        `}</style>
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="practice-ring absolute inset-0 h-full w-full"
        >
          <circle
            cx="50"
            cy="50"
            r={ORBIT_RADIUS}
            fill="none"
            stroke="#F2600B"
            strokeOpacity="0.35"
            strokeWidth="0.35"
            strokeDasharray="1.6 2"
            strokeLinecap="round"
          />
        </svg>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[10%] rounded-full bg-[#F2600B]/20 blur-[70px]"
        />

        {/* The disc: the Krafo mark turning over the door's footage. The mark
            carries its own rotation and its own reduced-motion rule inside the
            SVG, so it needs nothing from React to behave. */}
        <div className="absolute inset-[17%] overflow-hidden rounded-full border border-[#F2600B]/25 bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
          <AnimatePresence mode="wait">
            <motion.video
              key={door.key}
              ref={videoRef}
              src={door.video}
              autoPlay={!prefersReducedMotion && documentVisible}
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              onError={(event) => event.currentTarget.pause()}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.15)_30%,rgba(0,0,0,0.92)_100%)]"
          />

          <img
            src={krafoMark}
            alt=""
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 w-[54%] -translate-x-1/2 -translate-y-1/2"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/15"
          />
        </div>

        {/* The capabilities, riding the orbit. Real controls: hover or focus
            previews, tap pins. */}
        {door.orbit.map((item, i) => {
          const angle = (ORBIT_ANGLES[i % ORBIT_ANGLES.length] * Math.PI) / 180;
          const left = 50 + ORBIT_RADIUS * Math.cos(angle);
          const top = 50 + ORBIT_RADIUS * Math.sin(angle);
          const isActive = active === i;
          const Icon = item.Icon;

          return (
            <motion.button
              type="button"
              key={`${door.key}-${item.key}`}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
              style={{ left: `${left}%`, top: `${top}%` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              onClick={() => {
                // Any interaction settles the door cycle, so the ground does
                // not shift while someone is reading.
                select(index);
                setPinned((p) => (p === i ? null : i));
              }}
              aria-pressed={pinned === i}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span className="flex flex-col items-center gap-1.5">
                <span
                  className={`flex items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
                    isActive
                      ? "h-16 w-16 border-[#F2600B] bg-[#F2600B] text-white shadow-[0_0_30px_rgba(242,96,11,0.55)]"
                      : // Lifted off the ground rather than sitting flat on it.
                        // These are the section's navigation now, and on a pure
                        // black field a dark chip with a hairline border reads
                        // as decoration — nothing about it says "press me".
                        "h-12 w-12 border-white/15 bg-white/[0.06] text-[#ff8534] shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:border-[#F2600B]/70 hover:bg-white/[0.12] sm:h-14 sm:w-14"
                  }`}
                >
                  {Icon ? <Icon size={isActive ? 24 : 19} /> : null}
                </span>
                <span
                  className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm transition-colors duration-300 ${
                    isActive
                      ? "bg-[#F2600B]/20 text-white"
                      : "bg-black/70 text-white/70"
                  }`}
                >
                  {item.label}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* ── The argument ─────────────────────────────────────────────── */}
      <div className="lg:order-2">
        <div className="mb-4 h-1 w-12 rounded-full bg-[#F2600B]" />
        <span className="text-sm font-semibold uppercase tracking-wider text-[#ff8534]">
          What We Do
        </span>

        {/* The order of the two clauses is the positioning. Security is the
            practice we're licensed for and the reason a government or a bank
            calls; the build side follows from it. */}
        <h2 className="hero-display mt-3 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
          We secure it.{" "}
          <span className="text-[#F2600B]">Then we build on it.</span>
        </h2>

        {/* Nothing else on the page announces that the orbit is interactive,
            and an affordance nobody finds may as well not exist. The hint
            retires itself once a capability has been highlighted. */}
        <p
          className={`mt-4 flex items-center gap-2 text-xs text-white/45 transition-opacity duration-500 ${
            capability ? "opacity-0" : "opacity-100"
          }`}
        >
          <MousePointerClick size={14} className="text-[#F2600B]" />
          Hover a capability on the ring to see what it involves
        </p>

        {/* One panel, two states: the door's overview, or — while a capability
            is highlighted — that capability's own words. */}
        <div className="mt-6 min-h-[17rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={capability ? `${door.key}-${capability.key}` : door.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center rounded-full border border-[#F2600B]/30 bg-[#F2600B]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff8534]">
                {capability ? door.eyebrow + " · " + capability.label : door.eyebrow}
              </span>

              <h3 className="hero-display mt-3 text-2xl font-bold text-white md:text-3xl">
                {capability ? capability.title : door.title}
              </h3>
              <p className="mt-3 max-w-lg leading-relaxed text-gray-300">
                {capability ? capability.text : door.text}
              </p>

              {(capability ? capability.bullets : door.points).length > 0 && (
                <ul className="mt-4 space-y-2">
                  {(capability ? capability.bullets : door.points).map(
                    (point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-gray-300"
                      >
                        <Check
                          size={15}
                          className="mt-0.5 shrink-0 text-[#F2600B]"
                        />
                        {point}
                      </li>
                    )
                  )}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            to={capability ? capability.to : door.to}
            className="group inline-flex items-center gap-2 rounded-full bg-[#F2600B] px-7 py-3.5 font-bold text-white shadow-lg shadow-[#F2600B]/30 transition-all duration-300 hover:scale-[1.03] hover:bg-[#d94f00]"
          >
            {capability ? `About ${capability.label.toLowerCase()}` : door.cta}
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          {/* Named tabs only. Prev/next arrows were a third control cluster
              doing the same job as two clearly-labelled buttons. */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-1">
              {DOORS.map((d, i) => (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => select(i)}
                  aria-current={i === index}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] ${
                    i === index
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {d.eyebrow}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm font-semibold text-[#ff8534]">{door.foot}</p>
      </div>
    </div>
  );
}
