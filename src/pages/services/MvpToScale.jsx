import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Boxes,
    BrainCircuit,
    CreditCard,
    Gauge,
    LayoutDashboard,
    Radio,
    ShieldCheck,
    ShoppingBag,
    Users,
} from "lucide-react";

/**
 * What ships at MVP, and what gets added at Scale.
 *
 * The recommended path in the FAQ is "launch a focused MVP, learn from real
 * users, then invest" — but a founder reading two prices with a ₵70,000 gap
 * can't see where that money goes. Laying the two builds over each other makes
 * the gap concrete, and makes the smaller number look like a decision rather
 * than a compromise.
 *
 * Capability names are taken from the pricing tiers so this can't drift out of
 * step with what's actually being sold.
 */

const MVP_BLOCKS = [
    { Icon: Users, label: "Multi-user system" },
    { Icon: Boxes, label: "Multi-tenant core" },
    { Icon: CreditCard, label: "Subscriptions & payments" },
    { Icon: ShieldCheck, label: "Role management" },
    { Icon: LayoutDashboard, label: "Core product features" },
    { Icon: Gauge, label: "Scalable architecture" },
];

const SCALE_BLOCKS = [
    { Icon: BrainCircuit, label: "AI integrations" },
    { Icon: Radio, label: "Real-time systems" },
    { Icon: ShoppingBag, label: "Marketplace logic" },
    { Icon: Gauge, label: "Advanced analytics" },
    { Icon: Boxes, label: "Growth infrastructure" },
];

const STAGES = [
    {
        key: "mvp",
        name: "MVP",
        headline: "Launch, then learn",
        text: "Everything needed to put a real product in front of paying users — and nothing that can wait until they've told you what matters.",
        aside: "Best when you're validating: the fastest honest route to a first customer.",
    },
    {
        key: "scale",
        name: "Scale",
        headline: "Build on what worked",
        text: "The infrastructure serious products lean on, added once real usage has shown you which parts of the product deserve the investment.",
        aside: "Best when the MVP has traction and the constraint has become the platform.",
    },
];

export default function MvpToScale() {
    const [stageKey, setStageKey] = useState("mvp");
    const isScale = stageKey === "scale";
    const stage = STAGES.find((s) => s.key === stageKey) || STAGES[0];

    return (
        <div>
            {/* ── Stage toggle ────────────────────────────────────────── */}
            <div
                className="mx-auto mb-10 flex w-fit items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md"
                role="group"
                aria-label="Compare the two build stages"
            >
                {STAGES.map((s) => {
                    const on = s.key === stageKey;
                    return (
                        <button
                            key={s.key}
                            type="button"
                            onClick={() => setStageKey(s.key)}
                            aria-pressed={on}
                            className={`relative rounded-full px-6 py-2 text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2600B] ${
                                on ? "text-white" : "text-gray-400 hover:text-white"
                            }`}
                        >
                            {on && (
                                <motion.span
                                    layoutId="stage-pill"
                                    className="absolute inset-0 rounded-full bg-[#F2600B]"
                                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                />
                            )}
                            <span className="relative">{s.name}</span>
                        </button>
                    );
                })}
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-12">
                {/* ── The stack ───────────────────────────────────────── */}
                <div>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                        {MVP_BLOCKS.map((b) => {
                            const BlockIcon = b.Icon;
                            return (
                                <div
                                    key={b.label}
                                    className="flex flex-col gap-2 rounded-xl border border-[#F2600B]/20 bg-[#111111] p-3"
                                >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#F2600B]/30 bg-[#F2600B]/10 text-[#F2600B]">
                                        <BlockIcon size={15} />
                                    </span>
                                    <span className="text-[11px] font-semibold leading-snug text-white">
                                        {b.label}
                                    </span>
                                </div>
                            );
                        })}

                        {/* Scale blocks build on top rather than replacing —
                            the point being that nothing from the MVP is thrown
                            away when you grow. */}
                        {SCALE_BLOCKS.map((b, i) => {
                            const BlockIcon = b.Icon;
                            return (
                                <motion.div
                                    key={b.label}
                                    initial={false}
                                    animate={{
                                        opacity: isScale ? 1 : 0.18,
                                        scale: isScale ? 1 : 0.96,
                                        filter: isScale ? "blur(0px)" : "blur(1.5px)",
                                    }}
                                    transition={{ duration: 0.35, delay: isScale ? i * 0.05 : 0 }}
                                    className={`flex flex-col gap-2 rounded-xl border p-3 ${
                                        isScale
                                            ? "border-[#F2600B]/60 bg-gradient-to-br from-[#F2600B]/15 to-transparent shadow-[0_0_24px_-10px_rgba(242,96,11,0.8)]"
                                            : "border-dashed border-white/15 bg-transparent"
                                    }`}
                                >
                                    <span
                                        className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                                            isScale
                                                ? "border-[#F2600B]/50 bg-[#F2600B]/20 text-[#ff8534]"
                                                : "border-white/10 text-gray-600"
                                        }`}
                                    >
                                        <BlockIcon size={15} />
                                    </span>
                                    <span
                                        className={`text-[11px] font-semibold leading-snug ${
                                            isScale ? "text-white" : "text-gray-600"
                                        }`}
                                    >
                                        {b.label}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>

                    <p className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                        <span className="h-2 w-2 rounded-full border border-dashed border-white/30" />
                        Dimmed blocks are Scale-tier capabilities — added to the same
                        platform, not a rebuild.
                    </p>
                </div>

                {/* ── What that stage means ───────────────────────────── */}
                <motion.div
                    key={stage.key}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="self-start rounded-2xl border border-[#F2600B]/20 bg-[#111111] p-6"
                >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff8534]">
                        {stage.name}
                    </span>
                    <h3 className="hero-display mt-1 text-2xl font-bold text-white">
                        {stage.headline}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-300">{stage.text}</p>

                    <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-relaxed text-gray-400">
                        {stage.aside}
                    </p>

                    <a
                        href="#pricing"
                        className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#ff8534] transition-colors hover:text-white"
                    >
                        See what {stage.name} costs
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
