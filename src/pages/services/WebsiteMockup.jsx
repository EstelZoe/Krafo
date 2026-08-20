import React from "react";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useAutoCycle } from "./useAutoCycle";

/**
 * Hero visual for /services/websites.
 *
 * One frame that actually reflows between desktop, tablet and phone. The page
 * claims "mobile-first" in prose; this demonstrates it instead — the same
 * miniature site rearranges in front of the visitor, which is the entire
 * argument the copy is trying to make.
 *
 * Rendered in CSS/JSX rather than as screenshots, so it adds no download
 * weight, stays sharp on any display, and can never go stale against a real
 * client site or imply a client we don't have.
 *
 * The miniature site is deliberately light. Most business sites are, and a pale
 * rectangle against this page's black reads instantly as "a website" rather
 * than as more page furniture.
 */

const DEVICES = [
    { key: "desktop", label: "Desktop", Icon: Monitor, width: "100%" },
    { key: "tablet", label: "Tablet", Icon: Tablet, width: "64%" },
    { key: "mobile", label: "Mobile", Icon: Smartphone, width: "34%" },
];

// How long the toggle waits before advancing on its own. Long enough to read
// the current state, short enough that a visitor who never touches it still
// sees the point being made.
const AUTO_MS = 3200;

/** A row of blurred-out body copy. */
const Lines = ({ widths, className = "", tone = "bg-slate-200" }) => (
    <div className={`space-y-1.5 ${className}`}>
        {widths.map((w, i) => (
            <div key={i} className={`h-1.5 rounded-full ${tone}`} style={{ width: `${w}%` }} />
        ))}
    </div>
);

/** The faux chart block that stands in for a photo. */
const MediaBlock = ({ bars, className = "" }) => (
    <div className={`flex items-end gap-1 rounded bg-slate-200 p-2 ${className}`}>
        {bars.map((h, i) => (
            <span
                key={i}
                className="flex-1 rounded-sm bg-[#F2600B]/60"
                style={{ height: `${h}%` }}
            />
        ))}
    </div>
);

