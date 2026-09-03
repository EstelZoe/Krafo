import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, CalendarClock } from 'lucide-react';
import Navbar from '../assets/components/Navbar';
import Footer from '../assets/components/Footer';
import { EXPERTISE } from './expertiseData';

const CALENDLY_URL = 'https://calendly.com/krafosystems';

// Shared eyebrow (orange bar + uppercase label), matching Home/Consultation/About.
const Eyebrow = ({ label, centered = false }) => (
  <>
    <div className={`mb-4 h-1 w-12 rounded-full bg-[#F2600B] ${centered ? 'mx-auto' : ''}`} />
    <span className="text-sm font-semibold uppercase tracking-wider text-[#ff8534]">
      {label}
    </span>
  </>
);

export default function Expertise() {
  const { hash } = useLocation();

  // Deep-link support: when arriving at /expertise#slug (e.g. from a card on the
  // Consultation page), scroll to that section. A short delay lets the content
  // render and wins over the global ScrollToTop reset.
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <style>{`.hero-display{font-family:'Proxon',sans-serif;}`}</style>

      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-[#F2600B]/10 px-6 pt-28 pb-16 md:pt-32 md:pb-20 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_-10%,#F2600B1f,transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(#F2600B14_1px,transparent_1px)] [background-size:22px_22px] opacity-20"
        />
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Eyebrow label="What We Do" centered />
          </motion.div>
          <motion.h1
            className="hero-display mt-3 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            Our <span className="text-[#F2600B]">Cybersecurity</span> Expertise
          </motion.h1>
          <motion.p
            className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-gray-300 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            From continuous monitoring to compliance with Ghana&apos;s Data Protection and
            Cybersecurity Acts, our services are built to help you understand, reduce, and
            manage cyber risk — practically and affordably.
          </motion.p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#F2600B] px-7 py-3.5 font-bold text-white shadow-lg shadow-[#F2600B]/30 transition-all duration-300 hover:scale-[1.03] hover:bg-[#d94f00]"
            >
              Book a Consultation <CalendarClock size={18} />
            </a>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-[#F2600B]/60 hover:bg-white/10"
            >
              <ArrowLeft size={18} /> Back to Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ── EXPERTISE DETAIL LIST ────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 md:space-y-16">
          {EXPERTISE.map((item, i) => {
            const Icon = item.Icon;
            return (
              <motion.article
                key={item.slug}
                id={item.slug}
                className="grid scroll-mt-28 grid-cols-1 items-center gap-8 border-b border-white/10 pb-12 last:border-b-0 md:pb-16 lg:grid-cols-2 lg:gap-12"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                transition={{ duration: 0.5 }}
              >
                {/* Image — alternates side on large screens for visual rhythm */}
                <div className={`relative overflow-hidden rounded-2xl border border-[#F2600B]/15 shadow-xl transition-all duration-500 hover:border-[#F2600B]/40 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-64 w-full object-cover md:h-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#F2600B]/40 bg-black/60 backdrop-blur">
                    <Icon className="text-[#F2600B]" size={24} />
                  </div>
                </div>

                {/* Content: title + summary + what's included */}
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <h2 className="hero-display mb-3 text-2xl font-bold leading-snug text-white md:text-3xl">
                    {item.title}
                  </h2>
                  <p className="mb-6 leading-relaxed text-gray-400">{item.summary}</p>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#ff8534]">
                    What&apos;s included
                  </p>
                  <ul className="space-y-3">
                    {item.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-[#F2600B]/40 bg-[#F2600B]/15">
                          <Check size={12} className="text-[#ff8534]" />
                        </span>
                        <span className="text-gray-300">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────── */}
      <section className="border-t border-[#F2600B]/10 bg-gradient-to-br from-[#F2600B]/10 via-black to-black py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="hero-display mb-3 text-3xl font-bold md:text-4xl">
            Not sure where to <span className="text-[#F2600B]">start?</span>
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-gray-400">
            Book a free consultation and we&apos;ll help you identify your biggest risks and the
            fastest wins — no jargon, no pressure.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#F2600B] px-8 py-3.5 font-bold text-white shadow-lg shadow-[#F2600B]/30 transition-all duration-300 hover:scale-[1.03] hover:bg-[#d94f00]"
          >
            Schedule Your Session <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
