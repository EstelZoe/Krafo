import { useNavigate } from "react-router-dom";
import { useState, Suspense, lazy } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ClipboardList, BarChart3, FileText, ChevronRight, ArrowRight,
  Shield, CheckCircle, Building2, Users, Briefcase, Lock, Zap,
} from "lucide-react";

const ToolkitNavbar = lazy(() => import("./components/ToolkitNavbar"));
const Footer = lazy(() => import("../../assets/components/Footer"));

import tab from "../assessment/images/tabremove.png";

// ── Reusable Components ─────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GlowCard({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`group relative bg-[#0a0a0a] rounded-2xl border border-gray-800 p-8 overflow-hidden transition-colors duration-300 hover:border-orange-500/40 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

function FlipCard({ icon: Icon, title, desc, backContent, badge, delay = 0 }) {
  const [flipped, setFlipped] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative h-72 cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.6, type: "spring", stiffness: 100 }}
      >
        <div className="absolute inset-0 bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 flex flex-col justify-center" style={{ backfaceVisibility: "hidden" }}>
          {badge && (
            <span className="absolute -top-3 left-6 bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">{badge}</span>
          )}
          <Icon className="text-orange-500 mb-4" size={28} />
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
          <div className="mt-auto pt-4 text-orange-500 text-xs flex items-center gap-1 opacity-60">
            Tap to learn more <ArrowRight size={12} />
          </div>
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-[#0a0a0a] border border-orange-500/30 rounded-2xl p-8 flex flex-col justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-gray-300 leading-relaxed text-sm">{backContent}</p>
          <div className="mt-auto pt-4 text-orange-500 text-xs opacity-60">Tap to flip back</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NistRadar() {
  const [active, setActive] = useState(null);
  const labels = ["Governance", "Identify", "Protect", "Detect", "Respond", "Recover"];
  const descs = [
    "Establish and maintain cybersecurity policies, procedures, and oversight across the organization.",
    "Understand and manage risk to systems, assets, data, and capabilities.",
    "Develop and implement safeguards to ensure delivery of services.",
    "Identify cybersecurity events in a timely manner.",
    "Take action regarding a detected cybersecurity incident.",
    "Maintain resilience plans and restore capabilities.",
  ];
  const scores = [0.6, 0.7, 0.5, 0.4, 0.6, 0.8];
  const size = 280, cx = size / 2, r = size * 0.38, step = (Math.PI * 2) / 6;

  const pts = labels.map((_, i) => ({ x: cx + r * Math.cos(i * step - Math.PI / 2), y: cx + r * Math.sin(i * step - Math.PI / 2) }));
  const dPts = scores.map((s, i) => ({ x: cx + r * s * Math.cos(i * step - Math.PI / 2), y: cx + r * s * Math.sin(i * step - Math.PI / 2) }));
  const path = dPts.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ") + "Z";

  return (
    <div className="flex flex-col lg:flex-row items-center gap-12">
      <Reveal className="relative flex-shrink-0">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="NIST framework radar chart">
          {[0.2, 0.4, 0.6, 0.8, 1].map((s, i) => (
            <polygon key={i} points={pts.map(p => `${cx + (p.x - cx) * s},${cx + (p.y - cx) * s}`).join(" ")} fill="none" stroke="#222" strokeWidth="0.5" />
          ))}
          {pts.map((p, i) => <line key={i} x1={cx} y1={cx} x2={p.x} y2={p.y} stroke="#222" strokeWidth="0.5" />)}
          <motion.path d={path} fill="#F2600B" fillOpacity="0.2" stroke="#F2600B" strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut" }} />
          {dPts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={active === i ? 7 : 5} fill="#F2600B"
              onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
              style={{ cursor: "pointer", transition: "r 0.2s" }} />
          ))}
          {pts.map((p, i) => (
            <text key={i} x={p.x + (p.x - cx) * 0.2} y={p.y + (p.y - cx) * 0.2}
              fill={active === i ? "#F2600B" : "#888"} fontSize="10" fontWeight="600"
              textAnchor="middle" dominantBaseline="middle">{labels[i]}</text>
          ))}
        </svg>
        <AnimatePresence>
          {active !== null && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#111] border border-orange-500/40 rounded-xl p-4 w-60 shadow-2xl z-20">
              <h4 className="text-orange-500 font-bold text-sm">{labels[active]}</h4>
              <p className="text-gray-400 text-xs mt-1">{descs[active]}</p>
              <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div className="h-full bg-orange-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${scores[active] * 100}%` }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>
      <Reveal delay={0.2} className="flex-1">
        <h3 className="text-2xl font-bold text-orange-500 mb-3">NIST Cybersecurity Framework</h3>
        <p className="text-gray-400 leading-relaxed mb-6 text-sm">
          Our assessment evaluates your organization across six core security functions. Hover over the chart to explore each pillar.
        </p>
        <div className="space-y-2">
          {labels.map((l, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span className="text-gray-300 flex-1">{l}</span>
              <span className="text-orange-500 font-mono text-xs">{Math.round(scores[i] * 100)}%</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

// ── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "31", label: "Security Questions" },
  { value: "7", label: "Assessment Categories" },
  { value: "NIST", label: "Framework Aligned" },
  { value: "Free", label: "No Cost to Start" },
];

const STEPS = [
  { icon: ClipboardList, num: "01", title: "Answer Questions", desc: "Complete a guided questionnaire covering governance, risk management, and technical controls across 7 key security categories." },
  { icon: BarChart3, num: "02", title: "Instant Analysis", desc: "Our scoring engine evaluates your responses against the NIST Cybersecurity Framework and industry best practices in real time." },
  { icon: FileText, num: "03", title: "Get Your Report", desc: "Receive a professional PDF report with your risk score, NIST breakdown, vulnerabilities, and actionable recommendations." },
];

const BENEFITS = [
  { icon: Shield, text: "NIST-aligned assessment methodology" },
  { icon: Zap, text: "Instant risk scoring with detailed breakdown" },
  { icon: FileText, text: "PDF report emailed automatically" },
  { icon: CheckCircle, text: "Actionable remediation recommendations" },
  { icon: BarChart3, text: "Track progress with multiple assessments" },
  { icon: Lock, text: "Data encrypted and confidential" },
];

// ── Main Component ──────────────────────────────────────────────────────────

export default function AssessmentToolkit() {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const go = (path) => () => navigate(path);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <div className="relative z-10">
        <Suspense fallback={<div className="h-16" />}>
          <ToolkitNavbar />
        </Suspense>

        {/* ═══ HERO ═══ */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden" aria-label="Hero">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-black" />
            <div className="absolute inset-0 opacity-[0.07]" style={{
              backgroundImage: "linear-gradient(rgba(242,96,11,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(242,96,11,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-500/10 blur-[180px] rounded-full" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/5 blur-[100px] rounded-full" />
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full mb-8">
              <Shield size={14} className="text-orange-500" />
              <span className="text-orange-400 text-sm font-medium">Free Cybersecurity Assessment</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95]">
              <span className="text-orange-500">Know Your</span><br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Cyber Risk</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Evaluate your organization's security posture in minutes. Get a NIST-aligned risk score,
              uncover hidden vulnerabilities, and receive a professional report with actionable recommendations.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={go("/assessment-toolkit/signup")}
                className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-8 py-3.5 rounded-xl transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black">
                Start Free Assessment <ChevronRight size={18} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={go("/assessment-toolkit/start")}
                className="border border-gray-600 hover:border-orange-500/60 text-white font-medium px-8 py-3.5 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black">
                See Example Report
              </motion.button>
            </div>
          </motion.div>

          {!prefersReduced && (
            <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
              <div className="w-5 h-9 border-2 border-orange-500/40 rounded-full flex justify-center pt-2">
                <div className="w-1 h-1.5 bg-orange-500 rounded-full" />
              </div>
            </motion.div>
          )}
        </section>

        {/* ═══ TRUST BAR ═══ */}
        <section className="py-14 px-6 border-t border-gray-800/50" aria-label="Key statistics">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="text-center">
                <div className="text-3xl font-bold text-orange-500">{s.value}</div>
                <div className="text-gray-500 text-sm mt-1">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══ DASHBOARD PREVIEW ═══ */}
        {/* <section className="py-16 px-6" aria-label="Dashboard preview">
          <Reveal className="max-w-5xl mx-auto">
            <motion.img src={tab} alt="Assessment dashboard showing risk scores and NIST framework analysis"
              className="w-full rounded-2xl border border-gray-800 shadow-2xl shadow-orange-500/5"
              whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }} />
          </Reveal>
        </section> */}

        {/* ═══ HOW IT WORKS ═══ */}
        <section className="relative py-28 px-6 border-t border-gray-800/50" aria-label="How it works">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-orange-500/8 blur-[150px] rounded-full pointer-events-none" />
          <div className="relative max-w-6xl mx-auto">
            <Reveal className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-400 max-w-xl mx-auto">Three steps to clarity. No jargon, no fluff.</p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-8">
              {STEPS.map((s, i) => (
                <GlowCard key={s.num} delay={i * 0.12}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-orange-500/20 text-5xl font-black leading-none">{s.num}</span>
                    <s.icon className="text-orange-500" size={26} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WHO IS THIS FOR ═══ */}
        <section className="relative py-28 px-6 border-t border-gray-800/50" aria-label="Target audience">
          <div className="relative max-w-6xl mx-auto">
            <Reveal className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Who Is This For?</h2>
              <p className="text-gray-400 max-w-xl mx-auto">Built for organizations that refuse to be the next headline.</p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-8">
              <FlipCard icon={Building2} delay={0} title="Small & Medium Businesses" badge="Most popular"
                desc="Identify gaps and protect your growing business from cyber threats before they strike."
                backContent="Small businesses are prime targets for ransomware and phishing. Our toolkit helps you build a cost-effective defense without a dedicated security team. Get clear, prioritized actions you can implement today." />
              <FlipCard icon={Users} delay={0.1} title="IT & Security Teams"
                desc="Benchmark your controls and get data-driven insights to justify security investments."
                backContent="Evaluate your current stack against NIST standards. Get prescriptive guidance to close gaps, track progress over time, and build a compelling case for leadership to fund security improvements." />
              <FlipCard icon={Briefcase} delay={0.2} title="Executives & Board Members"
                desc="Gain clear visibility into cyber risks and make informed strategic decisions."
                backContent="Understand your organization's risk exposure in business terms. The executive summary provides clear metrics, a risk score, and a remediation roadmap ready for board-level discussions." />
            </div>
          </div>
        </section>

        {/* ═══ NIST PILLARS ═══ */}
        <section className="relative py-28 px-6 border-t border-gray-800/50" aria-label="NIST framework">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-orange-500/8 blur-[120px] pointer-events-none" />
          <div className="relative max-w-6xl mx-auto">
            <Reveal className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Security Pillars</h2>
              <p className="text-gray-400 max-w-xl">Built on the NIST Cybersecurity Framework — the gold standard for comprehensive security assessment.</p>
            </Reveal>
            <NistRadar />
          </div>
        </section>

        {/* ═══ BENEFITS ═══ */}
        <section className="py-28 px-6 border-t border-gray-800/50" aria-label="What you get">
          <div className="max-w-4xl mx-auto">
            <Reveal className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">What You Get</h2>
              <p className="text-gray-400">Everything included. No hidden costs.</p>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-4">
              {BENEFITS.map((b, i) => (
                <Reveal key={b.text} delay={i * 0.06}>
                  <div className="flex items-center gap-4 bg-[#0a0a0a] border border-gray-800 rounded-xl px-5 py-4 hover:border-orange-500/30 transition-colors duration-300">
                    <b.icon size={18} className="text-orange-500 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{b.text}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section className="relative py-32 px-6 border-t border-gray-800/50 overflow-hidden" aria-label="Call to action">
          <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Ready to Take<br /><span className="text-orange-500">Control?</span>
              </h2>
              <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto">
                Complete the assessment in under 10 minutes and receive a professional report you can act on immediately.
              </p>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={go("/assessment-toolkit/signup")}
                className="bg-orange-500 hover:bg-orange-600 text-black font-bold text-lg px-12 py-4 rounded-xl transition-colors inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black">
                Start Free Assessment <ArrowRight size={20} />
              </motion.button>
            </Reveal>
          </div>
        </section>

        <Suspense fallback={<div className="h-20" />}>
          <Footer variant="dark" termsLink="/assessment-toolkit/terms" privacyLink="/assessment-toolkit/privacy" />
        </Suspense>
      </div>
    </div>
  );
}
