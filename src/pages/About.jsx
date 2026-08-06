import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
// import Krafoimage from "../assets/images/KRAFO ORIGINAL MARKAsset 73@2x.png";
import Aml from "../assets/images/aml.jpg";
import Ks from "../assets/images/ks.jpg";
// import Sl from "../assets/images/studentlearning.png";
import Ms from "../assets/images/ms.jpg";
import Cl from "../assets/images/cl.jpg";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, GraduationCapIcon, Lightbulb, FileText, Lock, Home, ShieldCheck, Globe, Building2, Briefcase, FactoryIcon, ArrowUpRight, ArrowRight, Check, Linkedin, ChevronDown, Users, Layers, Sparkles, Code, Cloud, Compass, PenTool, LifeBuoy, Rocket, HeartHandshake } from "lucide-react";
import { image } from "framer-motion/client";
import { HashLink } from "react-router-hash-link";
import KomlaPic from "../assets/images/mr.komla.png";
import AmiPic from "../assets/images/mrs.ami.png";
import WorldPresenceMap from "./WorldPresenceMap";
import KrafoMark from "../assets/images/krafo-mark-animated.svg";
import vidSME from "../assets/videos/managed services.mp4";
import vidStartup from "../assets/videos/software development.mp4";
import vidInstitution from "../assets/videos/governance.mp4";
import vidNGO from "../assets/videos/training and capacity building.mp4";

const journeyData = [
  {
    year: "2020",
    description: "Founded with a vision to democratize cybersecurity education",
  },
  {
    year: "2022",
    description: "Launched comprehensive training programs for enterprises",
  },
  {
    year: "2025",
    description: "Expanding globally with innovative security solutions",
  },
];

const missionImages = [
  {
    src: Ks,
    alt: "Workshop",
    className: "md:col-start-4 md:col-span-2",
    duration: 3,
  },
  {
    src: Cl,
    alt: "Collaboration",
    className: "md:col-start-6 md:row-span-2",
    duration: 3.5,
  },
  {
    src: Ms,
    alt: "Mission",
    className: "md:col-start-4 md:row-start-2",
    duration: 4,
  },
  { src: Aml, alt: "Awareness", className: "md:col-start-5 md:row-start-2", duration: 3.2 },
];

