// Home — the first thing anyone sees, rebuilt in the same system as the
// Consultation, About, Services and Events pages: Proxon display headings
// (.hero-display), the eyebrow trio, black ground with #F2600B accents.
//
// The structural change: the old homepage only ever described the security
// and education side, and linked to /services exactly zero times. Krafo now
// sells two things, so the section under the hero is a fork — build with us,
// or secure what you already have — and both halves get their own section
// further down.
//
// The mission headline is kept as the hook. It's why Krafo exists and it's
// distinctive; the commercial routing sits immediately beneath it rather than
// replacing it.
//
// Prices, expertise areas, courses and blog posts are all read from the
// existing single sources of truth, so nothing here can drift out of step
// with the pages it links to.

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CalendarClock,
  Check,
  GraduationCap,
  Globe,
  Play,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import ThreatMap from "./home/ThreatMap";
import IndustrySelector from "./home/IndustrySelector";
import { INDUSTRY_PROFILES, getIndustryProfile } from "./home/industryProfiles";
import {
  clearIndustryPreference,
  readIndustryPreference,
  writeIndustryPreference,
} from "./home/industryPersonalization";
import PartnershipCarousel from "../assets/components/PartnershipCarousel";
import AnnouncementPopup from "../assets/components/AnnouncementPopup";
import PracticeShowcase from "./home/PracticeShowcase";
import AudienceMosaic from "./home/AudienceMosaic";
import CyberBytesBridge from "./home/CyberBytesBridge";
import BuildJourney from "./home/BuildJourney";
import { PROCESS_NUMERAL_TILE, PROCESS_TILE_OFFSETS } from "./home/processImagery";
import toolkitReportShot from "../assets/images/toolkit/toolkit-report.webp";
import toolkitFormShot from "../assets/images/toolkit/toolkit-form.webp";
import toolkitDashboardShot from "../assets/images/toolkit/toolkit-dashboard.webp";

import { EXPERTISE } from "./expertiseData";
import { PRICING_DATA } from "./services/pricingData";
import { SHARED_PROCESS } from "./services/productData";
import { courses as coursesData } from "../assets/data/courses";
import { certifications } from "../assets/data/certifications";

// Card backgrounds, re-encoded to 960px / 12s / no audio. The originals were
// 2.3 MB and 1.0 MB; these are 468 KB and 120 KB, which is what makes it
// reasonable to autoplay two of them on the first screen after the hero.

const CALENDLY_URL = "https://calendly.com/krafosystems";
// The Krafo film lives on YouTube; youtube-nocookie keeps it privacy-friendly
// (no tracking cookies until the visitor actually plays it). Source:
// https://youtu.be/0ynUhZDA_D4
const FILM_EMBED_URL = "https://www.youtube-nocookie.com/embed/0ynUhZDA_D4";

// Human-friendly "updated N ago" for the live threat-feed caption.
const PATHWAYS = [
  {
    key: "consultation",
    label: "Book a consultation",
    href: CALENDLY_URL,
    external: true,
  },
  {
    key: "build",
    label: "Explore what we build",
    href: "/services",
    external: false,
  },
  {
    key: "assessment",
    label: "Start the free assessment",
    href: "/assessment-toolkit",
    external: false,
  },
];

const pathwayLinkClass =
  "group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border px-5 py-3 text-center text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F2600B] hover:bg-[#F2600B]/10 active:translate-y-0 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto";

