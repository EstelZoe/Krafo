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

                {/*
                    Desktop: the artwork takes the left three-fifths at full
                    height, with the two glass panels stacked down the right.

                    Rows are `auto auto`, NOT grid-rows-2 — that compiles to
                    `1fr 1fr`, which forces both rows to the taller panel's
                    height and leaves the shorter one padded out with dead
                    space. Content-sized rows keep the whole block back at the
                    height it was before the artwork was added.

                    Five columns rather than three so the panels get ~40% of
                    the width; at a third they were narrow enough that the
                    pitch wrapped to six or seven lines.
                */}
                <div className="relative grid gap-5 p-6 sm:p-8 md:grid-cols-2 md:gap-6 md:p-10 lg:grid-cols-5 lg:grid-rows-[auto_auto]">
                    {/* Right, top — the pitch */}
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:col-span-2 lg:col-start-4 lg:row-start-1">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#F2600B]/40 bg-[#F2600B]/10 text-[#F2600B]">
                                <program.Icon size={20} />
                            </span>
                            <div className="min-w-0">
                                <span className="block text-xs font-semibold uppercase tracking-wider text-[#ff8534]">
                                    {program.short}
                                </span>
                                {/* Format moved up here from its own chip —
                                    it was costing a whole row on its own. */}
                                <span className="block truncate text-[11px] text-gray-300">
                                    {program.format}
                                </span>
                            </div>
                        </div>
                        <h3 className="hero-display mt-3 text-xl font-bold leading-tight text-white md:text-2xl">
                            {program.headline}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-100">
                            {program.text}
                        </p>
                    </div>

                    {/* Right, bottom — what happens, plus the way in */}
                    <div className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:col-span-2 lg:col-start-4 lg:row-start-2">
                        <ul className="space-y-2.5">
                            {program.points.map((point) => (
                                <li
                                    key={point}
                                    className="flex items-start gap-2.5 text-sm leading-snug text-gray-100"
                                >
                                    <Check size={15} className="mt-0.5 shrink-0 text-[#F2600B]" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                        <Link
                            to={program.cta.to}
                            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-2xl transition-all duration-300 hover:border-[#F2600B] hover:bg-[#F2600B]/20"
                        >
                            {program.cta.label}
                            <ArrowUpRight
                                size={16}
                                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </Link>
                    </div>

                    {/* The artwork, shown properly and large. object-contain
                        rather than cover, because these are flyers — cropping
                        one cuts off the dates and contact details that are the
                        entire point. */}
                    <figure className="relative min-h-[300px] overflow-hidden rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.45)] md:col-span-2 lg:col-span-3 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:min-h-0">
                        {/* A blurred copy fills the frame behind the artwork, so
                            a portrait flyer in a landscape slot reads as framed
                            rather than as dead space either side of it. */}
                        <img
                            src={program.image}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
                        />
                        <img
                            src={program.image}
                            alt={`${program.label} artwork`}
                            loading="lazy"
                            className="relative h-full w-full object-contain p-3"
                        />
                    </figure>
                </div>
            </motion.div>
        </div>
    );
}
