import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { SIGNATURE_PROGRAMS } from "./eventsContent";

/**
 * The programmes Krafo runs year after year, presented with the same
 * switcher pattern used by the About page (audiences) and the Consultation
 * page (risk areas): tab chips above a background image dimmed behind two
 * frosted-glass panels.
 */
export default function SignaturePrograms() {
    const [active, setActive] = useState(0);
    const program = SIGNATURE_PROGRAMS[active];

    return (
        <div>
            {/* Tabs */}
            <div className="mb-8 flex flex-wrap justify-center gap-2">
                {SIGNATURE_PROGRAMS.map((p, i) => {
                    const TabIcon = p.Icon;
                    return (
                        <button
                            key={p.key}
                            type="button"
                            onClick={() => setActive(i)}
                            aria-pressed={i === active}
                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                                i === active
                                    ? "bg-[#F2600B] text-white shadow-[0_0_20px_rgba(242,96,11,0.4)]"
                                    : "border border-white/15 text-gray-300 hover:border-[#F2600B]/50 hover:text-white"
                            }`}
                        >
                            <TabIcon size={15} />
                            {p.label}
                        </button>
                    );
                })}
            </div>

            {/* Panel */}
            <motion.div
                key={program.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl border border-[#F2600B]/20"
            >
                <img
                    src={program.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70" />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent"
                />

                <div className="relative grid gap-6 p-6 sm:p-8 md:grid-cols-2 md:gap-8 md:p-10">
                    {/* Left — the pitch */}
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                        <div className="flex items-center gap-3">
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F2600B]/40 bg-[#F2600B]/10 text-[#F2600B]">
                                <program.Icon size={24} />
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#ff8534]">
                                {program.short}
                            </span>
                        </div>
                        <h3 className="hero-display mt-4 text-2xl font-bold text-white md:text-3xl">
                            {program.headline}
                        </h3>
                        <p className="mt-3 leading-relaxed text-gray-100">{program.text}</p>
                        <p className="mt-4 inline-block rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-medium text-gray-200">
                            {program.format}
                        </p>
                    </div>

                    {/* Right — what happens, plus the way in */}
                    <div className="flex flex-col justify-center gap-5 rounded-2xl border border-white/15 bg-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                        <ul className="space-y-3">
                            {program.points.map((point) => (
                                <li
                                    key={point}
                                    className="flex items-start gap-3 text-sm leading-relaxed text-gray-100"
                                >
                                    <Check size={16} className="mt-0.5 shrink-0 text-[#F2600B]" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                        <Link
                            to={program.cta.to}
                            className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-2xl transition-all duration-300 hover:border-[#F2600B] hover:bg-[#F2600B]/20"
                        >
                            {program.cta.label}
                            <ArrowUpRight
                                size={16}
                                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
