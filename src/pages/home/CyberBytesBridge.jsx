// CyberBytesBridge — the hand-off from Krafo's adult training to CyberBytes,
// the children's platform at mycyberbytes.africa.
//
// It sits directly after "Where the literacy comes from" on purpose: that
// section is about who we teach, and the honest next thought is that cyber
// literacy has to start earlier than a professional course. This is a bridge
// off the site, not a product tile, so it says so plainly rather than dressing
// an external link up as another Krafo offering.

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, ShieldCheck, Sparkles, Users } from "lucide-react";
import siteShot from "../../assets/images/optimized/cyberbyte-lg.webp";
import kidsArt from "../../assets/images/optimized/cyberyouthed2-lg.webp";

const CYBERBYTES_URL = "https://mycyberbytes.africa/";

const POINTS = [
    {
        Icon: ShieldCheck,
        text: "Online safety taught as habits — scams, passwords, and the footprint they leave behind.",
    },
    {
        Icon: Users,
        text: "Built for children and the adults around them, so what is learned at school carries home.",
    },
    {
        Icon: Sparkles,
        text: "Missions and challenges rather than lectures, because nine-year-olds do not sit through slides.",
    },
];

export default function CyberBytesBridge() {
    return (
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* ── The pitch ────────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.55 }}
            >
                <div className="mb-4 h-1 w-12 rounded-full bg-[#F2600B]" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#ff8534]">
                    For younger minds
                </span>

                <h2 className="hero-display mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
                    Cyber literacy starts{" "}
                    <span className="text-[#F2600B]">long before a career does</span>
                </h2>

                <p className="mt-4 max-w-xl text-balance leading-relaxed text-gray-300">
                    CyberBytes is our platform for children — the same mission as the
                    training above, written for the age that meets the internet first.
                    It lives on its own site, with its own programme.
                </p>

                <ul className="mt-7 space-y-3.5">
                    {POINTS.map(({ Icon, text }) => (
                        <li key={text} className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[#F2600B]/30 bg-[#F2600B]/10 text-[#F2600B]">
                                <Icon size={13} />
                            </span>
                            <span className="text-balance text-sm leading-relaxed text-gray-400">
                                {text}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* An outbound link, so it is labelled as one and opens away from
                    the page the visitor is reading. noopener/noreferrer because
                    target="_blank" otherwise hands the new tab a reference back
                    to this window. */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a
                        href={CYBERBYTES_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full bg-[#F2600B] px-7 py-3.5 font-bold text-white shadow-lg shadow-[#F2600B]/30 transition-all duration-300 hover:scale-[1.03] hover:bg-[#d94f00]"
                    >
                        Visit CyberBytes
                        <ArrowUpRight
                            size={17}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </a>
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                        <ExternalLink size={13} />
                        mycyberbytes.africa
                    </span>
                </div>
            </motion.div>

            {/* ── The platform itself ──────────────────────────────────── */}
            <motion.a
                href={CYBERBYTES_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open CyberBytes at mycyberbytes.africa"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group relative mx-auto block w-full max-w-xl"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-[#F2600B]/10 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* The real site in a browser frame — showing the thing beats
                    describing it, and it sets the expectation that this link
                    leads somewhere different. */}
                <figure className="relative overflow-hidden rounded-xl border border-white/12 bg-[#0d0d0d] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] ring-1 ring-[#F2600B]/20 transition-transform duration-500 group-hover:-translate-y-1.5">
                    <div
                        aria-hidden="true"
                        className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3 py-2"
                    >
                        <span className="h-2 w-2 rounded-full bg-white/20" />
                        <span className="h-2 w-2 rounded-full bg-white/20" />
                        <span className="h-2 w-2 rounded-full bg-white/20" />
                        <span className="ml-2 font-mono text-[10px] text-white/35">
                            mycyberbytes.africa
                        </span>
                    </div>
                    <img
                        src={siteShot}
                        alt="The CyberBytes site, showing its Digital Defenders programme for children"
                        loading="lazy"
                        className="block w-full"
                    />
                </figure>

                {/* The programme's own artwork, tucked at the corner so the
                    section reads as being for children at a glance. */}
                <img
                    src={kidsArt}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="pointer-events-none absolute -bottom-8 -left-6 hidden w-32 rotate-[-6deg] rounded-2xl border border-white/15 shadow-[0_18px_40px_rgba(0,0,0,0.7)] sm:block"
                />
            </motion.a>
        </div>
    );
}
