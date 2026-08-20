import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Bell, Package, Sparkles, Wallet } from "lucide-react";
import PhoneFrame from "./PhoneFrame";

/**
 * Notifications arriving on a locked phone.
 *
 * "Push notifications" appears as a bullet on nearly every app proposal, so it
 * reads as a checkbox rather than as the reason to build an app at all. Seeing
 * them land on a lock screen restores what the bullet actually means: a channel
 * into someone's pocket that a website simply does not have.
 *
 * Only runs once scrolled into view, so nobody arrives partway through.
 */

const PUSHES = [
    {
        Icon: Package,
        app: "Deliveries",
        title: "Out for delivery",
        body: "Your order will arrive between 2–4pm today.",
        why: "Transactional — the update people actually open.",
    },
    {
        Icon: Wallet,
        app: "Payments",
        title: "Payment received",
        body: "₵450.00 from A. Mensah has cleared.",
        why: "Operational — staff know without checking anything.",
    },
    {
        Icon: Sparkles,
        app: "Offers",
        title: "Back in stock",
        body: "The item you saved is available again.",
        why: "Re-engagement — the return visit a website waits for.",
    },
];

const STEP_MS = 3000;

export default function PushDemo() {
    const [ref, inView] = useInView({ threshold: 0.35 });
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!inView) return undefined;
        const timer = setInterval(() => setIndex((i) => (i + 1) % PUSHES.length), STEP_MS);
        return () => clearInterval(timer);
    }, [inView]);

    const push = PUSHES[index];
    const PushIcon = push.Icon;

    return (
        <div
            ref={ref}
            className="grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center lg:gap-14"
        >
            {/* ── Lock screen ─────────────────────────────────────────── */}
            <div className="flex justify-center">
                <PhoneFrame platform="ios" dark showNav className="h-[420px] w-[210px]">
                    {/* Wallpaper */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(80% 55% at 50% 78%, rgba(242,96,11,0.32) 0%, rgba(242,96,11,0) 62%), linear-gradient(180deg, #0b0705 0%, #16100b 100%)",
                        }}
                    />

                    <div className="relative flex h-full flex-col px-3 pt-6">
                        {/* Clock */}
                        <div className="text-center">
                            <p className="text-[9px] font-medium text-white/60">
                                Tuesday, 12 March
                            </p>
                            <p className="hero-display text-4xl font-bold leading-none text-white">
                                9:41
                            </p>
                        </div>

                        {/* The notification */}
                        <div className="mt-5">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={push.title}
                                    initial={{ opacity: 0, y: -14, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    className="rounded-2xl border border-white/15 bg-white/15 p-2.5 backdrop-blur-xl"
                                >
                                    <div className="flex items-center gap-1.5">
                                        <span className="flex h-4 w-4 items-center justify-center rounded bg-[#F2600B] text-white">
                                            <PushIcon size={9} />
                                        </span>
                                        <span className="text-[8.5px] font-semibold uppercase tracking-wide text-white/70">
                                            {push.app}
                                        </span>
                                        <span className="ml-auto text-[8px] text-white/50">
                                            now
                                        </span>
                                    </div>
                                    <p className="mt-1.5 text-[9.5px] font-bold text-white">
                                        {push.title}
                                    </p>
                                    <p className="mt-0.5 text-[9.5px] leading-snug text-white/75">
                                        {push.body}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            {/* The ones before it, stacked behind */}
                            <div className="mt-1.5 space-y-1">
                                <div className="mx-1.5 h-4 rounded-xl border border-white/10 bg-white/[0.07] backdrop-blur-md" />
                                <div className="mx-3 h-3 rounded-xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-md" />
                            </div>
                        </div>
                    </div>
                </PhoneFrame>
            </div>

            {/* ── What each one is doing ──────────────────────────────── */}
            <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#F2600B]/30 bg-[#F2600B]/10 text-[#F2600B]">
                    <Bell size={20} />
                </span>

                <h3 className="hero-display mt-4 text-2xl font-bold text-white md:text-3xl">
                    A website waits to be visited.
                    <br />
                    <span className="text-[#F2600B]">An app can start the conversation.</span>
                </h3>

                <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-300">
                    Push is the one thing the mobile build gives you that no amount of web
                    work can — permission to reach someone directly, on the device they
                    check most.
                </p>

                {/* The three uses, with the live one highlighted */}
                <ul className="mt-7 space-y-2.5">
                    {PUSHES.map((p, i) => {
                        const on = i === index;
                        const RowIcon = p.Icon;
                        return (
                            <li key={p.title}>
                                <button
                                    type="button"
                                    onClick={() => setIndex(i)}
                                    className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-300 ${
                                        on
                                            ? "border-[#F2600B]/50 bg-[#F2600B]/10"
                                            : "border-white/10 bg-[#111111] hover:border-[#F2600B]/30"
                                    }`}
                                >
                                    <span
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                                            on
                                                ? "border-[#F2600B]/40 bg-[#F2600B]/15 text-[#F2600B]"
                                                : "border-white/10 text-gray-500"
                                        }`}
                                    >
                                        <RowIcon size={15} />
                                    </span>
                                    <span className="min-w-0">
                                        <span
                                            className={`block text-sm font-semibold ${
                                                on ? "text-white" : "text-gray-400"
                                            }`}
                                        >
                                            {p.title}
                                        </span>
                                        <span className="mt-0.5 block text-xs leading-relaxed text-gray-500">
                                            {p.why}
                                        </span>
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