const PathwayCtaGroup = ({ onPlay }) => (
  <div
    className="w-full rounded-2xl border border-[#F2600B]/20 bg-black/30 p-4 backdrop-blur-md sm:p-5"
    role="group"
    aria-labelledby="homepage-pathways-label"
  >
    <p
      id="homepage-pathways-label"
      className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff8534]"
    >
      Choose your next step
    </p>
    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {PATHWAYS.map((pathway) => {
        const className = `${pathwayLinkClass} ${
          pathway.key === "consultation"
            ? "border-[#F2600B] bg-[#F2600B] text-white shadow-lg shadow-[#F2600B]/20 hover:bg-[#d94f00]"
            : "border-white/20 bg-white/5 text-white"
        }`;
        const content = (
          <>
            {pathway.label}
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </>
        );

        return pathway.external ? (
          <a
            key={pathway.key}
            href={pathway.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${pathway.label} (opens in a new tab)`}
            className={className}
          >
            {content}
          </a>
        ) : (
          <Link
            key={pathway.key}
            to={pathway.href}
            aria-label={pathway.label}
            className={className}
          >
            {content}
          </Link>
        );
      })}

      {onPlay && (
        <button
          type="button"
          onClick={onPlay}
          aria-label="Play the Krafo Systems film"
          className={`${pathwayLinkClass} border-white/20 bg-white/5 text-white`}
        >
          Watch the film
          <Play size={15} aria-hidden="true" className="fill-current" />
        </button>
      )}
    </div>
  </div>
);

// ── Shared section eyebrow (matches About / Consultation / Events) ─────
const SectionEyebrow = ({ label, centered = true }) => (
  <>
    <div
      className={`mb-4 h-1 w-12 rounded-full bg-[#F2600B] ${centered ? "mx-auto" : ""}`}
    />
    <span className="text-sm font-semibold uppercase tracking-wider text-[#ff8534]">
      {label}
    </span>
  </>
);

// What a visitor actually walks away with. The counts are the real ones,
// verified against assessmentQuestions.js: 42 questions over seven sections,
// of which 35 are scored across the six NIST CSF 2.0 functions (the seventh
// section is an unscored organisation profile). Keep these in step with that
// file and with AssessmentStart.jsx if the question set ever changes.
const ASSESSMENT_OUTCOMES = [
  "An overall risk score, plus a rating for each of the six NIST functions",
  "Your vulnerabilities broken down by domain, ranked",
  "Control coverage — what you already have against what is missing",
  "A report you can put in front of your board",
];

// The three toolkit views, rotated through the three frames. Order matters:
// the deck is offset per frame so no two frames ever show the same view, and
// the whole set advances together.
const TOOLKIT_SHOTS = [
  {
    src: toolkitReportShot,
    alt: "An example risk report showing an overall score and a rating for each NIST function",
  },
  {
    src: toolkitFormShot,
    alt: "A step of the assessment questionnaire",
  },
  {
    src: toolkitDashboardShot,
    alt: "The assessment dashboard, listing completed and in-progress assessments",
  },
];

// Browser-chrome frame for the toolkit screenshots. Purely decorative
// dressing around a real screenshot, so the chrome itself is aria-hidden and
// the alt text on the image carries the meaning.
//
// The screen is a fixed-ratio window and the views slide through it top to
// bottom — the outgoing one leaves through the bottom as the incoming one
// arrives from above, like a slide carousel behind glass. The frame itself
// never moves, so the tilt and position of the deck are untouched.
const ToolkitShot = ({ shot, className = "", glow = false, animate = true }) => (
  <figure
    className={`overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] ${
      glow ? "ring-1 ring-[#F2600B]/25" : ""
    } ${className}`}
  >
    <div
      aria-hidden="true"
      className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3 py-2"
    >
      <span className="h-2 w-2 rounded-full bg-white/20" />
      <span className="h-2 w-2 rounded-full bg-white/20" />
      <span className="h-2 w-2 rounded-full bg-white/20" />
    </div>
    <div className="relative aspect-[16/9] overflow-hidden bg-[#0d0d0d]">
      {animate ? (
        <AnimatePresence initial={false}>
          <motion.img
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 block h-full w-full object-cover object-top"
          />
        </AnimatePresence>
      ) : (
        <img
          src={shot.src}
          alt={shot.alt}
          loading="lazy"
          className="absolute inset-0 block h-full w-full object-cover object-top"
        />
      )}
    </div>
  </figure>
);

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -60px 0px" },
  transition: { duration: 0.55 },
};

// ── Credential rail ───────────────────────────────────────────────────
// The badges from the Consultation page, as a pill that rides in the pocket
// carved out of the hero's bottom-right edge. The list is rendered twice, so
// translating the track by half its width loops with no visible seam.
const CertRail = () => (
  <div className="group relative overflow-hidden rounded-full border border-white/15 bg-white/[0.07] shadow-2xl shadow-black/60 backdrop-blur-xl">
    <div className="flex items-center gap-3 py-3 pl-5 pr-2">
      <div className="flex shrink-0 items-center gap-2">
        <Award size={15} className="text-[#F2600B]" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Certified
        </span>
      </div>
      <span className="h-8 w-px shrink-0 bg-white/15" />
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(90deg,#000_0,#000_80%,transparent)]">
        <div className="flex w-max animate-hero-cert-scroll group-hover:[animation-play-state:paused]">
          {[...certifications, ...certifications].map((cert, i) => (
            <div
              key={i}
              className="mx-2.5 flex h-11 w-14 shrink-0 items-center justify-center"
            >
              <img
                src={cert.src}
                alt={cert.alt}
                title={cert.alt}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Cheapest real tier per product, so the homepage can never quote a price the
// product page doesn't honour.
const handoverClaim = SHARED_PROCESS.find(
  (step) => step.title === "Launch & Hand-over"
)?.text;
const buildPricingClaim = [
  PRICING_DATA.categories.some((category) =>
    category.tiers.some((tier) => !tier.custom)
  )
    ? "Published starting prices where available"
    : null,
  PRICING_DATA.startingPriceNote,
]
  .filter(Boolean)
  .join("; ");

export default function Home() {
  const [playerOpen, setPlayerOpen] = useState(false);
  const [selectedProfileKey, setSelectedProfileKey] = useState(null);
  const [localPersonalizationEnabled, setLocalPersonalizationEnabled] = useState(false);
  const [restoredProfileKey, setRestoredProfileKey] = useState(null);
  const [storageAvailable, setStorageAvailable] = useState(null);
  const [signatureScrollCompleted, setSignatureScrollCompleted] = useState(false);
  const [signatureScrollActive, setSignatureScrollActive] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [threatMeta, setThreatMeta] = useState(null);
  const signatureSentinelRef = useRef(null);
  const signatureCompletedRef = useRef(false);

  useEffect(() => {
    const mediaQuery =
      typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    const updateMotionPreference = () => {
      setPrefersReducedMotion(Boolean(mediaQuery?.matches));
    };
    const updateDocumentVisibility = () => {
      setDocumentVisible(document.visibilityState !== "hidden");
    };

    updateMotionPreference();
    updateDocumentVisibility();
    document.addEventListener("visibilitychange", updateDocumentVisibility);
    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener("change", updateMotionPreference);
    } else if (mediaQuery?.addListener) {
      mediaQuery.addListener(updateMotionPreference);
    }

    return () => {
      document.removeEventListener("visibilitychange", updateDocumentVisibility);
      if (mediaQuery?.removeEventListener) {
        mediaQuery.removeEventListener("change", updateMotionPreference);
      } else if (mediaQuery?.removeListener) {
        mediaQuery.removeListener(updateMotionPreference);
      }
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) setSignatureScrollActive(false);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const sentinel = signatureSentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === "undefined") return undefined;

    let transitionTimer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || signatureCompletedRef.current) return;

        signatureCompletedRef.current = true;
        setSignatureScrollCompleted(true);
        observer.disconnect();

        if (prefersReducedMotion || !documentVisible) return;

        setSignatureScrollActive(true);
        transitionTimer = window.setTimeout(() => {
          setSignatureScrollActive(false);
        }, 900);
      },
      { threshold: 0, rootMargin: "0px 0px -18% 0px" }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (transitionTimer) window.clearTimeout(transitionTimer);
    };
  }, [documentVisible, prefersReducedMotion]);

  useEffect(() => {
    const preference = readIndustryPreference();
    const restoredProfile = preference?.enabled
      ? getIndustryProfile(preference.profileKey)
      : null;

    if (!restoredProfile) return;

    setSelectedProfileKey(restoredProfile.key);
    setRestoredProfileKey(restoredProfile.key);
    setLocalPersonalizationEnabled(true);
    setStorageAvailable(true);
  }, []);

  const handleProfileSelect = (profileKey) => {
    if (!getIndustryProfile(profileKey)) return;

    setSelectedProfileKey(profileKey);
    setRestoredProfileKey(null);

    if (!localPersonalizationEnabled) return;

    writeIndustryPreference(profileKey);
    const storedPreference = readIndustryPreference();
    // Boolean(): the optional chain yields `undefined` when nothing was
    // stored, and `undefined` is not `false` — without coercing, a rejected
    // write is indistinguishable from "not asked yet".
    const persisted = Boolean(
      storedPreference?.enabled && storedPreference.profileKey === profileKey
    );

    setStorageAvailable(persisted);
    if (!persisted) setLocalPersonalizationEnabled(false);
  };

  const handleRememberProfile = () => {
    if (!selectedProfileKey) return;

    writeIndustryPreference(selectedProfileKey);
    const storedPreference = readIndustryPreference();
    const persisted = Boolean(
      storedPreference?.enabled &&
        storedPreference.profileKey === selectedProfileKey
    );

    setStorageAvailable(persisted);
    setLocalPersonalizationEnabled(persisted);
    if (persisted) setRestoredProfileKey(null);
  };

  const handleDisablePersonalization = () => {
    clearIndustryPreference();
    setLocalPersonalizationEnabled(false);
    setRestoredProfileKey(null);
  };

  // Rotate the toolkit deck. Paused for reduced-motion visitors and while the
  // tab is hidden, matching how the rest of this page treats ambient motion —
  // there is no reason to burn frames on a section nobody is looking at.
  const [toolkitShotIndex, setToolkitShotIndex] = useState(0);
  const toolkitShotsRotate = !prefersReducedMotion && documentVisible;

  useEffect(() => {
    if (!toolkitShotsRotate) return undefined;
    const timer = setInterval(
      () => setToolkitShotIndex((i) => (i + 1) % TOOLKIT_SHOTS.length),
      3600
    );
    return () => clearInterval(timer);
  }, [toolkitShotsRotate]);

  const selectedProfile = getIndustryProfile(selectedProfileKey);

  return (
    <div className="homepage-shell min-h-screen overflow-x-hidden bg-black text-white selection:bg-[#F2600B]/40">
      <style>{`
        .hero-display { font-family: 'Proxon', sans-serif; }
        .text-balance { text-wrap: balance; }
        /* Oversized outlined numerals for the "How We Work" process steps —
           hollow orange strokes, filling solid on hover for a little life. */
        .process-numeral {
          font-family: 'Proxon', sans-serif;
          font-weight: 800;
          line-height: 0.8;
          color: transparent;
          -webkit-text-stroke: 2px rgba(242, 96, 11, 0.55);
          /* The step photo shows through the glyph itself. The transparent
             colour above is what lets the clipped background be seen; if the
             image ever fails to load the numeral falls back to its orange
             outline rather than disappearing. */
          /* The Krafo mark, tiled, shows through the glyph. A faint orange
             wash sits underneath it so the numeral still reads as a numeral
             in the gaps between marks rather than breaking into loose
             shapes. Note this is a background layer, not a filter — a filter
             would desaturate the orange stroke along with the fill. */
          background-image: url(${PROCESS_NUMERAL_TILE}),
            linear-gradient(rgba(242, 96, 11, 0.18), rgba(242, 96, 11, 0.18));
          background-position: var(--tile-offset, 0px 0px), center;
          background-size: 56px 56px, cover;
          background-repeat: repeat, no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          /* Draw the stroke behind the fill so the outline doesn't eat into
             the pattern along every edge. */
          paint-order: stroke fill;
          transition: -webkit-text-stroke-color 400ms ease, background-size 500ms ease;
        }
        /* Hover zooms the pattern a little and brightens the outline, so the
           row you're pointing at lifts without the layout shifting. */
        .group:hover .process-numeral {
          -webkit-text-stroke-color: rgba(242, 96, 11, 0.95);
          background-size: 68px 68px, cover;
        }
        @media (prefers-reduced-motion: reduce) {
          .process-numeral { transition: none; }
        }
        .glow-text {
          text-shadow: 0 0 80px rgba(242,96,11,0.15), 0 0 160px rgba(242,96,11,0.05);
        }
        .homepage-shell :is(a, button):focus-visible {
          outline: 3px solid #ff8534;
          outline-offset: 3px;
        }
        /* Hero credential rail — the list is rendered twice, so translating
           half the track's width loops with no visible seam. */
        @keyframes hero-cert-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-hero-cert-scroll { animation: hero-cert-scroll 26s linear infinite; }
        .signature-bridge {
          position: relative;
          z-index: 10;
          height: 0;
          pointer-events: none;
        }
        .signature-bridge::after {
          content: "";
          position: absolute;
          top: -1px;
          left: 10%;
          right: 10%;
          height: 2px;
          transform: scaleX(0.2);
          transform-origin: center;
          background: linear-gradient(90deg, transparent, #f2600b, transparent);
          opacity: 0;
        }
        .signature-bridge[data-signature-state="active"]::after {
          opacity: 0.85;
          animation: signature-bridge-sweep 900ms ease-out both;
        }
        .signature-bridge[data-signature-state="complete"]::after {
          transform: scaleX(1);
          opacity: 0.3;
          transition: opacity 300ms ease-out;
        }
        .signature-pathway {
          transition: box-shadow 900ms ease-out;
        }
        .signature-pathway[data-signature-state="active"] {
          box-shadow: inset 0 60px 140px -60px rgba(242, 96, 11, 0.22);
        }
        .signature-pathway[data-signature-state="complete"] {
          box-shadow: inset 0 46px 120px -60px rgba(242, 96, 11, 0.1);
        }
        @keyframes signature-bridge-sweep {
          from { transform: scaleX(0.2); opacity: 0; }
          35% { opacity: 0.85; }
          to { transform: scaleX(1); opacity: 0.3; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-hero-cert-scroll { animation: none; }
          .signature-bridge::after,
          .signature-pathway { animation: none; transition: none; }
        }
      `}</style>

      <Navbar />
      <AnnouncementPopup />

      {/* ══════════════════════════════════════════════════════════════
         HERO — the mission, kept as the hook
      ══════════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="homepage-heading"
        className="relative isolate min-h-[92vh] w-full overflow-x-hidden md:min-h-screen"
      >
        {/* Illustrative threat-map backdrop (not live telemetry) */}
        <div aria-hidden="true" className="absolute inset-0 bg-black">
          <ThreatMap onMeta={setThreatMeta} />
        </div>
        {/* Legibility wash — strong behind the copy (left), clears well before the globe (right) */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black from-5% via-black/45 via-40% to-transparent to-70%" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_40%,#F2600B18,transparent_60%)]" />

        <div className="relative z-10 mx-auto flex min-h-[92vh] w-full max-w-7xl items-center px-6 pt-28 pb-24 md:min-h-screen md:px-8 lg:px-12">
          <motion.div
            className="w-full max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              <div className="absolute -left-6 bottom-1 top-1 hidden w-1 bg-[#F2600B] opacity-40 md:block" />
              <span className="text-sm font-semibold uppercase tracking-wider text-[#ff8534]">
                Krafo Systems
              </span>
              <h1
                id="homepage-heading"
                className="hero-display glow-text mt-3 text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Protecting Africa
                <br />
                <span className="text-[#F2600B]">Through Cyber Literacy</span>
              </h1>
            </div>

            <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-gray-300 md:text-lg">
              Empowering the next generation with the knowledge and skills to
              secure Africa&apos;s digital future — and building the software
              that future runs on.
              {selectedProfile && (
                <span className="mt-3 block text-base text-white/80 md:text-lg">
                  For {selectedProfile.label}: {selectedProfile.selectorText}
                </span>
              )}
            </p>

            <div className="mt-6 max-w-2xl">
              <IndustrySelector
                selectedProfileKey={selectedProfileKey}
                onSelect={handleProfileSelect}
              />
              {selectedProfileKey && (
                <div
                  className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/50"
                  aria-live="polite"
                >
                  {/* A selection carried over from a previous visit has to say
                      so. Otherwise the page appears to already know the
                      visitor's industry with no explanation, which reads as
                      tracking rather than as the local preference it is. */}
                  {restoredProfileKey === selectedProfileKey && (
                    <span className="inline-flex items-center gap-1.5 text-white/60">
                      <Check size={12} className="text-[#F2600B]" />
                      Restored from your last visit
                    </span>
                  )}

                  {!localPersonalizationEnabled ? (
                    <button
                      type="button"
                      onClick={handleRememberProfile}
                      className="font-semibold text-[#ff8534] underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534]"
                    >
                      Remember on this device
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleDisablePersonalization}
                      className="hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534]"
                    >
                      Remembered · forget
                    </button>
                  )}

                  {/* Browser storage can be unavailable — a private window, a
                      hardened browser, storage disabled. Without this the
                      "Remember" button simply reverts and the visitor is left
                      thinking their click did nothing. The selection still
                      holds for the current visit, which is what we say. */}
                  {storageAvailable === false && (
                    <span className="text-white/60">
                      Couldn&apos;t save on this device — your choice still
                      applies for this visit.
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* The globe is a simulation, and the caption says so. The pulsing
                dot stays because the arcs really are animating — it signals
                motion on screen, not a live data connection. */}
            <p className="mt-4 flex items-center gap-2 text-[11px] text-white/40">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F2600B] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F2600B]" />
              </span>
              Simulating cyber attacks across the globe
              {threatMeta?.count ? ` · ${threatMeta.count} routes` : ""}
              {" · illustration, not live data"}
            </p>

            <div className="mt-8">
              <PathwayCtaGroup onPlay={() => setPlayerOpen(true)} />
            </div>

            {/* Trust strip — the same four facts used across the site */}
            <div
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-400"
              role="group"
              aria-label="Krafo credentials"
            >
              <span className="flex items-center gap-1.5">
                <Award size={14} aria-hidden="true" className="text-[#F2600B]" /> CSA Licensed
              </span>
              <span aria-hidden="true" className="h-4 w-px bg-white/15" />
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} aria-hidden="true" className="text-[#F2600B]" /> DPC Registered
              </span>
              <span aria-hidden="true" className="h-4 w-px bg-white/15" />
              <span className="flex items-center gap-1.5">
                <Globe size={14} aria-hidden="true" className="text-[#F2600B]" /> Based in Ghana
              </span>
              <span aria-hidden="true" className="h-4 w-px bg-white/15" />
              <span className="flex items-center gap-1.5">
                <CalendarClock size={14} aria-hidden="true" className="text-[#F2600B]" /> Est. 2022
              </span>
            </div>

            {/* Below lg there's no room to carve a pocket into the edge, so the
               rail just sits in the flow under the trust strip. */}
            <div className="mt-10 max-w-md lg:hidden">
              <CertRail />
            </div>
          </motion.div>
        </div>

        {/* ── Credential pocket ────────────────────────────────────────
           The hero's bottom edge detours around the rail: a ring of page
           black between the video and the pill, with the two radial-gradient
           fillets curving the straight edge into the pocket's sides. The
           fillets are gradients rather than shapes so the video shows
           through the transparent quarter-disc. */}
        <motion.div
          className="absolute bottom-0 right-6 z-20 hidden lg:block lg:right-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-full h-8 w-8"
            style={{
              background:
                "radial-gradient(circle 32px at 0 0, transparent 31.5px, #0a0503 32.5px)",
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-full h-8 w-8"
            style={{
              background:
                "radial-gradient(circle 32px at 100% 0, transparent 31.5px, #0a0503 32.5px)",
            }}
          />

          {/* p-3 is the gap; 34px pill radius + 12px gap = the 46px pocket
             radius, so the ring around the rail stays an even width. */}
          <div className="rounded-t-[46px] bg-black p-3">
            <div className="w-[340px] xl:w-[420px]">
              <CertRail />
            </div>
          </div>
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">
            Scroll
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-[#F2600B]/60 to-transparent" />
          <div
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full bg-[#F2600B]/40 ${
              prefersReducedMotion ? "" : "animate-bounce"
            }`}
          />
        </motion.div>
      </section>

      <div ref={signatureSentinelRef} className="h-px w-full" aria-hidden="true" />
      <div
        className="signature-bridge"
        data-signature-state={
          signatureScrollActive
            ? "active"
            : signatureScrollCompleted
              ? "complete"
              : "idle"
        }
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════════════════
         HOW WE PROTECT — leads the pair. It is the licensed practice, and
         the reason a government or a bank picks up the phone.
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_15%,#F2600B0e,transparent_58%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div className="mb-12 text-center" {...fadeUp}>
            <SectionEyebrow label="How We Protect" />
            <h2 className="hero-display mt-3 text-3xl font-extrabold md:text-4xl">
              A CSA-licensed <span className="text-[#F2600B]">security practice</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-balance text-gray-400">
              The disciplines behind every engagement — pick the one that keeps
              you up at night.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
            {EXPERTISE.slice(0, 8).map((item, i) => {
              const ExpIcon = item.Icon;
              return (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
                >
                  <Link
                    to={`/expertise#${item.slug}`}
                    className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-[#F2600B]/10 bg-[#111111] p-5 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-[#F2600B]/40"
                  >
                    <img
                      src={item.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-30 transition-opacity duration-500 group-hover:opacity-50"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-black/80 transition-colors duration-500 group-hover:bg-black/70" />
                    <div className="relative flex flex-col items-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F2600B]/25 bg-[#F2600B]/10 text-[#F2600B]">
                        <ExpIcon size={22} />
                      </span>
                      <h3 className="hero-display mt-4 text-sm font-semibold leading-tight text-white transition-colors group-hover:text-[#F2600B] md:text-base">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div className="mt-10 text-center" {...fadeUp}>
            <Link
              to="/expertise"
              className="group inline-flex items-center gap-2 rounded-full border border-[#F2600B]/30 px-8 py-3 font-semibold text-white transition-all duration-300 hover:border-[#F2600B] hover:bg-[#F2600B]/10"
            >
              Explore full expertise
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         THE FORK — two businesses, two doors
      ══════════════════════════════════════════════════════════════ */}
      <section
        data-signature-pathway="true"
        data-signature-state={
          signatureScrollActive
            ? "active"
            : signatureScrollCompleted
              ? "complete"
              : "idle"
        }
        className="signature-pathway relative overflow-hidden py-20 md:py-24"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,#F2600B0b,transparent_62%)]"
        />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <PracticeShowcase
            prefersReducedMotion={prefersReducedMotion}
            documentVisible={documentVisible}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         WHAT WE BUILD — follows from the security practice above
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_82%_20%,#F2600B0d,transparent_58%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div className="mb-12 text-center" {...fadeUp}>
            <SectionEyebrow label="What We Build" />
            <h2 className="hero-display mt-3 text-3xl font-extrabold md:text-4xl">
              Software with security <span className="text-[#F2600B]">built in</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-balance text-gray-400">
              {buildPricingClaim}. {handoverClaim}
            </p>
          </motion.div>

          <BuildJourney />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         HOW WE WORK — the delivery process, as oversized numbered steps
         (layout inspired by the reference: big numerals alternating with
         copy, a hairline between each). Data is the shared 4-step process.
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_85%,#F2600B0b,transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <motion.div className="mb-12 text-center" {...fadeUp}>
            <SectionEyebrow label="How We Work" />
            <h2 className="hero-display mt-3 text-3xl font-extrabold md:text-4xl">
              From first call to <span className="text-[#F2600B]">hand-over</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-balance text-gray-400">
              A clear, four-step path on every engagement — no mystery, no
              surprise invoices, and everything handed over in your name.
            </p>
          </motion.div>

          <div>
            {SHARED_PROCESS.map((step, i) => {
              const StepIcon = step.Icon;
              const flip = i % 2 === 1;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                  transition={{ duration: 0.5 }}
                  className="group grid items-center gap-6 border-t border-white/10 py-10 last:border-b md:grid-cols-2 md:gap-12"
                >
                  {/* Oversized numeral */}
                  <div className={`flex justify-center ${flip ? "md:order-2" : ""}`}>
                    <span
                      className="process-numeral text-[7rem] leading-none md:text-[11rem]"
                      style={{
                        "--tile-offset": PROCESS_TILE_OFFSETS[i],
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Step copy */}
                  <div className={flip ? "md:order-1" : ""}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F2600B]/25 bg-[#F2600B]/10 text-[#F2600B]">
                      <StepIcon size={22} />
                    </span>
                    <h3 className="hero-display mt-4 text-2xl font-bold text-white md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-md text-balance leading-relaxed text-gray-400">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         FREE ASSESSMENT — the toolkit, shown rather than described.
         This is the site's main conversion point: the two things a visitor
         can do here are take the test and book a consultation, so both are
         given equal weight and nothing else competes with them.
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,#F2600B14,transparent_62%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#F2600B]/10 blur-[120px]"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
            {/* ── The pitch ───────────────────────────────────────────── */}
            <motion.div {...fadeUp}>
              <SectionEyebrow label="Free Cyber Assessment" centered={false} />

              <h2 className="hero-display mt-3 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
                How exposed are you,{" "}
                <span className="text-[#F2600B]">really?</span>
              </h2>

              <p className="mt-4 max-w-xl text-balance text-lg leading-relaxed text-gray-300">
                Most organisations only find out after something breaks.
                Forty-two questions, about ten minutes, and you get a scored
                picture of where you actually stand — in plain language, not
                jargon.
              </p>

              <ul className="mt-8 space-y-3.5">
                {ASSESSMENT_OUTCOMES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F2600B]/15 text-[#F2600B]">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className="text-balance text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Both actions, side by side — taking the test and talking to
                  someone are equally valid next steps depending on how ready
                  the visitor already is. */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/assessment-toolkit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#F2600B] px-7 py-4 font-bold text-white shadow-lg shadow-[#F2600B]/30 transition-all duration-300 hover:scale-[1.03] hover:bg-[#d94f00]"
                >
                  Take the free assessment
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>

                <Link
                  to="/consultation"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 font-semibold text-gray-200 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-[#F2600B]/50 hover:bg-white/10 hover:text-white"
                >
                  <CalendarClock size={18} />
                  Book a consultation
                </Link>
              </div>

              <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
                <ShieldCheck size={15} className="text-[#F2600B]/70" />
                Free to take
                <span aria-hidden="true" className="text-gray-700">&bull;</span>
                Built on NIST CSF 2.0
                <span aria-hidden="true" className="text-gray-700">&bull;</span>
                No sales call to see your score
                <span aria-hidden="true" className="text-gray-700">&bull;</span>
                Your data stays yours
              </p>
            </motion.div>

            {/* ── The product itself ──────────────────────────────────── */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              {/* Stacked deck: the report leads because the score is the
                  payoff; the dashboard and a question step sit behind it to
                  show there is a real product here, not just a form. */}
              <div className="relative mx-auto w-full max-w-xl pb-16 pt-10">
                <ToolkitShot
                  shot={TOOLKIT_SHOTS[(toolkitShotIndex + 2) % TOOLKIT_SHOTS.length]}
                  animate={toolkitShotsRotate}
                  className="absolute right-0 top-0 hidden w-[74%] translate-x-5 rotate-[3deg] opacity-45 sm:block"
                />
                <ToolkitShot
                  shot={TOOLKIT_SHOTS[(toolkitShotIndex + 1) % TOOLKIT_SHOTS.length]}
                  animate={toolkitShotsRotate}
                  className="absolute bottom-2 left-0 hidden w-[58%] -translate-x-6 -rotate-[5deg] opacity-70 sm:block"
                />
                <ToolkitShot
                  shot={TOOLKIT_SHOTS[toolkitShotIndex]}
                  animate={toolkitShotsRotate}
                  className="relative z-10 w-full shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)]"
                  glow
                />
              </div>

              {/* The screenshots come from a test account. Label them, in the
                  same spirit as the threat map's illustrative disclosure — a
                  sample score must never read as a real client result. */}
              <p className="relative z-10 mt-2 text-center text-xs text-gray-600">
                Illustrative views from a sample assessment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         LEARN — courses and youth
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_18%,#F2600B0c,transparent_58%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div className="mb-12 text-center" {...fadeUp}>
            <SectionEyebrow label="Learn With Us" />
            <h2 className="hero-display mt-3 text-3xl font-extrabold md:text-4xl">
              Where the <span className="text-[#F2600B]">literacy</span> comes from
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-balance text-gray-400">
              The programmes behind the mission — practical, hands-on training
              for professionals building a career in security.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
            {coursesData.slice(0, 2).map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={`/courses/${course.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#F2600B]/15 bg-[#111111] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#F2600B]/50"
                >
                  <div className="h-40 shrink-0 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="flex w-fit items-center gap-1.5 rounded-full border border-[#F2600B]/30 bg-[#F2600B]/10 px-3 py-1 text-[11px] font-semibold text-[#ff8534]">
                      <GraduationCap size={12} /> Course
                    </span>
                    <h3 className="hero-display mt-3 text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#F2600B]">
                      {course.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400 line-clamp-3">
                      {course.description}
                    </p>
                    <p className="mt-5 border-t border-white/10 pt-4 text-sm font-semibold text-[#ff8534]">
                      {course.price}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}

          </div>

          <motion.div className="mt-10 text-center" {...fadeUp}>
            <Link
              to="/services#training"
              className="group inline-flex items-center gap-2 rounded-full border border-[#F2600B]/30 px-8 py-3 font-semibold text-white transition-all duration-300 hover:border-[#F2600B] hover:bg-[#F2600B]/10"
            >
              See all training
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         CYBERBYTES — the children's platform. Placed straight after the
         training section because that is where the thought naturally leads:
         literacy has to start earlier than a professional course.
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,#F2600B0d,transparent_58%)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <CyberBytesBridge />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         PROOF — the people we work with
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_20%,#F2600B0b,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <AudienceMosaic />

          {/* The partners themselves, below the segments they sit in */}
          <motion.div className="mt-14" {...fadeUp}>
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Trusted by partners across the ecosystem
            </p>
            <PartnershipCarousel />
          </motion.div>
        </div>
      </section>

      {/* Insights/blog section removed — blog is de-emphasised and hidden from
          the nav, so the homepage no longer routes visitors into it. */}

      {/* ══════════════════════════════════════════════════════════════
         CLOSING CTA
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#F2600B12,transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="hero-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Let&apos;s <span className="text-[#F2600B]">build it</span> — and{" "}
              <span className="text-[#F2600B]">secure it.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-gray-400 md:text-lg">
              Whether you&apos;re launching something new or protecting what
              you&apos;ve already built, it starts with one conversation.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#F2600B] px-8 py-3.5 font-bold text-white shadow-lg shadow-[#F2600B]/30 transition-all duration-300 hover:scale-[1.02] hover:bg-[#d94f00]"
              >
                Book a Consultation
                <CalendarClock size={18} />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:border-[#F2600B]/60 hover:text-[#ff8534]"
              >
                Get in touch
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-wider text-gray-500">
              <span>CSA-Licensed</span>
              <span className="text-[#F2600B]">·</span>
              <span>DPC-Registered</span>
              <span className="text-[#F2600B]">·</span>
              <span>Based in Ghana</span>
              <span className="text-[#F2600B]">·</span>
              <span>Est. 2022</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* ── Video modal ─────────────────────────────────────────────── */}
      {playerOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setPlayerOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Krafo Systems film"
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-[#F2600B]/25 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPlayerOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:border-[#F2600B] hover:bg-[#F2600B]"
            >
              <X size={18} />
            </button>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`${FILM_EMBED_URL}?rel=0&modestbranding=1&playsinline=1${
                  !prefersReducedMotion && documentVisible ? "&autoplay=1" : ""
                }`}
                title="Krafo Systems film"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
