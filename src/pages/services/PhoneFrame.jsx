import React from "react";
import { ChevronLeft, Signal, Wifi } from "lucide-react";

/**
 * A phone shell that can wear either platform's chrome.
 *
 * The differences between iOS and Android are small but they're the exact
 * details people read as "that's an iPhone" or "that's not" — corner radius,
 * dynamic island versus punch-hole camera, the home indicator versus the
 * three-button bar. Getting them right is what makes the Mobile hero's claim
 * land instead of looking like one generic phone with a label on it.
 *
 * Shared by the hero, the offline demo and the push demo so the device reads
 * as the same product throughout the page.
 */

// Not exported — nothing outside this file needs it, and a second export here
// would break fast refresh for the component.
const PLATFORMS = {
    ios: {
        label: "iOS",
        radius: "rounded-[2.2rem]",
        innerRadius: "rounded-[1.85rem]",
        statusFont: "font-semibold",
    },
    android: {
        label: "Android",
        radius: "rounded-[1.6rem]",
        innerRadius: "rounded-[1.3rem]",
        statusFont: "font-medium",
    },
};

/** Platform-accurate status bar. */
const StatusBar = ({ platform, dark }) => {
    const tone = dark ? "text-white/90" : "text-slate-900";
    return (
        <div
            className={`relative z-20 flex items-center justify-between px-4 pt-1.5 pb-1 text-[9px] ${tone} ${PLATFORMS[platform].statusFont}`}
        >
            <span className="tabular-nums">9:41</span>
            <span className="flex items-center gap-1">
                <Signal size={9} />
                <Wifi size={9} />
                {/* Battery */}
                <span
                    className={`ml-0.5 flex h-2.5 w-4 items-center rounded-[3px] border px-[1px] ${
                        dark ? "border-white/60" : "border-slate-500"
                    }`}
                >
                    <span
                        className={`h-1.5 w-2/3 rounded-[1px] ${
                            dark ? "bg-white/80" : "bg-slate-700"
                        }`}
                    />
                </span>
            </span>
        </div>
    );
};

export default function PhoneFrame({
    platform = "ios",
    children,
    dark = false,
    showNav = true,
    className = "",
}) {
    const p = PLATFORMS[platform] || PLATFORMS.ios;

    return (
        <div
            className={`relative border border-white/15 bg-[#0c0705] p-1.5 shadow-2xl shadow-black/70 ${p.radius} ${className}`}
        >
            <div
                className={`relative flex h-full flex-col overflow-hidden ${p.innerRadius} ${
                    dark ? "bg-[#0c0705]" : "bg-white"
                }`}
            >
                {/* Camera treatment — the clearest platform tell */}
                {platform === "ios" ? (
                    <span className="absolute left-1/2 top-1.5 z-30 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
                ) : (
                    <span
                        className={`absolute left-1/2 top-2 z-30 h-2 w-2 -translate-x-1/2 rounded-full ${
                            dark ? "bg-black" : "bg-slate-900"
                        }`}
                    />
                )}

                <StatusBar platform={platform} dark={dark} />

                <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>

                {/* System navigation */}
                {showNav &&
                    (platform === "ios" ? (
                        <div className="flex justify-center pb-1.5 pt-1">
                            <span
                                className={`h-1 w-24 rounded-full ${
                                    dark ? "bg-white/40" : "bg-slate-800/70"
                                }`}
                            />
                        </div>
                    ) : (
                        <div
                            className={`flex items-center justify-center gap-9 pb-1.5 pt-1 ${
                                dark ? "text-white/50" : "text-slate-500"
                            }`}
                        >
                            <ChevronLeft size={11} />
                            <span
                                className={`h-2.5 w-2.5 rounded-full border ${
                                    dark ? "border-white/50" : "border-slate-500"
                                }`}
                            />
                            <span
                                className={`h-2 w-2 rounded-[2px] border ${
                                    dark ? "border-white/50" : "border-slate-500"
                                }`}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}