export default function WebsiteMockup({ className = "" }) {
    const [deviceIndex, selectDevice] = useAutoCycle(DEVICES.length, {
        intervalMs: AUTO_MS,
    });
    const device = DEVICES[deviceIndex].key;

    const active = DEVICES.find((d) => d.key === device) || DEVICES[0];
    const isMobile = device === "mobile";
    const isDesktop = device === "desktop";

    return (
        <div className={`relative ${className}`}>
            {/* Ambient glow behind the whole arrangement */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[#F2600B]/10 blur-3xl"
            />

            {/* ── Toggle ──────────────────────────────────────────────── */}
            <div
                className="relative mx-auto mb-5 flex w-fit items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md"
                role="group"
                aria-label="Preview the site at different screen sizes"
            >
                {DEVICES.map((d) => {
                    const DeviceIcon = d.Icon;
                    const on = d.key === device;
                    return (
                        <button
                            key={d.key}
                            type="button"
                            onClick={() => selectDevice(DEVICES.indexOf(d))}
                            aria-pressed={on}
                            className={`relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2600B] ${
                                on ? "text-white" : "text-gray-400 hover:text-white"
                            }`}
                        >
                            {on && (
                                <motion.span
                                    layoutId="device-pill"
                                    className="absolute inset-0 rounded-full bg-[#F2600B]"
                                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                />
                            )}
                            <span className="relative flex items-center gap-1.5">
                                <DeviceIcon size={13} />
                                {d.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/*
                Fixed height, set by the tablet view. Only the width animates,
                so switching device never resizes the hero around it — the
                mockup adapts to the space, not the other way round.

                Content that no longer fits simply clips, which is also what a
                real viewport does when the window gets narrower.
            */}
            <div className="relative flex h-[390px] items-start justify-center sm:h-[430px]">
                <motion.div
                    animate={{ width: active.width }}
                    transition={{ type: "spring", stiffness: 180, damping: 26 }}
                    className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0c0705] p-2 shadow-2xl shadow-black/70"
                >
                    {/* Chrome: a browser bar on desktop/tablet, a notch on phone */}
                    {isMobile ? (
                        <div className="flex justify-center pb-1.5 pt-1">
                            <span className="h-1.5 w-12 rounded-full bg-white/25" />
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 px-2 py-2">
                            <span className="flex gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                            </span>
                            <span className="ml-2 flex flex-1 items-center gap-1.5 overflow-hidden rounded-md bg-white/[0.06] px-2.5 py-1">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-2.5 w-2.5 shrink-0 text-emerald-400"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5zm-3 8V6a3 3 0 1 1 6 0v3H9z" />
                                </svg>
                                <span className="truncate text-[9px] font-medium text-gray-400">
                                    yourbusiness.com
                                </span>
                            </span>
                        </div>
                    )}

                    {/* ── The site ──────────────────────────────────────── */}
                    <div className="min-h-0 flex-1 overflow-hidden rounded-xl bg-white">
                        {/* Nav — collapses to a hamburger on the phone */}
                        <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2.5">
                            <div className="flex items-center gap-1.5">
                                <span className="h-4 w-4 rounded bg-[#F2600B]" />
                                <span className="h-1.5 w-10 rounded-full bg-slate-800" />
                            </div>
                            {isMobile ? (
                                <span className="space-y-[3px]">
                                    <span className="block h-[2px] w-4 rounded-full bg-slate-400" />
                                    <span className="block h-[2px] w-4 rounded-full bg-slate-400" />
                                    <span className="block h-[2px] w-4 rounded-full bg-slate-400" />
                                </span>
                            ) : (
                                <div className="flex items-center gap-2.5">
                                    {[10, 8, 11, 9].map((w, i) => (
                                        <span
                                            key={i}
                                            className="h-1.5 rounded-full bg-slate-300"
                                            style={{ width: `${w}px` }}
                                        />
                                    ))}
                                    <span className="h-4 w-11 rounded-full bg-[#F2600B]" />
                                </div>
                            )}
                        </div>

                        {/* Hero — side by side with room, stacked without it */}
                        <div
                            className={`gap-3 px-3 py-4 ${
                                isDesktop ? "grid grid-cols-5" : "flex flex-col"
                            }`}
                        >
                            <div className={isDesktop ? "col-span-3" : ""}>
                                <span className="block h-1.5 w-10 rounded-full bg-[#F2600B]" />
                                <div className="mt-2 space-y-1.5">
                                    <div className="h-2.5 w-[90%] rounded bg-slate-800" />
                                    <div className="h-2.5 w-[64%] rounded bg-slate-800" />
                                </div>
                                <Lines widths={[100, 82]} className="mt-2.5" />
                                <div className="mt-3 flex gap-2">
                                    <span className="h-5 w-16 rounded-full bg-[#F2600B]" />
                                    <span className="h-5 w-14 rounded-full border border-slate-300" />
                                </div>
                            </div>
                            <MediaBlock
                                bars={[40, 65, 50, 80, 60]}
                                className={isDesktop ? "col-span-2 min-h-[86px]" : "h-14"}
                            />
                        </div>

                        {/* Cards — three across, two, then one */}
                        <div
                            className={`grid gap-2 border-t border-slate-100 bg-slate-50 px-3 py-3.5 ${
                                isMobile ? "grid-cols-1" : isDesktop ? "grid-cols-3" : "grid-cols-2"
                            }`}
                        >
                            {[0, 1, 2].map((i) => (
                                // The third card drops away on the phone — real
                                // responsive layouts prioritise, they don't just
                                // shrink everything.
                                <div
                                    key={i}
                                    className={`rounded-lg bg-white p-2.5 shadow-sm ${
                                        isMobile && i === 2 ? "hidden" : ""
                                    }`}
                                >
                                    <span className="block h-4 w-4 rounded bg-[#F2600B]/20" />
                                    <div className="mt-2 h-1.5 w-2/3 rounded-full bg-slate-700" />
                                    <Lines widths={[100, 76]} className="mt-1.5" />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Caption — names what the visual is arguing */}
            <p className="relative mt-5 text-center text-xs text-gray-500">
                One build ·{" "}
                <span className="font-semibold text-[#ff8534]">every screen</span> · no separate
                mobile site
            </p>
        </div>
    );
}
