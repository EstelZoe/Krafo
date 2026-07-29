import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { EXPERTISE } from "../expertiseData";

/**
 * CybersecuritySection
 * ─────────────────────────────────────────────────────────────────────────────
 * Presents Krafo's cybersecurity service offerings on the Services page, sourced
 * ENTIRELY from the shared expertise data (`src/pages/expertiseData.jsx`). No
 * expertise content is redefined here — the section maps over the shared
 * `EXPERTISE` array (single source of truth), mirroring Consultation.jsx.
 *
 * Each card is a react-router <Link> that deep-links to `/expertise#{slug}` so
 * the Services page and the detailed Expertise page can never drift apart.
 *
 * Brand_Theme: black surface, brand-orange (#F2600B) accents with lighter
 * (#ff8534) highlights, and the Proxon headline font (.hero-display convention).
 *
 * Requirements: 8.1 (source from shared expertise data), 8.2 (link to detail
 * destination), 8.3 & 10.2 (Brand_Theme colors + typography).
 */
export default function CybersecuritySection() {
  // Defensive: consume the shared array, never redefine content here.
  const items = Array.isArray(EXPERTISE) ? EXPERTISE : [];

  return (
    <section
      id="cybersecurity"
      className="relative py-20 md:py-28 bg-black overflow-hidden border-t border-[#F2600B]/5"
    >
      {/* Proxon headline convention (loaded globally via index.css @font-face). */}
      <style>{`
        .hero-display { font-family: 'Proxon', sans-serif; }
      `}</style>

      {/* Soft brand-orange radial glow over the black surface. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#F2600B12,transparent_65%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* ── Section heading ─────────────────────────────────────── */}
        <motion.div
          className="text-center mb-14 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F2600B]/30 bg-[#F2600B]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#ff8534] uppercase">
            <ShieldCheck size={14} className="text-[#F2600B]" />
            Cybersecurity
          </span>
          <h2 className="hero-display mt-5 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Our Cybersecurity <span className="text-[#F2600B]">Services</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed">
            Explore the pillars of our security practice — each a structural
            component of your cyber resilience. Select any area to learn more.
          </p>
        </motion.div>

        {/* ── Expertise card grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((item, i) => {
            const Icon = item?.Icon;
            const slug = item?.slug;
            // Skip malformed entries defensively rather than crash the grid.
            if (!slug) return null;

            return (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: (i % 3) * 0.06 + Math.floor(i / 3) * 0.03,
                }}
              >
                <Link
                  to={`/expertise#${slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#F2600B]/10 bg-[#111111] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#F2600B]/40 hover:shadow-2xl hover:shadow-[#F2600B]/5"
                >
                  {/* Decorative background image (optional field, empty alt). */}
                  {item?.image && (
                    <img
                      src={item.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover opacity-20 transition-opacity duration-500 group-hover:opacity-30"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/80 transition-colors duration-500 group-hover:bg-black/70" />

                  {/* Top accent bar on hover. */}
                  <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#F2600B] transition-all duration-500 group-hover:w-full" />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F2600B]/20 bg-[#F2600B]/10 transition-all duration-300 group-hover:border-[#F2600B]/40 group-hover:bg-[#F2600B]/20">
                        {Icon ? (
                          <Icon className="text-[#F2600B]" size={22} />
                        ) : (
                          <ShieldCheck className="text-[#F2600B]" size={22} />
                        )}
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-gray-600 transition-colors duration-300 group-hover:text-[#ff8534]"
                      />
                    </div>

                    <h3 className="hero-display text-base md:text-lg font-semibold text-white transition-colors duration-300 group-hover:text-[#ff8534]">
                      {item?.title || "Cybersecurity Service"}
                    </h3>

                    {item?.summary && (
                      <p className="mt-2 text-sm leading-relaxed text-gray-400 line-clamp-3">
                        {item.summary}
                      </p>
                    )}

                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#F2600B] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Learn more
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