// Co-founder card: a full-bleed photo with the name/role in a frosted-glass
// panel overlaid on the image (like the Services cards). The full bio bullets
// are hidden by default and revealed inside the glass panel via Read more,
// with a strengthened ambient glow + lift on hover.
function CoFounderCard({ member }) {
  // Alternating editorial rows — bio always visible beside the portrait.
  // Komla → image left / bio right; Fafali → image right / bio left.
  const bioOnLeft = member.side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`group relative flex flex-col gap-8 sm:items-center sm:gap-12 ${
        bioOnLeft ? "sm:flex-row-reverse" : "sm:flex-row"
      }`}
    >
      {/* ── Portrait image (smaller, fixed) ── */}
      <div className="relative mx-auto w-full max-w-[15rem] shrink-0 sm:mx-0 sm:w-56 md:w-64">
        {/* Ambient orange glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-2 rounded-[1.75rem] bg-[#F2600B]/10 blur-2xl opacity-50 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#F2600B]/25 bg-[#0c0705] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-[#F2600B]/70 group-hover:shadow-[0_20px_60px_-10px_rgba(242,96,11,0.5)]">
          <img
            src={member.image}
            alt={member.name}
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* LinkedIn arrow */}
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:bg-[#F2600B] hover:border-[#F2600B]"
          >
            <ArrowUpRight size={18} />
          </a>
          {/* Name chip */}
          <div className="absolute inset-x-2 bottom-2 rounded-xl border border-white/15 bg-black/50 px-3 py-2 backdrop-blur-md">
            <h3 className="text-base font-bold leading-tight text-white">{member.name}</h3>
            <p className="text-[11px] text-gray-300">{member.aka}</p>
          </div>
        </div>
      </div>

      {/* ── Bio (always visible) ── */}
      <div
        className={`flex-1 ${bioOnLeft ? "sm:text-right" : "sm:text-left"}`}
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-[#ff8534]">
          {member.role}
        </span>
        <h4 className="hero-display mt-1 text-2xl font-bold text-[#F2600B] sm:text-3xl">
          {member.name}
        </h4>
        <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
          {member.bio.map((point) => (
            <li
              key={point.label}
              className={`flex items-start gap-3 text-sm leading-relaxed text-gray-200 ${
                bioOnLeft ? "sm:flex-row-reverse sm:text-right" : ""
              }`}
            >
              <Check size={16} className="mt-0.5 shrink-0 text-[#F2600B]" />
              <span>
                <span className="font-semibold text-white">{point.label}:</span> {point.text}
              </span>
            </li>
          ))}
        </ul>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 transition hover:text-[#ff8534] ${
            bioOnLeft ? "sm:flex-row-reverse" : ""
          }`}
        >
          <Linkedin size={16} /> Connect on LinkedIn
        </a>
      </div>
    </motion.div>
  );
}

// What Krafo does now — "we build it, we secure it". Shown as an interactive
// orbit on desktop (hover a node → the core explains it) and a list on mobile.
const CAPABILITIES = [
  { Icon: Briefcase, title: "Consulting", short: "Advisory", text: "Strategy, risk and compliance guidance for growing teams." },
  { Icon: Cloud, title: "SaaS Platforms", short: "SaaS", text: "Multi-tenant products engineered to scale from MVP to a serious business." },
  { Icon: ShieldCheck, title: "Cybersecurity", short: "Security", text: "Assessments, hardening and monitoring — baked in, never bolted on." },
  { Icon: Code, title: "Web & Apps", short: "Web", text: "Fast, secure websites and web apps that actually run your operations." },
  { Icon: GraduationCapIcon, title: "Training", short: "Training", text: "We turn your people into your strongest first line of defence." },
];

function CapabilityOrbit() {
  const [active, setActive] = useState(0);
  const n = CAPABILITIES.length;

  return (
    <>
      {/* Desktop orbit */}
      <div className="hidden md:block">
        <div className="relative mx-auto aspect-square w-full max-w-lg">
          <div className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-[#F2600B]/20" />
          <div className="absolute inset-[14%] rounded-full border border-[#F2600B]/10" />
          <div className="pointer-events-none absolute inset-[20%] rounded-full bg-[#F2600B]/10 blur-3xl" />

          {/* Center — the KRAFO mark (brand anchor) */}
          <div className="absolute left-1/2 top-1/2 flex h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#F2600B]/30 bg-[#0c0705]/90 p-8 backdrop-blur">
            <img
              src={KrafoMark}
              alt="Krafo Systems mark"
              className="h-full w-full object-contain drop-shadow-[0_0_20px_rgba(242,96,11,0.35)]"
            />
          </div>

          {/* Orbiting nodes */}
          {CAPABILITIES.map((c, i) => {
            const angle = (-90 + (360 / n) * i) * (Math.PI / 180);
            const x = 50 + 42 * Math.cos(angle);
            const y = 50 + 42 * Math.sin(angle);
            const isActive = i === active;
            const NodeIcon = c.Icon;
            return (
              <button
                key={c.title}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-label={c.title}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
              >
                <span
                  className={`flex h-16 w-16 flex-col items-center justify-center rounded-2xl border bg-[#0c0705] transition-all duration-300 ${
                    isActive
                      ? "scale-110 border-[#F2600B] text-[#F2600B] shadow-[0_0_22px_rgba(242,96,11,0.55)]"
                      : "border-white/10 text-gray-400 hover:border-[#F2600B]/50 hover:text-[#ff8534]"
                  }`}
                >
                  <NodeIcon size={20} />
                  <span className="mt-1 text-[10px] font-semibold leading-tight">{c.short}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Caption — describes the hovered capability */}
        <div className="mx-auto mt-6 min-h-[4.5rem] max-w-md text-center">
          <h3 className="hero-display text-lg font-bold text-[#F2600B]">{CAPABILITIES[active].title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-gray-300">{CAPABILITIES[active].text}</p>
        </div>
      </div>

      {/* Mobile / tablet list */}
      <div className="grid gap-4 sm:grid-cols-2 md:hidden">
        {CAPABILITIES.map((c) => {
          const NodeIcon = c.Icon;
          return (
            <div
              key={c.title}
              className="flex items-start gap-3 rounded-xl border border-[#F2600B]/20 bg-gradient-to-br from-[#F2600B0D] to-[#0000001A] p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#F2600B]/30 bg-[#F2600B]/10 text-[#F2600B]">
                <NodeIcon size={18} />
              </span>
              <div>
                <h3 className="text-sm font-bold text-white">{c.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-300">{c.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// Who Krafo builds for now — an interactive segmented switcher.
const AUDIENCES = [
  {
    key: "smes",
    label: "SMEs & Businesses",
    video: vidSME,
    headline: "Grow without the growing pains",
    pain: "You need a serious online presence and systems that just work — and one security incident shouldn't be able to undo it all.",
    fit: [
      "A website or web app that earns customer trust",
      "Security hardening and monitoring built in",
      "Team training so your staff are your first line of defence",
    ],
  },
  {
    key: "startups",
    label: "Startups & Founders",
    video: vidStartup,
    headline: "Launch fast. Launch secure.",
    pain: "You need an MVP in market quickly — but investors and early customers expect it to be safe from day one.",
    fit: [
      "MVP and SaaS product builds",
      "Scalable, cloud-ready architecture",
      "Security designed in, not bolted on later",
    ],
  },
  {
    key: "institutions",
    label: "Institutions",
    video: vidInstitution,
    headline: "Modernise with confidence",
    pain: "Legacy processes, compliance pressure, and a rising tide of threats — all at once.",
    fit: [
      "Custom platforms, portals and dashboards",
      "Compliance-aware security and audits",
      "Capacity-building programs for your people",
    ],
  },
  {
    key: "ngos",
    label: "NGOs & Impact",
    video: vidNGO,
    headline: "Do more good, safely",
    pain: "Limited budgets, sensitive beneficiary data, and real impact riding on your tools staying up.",
    fit: [
      "Right-sized digital tools that fit your budget",
      "Data protection and privacy by design",
      "Practical, affordable security",
    ],
  },
];

function AudienceSwitcher() {
  const [active, setActive] = useState(0);
  const a = AUDIENCES[active];
  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {AUDIENCES.map((aud, i) => (
          <button
            key={aud.key}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              i === active
                ? "bg-[#F2600B] text-white shadow-[0_0_20px_rgba(242,96,11,0.4)]"
                : "border border-white/15 text-gray-300 hover:border-[#F2600B]/50 hover:text-white"
            }`}
          >
            {aud.label}
          </button>
        ))}
      </div>

      <motion.div
        key={a.key}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-[#F2600B]/20"
      >
        {/* Background video */}
        <video
          key={a.video}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={a.video} type="video/mp4" />
        </video>
        {/* Darkening overlay for contrast */}
        <div className="absolute inset-0 bg-black/60" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"
        />

        {/* Glassmorphism content */}
        <div className="relative grid gap-6 p-6 sm:p-8 md:grid-cols-2 md:gap-8 md:p-10">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <h3 className="hero-display text-2xl font-bold text-white md:text-3xl">{a.headline}</h3>
            <p className="mt-4 leading-relaxed text-gray-100">{a.pain}</p>
          </div>
          <ul className="space-y-3 self-center rounded-2xl border border-white/15 bg-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            {a.fit.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm leading-relaxed text-gray-100">
                <Check size={16} className="mt-0.5 shrink-0 text-[#F2600B]" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  // Scroll-driven parallax for the hero (mirrors the Consultation page):
  // the map lifts + scales as you scroll and the whole hero fades out.
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const mapScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const mapY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <>
      <Navbar />

      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center overflow-hidden bg-black px-4 py-28 text-white font-body md:px-12 lg:px-20"
      >
        <style>{`.hero-display { font-family: 'Proxon', sans-serif; }`}</style>

        {/* Ambient radial glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 20% 20%, rgba(242,96,11,0.16), transparent 70%), radial-gradient(50% 50% at 85% 30%, rgba(255,133,52,0.10), transparent 70%)",
          }}
        />
        {/* Structural grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#F2600B 1px, transparent 1px), linear-gradient(90deg, #F2600B 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Map — large background layer on desktop. It's scaled up and anchored
            to the right so it bleeds off-screen for maximum coverage, while the
            headline text sits on top of the dark/oceanic left half. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          style={{ y: mapY, scale: mapScale, opacity: heroOpacity }}
          className="absolute inset-y-0 right-0 z-0 hidden w-[66%] items-center lg:flex"
        >
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[#F2600B]/10 blur-3xl" />
            <WorldPresenceMap
              accent="#F2600B"
              dotColor="rgba(255,255,255,0.16)"
              className="origin-right scale-[1.2]"
            />
          </div>
        </motion.div>

        {/* Scrim: fades the map into the dark left side so the copy stays legible.
            pointer-events-none keeps the map's cursor-follow + marker hovers alive. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] hidden bg-gradient-to-r from-black from-30% to-transparent to-55% lg:block"
        />

        <motion.div
          style={{ y: heroContentY, opacity: heroOpacity }}
          className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl"
        >
          <div className="max-w-2xl">
            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="pointer-events-auto relative"
            >
              <div className="absolute -left-6 top-1 bottom-1 hidden w-1 bg-[#F2600B] opacity-40 md:block" />
              <h1 className="hero-display text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Securing Africa&apos;s
                <br />
                <span className="text-[#F2600B]">Cyber Future</span>
              </h1>
              <p className="mt-6 max-w-xl text-base text-gray-300 sm:text-lg md:text-xl">
                We&apos;re a <span className="text-white font-medium">distributed team</span> —
                experts drawn from{" "}
                <span className="text-white font-medium">across the globe</span>, connected by a
                single purpose: to defend Africa&apos;s digital future. Wherever the threat, we
                connect and protect.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="https://calendly.com/krafosystems"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#F2600B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d94f00] sm:text-base"
                >
                  Book A Consultation <ArrowUpRight size={18} />
                </a>
              </div>

            </motion.div>

            {/* Map — stacked below the copy on mobile / tablet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="pointer-events-auto relative mt-12 lg:hidden"
            >
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-[#F2600B]/10 blur-3xl" />
              <WorldPresenceMap accent="#F2600B" dotColor="rgba(255,255,255,0.16)" />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">
            Scroll
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-[#F2600B]/60 to-transparent" />
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#F2600B]/40" />
        </motion.div>
      </section >


      {/* What is Krafo Systems — centered mark flanked by meaning */}
      <section className="relative overflow-hidden bg-black py-20 lg:py-28">
        <style>{`.hero-display { font-family: 'Proxon', sans-serif; }`}</style>

        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-100"
          style={{
            background:
              "radial-gradient(45% 45% at 50% 40%, rgba(242,96,11,0.10), transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#F2600B]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[#ff8534]">
              Our Name
            </span>
            <h2 className="hero-display mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              What is <span className="text-[#F2600B]">Krafo Systems</span>
            </h2>
            <p className="mt-4 text-base text-gray-300 md:text-lg">
              A name that carries our mission — a collection of souls, working as one
              to develop, defend, and protect a sovereign digital future for Africa.
            </p>
          </motion.div>

          {/* Feature layout: left items · center mark · right items */}
          <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-14">
            {/* Left column (right-aligned toward the mark) */}
            <div className="flex flex-col gap-10 lg:gap-14 lg:text-right">
              {[
                {
                  Icon: Sparkles,
                  title: "The meaning of KRAFO",
                  text: (
                    <>
                      In Ghana, “<strong className="font-bold text-white">KRA</strong>” means soul
                      and “<strong className="font-bold text-white">FO</strong>” means multiple — so
                      “KRAFO” is a collection of souls.
                    </>
                  ),
                },
                {
                  Icon: Users,
                  title: "A collection of souls",
                  text: "Our internal team, our external partners, our clients, and every individual whose capability, security, and confidence is strengthened through our work together.",
                },
              ].map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex items-start gap-4 lg:flex-row-reverse lg:text-right"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#F2600B]/25 bg-[#F2600B]/10 text-[#F2600B] transition-colors duration-300 group-hover:border-[#F2600B]/60 group-hover:bg-[#F2600B]/20">
                    <f.Icon size={22} />
                  </div>
                  <div>
                    <h3 className="hero-display text-lg font-semibold text-[#F2600B]">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-200">{f.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Center — the KRAFO mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto flex items-center justify-center py-4"
            >
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#F2600B]/15 blur-3xl" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute h-64 w-64 rounded-full border border-[#F2600B]/15 md:h-80 md:w-80"
              />
              <img
                src={KrafoMark}
                alt="Krafo Systems mark"
                className="w-44 max-w-none object-contain drop-shadow-[0_0_35px_rgba(242,96,11,0.35)] md:w-56"
              />
            </motion.div>

            {/* Right column (left-aligned away from the mark) */}
            <div className="flex flex-col gap-10 lg:gap-14">
              {[
                {
                  Icon: Layers,
                  title: "Systems",
                  text: "Separate components and elements, each distinct and purposeful, coming together to form a greater whole.",
                },
                {
                  Icon: ShieldCheck,
                  title: "For us, by us",
                  text: "Together we develop, enhance, defend, and protect what we create — committed to the people and the sovereign future of this continent.",
                },
              ].map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex items-start gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#F2600B]/25 bg-[#F2600B]/10 text-[#F2600B] transition-colors duration-300 group-hover:border-[#F2600B]/60 group-hover:bg-[#F2600B]/20">
                    <f.Icon size={22} />
                  </div>
                  <div>
                    <h3 className="hero-display text-lg font-semibold text-[#F2600B]">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-200">{f.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Our Journey Section — left-rail timeline */}
      <section className="relative overflow-hidden bg-black py-24 px-4 md:px-20 text-white font-body">
        <style>{`.hero-display { font-family: 'Proxon', sans-serif; }`}</style>

        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(50% 40% at 15% 20%, rgba(242,96,11,0.12), transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-5xl">
          {/* Heading — site style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#F2600B]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[#ff8534]">
              Our Story
            </span>
            <h2 className="hero-display mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Our <span className="text-[#F2600B]">Journey</span>
            </h2>
          </motion.div>

          {/* Timeline — alternating left/right with icon nodes */}
          <div className="relative">
            {/* Spine: left rail on mobile, centered on desktop */}
            <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-[#F2600B] via-[#F2600B]/40 to-transparent md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-8 md:space-y-0">
              {[
                {
                  date: "March 2022",
                  year: "22",
                  title: "Incorporated in Ghana",
                  text: "Diacentric Data Solutions GH Ltd. incorporated in Ghana — the foundation of what would become Krafo Systems.",
                  Icon: Building2,
                },
                {
                  date: "March 2023",
                  year: "23",
                  title: "Rebranded to Krafo Systems",
                  text: "Rebranded as Krafo Systems and launched the free Hacking The Human Mind (HTHM) workshop in the Fall of 2023.",
                  Icon: Sparkles,
                },
                {
                  date: "Jan–Aug 2024",
                  year: "24",
                  title: "Training & Capacity Building",
                  text: "Held our first in-person training — HTHM at the International Embassy of Suriname — plus a collaboration helping business owners and entrepreneurs become cyber resilient.",
                  Icon: GraduationCapIcon,
                },
                {
                  date: "Fall 2024",
                  year: "24",
                  title: "Driving Cyber Resilience",
                  text: "Launched the in-person Cybersecurity Capacity Building Course (CCBC) and celebrated our first CCBC graduates.",
                  Icon: ShieldCheck,
                },
                {
                  date: "2025",
                  year: "25",
                  title: "Expanding Our Reach",
                  text: "Growing across the continent with 20+ strong partners championing a safer digital Africa.",
                  Icon: Globe,
                },
              ].map((item, index) => {
                const Icon = item.Icon;
                const onLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: onLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5 }}
                    className="group relative md:grid md:grid-cols-2 md:items-center md:gap-x-16"
                  >
                    {/* Card */}
                    <div
                      className={`pl-20 md:pl-0 py-2 md:py-8 ${
                        onLeft ? "md:col-start-1 md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"
                      }`}
                    >
                      <div className="relative overflow-hidden rounded-xl border border-[#F2600B]/20 bg-gradient-to-br from-[#F2600B0D] to-[#0000001A] p-5 shadow-xl transition-all duration-300 group-hover:border-[#F2600B]/50 group-hover:shadow-[0_0_30px_rgba(242,96,11,0.2)] md:p-6">
                        {/* Large faint year watermark */}
                        <span
                          aria-hidden="true"
                          className={`hero-display pointer-events-none absolute -top-4 select-none text-7xl font-extrabold leading-none text-white/[0.04] md:text-8xl ${
                            onLeft ? "left-2" : "right-2"
                          }`}
                        >
                          &apos;{item.year}
                        </span>

                        <time className="relative inline-block rounded-full border border-[#F2600B]/30 bg-[#F2600B]/10 px-3 py-1 text-xs font-semibold text-[#ff8534]">
                          {item.date}
                        </time>
                        <h3 className="hero-display relative mt-3 text-lg font-bold text-white md:text-xl">
                          {item.title}
                        </h3>
                        <p className="relative mt-2 text-sm leading-relaxed text-gray-300">{item.text}</p>
                      </div>
                    </div>

                    {/* Icon node — on the spine */}
                    <span className="absolute left-6 top-6 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                      {/* pulsing halo */}
                      <span className="absolute inset-0 rounded-2xl bg-[#F2600B]/25 blur-md transition-all duration-300 group-hover:bg-[#F2600B]/40" />
                      <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[#F2600B]/50 bg-[#0c0705] text-[#F2600B] shadow-[0_0_18px_rgba(242,96,11,0.55)] ring-4 ring-black transition-transform duration-300 group-hover:scale-110 md:h-14 md:w-14">
                        <Icon size={22} />
                      </span>
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* Meet Our Team Section */}
      < section className="bg-[#000000] py-16 px-4 md:px-20 pt-0 text-white font-body relative" >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#F2600B]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[#ff8534]">
              Leadership
            </span>
            <h2 className="hero-display mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Meet The <span className="text-[#F2600B]">Co-Founders</span>
            </h2>
            <p className="mt-4 text-gray-300 text-lg">The two founders behind Krafo Systems, driving our mission to secure Africa's digital future.</p>
          </div>

          <div className="flex flex-col gap-16 md:gap-24 max-w-5xl mx-auto">
            {[
              {
                name: "Mr. Komla Elikem",
                aka: "aka Jermale D. Mathis",
                role: "Co-Founder / CEO",
                image: KomlaPic,
                side: "right",
                linkedin: "https://www.linkedin.com/in/komla-m-a2a915253/",
                bio: [
                  { label: "ICT/Cybersecurity Professional", text: "Over 25 years of experience with the U.S. Department of Defense and the private sector." },
                  { label: "Global Collaborator", text: "Extensive experience in R&D, international IT projects, and education and training." },
                  { label: "Advocate for Critical Thinking", text: "Champions problem-solving and critical thinking as essential tools for driving innovative solutions." },
                  { label: "Initiative Creator", text: "Founded Hacking The Human Mind to emphasize the importance of protecting the mind as a critical asset." },
                  { label: "Africa-Focused Vision", text: "Advocates for self-reliance and reducing external influences to combat insider threats." },
                  { label: "Dedicated Leader", text: "Committed to building resilient systems shaped by extensive experience and a belief in limitless potential." },
                ],
              },
              {
                name: "Mrs. Mamaga Ami Fafali",
                aka: "aka Marie A. Mathis",
                role: "Co-Founder / COO",
                image: AmiPic,
                side: "left",
                linkedin: "https://www.linkedin.com/in/amifafali/",
                bio: [
                  { label: "Cybersecurity Expert", text: "25+ years of experience with a degree in Cybersecurity and multiple certifications." },
                  { label: "Specialized Skills", text: "Expertise in ICT audits, compliance, network defense, and policy creation." },
                  { label: "Youth-Centric Approach", text: "Advocates for empowering young minds as the foundation of security." },
                  { label: "Initiative Creator", text: "Founded the Cybersecurity Capacity Building Initiative to address Africa's digital challenges." },
                  { label: "CyberBytes Leader", text: "Inspires and trains Africa's next generation of cyber defenders." },
                  { label: "Visionary Goal", text: "Building a digitally resilient Africa led by empowered youth." },
                ],
              },
            ].map((member, idx) => (
              <CoFounderCard key={idx} member={member} />
            ))}
          </div>
        </div>
      </section >

      {/* What We Do — capability orbit */}
      <section className="relative overflow-hidden bg-black py-20 px-4 md:px-20 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "radial-gradient(45% 45% at 80% 30%, rgba(242,96,11,0.10), transparent 70%)" }}
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 h-1 w-12 rounded-full bg-[#F2600B]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[#ff8534]">
              What We Do
            </span>
            <h2 className="hero-display mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              We build it. <br />
              <span className="text-[#F2600B]">We secure it.</span>
            </h2>
            <p className="mt-5 max-w-md text-base text-gray-300 md:text-lg">
              Krafo is a single partner for the two things every modern business needs — the
              digital products that grow you, and the security that protects what you&apos;ve built.
              Hover to explore how the pieces fit together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <CapabilityOrbit />
          </motion.div>
        </div>
      </section>

      {/* Who We Build For — audience switcher */}
      <section className="relative bg-black py-20 px-4 md:px-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#F2600B]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[#ff8534]">
              Who We Build For
            </span>
            <h2 className="hero-display mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Partners in <span className="text-[#F2600B]">every stage</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-300">
              From first-time founders to established institutions — pick where you are and see how we help.
            </p>
          </div>
          <AudienceSwitcher />
        </div>
      </section>
      {/* How We Work — process rail */}
      <section className="relative overflow-hidden bg-black py-20 px-4 md:px-20 md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "radial-gradient(45% 40% at 25% 30%, rgba(242,96,11,0.10), transparent 70%)" }}
        />
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#F2600B]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[#ff8534]">
              How We Work
            </span>
            <h2 className="hero-display mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              From idea to <span className="text-[#F2600B]">impact</span>
            </h2>
          </div>

          <div className="relative grid gap-6 md:grid-cols-4">
            {/* Connecting line (desktop) */}
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-[#F2600B]/40 to-transparent md:block" />
            {[
              { Icon: Compass, step: "01", title: "Discover", text: "We learn your business, your users and your risks — then map the fastest path to real value." },
              { Icon: PenTool, step: "02", title: "Design", text: "Wireframes, architecture and a security model — agreed before a single line of code." },
              { Icon: Rocket, step: "03", title: "Build & Secure", text: "We ship in focused sprints with testing and security built into every step, not the end." },
              { Icon: LifeBuoy, step: "04", title: "Support", text: "Launch is the start. We monitor, maintain and evolve the product as you grow." },
            ].map((s, i) => {
              const StepIcon = s.Icon;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative"
                >
                  <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#F2600B]/40 bg-[#0c0705] text-[#F2600B] shadow-[0_0_18px_rgba(242,96,11,0.4)] ring-4 ring-black transition-transform duration-300 group-hover:scale-110">
                    <StepIcon size={24} />
                  </span>
                  <span className="hero-display mt-5 block text-xs font-bold tracking-widest text-[#ff8534]">
                    {s.step}
                  </span>
                  <h3 className="hero-display mt-1 text-xl font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">{s.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Principles — editorial big-index list */}
      <section className="relative bg-black py-20 px-4 md:px-20 md:py-24 text-white font-body">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#F2600B]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[#ff8534]">
              What We Stand For
            </span>
            <h2 className="hero-display mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Our <span className="text-[#F2600B]">Principles</span>
            </h2>
          </div>

          <div className="border-t border-white/10">
            {[
              { title: "Afrocentricity", text: "Built for the African context — championing local capability, ownership and self-reliance." },
              { title: "Ethical Practice", text: "Integrity in every engagement. We do what's right for your business, not just what's billable." },
              { title: "Partnership", text: "We build long-term relationships, working alongside your team to solve hard problems together." },
              { title: "Adaptability", text: "Flexible solutions that evolve with your business and the shifting threat landscape." },
              { title: "Foresight", text: "Proactive, not reactive — we anticipate what's next so you're ready before it arrives." },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="group flex items-baseline gap-6 border-b border-white/10 py-6 md:gap-10 md:py-8"
              >
                <span className="hero-display shrink-0 text-4xl font-extrabold leading-none text-white/10 transition-colors duration-300 group-hover:text-[#F2600B]/70 md:text-6xl">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="hero-display text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#F2600B] md:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-200 md:text-base">
                    {p.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="relative overflow-hidden border-t border-[#F2600B]/10 bg-black py-20 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(60% 70% at 50% 0%, rgba(242,96,11,0.18), transparent 70%)" }}
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h2 className="hero-display text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Let&apos;s <span className="text-[#F2600B]">build it</span> — and{" "}
            <span className="text-[#F2600B]">secure it.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-300 md:text-lg">
            Whether you&apos;re launching something new or protecting what you&apos;ve built, Krafo is
            one partner for both. Let&apos;s talk about where you&apos;re headed.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://calendly.com/krafosystems"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F2600B] px-8 py-3.5 font-semibold text-white shadow-lg shadow-[#F2600B]/30 transition hover:bg-[#d94f00]"
            >
              Book a Consultation <ArrowUpRight size={18} />
            </a>
            <HashLink
              smooth
              to="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-[#F2600B]/60 hover:text-[#ff8534]"
            >
              Explore our services <ArrowRight size={18} />
            </HashLink>
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
        </div>
      </section>

      <Footer/>

    </>
  );
}