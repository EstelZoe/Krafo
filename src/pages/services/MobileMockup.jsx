import React from "react";
import { motion } from "framer-motion";
import { Bell, Home, Search, User } from "lucide-react";
import PhoneFrame from "./PhoneFrame";
import { useAutoCycle } from "./useAutoCycle";

/**
 * Hero visual for /services/mobile — the same app on both platforms.
 *
 * The claim is "one codebase, both stores", so the demonstration is the same
 * screen wearing each platform's chrome in turn: dynamic island against
 * punch-hole camera, home indicator against the three-button bar, iOS tab bar
 * against Android's. The content between them never changes, because in a
 * cross-platform build it genuinely doesn't.
 *
 * A side-by-side pair would be the more literal reading of "both stores", but
 * two phones at hero size are too small to read. One phone, switched, keeps
 * the detail legible — and the detail is the argument.
 */

const PLATFORM_ORDER = ["ios", "android"];

const TABS = [
    { Icon: Home, label: "Home" },
    { Icon: Search, label: "Browse" },
    { Icon: Bell, label: "Alerts" },
    { Icon: User, label: "Account" },
];

const AUTO_MS = 3400;

export default function MobileMockup({ className = "" }) {
    const [platformIndex, selectPlatform] = useAutoCycle(PLATFORM_ORDER.length, {
        intervalMs: AUTO_MS,
    });
    const platform = PLATFORM_ORDER[platformIndex];

    const isIOS = platform === "ios";

    return (
        <div className={`relative ${className}`}>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[#F2600B]/10 blur-3xl"
            />

            {/* ── Platform toggle ─────────────────────────────────────── */}
            <div
                className="relative mx-auto mb-5 flex w-fit items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md"
                role="group"
                aria-label="Preview the app on each platform"
            >
                {PLATFORM_ORDER.map((p) => {
                    const on = p === platform;
                    return (
                        <button
                            key={p}
                            type="button"
                            onClick={() => selectPlatform(PLATFORM_ORDER.indexOf(p))}
                            aria-pressed={on}
                            className={`relative rounded-full px-5 py-1.5 text-xs font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2600B] ${
                                on ? "text-white" : "text-gray-400 hover:text-white"
                            }`}
                        >
                            {on && (
                                <motion.span
                                    layoutId="platform-pill"
                                    className="absolute inset-0 rounded-full bg-[#F2600B]"
                                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                />
                            )}
                            <span className="relative">{p === "ios" ? "iOS" : "Android"}</span>
                        </button>
                    );
                })}
            </div>

            {/* ── The phone ───────────────────────────────────────────── */}
            <div className="relative flex h-[390px] items-center justify-center sm:h-[430px]">
                <PhoneFrame platform={platform} className="h-full w-[190px] shrink-0">
                    {/* App header */}
                    <div className="flex items-center justify-between px-3.5 pb-2 pt-1">
                        <div>
                            <p className="text-[9px] text-slate-400">Good morning</p>
                            <p className="text-[11px] font-bold text-slate-900">Ama</p>
                        </div>
                        <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-slate-100">
                            <Bell size={11} className="text-slate-500" />
                            <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-[#F2600B]" />
                        </span>
                    </div>

                    {/* Search */}
                    <div className="px-3.5">
                        <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2 py-1.5">
                            <Search size={9} className="text-slate-400" />
                            <span className="h-1 w-14 rounded-full bg-slate-300" />
                        </div>
                    </div>

                    {/* Feature card */}
                    <div className="mt-2.5 px-3.5">
                        <div className="rounded-xl bg-gradient-to-br from-[#F2600B] to-[#ff8534] p-2.5">
                            <span className="h-1 w-8 rounded-full bg-white/50" />
                            <p className="mt-1.5 text-[10px] font-bold leading-tight text-white">
                                Your order is
                                <br />
                                on the way
                            </p>
                            <span className="mt-1.5 inline-block rounded-full bg-white px-2 py-0.5 text-[8px] font-bold text-[#F2600B]">
                                Track it
                            </span>
                        </div>
                    </div>

                    {/* List */}
                    <div className="mt-2.5 space-y-1.5 px-3.5">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="h-7 w-7 shrink-0 rounded-lg bg-slate-200" />
                                <span className="min-w-0 flex-1">
                                    <span className="block h-1.5 w-3/4 rounded-full bg-slate-700" />
                                    <span className="mt-1 block h-1 w-1/2 rounded-full bg-slate-300" />
                                </span>
                                <span className="h-1.5 w-5 shrink-0 rounded-full bg-[#F2600B]/40" />
                            </div>
                        ))}
                    </div>

                    {/* Tab bar — iOS labels its tabs, Android leans on icons */}
                    <div
                        className={`absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-slate-200 bg-white/95 px-2 backdrop-blur ${
                            isIOS ? "py-1.5" : "py-2"
                        }`}
                    >
                        {TABS.map((t, i) => {
                            const TabIcon = t.Icon;
                            const on = i === 0;
                            return (
                                <span key={t.label} className="flex flex-col items-center gap-0.5">
                                    <span
                                        className={
                                            on && !isIOS
                                                ? "rounded-full bg-[#F2600B]/12 px-2.5 py-0.5"
                                                : ""
                                        }
                                    >
                                        <TabIcon
                                            size={12}
                                            className={on ? "text-[#F2600B]" : "text-slate-400"}
                                        />
                                    </span>
                                    {isIOS && (
                                        <span
                                            className={`text-[7px] font-medium ${
                                                on ? "text-[#F2600B]" : "text-slate-400"
                                            }`}
                                        >
                                            {t.label}
                                        </span>
                                    )}
                                </span>
                            );
                        })}
                    </div>
                </PhoneFrame>
            </div>

            <p className="relative mt-5 text-center text-xs leading-relaxed text-gray-400">
                One codebase.{" "}
                <span className="font-semibold text-[#ff8534]">Both stores.</span> Same product,
                each platform&apos;s own conventions.
            </p>
        </div>
    );
}
